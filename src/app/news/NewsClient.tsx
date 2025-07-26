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
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`/api/news`);

        console.log('Fetch status:', res.status);
        if (!res.ok) {
          throw new Error(`API responded with status ${res.status}`);
        }

        const data = await res.json();
        console.log('API response JSON:', data);

        if (data && Array.isArray(data.articles)) {
          console.log('Articles found:', data.articles.length);
          setNews(data.articles);
        } else if (data && data.error) {
          setError(`API Error: ${data.error}`);
          setNews([]);
        } else {
          setError('No news found in API response');
          setNews([]);
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError(`Failed to fetch news: ${(err as Error).message}`);
        setNews([]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) return <p style={{ color: 'white', padding: 24 }}>Loading news...</p>;
  if (error) return <p style={{ color: 'red', padding: 24 }}>{error}</p>;

  if (news.length === 0)
    return <p style={{ color: 'yellow', padding: 24 }}>No news articles found at the moment.</p>;

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
