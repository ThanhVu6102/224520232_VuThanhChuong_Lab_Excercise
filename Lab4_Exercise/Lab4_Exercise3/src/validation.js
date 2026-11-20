export const initialValues = {
  fullName: "",
  email: "",
  password: "",
  confirmPassword: "",
};
export function validateForm(values) {
  const errors = {};
  if (values.fullName.trim().length < 2)
    errors.fullName = "Enter at least 2 characters.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim()))
    errors.email = "Enter a valid email address.";
  if (values.password.length < 8)
    errors.password = "Use at least 8 characters.";
  if (!values.confirmPassword || values.confirmPassword !== values.password)
    errors.confirmPassword = "Passwords must match.";
  return errors;
}
