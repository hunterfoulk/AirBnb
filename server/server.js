const express = require("express");
const graphqlHTTP = require("express-graphql");
const schema = require("./schema/schema");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.use(cors());

//Cors
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   if (req.method === "OPTIONS") {
//     res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE");
//     return res.status(200).json({});
//   }
//   next();
// });

const uri =
  "mongodb+srv://hunterfoulk:Murphy01@cluster0-sexjr.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  useCreateIndex: true,
});
mongoose.set("useFindAndModify", false);
const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connected successfully"));

app.use(
  "/graphql",
  graphqlHTTP({
    schema,
    graphiql: true,
  })
);

app.listen(5000, () => {
  console.log("server started on port 5000");
});
