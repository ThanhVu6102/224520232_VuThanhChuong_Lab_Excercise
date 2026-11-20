import { initialValues, validateForm } from "../validation.js";

function checkFields(values) {
  const errors = validateForm(values);
  return { errors, isValid: Object.keys(errors).length === 0 };
}

export function createInitialFormState() {
  const values = { ...initialValues };
  return {
    values,
    ...checkFields(values),
    touched: {},
    submitted: false,
    data: null,
  };
}

export function formReducer(state, action) {
  switch (action.type) {
    case "change": {
      if (!Object.hasOwn(state.values, action.name)) return state;
      const values = { ...state.values, [action.name]: action.value };
      return { ...state, values, ...checkFields(values) };
    }
    case "blur":
      return { ...state, touched: { ...state.touched, [action.name]: true } };
    case "submit": {
      const result = checkFields(state.values);
      return {
        ...state,
        ...result,
        submitted: true,
        data: result.isValid
          ? {
              fullName: state.values.fullName.trim(),
              email: state.values.email.trim(),
            }
          : state.data,
      };
    }
    case "reset":
      return createInitialFormState();
    default:
      return state;
  }
}
