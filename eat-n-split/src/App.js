import React, { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

const App = () => {
  const [showFriendAdd, setShowFriendAdd] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleShowForm = () => {
    setShowFriendAdd(!showFriendAdd);
  };

  const addHandle = (newFriend) => {
    setFriends((friends) => (friends = [...friends, newFriend]));
  };

  const handleSelect = (friend) => {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
  };

  const onSplitBill = (value) => {
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          handleSelect={handleSelect}
          selectedFriend={selectedFriend}
        />
        {showFriendAdd && (
          <FormFriend addHandle={addHandle} friends={friends} />
        )}
        <Button action={handleShowForm}>
          {showFriendAdd ? "close" : "add friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          onSplitBill={onSplitBill}
        />
      )}
    </div>
  );
};

export default App;

const FriendsList = ({ friends, handleSelect, selectedFriend }) => {
  return (
    <div>
      <ul>
        {friends.map((friend) => (
          <Friend
            friend={friend}
            key={friend.id}
            handleSelect={handleSelect}
            selectedFriend={selectedFriend}
          />
        ))}
      </ul>
    </div>
  );
};

const Friend = ({ friend, handleSelect, selectedFriend }) => {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          you own {friend.name} {friend.balance} $
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          you own {friend.name} {friend.balance} $
        </p>
      )}
      {friend.balance === 0 && <p>you and {friend.name} are even</p>}
      <Button action={() => handleSelect(friend)}>
        {isSelected ? "close" : "select"}
      </Button>
    </li>
  );
};

const Button = ({ children, action }) => {
  return (
    <button className="button" onClick={action}>
      {children}
    </button>
  );
};

const FormFriend = ({ addHandle }) => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const submitHandler = (e) => {
    e.preventDefault();
    if (!name || !image) return;
    const id = Math.floor(Math.random() * 300);
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };
    addHandle(newFriend);
    setName("");
    setImage("https://i.pravatar.cc/48");
  };

  return (
    <form className="form-add-friend" onSubmit={submitHandler}>
      <label>🧑🏻‍🤝‍🧑🏻 friend name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName((name) => (name = e.target.value))}
      />

      <label>🌄 image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage((image) => (image = e.target.value))}
      />
      <Button>Add</Button>
    </form>
  );
};

const FormSplitBill = ({ selectedFriend, onSplitBill }) => {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaydByUset] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("user");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!bill || !paidByUser) return;
    onSplitBill(whoIsPaying === "user" ? paidByFriend : -paidByUser);
  };
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>split a bill with {selectedFriend.name}</h2>

      <label>💰bill value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧍🏻 your expense</label>
      <input
        type="text"
        value={paidByUser}
        onChange={(e) =>
          setPaydByUset(
            Number(e.target.value) > bill ? paidByUser : Number(e.target.value)
          )
        }
      />

      <label>🧑🏻‍🤝‍🧑🏻 {selectedFriend.name}'s expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>❓ who's paying bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">you</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>split bill</Button>
    </form>
  );
};
