import { config } from 'dotenv'

config()

const ENDPOINT = '/api/users'
const PORT = process.env.port ?? '5000'
const DOMAIN = process.env.domain ?? 'http://localhost'

type HttpResponse = { code: number, message: string }

const ERROR = {
  _400: { code: 400, message: 'Bad Request' },
  _404: { code: 404, message: 'Not Found' },
  _500: { code: 500, message: 'Internal Server Error' },
}
const SUCCESS = {
  _200: { code: 200, message: 'OK' },
  _201: { code: 201, message: 'Created' },
  _204: { code: 204, message: 'Deleted' },
}

export { ENDPOINT, PORT, DOMAIN, ERROR, SUCCESS, HttpResponse }