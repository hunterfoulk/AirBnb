const graphql = require("graphql");
const House = require("../models/house");
const Owner = require("../models/owner");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

const HouseType = new GraphQLObjectType({
  name: "House",
  fields: () => ({
    id: { type: GraphQLID },
    location: { type: GraphQLString },
    beds: { type: GraphQLString },
    baths: { type: GraphQLString },
    price: { type: GraphQLString },
    owner: {
      type: OwnerType,
      resolve(parent, args) {
        return Owner.findById(parent.ownerId);
      },
    },
  }),
});

const OwnerType = new GraphQLObjectType({
  name: "Owner",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    rating: { type: GraphQLInt },
    age: { type: GraphQLString },
    houses: {
      type: new GraphQLList(HouseType),
      resolve(parent, args) {
        return House.find({ ownerId: parent.id });
      },
    },
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    house: {
      type: HouseType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return House.findById(args.id);
      },
    },
    owner: {
      type: OwnerType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return Owner.findById(args.id);
      },
    },
    houses: {
      type: new GraphQLList(HouseType),
      resolve(parent, args) {
        return House.find({});
      },
    },
    owners: {
      type: new GraphQLList(OwnerType),
      resolve(parent, args) {
        return Owner.find({});
      },
    },
  },
});

const Mutation = new GraphQLObjectType({
  name: "Mutation",
  fields: {
    addOwner: {
      type: OwnerType,
      args: {
        name: { type: GraphQLString },
        age: { type: GraphQLString },
        rating: { type: GraphQLInt },
      },
      resolve(parent, args) {
        let owner = new Owner({
          name: args.name,
          age: args.age,
          rating: args.rating,
        });
        return owner.save();
      },
    },
    addHouse: {
      type: HouseType,
      args: {
        // owner: { type: new GraphQLNonNull(GraphQLString) },
        location: { type: new GraphQLNonNull(GraphQLString) },
        baths: { type: new GraphQLNonNull(GraphQLString) },
        beds: { type: new GraphQLNonNull(GraphQLString) },
        price: { type: new GraphQLNonNull(GraphQLString) },
        ownerId: { type: new GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        let house = new House({
          location: args.location,
          // owner: args.owner,
          beds: args.beds,
          baths: args.baths,
          price: args.price,
          ownerId: args.ownerId,
        });
        return house.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
