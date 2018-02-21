# vue-api-service

[![npm](https://img.shields.io/npm/v/vue-api-service.svg) ![npm](https://img.shields.io/npm/dm/vue-api-service.svg)](https://www.npmjs.com/package/vue-api-service)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

A convinient endpoints and mocks configs based on [axios](https://github.com/axios/axios) lib.

## Table of contents

- [Installation](#installation)
- [Usage](#usage)

# Installation

```
npm install --save vue-api-service
```

## Default import

Install all the components:

```javascript
import client from 'axios'
import Vue from 'vue'
import VueApiService from 'vue-api-service'

const endpoints = {
  userData: {
    method: 'GET',
    url: '/api/user'
  },
  updateUser: {
    method: 'PUT',
    url: '/api/user/:id/'
  }
}

Vue.use(VueApiService, {
  client,
  endpoints
})
```

## Browser

```html
<script src="vue.js"></script>
<script src="vue-api-service/dist/vue-api-service.browser.js"></script>
```

# Usage
Let's say you've got an endpoints config like this:

```javascript
const endpoints = {

  userData: {
    method: 'GET',
    url: '/api/user'
  },

  addComment: {
    method: 'PUT',
    url: '/api/posts/:postId/comment'
  }
}
```

Call an API endpoint in the app like this:

```javascript
this.$api.addComment({
  data: { key: 'value' }, // goes to the request body
  segments: { postId: 1 }, // replaces ':postId' in the endpoint url config with value
  params: { type: 'review' } // goes to url params: ?type=review
})
  .then(response => {
    console.log(response.data)
  })
```

or like this:

```javascript
import Vue from 'vue'
Vue.$api.userData()
  .then(response => {
    console.log(response.data)
  })
  .catch(error => {
    console.warn(error)
  })
```

## Mocks
Sometimes you need to simulate the response without calling a real API. Simple enough: just provide the mocks object to the service's options.

```javascript

const mocks = {
  endpointName: (request) => {} //
}

Vue.use(VueApiService, {
  client,
  endpoints,
  mocks
})
```

Each key of this mocks object covers the corresponding endpoint key.
A mock item should be a function that returns a Promise (as axios methods do):

```javascript

const mocks = {

  // simple sample
  userData: (request) => {
    return Promise.resolve({ data: null })
  },

  // advanced usage
  signIn: (request) => {
    if (request.data.user === 'admin') {
      return Promise.resolve({
        data: {
          id: 1
        }
      })
    }
    return Promise.reject(new Error({
      data: {
        message: 'not admin'
      }
    }))
  }
}
```


# Plugin Development

## Installation

The first time you create or clone your plugin, you need to install the default dependencies:

```
npm install
```

## Watch and compile

This will run webpack in watching mode and output the compiled files in the `dist` folder.

```
npm run dev
```

---

## License

[MIT](http://opensource.org/licenses/MIT)
