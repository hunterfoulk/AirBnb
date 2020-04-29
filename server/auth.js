const jwt = require("jsonwebtoken");

const SECRET =
  "785bc0808e13150aa10d06e563676943d93548e49c93f32a46907b9a5599fd6ee72dd3edac14eef51c22432ce82e90f0187d24d3c44e673af2691e1950c4b265";

const auth = async (req, res, next) => {
  const token = req.cookies.access_token;

  try {
    jwt.verify(token, SECRET);
  } catch (error) {
    res.status(400);
    throw error;
  }
  next();
  res.status(200);
};
module.exports = auth;
