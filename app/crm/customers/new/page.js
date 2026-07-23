// app/crm/customers/new/page.js
"use client";

import Link from "next/link";
import { useActionState } from "react";
import { addCustomer } from "./actions";
import styles from "./page.module.css";

export default function NewCustomerPage() {
  const [state, formAction] = useActionState(addCustomer, null);

  return (
    <div>
      <Link href="/crm/customers" className={styles.backLink}>
        ← Back to customers
      </Link>
      <h1>Add Customer</h1>
      <form action={formAction} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className={styles.input}
            required
          />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone
          </label>
          <input id="phone" name="phone" className={styles.input} />
        </div>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            className={styles.input}
            defaultValue="active"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>
        <button type="submit" className={styles.submit}>
          Add Customer
        </button>
        {state?.error && <p className={styles.error}>{state.error}</p>}
      </form>
    </div>
  );
}
