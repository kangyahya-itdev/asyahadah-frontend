"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { deleteCookie } from "cookies-next";

export default function Logout() {
  const router = useRouter();

  useEffect(() => {
    // Hapus token dari cookies
    deleteCookie("token");

    // Redirect ke halaman login setelah logout
    router.replace("/login");
  }, []);

  return <div className="text-center">Logging out...</div>;
}
