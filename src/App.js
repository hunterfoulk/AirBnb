import React from "react";
import BookList from "./BookList";
import AddBook from "./AddBook";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

//apollo client
const client = new ApolloClient({
  uri: "http://localhost:5000/graphql",
});

function App() {
  return (
    <ApolloProvider client={client}>
      <h1>Books</h1>
      <BookList />
      <AddBook />
    </ApolloProvider>
  );
}

export default App;
