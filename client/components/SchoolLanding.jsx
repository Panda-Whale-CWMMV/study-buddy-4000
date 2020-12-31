import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import { AppContext } from "./ContextProvider";

function SchoolLanding() {
  const { currentSchool_id, user } = useContext(AppContext);
  const [school, setSchool] = useState({ school_id: "" });
  // adding state in order to change button className upon clicking the subscribe button
  const [schoolSubscribe, setSchoolSubcribe] = useState(false);

  useEffect(() => {
    axios(`http://localhost:3000/api/schools/${currentSchool_id}`).then(
      (res) => {
        setSchool(res.data[0]);
        return;
      }
    );
  }, [currentSchool_id]);

  const subscribeToSchool = (school_id, user_id) => {
    setSchoolSubcribe(true);
    axios({
      method: "POST",
      url: "http://localhost:3000/api/schoolsub",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
      body: { user_id: user_id, school_id: school_id },
    }).then((res) => console.log(res));
  };

  return (
    <div className="schoollanding_container">
      <div className="schoollanding_schoolinfo">
        <p>Welcome to {school.school_name}</p>
        <p>Location: {school.school_location}</p>
        <button
        // dynamic className will change button style to green upon subscribing
          className={schoolSubscribe ? "generic_button_onClick" : "generic_button"}
          onClick={() => {
            subscribeToSchool(user.user_id, currentSchool_id);
          }}
        >
          Subscribe to school!
        </button>
      </div>
      <div className="schoollanding_schooldescription">
        <p>School description: A fine school</p>
      </div>
    </div>
  );
}

export default SchoolLanding;
