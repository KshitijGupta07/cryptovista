// app/news/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import NewsClient from './NewsClient';

export default async function NewsPage() {
  const cookieStore =  await cookies();
  const user = cookieStore.get('user');

  if (!user) {
    redirect('/login');
  }

  return <NewsClient />;
}
