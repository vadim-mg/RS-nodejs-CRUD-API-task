import {rmSync, existsSync} from 'node:fs'
import { normalize } from 'node:path'
const buildPath = normalize('./build')

/* Script fo building */
/* Remove 'build' folder */

if(existsSync(buildPath)){
  rmSync(buildPath,{recursive: true})
  console.log(`Folder '${buildPath}' was removed!`)
}

