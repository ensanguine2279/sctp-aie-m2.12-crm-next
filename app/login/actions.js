// app/login/actions.js
"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function getUserByEmail(email) {
  console.log("Fetching user by email:", `${process.env.API_BASE_URL}`);
  const response = await fetch(
    `${process.env.API_BASE_URL}/users?email=${encodeURIComponent(email)}`,
  );
  const users = await response.json();
  return users.length > 0 ? users[0] : null;
}

export async function login(previousState, formData) {
  const email = formData.get("email");
  const password = formData.get("password");

  const user = await getUserByEmail(email);

  if (!user || email !== user.email || password !== user.password) {
    return { error: "Incorrect email or password." };
  }

  const sessionData = {
    email: user.email,
    role: user.role,
  };

  // Encrypt or serialize session into an HTTP-only cookie
  // const encryptedSession = await encryptSession(fakeSessionData);

  const cookieStore = await cookies();
  cookieStore.set("access_token", JSON.stringify(sessionData), {
    httpOnly: true,
    path: "/",
  });

  redirect("/crm");
}

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("access_token");
  redirect("/login");
}
