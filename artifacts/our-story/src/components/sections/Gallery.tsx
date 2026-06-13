import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";

// CUSTOMIZE: Add your actual images here.
// Example: import memory1 from "@assets/memory1.jpg"
// Then set src: memory1 below.
const MEMORIES = [
  { id: 1, title: "Memory #1", src: null },
  { id: 2, title: "Memory #2", src: null },
  { id: 3, title: "Memory #3", src: null },
  { id: 4, title: "Memory #4", src: null },
  { id: 5, title: "Memory #5", src: null },
  { id: 6, title: "Memory #6", src: null },
  { id: 7, title: "Memory #7", src: null },
  { id: 8, title: "Memory #8", src: null },
];

export function Gallery() {
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const selected = MEMORIES.find((m) => m.id === selectedId) ?? null;

  return (
    <section id="gallery" className="py-24 px-6 md:px-12 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
          Our Little Gallery
        </h2>
        <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto">
          Pieces of our time together.
        </p>
      </motion.div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-5">
        {MEMORIES.map((memory, index) => (
          <motion.button
            key={memory.id}
            data-testid={`gallery-card-${memory.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 }}
            whileHover={{ scale: 1.03 }}
            onClick={() => setSelectedId(memory.id)}
            className="aspect-square cursor-pointer rounded-2xl overflow-hidden bg-card/40 border-2 border-dashed border-white/10 hover:border-primary/50 transition-all flex flex-col items-center justify-center group focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {memory.src ? (
              <img
                src={memory.src}
                alt={memory.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <>
                <ImageIcon className="w-8 h-8 md:w-10 md:h-10 text-muted-foreground/40 mb-2 group-hover:text-primary/60 transition-colors" />
                <span className="text-xs md:text-sm text-muted-foreground/60">
                  {memory.title}
                </span>
              </>
            )}
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6 bg-background/90 backdrop-blur-md"
            onClick={() => setSelectedId(null)}
            data-testid="lightbox-overlay"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.85, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-4xl aspect-[4/3] bg-card rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                data-testid="lightbox-close"
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-2 bg-black/60 hover:bg-primary text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>

              {selected?.src ? (
                <img
                  src={selected.src}
                  alt={selected.title}
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="flex flex-col items-center text-muted-foreground">
                  <ImageIcon className="w-20 h-20 mb-4 opacity-20" />
                  <p className="font-serif text-lg">
                    Placeholder for {selected?.title}
                  </p>
                  <p className="text-sm opacity-40 mt-2">
                    // CUSTOMIZE: Replace with actual image
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
