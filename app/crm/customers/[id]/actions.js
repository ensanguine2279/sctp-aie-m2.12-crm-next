"use server";

import { redirect } from "next/navigation";
import { getSession } from "@/app/login/utils";

export async function deleteCustomer(customerId) {
  const session = await getSession();

  console.log("Session in deleteCustomer:", session);

  if (!session || session.role !== "admin") {
    throw new Error("Unauthorized: Admin privileges required.");
  }

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
