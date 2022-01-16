import "./styles.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import React from "react"
import LandingPage from "./components/LandingPage/LandingPage";
import Header from "./components/Header/Header";
import MainPage from "./components/MainPage/MainPage";
import AuthPage from "./components/AuthPage/AuthPage";
import ProfilePage from "./components/ProfilePage/ProfilePage";

export default function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Switch>
            <Route exact path="/" component={LandingPage} />
            <Route path="/main" component={MainPage} exact/>
            <Route path="/auth" component={AuthPage} exact/>
            <Route path="/view_profile" component={ProfilePage} exact/>
        </Switch>
      </div>
    </BrowserRouter>
  );
}