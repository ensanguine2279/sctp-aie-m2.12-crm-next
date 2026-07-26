// app/crm/customers/new/actions.js
"use server";

import { redirect } from "next/navigation";

import { customerSchema } from "@/lib/validationSchemas";

export async function addCustomer(previousState, formData) {
  const payload = {
    firstName: formData.get("firstName")?.toString() ?? "",
    lastName: formData.get("lastName")?.toString() ?? "",
    email: formData.get("email")?.toString() ?? "",
    phone: formData.get("phone")?.toString() ?? "",
    status: formData.get("status")?.toString() ?? "active",
  };

  const parsed = customerSchema.safeParse(payload);

  if (!parsed.success) {
    return {
      error: "Please fix the highlighted fields.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const res = await fetch(`${process.env.API_BASE_URL}/customers`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed.data),
  });

  if (!res.ok) {
    return { error: `Server error: ${res.status}` };
  }

  const newCustomer = await res.json();
  redirect(`/crm/customers/${newCustomer.id}`);
}
