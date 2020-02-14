export interface Message {
  id: string
  data: any
}

export default class PostOnlyHttpClient {

  apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async request(message: Message|any): Promise<any> {
    let request = new XMLHttpRequest()

    return new Promise<Message>((resolve, reject) => {
      // onreadystatechange yields higher browser support and is the same as onload
      // with readyState == 4
      request.onreadystatechange = () => {

        // Only run if the request is complete
        if (request.readyState !== 4) return

        if (request.status == 200 && request.status < 300) {
          let json = request.response

          try {
            var obj = JSON.parse(json)
          }
          catch (e) {
            reject(e)
          }

          resolve(obj)
        }
        else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }

      let json = JSON.stringify(message)
      request.open('POST', this.apiUrl, true)
      request.send(json)
    })
  }
}