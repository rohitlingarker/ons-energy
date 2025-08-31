import { auth } from '@clerk/nextjs/server';
import { redirect } from 'next/navigation';
import { DashboardContent } from '@/components/dashboard-content';

interface CustomSessionClaims extends Record<string, unknown> {
  o?: {
    rol?: "admin" | "member";
  };
}

export default async function DashboardPage() {
  const { userId, sessionClaims } = await auth();
  const customSessionClaims = sessionClaims as CustomSessionClaims;
  console.log(customSessionClaims);
  const isAdmin = customSessionClaims?.o?.rol === 'admin';

  if (!userId) {
    redirect('/sign-in');
  }

  return <DashboardContent isAdmin={isAdmin} />;
}