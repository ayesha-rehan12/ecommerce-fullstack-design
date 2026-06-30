import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Placeholder pages (we'll build these next)
const Home = () => <div className="min-h-screen flex items-center justify-center text-2xl text-gray-700">Home Page — Coming Soon</div>;
const Products = () => <div className="min-h-screen flex items-center justify-center text-2xl text-gray-700">Products Page — Coming Soon</div>;
const Cart = () => <div className="min-h-screen flex items-center justify-center text-2xl text-gray-700">Cart Page — Coming Soon</div>;
const Login = () => <div className="min-h-screen flex items-center justify-center text-2xl text-gray-700">Login Page — Coming Soon</div>;

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;