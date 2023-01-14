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

const findUser = async (id: string) => {
  const user = users.get(id)
  if (!user)
    throw new ApiError(ERROR._404, `User id:${id} doesn't exist`)
  return user
}

const parseUserFromBody = async (req: IncomingMessage) => {
  try {
    let rawData = ''
    for await (const chunk of req) {
      rawData += chunk
    }
    return JSON.parse(rawData)
  } catch {
    throw new ApiError(ERROR._400, 'Parsing error! Invalid input data!')
  }
}

const getUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const user = await findUser(id)
  return sendData(SUCCESS._200, user, res)
}

const addUser = async (req: IncomingMessage, res: ServerResponse) => {
  const parsedData = await parseUserFromBody(req)
  return sendData(SUCCESS._201, users.add(parsedData), res)
}

const updateUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const user = await findUser(id)
  const parsedData = await parseUserFromBody(req)

  user.username = parsedData.username ?? user.username
  user.age = parsedData.age ?? user.age
  user.hobbies = parsedData.hobbies ?? user.hobbies

  const updatedRecord = users.update(user)
  if (updatedRecord)
    sendData(SUCCESS._200, updatedRecord, res)
}

const deleteUser = async (req: IncomingMessage, res: ServerResponse, id: string) => {
  const user = users.delete(id)
  if (!user)
    throw new ApiError(ERROR._404, `User id:${id} doesn't exist`)
  return sendData(SUCCESS._204, user, res)
}

export { getUsers, addUser, getUser, updateUser, deleteUser }