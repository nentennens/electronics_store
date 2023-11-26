export class ApiError extends Error {
  status;
  errors;

  constructor(status: number, message: string, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    return new ApiError(401, 'The user is not authorized.');
  }

  static BadRequest(message: string, errors: any = []) {
    return new ApiError(400, message, errors);
  }
}
