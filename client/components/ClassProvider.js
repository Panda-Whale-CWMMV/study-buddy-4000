// invoke React.createContext
import React from 'react';
import axios from "axios";
export const ClassContext = React.createContext({
  classes: ['default value'],
  // TODO is array the right notation here?
  setClasses: () => {},
  // selectSchool: (school_id) => {
  //   const query = school_id;
  //   axios("http://localhost:3000/api/classes/school/" + query).then((res) =>
  //     this.setClasses(res.data)
  //   );
  // }
});
// assign classes, setClasses as properties (originally useState hook in Sidebar.jsx)
// update App.jsx 
  // include the properties above in state?
  // include ClassContext.Provider wrapper around the Sidebar
// update Sidebar.jsx
  // deconstruct these properties similar to AppContext