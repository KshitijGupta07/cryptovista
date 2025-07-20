import { NextResponse } from 'next/server';

export async function GET() {
  const apiKey = process.env.NEWS_API_KEY;

  if (!apiKey) {
    return NextResponse.json({ error: 'Missing NEWS_API_KEY in environment' }, { status: 500 });
  }

  const url = `https://newsapi.org/v2/everything?q=cryptocurrency&language=en&sortBy=publishedAt&pageSize=20&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      return NextResponse.json({ error: 'Failed to fetch news data' }, { status: 500 });
    }

    const data = await response.json();
    return NextResponse.json(data.articles);
  } catch (error) {
    return NextResponse.json({ error: 'Something went wrong while fetching news' }, { status: 500 });
  }
}
