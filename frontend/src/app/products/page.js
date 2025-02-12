export default function Product() {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Produk</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Nama Produk</th>
                <th className="border border-gray-300 p-2">Harga</th>
                <th className="border border-gray-300 p-2">Stok</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">1</td>
                <td className="border border-gray-300 p-2">Beras Premium 5kg</td>
                <td className="border border-gray-300 p-2 text-right">Rp50.000</td>
                <td className="border border-gray-300 p-2 text-center">20</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-2 text-center">2</td>
                <td className="border border-gray-300 p-2">Beras Organik 2kg</td>
                <td className="border border-gray-300 p-2 text-right">Rp30.000</td>
                <td className="border border-gray-300 p-2 text-center">15</td>
                <td className="border border-gray-300 p-2 text-center">
                  <button className="bg-blue-500 text-white px-3 py-1 rounded mr-2">Edit</button>
                  <button className="bg-red-500 text-white px-3 py-1 rounded">Hapus</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    );
  }
  