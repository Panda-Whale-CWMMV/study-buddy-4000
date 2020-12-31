import React, { Component } from "react";
import { Link, useRouteMatch, useParams } from "react-router-dom";
import axios from 'axios';
import { useState, useEffect, useContext } from "react";
import useAxios from 'axios-hooks'

export default function Navbar() {


 //use hooks to save the response data a a global state
const [schools, setSchools] = useState([]);
const [searchSchool, setSearchSchool] = useState("");

//wrap axios in useEffect, access data from the call and pass it to SetSchools
useEffect(() => {
     axios.get("http://localhost:3000/api/schools")
     .then((res) => {
      return res.data;
        // console.log(apples);
     })
     .then((data) => {
       setSchools(data);
      //  console.log(apples)
     })
     .catch((err) => {
       console.log(err)
     })
}, []);

  let match = useRouteMatch();
  return (
    console.log("MATCH", match),
    <nav className="navbar_container">
      <button className="navbar_item">
        <Link className="navbar_link" to={`${match.path}/`}>Home</Link>
      </button>
      <input placeholder="Search.." onChange = {(event) => setSearchSchool(() => {
        console.log(event, schools)
        schools.forEach(school => {
          if (school.school_name.toLowerCase().includes(event.target.value.toLowerCase())) {
            console.log(school.school_name)
            }
        });
      }

        )}></input>
      <button className="navbar_item">
        <Link className="navbar_link" to={`${match.path}/userpage`}>Profile</Link>
      </button>
      <button className="navbar_item">
        <Link className="navbar_link" to={`/`}>Logout</Link>
      </button>
    </nav>
  );
}
