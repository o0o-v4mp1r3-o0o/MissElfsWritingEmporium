import React, { useEffect, useState } from "react";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import CancelIcon from "@mui/icons-material/Cancel";
import { useHistory, Redirect, Router, Route } from "react-router-dom";
import "./YourStories.css";
import { getAuth } from "firebase/auth";
import { Input, Button, Navbar } from "reactstrap";
import WritingTheStory from "./WritingTheStory";
import App from "./App";
import NavigationBar from "./NavigationBar";
function YourStories(props) {
  const [savereader, savewriter] = useState("");
  const [showtext, textstate] = useState(false);
  const [buttonstate, setbuttonstate] = useState(true);
  const [savedstories, fetchstories] = useState([]);
  const navigatetostory = useHistory();
  const auth = getAuth();

  const deletestoryfromlist = async (e) => {
    console.log(String(e.currentTarget.id));
    let c = String(e.currentTarget.id);
    let b = c.toString();
    await fetch(
      "https://misselfswritingemporium.herokuapp.com/deleteStory?s=" + b,
      {
        method: "DELETE",
      }
    ).then(() => {
      let newlist = [...savedstories].filter((f) => f !== b);
      fetchstories(newlist);
    });
  };

  let renderedoutput = savedstories.map((stories) => (
    <div className="List">
      <Navbar color="light">
        <div style={{ fontWeight: "bold", fontSize: "20px" }}>{stories}</div>
        <div
          className="Writestory"
          id={stories}
          onClick={(e) => {
            let c = String(e.currentTarget.id).trim();
            let b = c.toString();
            navigatetostory.push({
              pathname: "/Story",
              state: { b },
              nav: props.location.nav,
            });
          }}
        >
          <Button>Write Story</Button>
        </div>
        <div className="Deleteicon" id={stories} onClick={deletestoryfromlist}>
          <DeleteForeverIcon color="error" fontSize="large"></DeleteForeverIcon>
        </div>
      </Navbar>
      <div>
        <br></br>
      </div>
    </div>
  ));

  const savestory = async () => {
    console.log("read here" + savereader);
    fetchstories([...savedstories, savereader], console.log(savedstories));
    textstate(false);
    setbuttonstate(true);
    await fetch("https://misselfswritingemporium.herokuapp.com/initStoryPojo", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ story: savereader }),
    })
      .then((x) => x.text())
      .then((res) => console.log(res));
    await fetch("https://misselfswritingemporium.herokuapp.com/createStory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
      .then((x) => x.text())
      .then((res) => console.log(res));
  };
  useEffect(() => {
    fetch("https://misselfswritingemporium.herokuapp.com/mapUserStories")
      .then((json) => {
        return json.json();
      })
      .then((res) => fetchstories(res));
  }, []);

  const addbutton = (
    <div className="Container">
      <Input
        autoFocus
        className="Spawn"
        placeholder="Enter Story Title"
        onChange={(e) => {
          savewriter(e.target.value);
          console.log({ savereader });
        }}
      ></Input>
      <div className="Save" onClick={savestory}>
        <Button size="sm" htmlcolor="blue">
          Save
        </Button>
      </div>
      <div
        className="Cancel"
        onClick={() => {
          textstate(false);
          setbuttonstate(true);
        }}
      >
        <CancelIcon fontSize="large" htmlcolor="red" />
      </div>
    </div>
  );

  return (
    <div>
      {auth.currentUser ? (
        <div>
          {console.log(props)}
          <NavigationBar />
          <h1>Story List</h1>
          {renderedoutput ? renderedoutput : null}
          {showtext ? addbutton : null}
          <div className="PlusButton">
            {buttonstate ? (
              <AddCircleIcon
                onClick={() => {
                  textstate(true);
                  setbuttonstate(false);
                }}
                fontSize="large"
                color="primary"
              ></AddCircleIcon>
            ) : (
              <AddCircleIcon
                className="Plusdisabled"
                fontSize="large"
                color="disabled"
              ></AddCircleIcon>
            )}
          </div>
        </div>
      ) : (
        <h1>Log In First!</h1>
      )}
    </div>
  );
}

export default YourStories;
