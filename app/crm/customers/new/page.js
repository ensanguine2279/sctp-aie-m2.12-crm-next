// app/crm/customers/new/page.js
"use client";

import Link from "next/link";

import { zodResolver } from "@hookform/resolvers/zod";
import { useActionState, useState } from "react";
import { useForm } from "react-hook-form";

import { addCustomer } from "./actions";
import { customerSchema } from "@/lib/validationSchemas";

import styles from "./page.module.css";

export default function NewCustomerPage() {
  const [state, formAction] = useActionState(addCustomer, null);
  const [blurErrors, setBlurErrors] = useState({});

  const {
    register,
    trigger,
    getFieldState,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(customerSchema), // Integrate Zod schema validation with react-hook-form
    mode: "onBlur", // Validate fields on blur
    reValidateMode: "onBlur", // If a field already has an error, it re-checks again on blur (not on every keystroke).
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "active",
    },
  });

  // Get the error message for a specific field, prioritizing blurErrors, then RHF
  // errors, then server-side errors
  const getFieldError = (name) => {
    const serverFieldError = state?.fieldErrors?.[name]?.[0];
    return blurErrors[name] || errors[name]?.message || serverFieldError || "";
  };

  // Custom onBlur handler to trigger validation and update blurErrors state
  const handleBlur = (name, registerOnBlur) => async (event) => {
    // Call the original onBlur handler from react-hook-form (RHF)
    // This marks the field as "touched" and updates RHF's internal state
    registerOnBlur(event);

    // Trigger validation for the specific field and update blurErrors state
    await trigger(name);

    // Get the updated error message for the field after validation
    const nextError = getFieldState(name).error?.message || "";
    setBlurErrors((previous) => ({
      ...previous,
      [name]: nextError,
    }));
  };

  // Custom onSubmit handler to prevent submission if there are validation errors
  const handleSubmit = async (event) => {
    // Trigger validation for all fields before submission
    const isValid = await trigger();
    if (isValid) {
      return;
    }

    // Prevent form submission if there are validation errors
    event.preventDefault();

    // Update blurErrors state with the latest validation errors for all fields
    const nextErrors = {
      firstName: getFieldState("firstName").error?.message || "",
      lastName: getFieldState("lastName").error?.message || "",
      email: getFieldState("email").error?.message || "",
      phone: getFieldState("phone").error?.message || "",
      status: getFieldState("status").error?.message || "",
    };

    setBlurErrors(nextErrors);
  };

  // Register form fields with react-hook-form
  const firstNameRegistration = register("firstName");
  const lastNameRegistration = register("lastName");
  const emailRegistration = register("email");
  const phoneRegistration = register("phone");
  const statusRegistration = register("status");

  return (
    <div>
      <Link href="/crm/customers" className={styles.backLink}>
        ← Back to customers
      </Link>
      <h1>Add Customer</h1>
      <form action={formAction} onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.field}>
          <label className={styles.label} htmlFor="firstName">
            First name
          </label>
          <input
            id="firstName"
            name="firstName"
            {...firstNameRegistration}
            onBlur={handleBlur("firstName", firstNameRegistration.onBlur)}
            className={`${styles.input} ${
              getFieldError("firstName") ? styles.inputError : ""
            }`}
            required
          />
          {getFieldError("firstName") && (
            <p className={styles.fieldError}>{getFieldError("firstName")}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="lastName">
            Last name
          </label>
          <input
            id="lastName"
            name="lastName"
            {...lastNameRegistration}
            onBlur={handleBlur("lastName", lastNameRegistration.onBlur)}
            className={`${styles.input} ${
              getFieldError("lastName") ? styles.inputError : ""
            }`}
            required
          />
          {getFieldError("lastName") && (
            <p className={styles.fieldError}>{getFieldError("lastName")}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            {...emailRegistration}
            onBlur={handleBlur("email", emailRegistration.onBlur)}
            className={`${styles.input} ${
              getFieldError("email") ? styles.inputError : ""
            }`}
            required
          />
          {getFieldError("email") && (
            <p className={styles.fieldError}>{getFieldError("email")}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="phone">
            Phone
          </label>
          <input
            id="phone"
            name="phone"
            {...phoneRegistration}
            onBlur={handleBlur("phone", phoneRegistration.onBlur)}
            className={`${styles.input} ${
              getFieldError("phone") ? styles.inputError : ""
            }`}
          />
          {getFieldError("phone") && (
            <p className={styles.fieldError}>{getFieldError("phone")}</p>
          )}
        </div>

        <div className={styles.field}>
          <label className={styles.label} htmlFor="status">
            Status
          </label>
          <select
            id="status"
            name="status"
            {...statusRegistration}
            onBlur={handleBlur("status", statusRegistration.onBlur)}
            className={`${styles.input} ${
              getFieldError("status") ? styles.inputError : ""
            }`}
            defaultValue="active"
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          {getFieldError("status") && (
            <p className={styles.fieldError}>{getFieldError("status")}</p>
          )}
        </div>
        <button type="submit" className={styles.submit}>
          Add Customer
        </button>
        {state?.error && <p className={styles.error}>{state.error}</p>}
      </form>
    </div>
  );
}
