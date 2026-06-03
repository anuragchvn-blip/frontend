// Blurred, muted photographic backdrop for the hero. Sits at the very bottom of
// the stack; a cream wash on top keeps it soft and keeps dark text legible.
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0 scale-110 bg-cover bg-center blur-[4px]"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      />
      {/* cream wash — mutes and lightens for readability */}
      <div className="absolute inset-0 bg-cream/65" />
    </div>
  );
}
