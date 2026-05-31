import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

const links = [
  { label: 'Services',  href: '/#services' },
  { label: 'Book Now',  href: '/#booking' },
  { label: 'Gallery',   href: '/#gallery' },
  { label: 'About',     href: '/#about' },
  { label: 'Contact',   href: '/#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-cream/95 backdrop-blur-md shadow-sm py-3' : 'py-5'
    }`}>
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 font-display text-xl font-bold text-dark">
          <span className="text-gold">✦</span>
          SpotlessHome
        </Link>

        {/* Desktop Links */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map(l => (
            <li key={l.label}>
              <a href={l.href}
                className="text-xs font-medium uppercase tracking-widest text-dark hover:text-forest transition-colors relative group">
                {l.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-forest transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
        </ul>

        {/* Mobile Toggle */}
        <button onClick={() => setOpen(!open)}
          className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Menu">
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${open ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${open ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-dark transition-all duration-300 ${open ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-cream border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          {links.map(l => (
            <a key={l.label} href={l.href} onClick={() => setOpen(false)}
              className="text-sm font-medium uppercase tracking-widest text-dark py-2 border-b border-gray-100">
              {l.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
