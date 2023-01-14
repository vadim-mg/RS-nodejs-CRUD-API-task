import { jest, expect, test } from '@jest/globals';
import { getFieldsError } from '../models/user';

jest.useFakeTimers();

test('addCorrectUser', () => {
  expect(getFieldsError({ username: 'Felix', age: 23, hobbies: [] })).toEqual(false)
})

test('addNoNameUser', () => {
  expect(getFieldsError({ username: '', age: 23, hobbies: [] })).toEqual('username must be more 1 character')
})

test('addWithoutNameUser', () => {
  const user = { age: 23, hobbies: [] }
  expect(getFieldsError(user)).toEqual('username not found')
})

test('addWrongNameUserType', () => {
  const user = { username: 2, age: 23, hobbies: [] }
  expect(getFieldsError(user)).toEqual('username must be string')
})

test('addWrongAge', () => {
  const user = { username: "vat", age: -2, hobbies: [] }
  expect(getFieldsError(user)).toEqual('age must be more 0')
})

test('addWrongHobbies', () => {
  const user = { username: "vat", age: 20, hobbies: ['hockey', 34] }
  expect(getFieldsError(user)).toEqual('hobbies must be array of not empty strings or empty array')
})

test('addWrongHobbies', () => {
  const user = { username: "vat", age: 20, hobbies: ['', ''] }
  expect(getFieldsError(user)).toEqual('hobbies must be array of not empty strings or empty array')
})

test('addWrongID', () => {
  const user = {id: 25, username: "vat", age: 20, hobbies: [] }
  expect(getFieldsError(user)).toEqual('id must be string')
})
