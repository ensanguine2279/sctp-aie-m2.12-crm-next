// components/EditCustomerForm.jsx
"use client";

import Link from "next/link";
import { useActionState } from "react";

import { updateCustomer } from "./actions";

import styles from "./CustomerEditForm.module.css";

export default function EditCustomerForm({ customer }) {
  // Bind the customer id to the Server Action
  const updateWithId = updateCustomer.bind(null, customer.id);

  const [state, formAction, isPending] = useActionState(updateWithId, {
    success: false,
    error: null,
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Edit Customer</h1>

      {state.error && <div className={styles.errorBanner}>{state.error}</div>}

      <form action={formAction} className={styles.form}>
        <div className={styles.fieldGroup}>
          <label htmlFor="firstName" className={styles.label}>
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            defaultValue={customer.firstName}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="lastName" className={styles.label}>
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            defaultValue={customer.lastName}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="email" className={styles.label}>
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            defaultValue={customer.email}
            className={styles.input}
            required
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="company" className={styles.label}>
            Company
          </label>
          <input
            type="text"
            id="company"
            name="company"
            defaultValue={customer.company}
            className={styles.input}
          />
        </div>

        <div className={styles.fieldGroup}>
          <label htmlFor="status" className={styles.label}>
            Status
          </label>
          <select
            id="status"
            name="status"
            defaultValue={customer.status}
            className={styles.input}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className={styles.actions}>
          <Link href="/crm/customers" className={styles.cancelButton}>
            Cancel
          </Link>
          <button
            type="submit"
            disabled={isPending}
            className={styles.submitButton}
          >
            {isPending ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </div>
  );
}
