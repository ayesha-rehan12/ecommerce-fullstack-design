import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`http://localhost:5000/api/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">Loading...</div>;
  }

  if (!product || product.message === "Product not found") {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Product not found.</p>
        <Link to="/products" className="text-orange-500 font-medium">← Back to Products</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart({ id: product._id, name: product.name, price: product.price, img: product.img }, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <div className="text-sm text-gray-500 mb-6">
        <Link to="/" className="hover:text-orange-500">Home</Link> /{" "}
        <Link to="/products" className="hover:text-orange-500">Products</Link> /{" "}
        <span className="text-gray-800">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-10">
        <div className="rounded-2xl overflow-hidden bg-gray-50">
          <img src={product.img} alt={product.name} className="w-full h-[420px] object-cover" />
        </div>

        <div>
          <span className="text-orange-500 text-sm font-medium capitalize">{product.category}</span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2 mb-4">{product.name}</h1>

          <div className="flex items-center gap-1 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <svg key={star} className="w-5 h-5 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.953a1 1 0 00.95.69h4.155c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.287 3.952c.3.922-.755 1.688-1.538 1.118l-3.36-2.44a1 1 0 00-1.176 0l-3.36 2.44c-.783.57-1.838-.196-1.538-1.118l1.287-3.952a1 1 0 00-.364-1.118l-3.36-2.44c-.783-.57-.38-1.81.588-1.81h4.155a1 1 0 00.95-.69l1.286-3.953z" />
              </svg>
            ))}
            <span className="text-sm text-gray-500 ml-2">(24 reviews)</span>
          </div>

          <p className="text-3xl font-bold text-gray-900 mb-6">${product.price}</p>
          <p className="text-gray-600 leading-relaxed mb-8">{product.description}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium text-gray-700">Quantity</span>
            <div className="flex items-center border border-gray-200 rounded-lg">
              <button onClick={() => setQuantity((q) => Math.max(1, q - 1))} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100">−</button>
              <span className="w-10 text-center text-sm">{quantity}</span>
              <button onClick={() => setQuantity((q) => q + 1)} className="w-9 h-9 flex items-center justify-center text-gray-600 hover:bg-gray-100">+</button>
            </div>
          </div>

          <button
            onClick={handleAddToCart}
            className={`w-full sm:w-auto px-10 py-3 rounded-full font-medium transition-colors ${
              added ? "bg-green-500 text-white" : "bg-gray-900 hover:bg-orange-500 text-white"
            }`}
          >
            {added ? "Added to Cart ✓" : "Add to Cart"}
          </button>

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