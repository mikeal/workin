/* globals describe, it, jest */
'use strict'
let swEnv
let fetchMock
if (!process.browser) {
  swEnv = require('service-worker-mock')
  fetchMock = require('service-worker-mock/fetch')
}

const test = (message, handler) => {
  describe('workin test: ', () => {
    if (!process.browser) {
      Object.assign(global, swEnv(), fetchMock())
      jest.resetModules()
    }
    it(message, async () => {
      await handler(self)
    })
  })
}

module.exports = test
