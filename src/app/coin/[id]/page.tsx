'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(LineElement, PointElement, LinearScale, CategoryScale, Tooltip, Legend);

type CoinData = {
  id: string;
  name: string;
  symbol: string;
  image: { large: string };
  market_data: {
    current_price: { usd: number };
    high_24h: { usd: number };
    low_24h: { usd: number };
    price_change_percentage_24h: number;
  };
  description: { en: string };
};

export default function CoinDetailPage() {
  const { id } = useParams();
  const [coin, setCoin] = useState<CoinData | null>(null);
  const [chartData, setChartData] = useState<number[][]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;

    const fetchCoin = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}`);
        const data = await res.json();
        setCoin(data);
      } catch {
        setError('Failed to load coin data');
      }
    };

    const fetchChart = async () => {
      try {
        const res = await fetch(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=7`);
        const data = await res.json();
        setChartData(data.prices); // [timestamp, price]
      } catch {
        setError('Failed to load chart data');
      } finally {
        setLoading(false);
      }
    };

    fetchCoin();
    fetchChart();
  }, [id]);

  if (loading) return <p className="text-white p-6">Loading coin data...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;
  if (!coin) return null;

  const data = {
    labels: chartData.map((d) => new Date(d[0]).toLocaleDateString()),
    datasets: [
      {
        label: `${coin.name} Price (7d)`,
        data: chartData.map((d) => d[1]),
        borderColor: 'rgb(59, 130, 246)', // blue-500
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        tension: 0.2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
    },
  };

  return (
    <div className="p-6 bg-gray-900 text-white min-h-screen">
      <h1 className="text-3xl font-bold mb-4 text-blue-400">{coin.name} ({coin.symbol.toUpperCase()})</h1>
      <img src={coin.image.large} alt={coin.name} className="w-24 h-24 mb-4" />

      <div className="mb-4">
        <p><strong>Current Price:</strong> ${coin.market_data.current_price.usd.toLocaleString()}</p>
        <p><strong>24h High:</strong> ${coin.market_data.high_24h.usd.toLocaleString()}</p>
        <p><strong>24h Low:</strong> ${coin.market_data.low_24h.usd.toLocaleString()}</p>
        <p>
          <strong>24h Change:</strong>{' '}
          <span className={coin.market_data.price_change_percentage_24h >= 0 ? 'text-green-400' : 'text-red-400'}>
            {coin.market_data.price_change_percentage_24h.toFixed(2)}%
          </span>
        </p>
      </div>

      <div className="bg-gray-800 p-4 rounded-lg shadow mb-6">
        <Line data={data} options={options} />
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">About {coin.name}</h2>
        <p className="text-gray-300 text-sm" dangerouslySetInnerHTML={{ __html: coin.description.en.split('. ')[0] + '.' }} />
      </div>
    </div>
  );
}
