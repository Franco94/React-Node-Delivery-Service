class AppError extends Error {
  constructor(message, status) {
    super();
    Error.captureStackTrace(this, this.constructor);
    this.name = this.constructor.name;
    this.message = message || "Oops. No error message provided.";
    this.status = status || 500;
  }

}

module.exports = AppError;
