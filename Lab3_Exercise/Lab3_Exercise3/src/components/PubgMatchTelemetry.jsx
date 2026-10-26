import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry, PUBG_VN_SQUADS } from '../services/pubgApi';
import { initialView } from '../types/telemetryMachine';
import { TelemetrySkeleton } from './TelemetrySkeleton.jsx';
import styles from './PubgMatchTelemetry.module.css';

export function PubgMatchTelemetry() {
  const [squadId, setSquadId] = useState('ces');
  const [view, setView] = useState(initialView);
  const [retryTick, setRetryTick] = useState(0);

  useEffect(() => {
    const controller = new AbortController();

    // Bắt đầu LOADING
    setView({ status: 'LOADING', data: null, error: null });

    fetchKraftonPubgTelemetry(squadId, { signal: controller.signal })
      .then((payload) => {
        setView({ status: 'SUCCESS', data: payload, error: null });
      })
      .catch((err) => {
        // [OK] SAFE ABORT ERROR GUARD (Bỏ qua lỗi nếu cố tình hủy request)
        if (err.name === 'AbortError') return;
        setView({ status: 'ERROR', data: null, error: err.message });
      });

    // Cleanup function
    return () => controller.abort();
  }, [squadId, retryTick]);

  return (
    <section className={styles.container}>
      <header>
        <h2>PVS Live Telemetry Radar</h2>
        {/* Squad Selector */}
        <nav className={styles.selector}>
          {PUBG_VN_SQUADS.map((squad) => (
            <button
              key={squad.id}
              type="button"
              className={squadId === squad.id ? styles.activeBtn : styles.btn}
              onClick={() => setSquadId(squad.id)}
            >
              {squad.name}
            </button>
          ))}
        </nav>
      </header>

      {/* 4-STATE MACHINE RENDERING */}
      {view.status === 'LOADING' && <TelemetrySkeleton />}

      {view.status === 'ERROR' && (
        <section role="alert" className={styles.errorAlert}>
          <p>Blue-Zone Link Lost: {view.error}</p>
          <button
            type="button"
            onClick={() => setRetryTick((t) => t + 1)}
            className={styles.retryBtn}
          >
            Reconnect Satellite (Retry)
          </button>
        </section>
      )}

      {view.status === 'SUCCESS' && view.data && (
        <article aria-live="polite" className={styles.successCard}>
          <h3>{view.data.name} - {view.data.map}</h3>
          <p>Phase: {view.data.phase}</p>
          <p>Kills: {view.data.kills} | Alive: {view.data.alive}</p>
          <p>WWCD Prob: {view.data.wwcdProb}</p>
          <p>Status: <strong>{view.data.status}</strong></p>
        </article>
      )}

      {view.status === 'IDLE' && (
        <p>Select a squad to begin radar tracking.</p>
      )}
    </section>
  );
}
