import { useState, useEffect } from "react";
import { useAuth } from "../../context/useAuth";

const emptyForm = { name: "", price: "", category: "men's fashion", description: "", img: "" };

const AdminProducts = () => {
  const { user } = useAuth();
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState("");
  const token = localStorage.getItem("token");

  const fetchProducts = () => {
    fetch("http://localhost:5000/api/products")
      .then((res) => res.json())
      .then(setProducts);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (!user || user.role !== "admin") {
    return <div className="min-h-[60vh] flex items-center justify-center text-gray-600">Access denied. Admins only.</div>;
  }

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    const url = editingId
      ? `http://localhost:5000/api/products/${editingId}`
      : "http://localhost:5000/api/products";
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ ...form, price: parseFloat(form.price) }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.message || "Failed to save product");
        return;
      }
      setForm(emptyForm);
      setEditingId(null);
      fetchProducts();
    } catch {
      setError("Something went wrong");
    }
  };

  const handleEdit = (p) => {
    setForm({ name: p.name, price: p.price, category: p.category, description: p.description, img: p.img });
    setEditingId(p._id);
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this product?")) return;
    await fetch(`http://localhost:5000/api/products/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });
    fetchProducts();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Manage Products</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="lg:col-span-1 bg-white border border-gray-100 rounded-xl p-6 flex flex-col gap-3 h-fit">
          <h2 className="font-semibold text-gray-900 mb-1">{editingId ? "Edit Product" : "Add New Product"}</h2>
          {error && <div className="bg-red-50 text-red-600 text-sm px-3 py-2 rounded-lg">{error}</div>}

          <input name="name" required placeholder="Product name" value={form.name} onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
          <input name="price" required type="number" step="0.01" placeholder="Price" value={form.price} onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
          <select name="category" value={form.category} onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none">
            <option value="men's fashion">Men's Fashion</option>
            <option value="women's fashion">Women's Fashion</option>
            <option value="electronics">Electronics</option>
            <option value="home & living">Home & Living</option>
          </select>
          <textarea name="description" required placeholder="Description" value={form.description} onChange={handleChange} rows={3}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />
          <input name="img" required placeholder="Image URL" value={form.img} onChange={handleChange}
            className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-orange-500" />

          <button type="submit" className="bg-gray-900 hover:bg-orange-500 text-white py-2.5 rounded-full font-medium transition-colors mt-2">
            {editingId ? "Update Product" : "Add Product"}
          </button>
          {editingId && (
            <button type="button" onClick={() => { setForm(emptyForm); setEditingId(null); }}
              className="text-sm text-gray-500 hover:text-gray-700">
              Cancel editing
            </button>
          )}
        </form>

        {/* Product list */}
        <div className="lg:col-span-2 flex flex-col gap-3">
          {products.map((p) => (
            <div key={p._id} className="flex items-center gap-4 bg-white border border-gray-100 rounded-xl p-4">
              <img src={p.img} alt={p.name} className="w-16 h-16 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="font-medium text-gray-800">{p.name}</h3>
                <p className="text-sm text-gray-500 capitalize">{p.category} · ${p.price}</p>
              </div>
              <button onClick={() => handleEdit(p)} className="text-sm text-orange-500 font-medium">Edit</button>
              <button onClick={() => handleDelete(p._id)} className="text-sm text-red-500 font-medium">Delete</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminProducts;