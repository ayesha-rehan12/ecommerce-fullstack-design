import { Link } from "react-router-dom";

const categories = [
  { name: "Men's Fashion", img: "https://images.unsplash.com/photo-1516257984-b1b4d707412e?w=400" },
  { name: "Women's Fashion", img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=400" },
  { name: "Electronics", img: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400" },
  { name: "Home & Living", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400" },
];

const featuredProducts = [
  { id: 1, name: "Classic White Sneakers", price: 49.99, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
  { id: 2, name: "Leather Crossbody Bag", price: 79.99, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400" },
  { id: 3, name: "Wireless Headphones", price: 129.99, img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400" },
  { id: 4, name: "Minimalist Watch", price: 89.99, img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=400" },
];

const Home = () => {
  return (
    <div>
      {/* Hero section */}
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <span className="text-orange-500 font-semibold text-sm uppercase tracking-wide">New Season Arrivals</span>
            <h1 className="text-4xl sm:text-5xl font-bold mt-3 mb-4 leading-tight">
              Discover Your <span className="text-orange-500">Perfect Style</span>
            </h1>
            <p className="text-gray-300 mb-6 max-w-md">
              Shop the latest trends in fashion, electronics, and lifestyle products — all in one place, at prices you'll love.
            </p>
            <Link
              to="/products"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-medium px-8 py-3 rounded-full transition-colors"
            >
              Shop Now
            </Link>
          </div>
          <div className="hidden md:block">
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600"
              alt="Hero"
              className="rounded-2xl w-full h-80 object-cover"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              to={`/products?category=${cat.name.toLowerCase()}`}
              key={cat.name}
              className="group relative rounded-xl overflow-hidden h-48"
            >
              <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/40 flex items-end p-4">
                <span className="text-white font-semibold">{cat.name}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured products */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/products" className="text-orange-500 hover:text-orange-600 text-sm font-medium">
              View All →
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featuredProducts.map((p) => (
              <div key={p.id} className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="overflow-hidden h-48">
                  <img src={p.img} alt={p.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-4">
                  <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{p.name}</h3>
                  <p className="text-orange-500 font-bold">${p.price}</p>
                  <button className="mt-3 w-full bg-gray-900 hover:bg-orange-500 text-white text-sm py-2 rounded-lg transition-colors">
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promo banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-orange-500 rounded-2xl p-10 text-center text-white">
          <h2 className="text-3xl font-bold mb-2">Get 20% Off Your First Order</h2>
          <p className="mb-6 text-orange-100">Sign up for our newsletter and save on your first purchase</p>
          <Link to="/login" className="inline-block bg-white text-orange-500 font-medium px-8 py-3 rounded-full hover:bg-gray-100 transition-colors">
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Home;