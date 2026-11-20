import { useState } from "react";
import { FormContext } from "../context/FormContext.js";
import { initialValues, validateForm } from "../validation.js";
import InputField from "./InputField.jsx";
import ShowData from "./ShowData.jsx";
export default function SimpleForm() {
  const [values, setValues] = useState(initialValues);
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [data, setData] = useState(null);
  const errors = validateForm(values);
  const isValid = Object.keys(errors).length === 0;
  function handleChange(event) {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  }
  function handleBlur(name) {
    setTouched((previous) => ({ ...previous, [name]: true }));
  }
  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
    if (!isValid) {
      event.currentTarget
        .querySelector('[name="' + Object.keys(errors)[0] + '"]')
        ?.focus();
      return;
    }
    setData({ fullName: values.fullName.trim(), email: values.email.trim() });
  }
  function reset() {
    setValues({ ...initialValues });
    setTouched({});
    setSubmitted(false);
    setData(null);
  }
  return (
    <FormContext.Provider
      value={{
        values,
        errors,
        isValid,
        touched,
        submitted,
        handleChange,
        handleBlur,
      }}
    >
      <form noValidate onSubmit={handleSubmit}>
        <InputField name="fullName" label="Full name" autoComplete="name" />
        <InputField
          name="email"
          label="Email"
          type="email"
          autoComplete="email"
        />
        <InputField
          name="password"
          label="Password"
          type="password"
          autoComplete="new-password"
        />
        <InputField
          name="confirmPassword"
          label="Confirm password"
          type="password"
          autoComplete="new-password"
        />
        <p role="status" aria-live="polite">
          {isValid ? "Ready to submit." : "Complete all fields to submit."}
        </p>
        <div className="actions">
          <button type="submit">Submit</button>
          <button className="secondary" type="button" onClick={reset}>
            Reset
          </button>
        </div>
      </form>
      <ShowData data={data} />
    </FormContext.Provider>
  );
}
