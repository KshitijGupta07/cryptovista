'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleRegister = async (e: any) => {
    e.preventDefault();
    const res = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, password })
    });

    const data = await res.json();
    if (res.ok) {
      setMessage('Registration successful');
      router.push('/login');
    } else {
      setMessage(data.message);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 mt-10 rounded">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      {message && <p className="text-red-500 mb-2">{message}</p>}
      <form onSubmit={handleRegister}>
        <input
          type="text"
          placeholder="Username"
          className="w-full mb-4 p-2 rounded text-black"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded text-black"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="bg-blue-500 w-full py-2 rounded">
          Register
        </button>
      </form>
      <p className="mt-4 text-gray-400">
        Already have an account? <a href="/login" className="text-blue-400">Login</a>
      </p>
    </div>
  );
}
