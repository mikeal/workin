# workin

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
main(asycn event => {
  request.log('debugging!')
  throw new Error('Big error!')
})
```

The worker should produce an HTML response that captures the logs and exception information.
