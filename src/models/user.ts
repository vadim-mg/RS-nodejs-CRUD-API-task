interface User {
  readonly id?: string,
  username: string,
  age: number,
  hobbies: string[]
}
interface StoredUser extends User {
  readonly id: string
}

const checkField = (
  user: { [key: string]: any },
  fieldName: string,
  fieldType: string,
  options: {
    minLength?: number,
    minValue?: number,
    typeOfArray?: string
  }
): string | boolean => {
  const field = user[fieldName]
  const isArray = (fieldType === 'array')

  if (field === undefined)
    return `${fieldName} not found`
  if ((isArray && !Array.isArray(field)) || (!isArray && typeof field !== fieldType))
    return `${fieldName} must be ${fieldType}`
  if (options.minLength && field.length < options.minLength)
    return `${fieldName} must be more ${options.minLength} character`
  if (options.minValue && field < options.minValue)
    return `${fieldName} must be more ${options.minValue} character`
  if (
    options.typeOfArray &&
    isArray &&
    field.length &&
    (field.find(
      (val: any) => typeof val !== 'string' || val === ''
    ) !== undefined)
  )
    return `${fieldName} must be array of not empty ${options.typeOfArray}s or empty array`

  return false
}

const getFieldsError = (user: any): string | boolean =>
  user.id && checkField(
    user,
    'id',
    'string',
    { minLength: 16 }
  )
  || checkField(
    user,
    'username',
    'string',
    { minLength: 1 }
  )
  || checkField(
    user,
    'age',
    'number',
    { minValue: 0 }
  )
  || checkField(
    user,
    'hobbies',
    'array',
    { typeOfArray: 'string' }
  )
  || false


const getUserFieldsError = (user: User): string | boolean => getFieldsError(user)

export { User, StoredUser, getUserFieldsError, getFieldsError }