import React from "react";
import { useState } from "react";
import { useHistory, Redirect } from "react-router-dom";
import { Input } from "reactstrap";
import "./FireBase.js";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import "./SignIn.css";
import background from "./signindesign.jpg";
var realuser = null;
function SignIn() {
  const checkit = useHistory();
  const [user, setuser] = useState();
  const [pass, setpass] = useState();
  const [real, fake] = useState(false);
  const auth = getAuth();

  const signinbro = () =>
    signInWithEmailAndPassword(auth, user, pass)
      .then((userCredential) => {
        // Signed in
        const user2 = userCredential.user;
        realuser = user2;
        console.log(realuser);
        verify();
        mapUserToSpringBoot();
      })
      .catch((error) => {
        console.log(error.message);
      });

  const verify = async () => {
    await fetch(
      "https://misselfswritingemporium.herokuapp.com/validatetoken?s=" +
        realuser.accessToken
    )
      .then((x) => x.text())
      .then((res) => console.log(res))
      .then(fake(true));
  };
  const mapUserToSpringBoot = async () => {
    await fetch("https://misselfswritingemporium.herokuapp.com/inject", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: realuser.uid, id: 1 }),
    })
      .then((x) => x.text())
      .then((res) => console.log(res));
  };
  return (
    <div
      className="mainbody"
      style={{ backgroundImage: `url(${background})`, backgroundSize: "cover" }}
    >
      {!real ? (
        <div className="loggers">
          <h1>Log In</h1>
          <div className="logininput">
            <Input
              className="user"
              placeholder="Email"
              onInput={(e) => {
                setuser(e.target.value);
                console.log({ user });
              }}
            ></Input>
            <Input
              onInput={(e) => setpass(e.target.value)}
              className="pass"
              placeholder="Password"
              type="password"
            ></Input>
          </div>
          <div className="loginbuttons">
            <button className="up" onClick={() => checkit.push("/SignUp")}>
              Sign Up
            </button>
            <button className="in" onClick={signinbro}>
              Sign In
            </button>
          </div>
        </div>
      ) : (
        <Redirect to="/Home"></Redirect>
      )}
    </div>
  );
}
export default SignIn;
