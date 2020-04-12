import { gql } from "apollo-boost";
import { useMutation } from "@apollo/react-hooks";

const getBooks = gql`
  {
    books {
      id
      name
      genre
      author {
        name
        id
      }
    }
  }
`;

const getAuthors = gql`
  {
    authors {
      id
      name
      age
      books {
        name
        genre
      }
    }
  }
`;

const newBooks = gql`
  mutation addBook($name: String!, $genre: String!, $authorId: ID!) {
    addBook(name: $name, genre: $genre, authorId: $authorId) {
      name
      genre
      author {
        name
      }
    }
  }
`;

export { getAuthors, getBooks, newBooks };
