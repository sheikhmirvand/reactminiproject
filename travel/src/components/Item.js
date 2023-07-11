export default function Item({ item, handleDelet, handleEdit }) {
  return (
    <li>
      <input
        type="checkbox"
        value={item.packed}
        onChange={() => handleEdit(item.id)}
      />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button onClick={() => handleDelet(item.id)}>❌</button>
    </li>
  );
}
