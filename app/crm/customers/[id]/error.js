"use client";

import Link from "next/link";

export default function CustomerDetailError({ error, reset }) {
  const isDeleteError = error?.message?.includes("Failed to delete customer");

  return (
    <main>
      <h2>{isDeleteError ? "Delete failed" : "Something went wrong"}</h2>
      <p>
        {isDeleteError
          ? "We could not delete this customer. Please try again."
          : "There was a problem loading this customer page."}
      </p>
      <p>{error?.message}</p>
      <button onClick={reset}>Try again</button>
      <p>
        <Link href="/crm/customers">Back to customers</Link>
      </p>
    </main>
  );
}
