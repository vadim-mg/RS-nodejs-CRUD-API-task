import { dirname, normalize } from "node:path"
import { fileURLToPath } from "node:url"

/**
 * 
 * @param {*} url - путь до исполняемого js
 * @param {*} name - имя файл, полный путь которого мы хотим получить
 * @param {*} subDir - имя директории, в которую вложены файл
 * @returns 
 */
export function getFullPathName(url:string, name = "", subDir = "/files") {
  return normalize(dirname(fileURLToPath(url)) + subDir + name)
}
