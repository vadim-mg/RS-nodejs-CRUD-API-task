export interface User {
  readonly id?: string,
  username: string,
  age: number,
  hobbies: string[]
}
export interface StoredUser extends User {
  readonly id: string
}