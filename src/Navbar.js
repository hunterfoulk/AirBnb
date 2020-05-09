import React, { useState, useEffect } from "react";
import Modal from "godspeed/build/Modal";
import Button from "godspeed/build/Button";
import { FaFacebook } from "react-icons/fa";
import { FaGoogle } from "react-icons/fa";
import { AiOutlineMail } from "react-icons/ai";
import axios from "axios";
import { useStateValue } from "./state";

function Navbar() {
  const [modalSignup, setModalSignup] = useState(false);
  const [loginModal, setLoginModal] = useState(false);
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [{ auth }, dispatch] = useStateValue();
  const [storage, setStorage] = useState();
  const [registered, setRegistered] = useState(false);

  async function handleRegister(e) {
    e.preventDefault();
    await axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/airbnb/signup",
        {
          email: email,
          username: username,
          password: password,
        }
      )
      .then(
        (res) =>
          console.log(res.data) & console.log("account created succesfully!"),
        setRegistered(true)
      )
      .catch((error) =>
        console.error("account not created succesfully:", error)
      );
  }

  async function handleLogin(e) {
    e.preventDefault();

    axios
      .post(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/airbnb/login",

        {
          email: email,
          username: username,
          password: password,
        },

        { withCredentials: true }
      )

      .then((res) => {
        const user = res.data.payload;
        localStorage.setItem("user", JSON.stringify(user.username));

        console.log("logged in succesfully");
        console.log("response", res);

        dispatch({
          type: "login",
          auth: {
            isAuthenticated: true,
            user: user,
          },
        });
        setLoginModal(false);
      })
      .catch((error) => console.error("Log in was not succesful:", error));
  }

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      setStorage(JSON.parse(user));

      console.log("localstorage get:", user);
    }
  }, [dispatch]);

  const handleLogout = () => {
    document.cookie.split(";").forEach(function (c) {
      document.cookie = c
        .replace(/^ +/, "")
        .replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/");
    });
    localStorage.removeItem("user");
    dispatch({
      type: "logout",
    });
    setStorage();
  };

  useEffect(() => {
    console.log(auth);
  }, [auth]);

  return (
    <>
      <div className="navbar">
        <h2>Airbnb</h2>
        <div className="nav-button-container">
          {(() => {
            if (auth.isAuthenticated) {
              return (
                <>
                  <span className="logged-in">{auth.user.username}</span>

                  <button onClick={handleLogout} className="signup-button">
                    Log out
                  </button>
                </>
              );
            } else if (storage) {
              return (
                <>
                  <span className="logged-in">{storage}</span>

                  <button onClick={handleLogout} className="signup-button">
                    Log out
                  </button>
                </>
              );
            } else {
              return (
                <>
                  <button
                    onClick={() => setLoginModal(true)}
                    className="login-button"
                  >
                    Log in
                  </button>
                  <button
                    onClick={() => setModalSignup(true)}
                    className="signup-button"
                  >
                    Sign up
                  </button>
                </>
              );
            }
          })()}

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
              {registered && (
                <div className="signup-success">
                  <p>Account Created!</p>
                </div>
              )}
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
