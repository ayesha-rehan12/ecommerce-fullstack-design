import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const allProducts = [
  { id: 1, name: "Classic White Sneakers", price: 49.99, category: "men's fashion", desc: "Comfortable everyday sneakers made with breathable canvas and a durable rubber sole. Perfect for casual outings.", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600" },
  { id: 2, name: "Leather Crossbody Bag", price: 79.99, category: "women's fashion", desc: "Genuine leather crossbody bag with adjustable strap and multiple compartments for everyday essentials.", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600" },
  { id: 3, name: "Wireless Headphones", price: 129.99, category: "electronics", desc: "Premium noise-cancelling wireless headphones with 30-hour battery life and crystal-clear sound.", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600" },
  { id: 4, name: "Minimalist Watch", price: 89.99, category: "men's fashion", desc: "Sleek minimalist watch with stainless steel band, water-resistant up to 50m.", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600" },
  { id: 5, name: "Summer Floral Dress", price: 59.99, category: "women's fashion", desc: "Lightweight floral dress perfect for summer days, made with breathable cotton blend fabric.", img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600" },
  { id: 6, name: "Smart LED Lamp", price: 34.99, category: "home & living", desc: "App-controlled LED lamp with 16 million colors and voice assistant compatibility.", img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600" },
  { id: 7, name: "Bluetooth Speaker", price: 45.99, category: "electronics", desc: "Portable waterproof Bluetooth speaker with 12-hour playtime and deep bass.", img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600" },
  { id: 8, name: "Denim Jacket", price: 69.99, category: "men's fashion", desc: "Classic denim jacket with a modern fit, perfect for layering in any season.", img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600" },
];

const ProductDetails = () => {
  const { id } = useParams();
  const product = allProducts.find((p) => p.id === parseInt(id));
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Product not found.</p>
        <Link to="/products" className="text-orange-500 font-medium">← Back to Products</Link>
      </div>
    );
  }

const handleAddToCart = () => {
  addToCart(product, quantity);
  setAdded(true);
  setTimeout(() => setAdded(false), 2000);
};

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link> /{" "}
        <Link to="/products" className="hover:text-orange-500">Products</Link> /{" "}
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        {/* Image */}
        <div className="rounded-2xl overflow-hidden bg-gray-50">
          <img src={product.img} alt={product.name} className="w-full h-[420px] object-cover" />
        </div>

        {/* Info */}
        <div>
          <span className="text-orange-500 text-sm font-medium capitalize">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

          {/* Rating placeholder */}
          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.952c.3.922-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.196-1.538-1.118l1.287-3.952a1 1 0 00-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.953z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>

          <p className="text-gray-600 leading-relaxed mb-8">{product.desc}</p>

          {/* Quantity selector */}
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                −
              </button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-10 py-3 rounded-full font-medium transition-colors ${
              added
                ? "bg-green-500 text-white"
                : "bg-gray-900 hover:bg-orange-500 text-white"
            }`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

          {/* Extra info */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-500 border-t border-gray-100 pt-6">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Free shipping over $50
            </div>
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              30-day return policy
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;