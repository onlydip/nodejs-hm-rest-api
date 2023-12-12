const jwt = require("jsonwebtoken");
const { HttpError } = require("../utils");
const User = require("../models/user");

const { JWT_SECRET } = process.env;
const authenticate = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [bearer, token] = authorization.split(" ");
  if (bearer !== "Bearer") {
    next(HttpError(401, "Not authorized!"));
  }
  try {
    const { id } = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(id);
    if (!user || !user.token || user.token !== token) {
      next(HttpError(401, "Not authorized! User not found!"));
    }
    req.user = user;
    next();
  } catch {
    next(HttpError(401, "Not authorized!"));
  }
};

module.exports = authenticate;