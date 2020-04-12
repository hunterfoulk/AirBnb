import React from "react";
import { graphql } from "react-apollo";
import { useQuery } from "@apollo/react-hooks";
import { getBooks } from "./queries/queries";

function BookList() {
  const { loading, error, data } = useQuery(getBooks);

  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  return (
    <div>
      {data.books.map((book) => (
        <div className="list" key={book.id}>
          <li>
            <span>Book:</span>
            {book.name}
          </li>
          <div>
            <span>Genre:</span>
            {book.genre}
          </div>
          <div>
            <span>Author:</span>
            {book.author.name}
          </div>
        </div>
      ))}
    </div>
  );
}
export default graphql(getBooks)(BookList);
