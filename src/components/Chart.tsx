// components/Chart.tsx
'use client';

import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, LineElement, CategoryScale, LinearScale, PointElement } from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

export default function Chart({ chartData }: { chartData: number[][] }) {
  const labels = chartData.map(point => new Date(point[0]).toLocaleDateString());
  const prices = chartData.map(point => point[1]);

  const data = {
    labels,
    datasets: [
      {
        label: 'Price (USD)',
        data: prices,
        borderColor: 'rgb(59, 130, 246)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  return (
    <div className="bg-white rounded p-4">
      <Line data={data} />
    </div>
  );
}
