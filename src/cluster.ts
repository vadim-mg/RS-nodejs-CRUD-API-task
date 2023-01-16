import cluster from "cluster";
import { server } from './app.js'
import http from "node:http"
import { cpus } from "os";
import { DOMAIN, PORT } from './utils/constants.js';
import process from 'node:process';
import { fork } from "child_process";
import { getFullPathName } from "./utils/getFullPathName.js";


const logMessage = (serverName: string) =>
  `Started ${serverName} (pid:${process.pid}) on ${DOMAIN}:${PORT}/\n`

const bd = []

if (cluster.isPrimary) {
  const countCPUs = cpus().length
  const workers: any = []
  let currentWorker = 0
  const calcPortNumber = (workerIndex: number) => Number(PORT) + workerIndex + 1

  const server = http.createServer()

  server.on('request', async (reqToServer, resFromServer) => {

    let rawDataFromClient = ''
    reqToServer.on('data', (chunk: any) => {
      rawDataFromClient += chunk
    })

    reqToServer.on('end', () => {
      reqToWorker.write(rawDataFromClient);
      reqToWorker.end();
    })

    const port = calcPortNumber(currentWorker)
    const reqToWorker = http.request({
      hostname: 'localhost',
      port: port,
      path: reqToServer.url,
      method: reqToServer.method,
      headers: reqToServer.headers,
    }, (resFromWorker) => {

      console.log(`Request to worker pid=${workers[currentWorker].process.pid} on port: ${port}`)
      console.log(`Got request: (${reqToServer.method}) ${DOMAIN}:${port}${reqToServer.url}`)
      console.log(` StatusCode: ${resFromWorker.statusCode}`)

      let rawData = ''
      resFromWorker.on('data', (chunk: any) => {
        rawData += chunk
      })
      resFromWorker.on('end', () => {
        resFromServer.setHeader('workerPort', port)
        resFromServer.writeHead(resFromWorker.statusCode ?? 500, resFromWorker.headers);
        resFromServer.end(rawData);
      })

      currentWorker++
      if (currentWorker === countCPUs)
        currentWorker = 0
    })

    reqToWorker.on('error', (e) => {
      console.error(`problem with request: ${e.message}`);
    });
  }).listen(PORT, () => console.log(logMessage('load balancer')));



  for (let i = 0; i < countCPUs; i++) {
    const worker = cluster.fork({ PORT: calcPortNumber(i) })
    workers.push(worker)
    worker.on('exit', (code, signal) => {
      if (signal) {
        console.log(`worker was killed by signal: ${signal}`);
      } else if (code !== 0) {
        console.log(`worker exited with error code: ${code}`);
      } else {
        console.log('worker success!');
      }
    });
  }

  process.on('SIGINT', () => {
    server.close()
  })
  cluster.on('exit', (worker, code, signal) => {
    console.log(`worker ${worker.process.pid} died!\n`)
  })

} else {

  server.listen(PORT, () => console.log(logMessage('worker')));

}