import { SmoothScrollProvider } from "@/providers/SmoothScrollProvider";
import { Nav } from "@/components/Nav";
import { CustomCursor } from "@/components/CustomCursor";
import { Preloader } from "@/components/Preloader";
import { PhotoGhost } from "@/components/PhotoGhost";
import { MotionBackground } from "@/components/MotionBackground";
import { Hero } from "@/components/sections/Hero";
import { Journey } from "@/components/sections/Journey";
import { WorkGallery } from "@/components/sections/WorkGallery";
import { WhatYouGet } from "@/components/sections/WhatYouGet";
import { Services } from "@/components/sections/Services";
import { Process } from "@/components/sections/Process";
import { Recognition } from "@/components/sections/Recognition";
import { Faq } from "@/components/sections/Faq";
import { Footer } from "@/components/Footer";
import { RecruiterView } from "@/components/RecruiterView";
import { useAppStore } from "@/lib/store";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useReducedMotion } from "@/hooks/useReducedMotion";

function HeroWrapper() {
  useActiveSection("hero");
  return <Hero />;
}

export default function App() {
  // Listen for reduced motion changes
  useReducedMotion();
  const recruiterMode = useAppStore((s) => s.recruiterMode);

  if (recruiterMode) {
    return <RecruiterView />;
  }

  return (
    <SmoothScrollProvider>
      <Preloader />
      <CustomCursor />
      <MotionBackground />
      <PhotoGhost />
      <Nav />
      <main className="relative min-h-screen bg-canvas text-ink">
        <HeroWrapper />
        <div className="w-full md:pl-64 lg:pl-72 transition-all duration-500">
          <Journey />
          <WorkGallery />
          <WhatYouGet />
          <Services />
          <Process />
          <Recognition />
          <Faq />
        </div>
      </main>
      <Footer />
    </SmoothScrollProvider>
  );
}
