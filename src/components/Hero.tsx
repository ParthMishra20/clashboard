import { useRef } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-fortress.jpg";

const Hero = () => {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    ref.current.style.setProperty("--cursor-x", `${x}%`);
    ref.current.style.setProperty("--cursor-y", `${y}%`);
  };

  return (
    <header aria-label="Clash Companion hero" className="relative min-h-[80vh] overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm">
      <div
        ref={ref}
        onMouseMove={handleMouseMove}
        className="relative h-full w-full"
      >
        <img
          src={heroImg}
          alt="Cinematic dark fantasy fortress at night with gold and elixir-pink glow"
          loading="eager"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" aria-hidden="true" />
        <div className="absolute inset-0 [background:var(--gradient-hero)]" aria-hidden="true" />

        <div className="relative z-10 mx-auto flex max-w-5xl flex-col gap-6 px-6 py-16 sm:py-24">
          <span className="inline-flex w-fit items-center rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
            New • Real-time chat and clan tools
          </span>
          <h1 className="text-balance text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            Clash Companion — Real-time Chat & Clan Tools
          </h1>
          <p className="max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
            Create rooms, chat live, and visualize player and clan progress with rich charts. Designed for war planning, upgrades, and team coordination.
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <Link to="/auth">
              <Button variant="hero" size="xl" aria-label="Get started with Clash Companion">
                Get Started
              </Button>
            </Link>
            <Link to="/rooms">
              <Button variant="gold" size="lg" aria-label="Explore public rooms">
                Explore Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
