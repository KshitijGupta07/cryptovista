'use client';

import Link from 'next/link';
import Image from 'next/image';

type Coin = {
  id: string;
  name: string;
  symbol: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export default function CryptoCard({ coin }: { coin: Coin }) {
  const priceChange = coin.price_change_percentage_24h.toFixed(2);
  const isPositive = parseFloat(priceChange) >= 0;

  return (
    <Link href={`/coin/${coin.id}`}>
      <div className="bg-gray-800 text-white p-4 rounded-lg shadow-md hover:shadow-lg hover:scale-105 transition cursor-pointer">
        <div className="flex items-center gap-4">
          <Image
            src={coin.image}
            alt={coin.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <h2 className="text-lg font-semibold">{coin.name}</h2>
            <p className="text-sm text-gray-400 uppercase">{coin.symbol}</p>
          </div>
        </div>

        <div className="mt-4">
          <p className="text-lg font-bold">
            ${coin.current_price.toLocaleString()}
          </p>
          <p className={isPositive ? 'text-green-500' : 'text-red-500'}>
            {isPositive ? '+' : ''}
            {priceChange}%
          </p>
        </div>
      </div>
    </Link>
  );
}
