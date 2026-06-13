import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

// CUSTOMIZE: Add your personal reasons here
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
      data-testid={`flip-card-${index}`}
      className="relative w-full cursor-pointer"
      style={{ perspective: "1000px", aspectRatio: "4/3" }}
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <motion.div
        className="w-full h-full relative"
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.55, ease: [0.23, 1, 0.32, 1] }}
      >
        {/* Front */}
        <div
          className="absolute inset-0 rounded-2xl bg-card border border-white/5 hover:border-primary/30 transition-colors shadow-md flex flex-col items-center justify-center gap-3"
          style={{ backfaceVisibility: "hidden" }}
        >
          <Heart className="w-8 h-8 md:w-10 md:h-10 text-primary/40" />
          <span className="text-muted-foreground text-sm font-light tracking-wide">
            Tap to reveal
          </span>
        </div>

        {/* Back */}
        <div
          className="absolute inset-0 rounded-2xl flex items-center justify-center p-6 lg:p-8 text-center border border-primary/20 bg-gradient-to-br from-card via-card to-primary/10 shadow-[0_0_30px_rgba(233,105,142,0.12)]"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p className="font-serif text-base md:text-lg lg:text-xl text-foreground/90 leading-relaxed">
            {reason}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export function FlipCards() {
  return (
    <section id="reasons" className="py-24 px-6 md:px-12 w-full max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-primary mb-4">
          Little Things About You
        </h2>
        <p className="text-muted-foreground text-base md:text-lg">
          Just a few reasons why you're special.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
        {REASONS.map((reason, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
          >
            <FlipCard reason={reason} index={index} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
