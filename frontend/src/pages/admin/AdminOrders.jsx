import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";

const AdminOrders = () => {
  const { user } = useAuth();
  const [orders, setOrders] = useState([]);
  const token = localStorage.getItem("token");

  const fetchOrders = () => {
    fetch("http://localhost:5000/api/orders", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setOrders(Array.isArray(data) ? data : []));
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  if (!user || user.role !== "admin") {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Access denied. Admins only.</div>;
  }

  const updateStatus = async (id, status) => {
    await fetch(`http://localhost:5000/api/orders/${id}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
      body: JSON.stringify({ status }),
    });
    fetchOrders();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">All Orders</h1>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders yet.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {orders.map((order) => (
            <div key={order._id} className="bg-white border border-gray-100 rounded-xl p-5">
              <div className="flex flex-wrap justify-between items-start gap-2 mb-3">
                <div>
                  <p className="font-medium text-gray-800">{order.user?.name || "Unknown"} ({order.user?.email})</p>
                  <p className="text-xs text-gray-400">Order #{order._id.slice(-6)} · {new Date(order.createdAt).toLocaleDateString()}</p>
                </div>
                <select
                  value={order.status}
                  onChange={(e) => updateStatus(order._id, e.target.value)}
                  className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm outline-none"
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                </select>
              </div>

              <div className="text-sm text-gray-600 mb-2">
                {order.items.map((item, i) => (
                  <span key={i}>{item.name} × {item.quantity}{i < order.items.length - 1 ? ", " : ""}</span>
                ))}
              </div>

              <p className="text-sm text-gray-500">
                {order.shippingAddress?.address}, {order.shippingAddress?.city} — {order.shippingAddress?.phone}
              </p>

              <p className="font-bold text-gray-900 mt-2">Total: ${order.totalAmount.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;