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

// --- 2. REACTIVE useState DISPATCHER ---
export function useState(initialValue) {
  const currentCursor = cursor;

  // Khởi tạo giá trị ban đầu nếu chưa có
  if (stateStore[currentCursor] === undefined) {
    stateStore[currentCursor] = initialValue;
  }

  const setState = (nextValue) => {
    // Hỗ trợ function updater: setCount(c => c + 1)
    const resolvedValue = typeof nextValue === 'function'
      ? nextValue(stateStore[currentCursor])
      : nextValue;

    // Chỉ re-render nếu giá trị thực sự thay đổi (Object.is)
    if (!Object.is(stateStore[currentCursor], resolvedValue)) {
      stateStore[currentCursor] = resolvedValue;
      renderApp(rootComponent, rootContainer); // Trigger re-render
    }
  };

  cursor++;
  return [stateStore[currentCursor], setState];
}
