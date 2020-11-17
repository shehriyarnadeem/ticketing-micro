export class DatabaseConnectionError extends Error {
  constructor() {
    super();
    const reason = "Error connecting to database";
    Object.setPrototypeOf(this, DatabaseConnectionError.prototype);
  }
}
