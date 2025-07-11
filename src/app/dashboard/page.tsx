// app/dashboard/page.tsx
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import CryptoDashboard from '@/components/CryptoDashboard';

export default async function DashboardPage() {
  const cookieStore = await cookies();
  const user = cookieStore.get('user');

  if (!user) {
    redirect('/login'); // 🚨 Redirect if not logged in
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {decodeURIComponent(user.value)}</h1>
      <CryptoDashboard />
    </div>
  );
}
