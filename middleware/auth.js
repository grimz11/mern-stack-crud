const jwt = require("jsonwebtoken");
const config = require("config");

//protect your endpoint by making it private(Provide token)
function auth(req, res, next) {
  const token = req.header("x-auth-token");

  //check for token
  if (!token) res.status(401).json({ msg: "No token, Unathorized" });

  try {
    //verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));

    //add user from token payload
    req.user = decoded;
    next();
  } catch (err) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}

module.exports = auth;
