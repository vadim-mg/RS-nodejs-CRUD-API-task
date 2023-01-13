import { User, StoredUser, getUserFieldsError } from "./user.js";
import { v4 as uuidv4 } from 'uuid';
import { ApiError } from "../exceptions/api-error.js";
import { ERROR } from "../utils/constants.js";

class Users {

  list: StoredUser[]

  constructor() {
    this.list = []
  }

  get(id: string): StoredUser | null {
    return this.list.find((val) => val.id === id) ?? null
  }

  getAll(): StoredUser[] {
    return this.list
  }

  add(user: User): StoredUser {
    const userHasError = getUserFieldsError(user)
    if (userHasError) {
      throw new ApiError(ERROR._400, userHasError + '')
    }
    this.list.push({ id: uuidv4(), ...user })
    return this.list[this.list.length - 1]
  }

  /**
   * Searches id element in list and exec func with it
   * @param id 
   * @param func 
   * @returns 
   */
  private findAndDoFunc(
    id: string,
    func: (n: number, user?: StoredUser) => StoredUser
  ): StoredUser | null {
    const index = this.list.findIndex((val) => val.id === id)
    return (index >= 0) ? func(index) : null
  }

  update(user: StoredUser): StoredUser | null {
    return this.findAndDoFunc(
      user.id,
      (i: number) => {
        this.list[i] = user
        return user
      })
  }

  delete(id: string): StoredUser | null {
    return this.findAndDoFunc(
      id,
      (i: number) => {
        const user = this.list[i]
        this.list.splice(i, 1)
        return user
      })
  }
}

const users = new Users()

export { users }