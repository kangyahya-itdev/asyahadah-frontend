import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("token"); // Cek apakah ada token (sesuai sistem autentikasi kamu)

  const { pathname } = req.nextUrl;

  // Jika pengguna belum login dan mencoba mengakses halaman selain /login, redirect ke /login
  if (!token && pathname !== "/login") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  // Jika pengguna sudah login dan mencoba mengakses /login, redirect ke /dashboard
  if (token && pathname === "/login") {
    return NextResponse.redirect(new URL("/adminpanel", req.url));
  }

  return NextResponse.next(); // Izinkan akses
}

// Tentukan rute yang dikenai middleware
export const config = {
  matcher: ["/adminpanel"], // Sesuaikan dengan rute yang butuh proteksi
};
