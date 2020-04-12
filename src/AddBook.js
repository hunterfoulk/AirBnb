import React, { useState } from "react";
import { graphql } from "react-apollo";
import { flowRight as compose } from "lodash";
import { useQuery } from "@apollo/react-hooks";
import { getAuthors, newBooks } from "./queries/queries";
import { useMutation } from "@apollo/react-hooks";

function AddBook() {
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  const [newBook] = useMutation(newBooks);
  const [isError, setError] = useState({
    name: false,
    genre: false,
    authorId: false,
  });

  const { loading, error, data } = useQuery(getAuthors);

  if (loading) return "";
  if (error) return `Error! ${error.message}`;

  const addNewBook = (e) => {
    e.preventDefault();
    setError({
      name: !name ? true : false,
      genre: !genre ? true : false,
      authorId: !authorId ? true : false,
    });
    console.log("submitted to database:", name, genre, authorId);
    // mutation
    newBook({
      variables: { name: name, genre: genre, authorId: authorId },
    });

    setAuthorId("");
    setName("");
    setGenre("");
  };

  return (
    <div>
      <form>
        <div className="form-field">
          <label>Book Name:</label>
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
          <label>Genre:</label>
          <input
            value={genre}
            onChange={(e) => {
              setGenre(e.target.value);
              setError({ ...isError, genre: false });
            }}
            type="text"
          ></input>
        </div>
        <div key={authorId.id} className="form-field">
          <label>author:</label>
          <select
            key={authorId.id}
            value={authorId.id}
            onChange={(e) => {
              setAuthorId(e.target.value);
              setError({ ...isError, authorId: false });
              console.log(e.target.value);
            }}
            type="text"
          >
            <option selected disabled>
              select author
            </option>
            {data.authors.map((author) => (
              <>
                <option value={author.id}>{author.name}</option>
              </>
            ))}
          </select>
        </div>
        <button onClick={(e) => addNewBook(e)}>add book</button>
      </form>
    </div>
  );
}

export default compose(
  graphql(getAuthors, { name: "getAuthors" }),
  graphql(newBooks, { name: "newBooks" })
)(AddBook);
