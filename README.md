# workin

![6059](https://img.shields.io/badge/compiled%20bundle-6k-green) ![2445](https://img.shields.io/badge/gzipped%20bundle-2k-brightgreen)

Cloudflare worker toolkit

Usage:

```javascript
const workin = require('workin')
workin(async request => {
  return workin.json({ hello: 'world' })
})
```

Catches errors:

```javascript
main(asycn request => {
  request.log('debugging!')
  throw new Error('Big error!')
})
```

The worker should produce an HTML response that captures the logs and exception information.
