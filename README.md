# Coderitter API adopted POSTonly HTTP client for the browser

An adoption of the [postonly-request](https://github.com/c0deritter/postonly-request) package for the Coderitter API architecture. Also refer to the original [documentation](https://github.com/c0deritter/postonly-request#readme).

## Install

`npm install coderitter-api-postonly-request`

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