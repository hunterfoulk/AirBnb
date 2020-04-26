import React, { useState, useEffect } from "react";
import Button from "godspeed/build/Button";
import Drawer from "godspeed/build/Drawer";

function Navbar() {
  return (
    <>
      <div className="navbar">
        <h2>Airbnb</h2>
        <div className="nav-button-container">
          <button className="login-button">Log in</button>
          {/* <span className="login">Log in</span> */}
          <button className="signup-button">Sign up</button>
        </div>
      </div>
    </>
  );
}
export default Navbar;
