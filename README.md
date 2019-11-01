# workin

![6446](https://img.shields.io/badge/compiled%20bundle-6k-green) ![2571](https://img.shields.io/badge/gzipped%20bundle-3k-brightgreen)

Cloudflare worker toolkit

Usage:

```javascript
const workin = require('workin')
workin(async event => {
  const request = event.request
  return workin.json({ hello: 'world' })
})
```

Catches errors:

```javascript
workin(async event => {
  request.log('debugging!')
  throw new Error('Big error!')
})
```

The worker should produce an HTML response that captures the logs and exception information.
