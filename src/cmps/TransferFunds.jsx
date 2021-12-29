import MovesList from './MovesList';

export function TransferFunds({ onTransferCoins, contact }) {
  var amount = 0;
  const handleFunds = ({ target }) => {
    amount = !isNaN(target.value) ? +target.value : 0;
  };
  return (
    <section>
      <h2>{`transfer coins to :${contact.name}`}</h2>
      <input
        onChange={handleFunds}
        type="number"
        name="transfer"
        id="transfer"
      />
      <button onClick={() => onTransferCoins(contact, amount)}>Transfer</button>
    </section>
  );
}
