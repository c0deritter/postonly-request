export async function request(url: string, payload: any): Promise<any> {
  let request = new XMLHttpRequest()

  return new Promise<any>((resolve, reject) => {
    // onreadystatechange yields higher browser support and is the same as onload
    // with readyState == 4
    request.onreadystatechange = () => {

      // Only run if the request is complete
      if (request.readyState !== 4) return

      if (request.status == 200 && request.status < 300) {
        let response = request.response

        try {
          response = JSON.parse(response)
        }
        catch (e) {}

        resolve(response)
      }
      else {
        reject({
          status: request.status,
          statusText: request.statusText
        })
      }
    }

    try {
      payload = JSON.stringify(payload)
    }
    catch (e) { }

    request.open('POST', url, true)
    request.send(payload)
  })
}
