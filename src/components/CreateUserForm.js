import React from "react";

function CreateUserForm({ signUpUser }) {
  return (
    <div className="Form">
      
      <form onSubmit={(e) => signUpUser(e)}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" placeholder="Enter Email" />

        <label  htmlFor="password">Password</label>
        <input type="password" name="password" placeholder="Enter Password" />
   
         <button type = "submit">Create User</button>
      </form>
    </div>
  );
}

export default CreateUserForm;