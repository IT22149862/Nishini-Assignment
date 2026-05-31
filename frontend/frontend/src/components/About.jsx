const features = [
  { icon: '✦', title: 'Eco-Friendly Products', desc: 'Safe for your family and the planet' },
  { icon: '✦', title: 'Trained Professionals', desc: 'Background-checked and certified staff' },
  { icon: '✦', title: 'Satisfaction Guaranteed', desc: "We re-clean free if you're not happy" },
]

export default function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">

        {/* Image */}
        <div className="relative">
          <img
            src="/images/hero.jpg"
            alt="Our professional team"
            className="w-full rounded-sm aspect-[4/5] object-cover"
          />
          <div className="absolute -bottom-5 -right-5 bg-forest text-white px-7 py-6 rounded-sm text-center shadow-xl">
            <strong className="block font-display text-4xl leading-none">10+</strong>
            <span className="text-xs text-white/80 uppercase tracking-wider">Years of Excellence</span>
          </div>
        </div>

        {/* Content */}
        <div>
          <p className="text-sage text-xs font-medium uppercase tracking-[3px] mb-4">About Us</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-6 leading-tight">
            Cleaning to the<br /><em className="text-forest">Highest Standard</em>
          </h2>
          <p className="text-warm-gray leading-relaxed mb-4">
            SpotlessHome was founded on a simple belief: everyone deserves a clean, healthy living space.
            Our team of trained professionals uses eco-friendly products and proven techniques to deliver
            results that go beyond the surface.
          </p>
          <p className="text-warm-gray leading-relaxed mb-8">
            From deep cleaning to regular maintenance, we treat every home with the same care and
            attention to detail that we'd want for our own families.
          </p>

          <div className="flex flex-col gap-5">
            {features.map(f => (
              <div key={f.title} className="flex gap-4 items-start">
                <span className="text-gold mt-1 flex-shrink-0">{f.icon}</span>
                <div>
                  <strong className="block text-dark text-sm font-semibold mb-0.5">{f.title}</strong>
                  <p className="text-warm-gray text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
