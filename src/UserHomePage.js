import React, { useEffect } from "react";
import "./UserHomePage.css";
import { getAuth } from "firebase/auth";
import NavigationBar from "./NavigationBar";
import background from "./moon.jpg";
function UserHomePage() {
  const auth = getAuth();
  const data = auth.currentUser
    ? { username: auth.currentUser.uid, id: 1 }
    : null;
  const requestOptions = auth.currentUser
    ? {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      }
    : null;
  const maptobase = fetch(
    "https://misselfswritingemporium.herokuapp.com/createPatient",
    requestOptions
  )
    .then((res) => res.json())
    .then((res) => console.log(res));
  useEffect(() => maptobase);

  return (
    <div>
      {auth.currentUser ? (
        <div
          className="Moon"
          style={{
            backgroundImage: `url(${background})`,
            backgroundSize: "cover",
          }}
        >
          <NavigationBar />
          <h1 className="homeheader">Welcome!</h1>
        </div>
      ) : (
        <h1>Login In First!</h1>
      )}
    </div>
  );
}

export default UserHomePage;
