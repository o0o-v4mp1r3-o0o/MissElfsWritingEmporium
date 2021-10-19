import "./App.css";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import { Route, BrowserRouter as Router } from "react-router-dom";
import UserHomePage from "./UserHomePage";
import YourStories from "./YourStories";
import WritingTheStory from "./WritingTheStory";
import About from "./About";
import Donate from "./Donate";
function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/" component={SignIn} />
        <Route exact path="/SignUp" component={SignUp} />
        <Route exact path="/Home" component={UserHomePage} />
        <Route exact path="/Stories" component={YourStories} />
        <Route exact path="/About" component={About} />
        <Route exact path="/Donate" component={Donate} />
        <Route exact path={"/Story"} component={WritingTheStory} />
      </div>
    </Router>
  );
}

export default App;
