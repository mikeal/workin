'use strict'
/* globals whandler */
const assert = require('assert')
const tsame = require('tsame')
const { it } = require('mocha')
const main = require('../')

const test = it

const same = (x, y) => assert.ok(tsame(x, y))

const req = path => ({ method: 'GET', url: `http://localhost${path}` })

test('basic ', async () => {
  main(request => {
    return 'pass'
  })
  same(await whandler(req()), 'pass')
})
