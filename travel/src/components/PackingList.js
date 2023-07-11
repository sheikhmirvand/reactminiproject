import Item from "./Item";
export default function PackingList({ items, handleDelet, handleEdit }) {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item
            item={item}
            key={item.id}
            handleDelet={handleDelet}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
    </div>
  );
}
