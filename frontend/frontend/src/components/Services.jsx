import { useState, useEffect } from 'react'
import { getServices } from '../services/api'

export default function Services() {
  const [services, setServices] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    getServices()
      .then(setServices)
      .catch(e => setError(e.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <section id="services" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sage text-xs font-medium uppercase tracking-[3px] mb-3">What We Offer</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark mb-4">
            Our Cleaning <em className="text-forest">Services</em>
          </h2>
          <p className="text-warm-gray max-w-md mx-auto">
            Professional cleaning solutions tailored to every space and need.
          </p>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center gap-4 py-20 text-warm-gray">
            <div className="w-9 h-9 border-[3px] border-gray-200 border-t-forest rounded-full animate-spin-slow" />
            <p>Loading services...</p>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="text-center py-20 text-red-500">
            <p>Could not load services. Make sure your backend is running.</p>
          </div>
        )}

        {/* Grid */}
        {!loading && !error && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7">
            {services.map(s => (
              <div key={s._id}
                className="bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img src={s.image} alt={s.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy" />
                  <span className="absolute top-3 left-3 bg-forest text-white text-[10px] font-medium uppercase tracking-wider px-2.5 py-1 rounded-sm">
                    {s.category}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-bold text-dark mb-2">{s.name}</h3>
                  <p className="text-warm-gray text-sm leading-relaxed mb-4 line-clamp-3">{s.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-forest font-semibold text-sm">
                      LKR {s.price.toLocaleString()}
                    </span>
                    <a href="#booking"
                      className="px-4 py-2 bg-dark text-white text-xs uppercase tracking-wider rounded-sm hover:bg-forest transition-colors duration-200">
                      Book
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
