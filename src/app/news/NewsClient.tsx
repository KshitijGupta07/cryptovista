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

        if (Array.isArray(data.articles)) {
          setNews(data.articles);
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
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-6 text-blue-400">Latest Crypto News</h1>
      <p>Articles count: {news.length}</p>

      {news.length === 0 && (
        <p className="text-yellow-400">No news articles found at the moment.</p>
      )}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <div
            key={index}
            className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <a href={article.url || '#'} target="_blank" rel="noopener noreferrer">
              {article.urlToImage ? (
                <img
                  src={article.urlToImage}
                  alt={article.title ?? 'News image'}
                  className="rounded mb-3 w-full h-40 object-cover"
                />
              ) : (
                <div className="bg-gray-700 rounded mb-3 w-full h-40 flex items-center justify-center text-gray-500">
                  No image available
                </div>
              )}

              <h2 className="text-lg font-semibold text-blue-300 mb-2">
                {article.title ?? 'No title'}
              </h2>

              <p className="text-sm text-gray-300 mb-2">
                {article.description ?? 'No description available.'}
              </p>

              <p className="text-xs text-gray-500">
                Source: {article.source?.name ?? 'Unknown'}
              </p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
