import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Music2, Heart, Play, X, Loader2 } from "lucide-react";

// CUSTOMIZE: Replace songs and add Spotify track IDs + optional start times
//
// HOW TO GET A SPOTIFY TRACK ID:
//   1. Open Spotify → find the song → right-click → Share → Copy Song Link
//   2. The link looks like: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT
//   3. The part after /track/ is the ID — paste it into spotifyId below
//
// startAt: number of SECONDS into the song to start from.
//   e.g. startAt: 75  →  starts at 1 min 15 sec
//   Use this to drop straight into the lyric or moment that means something to you.
//
// Leave spotifyId as null to show the card without a play button.

const SONGS = [
  {
    id: 1,
    title: "Hrudayat Vaje Something",
    artist: "Vidhit Patankar",
    vibe: "How it feels when you're not around.",
    spotifyId: "5afuKIBOHvfwaIxRdjEIGJ",
    startAt: 30,
  },
  {
    id: 2,
    title: "Lover",
    artist: "Taylor Swift",
    vibe: "You feel like home.",
    spotifyId: null,
    startAt: 0,
  },
  {
    id: 3,
    title: "Adore You",
    artist: "Harry Styles",
    vibe: "I'd walk through fire for you.",
    spotifyId: null,
    startAt: 0,
  },
  {
    id: 4,
    title: "From The Start",
    artist: "Laufey",
    vibe: "Maybe it's always been you.",
    spotifyId: null,
    startAt: 0,
  },
  {
    id: 5,
    title: "Enchanted",
    artist: "Taylor Swift",
    vibe: "The first time we talked.",
    spotifyId: null,
    startAt: 0,
  },
  {
    id: 6,
    title: "Add your song",
    artist: "Your artist",
    vibe: "What does this song mean to you?",
    spotifyId: null,
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

// Minimal types for the Spotify IFrame Controller API
interface SpotifyIFrameAPI {
  createController: (
    el: HTMLElement,
    options: { uri: string; height: number },
    cb: (ctrl: SpotifyController) => void
  ) => void;
}
interface SpotifyController {
  addListener: (event: string, cb: () => void) => void;
  play: () => void;
  seek: (seconds: number) => void;
  destroy: () => void;
}

declare global {
  interface Window {
    onSpotifyIframeApiReady?: (api: SpotifyIFrameAPI) => void;
    _spotifyIFrameAPI?: SpotifyIFrameAPI;
  }
}

// Load the Spotify IFrame API once and cache it
function loadSpotifyApi(): Promise<SpotifyIFrameAPI> {
  if (window._spotifyIFrameAPI) {
    return Promise.resolve(window._spotifyIFrameAPI);
  }
  return new Promise((resolve) => {
    const prev = window.onSpotifyIframeApiReady;
    window.onSpotifyIframeApiReady = (api) => {
      window._spotifyIFrameAPI = api;
      if (prev) prev(api);
      resolve(api);
    };
    if (!document.querySelector('script[src*="spotify.com/embed/iframe-api"]')) {
      const script = document.createElement("script");
      script.src = "https://open.spotify.com/embed/iframe-api/v1";
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

function PlayerBar({ song, onClose }: { song: Song; onClose: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<SpotifyController | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!containerRef.current || !song.spotifyId) return;
    setLoading(true);

    let cancelled = false;

    loadSpotifyApi().then((api) => {
      if (cancelled || !containerRef.current) return;

      // Clear any previous embed the API may have injected
      containerRef.current.innerHTML = "";

      api.createController(
        containerRef.current,
        { uri: `spotify:track:${song.spotifyId}`, height: 80 },
        (controller) => {
          if (cancelled) { controller.destroy(); return; }
          controllerRef.current = controller;

          controller.addListener("ready", () => {
            if (cancelled) return;
            setLoading(false);
            if (song.startAt && song.startAt > 0) {
              controller.seek(song.startAt);
            }
            controller.play();
          });
        }
      );
    });

    return () => {
      cancelled = true;
      if (controllerRef.current) {
        controllerRef.current.destroy();
        controllerRef.current = null;
      }
    };
  }, [song]);

  return (
    <motion.div
      initial={{ y: 120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 32 }}
      className="fixed bottom-0 left-0 right-0 z-50"
    >
      <div className="absolute inset-0 bg-background/85 backdrop-blur-xl border-t border-white/5" />

      <div className="relative flex items-center gap-4 px-4 md:px-8 py-3 min-h-[88px]">
        {/* Song label */}
        <div className="hidden sm:flex flex-col min-w-[140px]">
          <span className="font-serif text-sm text-foreground/90 truncate">{song.title}</span>
          <span className="text-xs text-secondary/80 truncate">{song.artist}</span>
          {song.startAt > 0 && (
            <span className="text-xs text-primary/50 mt-0.5">
              ↳ starts at {Math.floor(song.startAt / 60)}:{String(song.startAt % 60).padStart(2, "0")}
            </span>
          )}
        </div>

        {/* Spotify IFrame API mount point */}
        <div className="flex-1 relative min-h-[80px]">
          {loading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-5 h-5 text-primary/60 animate-spin" />
            </div>
          )}
          <div
            ref={containerRef}
            className={`w-full transition-opacity duration-300 ${loading ? "opacity-0" : "opacity-100"}`}
          />
        </div>

        {/* Close */}
        <button
          onClick={onClose}
          className="flex-shrink-0 p-2 rounded-full bg-white/5 hover:bg-primary/20 text-muted-foreground hover:text-primary transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

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
                style={{
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                }}
              >
                {/* Top row: icon + play button */}
                <div className="flex items-center justify-between mb-5">
                  <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center">
                    <Music2 className="w-5 h-5 text-primary/70" />
                  </div>

                  {song.spotifyId && (
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
                <h3 className="font-serif text-xl text-foreground mb-1 leading-snug">
                  {song.title}
                </h3>
                <p className="text-secondary text-sm font-medium tracking-wide mb-4">
                  {song.artist}
                </p>

                <div className="h-px w-full bg-white/5 mb-4" />

                {/* Vibe */}
                <p className="text-muted-foreground text-sm font-light leading-relaxed italic flex items-start gap-2">
                  <Heart className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                  {song.vibe}
                </p>

                {/* Timestamp hint */}
                {song.spotifyId && song.startAt > 0 && (
                  <p className="text-primary/30 text-xs mt-3 tracking-wide">
                    ♪ starts at {Math.floor(song.startAt / 60)}:{String(song.startAt % 60).padStart(2, "0")}
                  </p>
                )}

                {!song.spotifyId && (
                  <p className="text-muted-foreground/25 text-xs mt-4 tracking-widest uppercase">
                    Add Spotify ID to enable play
                  </p>
                )}
              </motion.div>
            );
          })}
        </div>
      </section>

      {activeSong?.spotifyId && (
        <PlayerBar song={activeSong} onClose={() => setActiveSong(null)} />
      )}
    </>
  );
}
