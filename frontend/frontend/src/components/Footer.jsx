import { Link } from 'react-router-dom'

export default function Footer() {
  const openWA = () => window.open('https://wa.me/94752505366?text=Hi! Enquiring about cleaning services.', '_blank')

  return (
    <footer id="contact" className="bg-dark text-white">

      <div className="max-w-6xl mx-auto px-6 py-20 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

        {/* Brand */}
        <div className="lg:col-span-1">
          <div className="flex items-center gap-2 font-display text-xl font-bold mb-4">
            <span className="text-gold">✦</span> SpotlessHome
          </div>
          <p className="text-white/50 text-sm leading-relaxed mb-6">
            Professional cleaning services you can trust. Bringing sparkle to homes and offices across the city.
          </p>
          <button onClick={openWA}
            className="flex items-center gap-2 bg-[#25D366] text-white px-5 py-2.5 rounded-sm text-sm font-medium hover:opacity-90 transition-opacity">
            💬 Chat on WhatsApp
          </button>
        </div>

        {/* Services */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5">Services</h4>
          <ul className="flex flex-col gap-3 text-white/50 text-sm">
            {['Deep Clean','Office Cleaning','Sofa Express','Carpet Cleaning','Move-In/Out'].map(s => (
              <li key={s}><a href="#services" className="hover:text-gold transition-colors">{s}</a></li>
            ))}
          </ul>
        </div>

        {/* Company */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5">Company</h4>
          <ul className="flex flex-col gap-3 text-white/50 text-sm">
            <li><a href="#about" className="hover:text-gold transition-colors">About Us</a></li>
            <li><a href="#gallery" className="hover:text-gold transition-colors">Gallery</a></li>
            <li><a href="#booking" className="hover:text-gold transition-colors">Book Now</a></li>
            <li><Link to="/admin" className="hover:text-gold transition-colors">Admin</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h4 className="font-display text-base font-semibold mb-5">Contact</h4>
          <ul className="flex flex-col gap-3 text-white/50 text-sm">
            <li className="flex gap-2">📍 45 Galle Road, Colombo 03</li>
            <li className="flex gap-2">📧 hello@spotlesshome.lk</li>
            <li className="flex gap-2">📞 +94 77 123 4567</li>
            <li className="flex gap-2">🕐 Mon–Sat, 8AM–6PM</li>
          </ul>
        </div>
      </div>

      {/* Google Map */}
      <div className="border-t border-white/10">
        <iframe
          title="Our location"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d63371.80385149874!2d79.82118!3d6.9270786!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae253d10f7a7003%3A0x320b2e4d32d3838d!2sColombo%2C%20Sri%20Lanka!5e0!3m2!1sen!2s!4v1700000000000"
          width="100%" height="280"
          style={{ border: 0, display: 'block', filter: 'grayscale(20%) invert(90%) hue-rotate(180deg)' }}
          allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
      </div>

      <div className="border-t border-white/10 py-5 text-center text-white/30 text-xs px-6">
        © {new Date().getFullYear()} SpotlessHome. All rights reserved.
      </div>
    </footer>
  )
}
