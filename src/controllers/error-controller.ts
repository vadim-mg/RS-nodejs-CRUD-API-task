import { ServerResponse } from "node:http";
import { ApiError } from "../exceptions/api-error.js";
import { ERROR } from "../utils/constants.js";

export const errorController = (res: ServerResponse, error: Error) => {

  const sendingError = (error instanceof ApiError)
    ? error
    : new ApiError(ERROR._500)

  res.writeHead(sendingError.status);
  res.end(sendingError.message);
}