import { Fragment, useState } from 'react';
import styles from './DeveloperCard.module.css';
import { SkillBadge } from './SkillBadge.jsx';

/**
 * <DeveloperCard /> - self-contained semantic profile card.
 *
 * Contract (Exercise 1 - Slide 14 / Reference Contract):
 * - ZERO div-soup (Strict Zero Div-Soup Mandate):
 *   tag set = <article>, <header>, <hgroup>, <dl>, <dt>, <dd>, <ul>, <li>, <Fragment>.
 * - ES6 default parameters replace legacy defaultProps (React 19 deprecation).
 * - Key-Value metadata via Object.entries(metrics) mapped into keyed <Fragment>
 *   k-><dt> / v-><dd> pairs (replaces the triple <h1> bug from Slide 22).
 * - HTTPS-only media origin + explicit width/height (zero CLS in the lab audit)
 *   + <img onError> fallback to initials rendered inline.
 * - Scoped CSS Modules (styles.card, styles.metrics...) instead of legacy
 *   Ant Design v4 global CSS imports - zero runtime CSS overhead.
 */
export function DeveloperCard({
  fullName = 'Tran Vinh Khiem',
  role = 'Senior Systems Architect • UIT S3T',
  avatarUrl = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=240',
  metrics = { commits: 512, vdomNodes: 0, a11yScore: 100 },
  skills = [{ id: 'sk-1', name: 'React 19 Fiber', tier: 'Core' }],
}) {
  const [imgError, setImgError] = useState(false);

  // Fallback initials: "Tran Vinh Khiem" -> "TK"
  const initials = fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();

  return (
    <article className={styles.card} aria-labelledby="dev-heading">
      <header className={styles.header}>
        {!imgError ? (
          <img
            src={avatarUrl}
            alt={fullName}
            width="64"
            height="64"
            className={styles.avatar}
            onError={() => setImgError(true)}
          />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {initials}
          </span>
        )}
        <hgroup>
          <h2 id="dev-heading">{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([k, v]) => (
          <Fragment key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </Fragment>
        ))}
      </dl>

      <ul className={styles.skills} aria-label="Engineered Skills">
        {skills.map((s) => (
          <SkillBadge key={s.id} name={s.name} tier={s.tier} />
        ))}
      </ul>
    </article>
  );
}
