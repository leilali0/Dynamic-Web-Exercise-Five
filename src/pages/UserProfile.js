import React from "react";

function UserProfile ({ userInformation }) {
  
  return (
    <div className="PageWrapper">
      <h2>User Profile</h2>
      <p>Email: {userInformation.email}</p>
      <p>Name: {userInformation.displayName}</p>
      <p>UID: {userInformation.uid}</p>
    </div>
  );
}

export default UserProfile;