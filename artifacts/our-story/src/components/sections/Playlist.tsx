import { useState } from "react";
import { motion } from "framer-motion";
import { Music2, Heart, ExternalLink } from "lucide-react";

// CUSTOMIZE: Replace songs and add Spotify track IDs
//
// HOW TO GET A SPOTIFY TRACK ID:
//   1. Open Spotify and find the song
//   2. Right-click the song → Share → Copy Song Link
//   3. The link looks like: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT
//   4. The part after /track/ is the ID — paste it into spotifyId below
//
// Leave spotifyId as null to show the card without a player.

const SONGS = [
  {
    id: 1,
    title: "Falling",
    artist: "Harry Styles",
    vibe: "How it feels when you're not around.",
    spotifyId: null, // e.g. "4cOdK2wGLETKBW3PvgPWqT"
  },
  {
    id: 2,
    title: "Lover",
    artist: "Taylor Swift",
    vibe: "You feel like home.",
    spotifyId: null,
  },
  {
    id: 3,
    title: "Adore You",
    artist: "Harry Styles",
    vibe: "I'd walk through fire for you.",
    spotifyId: null,
  },
  {
    id: 4,
    title: "From The Start",
    artist: "Laufey",
    vibe: "Maybe it's always been you.",
    spotifyId: null,
  },
  {
    id: 5,
    title: "Enchanted",
    artist: "Taylor Swift",
    vibe: "The first time we talked.",
    spotifyId: null,
  },
  {
    id: 6,
    title: "Add your song",
    artist: "Your artist",
    vibe: "// CUSTOMIZE: What does this song mean to you?",
    spotifyId: null,
  },
];

// CUSTOMIZE: Gradient pairs for each card when no Spotify embed is loaded
const CARD_GRADIENTS = [
  ["rgba(233,105,142,0.12)", "rgba(233,105,142,0.03)"],
  ["rgba(242,166,90,0.12)",  "rgba(242,166,90,0.03)"],
  ["rgba(168,130,210,0.12)", "rgba(168,130,210,0.03)"],
  ["rgba(100,180,210,0.12)", "rgba(100,180,210,0.03)"],
  ["rgba(233,105,142,0.10)", "rgba(242,166,90,0.04)"],
  ["rgba(242,166,90,0.10)",  "rgba(233,105,142,0.04)"],
];

function SpotifyEmbed({ trackId }: { trackId: string }) {
  const [loaded, setLoaded] = useState(false);
  return (
    <div className="relative mt-4 rounded-xl overflow-hidden">
      {/* Skeleton while loading */}
      {!loaded && (
        <div className="h-[80px] w-full bg-black/40 animate-pulse rounded-xl" />
      )}
      <iframe
        src={`https://open.spotify.com/embed/track/${trackId}?utm_source=generator&theme=0`}
        width="100%"
        height="80"
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
        loading="lazy"
        onLoad={() => setLoaded(true)}
        className={`rounded-xl border-0 transition-opacity duration-500 ${loaded ? "opacity-100" : "opacity-0 absolute inset-0"}`}
        title={`Spotify player`}
      />
    </div>
  );
}

export function Playlist() {
  return (
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
          return (
            <motion.div
              key={song.id}
              data-testid={`song-card-${song.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
              }}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-2 mb-5">
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center flex-shrink-0">
                  <Music2 className="w-5 h-5 text-primary/70" />
                </div>
                {song.spotifyId && (
                  <a
                    href={`https://open.spotify.com/track/${song.spotifyId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground/40 hover:text-primary/60 transition-colors"
                    aria-label="Open in Spotify"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </a>
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

              {/* Vibe line */}
              <p className="text-muted-foreground text-sm font-light leading-relaxed italic flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                {song.vibe}
              </p>

              {/* Spotify embed — only if trackId provided */}
              {song.spotifyId && <SpotifyEmbed trackId={song.spotifyId} />}

              {/* Placeholder when no ID yet */}
              {!song.spotifyId && (
                <div className="mt-4 h-[80px] rounded-xl border border-dashed border-white/10 flex items-center justify-center gap-2 text-muted-foreground/30">
                  <Music2 className="w-4 h-4" />
                  <span className="text-xs tracking-wider uppercase">Add Spotify ID</span>
                </div>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* How-to hint */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-muted-foreground/30 mt-10 tracking-wide"
      >
        To enable players: right-click any song on Spotify → Share → Copy Song Link → paste the ID into Playlist.tsx
      </motion.p>
    </section>
  );
}
