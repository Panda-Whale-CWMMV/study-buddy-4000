import React, {useState, useContext, useEffect} from 'react';
import axios from "axios";
import { AppContext } from "./ContextProvider";
import { useForm } from 'react-hook-form';
import { Link, Redirect, useHistory, useRouteMatch } from 'react-router-dom';
// export default function Userpage (props){
//   const [name,updateName] = useState('Vince');
//   const [school, updateSchool] = useState('Codesmith');
//   const [subject, updateClass] = useState(['FrontEnd ','React-hooks']);
//   const [events, updateEvents] = useState(['Wednesday Standups']);
//   return(
//     <div> 
//       <div>Welcome {name}</div>
//       <div> Current School: {school} </div>
//       <div> Current Class: {subject} </div>
//       <div> Upcoming Events: {events}  </div>
//       <div>
//         <input type="text" className ="rough" value ={name} onChange={updateName}/>
//         <button onClick={() => updateName(name = document.getElementsByClassName("rough").value)}>Change Name!</button>
//       </div>
//     </div>
//   );
// }

function Userpage(props) {
  let history = useHistory();
  let match = useRouteMatch();
  const { 
    user,
    setCurrentUser
   } = useContext(AppContext)

  //grab fname, lname
  // const [user_name,setUser_name] = useState(user.user_name);
  // const [first_name,setFirst_name] = useState(user.first_name);
  // const [user_location, setUser_location] = useState(user.user_location)
  // const [user_email, setUser_email] = useState(user.user_email)
  // onClick will set to true and the rendering will be conditional
  const [edit, setEdit] = useState(false)
  const [bio, setBio] = useState(false)

  // onClick button listener -- 
  const editUserBio = () => {
    setEdit(true);
  }

  const {user_id} = user;
  const submitUserBio = (values) => {
    console.log("FORM VALUES", values)
    // onForm submit
    // axios post request
    const data = {
      user_name: values.user_name,
      first_name: values.first_name,
      user_location: values.user_location,
      user_email: values.user_email,
    } ;
    
    // WILL HAVE TO UPDATE userController.updateUserName since the original only updates username
    axios
      .post(`http://localhost:3000/api/users/` + user_id, data)
      .then(() => {
        axios(`http://localhost:3000/api/users/` + user_id)
        .then(({ data }) => {
          console.log(data[0])
          let newUserInfo = {
            user_name: data[0].user_name,
            first_name: data[0].first_name,
            user_location: data[0].user_location,
            user_email: data[0].user_email,
            user_id: user.user_id,
            last_name: user.last_name,
            user_password: user.user_password,
          }
          setCurrentUser(newUserInfo)
          console.log("user just updated", newUserInfo)
        })
      })
      .then((res) => {
        setEdit(false)
        setBio(true)
      })
      .then(() => console.log("EDIT", edit, "BIO", bio))
  }
  

  useEffect(() => {
    setBio(false);
  }, [edit, bio])


  /*
  useEffect(() => {
    // if (bio) {
      axios(`http://localhost:3000/api/users/` + user_id)
      .then(({ data }) => {
        console.log(data[0])
        user.user_name = data[0].user_name;
        user.first_name = data[0].first_name;
        user.user_location = data[0].user_location;
        user.user_email = data[0].user_email;
      })
      // .then(() => setBio(false));
    // }
  }, [user])
  */

  const { register, handleSubmit} = useForm({
    defaultValues: {
      user_name: user.user_name,
      first_name: user.first_name,
      user_location: user.user_location,
      user_email: user.user_email,
      bio: 'I enjoy hiking, reading, and watching TV.',
    }
  });
  // if Edit Profile is clicked, state change renders a form. otherwise, it renders those fields as simple <div>'s
  if (!bio && !edit) {
    return (
      console.log("NEW USER", user.first_name),
      <div className="userProfile">
        <img className="profilePic" src="/john-smith.jpg"></img>
        <pre>
        <div className="displayName">{user.user_name}</div>
        <div className="name">Name            {user.first_name} {user.last_name}</div>
        <div className="location">Location       {user.user_location}</div>
        <div className="contact">Contact         {user.user_email}</div>
        <div className="bio">About Me    </div>
        </pre>


        {/* set edit button here? */}
        <button 
          // dynamic className will change button style to green upon subscribing
          className="generic_button"
          onClick={editUserBio}>
          Edit Profile
        </button>
        
      </div>
    )
    // render form with the user object properties as fields 
      // information in there should already be there, just in editable form
    
  } else {
    return (
      <div className="userForm">
        <form onSubmit={handleSubmit(submitUserBio)}>
          <div className="userFormField">
          <label
            className = "userFormLabel">
            Username
          </label>
            <input 
              className = "userFormInput"
              name="user_name" 
              placeholder="Username"
              ref={register}
              />
          </div>
          
          <div className="userFormField">
            <label
              className = "userFormLabel">
              First Name
              </label>
            <input 
              className = "userFormInput"
              name="first_name" 
              placeholder="First Name"
              ref={register}
              />
          </div>

          <div className="userFormField">
            <label
              className = "userFormLabel">
              Location
            </label>
            <input 
              className = "userFormInput"
              name="user_location" 
              placeholder="Location"
              ref={register}
              />
          </div>

          <div className="userFormField">
            <label
              className = "userFormLabel">
              Email
              </label>
            <input 
              className = "userFormInput"
              name="user_email" 
              placeholder="E-Mail"
              ref={register}
              />
          </div>

          <div className="userFormField bioField`">
            <label
              className = "userFormLabel"
            >Bio
            </label>
            <input 
              className = "userFormInput"
              name="bio" 
              placeholder="A little about yourself"
              ref={register}
              />
          </div>
          
          <div className="submitBtn">
            <input className = "generic_button" type="submit">
            </input>
          </div>
        </form>
      </div>
    )
  }
}
// function Userpage() {
//   //userID
//   const { user } = useContext(AppContext)
//   const [name,updateName] = useState('');
//   const [location, updateLocation] = useState('')
//   const [contact, updateContact] = useState('')
//   useEffect(() => {
//     axios
//       .get("http://localhost:3000/api/users" + user)
//       .then((res) => {
//         updateName(res.first_name + res.last_name);
//         updateLocation(res.user_location)
//         updateContact(res.user_email)
//       });
//   })
//   return(
//     <div className="userProfile">
//       <img className="profilePic" src="/john-smith.jpg"></img>
//       <div className="displayName">{name}</div>
//       <div className="location">{location}</div>
//       <div className="contact">{contact}</div>
//       {/* <div className="userSchools">{schools}</div>
//       <div className="userClasses">{classes}</div>
//       <div className="userEvents">{events}</div> */}
//       {/* set edit button here? */}
//     </div>
//   )
// }
export default Userpage;