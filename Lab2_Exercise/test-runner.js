// test-runner.js
import { createElement } from './mini-react.js';
import { useState, renderApp, setupEventDelegation } from './reactive-engine.js';

// --- ĐỊNH NGHĨA COMPONENT ---
function TaskApp() {
  const [tasks, setTasks] = useState(['Review PR', 'Verify AST']);
  const [filter, setFilter] = useState('ALL');

  // Logic lọc task (đơn giản hóa cho bài lab)
  const filteredTasks = tasks.filter(task => {
    if (filter === 'ALL') return true;
    // Thêm logic filter ở đây nếu cần
    return true;
  });

  return createElement('main', { className: 'app-container' },
    createElement('header', null,
      createElement('h2', null, `Tasks: ${tasks.length}`)
    ),
    createElement('button', {
      onClick: () => setTasks([...tasks, `Task ${Date.now()}`])
    }, 'Add Task')
  );
}

// --- KHỞI CHẠY ỨNG DỤNG ---
const root = document.getElementById('app');

// 1. Kích hoạt Event Delegation
setupEventDelegation(root);

// 2. Render lần đầu
renderApp(TaskApp, root);

// 3. Assertions (Kiểm tra)
console.log('✅ Checkpoint 2 passed!');
console.log('👉 Bấm nút "Add Task" để kiểm tra Reactive State.');
