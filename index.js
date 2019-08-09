'use strict'
/* globals Response, addEventListener */
const bytes = require('bytesish')

const fromEntries = ee => {
  const oo = {}
  for (const [k, v] of ee) oo[k] = v
  return oo
}

const reader = async body => {
  const parts = []
  const _reader = body.getReader()
  while (true) {
    const { value, done } = await _reader.read()
    if (!done) parts.push(value)
    else break
  }
  return bytes.concat(parts)
}

const error = (e, logs) => {
  const msg = logs.map(log => {
    return new Date(log[0]) + '\n' + log[1].join('\n')
  }).join('\n')
  return Response(`Error: ${e.message}\n${msg}`, { status: 500 })
}
const main = (handler, ...methods) => {
  if (!methods.length) methods = ['GET', 'HEAD']
  methods = methods.map(m => m.toUpperCase())
  const handleRequest = async request => {
    if (!methods.includes(request.method)) {
      return new Response('Invalid method', { status: 415 })
    }
    const logs = []
    request.urlParse = new URL(request.url)
    request.urlParams = fromEntries(request.urlParse.searchParams.entries())
    request.readBody = () => reader(request.body)
    request.log = (...args) => {
      logs.push([Date.now(), args])
      // eslint-disable-next-line no-console
      console.log(...args)
    }
    let ret
    try {
      ret = await handler(request)
    } catch (e) {
      return error(e, logs)
    }
    return ret
  }
  addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
  })
}
const jsonHeaders = { 'Content-Type': 'application/json' }
main.json = o => Response(JSON.stringify(o), { status: 200, headers: jsonHeaders })
main.register = main

module.exports = main
