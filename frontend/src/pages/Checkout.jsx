import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/useCart";
import { useAuth } from "../context/useAuth";

const Checkout = () => {
  const { cartItems, cartTotal, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: user?.name || "",
    address: "",
    city: "",
    postalCode: "",
    phone: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + shipping;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!user) {
      setError("Please login to place an order.");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          items: cartItems.map((item) => ({
            product: item.id,
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            img: item.img,
          })),
          shippingAddress: formData,
          totalAmount: total,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Failed to place order");
        setLoading(false);
        return;
      }

      setSuccess(true);
      clearCart();
      setTimeout(() => navigate("/"), 2500);
    } catch {
      setError("Something went wrong. Is the backend running?");
      setLoading(false);
    }
  };

  if (cartItems.length === 0 && !success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4">
        <p className="text-xl text-gray-600">Your cart is empty</p>
        <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-900">Order Placed Successfully!</h2>
        <p className="text-gray-500">Redirecting you to home...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      {!user && (
        <div className="bg-amber-50 text-amber-700 text-sm px-4 py-3 rounded-lg mb-6">
          You need to <Link to="/login" className="font-medium underline">login</Link> before placing an order.
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        {/* Shipping form */}
        <form onSubmit={handleSubmit} className="md:col-span-2 bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-4">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Shipping Information</h2>

          {error && (
            <div className="bg-red-50 text-red-600 text-sm px-4 py-2 rounded-lg">{error}</div>
          )}

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
            <input type="text" name="fullName" required value={formData.fullName} onChange={handleChange}
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Address</label>
            <input type="text" name="address" required value={formData.address} onChange={handleChange}
              placeholder="House #, Street, Area"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">City</label>
              <input type="text" name="city" required value={formData.city} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
            </div>
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Postal Code</label>
              <input type="text" name="postalCode" required value={formData.postalCode} onChange={handleChange}
                className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 mb-1 block">Phone Number</label>
            <input type="tel" name="phone" required value={formData.phone} onChange={handleChange}
              placeholder="03XX-XXXXXXX"
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm outline-none focus:border-orange-500" />
          </div>

          <button
            type="submit"
            disabled={loading || !user}
            className="bg-gray-900 hover:bg-orange-500 text-white py-3 rounded-full font-medium transition-colors mt-2 disabled:opacity-50"
          >
            {loading ? "Placing order..." : "Place Order (Cash on Delivery)"}
          </button>
        </form>

        {/* Order summary */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
          <div className="flex flex-col gap-3 mb-4 max-h-64 overflow-y-auto">
            {cartItems.map((item) => (
              <div key={item.id} className="flex items-center gap-3 text-sm">
                <img src={item.img} alt={item.name} className="w-12 h-12 object-cover rounded-lg" />
                <div className="flex-1">
                  <p className="text-gray-800 truncate">{item.name}</p>
                  <p className="text-gray-500">Qty: {item.quantity}</p>
                </div>
                <p className="font-medium text-gray-900">${(item.price * item.quantity).toFixed(2)}</p>
              </div>
            ))}
          </div>
          <div className="border-t border-gray-100 pt-4 flex flex-col gap-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal</span>
              <span>${cartTotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Shipping</span>
              <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 text-base border-t border-gray-100 pt-2 mt-1">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;