# workin

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
