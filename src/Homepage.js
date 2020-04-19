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
  const [modalOpen, setModalOpen] = useState(false);
  const [houseModal, setHouseModal] = useState(false);
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [newOwner] = useMutation(newOwners);
  const [newHouse] = useMutation(newHouses);

  const { loading, error, data } = useQuery(getOwners);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  // ADD OWNER
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

  // ADD HOUSE
  const addNewHouse = (e) => {
    e.preventDefault();
    setError({
      owner: owner ? true : false,
      location: location ? true : false,
      beds: beds ? true : false,
      baths: baths ? true : false,
      price: price ? true : false,
    });
    console.log("new house created:", owner, location, beds, baths, price);
    newHouse({
      variables: {
        owner: owner,
        location: location,
        beds: beds,
        baths: baths,
        price: price,
      },
    });
    console.log("owners id", owner);
    setOwner("");
    setLocation("");
    setBeds("");
    setBaths("");
    setPrice("");
  };

  return (
    <div className="home-main">
      <Modal onClick={() => setModalOpen(!modalOpen)} open={modalOpen}>
        <div className="form-container">
          <form>
            <h4>Register as an owner</h4>
            <div className="form-field">
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
            <div className="modal-icons">
              <FaFacebookF className="icons" />
              <FaTwitter className="icons" />
              <TiSocialInstagram className="icons" />
            </div>
          </form>
        </div>
      </Modal>
      <Modal onClick={() => setHouseModal(!houseModal)} open={houseModal}>
        <div className="form-container">
          <form>
            <h4>Register your house!</h4>
            <div className="form-field">
              <input
                placeholder="Enter name..."
                key={owner.id}
                value={owner.id}
                onChange={(e) => {
                  setOwner(e.target.value);
                  setError({ ...isError, owner: false });
                }}
                type="text"
              ></input>
            </div>
            <div className="form-field">
              <input
                placeholder="Enter location..."
                value={location}
                onChange={(e) => {
                  setLocation(e.target.value);
                  setError({ ...isError, location: false });
                }}
                type="text"
              ></input>
            </div>
            <div className="form-field">
              <input
                placeholder="Enter number of beds..."
                value={beds}
                onChange={(e) => {
                  setBeds(e.target.value);
                  setError({ ...isError, beds: false });
                }}
                type="text"
              ></input>
            </div>
            <div className="form-field">
              <input
                placeholder="Enter number of baths..."
                value={baths}
                onChange={(e) => {
                  setBaths(e.target.value);
                  setError({ ...isError, baths: false });
                }}
                type="text"
              ></input>
            </div>
            <div className="form-field">
              <input
                placeholder="Enter price..."
                value={price}
                onChange={(e) => {
                  setPrice(e.target.value);
                  setError({ ...isError, price: false });
                }}
                type="text"
              ></input>
            </div>
            {/* <div key={ownerId} className="form-field">
              <label>Owner</label>
              <select
                key={ownerId.id}
                value={ownerId._id}
                onChange={(e) => {
                  setOwnerId(e.target.value);
                  setError({ ...isError, ownerId: false });
                  console.log(e.target.value);
                  console.log(ownerId.id);
                }}
                type="text"
              >
                <option selected disabled>
                  select your name
                </option>
                {data.owners.map((owner) => (
                  <>
                    <option value={ownerId.id}>{owner.name}</option>
                  </>
                ))}
              </select>
            </div> */}

            <Button
              bg="rgb(243, 88, 88)"
              text="Submit"
              onClick={(e) => addNewHouse(e)}
            >
              Submit{" "}
            </Button>
          </form>
        </div>
      </Modal>
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
      <div className="header-main-container">
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