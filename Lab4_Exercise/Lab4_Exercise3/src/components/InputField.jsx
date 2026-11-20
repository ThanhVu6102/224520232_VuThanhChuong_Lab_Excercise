import { useId } from "react";
import { useFormContext } from "../context/FormContext.js";
export default function InputField({
  name,
  label,
  type = "text",
  autoComplete,
}) {
  const id = useId();
  const { values, errors, touched, submitted, handleChange, handleBlur } =
    useFormContext();
  const error = touched[name] || submitted ? errors[name] : undefined;
  return (
    <section className="field">
      <label htmlFor={id}>{label}</label>
      <input
        id={id}
        name={name}
        type={type}
        autoComplete={autoComplete}
        value={values[name]}
        onChange={handleChange}
        onBlur={() => handleBlur(name)}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? id + "-error" : undefined}
        required
      />
      <p className="error" id={id + "-error"} role="alert">
        {error}
      </p>
    </section>
  );
}
