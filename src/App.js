import React from "react";
import HouseList from "./HouseList";
import Navbar from "./Navbar";
import Homepage from "./Homepage";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { createUploadLink } from "apollo-upload-client";
import { inMemoryCache, InMemoryCache } from "apollo-cache-inmemory";

//apollo client
// const link = createUploadLink({
//   uri: "http://localhost:5000/graphql",
// });

const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      {/* <HouseList /> */}
      <Homepage />
    </ApolloProvider>
  );
}

export default App;
