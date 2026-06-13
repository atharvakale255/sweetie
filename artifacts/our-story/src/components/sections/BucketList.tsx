import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Gamepad2, Film, Moon, Coffee, Music, Map, Phone, Star } from "lucide-react";

// CUSTOMIZE: Edit, add or remove bucket list items
const BUCKET_LIST = [
  { id: 1, icon: Gamepad2, text: "Pull an all-nighter gaming together", done: false },
  { id: 2, icon: Film,     text: "Watch a movie at the exact same time", done: false },
  { id: 3, icon: Moon,     text: "Stay up until sunrise, just talking", done: false },
  { id: 4, icon: Music,    text: "Make a playlist together", done: false },
  { id: 5, icon: Coffee,   text: "Have a virtual coffee date", done: false },
  { id: 6, icon: Phone,    text: "A VC that lasts all day", done: false },
  { id: 7, icon: Map,      text: "Meet in person someday", done: false },
  { id: 8, icon: Star,     text: "Add your own dream here...", done: false },
];

export function BucketList() {
  const [checked, setChecked] = useState<Set<number>>(new Set());

  const toggle = (id: number) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const doneCount = checked.size;

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-6"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
          Things I Wanna Do With You
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          A little list of us. Tap to check off what we've already done.
        </p>
      </motion.div>

      {/* Progress */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="mb-10 flex flex-col items-center gap-2"
      >
        <span className="text-sm text-muted-foreground tracking-widest uppercase">
          {doneCount} of {BUCKET_LIST.length} done
        </span>
        <div className="w-48 h-1 bg-muted rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-primary rounded-full"
            animate={{ width: `${(doneCount / BUCKET_LIST.length) * 100}%` }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          />
        </div>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {BUCKET_LIST.map((item, index) => {
          const Icon = item.icon;
          const isDone = checked.has(item.id);
          return (
            <motion.button
              key={item.id}
              data-testid={`bucket-item-${item.id}`}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => toggle(item.id)}
              className={`relative flex items-center gap-4 p-5 rounded-2xl border text-left transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-primary ${
                isDone
                  ? "bg-primary/10 border-primary/40 shadow-[0_0_20px_rgba(233,105,142,0.1)]"
                  : "bg-card/40 border-white/5 hover:border-primary/30"
              }`}
            >
              {/* Icon */}
              <div
                className={`flex-shrink-0 p-3 rounded-xl transition-colors duration-300 ${
                  isDone ? "bg-primary/20 text-primary" : "bg-muted text-muted-foreground"
                }`}
              >
                <Icon className="w-5 h-5" />
              </div>

              {/* Text */}
              <span
                className={`font-serif text-base md:text-lg transition-colors duration-300 ${
                  isDone ? "text-primary line-through decoration-primary/40" : "text-foreground/90"
                }`}
              >
                {item.text}
              </span>

              {/* Checkmark */}
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0, opacity: 0 }}
                    className="ml-auto flex-shrink-0 w-6 h-6 rounded-full bg-primary flex items-center justify-center"
                  >
                    <Check className="w-3.5 h-3.5 text-white" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
