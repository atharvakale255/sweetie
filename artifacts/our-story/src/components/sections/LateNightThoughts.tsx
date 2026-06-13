import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CUSTOMIZE: Replace these with your actual late night thoughts
const THOUGHTS = [
  "I wonder if you think about me right before you fall asleep.",
  "Some nights I just stare at our chat and smile for no reason.",
  "I wish I could tell you how much a simple 'good morning' from you changes my whole day.",
  "You have no idea how often I almost said something more than what I typed.",
  "I replay certain moments of our calls more than I'd ever admit.",
  "There are voice messages I recorded and deleted because I didn't know how to say it.",
  "I hope wherever you are right now, you're warm.",
  "Some songs came on and I thought — this is exactly what this feels like.",
];

export function LateNightThoughts() {
  const [revealed, setRevealed] = useState<Set<number>>(new Set());

  const toggle = (i: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 w-full max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
          Late Night Thoughts
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Things I thought at 2am but never found the words to say.
          <br />
          <span className="text-sm opacity-60">Tap a note to read it.</span>
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12">
        {THOUGHTS.map((thought, i) => {
          const isOpen = revealed.has(i);
          return (
            <motion.button
              key={i}
              data-testid={`thought-card-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              onClick={() => toggle(i)}
              className={`relative text-left p-6 rounded-2xl border transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-primary min-h-[160px] flex flex-col justify-between ${
                isOpen
                  ? "bg-primary/10 border-primary/30 shadow-[0_0_30px_rgba(233,105,142,0.15)]"
                  : "bg-card/50 border-white/5 hover:border-primary/20"
              }`}
            >
              {/* Fold corner */}
              <div
                className={`absolute top-0 right-0 w-0 h-0 transition-all duration-300 ${
                  isOpen ? "opacity-60" : "opacity-20"
                }`}
                style={{
                  borderLeft: "20px solid transparent",
                  borderTop: `20px solid hsl(345 70% 65% / ${isOpen ? "0.5" : "0.2"})`,
                  borderRadius: "0 8px 0 0",
                }}
              />

              <AnimatePresence mode="wait">
                {!isOpen ? (
                  <motion.div
                    key="closed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex flex-col h-full justify-between"
                  >
                    {/* Fake lines suggesting hidden text */}
                    <div className="space-y-2 mt-1">
                      <div className="h-2 w-3/4 rounded-full bg-white/10" />
                      <div className="h-2 w-full rounded-full bg-white/10" />
                      <div className="h-2 w-2/3 rounded-full bg-white/10" />
                    </div>
                    <span className="text-xs text-muted-foreground/50 tracking-widest uppercase mt-4">
                      tap to read
                    </span>
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ opacity: 0, scale: 0.97 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col h-full justify-between"
                  >
                    <p className="font-serif text-base md:text-lg text-foreground/90 leading-relaxed italic">
                      "{thought}"
                    </p>
                    <span className="text-xs text-primary/50 tracking-widest uppercase mt-4">
                      — 2am me
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Soft glow pulse when open */}
              {isOpen && (
                <motion.div
                  className="absolute inset-0 rounded-2xl pointer-events-none"
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  style={{
                    background:
                      "radial-gradient(ellipse at center, rgba(233,105,142,0.08) 0%, transparent 70%)",
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
