import { useReducer } from "react";
import { FormContext } from "../context/FormContext.js";
import { createInitialFormState, formReducer } from "../context/formState.js";
import InputField from "./InputField.jsx";
import ShowData from "./ShowData.jsx";
export default function SimpleForm() {
  const [state, dispatch] = useReducer(
    formReducer,
    undefined,
    createInitialFormState,
  );
  const { values, errors, isValid, touched, submitted, data } = state;
  function handleChange(event) {
    const { name, value } = event.target;
    dispatch({ type: "change", name, value });
  }
  function handleBlur(name) {
    dispatch({ type: "blur", name });
  }
  function handleSubmit(event) {
    event.preventDefault();
    dispatch({ type: "submit" });
    if (!isValid) {
      event.currentTarget.elements.namedItem(Object.keys(errors)[0])?.focus();
    }
  }
  function reset() {
    dispatch({ type: "reset" });
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
