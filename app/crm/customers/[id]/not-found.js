// app/crm/customers/[id]/not-found.js
import Link from "next/link";

export default function CustomerNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Customer Not Found
      </h2>
      <p className="text-gray-600 mb-6">
        Unable to find the customer you are looking for. Customer may have been
        removed or the id is incorrect.
      </p>
      <Link
        href="/crm/customers"
        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Back to Customers
      </Link>
    </div>
  );
}
