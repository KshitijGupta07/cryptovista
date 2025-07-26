import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    console.error('❌ Missing NEWS_API_KEY in environment');
    return NextResponse.json({ error: 'Missing NEWS_API_KEY in environment' }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`❌ NewsAPI Error: ${response.status} - ${errorText}`);
      return NextResponse.json({ error: `NewsAPI error: ${response.status}` }, { status: 500 });
    }

    const data = await response.json();

    if (!data.articles || !Array.isArray(data.articles)) {
      console.error('❌ Unexpected response structure:', data);
      return NextResponse.json({ error: 'Invalid data from NewsAPI' }, { status: 500 });
    }

    // Wrap articles in an object so client can access data.articles
    return NextResponse.json({ articles: data.articles });
  } catch (error) {
    console.error('❌ Unexpected server error:', error);
    return NextResponse.json({ error: 'Server failed while fetching news' }, { status: 500 });
  }
}
