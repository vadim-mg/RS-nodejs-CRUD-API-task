import { IncomingMessage, ServerResponse } from "http";
import { ENDPOINT } from "../utils/constants.js";
import * as userController from "../controllers/user-controller.js"
import { ApiError } from "../exceptions/api-error.js";
import { ERROR } from "../utils/constants.js";
import { validate } from "uuid";

const normUrl = (str?: string): string =>
  str?.endsWith('/') ? str.slice(0, -1) : (str ?? '')

const getParams = (srt: string): string => {
  const params = srt.replace(ENDPOINT, '')
  return params.length ? params.slice(1) : ''
}

const router = async (req: IncomingMessage, res: ServerResponse) => {
  const uri = normUrl(req.url)
  const uuid = getParams(uri)
  if(uuid && !validate(uuid)){
    throw new ApiError(ERROR._400, 'userId is invalid (not uuid)')
  }
  switch (`${req.method ?? ''}:${uri}`) {
    case `GET:${ENDPOINT}`:
      return userController.getUsers(req, res)
    case `GET:${ENDPOINT}/${uuid}`:
      return userController.getUser(req, res, uuid)
    case `POST:${ENDPOINT}`:
      return userController.addUser(req, res)
    default:
      throw new ApiError(ERROR._404)
  }
}

export { router }