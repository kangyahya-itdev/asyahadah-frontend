export default function Users() {
    return (
        <div className="p-6">
        <h1 className="text-2xl font-bold mb-4">Produk</h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse border border-gray-300 bg-white">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 p-2">No</th>
                <th className="border border-gray-300 p-2">Nama</th>
                <th className="border border-gray-300 p-2">Handphone</th>
                <th className="border border-gray-300 p-2">Email</th>
                <th className="border border-gray-300 p-2">Role</th>
                <th className="border border-gray-300 p-2">Referral Code</th>
                <th className="border border-gray-300 p-2">Aksi</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-2 text-center">1</td>
                <td className="border border-gray-300 p-2">Yahya</td>
                <td className="border border-gray-300 p-2 text-right">085198717908</td>
                <td className="border border-gray-300 p-2 text-center">yahya@gmail.com</td>
                <td className="border border-gray-300 p-2 text-center">Admin</td>
                <td className="border border-gray-300 p-2 text-center">ASYAHADAH</td>
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
  