require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    name: "Classic White Sneakers",
    price: 49.99,
    category: "men's fashion",
    description:
      "Comfortable everyday sneakers made with breathable canvas and a durable rubber sole.",
    img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
  },
  {
    name: "Leather Crossbody Bag",
    price: 79.99,
    category: "women's fashion",
    description:
      "Genuine leather crossbody bag with adjustable strap and multiple compartments.",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
  },
  {
    name: "Wireless Headphones",
    price: 129.99,
    category: "electronics",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life.",
    img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
  },
  {
    name: "Minimalist Watch",
    price: 89.99,
    category: "men's fashion",
    description:
      "Sleek minimalist watch with stainless steel band, water-resistant up to 50m.",
    img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=600",
  },
  {
    name: "Summer Floral Dress",
    price: 59.99,
    category: "women's fashion",
    description: "Lightweight floral dress perfect for summer days.",
    img: "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?w=600",
  },
  {
    name: "Smart LED Lamp",
    price: 34.99,
    category: "home & living",
    description: "App-controlled LED lamp with 16 million colors.",
    img: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=600",
  },
  {
    name: "Bluetooth Speaker",
    price: 45.99,
    category: "electronics",
    description: "Portable waterproof Bluetooth speaker with 12-hour playtime.",
    img: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
  },
  {
    name: "Denim Jacket",
    price: 69.99,
    category: "men's fashion",
    description: "Classic denim jacket with a modern fit.",
    img: "https://images.unsplash.com/photo-1551028719-00167b16eac5?w=600",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("✅ Database seeded with products!");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedDB();
