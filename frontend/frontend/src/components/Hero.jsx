export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src="/images/hero.jpg"
          alt="Clean home interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-dark/85 via-dark/60 to-dark/20" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-24 pb-16 w-full">
        <div className="max-w-2xl">
          <p className="animate-fade-up text-gold text-xs font-medium uppercase tracking-[4px] mb-6">
            Professional Cleaning Services
          </p>
          <h1 className="animate-fade-up delay-100 font-display text-5xl md:text-7xl font-bold text-white leading-tight mb-6 text-shadow">
            Spotless Homes,<br />
            <em className="text-gold not-italic">Stress-Free Life</em>
          </h1>
          <p className="animate-fade-up delay-200 text-white/70 text-lg leading-relaxed mb-10 max-w-lg">
            We bring professional-grade cleaning to your doorstep.
            Trusted by 2,000+ homes across the city.
          </p>
          <div className="animate-fade-up delay-300 flex flex-wrap gap-4 mb-14">
            <a href="#booking"
              className="px-9 py-4 bg-forest text-white text-xs font-medium uppercase tracking-widest rounded-sm hover:bg-sage transition-colors duration-200 hover:-translate-y-0.5 transform">
              Book Now
            </a>
            <a href="#services"
              className="px-9 py-4 border border-white/40 text-white text-xs font-medium uppercase tracking-widest rounded-sm hover:border-white transition-colors duration-200 hover:-translate-y-0.5 transform">
              View Services
            </a>
          </div>

          {/* Stats */}
          <div className="animate-fade-up delay-400 flex items-center gap-8">
            {[['2,000+','Happy Clients'],['8+','Services'],['5★','Avg Rating']].map(([num, label], i) => (
              <div key={i} className="flex items-center gap-8">
                {i > 0 && <div className="w-px h-10 bg-white/20" />}
                <div className="text-center">
                  <strong className="block font-display text-3xl text-white">{num}</strong>
                  <span className="text-white/50 text-xs uppercase tracking-wider">{label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 right-12 hidden md:flex flex-col items-center gap-2 z-10">
        <span className="text-white/40 text-[10px] uppercase tracking-[3px] [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-12 bg-gradient-to-b from-white/40 to-transparent animate-scroll" />
      </div>
    </section>
  )
}
