'use strict'
/* globals Response, addEventListener */
const bytes = require('bytesish')

const fromEntries = ee => {
  const oo = {}
  for (const [k, v] of ee) oo[k] = v
  return oo
}

const reader = async body => {
  if (body.test) return body.test
  const parts = []
  const _reader = body.getReader()
  while (true) {
    const { value, done } = await _reader.read()
    if (!done) parts.push(value)
    else break
  }
  return bytes.concat(parts)
}

const ts = y => `${y.slice(0, 10)} ${y.slice(11, 19)}`

const error = (e, logs) => {
  const msg = logs.map(log => {
    return ts((new Date(log[0])).toISOString()) + '\n' + log[1].join('\n')
  }).join('\n')
  return new Response(`Error: ${e.message}\nLogs:\n${msg}`, { status: 500 })
}
const main = (handler, ...methods) => {
  if (!methods.length) methods = ['GET', 'HEAD']
  methods = methods.map(m => m.toUpperCase())
  const handleRequest = async event => {
    const request = event.request
    if (!methods.includes(request.method)) {
      return new Response('Invalid method', { status: 415 })
    }
    const logs = []
    request.urlParse = new URL(request.url)
    request.urlParams = fromEntries(request.urlParse.searchParams.entries())
    request.readBody = () => reader(request.body)
    event.log = (...args) => {
      logs.push([Date.now(), args])
      // eslint-disable-next-line no-console
      console.log(...args)
    }
    let ret
    try {
      ret = await handler(event)
    } catch (e) {
      return error(e, logs)
    }
    return ret
  }
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event))
  })
  window.whandler = handleRequest
}
const jsonHeaders = { 'Content-Type': 'application/json' }
main.json = o => new Response(JSON.stringify(o), { status: 200, headers: jsonHeaders })
main.register = main
main.reader = reader

module.exports = main
