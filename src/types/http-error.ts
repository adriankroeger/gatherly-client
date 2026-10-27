// Keeps the status code so callers can tell "not there" (404) from "server broke" (5xx)
export class HttpError extends Error {
  status: number;

  constructor(status: number) {
    super(`The server answered with HTTP ${status}`);
    this.name = "HttpError";
    this.status = status;
  }
}
