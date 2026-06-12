import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// CUSTOMIZE: Add your reasons here
const REASONS = [
  "The way you stay up late just to make sure I'm okay.",
  "Your laugh — even through a screen, it gets me every time.",
  "How you remember the smallest details I mention.",
  "The comforting silence when we're just existing together in VC.",
  "Your music taste and how you share it with me.",
  "Just... you. Everything about you.",
];

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div 
      className="relative w-full aspect-[4/3] cursor-pointer perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative preserve-3d transition-all duration-500"
        initial={false}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden bg-card border border-white/5 rounded-2xl flex flex-col items-center justify-center hover:border-primary/30 transition-colors shadow-sm">
          <Heart className="w-8 h-8 text-primary/40 mb-3" />
          <span className="text-muted-foreground text-sm font-light">Tap to reveal</span>
        </div>

        {/* Back */}
        <div 
          className="absolute inset-0 backface-hidden rounded-2xl flex items-center justify-center p-6 text-center border border-primary/20 bg-gradient-to-br from-card to-primary/10 shadow-[0_0_20px_rgba(233,105,142,0.1)]"
          style={{ transform: "rotateY(180deg)" }}
        >
          <p className="font-serif text-lg md:text-xl text-primary-foreground/90">{reason}</p>
        </div>
      </motion.div>
    </div>
  );
}

export function FlipCards() {
  return (
    <section id="reasons" className="py-24 px-4 md:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-primary mb-4">Little Things About You</h2>
        <p className="text-muted-foreground">Just a few reasons why you're special.</p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {REASONS.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <FlipCard reason={reason} index={index} />
          </motion.div>
        ))}
      </div>
      
      <style>{`
        .perspective-1000 { perspective: 1000px; }
        .preserve-3d { transform-style: preserve-3d; }
        .backface-hidden { backface-visibility: hidden; }
      `}</style>
    </section>
  );
}
