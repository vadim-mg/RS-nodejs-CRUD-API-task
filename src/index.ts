import { config } from 'dotenv'

config()
const PORT = process.env.port ?? '5000'

console.log(`Port: ${PORT}`)