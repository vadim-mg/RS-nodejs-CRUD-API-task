import { IncomingMessage, ServerResponse } from "http";
import { ENDPOINT } from "../utils/constants.js";
import * as userController from "../controllers/user-controller.js"
import { ApiError } from "../exceptions/api-error.js";
import { ERROR } from "../utils/constants.js";
import { validate } from "uuid";

const router = async (req: IncomingMessage, res: ServerResponse) => {

  const url = req.url ?? ''
  const uri = url.endsWith('/') ? url.slice(0, -1) : url
  const uuid = uri.split('/')[3] ?? ''

  if (uuid && !validate(uuid)) {
    throw new ApiError(ERROR._400, 'userId is invalid (not uuid)')
  }

  switch (`${req.method}:${uri}`) {
    case `GET:${ENDPOINT}`:
      return userController.getUsers(req, res)
    case `GET:${ENDPOINT}/${uuid}`:
      return userController.getUser(req, res, uuid)
    case `POST:${ENDPOINT}`:
      return userController.addUser(req, res)
    case `PUT:${ENDPOINT}/${uuid}`:
      return userController.updateUser(req, res, uuid)
    case `DELETE:${ENDPOINT}/${uuid}`:
      return userController.deleteUser(req, res, uuid)
    default:
      throw new ApiError(ERROR._404, 'incorrect route')
  }
}

export { router }