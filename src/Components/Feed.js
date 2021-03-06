import React, { useContext, useState, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext";
import { database, storage } from "../firebase";
import UploadFile from "./UploadFile";
import Posts from "./Posts";
import Navbar from "./Navbar";
function Feed() {
  const { user, logout } = useContext(AuthContext);
  const [userData, setUserData] = useState("");
  useEffect(() => {
    const unsub = database.users.doc(user.uid).onSnapshot((snapshot) => {
      setUserData(snapshot.data());
    });
    return () => {
      unsub();
    };
  }, [user]);
  return (
    <>
      <Navbar userData={userData} />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        {/* <div className="comp" style={{ width: "50%" }}>
        <h1>welcome</h1>
        <button onClick={logout}>logout</button>
      </div> */}

        <UploadFile user={userData} />
        <Posts userData={userData} />
      </div>
    </>
  );
}

export default Feed;
