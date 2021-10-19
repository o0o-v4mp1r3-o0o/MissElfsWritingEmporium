import React from "react";
import { Button } from "reactstrap";
import NavigationBar from "./NavigationBar";
import "./NavigationBar.css";
function Donate() {
  return (
    <div>
      <NavigationBar />
      <Button
        classname="Donatepaypal"
        onClick={() => window.open("https://paypal.me/DarkPianist")}
      >
        Donate!
      </Button>
    </div>
  );
}

export default Donate;
