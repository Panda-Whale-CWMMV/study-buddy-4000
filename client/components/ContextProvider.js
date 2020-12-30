import React from "react";

// this allows us to change state without prop drilling
// here is a deeper read on react context provider
// https://medium.com/@willhowardgb/reacts-context-api-in-5-minutes-8188d9b507fe
export const AppContext = React.createContext({
  user: {},
  currentSchool_id: "1",
  currentClass_id: "1",
  currentEvent_id: "1",
  setCurrentUser: ()=> {},
  setCurrentClass_id: () => {},
  setCurrentSchool_id: () => {},
  setCurrentEvent_id: () => {},
});

// this is imported into App.jsx
