// import React from "react";
// import { graphql } from "react-apollo";
// import { useQuery } from "@apollo/react-hooks";
// import { getHouses } from "./queries/queries";

// function HouseList() {
//   const { loading, error, data } = useQuery(getHouses);

//   if (loading) return "Loading...";
//   if (error) return `Error! ${error.message}`;

//   return (
//     <div>
//       {data.houses.map((house) => (
//         <div className="list" key={house.id}>
//           <li>
//             <span>Owner:</span>
//             {house.owner.name}
//           </li>
//           <div>
//             <span>Location:</span>
//             {house.location}
//           </div>
//           <div>
//             <span>Beds:</span>
//             {house.beds}
//           </div>
//           <div>
//             <span>Baths:</span>
//             {house.baths}
//           </div>
//           <div>
//             <span>Price:</span>
//             {house.price}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }
// export default graphql(getHouses)(HouseList);
