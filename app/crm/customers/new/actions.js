// app/crm/customers/new/actions.js
"use server";

import { redirect } from "next/navigation";

export async function addCustomer(previousState, formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");

  if (!firstName || !lastName || !email) {
    return { error: "First name, last name, and email are required." };
  }

  const res = await fetch(`${process.env.API_BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      phone: formData.get("phone") || "",
      status: formData.get("status"),
    }),
  });

  if (!res.ok) {
    return { error: `Server error: ${res.status}` };
  }

  const newCustomer = await res.json();
  redirect(`/crm/customers/${newCustomer.id}`);
}
