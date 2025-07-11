'use client';

import { useEffect, useState } from 'react';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function CryptoTop5() {
  const [coins, setCoins] = useState<Coin[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTopCoins = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=1&sparkline=false');
        const data = await res.json();
        setCoins(data);
      } catch (err) {
        setError('Failed to fetch top coins');
      } finally {
        setLoading(false);
      }
    };

    fetchTopCoins();
  }, []);

  if (loading) return <p className="text-white">Loading top coins...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4 text-blue-400">Top 5 Cryptocurrencies</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {coins.map((coin) => (
          <div key={coin.id} className="flex items-center space-x-4 bg-gray-900 p-3 rounded-lg shadow hover:shadow-md transition">
            <img src={coin.image} alt={coin.name} className="w-10 h-10" />
            <div>
              <h3 className="text-lg font-semibold">{coin.name} ({coin.symbol.toUpperCase()})</h3>
              <p className="text-sm text-gray-400">Price: ${coin.current_price.toLocaleString()}</p>
              <p className={`text-sm ${coin.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {coin.price_change_percentage_24h.toFixed(2)}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
