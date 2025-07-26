'use client';

import { useEffect, useState } from 'react';

type NewsArticle = {
  title: string;
  url: string;
  description: string;
  source: { name: string };
  urlToImage: string;
};

export default function NewsClient() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await fetch(`/api/news`);
        const data = await res.json();

        console.log('News API response:', data);

        if (Array.isArray(data)) {
          setNews(data);
        } else if (data.error) {
          setError(`API Error: ${data.error}`);
        } else {
          setError('No news found');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to fetch news');
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p className="text-white p-6">Loading news...</p>;
  if (error) return <p className="text-red-500 p-6">{error}</p>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white px-6 py-10">
      <h1 className="text-4xl font-bold mb-10 text-center text-blue-400 drop-shadow-md">
        📰 Latest Crypto News
      </h1>

      {news.length === 0 ? (
        <p className="text-yellow-400 text-center">No news articles available at the moment.</p>
      ) : (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {news.map((article, index) => (
            <div
              key={index}
              className="bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300"
            >
              <a href={article.url} target="_blank" rel="noopener noreferrer" className="block h-full">
                {article.urlToImage ? (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="rounded-xl w-full h-48 object-cover mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-700 rounded-xl flex items-center justify-center text-gray-300">
                    No image available
                  </div>
                )}

                <h2 className="text-xl font-bold text-blue-300 mb-2">{article.title}</h2>

                <p className="text-sm text-gray-300 mb-4">
                  {article.description || 'No description available.'}
                </p>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-400">
                    Source: {article.source?.name || 'Unknown'}
                  </span>

                  <span className="text-sm text-blue-500 font-medium hover:underline">
                    Read More →
                  </span>
                </div>
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
