const jwt = require("jsonwebtoken");
const createError = require("./../utils/error");

exports.verifyToken = (req, res, next) => {
  const token = req.cookies.access_toke;
  if (!token) return next(createError(401, "Your ar not authenticated."));

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) return next(createError(401, "Token is not valid"));
    req.user = user;
    next();
  });
};

exports.verifyUser = (req, res, next) => {
  this.verifyToken(req, res,next,() => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      res.send("Your are logged in You can delete your accound");
    } else {
      if (err) return next(createError(403, "Yor are not authenthrized!"));
    }
  });
};
exports.verifyAdmin = (req, res, next) =>{
    
  this.verifyToken(req, res,next,() => {
    console.log(req.user.isAdmin)
    if (req.user.isAdmin) {
      next();
    } else {
      return next(createError(403, "Your are not authorized!"));
    }
  });
};
