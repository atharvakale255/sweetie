import { useState, useEffect, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import { Music2, Heart, Play, Pause, X, Loader2 } from "lucide-react";

// CUSTOMIZE: Replace songs with YouTube IDs + optional start times
//
// HOW TO GET A YOUTUBE VIDEO ID:
//   1. Find the song on YouTube (official video, lyric video, etc.)
//   2. The URL looks like: https://www.youtube.com/watch?v=dQw4w9WgXcQ
//   3. The part after v= is the ID — paste it into youtubeId below
//
// startAt: number of SECONDS into the song to start from.
//   e.g. startAt: 75  →  starts at 1 min 15 sec
//   Open YouTube, pause at the moment you want, note the timestamp.
//
// Leave youtubeId as null to show the card without a play button.

const SONGS = [
  {
    id: 1,
    title: "Hrudayat Vaje Something",
    artist: "Vidhit Patankar",
    vibe: "How it feels when you're not around.",
    youtubeId: "brBokVUqhyg", // CUSTOMIZE: replace with correct YouTube ID
    startAt: 30,
  },
  {
    id: 2,
    title: "Lover",
    artist: "Taylor Swift",
    vibe: "You feel like home.",
    youtubeId: null,
    startAt: 0,
  },
  {
    id: 3,
    title: "Adore You",
    artist: "Harry Styles",
    vibe: "I'd walk through fire for you.",
    youtubeId: null,
    startAt: 0,
  },
  {
    id: 4,
    title: "From The Start",
    artist: "Laufey",
    vibe: "Maybe it's always been you.",
    youtubeId: null,
    startAt: 0,
  },
  {
    id: 5,
    title: "Enchanted",
    artist: "Taylor Swift",
    vibe: "The first time we talked.",
    youtubeId: null,
    startAt: 0,
  },
  {
    id: 6,
    title: "Add your song",
    artist: "Your artist",
    vibe: "What does this song mean to you?",
    youtubeId: null,
    startAt: 0,
  },
];

const CARD_GRADIENTS = [
  ["rgba(233,105,142,0.12)", "rgba(233,105,142,0.03)"],
  ["rgba(242,166,90,0.12)",  "rgba(242,166,90,0.03)"],
  ["rgba(168,130,210,0.12)", "rgba(168,130,210,0.03)"],
  ["rgba(100,180,210,0.12)", "rgba(100,180,210,0.03)"],
  ["rgba(233,105,142,0.10)", "rgba(242,166,90,0.04)"],
  ["rgba(242,166,90,0.10)",  "rgba(233,105,142,0.04)"],
];

type Song = (typeof SONGS)[0];

// ── YouTube IFrame API types ──────────────────────────────────────────────────
interface YTPlayer {
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (seconds: number, allowSeekAhead: boolean) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
  getPlayerState: () => number;
  destroy: () => void;
}
interface YTPlayerOptions {
  videoId: string;
  playerVars?: Record<string, number | string>;
  events?: {
    onReady?: (e: { target: YTPlayer }) => void;
    onStateChange?: (e: { data: number }) => void;
  };
}
declare global {
  interface Window {
    YT?: { Player: new (el: HTMLElement, opts: YTPlayerOptions) => YTPlayer; PlayerState: { PLAYING: number } };
    onYouTubeIframeAPIReady?: () => void;
    _ytApiReady?: boolean;
    _ytApiCallbacks?: Array<() => void>;
  }
}

function loadYouTubeApi(): Promise<void> {
  if (window._ytApiReady) return Promise.resolve();
  return new Promise((resolve) => {
    if (!window._ytApiCallbacks) window._ytApiCallbacks = [];
    window._ytApiCallbacks.push(resolve);

    if (!document.querySelector('script[src*="youtube.com/iframe_api"]')) {
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => {
        window._ytApiReady = true;
        if (prev) prev();
        window._ytApiCallbacks?.forEach((cb) => cb());
        window._ytApiCallbacks = [];
      };
      const script = document.createElement("script");
      script.src = "https://www.youtube.com/iframe_api";
      document.head.appendChild(script);
    }
  });
}

// ── Player bar ────────────────────────────────────────────────────────────────
function PlayerBar({ song, onClose }: { song: Song; onClose: () => void }) {
  const iframeContainerRef = useRef<HTMLDivElement>(null);
  const playerRef = useRef<YTPlayer | null>(null);
  const rafRef = useRef<number>(0);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0–1
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const fmt = (s: number) =>
    `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  const startProgressLoop = useCallback(() => {
    const tick = () => {
      const p = playerRef.current;
      if (!p) return;
      const cur = p.getCurrentTime();
      const dur = p.getDuration();
      setCurrentTime(cur);
      setDuration(dur);
      setProgress(dur > 0 ? cur / dur : 0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, []);

  useEffect(() => {
    if (!iframeContainerRef.current || !song.youtubeId) return;
    let cancelled = false;

    loadYouTubeApi().then(() => {
      if (cancelled || !iframeContainerRef.current || !window.YT) return;

      playerRef.current = new window.YT.Player(iframeContainerRef.current, {
        videoId: song.youtubeId!,
        playerVars: {
          autoplay: 1,
          controls: 0,
          disablekb: 1,
          modestbranding: 1,
          rel: 0,
          start: song.startAt ?? 0,
        },
        events: {
          onReady: (e) => {
            if (cancelled) return;
            setLoading(false);
            e.target.seekTo(song.startAt ?? 0, true);
            e.target.playVideo();
            startProgressLoop();
          },
          onStateChange: (e) => {
            if (cancelled) return;
            const PLAYING = window.YT?.PlayerState.PLAYING ?? 1;
            setPlaying(e.data === PLAYING);
          },
        },
      });
    });

    return () => {
      cancelled = true;
      cancelAnimationFrame(rafRef.current);
      playerRef.current?.destroy();
      playerRef.current = null;
    };
  }, [song, startProgressLoop]);

  const togglePlay = () => {
    if (!playerRef.current) return;
    if (playing) playerRef.current.pauseVideo();
    else playerRef.current.playVideo();
  };

  const handleScrub = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!playerRef.current || duration === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    playerRef.current.seekTo(ratio * duration, true);
  };

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      {/* Frosted backdrop */}
      <div className="absolute inset-0 bg-background/90 backdrop-blur-xl border-t border-white/8" />

      <div className="relative px-4 md:px-8 py-4">
        {/* Top row: thumbnail + song info + controls + close */}
        <div className="flex items-center gap-4 mb-3">
          {/* YouTube player — visible small thumbnail so autoplay isn't blocked */}
          <div className="flex-shrink-0 w-[120px] h-[68px] rounded-xl overflow-hidden relative">
            <div ref={iframeContainerRef} className="w-full h-full" />
            {/* Dark overlay so it doesn't look jarring */}
            <div className="absolute inset-0 bg-black/20 rounded-xl pointer-events-none" />
          </div>
        
          {/* Song info */}
          <div className="flex-1 min-w-0">
            <p className="font-serif text-sm text-foreground/90 truncate">{song.title}</p>
            <p className="text-xs text-secondary/70 truncate">{song.artist}</p>
          </div>

          {/* Play / pause */}
          {loading ? (
            <Loader2 className="w-7 h-7 text-primary/60 animate-spin flex-shrink-0" />
          ) : (
            <motion.button
              onClick={togglePlay}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-full bg-primary flex items-center justify-center shadow-[0_0_20px_rgba(233,105,142,0.4)] flex-shrink-0"
            >
              {playing
                ? <Pause className="w-4 h-4 text-white fill-white" />
                : <Play className="w-4 h-4 text-white fill-white ml-0.5" />}
            </motion.button>
          )}

          {/* Close */}
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground/60 w-8 text-right tabular-nums">
            {fmt(currentTime)}
          </span>
          <div
            className="flex-1 h-1 rounded-full bg-white/10 cursor-pointer relative overflow-hidden"
            onClick={handleScrub}
          >
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
              style={{ width: `${progress * 100}%` }}
              transition={{ duration: 0.1 }}
            />
          </div>
          <span className="text-xs text-muted-foreground/60 w-8 tabular-nums">
            {fmt(duration)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

// ── Main section ──────────────────────────────────────────────────────────────
export function Playlist() {
  const [activeSong, setActiveSong] = useState<Song | null>(null);

  return (
    <>
      <section id="playlist" className="py-24 px-6 md:px-12 w-full max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
            Songs That Feel Like You
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
            Every song has a reason. Every reason has your name on it.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SONGS.map((song, index) => {
            const [gradFrom, gradTo] = CARD_GRADIENTS[index % CARD_GRADIENTS.length];
            const isPlaying = activeSong?.id === song.id;

            return (
              <motion.div
                key={song.id}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className={`p-6 rounded-2xl border transition-all duration-300 ${
                  isPlaying
                    ? "border-primary/40 shadow-[0_0_24px_rgba(233,105,142,0.15)]"
                    : "border-white/5 hover:border-primary/20"
                }`}
                style={{ background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})` }}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-primary/70" />
                  </div>
                  {song.youtubeId && (
                    <motion.button
                      onClick={() => setActiveSong(isPlaying ? null : song)}
                      whileTap={{ scale: 0.9 }}
                      className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                        isPlaying
                          ? "bg-primary text-white shadow-[0_0_16px_rgba(233,105,142,0.5)]"
                          : "bg-white/10 hover:bg-primary/30 text-muted-foreground hover:text-primary"
                      }`}
                    >
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </motion.button>
                  )}
                </div>

                {/* Song info */}
                <h3 className="font-serif text-xl text-foreground mb-1 leading-snug">{song.title}</h3>
                <p className="text-secondary text-sm font-medium tracking-wide mb-4">{song.artist}</p>

                <div className="h-px w-full bg-white/5 mb-4" />

                <p className="text-muted-foreground text-sm font-light leading-relaxed italic flex items-start gap-2">
                  <Heart className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                  {song.vibe}
                </p>

                {song.youtubeId && song.startAt > 0 && (
                  <p className="text-primary/30 text-xs mt-3 tracking-wide">
                    ♪ starts at {Math.floor(song.startAt / 60)}:{String(song.startAt % 60).padStart(2, "0")}
                  </p>
                )}
                {!song.youtubeId && (
                  <p className="text-muted-foreground/25 text-xs mt-4 tracking-widest uppercase">
                    Add YouTube ID to enable play
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {activeSong?.youtubeId && (
        <PlayerBar key={activeSong.id} song={activeSong} onClose={() => setActiveSong(null)} />
      )}
    </>
  );
}
