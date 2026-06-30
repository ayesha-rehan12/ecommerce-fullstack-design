import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/useAuth";

const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({ products: 0, orders: 0 });

  useEffect(() => {
    const token = localStorage.getItem("token");
    Promise.all([
      fetch("http://localhost:5000/api/products").then((r) => r.json()),
      fetch("http://localhost:5000/api/orders", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    ]).then(([products, orders]) => {
      setStats({
        products: Array.isArray(products) ? products.length : 0,
        orders: Array.isArray(orders) ? orders.length : 0,
      });
    });
  }, []);

  if (!user || user.role !== "admin") {
    return (
      <div className="min-h-[60vh] flex items-center justify-center text-gray-600">
        Access denied. Admins only.
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Admin Dashboard</h1>
      <p className="text-gray-500 mb-8">Welcome back, {user.name}</p>

      <div className="grid sm:grid-cols-2 gap-6 mb-10">
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-gray-500 text-sm mb-1">Total Products</p>
          <p className="text-3xl font-bold text-gray-900">{stats.products}</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-xl p-6">
          <p className="text-gray-500 text-sm mb-1">Total Orders</p>
          <p className="text-3xl font-bold text-gray-900">{stats.orders}</p>
        </div>
      </div>

      <div className="flex gap-4">
        <Link to="/admin/products" className="bg-gray-900 hover:bg-orange-500 text-white px-6 py-3 rounded-full font-medium transition-colors">
          Manage Products
        </Link>
        <Link to="/admin/orders" className="bg-white border border-gray-200 hover:border-orange-500 text-gray-800 px-6 py-3 rounded-full font-medium transition-colors">
          View Orders
        </Link>
      </div>
    </div>
  );
};

export default AdminDashboard;