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

const UserTile = ({ user, onClick, index }) => {
  return (
    <div className="single-user-container" onClick={onClick}>
      <motion.div layoutId={index} className="single-user">
        <img className='user-tile-image' src={user.picture.large} alt={`${user.name.first}`} />
        {user.name.first + " " + user.name.last}
      </motion.div>
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

  return (
    <AnimateSharedLayout>
      <UserGrid users={users} setUserIndex={setUserIndex} />
      <AnimatePresence>
        {index !== false && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.6 }}
            exit={{ opacity: 0 }}
            key="overlay"
            className="overlay"
            onClick={() => setUserIndex(false)}
          />
        )}
        {index !== false && (
          <UserTile
            users={users}
            index={index}
            user={users[index]}
            setIndex={setUserIndex}
            onClick={() => setUserIndex(false)}
          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
