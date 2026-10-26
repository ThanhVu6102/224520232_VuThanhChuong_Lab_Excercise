import styles from './PubgMatchTelemetry.module.css';

/**
 * <TelemetrySkeleton /> — LOADING state renderer.
 *
 * 220px pulsing Blue-Zone skeleton card. Rendered ONLY while the FSM is in
 * LOADING; `aria-busy="true"` exposes the busy region to assistive tech so
 * screen readers announce "busy" without re-rendering polite announcements.
 *
 * Contract (Sprint 3): pulsing via the module-scoped `pulse` keyframes —
 * zero global CSS, zero div-soup beyond the contract's busy <div>.
 */
export function TelemetrySkeleton() {
  return (
    <div aria-busy="true" className={styles.skeletonCard}>
      Syncing KRAFTON Radar...
    </div>
  );
}
