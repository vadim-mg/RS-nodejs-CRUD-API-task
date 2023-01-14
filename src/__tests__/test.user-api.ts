import request from "supertest"
import { describe } from "@jest/globals"
import { server } from "../app"
import { validate, NIL } from 'uuid'
import { ENDPOINT } from '../utils/constants'


const user1 = { username: 'Felix', age: 23, hobbies: [] }
const user2 = { username: 'Max', age: 31, hobbies: ['music', 'art'] }
let userID = NIL

describe('User API tests (404) ', () => {

  it("Incorrect route: 404", async () => {
    return request(server).get(ENDPOINT + 'ssss')
      .then(response => {
        expect(response.status).toBe(404)
      })
  })

})

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

  it("Get User with incorrect ID from DB (Error400)", async () => {
    return request(server).get(`${ENDPOINT}/xxx${userID}`)
      .then(response => {
        expect(response.status).toBe(400)
      })
  })

  it("Get not existing User from DB(Error404)", async () => {
    return request(server).get(`${ENDPOINT}/${userID.slice(0, -5)}a098a`)
      .then(response => {
        expect(response.status).toBe(404)
      })
  })
})


describe('User API tests (Update)', () => {
  it("Update user1 ", async () => {
    return request(server).put(`${ENDPOINT}/${userID}`)
      .send({ username: "changedUser1", hobbies: ['running'] })
      .then(response => {
        expect(response.status).toStrictEqual(200)
      })
  })
  it("Update user1 ", async () => {
    return request(server).put(`${ENDPOINT}/${userID}`)
      .send({ age: 55 })
      .then(response => {
        expect(response.status).toStrictEqual(200)
      })
  })
  it("Check updated user", async () => {
    return request(server).get(`${ENDPOINT}/${userID}`)
    .then(response => {
      expect(response.status).toStrictEqual(200)
      expect(response.body.age).toStrictEqual(55)
    })
  })
  it("Update non-exist user returns 404 ", async () => {
    return request(server).put(`${ENDPOINT}/${userID.slice(0, -5)}a098a`)
      .send({ age: 65 })
      .then(response => {
        expect(response.status).toStrictEqual(404)
      })
  })
  it("Update user with wrong number returns 400 ", async () => {
    return request(server).put(`${ENDPOINT}/wrong-id-a098a`)
      .send({ age: 75 })
      .then(response => {
        expect(response.status).toStrictEqual(400)
      })
  })
})

describe('User API tests (Delete)', () => {
  it("Delete user1 ", async () => {
    return request(server).delete(`${ENDPOINT}/${userID}`)
      .send({ username: "changedUser1", hobbies: ['running'] })
      .then(response => {
        expect(response.status).toStrictEqual(204)
      })
  })
  it("Check deleted user", async () => {
    return request(server).get(`${ENDPOINT}/${userID}`)
    .then(response => {
      expect(response.status).toStrictEqual(404)
    })
  })
  it("Delete non-exist user returns 404 ", async () => {
    return request(server).delete(`${ENDPOINT}/${userID.slice(0, -5)}a098a`)
      .send({ age: 65 })
      .then(response => {
        expect(response.status).toStrictEqual(404)
      })
  })
  it("Delete user with wrong number returns 400 ", async () => {
    return request(server).delete(`${ENDPOINT}/wrong-id-a098a`)
      .send({ age: 75 })
      .then(response => {
        expect(response.status).toStrictEqual(400)
      })
  })
})