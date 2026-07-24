// app/login/utils.js
import { cookies } from "next/headers";

export async function getSession() {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("access_token");

  if (!sessionCookie) return null;

  try {
    // Parse the JSON object string stored in the cookie
    const sessionData = JSON.parse(decodeURIComponent(sessionCookie.value));
    return sessionData;
  } catch (error) {
    // JSON parsing failed (malformed cookie value)
    return null;
  }
}
