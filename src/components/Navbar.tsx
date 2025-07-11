'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch('/api/auth/session', {
          cache: 'no-store',
        });
        const data = await res.json();
        setIsLoggedIn(data.isLoggedIn);
      } catch {
        setIsLoggedIn(false);
      }
    };

    checkSession();
  }, []);

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    setIsLoggedIn(false);
    window.location.href = '/';
  };

  return (
    <nav className="bg-gray-800 text-white px-6 py-4 flex justify-between items-center shadow">
      <Link href="/" className="text-xl font-bold text-blue-400">
        CryptoVista
      </Link>

      <div className="flex space-x-4 items-center">
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/news">News</Link>
        <Link href="/help">Help</Link>

        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-600 font-semibold"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
