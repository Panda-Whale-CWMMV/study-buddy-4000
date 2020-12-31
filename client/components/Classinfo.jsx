import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AppContext } from "./ContextProvider";

// render info of events

function Classinfo(props) {
  const { currentClass_id, user } = useContext(AppContext);
  const [classSubscribe, setClassSubcribe] = useState(false);

  const subscribeToClass = (user_id, class_id) => {
    setClassSubcribe(true);
    axios({
      method: "POST",
      url: "http://localhost:3000/api/classsub",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: { user_id: user_id, class_id: class_id },
    }).then((res) => console.log(res));
  };

  return (
    <div>
      Class info: {props.name}
      <div className="classinfo">
        <div className="classItem"> Subject : {props.subject} </div>
      </div>
      <div className="classItem">Description: A great class</div>
      <button 
        // dynamic className will change button style to green upon subscribing
        className={classSubscribe ? "generic_button_onClick" : "generic_button"}
        onClick={() => {subscribeToClass(user.user_id, currentClass_id)}}>
        Subcribe to Class
      </button>
    </div>
  );
}

export default Classinfo;
