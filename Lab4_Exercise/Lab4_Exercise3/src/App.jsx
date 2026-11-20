import SimpleForm from "./components/SimpleForm.jsx";
export default function App() {
  return (
    <main>
      <header>
        <p>UIT S3T · Lab 4 · Exercise 1.3</p>
        <h1>Context form engine</h1>
        <p>Vu Thanh Chuong · 24520232</p>
        <p>
          Validation is derived synchronously from current values. Errors appear
          after leaving a field or submitting.
        </p>
      </header>
      <SimpleForm />
    </main>
  );
}
