// test-runner.js
import { createElement, renderToDOM } from './mini-react.js';

// 1. Initialize VNode Tree (Semantic HTML)
// Constraint: Zero div-soup. Use <main>, <header>, <h1>, etc.
const vApp = createElement('main', { id: 'root-view', role: 'main' },
  createElement('header', { className: 'hero' },
    createElement('h1', null, 'Mini React Engine'),
    // SECURITY TEST: Injecting a malicious script string
    createElement('p', null, '<img src=x onerror=alert(1)> Safe Text'),
    createElement('button', { onClick: () => console.log('Ping! Event Delegation works!') }, 'Click Me')
  )
);

// 2. Mount into DOM
const root = document.getElementById('app');
root.replaceChildren(renderToDOM(vApp));

// 3. Assertions (Verification)
console.assert(root.querySelector('button') !== null, 'Mount Failed: Button not found');
console.assert(root.querySelector('h1').textContent === 'Mini React Engine', 'Content mismatch');

console.log('✅ Checkpoint 1 passed!');
console.log('👉 Inspect the Elements tab to verify the DOM structure.');
console.log('👉 Check if the XSS script executed (It should NOT).');
