import React, { useState, useEffect } from "react";
import Button from "godspeed/build/Button";
import Drawer from "godspeed/build/Drawer";
import Modal from "godspeed/build/Modal";

function Navbar() {
  const [drawer, setDrawer] = useState(false);
  const [houses, setHouses] = useState([]);
  const [isError, setError] = useState({
    name: false,
    age: false,
  });

  const getHouses = async () => {
    try {
      const response = await fetch("http://localhost:5000/houses");
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
      <div className="navbar">
        <h2>Airbnb</h2>
        <Button bg="black" size="md" text="≡" onClick={() => setDrawer(true)} />
      </div>
    </>
  );
}
export default Navbar;
