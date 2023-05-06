const jwt = require("jsonwebtoken");
const checkAdminMiddleware = (req, res, next) => {
  jwt.verify(req.headers.token, "shhhhh", function (err, decoded) {
    // console.log(decoded, "ddd");
    if (err) {
      res.send({ msg: "You are not admin" });
    } else if (decoded.admin) {
      next();
    } else {
      res.send({ msg: "you are not Admin" });
    }
  });
};
module.exports = checkAdminMiddleware;
