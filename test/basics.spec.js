'use strict'
const assert = require('assert')
const tsame = require('tsame')
const { it } = require('mocha')
const main = require('../')

const test = it

const same = (x, y) => assert.ok(tsame(x, y))

test('basic ', async () => {

})
