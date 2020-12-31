import React, { Component, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";
import { AppContext } from "./ContextProvider";
import { ClassContext } from './ClassProvider';
import axios from "axios";
import { useRouteMatch } from "react-router-dom";

function CreateClass(props) {
  const { 
    currentSchool_id,
    setClasses,
   } = useContext(AppContext);
  // TODO deconstructing ClassContext hooks


  const onSubmit = (values) => {
    const data = {
      class_name: values.class_name,
      subject: values.subject,
      school_id: currentSchool_id,
    };

    axios
      .post("http://localhost:3000/api/classes", data)
      .then((res) => console.log("Class Added!", res))
      .then(() => {
        const query = currentSchool_id;
        axios("http://localhost:3000/api/classes/school/" + query)
        .then(res => setClasses(res.data))
      })
  }

  


  const { register, handleSubmit } = useForm();

  return (
    <div className="classForm">
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>Name</label>
        <input name="class_name" placeholder="Class Name" ref={register} />

        <label>Subject</label>
        <input name="subject" placeholder="Subject" ref={register} />

        <input type="submit"></input>
      </form>
    </div>
  );
}

export default CreateClass;
