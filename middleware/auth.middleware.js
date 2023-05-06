const jwt = require("jsonwebtoken");
const authMiddleware = (req, res, next) => {
  jwt.verify(req.headers.token, "shhhhh", function (err, decoded) {
    if (err) {
      res.send({ msg: "Login First" });
      //   console.log("yss");
    } else {
      req.body.user_id = decoded.user_id;

      next();
    }
  });
};
module.exports = authMiddleware;
