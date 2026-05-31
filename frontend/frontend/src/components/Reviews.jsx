const REVIEWS = [
  { name: 'Amara Perera',      location: 'Colombo 05',    text: 'Absolutely incredible service. My apartment has never looked this clean. The team was professional, thorough, and so friendly.' },
  { name: 'Roshan Fernando',   location: 'Nugegoda',      text: 'Used SpotlessHome for our office deep clean. They finished ahead of schedule and the results were beyond our expectations.' },
  { name: 'Nisha Jayawardena', location: 'Dehiwala',      text: 'The sofa express service transformed my living room. Stains I thought were permanent are completely gone. 10/10!' },
  { name: 'Kamal Silva',       location: 'Mount Lavinia', text: 'Booked a move-out clean and got my full deposit back. Landlord was impressed. Will use again for my new place.' },
]

export default function Reviews() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-sage text-xs font-medium uppercase tracking-[3px] mb-3">Testimonials</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark">
            What Clients <em className="text-forest">Say</em>
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {REVIEWS.map(r => (
            <div key={r.name} className="bg-cream p-7 rounded-sm border-l-[3px] border-gold">
              <p className="text-gold text-base tracking-widest mb-4">★★★★★</p>
              <p className="text-warm-gray text-sm leading-relaxed italic mb-6">"{r.text}"</p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-forest text-white flex items-center justify-center font-bold text-base flex-shrink-0">
                  {r.name[0]}
                </div>
                <div>
                  <strong className="block text-dark text-sm">{r.name}</strong>
                  <span className="text-warm-gray text-xs">{r.location}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
