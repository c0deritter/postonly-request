export interface Message {
  id: string
  data: any
}

export default class PostOnlyHttpClient {

  apiUrl: string

  constructor(apiUrl: string) {
    this.apiUrl = apiUrl
  }

  async request(id: string, data?: object): Promise<Message> {
    let request = new XMLHttpRequest()

    return new Promise<Message>((resolve, reject) => {
      // onreadystatechange yields higher browser support and is the same as onload
      // with readyState == 4
      request.onreadystatechange = () => {

        // Only run if the request is complete
        if (request.readyState !== 4) return

        if (request.status == 200 && request.status < 300) {
          let json = request.response
          let obj: Message

          try {
            obj = JSON.parse(json)
          }
          catch (e) {
            reject('Could not parse JSON: ' + json)
          }

          if (message == undefined) {
            throw new Error('Invalid message. Message was undefined.')
          }

          if (typeof message.id !== 'string') {
            throw new Error('Invalid message. Message id is not of type \`string\'.')
          }
        
          resolve(message)
        }
        else {
          reject({
            status: request.status,
            statusText: request.statusText
          })
        }
      }

      let message: Message = {
        id: id,
        data: data
      }

      let json = JSON.stringify(message)
      request.open('POST', this.apiUrl, true)
      request.send(json)
    })
  }
}