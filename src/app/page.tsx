// app/page.tsx
import Link from 'next/link';
import CryptoTop5 from '../components/Cryptotop5';

export default function HomePage() {
  return (
    <main className="bg-gray-900 text-white min-h-screen">
      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gradient-to-b from-gray-900 to-black">
        <h1 className="text-5xl md:text-6xl font-extrabold text-blue-400 drop-shadow-lg">
          Welcome to CryptoVista
        </h1>
        <p className="text-lg md:text-xl text-gray-300 mt-4 max-w-2xl mx-auto">
          Your personal crypto tracker with real-time data, news, and portfolio insights.
        </p>
        <div className="mt-6 flex justify-center space-x-4">
          <Link href="/login" className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-full font-medium shadow">
            Get Started
          </Link>
          <Link href="/help" className="border border-gray-500 px-6 py-2 rounded-full font-medium text-gray-300 hover:bg-gray-800">
            Contact Developer
          </Link>
        </div>
      </section>

      {/* Top 5 Coins */}
      <section className="py-14 px-6">
        <h2 className="text-3xl font-bold text-blue-400 text-center mb-8">Top 5 Coins</h2>
        <CryptoTop5 />
      </section>

      {/* Features */}
      <section className="py-14 px-6 bg-gray-800">
        <h2 className="text-3xl font-bold text-center mb-8 text-blue-400">Why CryptoVista?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
            <h3 className="text-xl font-semibold mb-2 text-green-400">Live Prices</h3>
            <p className="text-gray-300">Track real-time market prices and changes.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
            <h3 className="text-xl font-semibold mb-2 text-yellow-400">Coin Insights</h3>
            <p className="text-gray-300">Get detailed charts, stats, and coin descriptions.</p>
          </div>
          <div className="p-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition">
            <h3 className="text-xl font-semibold mb-2 text-red-400">Portfolio</h3>
            <p className="text-gray-300">Track your holdings and monitor your gains.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 py-6 text-center text-gray-400 border-t border-gray-800">
        <p>&copy; 2025 CryptoVista. Built by <Link href="/help" className="text-blue-400 hover:underline">Kshitij Gupta</Link></p>
      </footer>
    </main>
  );
}
