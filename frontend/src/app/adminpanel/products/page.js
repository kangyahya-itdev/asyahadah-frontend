"use client";
import { useEffect, useState } from "react";

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [itemsPerPage] = useState(5);
  const [sortConfig, setSortConfig] = useState({ key: "name", direction: "asc" });
  const [newProduct, setNewProduct] = useState({ name: "", description: "", price: "", stock: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        if (!API_URL) throw new Error("API URL tidak ditemukan!");

        const response = await fetch(`${API_URL}/products`);
        if (!response.ok) throw new Error("Gagal mengambil data");

        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.description || !newProduct.price || !newProduct.stock) {
      alert("Semua kolom harus diisi!");
      return;
    }

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const response = await fetch(`${API_URL}/products`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      if (!response.ok) throw new Error("Gagal menambahkan produk");

      const createdProduct = await response.json();
      setProducts([...products, createdProduct]); // Update state tanpa reload
      setNewProduct({ name: "", description: "",price: "", stock: "" });
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleEditProduct = async (id, field, value) => {
    try {
      const updatedProducts = products.map((product) =>
        product.id === id ? { ...product, [field]: value } : product
      );
      setProducts(updatedProducts);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${API_URL}/products/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [field]: value }),
      });
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (!confirm("Apakah Anda yakin ingin menghapus produk ini?")) return;

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      await fetch(`${API_URL}/products/${id}`, { method: "DELETE" });

      setProducts(products.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const sortedProducts = [...products].sort((a, b) => {
    if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === "asc" ? -1 : 1;
    if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === "asc" ? 1 : -1;
    return 0;
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Produk</h1>

      {/* Search Bar */}
      <input
        type="text"
        placeholder="Cari produk..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 border border-gray-300 rounded w-1/3 mb-4"
      />

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">No</th>
              <th className="border p-2 cursor-pointer" onClick={() => setSortConfig({ key: "name", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Nama Produk ⬍
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => setSortConfig({ key: "description", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Deskripsi ⬍
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => setSortConfig({ key: "price", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Harga ⬍
              </th>
              <th className="border p-2 cursor-pointer" onClick={() => setSortConfig({ key: "stock", direction: sortConfig.direction === "asc" ? "desc" : "asc" })}>
                Stok ⬍
              </th>
              <th className="border p-2">Aksi</th>
            </tr>
          </thead>
          <tbody>
            {paginatedProducts.map((product, index) => (
              <tr key={product.id}>
                <td className="border p-2 text-center">
                  {(currentPage - 1) * itemsPerPage + index + 1}
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={product.name}
                    className="w-full border-none bg-transparent"
                    onChange={(e) => handleEditProduct(product.id, "name", e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="text"
                    value={product.description}
                    className="w-full border-none bg-transparent"
                    onChange={(e) => handleEditProduct(product.id, "description", e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={product.price}
                    className="w-full border-none bg-transparent"
                    onChange={(e) => handleEditProduct(product.id, "price", e.target.value)}
                  />
                </td>
                <td className="border p-2">
                  <input
                    type="number"
                    value={product.stock}
                    className="w-full border-none bg-transparent"
                    onChange={(e) => handleEditProduct(product.id, "stock", e.target.value)}
                  />
                </td>
                <td className="border p-2 text-center">
                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}

            {/* Baris Tambah Produk */}
            <tr>
              <td className="border p-2 text-center">+</td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Nama Produk"
                  className="w-full border-none bg-transparent"
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                />
              </td>
              <td className="border p-2">
                <input
                  type="text"
                  placeholder="Deskripsi"
                  className="w-full border-none bg-transparent"
                  value={newProduct.description}
                  onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  placeholder="Harga"
                  className="w-full border-none bg-transparent"
                  value={newProduct.price}
                  onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
                />
              </td>
              <td className="border p-2">
                <input
                  type="number"
                  placeholder="Stok"
                  className="w-full border-none bg-transparent"
                  value={newProduct.stock}
                  onChange={(e) => setNewProduct({ ...newProduct, stock: e.target.value })}
                />
              </td>
              <td className="border p-2 text-center">
                <button
                  className="bg-green-500 text-white px-3 py-1 rounded"
                  onClick={handleAddProduct}
                >
                  Tambah
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
