import { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

const categories = ["all", "men's fashion", "women's fashion", "electronics", "home & living"];

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const activeCategory = searchParams.get("category") || "all";
  const [sortBy, setSortBy] = useState("default");
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const url = activeCategory === "all"
      ? "http://localhost:5000/api/products"
      : `http://localhost:5000/api/products?category=${encodeURIComponent(activeCategory)}`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [activeCategory]);

  let filtered = products;

  if (search.trim()) {
    filtered = filtered.filter((p) =>
      p.name.toLowerCase().includes(search.toLowerCase())
    );
  }

  if (sortBy === "low-high") filtered = [...filtered].sort((a, b) => a.price - b.price);
  if (sortBy === "high-low") filtered = [...filtered].sort((a, b) => b.price - a.price);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
      <p className="text-gray-500 mb-8">{filtered.length} products found</p>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="bg-white border border-gray-100 rounded-xl p-5 sticky top-24">
            <h3 className="font-semibold text-gray-900 mb-4">Search</h3>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm mb-6 outline-none focus:border-orange-500"
            />

            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="flex flex-col gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() =>
                    cat === "all"
                      ? setSearchParams({})
                      : setSearchParams({ category: cat })
                  }
                  className={`text-left text-sm px-3 py-2 rounded-lg capitalize transition-colors ${
                    activeCategory === cat
                      ? "bg-orange-500 text-white"
                      : "text-gray-600 hover:bg-gray-100"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </aside>

        <div className="lg:col-span-3">
          <div className="flex justify-end mb-4">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none"
            >
              <option value="default">Sort: Default</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
            </select>
          </div>

          {loading ? (
            <p className="text-gray-500 text-center py-20">Loading products...</p>
          ) : filtered.length === 0 ? (
            <p className="text-gray-500 text-center py-20">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
              {filtered.map((p) => (
                <Link
                  to={`/products/${p._id}`}
                  key={p._id}
                  className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow group"
                >
                  <div className="overflow-hidden h-48">
                    <img
                      src={p.img}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-800 mb-1 truncate">{p.name}</h3>
                    <p className="text-orange-500 font-bold">${p.price}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Products;