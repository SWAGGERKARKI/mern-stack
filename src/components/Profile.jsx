import React, { useState, useEffect } from 'react'

function Profile() {
  const [loggedInUser, setLoggedInUser] = useState();

  useEffect(() => {
    setLoggedInUser(localStorage.getItem('name'));
  }, []);

  return (
    <div>{loggedInUser}</div>
  )
}

export default Profile