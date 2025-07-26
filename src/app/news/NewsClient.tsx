'use client';

import { useEffect, useState } from 'react';

type NewsArticle = {
  title?: string;
  url?: string;
  description?: string;
  source?: { name?: string } | null;
  urlToImage?: string | null;
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

  if (loading) return <p style={{ color: 'white', padding: 24 }}>Loading news...</p>;
  if (error) return <p style={{ color: 'red', padding: 24 }}>{error}</p>;

  // Minimal debug render without images or styles
  return (
    <div style={{ backgroundColor: '#111', color: 'white', padding: 20 }}>
      <h1>Latest Crypto News</h1>
      <p>Articles count: {news.length}</p>
      <ul>
        {news.map((article, index) => (
          <li key={index} style={{ marginBottom: 10 }}>
            <a
              href={article.url ?? '#'}
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: 'lightblue' }}
            >
              {article.title ?? 'No title'}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
