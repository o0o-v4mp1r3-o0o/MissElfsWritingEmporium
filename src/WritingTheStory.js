import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import { getAuth } from "firebase/auth";
import { TextField } from "@mui/material";
import "./WritingTheStory.css";
import NavigationBar from "./NavigationBar";
function WritingTheStory(props) {
  useEffect(() => {
    fetch(
      "https://misselfswritingemporium.herokuapp.com/getStory?s=" +
        String(props.location.state.b)
    )
      .then((json) => {
        return json.text();
      })
      .then((data) => {
        console.log(data);
        let c = String(data);
        if (c.includes("timestamp") && c.includes("getStory")) {
          return "";
        }
        let b = c.substring(1, c.length - 1);
        let d = b.replaceAll('\\"', '"');
        let e = d.replaceAll("\\t", "        ");

        console.log(e + "look");
        let newline = e.split("\\n");
        console.log(newline);
        console.log(b + "here");
        setstorycontent(data);
        document.getElementById("j").value = newline
          .map((f) => {
            return f + "\n";
          })
          .join("");
        return c;
      })
      .catch((error) => console.log(error));
  }, []);
  const [loadstory2, setstorycontent2] = useState();
  useEffect(() => {
    console.log("hi");
    const settimeout = setTimeout(
      () =>
        fetch("https://misselfswritingemporium.herokuapp.com/writeStory", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(loadstory2),
        }),
      400
    );
    return () => clearTimeout(settimeout);
  }, [loadstory2]);
  const [loadstory, setstorycontent] = useState();
  const usetab = (e) => {
    if (e.keyCode === 9) {
      e.preventDefault();
      let start = e.target.selectionStart;
      let end = e.target.selectionEnd;
      e.target.value =
        e.target.value.substring(0, start) +
        "\t" +
        e.target.value.substring(end, e.target.value.length);
      e.target.selectionStart = e.target.selectionEnd = start + 1;
      console.log(start);
      console.log(end);
    }
  };
  return (
    <div className="Entirestory">
      <NavigationBar />
      <h1>{props.location.state.b}</h1>
      <textarea
        id="j"
        className="area"
        defaultvalue={loadstory}
        value={loadstory2}
        onChange={(e) => setstorycontent2(e.target.value)}
        onKeyDown={usetab}
        spellCheck="false"
      />
    </div>
  );
}

export default WritingTheStory;
