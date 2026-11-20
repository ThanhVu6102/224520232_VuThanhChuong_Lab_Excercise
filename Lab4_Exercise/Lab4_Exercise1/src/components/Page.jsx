import { usePageFocus } from "../hooks/usePageFocus.js";
export default function Page({ title, children, className, role }) {
  const headingRef = usePageFocus(title);
  return (
    <section className={className} role={role}>
      <h2 id="route-heading" tabIndex={-1} ref={headingRef}>
        {title}
      </h2>
      {children}
    </section>
  );
}
