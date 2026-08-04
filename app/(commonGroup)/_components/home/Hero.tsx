
import { HeroLeftContent } from "./HeroLeftContent";
import { HeroRightVisual } from "./HeroRightVisual";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center bg-white text-black overflow-hidden py-12 lg:py-16 border-b border-neutral-100">
      {/* Decorative Structural Subtle Background Grid */}
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(to_right,#3E4A36_1px,transparent_1px),linear-gradient(to_bottom,#3E4A36_1px,transparent_1px)] bg-size-[4rem_4rem]" />

      <div className="container mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Main Part 1: Content Columns Layout */}
          <HeroLeftContent />

          {/* Main Part 2: Interactive Graphic Assets Layout */}
          <HeroRightVisual />
        </div>
      </div>
    </section>
  );
}
