export const TEXT_ELEMENT = 'TEXT_ELEMENT';

export function createTextElement(text) {
  return {
    type: TEXT_ELEMENT,
    props: { nodeValue: String(text), children: [] },
  };
}

export function createElement(type, props, ...children) {
  const safeProps = props || {};
  return {
    type,
    props: {
      ...safeProps,
      children: children
        .flat(Infinity)
        .filter((child) => child !== null && child !== undefined && child !== false)
        .map((child) => typeof child === 'object' ? child : createTextElement(child)),
    },
  };
}
