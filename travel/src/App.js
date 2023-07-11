import { useState } from "react";
import Stats from "./components/Stats";
import PackingList from "./components/PackingList";
import Logo from "./components/Logo";
import Form from "./components/Form";

export default function App() {
  const [items, setItems] = useState([]);
  const numTravel = items.length;
  function handleAdd(item) {
    setItems((items) => (items = [...items, item]));
  }

  function handleDelet(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleEdit(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAdd={handleAdd} />
      <PackingList
        items={items}
        handleDelet={handleDelet}
        handleEdit={handleEdit}
      />
      <Stats numTravel={numTravel} />
    </div>
  );
}
