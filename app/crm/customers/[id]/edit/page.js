// app/crm/customers/[id]/edit/page.jsx
import { notFound } from "next/navigation";

import EditCustomerForm from "./CustomerEditForm";

async function getCustomer(id) {
  const res = await fetch(`${process.env.API_BASE_URL}/customers/${id}`);
  if (res.status === 404) notFound();
  if (!res.ok) throw new Error(`Failed to fetch customer: ${res.status}`);
  return res.json();
}

export default async function EditCustomerPage({ params }) {
  const { id } = await params;
  const customer = await getCustomer(id);

  return <EditCustomerForm customer={customer} />;
}
