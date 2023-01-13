import { IncomingMessage, ServerResponse } from "http";
import { ApiError } from "../exceptions/api-error.js";
import { users } from "../models/users.js";
import { SUCCESS, HttpResponse, ERROR } from "../utils/constants.js";

const sendData = async (httpResponse: HttpResponse, data: object, res: ServerResponse) => {
  return res
    .writeHead(httpResponse.code, { 'Content-Type': 'application/json' })
    .end(JSON.stringify(data))
}

const getUsers = async (req: IncomingMessage, res: ServerResponse) => {
  return sendData(SUCCESS._200, users.getAll(), res);
}

const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const user = users.get(id)
  if (user) {
    return sendData(SUCCESS._200, user, res)
  }
  throw new ApiError(ERROR._404, `User id:${id} doesn't exist`)
}

const addUser = async (req: IncomingMessage, res: ServerResponse) => {
  let rawData = ''
  for await (const chunk of req) {
    rawData += chunk
  }
  let parsedData
  try {
    parsedData = JSON.parse(rawData)
  } catch {
    throw new ApiError(ERROR._400, 'Parsing error! Invalid input data!')
  }
  return sendData(SUCCESS._201, users.add(parsedData), res)
}

export { getUsers, addUser, getUser }