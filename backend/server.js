require("dotenv").config();
const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Koneksi ke database MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "db_asyahadah",
});

db.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
  } else {
    console.log("Connected to MySQL database");
  }
});

// Endpoint untuk mendapatkan data produk
app.get("/api/products", (req, res) => {
  db.query("SELECT * FROM products", (err, results) => {
    if (err) {
      return res.status(500).json({ error: "Error fetching data" });
    }
    res.json(results);
  });
});

app.post("/api/products", (req, res) => {
  const { name, description, price, stock } = req.body;

  if (!name || !description || !price || !stock) {
    return res.status(400).json({ error: "Semua kolom harus diisi" });
  }

  const query = "INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)";
  db.query(query, [name, description, price, stock], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Error inserting product" });
    }
    res.json({ id: result.insertId, name, description, price, stock });
  });
});

// Jalankan server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
