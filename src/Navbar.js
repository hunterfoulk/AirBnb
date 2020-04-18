import React, { useState } from "react";
import Button from "godspeed/build/Button";
import Drawer from "godspeed/build/Drawer";
import Modal from "godspeed/build/Modal";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { newHouses, newOwners } from "./queries/queries";
import { useMutation } from "@apollo/react-hooks";
import { getOwners } from "./queries/queries";

function Navbar() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [location, setLocation] = useState("");
  const [beds, setBeds] = useState("");
  const [baths, setBaths] = useState("");
  const [price, setPrice] = useState("");
  const [drawer, setDrawer] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [houseModal, setHouseModal] = useState(false);
  const [newOwner] = useMutation(newOwners);
  const [newHouse] = useMutation(newHouses);
  const [isError, setError] = useState({
    name: false,
    age: false,
  });

  const { loading, error, data } = useQuery(getOwners);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;

  //ADD NEW OWNER
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

  //ADD NEW HOUSE
  const addNewHouse = (e) => {
    e.preventDefault();
    setError({
      ownerId: ownerId ? true : false,
      location: location ? true : false,
      beds: beds ? true : false,
      baths: baths ? true : false,
      price: price ? true : false,
    });
    console.log("new house created:", ownerId, location, beds, baths, price);
    newHouse({
      variables: {
        ownerId: ownerId,
        location: location,
        beds: beds,
        baths: baths,
        price: price,
      },
    });
    console.log(ownerId._id);
    setOwnerId("");
    setLocation("");
    setBeds("");
    setBaths("");
    setPrice("");
  };

  return (
    <>
      <Drawer
        onClick={() => setDrawer(!drawer)}
        open={drawer}
        padding="20px 40px"
      >
        <div className="drawer-header">
          <h1>Navigation</h1>
          <p>View your dream destinations!</p>
        </div>
        <div text="Open Drawer" onClick={() => setModalOpen(true)}>
          <div className="modal-button">Register Owner</div>
        </div>
        <div text="Open Drawer" onClick={() => setHouseModal(true)}>
          <div className="modal-button">Register Your House</div>
        </div>

        {/* REGISTER OWNER MODAL */}
        <Modal onClick={() => setModalOpen(!modalOpen)} open={modalOpen}>
          <div className="form-container">
            <form>
              <span>Register as an owner!</span>
              <div className="form-field">
                <label>Name</label>
                <input
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
                  value={age}
                  onChange={(e) => {
                    setAge(e.target.value);
                    setError({ ...isError, age: false });
                  }}
                  type="text"
                ></input>
              </div>

              <button onClick={(e) => addNewOwner(e)}>Submit</button>
            </form>
          </div>
        </Modal>

        {/* HOUSE MODAL */}
        <Modal onClick={() => setHouseModal(!houseModal)} open={houseModal}>
          <div className="form-container">
            <form>
              <span>Register your house!</span>
              {/* <div className="form-field">
                <label>Owner</label>
                <input
                  key={ownerId.id}
                  value={ownerId.id}
                  onChange={(e) => {
                    setOwnerId(e.target.value);
                    setError({ ...isError, ownerId: false });
                  }}
                  type="text"
                ></input>
              </div> */}
              <div className="form-field">
                <label>Location</label>
                <input
                  value={location}
                  onChange={(e) => {
                    setLocation(e.target.value);
                    setError({ ...isError, location: false });
                  }}
                  type="text"
                ></input>
              </div>
              <div className="form-field">
                <label>Beds</label>
                <input
                  value={beds}
                  onChange={(e) => {
                    setBeds(e.target.value);
                    setError({ ...isError, beds: false });
                  }}
                  type="text"
                ></input>
              </div>
              <div className="form-field">
                <label>Baths</label>
                <input
                  value={baths}
                  onChange={(e) => {
                    setBaths(e.target.value);
                    setError({ ...isError, baths: false });
                  }}
                  type="text"
                ></input>
              </div>
              <div className="form-field">
                <label>Price</label>
                <input
                  value={price}
                  onChange={(e) => {
                    setPrice(e.target.value);
                    setError({ ...isError, price: false });
                  }}
                  type="text"
                ></input>
              </div>
              <div key={ownerId} className="form-field">
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
              </div>

              <button onClick={(e) => addNewHouse(e)}>Submit</button>
            </form>
          </div>
        </Modal>
      </Drawer>

      <div className="navbar">
        <h2>Airbnb</h2>
        <Button bg="black" size="md" text="≡" onClick={() => setDrawer(true)} />
      </div>
    </>
  );
}
export default compose(
  graphql(newHouses, { name: "newHouses" }),
  graphql(getOwners, { name: "getOwners" }),
  graphql(newOwners, { name: "newOwners" })
)(Navbar);
