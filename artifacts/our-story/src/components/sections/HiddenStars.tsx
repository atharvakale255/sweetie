import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";

// CUSTOMIZE: Add your secret messages here
const SECRET_MESSAGES = [
  "I saved our first conversation.",
  "You made me believe in people again.",
  "I think about you more than I should.",
  "That one night we talked until 4am changed everything.",
  "You feel like home.",
  "I'm really glad the internet exists."
];

// Rough positions for the stars (percentages)
const POSITIONS = [
  { top: "15%", left: "10%" },
  { top: "25%", left: "85%" },
  { top: "45%", left: "5%" },
  { top: "60%", left: "90%" },
  { top: "75%", left: "15%" },
  { top: "85%", left: "80%" },
];

export function HiddenStars() {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-0">
        {SECRET_MESSAGES.map((message, i) => (
          <div
            key={i}
            className="absolute pointer-events-auto"
            style={{ top: POSITIONS[i].top, left: POSITIONS[i].left }}
          >
            <motion.button
              onClick={() => setActiveMessage(message)}
              animate={{ 
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.2, 1],
              }}
              transition={{ 
                duration: 3 + Math.random() * 2, 
                repeat: Infinity,
                delay: Math.random() * 2
              }}
              className="text-secondary/60 hover:text-secondary hover:scale-125 transition-all p-2"
            >
              <Star className="w-4 h-4 fill-current" />
            </motion.button>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 max-w-sm w-[90%] px-6 py-4 bg-card border border-secondary/30 rounded-2xl shadow-[0_0_30px_rgba(242,166,90,0.15)] flex flex-col items-center text-center"
          >
            <p className="font-serif text-lg text-foreground mb-4">"{activeMessage}"</p>
            <button 
              onClick={() => setActiveMessage(null)}
              className="text-xs text-muted-foreground hover:text-primary transition-colors uppercase tracking-widest"
            >
              Close
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
