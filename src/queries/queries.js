import { gql } from "apollo-boost";

const getHouses = gql`
  {
    houses {
      owner {
        name
        age
        rating
        id
      }
      id
      beds
      baths
      price
      location
    }
  }
`;

const getOwners = gql`
  {
    owners {
      name
      age
      houses {
        location
        beds
        baths
        price
      }
    }
  }
`;

const newOwners = gql`
  mutation addOwner($name: String!, $age: String!, $ownerId: ID!) {
    addOwner(name: $name, age: $age, ownerId: $ownerId) {
      name
      age
      ownerId
    }
  }
`;

const newHouses = gql`
  mutation addHouse(
    $ownerId: ID!
    $location: String!
    $beds: String!
    $baths: String!
    $price: String!
  ) {
    addHouse(
      ownerId: $ownerId
      location: $location
      beds: $beds
      baths: $baths
      price: $price
    ) {
      owner {
        name
        age
        rating
        id
      }
      location
      beds
      baths
      price
    }
  }
`;

export { getHouses, newOwners, newHouses, getOwners };
