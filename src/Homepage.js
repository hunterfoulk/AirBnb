import React, { useState, useEffect } from "react";
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
import Drawer from "godspeed/build/Drawer";
import Axios from "axios";
import { useStateValue } from "./state";

function Homepage() {
  const [isError, setError] = useState({
    name: false,
    age: false,
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [houseModal, setHouseModal] = useState(false);
  const [owner, setOwner] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [img, setImg] = useState(null);
  const [drawer, setDrawer] = useState(false);
  const [houses, setHouses] = useState([]);
  const [{ auth }, dispatch] = useStateValue();

  // ADD HOUSE
  const addNewHouse = async (e) => {
    e.preventDefault();
    let formData = new FormData();
    const userData = auth.user.username;

    formData.append("owner", userData);
    formData.append("location", location);
    formData.append("beds", beds);
    formData.append("baths", baths);
    formData.append("price", price);
    formData.append("img", img);

    console.log("users username", userData);

    let headers = {
      "Content-Type": "multipart/form-data",
      // "Access-Control-Allow-Origin": "https://hungry-euler-ec6a3a.netlify.app",
    };

    // var proxyUrl = "https://cors-anywhere.herokuapp.com/",
    //   targetUrl =
    //     "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/airbnb/houses";
    Axios.post(
      "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/airbnb/houses",
      formData,
      {
        headers: headers,
        withCredentials: true,
      }
    )

      .then((res) => {
        console.log("response", res);
        console.log("data sent to database");
      })
      .catch((error) => {
        console.log(error);
      });
    setOwner("");
    setLocation("");
    setBeds("");
    setBaths("");
    setPrice("");
    setImg(null);
  };

  const getHouses = async () => {
    try {
      const response = await fetch(
        "https://elegant-haibt-a61338.netlify.app/.netlify/functions/server/airbnb/houses"
      );
      const jsonData = await response.json();
      setHouses(jsonData);
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getHouses();
  }, []);

  const handleSearch = async (e) => {
    if (e.target.value !== "") {
      let filteredData = houses.filter((house) =>
        house.location?.toLowerCase().includes(e.target.value.toLowerCase())
      );
      setHouses(filteredData);
    } else {
      getHouses();
    }
  };

  return (
    <>
      <div className="home-main">
        <Drawer
          className="main-drawer"
          onClick={() => setDrawer(!drawer)}
          open={drawer}
          padding="20px 20px"
        >
          <div className="drawer-header">
            <h1>Houses for stay</h1>
            <input
              placeholder="Search by city..."
              className="search-filter"
              type="search"
              onChange={handleSearch}
            ></input>
          </div>

          {houses.map((house) => (
            <div className="mapped-houses">
              <div className="img-container">
                <img className="house-images" img src={house.img}></img>
              </div>
              <div className="drawer-text">
                <span>
                  House Owner <span className="owner">{house.owner}</span>
                </span>
                <span>
                  {" "}
                  City <span className="owner">{house.location}</span>
                </span>
                <div className="drawer-text-two">
                  <span>beds {house.beds}</span>
                  <span> baths {house.baths}</span>
                  <span className="price-span"> ${house.price}/night</span>
                </div>
              </div>
            </div>
          ))}
        </Drawer>

        <Modal onClick={() => setHouseModal(!houseModal)} open={houseModal}>
          <div className="form-container">
            <form onSubmit={(e) => addNewHouse(e)}>
              <h4>List your house for stay!</h4>

              <div className="form-field">
                <input
                  placeholder="Enter city location..."
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
                  placeholder="Enter price per night..."
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError({ ...isError, price: false });
                  }}
                  type="text"
                ></input>
              </div>
              <div className="file-input">
                <input
                  accept="image/gif, image/jpeg, image/png"
                  onChange={(e) => {
                    setImg(e.target.files[0]);
                    console.log(e.target.value);
                  }}
                  type="file"
                />
              </div>
              <Button
                bg="rgb(243, 88, 88)"
                text="Submit"
                onClick={(e) => addNewHouse(e)}
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
        <div className="home-nav">
          <div onClick={() => setModalOpen(true)} className="nav-one">
            <span>Share your experience</span>
            <p>stay at new locations,citys,landmarks</p>
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
            <Button
              text="Search"
              bg="rgb(243, 88, 88)"
              onClick={() => setDrawer(true)}
            />
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
      </div>

      <div className="footer">
        <div className="center">
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
    </>
  );
}
export default Homepage;
