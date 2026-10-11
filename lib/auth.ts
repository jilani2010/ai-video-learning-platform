import { auth } from "@clerk/nextjs";

export async function getCurrentUser() {
  const { userId } = auth();
  
  if (!userId) {
    return null;
  }

  // In a real app, fetch user from database using Clerk ID
  return { id: userId };
}

export function requireAuth() {
  const { userId } = auth();
  
  if (!userId) {
    throw new Error("Unauthorized");
  }

  return userId;
}
