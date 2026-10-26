/**
 * KRAFTON PVS Live Telemetry — 4-State Finite State Machine Contract.
 *
 * TypeScript-compliant contract expressed via JSDoc typedefs (the project
 * shell is JS-first Vite; no tsconfig needed — editors / tsc --allowJs
 * still type-check these annotations, and `// @ts-check` enforces them).
 *
 * FSM: IDLE -> LOADING -> SUCCESS | ERROR
 *                      ^-- retryTick re-entry --\
 *                      \______ squad switch ____/
 *
 * @copyright 2026 Vu Thanh Chuong (24520232)
 * @ts-check marker below keeps strict DOM + type inference in editors.
 */

/**
 * The four legal phases of the telemetry radar view.
 * VI: 4 trang thai hop le cua may trang thai (IDLE / LOADING / SUCCESS / ERROR).
 *
 * @typedef {'IDLE' | 'LOADING' | 'SUCCESS' | 'ERROR'} TelemetryStatus
 */

/**
 * A single PVS squad telemetry payload resolved by the mock API.
 * VI: 1 payload telemetry cua 1 squad do mock API tra ra.
 *
 * @typedef {Object} SquadTelemetry
 * @property {string} id       Stable squad key ('ces' | 'te' | 'ge').
 * @property {string} name     Squad display name.
 * @property {string} map      Erangel / Miramar / Taego.
 * @property {string} phase    Current match blue-zone phase label.
 * @property {number} alive    Squad members still standing (0-4).
 * @property {number} kills    Total eliminations this match.
 * @property {string} wwcdProb Estimated "Winner Winner Chicken Dinner" probability.
 * @property {string} status   Tactical status line.
 */

/**
 * The single source of truth for the radar view (one state at a time).
 * VI: 1 object view duy nhat — thay toan bo object moi lan chuyen trang thai,
 * khong patch rieng le.
 *
 * @typedef {Object} TelemetryView
 * @property {TelemetryStatus}      status Current FSM phase.
 * @property {SquadTelemetry | null} data  Parsed payload on SUCCESS, else null.
 * @property {string | null}         error Human-readable message on ERROR, else null.
 */

/** All legal FSM states, frozen to keep the contract immutable at runtime. */
export const FSM_STATES = Object.freeze(['IDLE', 'LOADING', 'SUCCESS', 'ERROR']);

/**
 * Initial view — the machine always boots in IDLE.
 * VI: view khoi tao — may trang thai luon bat dau o IDLE.
 *
 * @type {Readonly<TelemetryView>}
 */
export const initialView = Object.freeze({
  status: 'IDLE',
  data: null,
  error: null,
});

/**
 * Type guard: satisfies() helper shape used by the component to build
 * state transitions in one shot (whole-object replacement).
 *
 * @param {TelemetryStatus} status
 * @param {SquadTelemetry | null} [data]
 * @param {string | null} [error]
 * @returns {TelemetryView}
 */
export function makeView(status, data = null, error = null) {
  return { status, data, error };
}
