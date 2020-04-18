// import React, { useState } from "react";
// import { graphql } from "react-apollo";
// import { flowRight as compose } from "lodash";
// import { useQuery } from "@apollo/react-hooks";
// import { newHouses, newOwners } from "./queries/queries";
// import { useMutation } from "@apollo/react-hooks";

// function AddOwner() {
//   const [name, setName] = useState("");
//   const [age, setAge] = useState("");
//   const [owner, setOwner] = useState("");
//   const [location, setLocation] = useState("");
//   const [beds, setBeds] = useState(0);
//   const [baths, setBaths] = useState(0);
//   const [price, setPrice] = useState(0);

//   const [newHouse] = useMutation(newHouses);
//   const [newOwner] = useMutation(newOwners);

//   const [isError, setError] = useState({
//     name: false,
//     age: false,
//   });

//   const addNewOwner = (e) => {
//     e.preventDefault();
//     setError({
//       name: name ? true : false,
//       age: age ? true : false,
//     });
//     console.log("new owner created:", name, age);

//     // newHouse({
//     //   variables: {
//     //     owner: owner,
//     //     location: location,
//     //     beds: beds,
//     //     baths: baths,
//     //     price: price,
//     //   },
//     // });

//     newOwner({
//       variables: {
//         name: name,
//         age: age,
//       },
//     });

//     setName("");
//     setAge("");
//     // setOwner("");
//     // setLocation("");
//     // setBeds(0);
//     // setBaths(0);
//     // setPrice(0);
//   };

//   return (
//     <div className="owner-main">
//       <div className="form-container">
//         <form>
//           <div>Register your name</div>
//           <div className="form-field">
//             <label>Name:</label>
//             <input
//               value={name}
//               onChange={(e) => {
//                 setName(e.target.value);
//                 setError({ ...isError, name: false });
//               }}
//               type="text"
//             ></input>
//           </div>
//           <div className="form-field">
//             <label>Age:</label>
//             <input
//               value={age}
//               onChange={(e) => {
//                 setAge(e.target.value);
//                 setError({ ...isError, age: false });
//               }}
//               type="text"
//             ></input>
//           </div>

//           {/* <div className="form-field">
//           <label>Location:</label>
//           <Input
//             value={location}
//             onChange={(e) => {
//               setLocation(e.target.value);
//               setError({ ...isError, location: false });
//             }}
//             type="text"
//           ></Input>
//         </div>
//         <div className="form-field">
//           <label>Beds:</label>
//           <Input
//             value={beds}
//             onChange={(e) => {
//               setBeds(e.target.value);
//               setError({ ...isError, beds: false });
//             }}
//             type="text"
//           ></Input>
//         </div>
//         <div className="form-field">
//           <label>Baths:</label>
//           <Input
//             value={baths}
//             onChange={(e) => {
//               setBaths(e.target.value);
//               setError({ ...isError, baths: false });
//             }}
//             type="text"
//           ></Input>
//         </div>
//         <div className="form-field">
//           <label>Price:</label>
//           <Input
//             value={price}
//             onChange={(e) => {
//               setPrice(e.target.value);
//               setError({ ...isError, price: false });
//             }}
//             type="text"
//           ></Input>
//         </div> */}

//           <button onClick={(e) => addNewOwner(e)}>Submit</button>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default compose(
//   graphql(newHouses, { name: "newHouses" }),
//   graphql(newOwners, { name: "newOwners" })
// )(AddOwner);
