import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalQuestion() {
  const [response, setResponse] = useState<"none" | "more_time" | "yes">("none");

  return (
    <section
      id="question"
      className="min-h-screen flex items-center justify-center py-24 px-6 relative overflow-hidden"
    >
      {/* Confetti hearts on 'yes' */}
      <AnimatePresence>
        {response === "yes" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {[...Array(40)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary"
                initial={{
                  y: "105vh",
                  x: `${Math.random() * 100}vw`,
                  rotate: 0,
                  opacity: 1,
                  scale: 0.5 + Math.random() * 0.8,
                }}
                animate={{
                  y: "-10vh",
                  rotate: Math.random() * 540 - 270,
                  opacity: 0,
                }}
                transition={{
                  duration: 2.5 + Math.random() * 2,
                  ease: "easeOut",
                  delay: Math.random() * 0.6,
                }}
              >
                <Heart className="w-5 h-5 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl w-full mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {response === "none" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif text-foreground leading-tight">
                After everything we've shared...{" "}
                <br className="hidden md:block" />
                <span className="text-primary italic">
                  I have one last question for you.
                </span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-4">
                <Button
                  variant="outline"
                  size="lg"
                  data-testid="button-more-time"
                  onClick={() => setResponse("more_time")}
                  className="rounded-full px-10 py-7 text-lg font-light border-white/20 hover:bg-white/5 hover:text-foreground w-full sm:w-auto"
                >
                  I need more time
                </Button>
                <Button
                  size="lg"
                  data-testid="button-yes"
                  onClick={() => setResponse("yes")}
                  className="rounded-full px-10 py-7 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_30px_rgba(233,105,142,0.4)] transition-all hover:scale-105 hover:shadow-[0_0_50px_rgba(233,105,142,0.6)] w-full sm:w-auto"
                >
                  I'd love to give us a chance
                </Button>
              </div>
            </motion.div>
          )}

          {response === "more_time" && (
            <motion.div
              key="more_time"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center space-y-4"
            >
              <h3 className="text-3xl md:text-5xl font-serif text-secondary">
                That's okay. I'll be here. 💛
              </h3>
              <p className="text-muted-foreground font-light text-lg md:text-xl">
                There's no rush. I'm just glad you're here right now.
              </p>
            </motion.div>
          )}

          {response === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring", bounce: 0.4 }}
              className="text-center space-y-6"
            >
              <motion.div
                className="inline-block p-6 rounded-full bg-primary/20 mb-2"
                animate={{ scale: [1, 1.12, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
              >
                <Heart className="w-16 h-16 md:w-20 md:h-20 text-primary fill-primary" />
              </motion.div>
              <h3 className="text-4xl md:text-6xl lg:text-7xl font-serif text-primary">
                My heart just did something 🌸
              </h3>
              <p className="text-foreground/80 font-light text-xl md:text-2xl">
                This is the best notification I've ever gotten.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
