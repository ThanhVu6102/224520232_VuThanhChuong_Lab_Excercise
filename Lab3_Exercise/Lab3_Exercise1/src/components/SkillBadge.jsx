import styles from './DeveloperCard.module.css';

/**
 * <SkillBadge /> - reusable skill chip.
 * Contract: must be rendered as a child of <ul>; one skill object per badge.
 * Zero div-soup: renders <li> only.
 */
export function SkillBadge({ name, tier }) {
  return (
    <li className={styles.skillBadge}>
      {name} <span className={styles.tier}>({tier})</span>
    </li>
  );
}
