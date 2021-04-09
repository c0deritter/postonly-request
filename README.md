# POSTonly HTTP client for the browser

A no dependency POSTonly HTTP client for the browser. Is is based on the XMLHttpRequest object.

POSTonly is a HTTP usage style. It uses the HTTP method POST only and any data is transferred in the body of the HTTP message.

This usage style was created to counter the usage of the many locations a HTTP message offers to put application data into. Especially REST styled APIs use the URL path, the URL parameters, the URL entity, the HTTP method, the HTTP headers and the message body.

## Related packages

The POSTonly HTTP usage style can be used to implement Remote Method APIs which are an alternative to REST. The package [remote-method-call](https://github.com/c0deritter/remote-method-call) offers a data format for describing remote method calls. The package [remote-method-api](https://github.com/c0deritter/remote-method-api) offers a simple yet powerful mapping from a remote method call to the execution of actual code on a server.

There is also a [branch](https://github.com/c0deritter/postonly-browser-client/tree/coderitter-api) which is optimized to be used in the Coderitter API architecture.

## Install

`npm install postonly-request`

## Overview

```typescript
import { request } from 'postonly-request'

let response = await request('https://company.com/api_v1', 'Hello world')
response == 'Greetings back'

// a JavaScript object will be automatically stringified to JSON
let response = await request('https://company.com/api_v1', { message: 'auth', email: 'a@b.c', password: '1234' })
// if the response was JSON it will automatically parsed and the JavaScript object will be returned
response == { authentication: 'success' }
```