const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error

  if (err.name == "castError") {
    const message = `Resource not found . Invalid :${err.path}`;

    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate key error

  if (err.code == 11000) {
    const message = `Duplicate ${Object.keys(err.keyValue)}Entered`;

    err = new ErrorHandler(message, 400);
  }

  // wrong JWT error

  if (err.name === "jsonwebTokenError") {
    const message = `Json web token is invalid, try again`;
    err = new ErrorHandler(message, 400);
  }

  // jwt expire error

  if (err.name === "TokenExpiredError") {
    const message = ` Json web  token is expired , try again`;
    err = new ErrorHanlder(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.stack,
  });
};
