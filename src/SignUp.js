import React from "react";
import { useState } from "react";
import { Button, Input } from "reactstrap";
import "./SignUp.css";
import { Link } from "react-router-dom";

function SignUp() {
  const [username, setusername] = useState();
  const [pass, setpass] = useState();
  const [email, setemail] = useState();
  const [diditcreate, setcreation] = useState(false);
  const [success, setsuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = { username: username, password: pass, email: email };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    };
    let stringthis = await fetch(
      "https://misselfswritingemporium.herokuapp.com/createAccount",
      requestOptions
    )
      .then((a) => {
        return a.text();
      })
      .then((data) => {
        var text = String(data);
        return text;
      });
    console.log(stringthis);
    if (stringthis === "Failure") {
      setcreation(true);
    } else {
      setcreation(false);
      setsuccess(true);
    }
  };
  const errormaker = <div style={{ color: "red" }}>Email Already In Use</div>;
  const successmaker = (
    <div style={{ color: "black", backgroundColor: "lightgreen" }}>
      Account Created! Go Back & Log In
    </div>
  );
  return (
    <div>
      <h1>Create Account</h1>
      {diditcreate ? errormaker : null}
      {success ? successmaker : null}
      <div className="buttons">
        <Input
          className="username"
          placeholder="Enter Username"
          onInput={(e) => setusername(e.target.value)}
          onKeyPress={(target) =>
            target.key === "Enter" && handleSubmit(target)
          }
        ></Input>
        <Input
          className="password"
          placeholder="Enter Password"
          type="password"
          onInput={(e) => setpass(e.target.value)}
          onKeyPress={(target) =>
            target.key === "Enter" && handleSubmit(target)
          }
        ></Input>
        <Input
          className="email"
          placeholder="Enter Email"
          onInput={(e) => {
            setemail(e.target.value);
          }}
          onKeyPress={(target) =>
            target.key === "Enter" && handleSubmit(target)
          }
        ></Input>
      </div>
      <Button onClick={handleSubmit} type="submit">
        Create Account
      </Button>
      <div>
        <Link to="/">Go Back</Link>
      </div>
    </div>
  );
}
export default SignUp;
