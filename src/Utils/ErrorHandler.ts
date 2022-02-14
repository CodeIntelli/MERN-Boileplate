class ErrorHandler extends Error {
  statusCode: any;
  constructor(message:any, statusCode:any) {
    super(message);
    // this.message = message;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ErrorHandler;
