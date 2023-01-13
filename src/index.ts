import { DOMAIN, PORT } from './utils/constants.js';
import { createServer } from 'node:http'
import { router } from './routers/router.js'
import { errorController } from './controllers/error-controller.js';


const server = createServer();

server.on('request', async (req, res) => {
  try {
    console.log(`---------------------------------------------------`)
    console.log(`Request: (${req.method})${DOMAIN}:${PORT}${req.url}`)
    await router(req, res)
    console.log(`Response statusCode: ${res.statusCode}`)
  } catch (e: any) {
    errorController(res, e)
  }
});


server.listen(PORT, () => console.log(`Started server on http:\/\/localhost:${PORT}/`));
