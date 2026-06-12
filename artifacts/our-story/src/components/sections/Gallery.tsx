import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Image as ImageIcon, X } from "lucide-react";

// CUSTOMIZE: Add your actual images here. Use paths to public folder or import them.
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

  return (
    <section id="gallery" className="py-24 px-4 md:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Our Little Gallery</h2>
        <p className="text-muted-foreground max-w-xl mx-auto">Pieces of our time together.</p>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {MEMORIES.map((memory, index) => (
          <motion.div
            key={memory.id}
            layoutId={`memory-${memory.id}`}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedId(memory.id)}
            className="aspect-square cursor-pointer rounded-xl overflow-hidden bg-card/40 border-2 border-dashed border-white/10 hover:border-primary/50 transition-colors flex flex-col items-center justify-center group"
          >
            {memory.src ? (
              <img src={memory.src} alt={memory.title} className="w-full h-full object-cover" />
            ) : (
              <>
                <ImageIcon className="w-8 h-8 text-muted-foreground/50 mb-2 group-hover:text-primary/50 transition-colors" />
                <span className="text-xs text-muted-foreground/70">{memory.title}</span>
              </>
            )}
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/90 backdrop-blur-sm"
            onClick={() => setSelectedId(null)}
          >
            <motion.div
              layoutId={`memory-${selectedId}`}
              className="relative w-full max-w-3xl aspect-[4/3] md:aspect-video bg-card rounded-2xl border border-white/10 flex items-center justify-center overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                onClick={() => setSelectedId(null)}
                className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-primary text-white rounded-full transition-colors z-10"
              >
                <X className="w-5 h-5" />
              </button>
              
              <div className="flex flex-col items-center text-muted-foreground">
                <ImageIcon className="w-16 h-16 mb-4 opacity-30" />
                <p>Placeholder for Memory #{selectedId}</p>
                <p className="text-sm opacity-50 mt-2">// CUSTOMIZE: Replace with actual image</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
