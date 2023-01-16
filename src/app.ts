import { createServer } from 'node:http'
import { router } from './routers/router.js'
import { errorController } from './controllers/error-controller.js';


const server = createServer();

server.on('request', async (req, res) => {
  try {
    // console.log(`Request: (${req.method})http:...${req.url}`)
    await router(req, res)
  } catch (e: any) {
    errorController(res, e)
  }
});

export { server }