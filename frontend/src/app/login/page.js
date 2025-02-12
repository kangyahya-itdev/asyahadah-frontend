"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (username === "administrator" && password === "administrator") {
      setError("");
      router.push("/dashboard");
    } else {
      setError("Invalid username or password");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <form className="bg-white p-6 rounded shadow-md" onSubmit={handleLogin}>
        <h2 className="text-2xl mb-4 text-center">Admin Login</h2>
        {error && <h3><span className="text-red-500 text-sm">{error}</span></h3>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-2 border mb-3"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border mb-3"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="bg-blue-500 text-white p-2 w-full">Login</button>
      </form>
    </div>
  );
}
