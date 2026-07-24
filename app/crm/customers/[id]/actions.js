"use server";

import { redirect } from "next/navigation";

export async function deleteCustomer(customerId) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/customers/${customerId}`,
    {
      method: "DELETE",
    },
  );

  if (!res.ok) {
    throw new Error(`Failed to delete customer: ${res.status}`);
  }

  redirect("/crm/customers");
}
