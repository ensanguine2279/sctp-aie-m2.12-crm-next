import * as yup from "yup";

export const customerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone is required"),
  status: yup
    .string()
    .oneOf(["active", "inactive"])
    .required("Status is required"),
});
