export default function MovesList({ moves }) {
  if (!moves) return <div></div>;
  return (
    <section className="move-section">
      {!moves.length ? (
        <h2>No Transactions Yet</h2>
      ) : (
        <h2>Your Last Transactions</h2>
      )}
      {moves.map((move, idx) => {
        return (
          <div className="move flex" key={move.toId}>
            <h1>Your {idx + 1} move</h1>
            <div>
              <span>To:</span>
              {move.to}
            </div>
            <div>
              <span>Date:</span>
              {move.at}
            </div>
            <div>
              <span>Amount:</span>฿{move.amount}
            </div>
          </div>
        );
      })}
    </section>
  );
}
