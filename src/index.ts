import { server } from './app.js'
import { DOMAIN, PORT } from './utils/constants.js';


server.listen(PORT, () => console.log(`Started server on ${DOMAIN}:${PORT}/`));
