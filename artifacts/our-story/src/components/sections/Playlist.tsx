import { motion } from "framer-motion";
import { Music2, Heart } from "lucide-react";

// CUSTOMIZE: Replace with songs that remind you of each other
// Add a Spotify/YouTube link to `url` if you want the card to be clickable
const SONGS = [
  {
    id: 1,
    title: "Falling",
    artist: "Harry Styles",
    vibe: "How it feels when you're not around.",
    url: null,
  },
  {
    id: 2,
    title: "Lover",
    artist: "Taylor Swift",
    vibe: "You feel like home.",
    url: null,
  },
  {
    id: 3,
    title: "Adore You",
    artist: "Harry Styles",
    vibe: "I'd walk through fire for you.",
    url: null,
  },
  {
    id: 4,
    title: "From The Start",
    artist: "Laufey",
    vibe: "Maybe it's always been you.",
    url: null,
  },
  {
    id: 5,
    title: "Enchanted",
    artist: "Taylor Swift",
    vibe: "The first time we talked.",
    url: null,
  },
  {
    id: 6,
    title: "Add your song here",
    artist: "Your artist",
    vibe: "// CUSTOMIZE: What does this song mean to you?",
    url: null,
  },
];

// CUSTOMIZE: Soft pastel gradient pairs for each card [from, to]
const CARD_GRADIENTS = [
  ["rgba(233,105,142,0.12)", "rgba(233,105,142,0.03)"],
  ["rgba(242,166,90,0.12)",  "rgba(242,166,90,0.03)"],
  ["rgba(168,130,210,0.12)", "rgba(168,130,210,0.03)"],
  ["rgba(100,180,210,0.12)", "rgba(100,180,210,0.03)"],
  ["rgba(233,105,142,0.10)", "rgba(242,166,90,0.04)"],
  ["rgba(242,166,90,0.10)",  "rgba(233,105,142,0.04)"],
];

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
          const Tag = song.url ? "a" : "div";
          const linkProps = song.url
            ? { href: song.url, target: "_blank", rel: "noopener noreferrer" }
            : {};

          return (
            <motion.div
              key={song.id}
              data-testid={`song-card-${song.id}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
            >
              <Tag
                {...linkProps}
                className="block h-full p-6 rounded-2xl border border-white/5 hover:border-primary/20 transition-all duration-300 cursor-default"
                style={{
                  background: `linear-gradient(135deg, ${gradFrom}, ${gradTo})`,
                }}
              >
                {/* Music icon */}
                <div className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center mb-5">
                  <Music2 className="w-5 h-5 text-primary/70" />
                </div>

                {/* Song info */}
                <h3 className="font-serif text-xl text-foreground mb-1 leading-snug">
                  {song.title}
                </h3>
                <p className="text-secondary text-sm font-medium tracking-wide mb-4">
                  {song.artist}
                </p>

                {/* Divider */}
                <div className="h-px w-full bg-white/5 mb-4" />

                {/* Vibe line */}
                <p className="text-muted-foreground text-sm font-light leading-relaxed italic flex items-start gap-2">
                  <Heart className="w-3.5 h-3.5 text-primary/50 mt-0.5 flex-shrink-0" />
                  {song.vibe}
                </p>
              </Tag>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
