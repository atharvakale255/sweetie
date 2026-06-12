import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// CUSTOMIZE: Change the messages shown while the page is "loading"
const LOADING_MESSAGES = [
  "Initializing friendship...",
  "Counting VC hours...",
  "Analyzing matching profile pictures...",
  "Calculating number of inside jokes...",
  "Warning: feelings detected. ❤",
];

interface LoadingScreenProps {
  onComplete: () => void;
}

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const messageInterval = setInterval(() => {
      setCurrentIndex((prev) => {
        if (prev === LOADING_MESSAGES.length - 1) {
          clearInterval(messageInterval);
          return prev;
        }
        return prev + 1;
      });
    }, 800); // 800ms per message

    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          setTimeout(onComplete, 500); // Wait a bit before completing
          return 100;
        }
        return prev + 2;
      });
    }, 80);

    return () => {
      clearInterval(messageInterval);
      clearInterval(progressInterval);
    };
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background text-foreground"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, transition: { duration: 1, ease: "easeInOut" } }}
      >
        <div className="w-full max-w-xs px-6">
          <div className="mb-8 h-8 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={currentIndex}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="text-center font-serif text-lg text-primary/90"
              >
                {LOADING_MESSAGES[currentIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
          
          <div className="h-1 w-full bg-muted rounded-full overflow-hidden">
            <motion.div
              className="h-full bg-primary"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ ease: "linear", duration: 0.1 }}
            />
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
