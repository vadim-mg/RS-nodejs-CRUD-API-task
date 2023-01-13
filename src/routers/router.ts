import { IncomingMessage, ServerResponse } from "http";
import { ENDPOINT } from "../utils/constants.js";
import * as userController from "../controllers/user-controller.js"
import { ApiError } from "../exceptions/api-error.js";
import { ERROR } from "../utils/constants.js";

const normUrl = (str?: string): string =>
  str?.endsWith('/') ? str.slice(0, -1) : (str ?? '')

const router = async (req: IncomingMessage, res: ServerResponse) => {
  switch (`${req.method ?? ''}:${normUrl(req.url)}`) {
    case `GET:${ENDPOINT}`:
      return userController.getUsers(req, res)
    case `POST:${ENDPOINT}`:
      return userController.addUser(req, res)
    default:
      throw new ApiError(ERROR._404)
  }
}

export {router}