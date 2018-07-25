import { fillSegments, mapValues } from './utils'

export default function ApiService (client, endpoints, mocks) {
  const defaultHandler = (endpoint, key) => {
    const { method, url, options } = endpoint
    return (args) => {
      const { data, params, segments, headers } = args || {}
      const urlFilled = fillSegments(url, segments)
      const result = client({
        method,
        url: urlFilled,
        params,
        data,
        headers,
        _endpointKey: key,
        ...options
      })
      if (endpoint.processResponse) return result.then(endpoint.processResponse)
      return result
    }
  }

  const apiMethods = mapValues(endpoints, (endpoint, key) => {
    if (endpoint.handler) return endpoint.handler(endpoint, key, client)
    return defaultHandler(endpoint, key)
  })

  return Object.freeze({
    ...apiMethods,
    ...mocks
  })
}
