import { useParams } from "react-router";
import { people } from "../data/people.js";
import { usePageFocus } from "../hooks/usePageFocus.js";
export default function PersonDetail() {
  const { id } = useParams();
  const person = people.find((person) => person.id === id);
  const headingRef = usePageFocus(person?.name ?? "404: Person Not Found");
  if (!person)
    return (
      <section className="detail-panel" role="alert">
        <h2 id="route-heading" tabIndex={-1} ref={headingRef}>
          404: Person Not Found
        </h2>
        <p>The requested ID does not exist.</p>
      </section>
    );
  return (
    <article className="detail-panel">
      <h2 id="route-heading" tabIndex={-1} ref={headingRef}>
        {person.name}
      </h2>
      <dl>
        <dt>Name</dt>
        <dd>{person.name}</dd>
        <dt>Role</dt>
        <dd>{person.role}</dd>
        <dt>Age</dt>
        <dd>{person.age}</dd>
        <dt>IQ (demo)</dt>
        <dd>{person.iq}</dd>
      </dl>
    </article>
  );
}
