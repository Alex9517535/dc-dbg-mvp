import { useMemo } from 'react';
import { useGame } from '../state/store';
import type { LogEntry } from '../core/types';

function toTxt(lines: LogEntry[]) {
  return lines.map((e) => {
    const d = new Date(e.ts).toISOString();
    return `[${d}] T${e.turn} ${e.phase} ${e.kind} — ${e.msg}`;
  }).join('\n');
}

function download(filename: string, contents: string, mime = 'application/octet-stream') {
  const blob = new Blob([contents], { type: mime });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ActionLogPanel() {
  const { actionLog, clearLog } = useGame();
  const json = useMemo(() => JSON.stringify(actionLog, null, 2), [actionLog]);
  const txt  = useMemo(() => toTxt(actionLog), [actionLog]);

  return (
    <section className="log-panel">
      <header className="log-header">
        <strong>Action Log</strong>
        <div className="log-buttons">
          <button onClick={() => download('session-log.json', json, 'application/json')}>Export JSON</button>
          <button onClick={() => download('session-log.txt', txt, 'text/plain')}>Export TXT</button>
          <button onClick={clearLog}>Clear</button>
        </div>
      </header>
      <div className="log-body" role="log" aria-live="polite">
        {actionLog.length === 0 && <div className="log-empty">No actions yet.</div>}
        {actionLog.map((e) => (
          <div key={e.id} className="log-row">
            <div className="log-time">{new Date(e.ts).toLocaleTimeString()}</div>
            <div className="log-msg"><b>T{e.turn}</b> <i>{e.phase}</i> — {e.msg}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
