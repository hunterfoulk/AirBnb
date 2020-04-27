import React, { useState, useEffect } from "react";
import Modal from "godspeed/build/Modal";
import Button from "godspeed/build/Button";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import { MdClose } from "react-icons/md";
import axios from "axios";

function Navbar() {
  const [modalSignup, setModalSignup] = useState(false);
  const [loginModal, setLoginModal] = useState(true);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  async function handleRegister(e) {
    e.preventDefault();
    await axios
      .post("http://localhost:5000/signup", {
        email: email,
        username: username,
        password: password,
      })
      .then(
        (res) =>
          console.log(res.data) & console.log("account created succesfully!")
      )
      .catch((error) =>
        console.error("account not created succesfully:", error)
      );
  }

  async function handleLogin(e) {
    e.preventDefault();

    axios
      .post("http://localhost:5000/login", {
        email: email,
        username: username,
        password: password,
      })

      .then(
        (res) => console.log(res.data) & console.log("Logged in succesfully!")
      )
      .catch((error) => console.error("Log in was not succesful:", error));
  }

  return (
    <>
      <div className="navbar">
        <h2>Airbnb</h2>
        <div className="nav-button-container">
          <button onClick={() => setLoginModal(true)} className="login-button">
            Log in
          </button>
          <button
            onClick={() => setModalSignup(true)}
            className="signup-button"
          >
            Sign up
          </button>
          <Modal
            padding="0px 0px"
            onClick={() => setModalSignup(!modalSignup)}
            open={modalSignup}
          >
            <div className="signup-modal">
              <div className="signup-header">
                <h1>Sign up</h1>
              </div>

              <form onSubmit={handleRegister}>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email..."
                />
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your username..."
                />
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password..."
                />

                <Button
                  onClick={handleRegister}
                  className="signup-form-button"
                  text="Sign up"
                  bg="rgb(243, 88, 88)"
                />
              </form>

              <button className="social-buttons">
                {" "}
                <AiOutlineMail className="email-signup" /> Continue with email
              </button>
              <button className="social-buttons">
                {" "}
                <FaFacebook className="facebook-signup" /> Continue with
                Facebook
              </button>
              <button className="social-buttons">
                {" "}
                <FaGoogle className="google-signup" /> Continue with Google
              </button>
            </div>
          </Modal>
          <Modal onClick={() => setLoginModal(!loginModal)} open={loginModal}>
            <div className="signup-modal">
              <div className="signup-header">
                <h1>Log in</h1>
              </div>

              <form onSubmit={handleLogin}>
                <input
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  placeholder="Enter your email..."
                />
                <input
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  placeholder="Enter your username..."
                />
                <input
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Enter your password..."
                />

                <Button
                  onClick={handleLogin}
                  className="signup-form-button"
                  text="Log in"
                  bg="rgb(243, 88, 88)"
                />
              </form>

              <button className="social-buttons">
                {" "}
                <AiOutlineMail className="email-signup" /> Log in with email
              </button>
              <button className="social-buttons">
                {" "}
                <FaFacebook className="facebook-signup" /> Log in with Facebook
              </button>
              <button className="social-buttons">
                {" "}
                <FaGoogle className="google-signup" /> Log in with Google
              </button>
            </div>
          </Modal>
        </div>
      </div>
    </>
  );
}
export default Navbar;
