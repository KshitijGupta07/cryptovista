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
        const res = await fetch(
          `/api/news`

        );
        const data = await res.json();

        if (data.articles && Array.isArray(data.articles)) {
          setNews(data.articles);
        } else {
          setError('No news found');
        }
      } catch {
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
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {news.map((article, index) => (
          <div key={index} className="bg-gray-800 p-4 rounded-lg shadow hover:shadow-lg transition">
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              {article.urlToImage && (
                <img
                  src={article.urlToImage}
                  alt={article.title}
                  className="rounded mb-3 w-full h-40 object-cover"
                />
              )}
              <h2 className="text-lg font-semibold text-blue-300 mb-2">{article.title}</h2>
              <p className="text-sm text-gray-300 mb-2">{article.description}</p>
              <p className="text-xs text-gray-500">Source: {article.source.name}</p>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
