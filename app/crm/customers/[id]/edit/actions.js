"use server";

import { redirect } from "next/navigation";

async function putCustomer(customerId, payload) {
  const res = await fetch(
    `${process.env.API_BASE_URL}/customers/${customerId}`,
    {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    },
  );

  if (!res.ok) {
    return { error: `Server error: ${res.status}` };
  }

  await res.json();
  return null;
}

function getCustomerPayload(formData) {
  const firstName = formData.get("firstName");
  const lastName = formData.get("lastName");
  const email = formData.get("email");

  if (!firstName || !lastName || !email) {
    return { error: "First name, last name, and email are required." };
  }

  return {
    firstName,
    lastName,
    email,
    company: formData.get("company") || "",
    phone: formData.get("phone") || "",
    status: formData.get("status"),
  };
}

export async function updateCustomer(customerId, previousState, formData) {
  const payload = getCustomerPayload(formData);
  if (payload.error) {
    return { success: false, error: payload.error };
  }

  const updateError = await putCustomer(customerId, payload);
  if (updateError) {
    return { success: false, error: updateError.error };
  }

  redirect(`/crm/customers/${customerId}`);
}
