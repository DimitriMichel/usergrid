import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "./App.css";

const UserGrid = ({ users, setUserIndex }) => {
  const userList = users.map((user, index) => {
    return (
      <motion.li
        className="user-item"
        key={index}
        layoutId={index}
        onClick={() => setUserIndex(index)}
      >
        <img
          className="user-images"
          src={user.picture.large}
          alt={`${user.name.first}`}
        />
        {user.name.first + " " + user.name.last}
      </motion.li>
    );
  });
  return (
    <div>
      <ul className="user">{userList}</ul>
    </div>
  );
};

const UserTile = ({ users, onClick }) => {
  return (
    <div className="single-user-container" onClick={onClick}>
      <motion.div></motion.div>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [index, setUserIndex] = useState(false);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=16`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data.results);
      });
  }, []);
  console.log(users);
  console.log(users);

  return (
    <div>
      <UserGrid users={users} setUserIndex={setUserIndex} />
      <UserTile
        users={users}
        index={index}
        user={users[index]}
        setIndex={setUserIndex}
        onClick={() => setUserIndex(false)}
      />
    </div>
  );
};

export default App;
