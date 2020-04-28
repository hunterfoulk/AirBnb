const jwt = require("jsonwebtoken");
require("dotenv").config;

const auth = async (req, res, next) => {
  const token = req.header("Authorization").replace("Bearer", "");
  const data = jwt.verify(token, "secret");
  try {
    const users = await pool.query(
      " SELECT * FROM users WHERE email = $1 AND username = $2 AND password = $3 ",
      [email, username, password]
    );
    if (!user) {
      throw new Error();
    }
    req.users = users;
    req.token = token;
    next();
  } catch (error) {
    res.status(401).send({ error: "Not authorized to access this resource" });
  }
};
