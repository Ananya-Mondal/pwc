import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

function Profile() {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [ShowAdmin, setAdmin] = useState(false);
  const [uName, setName] = useState(false);
  
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("CurrentUser"));
    //console.log(user);   
    setCurrentUser(user);
    console.log(currentUser);
    setAdmin(user.isAdmin);
    setName(user.name);
   
},[]);

  return (
    <div>
    <center><h3>Welcome {uName}</h3></center>
    {ShowAdmin?
    (""):
    (<Link to="/ViewOrder"> Check your Orders</Link>)}
    </div>
  )
}

export default Profile
