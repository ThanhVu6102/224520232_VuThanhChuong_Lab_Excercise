import { useId } from "react";
export default function ShowData({ data }) {
  const headingId = useId();
  if (!data) return null;
  return (
    <section className="inspector" aria-labelledby={headingId}>
      <h2 id={headingId}>Submitted data</h2>
      <p role="status">
        Valid form submitted successfully. Passwords are excluded.
      </p>
      <dl>
        {Object.entries(data).map(([key, value]) => (
          <div className="data-row" key={key}>
            <dt>{key}</dt>
            <dd>{String(value)}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
