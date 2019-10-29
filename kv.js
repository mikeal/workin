'use strict'
const bytes = require('bytesish')

class Database {
  constructor () {
    this.db = {}
  }

  async get (key, type = 'text') {
    const val = await this.db[key]
    if (type === 'text') {
      return bytes.toString(val)
    } else if (type === 'arrayBuffer') {
      return bytes.arrayBuffer(val)
    } else if (type === 'json') {
      return JSON.parse(bytes.toString(val))
    } else {
      throw new Error('Unsupported KV store type')
    }
  }

  async put (key, value) {
    this.db[key] = await bytes(value)
  }
}

module.exports = name => {
  window[name] = new Database()
  return window[name]
}
