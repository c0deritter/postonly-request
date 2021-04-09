import { Result } from 'coderitter-api-remote-method-call'
import { fromJsonObj, toJsonObj } from 'knight-json'

export async function request<T extends Result>(url: string, remoteMethodCall: any, instantiator: {[ className: string]: () => any }): Promise<any> {
  let request = new XMLHttpRequest()

  return new Promise<T>((resolve, reject) => {
    // onreadystatechange yields higher browser support and is the same as onload
    // with readyState == 4
    request.onreadystatechange = () => {

      // Only run if the request is complete
      if (request.readyState !== 4) return

      if (request.status == 200 && request.status < 300) {
        let json = request.response
        let jsonObj

        try {
          jsonObj = JSON.parse(json)
        }
        catch (e) {
          reject(e)
        }

        let result: T = fromJsonObj(jsonObj, { instantiator: instantiator })
        resolve(result)
      }
      else {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }
    }

    let remoteMethodCallObj 
    
    try {
      remoteMethodCallObj = toJsonObj(remoteMethodCall)
    }
    catch (e) {
      reject(e)
    }

    let remoteMethodCallJson
    
    try {
      remoteMethodCallJson = JSON.stringify(remoteMethodCallObj)
    }
    catch (e) {
      reject(e)
    }

    request.open('POST', url, true)
    request.send(remoteMethodCallJson)
  })
}
