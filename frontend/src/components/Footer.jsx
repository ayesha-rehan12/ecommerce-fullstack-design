import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

          {/* Brand */}
          <div>
            <h2 className="text-2xl font-bold text-white mb-3">
              Shop<span className="text-orange-500">Zone</span>
            </h2>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Your one-stop destination for fashion, electronics, and lifestyle products. Quality you can trust, prices you'll love.
            </p>
            {/* Social icons */}
            <div className="flex gap-3">
              {["facebook", "instagram", "twitter", "youtube"].map((s) => (
                <a key={s} href="#" className="w-9 h-9 bg-gray-800 hover:bg-orange-500 rounded-full flex items-center justify-center transition-colors">
                  <span className="text-xs uppercase text-white">{s[0]}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { label: "Home", to: "/" },
                { label: "Products", to: "/products" },
                { label: "About Us", to: "/about" },
                { label: "Contact", to: "/contact" },
                { label: "Blog", to: "/blog" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.to} className="hover:text-orange-400 transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-white font-semibold mb-4">Categories</h3>
            <ul className="space-y-2 text-sm">
              {["Men's Fashion", "Women's Fashion", "Electronics", "Home & Living", "Sports", "Beauty"].map((cat) => (
                <li key={cat}>
                  <Link to={`/products?category=${cat.toLowerCase()}`} className="hover:text-orange-400 transition-colors">
                    {cat}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact + Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">Stay Connected</h3>
            <ul className="space-y-2 text-sm text-gray-400 mb-5">
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                Rawalpindi, Pakistan
              </li>
              <li className="flex items-center gap-2">
                <svg className="w-4 h-4 text-orange-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                support@shopzone.pk
              </li>
            </ul>
            {/* Newsletter */}
            <p className="text-sm text-white font-medium mb-2">Newsletter</p>
            <div className="flex">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-gray-800 text-sm text-white px-3 py-2 rounded-l-lg outline-none placeholder-gray-500"
              />
              <button className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-gray-800 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-gray-500">
          <p>© 2025 ShopZone. All rights reserved.</p>
          <div className="flex gap-4">
            <Link to="/privacy" className="hover:text-orange-400 transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="hover:text-orange-400 transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;