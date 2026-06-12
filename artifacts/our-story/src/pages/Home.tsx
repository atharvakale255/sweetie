import { useState, useEffect } from "react";
import { LoadingScreen } from "@/components/sections/LoadingScreen";
import { Hero } from "@/components/sections/Hero";
import { Timeline } from "@/components/sections/Timeline";
import { Gallery } from "@/components/sections/Gallery";
import { FlipCards } from "@/components/sections/FlipCards";
import { Stats } from "@/components/sections/Stats";
import { HiddenStars } from "@/components/sections/HiddenStars";
import { Letter } from "@/components/sections/Letter";
import { FinalQuestion } from "@/components/sections/FinalQuestion";

const SECTIONS = [
  { id: "hero", label: "Start" },
  { id: "timeline", label: "Story" },
  { id: "gallery", label: "Gallery" },
  { id: "reasons", label: "Reasons" },
  { id: "stats", label: "Stats" },
  { id: "letter", label: "Letter" },
  { id: "question", label: "?" },
];

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [activeSection, setActiveSection] = useState("hero");

  // Track active section for side nav
  useEffect(() => {
    if (isLoading) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    SECTIONS.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [isLoading]);

  if (isLoading) {
    return <LoadingScreen onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="relative bg-background text-foreground selection:bg-primary/30 overflow-hidden">
      <HiddenStars />

      {/* Side Navigation Dots */}
      <div className="fixed right-4 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col gap-4">
        {SECTIONS.map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              activeSection === section.id 
                ? "bg-primary scale-150 shadow-[0_0_10px_rgba(233,105,142,0.8)]" 
                : "bg-white/20 hover:bg-white/50"
            }`}
            aria-label={`Scroll to ${section.label}`}
          />
        ))}
      </div>

      <main className="flex flex-col">
        <Hero />
        <Timeline />
        <Gallery />
        <FlipCards />
        <Stats />
        <Letter />
        <FinalQuestion />
      </main>
    </div>
  );
}
