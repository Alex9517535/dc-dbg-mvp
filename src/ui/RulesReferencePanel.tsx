export default function RulesReferencePanel() {
  return (
    <details className="rules-panel">
      <summary>Rules & Keywords</summary>
      <div className="menu-panel" style={{ paddingTop: 8 }}>
        <ul style={{ margin: 0, paddingLeft: 18 }}>
          <li><b>Turn Phases:</b> Start → Action (play/draw/power) → Buy → Refill → Next Turn.</li>
          <li><b>Power:</b> Spend to buy from the Line-Up. Unspent power clears at end of turn.</li>
          <li><b>Draw:</b> If deck empties, shuffle discard to form a new deck.</li>
          <li><b>Destroy:</b> Permanently remove a card from your deck (goes to “destroyed”).</li>
          <li><b>Ongoing:</b> Effects that persist until a condition clears.</li>
          <li><b>Attack/Defense:</b> Not implemented in MVP; placeholders only.</li>
        </ul>
      </div>
    </details>
  );
}
