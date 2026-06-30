import { Link } from "react-router-dom";
import { useCart } from "../context/useCart";

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity, cartTotal } = useCart();

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4">
        <svg className="w-20 h-20 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
        <p className="text-xl text-gray-600">Your cart is empty</p>
        <Link to="/products" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-full font-medium transition-colors">
          Continue Shopping
        </Link>
      </div>
    );
  }

  const shipping = cartTotal > 50 ? 0 : 5.99;
  const total = cartTotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shopping Cart</h1>

      <div className="grid md:grid-cols-3 gap-8">
        {/* Cart items */}
        <div className="md:col-span-2 flex flex-col gap-4">
          {cartItems.map((item) => (
            <div key={item.id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
              <img src={item.img} alt={item.name} className="w-20 h-20 object-cover rounded-lg" />

              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{item.name}</h3>
                <p className="text-orange-500 font-bold mt-1">${item.price}</p>
              </div>

              {/* Quantity */}
              <div className="flex items-center border border-gray-200 rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  −
                </button>
                <span className="w-8 text-center text-sm">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="w-8 h-8 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                >
                  +
                </button>
              </div>

              <p className="font-semibold text-gray-900 w-16 text-right">
                ${(item.price * item.quantity).toFixed(2)}
              </p>

              <button
                onClick={() => removeFromCart(item.id)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {/* Order summary */}
        <div className="bg-white border border-gray-100 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>

          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>${cartTotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm text-gray-600 mb-4">
            <span>Shipping</span>
            <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
          </div>
          <div className="border-t border-gray-100 pt-4 flex justify-between font-bold text-gray-900 mb-6">
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <Link
            to="/checkout"
            className="block text-center bg-gray-900 hover:bg-orange-500 text-white py-3 rounded-full font-medium transition-colors"
          >
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart;