import { useState } from "react";
import { motion } from "framer-motion";
import { Music2, Heart } from "lucide-react";

// CUSTOMIZE: Replace songs and add Spotify track IDs
//
// HOW TO GET A SPOTIFY TRACK ID:
//   1. Open Spotify and find the song
//   2. Right-click the song → Share → Copy Song Link
//   3. The link looks like: https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT
//   4. The part after /track/ is the ID — paste it as spotifyId below
//
// Leave spotifyId as null to show a placeholder card.

const SONGS = [
  {
    id: 1,
    title: "Hrudayat Vaje Something",
    artist: "Vidhit Patankar",
    vibe: "How it feels when you're not around.",
    spotifyId: "5afuKIBOHvfwaIxRdjEIGJ",
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

function SpotifyCard({
  song,
  index,
}: {
  song: (typeof SONGS)[0];
  index: number;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <motion.div
      data-testid={`song-card-${song.id}`}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className="rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 overflow-hidden bg-card/50"
    >
      {/* Vibe line — always shown at top */}
      <div className="px-5 pt-5 pb-4 flex items-start gap-2">
        <Heart className="w-3.5 h-3.5 text-primary/50 mt-1 flex-shrink-0" />
        <p className="text-muted-foreground text-sm font-light leading-relaxed italic">
          {song.vibe}
        </p>
      </div>

      {/* Spotify embed when ID is set */}
      {song.spotifyId ? (
        <div className="relative px-0 pb-0">
          {!loaded && (
            <div className="h-[152px] w-full bg-black/40 animate-pulse" />
          )}
          <iframe
            src={`https://open.spotify.com/embed/track/${song.spotifyId}?utm_source=generator&theme=0`}
            width="100%"
            height="152"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            className={`border-0 block transition-opacity duration-500 ${
              loaded ? "opacity-100" : "opacity-0 absolute inset-0"
            }`}
            title={song.title}
          />
        </div>
      ) : (
        /* Placeholder card when no ID yet */
        <div className="px-5 pb-5">
          <div className="h-px w-full bg-white/5 mb-4" />
          <div className="rounded-xl border border-dashed border-white/10 bg-black/20 p-4 flex flex-col items-start gap-1">
            <div className="flex items-center gap-2 mb-1">
              <Music2 className="w-4 h-4 text-primary/40" />
              <span className="font-serif text-base text-foreground/80">{song.title}</span>
            </div>
            <span className="text-secondary/70 text-xs tracking-wide">{song.artist}</span>
            <span className="text-muted-foreground/30 text-xs mt-2 tracking-widest uppercase">
              Add Spotify ID to enable player
            </span>
          </div>
        </div>
      )}
    </motion.div>
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
        {SONGS.map((song, index) => (
          <SpotifyCard key={song.id} song={song} index={index} />
        ))}
      </div>
    </section>
  );
}
