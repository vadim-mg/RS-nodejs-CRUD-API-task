import { jest, describe, expect, test } from '@jest/globals';
import { StoredUser } from '../models/user';
import { users } from '../models/users';

jest.useFakeTimers();

const user1: StoredUser = users.add({ username: 'Felix', age: 23, hobbies: [] })
test('addUser1', () => {
  expect(user1.id).toHaveLength(36)
  expect(user1.username).toStrictEqual('Felix');
  expect(user1.age).toStrictEqual(23);
  expect(user1.hobbies).toStrictEqual([]);
});


const user2: StoredUser = users.add({ username: 'Max', age: 45, hobbies: ['music', 'art'] })
test('addUser2', () => {
  expect(user2.id).toHaveLength(36)
  expect(user2.username).toStrictEqual('Max');
  expect(user2.age).toStrictEqual(45);
  expect(user2.hobbies).toStrictEqual(['music', 'art']);
});

test('getUsers', () => {
  expect(users.getAll()).toHaveLength(2)
})

test('getOneUser', () => {
  const gotUser = users.get(user1.id ?? 'non!!')
  expect(gotUser).toStrictEqual(user1)
  expect(gotUser).not.toStrictEqual(user2)
})

test('getWrongUser', () => {
  const gotWrongUser = users.get('non!!')
  expect(gotWrongUser).toStrictEqual(null)
})

test('updateUser1', () => {
  user1.username = "Felix II"
  user1.hobbies.push('Strike')
  const updatedUser = users.update(user1)
  expect(updatedUser).toStrictEqual(user1)
})

test('notUpdateWrongUser', () => {
  const updatedUser = users.update({ id: "notExistingId", username: 'Felix', age: 23, hobbies: [] })
  expect(updatedUser).toStrictEqual(null)
})

test('deleteUser1', () => {
  const deletedUser = users.delete(user1.id)
  expect(deletedUser).toStrictEqual(user1)
  const repeatDeletedUser = users.delete(user1.id)
  expect(repeatDeletedUser).toStrictEqual(null)
})

test('notUpdateDeletedUser', () => {
  const updateDeletedUser = users.update(user1)
  expect(updateDeletedUser).toStrictEqual(null)
})

test('deleteUser2', () => {
  const deletedUser = users.delete(user2.id)
  expect(deletedUser).toStrictEqual(user2)
  const repeatDeletedUser = users.delete(user2.id)
  expect(repeatDeletedUser).toStrictEqual(null)
})

test('notGetUsersFromEmptyList', () => {
  expect(users.getAll()).toHaveLength(0)
  const gotUser = users.get(user1.id ?? 'non!!')
  expect(gotUser).toStrictEqual(null)
})