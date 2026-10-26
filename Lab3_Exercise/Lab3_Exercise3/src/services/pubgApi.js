export const PUBG_VN_SQUADS = [
  { id: 'ces', name: 'Cerberus Esports', map: 'Erangel', phase: 'Phase 6', alive: 4, kills: 14, wwcdProb: '68%', status: 'In Safe Zone' },
  { id: 'te', name: 'The Expendables', map: 'Miramar', phase: 'Phase 7', alive: 4, kills: 18, wwcdProb: '82%', status: 'Holding High Ground' },
  { id: 'ge', name: 'Genius Esports', map: 'Taego', phase: 'Phase 5', alive: 3, kills: 9, wwcdProb: '41%', status: 'Rotating Blue Zone' },
];

// Hàm giả lập gọi API với 35% tỷ lệ lỗi mạng
export function fetchKraftonPubgTelemetry(squadId, { signal }) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      // Giả lập 35% packet loss
      if (Math.random() < 0.35) {
        reject(new Error('Packet timeout: Erangel satellite link lost.'));
      } else {
        const squad = PUBG_VN_SQUADS.find((s) => s.id === squadId);
        resolve(squad);
      }
    }, 1500); // Giả lập độ trễ mạng 1.5s

    // Lắng nghe tín hiệu Abort
    if (signal) {
      signal.addEventListener('abort', () => {
        clearTimeout(timer);
        const error = new Error('Request Aborted');
        error.name = 'AbortError';
        reject(error);
      });
    }
  });
}
