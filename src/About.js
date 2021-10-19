import React from "react";
import NavigationBar from "./NavigationBar";

function About() {
  return (
    <div>
      <NavigationBar />
      <h1 className="aboutpage">
        You can write stories on this website and all of your written text
        automatically saves every 300 milliseconds. Have fun!
      </h1>
    </div>
  );
}

export default About;
