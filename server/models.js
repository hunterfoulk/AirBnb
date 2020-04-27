const pool = require("./db");

const createUser = (body) => {
  return new Promise(function (resolve, reject) {
    const { email, username, password } = body;

    pool.query(
      "INSER INTO users (email,username,password) VALUSE ($1,$2,$3) RETURNING *",
      [email, username, password]
    );
  });
};
