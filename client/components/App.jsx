import React, { Component } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { Switch, Route } from "react-router-dom";
import styles from "../styles.css";
import Navbar from "./Navbar";
import MainContainer from "./MainContainer";
import Sidebar from "./Sidebar";
import { AppContext } from "./ContextProvider";

// class creator for App
class App extends Component {
  // constructor and super since we are creating state in this component
  constructor(props) {
    super(props);
// 
    this.setCurrentUser = (user) => {
      this.setState(state => ({
        user: user,
      }));
    };
    this.setCurrentSchool_id = (school_id) => {
      this.setState(state => ({
        currentSchool_id: school_id,
      }));
    };
    
    this.setCurrentClass_id = (class_id) => {
      this.setState(state => ({
        currentClass_id: class_id,
      }));
    };
    this.setCurrentEvent_id = (event_id) => {
      this.setState(state => ({
        currentEvent_id: event_id,
      }));
    };

    this.state = {
      user: {},
      currentSchool_id: "1",
      currentClass_id: "1",
      currentEvent_id: "1",
      setCurrentUser: this.setCurrentUser,
      setCurrentSchool_id: this.setCurrentSchool_id,
      setCurrentClass_id: this.setCurrentClass_id,
      setCurrentEvent_id: this.setCurrentEvent_id,
      
    };
  }

  render() {
    return (
      <div className="app">
      // helps us pass down props without prop drilling
      // we have our state maintained in ContextProvider.js
        <AppContext.Provider value={this.state}>
          <div className="header">
            <img className = "logo" src="/owl.png"/>
            <h1>Study Buddy Finder</h1>
          </div>
          <Switch>
          // exact path means that the page will only render with that path and not also with things like "/whatever"
            <Route exact path="/" component={Login} />
            // similiar to above but you dont technically need exact here, just need that on "/" because of other landings
            <Route exact path="/signup" component={Signup} />

            <Route path="/homepage">
              <Navbar />
              <div className="container">
                <Sidebar />
                <MainContainer />
              </div>
            </Route>
          </Switch>
          
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
