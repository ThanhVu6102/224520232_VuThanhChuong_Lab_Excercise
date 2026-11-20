import { useEffect, useRef } from "react";
/** DOM focus and browser title are external systems, so this effect is intentional. */
export function usePageFocus(title) {
  const headingRef = useRef(null);
  useEffect(() => {
    document.title = title + " | Lab 4";
    headingRef.current?.focus();
  }, [title]);
  return headingRef;
}
