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
