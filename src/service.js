import { fillSegments, mapValues } from './utils'

export default function ApiService (client, endpoints, mocks) {

  const defaultHandler = (endpoint, key) => {
    const { method, url } = endpoint
    return (args) => {
      const { data, params, segments } = args || {}
      const urlFilled = fillSegments(url, segments)
      return client({
        method,
        url: urlFilled,
        params,
        data,
        _endpointKey: key
      })
    }
  }

  const apiMethods = mapValues(endpoints, (endpoint, key) => {
    if (endpoint.handler) return endpoint.handler
    return defaultHandler(endpoint, key)
  })

  return Object.freeze({
    ...apiMethods,
    ...mocks
  })
}
