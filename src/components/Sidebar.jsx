"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaTachometerAlt, FaBox, FaMoneyBill, FaShoppingCart, FaWallet, FaUsers, FaSignOutAlt, FaUser, FaUserShield, FaChevronDown, FaChevronRight, FaChevronLeft, FaFileAlt } from "react-icons/fa";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isUsersOpen, setIsUsersOpen] = useState(false); // State untuk submenu Users
  const pathname = usePathname();

  const menuItems = [
    { name: "Dashboard", path: "/dashboard", icon: <FaTachometerAlt /> },
    { name: "Produk", path: "/products", icon: <FaBox /> },
    { name: "Komisi", path: "/commissions", icon: <FaMoneyBill /> },
    { name: "Pesanan", path: "/orders", icon: <FaShoppingCart /> },
    { name: "Topups", path: "/topups", icon: <FaWallet /> },
  ];

  return (
    <aside
      className={`bg-green-900 text-white p-4 transition-all duration-300 ${
        isCollapsed ? "w-20" : "w-64"
      } h-full`}
    >
      {/* Header Panel Admin & Tombol Hamburger */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">{!isCollapsed ? "Panel Admin" : "PA"}</h2>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white p-2 rounded hover:bg-green-700 transition-all"
        >
          <FaBars size={20} />
        </button>
      </div>

      {/* Menu Utama */}
      <nav>
        <ul>
          {menuItems.map((item) => (
            <li key={item.path} className="mb-2">
              <Link
                href={item.path}
                className={`flex items-center gap-2 p-2 rounded ${
                  pathname === item.path ? "bg-green-700 font-bold" : "hover:bg-green-700"
                }`}
              >
                {item.icon}
                {!isCollapsed && <span>{item.name}</span>}
              </Link>
            </li>
          ))}

          {/* Menu Users dengan Dropdown */}
          <li className="mb-2">
            <button
              onClick={() => setIsUsersOpen(!isUsersOpen)}
              className={`flex items-center justify-between w-full gap-2 p-2 rounded ${
                pathname.startsWith("/users") ? "bg-green-700 font-bold" : "hover:bg-green-700"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaUsers />
                {!isCollapsed && <span>Pengguna</span>}
              </div>

              {/* Arrow untuk menandakan dropdown */}
              {!isCollapsed && (
                <span>
                  {isUsersOpen ? <FaChevronDown /> : <FaChevronRight />}
                </span>
              )}

              {isCollapsed && (
                <span>
                  {isUsersOpen ? <FaChevronDown /> : <FaChevronLeft />}
                </span>
              )}
            </button>

            {/* Submenu Users */}
            {!isCollapsed && isUsersOpen && (
              <ul className="ml-6 mt-2">
                <li className="mb-2">
                  <Link
                    href="/users/administrator"
                    className={`flex items-center gap-2 p-2 rounded ${
                      pathname === "/users/administrator" ? "bg-green-700 font-bold" : "hover:bg-green-700"
                    }`}
                  >
                    <FaUserShield />
                    <span>Administrator</span>
                  </Link>
                </li>
                <li className="mb-2">
                  <Link
                    href="/users/user"
                    className={`flex items-center gap-2 p-2 rounded ${
                      pathname === "/users/user" ? "bg-green-700 font-bold" : "hover:bg-green-700"
                    }`}
                  >
                    <FaUser />
                    <span>Users</span>
                  </Link>
                </li>
              </ul>
            )}
          </li>
          <li>
            <Link
            href='/laporan'
            className="flex items-center gap-2 p-2 hover:bg-green-700 rounded"
            >
              <FaFileAlt />
              {!isCollapsed && <span>Laporan</span>}
            </Link>
          </li>
          {/* Logout */}
          <li>
            <Link
              href="/settings"
              className="flex items-center gap-2 p-2 hover:bg-green-700 rounded"
            >
              <FaSignOutAlt />
              {!isCollapsed && <span>Logout</span>}
            </Link>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
