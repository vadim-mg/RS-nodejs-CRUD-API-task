import request from "supertest"
import { describe } from "@jest/globals"
import { server } from "../app"
import { validate, NIL } from 'uuid'
import { ENDPOINT } from '../utils/constants'


const user1 = { username: 'Felix', age: 23, hobbies: [] }
const user2 = { username: 'Max', age: 31, hobbies: ['music', 'art'] }
let userID = NIL


describe('User API tests (addUser) ', () => {

  it("add user1 in DB (status 201)", async () => {
    return request(server)
      .post(ENDPOINT)
      .send(user1)
      .then(response => {
        expect(response.status).toBe(201)
        const { id, username, age, hobbies } = response.body
        userID = id
        expect(validate(userID)).toStrictEqual(true)
        expect(username).toStrictEqual(user1.username)
        expect(age).toStrictEqual(user1.age)
        expect(hobbies.length).toStrictEqual(user1.hobbies.length)
      })
  })

  it("add user2 in DB (status 201)", async () => {
    return request(server)
      .post(ENDPOINT)
      .send(user2)
      .then(response => {
        expect(response.status).toBe(201)
      })
  })

  it("not add wrong user in DB(Error400)", async () => {
    return request(server)
      .post(ENDPOINT)
      .send({ username: "", hobbies: [] })
      .then(response => {
        expect(response.status).toStrictEqual(400)
      })
  })
})


describe('User API tests (GetUser/GetUsers)', () => {

  it("GetUsers from DB status200", async () => {
    return request(server).get(ENDPOINT)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body).toHaveLength(2)
        expect(response.body[0].id).toStrictEqual(userID)
      })
  })

  it("GetUser1 from DB Status200", async () => {
    return request(server).get(`${ENDPOINT}/${userID}`)
      .then(response => {
        expect(response.status).toBe(200)
        expect(response.body.id).toStrictEqual(userID)
      })
  })

  it("GetWrongUser from DB (Error400)", async () => {
    return request(server).get(`${ENDPOINT}/xxx${userID}`)
      .then(response => {
        expect(response.status).toBe(400)
      })
  })

  it("GetWrongUser from DB(Error404)", async () => {
    return request(server).get(`${ENDPOINT}/${userID.slice(0, -5)}a098a`)
      .then(response => {
        expect(response.status).toBe(404)
      })
  })
})
