export default function DetailSkeleton() {
  return (
    <section className="detail-panel" aria-busy="true" aria-live="polite">
      <p role="status">Loading person details…</p>
      <span className="skeleton-line" aria-hidden="true" />
      <span className="skeleton-line short" aria-hidden="true" />
      <span className="skeleton-line" aria-hidden="true" />
    </section>
  );
}
