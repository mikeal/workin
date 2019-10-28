'use strict'
const assert = require('assert')
const tsame = require('tsame')
const { it } = require('mocha')
const main = require('../')
const bytes = require('bytesish')

const test = it

const same = (x, y) => assert.ok(tsame(x, y))

const request = path => ({ method: 'GET', url: `http://localhost${path || '/'}` })
const req = path => ({ request: request(path) })

test('basic request/response', async () => {
  const whandler = main(request => {
    return 'pass'
  })
  same(await whandler(req()), 'pass')
})

test('basic error', async () => {
  const whandler = main(request => {
    request.log('test1')
    throw new Error('test2')
  })
  const resp = await whandler(req())
  const body = await main.reader(resp.body)
  const msg = 'Error: test2\nLogs:\n2019-08-10 00:02:58\ntest1'
  const str = bytes.toString(body)
  same(str.slice(0, 19), msg.slice(0, 19))
  same(str.slice(38), msg.slice(38))
})
