import React from "react";
import { useState, useEffect } from "react";
import { motion, AnimateSharedLayout, AnimatePresence } from "framer-motion";
import "./App.css";
import { TiLocation, TiMail, TiUser,  TiCalendar } from "react-icons/ti";

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
        {user.name.first}
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
        <div className="image-and-name-container">
          <img
            className="user-tile-image"
            src={user.picture.large}
            alt={`${user.name.first}`}
          /><div className="user-name">{user.name.first + " " + user.name.last}</div>

          <div className="user-details">
            <div className="detail">
              <TiLocation />
              {user.location.country}
            </div>
            <div className="detail">
              <TiUser size={20}/>{" "}
              {user.login.username}
            </div>
            <div className="detail">
              <TiCalendar />{" "}
              {`Joined: ${user.registered.age} years ago.`}
            </div>
            <div className="detail">
              <TiMail />{" "}
              <a href={`mailto:${user.email}?Subject=Hello,%20${user.name.first}`}>
                Send Email
              </a>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const App = () => {
  const [users, setUsers] = useState([]);
  const [index, setUserIndex] = useState(false);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=40`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setUsers(data.results);
      });
  }, []);
  console.log(users);

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

          />
        )}
      </AnimatePresence>
    </AnimateSharedLayout>
  );
};

export default App;
