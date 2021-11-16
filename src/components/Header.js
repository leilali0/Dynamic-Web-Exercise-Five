import React from "react";

function Header() {
  return (
    <header className="Header">
      <h3>Excercise Five</h3>
      <div>
        <nav>
          <a href="/">Login</a>
          <a href="/create">Create User</a>
          <a href="/user/id">User Profile</a>
        </nav>
      </div>
    </header>
  );
}

export default Header;