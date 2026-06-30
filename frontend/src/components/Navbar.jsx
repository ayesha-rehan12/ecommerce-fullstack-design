import { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
const { cartCount } = useCart();
const { user, logout } = useAuth();

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top bar */}
      <div className="bg-gray-900 text-white text-center text-xs py-2 px-4">
        Free shipping on orders over $50 — Shop Now
      </div>

      {/* Main navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-gray-900">
              Shop<span className="text-orange-500">Zone</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <Link to="/" className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
              Products
            </Link>
            <Link to="/products?category=men%27s+fashion" className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
              Men
            </Link>
            <Link to="/products?category=women%27s+fashion" className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
              Women
            </Link>
            <Link to="/products?category=electronics" className="text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
              Electronics
            </Link>
          </div>

          {user?.role === "admin" && (
            <Link to="/admin" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              Admin
            </Link>
          )} 
             
          {/* Search bar */}
          <div className="hidden md:flex items-center bg-gray-100 rounded-full px-4 py-2 w-64">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input
              type="text"
              placeholder="Search products..."
              className="bg-transparent text-sm outline-none w-full text-gray-700"
            />
          </div>

          {/* Icons */}
          <div className="flex items-center gap-4">
            {/* Cart */}
            <Link to="/cart" className="relative p-2 text-gray-700 hover:text-orange-500 transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {/* User */}
              {user ? (
                <button onClick={logout} className="hidden md:flex items-center gap-1 text-gray-700 hover:text-orange-500 text-sm font-medium transition-colors">
                  Hi, {user.name?.split(" ")[0]} (Logout)
                </button>
              ) : (
                <Link to="/login" className="hidden md:flex items-center gap-1 text-gray-700 hover:text-orange-500 transition-colors">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span className="text-sm font-medium">Login</span>
                </Link>
              )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 text-gray-700"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-4">
          <div className="flex items-center bg-gray-100 rounded-full px-4 py-2">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <input type="text" placeholder="Search products..." className="bg-transparent text-sm outline-none w-full" />
          </div>
          <Link to="/" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMenuOpen(false)}>Home</Link>
          <Link to="/products" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMenuOpen(false)}>Products</Link>
          <Link to="/products?category=men" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMenuOpen(false)}>Men</Link>
          <Link to="/products?category=women" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMenuOpen(false)}>Women</Link>
          <Link to="/products?category=electronics" className="text-gray-700 font-medium py-2 border-b border-gray-100" onClick={() => setMenuOpen(false)}>Electronics</Link>
          <Link to="/login" className="text-gray-700 font-medium py-2" onClick={() => setMenuOpen(false)}>Login / Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;