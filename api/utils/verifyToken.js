const jwt = require("jsonwebtoken");
const createError = require("../utils/error");

// USER VERIF
const verifyUser = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    else if (payload.id === req.params.id || payload.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// ADMIN VERIF

const verifyAdmin = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    else if (payload.isAdmin) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

// ORG VERIF

const verifyOrg = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(createError(401, "You are not authenticated!"));
  }
  jwt.verify(token, process.env.JWT, (err, payload) => {
    if (err) return next(createError(403, "Token is not valid!"));
    else if (payload.isOrg) {
      next();
    } else {
      return next(createError(403, "You are not authorized!"));
    }
  });
};

module.exports = { verifyAdmin, verifyOrg, verifyUser };
