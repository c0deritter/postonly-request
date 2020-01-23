import { RemoteMethodCall, Result } from 'coderitter-api'
import { fromJsonObj, Instantiator, toJsonObj } from 'mega-nice-json'

export default class PostOnlyHttpClient {

  apiUrl: string
  instantiator: Instantiator

  constructor(apiUrl: string, instantiator: Instantiator) {
    this.apiUrl = apiUrl
    this.instantiator = instantiator
  }

  async request<T>(methodName: string, parameter?: object): Promise<Result<T>> {
    let request = new XMLHttpRequest()

    return new Promise<Result<T>>((resolve, reject) => {
      // onreadystatechange yields higher browser support and is the same as onload
      // with readyState == 4
      request.onreadystatechange = () => {

        // Only run if the request is complete
        if (request.readyState !== 4) return

        if (request.status == 200 && request.status < 300) {
          let resultJson = request.response
          let resultObj = undefined

          try {
            resultObj = JSON.parse(resultJson)
          }
          catch (e) {
            reject('Could not parse JSON: ' + resultJson)
          }

          let result = fromJsonObj(resultObj, this.instantiator)
          resolve(result)
        }
        else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }

      let remoteMethodCall = new RemoteMethodCall(methodName, parameter)
      let remoteMethodCallObj = toJsonObj(remoteMethodCall)
      let json = JSON.stringify(remoteMethodCallObj)
      request.open('POST', this.apiUrl, true)
      request.send(json)
    })
  }
}