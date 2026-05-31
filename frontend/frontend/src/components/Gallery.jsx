import { useState } from 'react'

const IMAGES = [
  { url: '/images/GalleryKitchen.jpg', label: 'Kitchen Deep Clean', large: true },
  { url: '/images/GalleryLiving.jpg', label: 'Living Room' },
  { url: '/images/GalleryBathroom.jpg', label: 'Bathroom' },
  { url: '/images/GellaryBedroom.jpg', label: 'Bedroom' },
  { url: '/images/GalleryOffice.jpg', label: 'Office Space', large: true },
  { url: 'images/GalleryDinning.jpg', label: 'Dining Area' },
  { url: '/images/GalleryRennovation.jpg', label: 'Post-Renovation' },
  { url: '/images/GallerySofa.jpg', label: 'Sofa Express' },
]

export default function Gallery() {
  const [modal, setModal] = useState(null)

  return (
    <section id="gallery" className="py-24 bg-light-sage">
      <div className="max-w-6xl mx-auto px-6">

        <div className="text-center mb-14">
          <p className="text-sage text-xs font-medium uppercase tracking-[3px] mb-3">Our Work</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark">
            Spotless <em className="text-forest">Results</em>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[200px] gap-3">
          {IMAGES.map((img, i) => (
            <div key={i}
              className={`relative overflow-hidden rounded-sm cursor-pointer group ${img.large ? 'col-span-2' : ''}`}
              onClick={() => setModal(img)}>
              <img src={img.url} alt={img.label} loading="lazy"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-dark/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <span className="text-white text-sm font-medium">{img.label}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {modal && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-6 animate-fade-in"
          onClick={() => setModal(null)}>
          <button className="absolute top-6 right-6 text-white/70 hover:text-white text-3xl font-light"
            onClick={() => setModal(null)}>✕</button>
          <img src={modal.url} alt={modal.label}
            className="max-w-[90vw] max-h-[85vh] object-contain rounded-sm"
            onClick={e => e.stopPropagation()} />
        </div>
      )}
    </section>
  )
}
