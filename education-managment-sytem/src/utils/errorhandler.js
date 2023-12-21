class ErrorHandler extends Error {
  constructor(message, status) {
    super();
    this.message = message || "Error :(";
    this.status = status || 500;
  }
}

export default ErrorHandler