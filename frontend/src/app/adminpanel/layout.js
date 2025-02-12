import "../../styles/globals.css";
import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";

export default function AdminLayout({ children }) {
  return (
        <div className="h-screen flex flex-col">
          {/* Navbar di atas */}
          <Navbar />

          {/* Kontainer utama (Sidebar + Konten) */}
          <div className="flex flex-1 pt-16"> {/* Tambahkan padding atas agar tidak tertutup navbar */}
            <Sidebar />
            <main className="flex-1 p-6 bg-gray-100 overflow-auto">{children}</main>
          </div>
        </div>
  );
}
