import { RemoteMethodCall, Result } from 'coderitter-api-remote-method-call'
import { fromJsonObj, toJsonObj } from 'mega-nice-json'

export default class PostOnlyHttpClient {

  apiUrl: string
  instantiator: {[ className: string]: () => any }

  constructor(apiUrl: string, instantiator: {[ className: string]: () => any }) {
    this.apiUrl = apiUrl
    this.instantiator = instantiator
  }

  async request<T extends Result>(remoteMethodCall: RemoteMethodCall|any): Promise<T> {
    let request = new XMLHttpRequest()

    return new Promise<T>((resolve, reject) => {
      // onreadystatechange yields higher browser support and is the same as onload
      // with readyState == 4
      request.onreadystatechange = () => {

        // Only run if the request is complete
        if (request.readyState !== 4) return

        if (request.status == 200 && request.status < 300) {
          let resultJson = request.response

          try {
            var resultObj = JSON.parse(resultJson)
          }
          catch (e) {
            reject(e)
          }

          let result: T = fromJsonObj(resultObj, this.instantiator)
          resolve(result)
        }
        else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }

      let remoteMethodCallObj = toJsonObj(remoteMethodCall)
      let json = JSON.stringify(remoteMethodCallObj)
      request.open('POST', this.apiUrl, true)
      request.send(json)
    })
  }
}