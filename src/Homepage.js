import React, { useState } from "react";
import roomPic from "./images/roompic.jpg";
import homePicOne from "./images/homepic1.jpg";
import homePicTwo from "./images/homepic2.jpg";
import boatPic from "./images/boatpic.jpg";
import dogPic from "./images/dogpic.jpg";
import Button from "godspeed/build/Button";
import guyPic from "./images/guypic.jpg";
import fishPic from "./images/fishpic.jpg";
import Modal from "godspeed/build/Modal";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { TiSocialInstagram } from "react-icons/ti";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { newHouses, newOwners } from "./queries/queries";
import { useMutation } from "@apollo/react-hooks";
import { getOwners } from "./queries/queries";

function Homepage() {
  const [isError, setError] = useState({
    name: false,
    age: false,
  });
  const [modalOpen, setModalOpen] = useState(true);
  const [houseModal, setHouseModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [newOwner] = useMutation(newOwners);

  const addNewOwner = (e) => {
    e.preventDefault();
    setError({
      name: name ? true : false,
      age: age ? true : false,
    });
    console.log("new owner created:", name, age);

    newOwner({
      variables: {
        name: name,
        age: age,
      },
    });

    setName("");
    setAge("");
  };

  return (
    <div className="home-main">
      <Modal onClick={() => setModalOpen(!modalOpen)} open={modalOpen}>
        <div className="form-container">
          <form>
            <h4>Register</h4>
            <div className="form-field">
              <label>Name</label>
              <input
                placeholder="Enter name..."
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError({ ...isError, name: false });
                }}
                type="text"
              ></input>
            </div>
            <div className="form-field">
              <label>Age</label>
              <input
                placeholder="Enter age..."
                value={age}
                onChange={(e) => {
                  setAge(e.target.value);
                  setError({ ...isError, age: false });
                }}
                type="text"
              ></input>
            </div>

            <Button
              bg="rgb(243, 88, 88)"
              text="Submit"
              onClick={(e) => addNewOwner(e)}
            >
              Submit{" "}
            </Button>
          </form>
        </div>
      </Modal>
      <Modal
        onClick={() => setHouseModal(!houseModal)}
        open={houseModal}
      ></Modal>
      <div className="home-nav">
        <div onClick={() => setModalOpen(true)} className="nav-one">
          <span>List As An Owner</span>
          <p>register name,age...</p>
        </div>
        <div onClick={() => setHouseModal(true)} className="nav-two">
          <span>List Your House</span>
          <p>register location,price,etc..</p>
        </div>
        <div className="nav-three">
          <div>
            <span>Search Locations</span>
            <p>search</p>
          </div>
          <Button text="Search" bg="rgb(243, 88, 88)" />
        </div>
      </div>
      <div className="header">
        <h2>Book your dream location</h2>

        <h2>with us today.</h2>
      </div>
      <div className="card-container">
        <div className="cards">
          <div className="img-container">
            <img src={homePicOne} />
          </div>
          <div className="card-bottom">
            <h4>Online Booking</h4>
            <div className="span-div">
              <span>Make us your travel home!</span>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="img-container">
            <img src={roomPic} />
          </div>
          <div className="card-bottom">
            <h4>Affordable housing</h4>
            <div className="span-div">
              <span>Stay up to as long as a month or longer.</span>
            </div>
          </div>
        </div>
        <div className="cards">
          <div className="img-container">
            <img src={homePicTwo} />
          </div>
          <div className="card-bottom">
            <h4>Amazing destinations</h4>
            <div className="span-div">
              <span>Find and stay at our amazing destinations!</span>
            </div>
          </div>
        </div>
      </div>

      {/* SECTION TWO */}
      <div className="section-two">
        <div className="section-two-text">
          <div className="text-container">
            <h2>Explore Our Online Experience</h2>
            <span>
              Now you can browse places to stay and travel from all over the
              world.Start your travel bookings with us today.
            </span>
          </div>
          <div className="button-container">
            <Button
              className="text-button"
              color="white"
              text="Explore All"
              clear
              bg="white"
            />
          </div>
        </div>
        <div className="section-two-container">
          <div className="content-div">
            <div className="section-card">
              <div className="img-container-two">
                <img src={boatPic} />
              </div>
              <div className="card-bottom">
                <h4>Amazing destinations</h4>
                <div className="span-div">
                  <span>Find and stay at our amazing destinations!</span>
                </div>
              </div>
            </div>
            <div className="section-two-main">
              <div className="section-two-container-two">
                <div className="cards-two">
                  <div className="img-container">
                    <img src={fishPic} />
                  </div>
                  <div className="card-bottom">
                    <h4>Online Booking</h4>
                    <div className="span-div">
                      <span>Make us your travel home!</span>
                    </div>
                  </div>
                </div>
                <div className="cards-two">
                  <div className="img-container">
                    <img src={guyPic} />
                  </div>
                  <div className="card-bottom">
                    <h4>Online Booking</h4>
                    <div className="span-div">
                      <span>Make us your travel home!</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="section-two-bottom-card">
                <div className="bottom-card">
                  <div className="img-container-three">
                    <img src={dogPic} />
                  </div>
                  <div className="card-bottom">
                    <h4>Online Booking</h4>
                    <div className="span-div">
                      <span>Make us your travel home!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer">
        <div className="footer-left">
          <span>
            {" "}
            © 2020 Airbnb, Inc. All rights reserved · Privacy · Terms
          </span>
        </div>
        <div className="footer-right">
          <FaFacebookF className="icons" />
          <FaTwitter className="icons" />
          <TiSocialInstagram className="icons" />
        </div>
      </div>
    </div>
  );
}
export default compose(
  graphql(newHouses, { name: "newHouses" }),
  graphql(getOwners, { name: "getOwners" }),
  graphql(newOwners, { name: "newOwners" })
)(Homepage);
