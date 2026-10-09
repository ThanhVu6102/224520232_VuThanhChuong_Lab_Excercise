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

export function renderToDOM(vNode) {
  if (vNode.type === TEXT_ELEMENT) {
    return document.createTextNode(vNode.props.nodeValue);
  }

  const dom = document.createElement(vNode.type);
  const { children, nodeValue, ...restProps } = vNode.props;

  Object.keys(restProps).forEach((name) => {
    const value = restProps[name];
    if (name.startsWith('on') && typeof value === 'function') {
      const eventType = name.toLowerCase().substring(2);
      dom.addEventListener(eventType, value);
    } else if (name === 'className') {
      dom.className = value;
    } else {
      dom.setAttribute(name, value);
    }
  });

  vNode.props.children.forEach((child) => {
    dom.appendChild(renderToDOM(child));
  });

  return dom;
}
