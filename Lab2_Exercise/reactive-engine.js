// reactive-engine.js
import { renderToDOM } from './mini-react.js';

// --- 1. STATE STORE & CURSOR ---
let stateStore = [];
let cursor = 0;
let rootComponent = null;
let rootContainer = null;

export function resetCursor() {
  cursor = 0;
}
