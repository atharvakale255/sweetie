import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FinalQuestion() {
  const [response, setResponse] = useState<"none" | "more_time" | "yes">("none");

  return (
    <section id="question" className="min-h-screen flex items-center justify-center py-24 px-4 relative overflow-hidden">
      {/* Confetti effect when 'yes' */}
      <AnimatePresence>
        {response === "yes" && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 pointer-events-none z-0"
          >
            {[...Array(30)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute text-primary"
                initial={{ 
                  y: "100vh", 
                  x: `${Math.random() * 100}vw`,
                  rotate: 0,
                  opacity: 1
                }}
                animate={{ 
                  y: "-10vh",
                  rotate: Math.random() * 360,
                  opacity: 0
                }}
                transition={{ 
                  duration: 2 + Math.random() * 2, 
                  ease: "easeOut",
                  delay: Math.random() * 0.5
                }}
              >
                <Heart className="w-6 h-6 fill-current" />
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <AnimatePresence mode="wait">
          {response === "none" && (
            <motion.div
              key="question"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.8 }}
              className="space-y-12"
            >
              <h2 className="text-4xl md:text-6xl font-serif text-foreground leading-tight">
                After everything we've shared... <br/>
                <span className="text-primary italic">I have one last question for you.</span>
              </h2>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                <Button 
                  variant="outline" 
                  size="lg"
                  onClick={() => setResponse("more_time")}
                  className="rounded-full px-8 py-6 text-lg font-light border-white/20 hover:bg-white/5 hover:text-foreground"
                >
                  I need more time
                </Button>
                <Button 
                  size="lg"
                  onClick={() => setResponse("yes")}
                  className="rounded-full px-8 py-6 text-lg bg-primary hover:bg-primary/90 text-primary-foreground shadow-[0_0_20px_rgba(233,105,142,0.4)] transition-all hover:scale-105"
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
              className="text-center"
            >
              <h3 className="text-3xl font-serif text-secondary mb-4">That's okay. I'll be here. 💛</h3>
              <p className="text-muted-foreground font-light text-lg">There's no rush. I'm just glad you're here right now.</p>
            </motion.div>
          )}

          {response === "yes" && (
            <motion.div
              key="yes"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, type: "spring" }}
              className="text-center"
            >
              <div className="inline-block p-6 rounded-full bg-primary/20 mb-8 animate-pulse">
                <Heart className="w-16 h-16 text-primary fill-primary" />
              </div>
              <h3 className="text-4xl md:text-6xl font-serif text-primary mb-6">My heart just did something 🌸</h3>
              <p className="text-foreground/80 font-light text-xl md:text-2xl">This is the best notification I've ever gotten.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
