'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AccountPage() {
  const [user, setUser] = useState<{ username: string } | null>(null);
  const router = useRouter();

  useEffect(() => {
    const cookies = document.cookie.split('; ').reduce((acc: any, cookie) => {
      const [name, value] = cookie.split('=');
      acc[name] = value;
      return acc;
    }, {});

    if (cookies.user) {
      setUser({ username: cookies.user });
    } else {
      router.push('/login');
    }
  }, [router]);

  const handleLogout = () => {
    // Clear the cookies by setting expiration in the past
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'userId=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    router.push('/');
  };

  if (!user) return null;

  return (
    <div className="max-w-xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Your Account</h1>
      <p className="mb-4 text-lg">
        <strong>Username:</strong> {user.username}
      </p>

      <button
        onClick={handleLogout}
        className="mt-4 bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded transition"
      >
        Logout
      </button>
    </div>
  );
}
