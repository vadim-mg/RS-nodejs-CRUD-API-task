import { HttpResponse } from "../utils/constants"

class ApiError extends Error {
  status: number
  constructor(httpResponse: HttpResponse, additionalMessage: string = '') {
    super(httpResponse.message + (additionalMessage ? ` : ${additionalMessage}` : ''))
    this.status = httpResponse.code
  }
}

export { ApiError }


