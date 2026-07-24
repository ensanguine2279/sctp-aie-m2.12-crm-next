"use client";

import styles from "./page.module.css";

export default function DeleteCustomerForm({ action }) {
  function handleSubmit(event) {
    const shouldDelete = window.confirm(
      "Are you sure you want to delete this customer? This action cannot be undone.",
    );

    if (!shouldDelete) {
      event.preventDefault();
    }
  }

  return (
    <form action={action} onSubmit={handleSubmit}>
      <button type="submit" className={styles.deleteButton}>
        Delete
      </button>
    </form>
  );
}
