import { redirect } from 'next/navigation';
import { auth } from './index';
import { UserRole } from '@prisma/client';

export async function requireAuth() {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }
  
  return session;
}

export async function requireRole(roles: UserRole[]) {
  const session = await auth();
  
  if (!session?.user) {
    redirect('/auth/signin');
  }
  
  const userRole = (session.user as any).role;
  
  if (!roles.includes(userRole)) {
    redirect('/unauthorized');
  }
  
  return session;
}

export async function getSession() {
  return await auth();
}