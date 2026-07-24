// app/crm/customers/[id]/page.js
import Link from "next/link";
import { notFound } from "next/navigation";

import styles from "./page.module.css";

export default async function CustomerDetailPage({ params }) {
  const { id } = await params;

  // Promise.all fetches both the customer and their interactions in parallel
  const [customerRes, interactionsRes] = await Promise.all([
    fetch(`${process.env.API_BASE_URL}/customers/${id}`),
    fetch(`${process.env.API_BASE_URL}/interactions?customerId=${id}`),
  ]);

  if (customerRes.status === 404) {
    notFound();
  }

  if (!customerRes.ok) {
    throw new Error("Failed to fetch customer data");
  }

  if (!interactionsRes.ok) {
    throw new Error("Failed to fetch customer interactions data");
  }

  const customer = await customerRes.json();
  const interactions = await interactionsRes.json();

  return (
    <div className={styles.panel}>
      <Link href="/crm/customers" className={styles.backLink}>
        ← Back to customers
      </Link>
      <div className={styles.header}>
        <div>
          <h1 className={styles.name}>
            {customer.firstName} {customer.lastName}
          </h1>
        </div>

        <Link href={`/crm/customers/${id}/edit`} className={styles.editButton}>
          Edit
        </Link>
      </div>
      {customer.company && <p className={styles.company}>{customer.company}</p>}

      <p className={styles.contactRow}>{customer.email}</p>
      {customer.phone && <p className={styles.contactRow}>{customer.phone}</p>}

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Status</p>
        <div className={styles.tags}>
          <span
            className={`${styles.badge} ${customer.status === "active" ? styles.badgeActive : styles.badgeInactive}`}
          >
            {customer.status}
          </span>
        </div>
      </div>

      <div className={styles.section}>
        <p className={styles.sectionLabel}>Interactions</p>
        {interactions.length === 0 ? (
          <p>No interactions yet.</p>
        ) : (
          <ul className={styles.interactionList}>
            {interactions.map((i) => (
              <li key={i.id} className={styles.interactionCard}>
                <span>{i.type}</span>
                <span className={styles.interactionMeta}>
                  {" "}
                  · {new Date(i.date).toLocaleDateString()}
                </span>
                <p>{i.notes}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
