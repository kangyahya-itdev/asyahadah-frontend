"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCookie } from "cookies-next";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = getCookie("token"); // Ambil token dari cookies (sesuaikan dengan sistem autentikasi kamu)

    if (!token) {
      router.replace("/login"); // Redirect ke /login jika belum login
    } else {
      router.replace("/adminpanel"); // Redirect ke /dashboard jika sudah login
    }
  }, []);

  return <div className="text-center">Redirecting...</div>;
}
