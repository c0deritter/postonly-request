# Coderitter API adopted POSTonly HTTP client for the browser

An adoption of the [postonly-request](https://github.com/c0deritter/postonly-request) package for the Coderitter API architecture. Also refer to the original [documentation](https://github.com/c0deritter/postonly-request#readme).

## Related packages

As the original package, this one also uses the remote-method-call package but in the [adjusted version](https://github.com/c0deritter/remote-method-call/tree/coderitter-api) for the Coderitter API.

This package uses [knight-json](https://github.com/c0deritter/knight-json) to convert JavaScript objects together with their class information into JSON string and back into instances of the intended class.

## Install

`npm install coderitter-api-postonly-request`

## Overview

The Coderitter API version of this package needs you to input a `RemoteMethodCall` compatible object. The result is a `Result` object. Both are provided through the package [coderitter-api-remote-method-call](https://github.com/c0deritter/remote-method-call/tree/coderitter-api).

To be able to use the result you need to create a subclass of class Result.

```typescript
class UserCreateResult extends Result {
    constructor(public createdUser: User) {
        super()
    }
}
```

Through the use of [knight-json](https://github.com/c0deritter/knight-json) the function expects a third parameter `instantiator` which is a mapping of class names to methods that instantiate the corresponding classes.

```typescript
let instantiator = {
    'User': () => new User
    'UserCreateResult': () => new UserCreateResult
}
```

Now you can make the request.

```typescript
import { request } from 'postonly-request'

// remote method call object
let remoteMethodCall: RemoteMethodCall = {
    methodName: 'User.create',
    parameter: user
}

let result: UserCreateResult = await request('https://company.com/api_v1', remoteMethodCall, instantiator)

// response is an instance of class UserCreateResult
result == {
    type: 'value',
    // createdUser is an instance of class User
    createdUser: {
        id: 1,
        name: 'Ruben'
    }
}
```
