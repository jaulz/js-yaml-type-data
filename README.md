# js-yaml-type-data

Use it like this:

```js
import createDataType from 'js-yaml-type-data'

const type = createDataType({
  relativeTo: './path', // is optional and defaults to the current directory
})
const schema = new yaml.Schema({
  include: [yaml.DEFAULT_SAFE_SCHEMA],
  explicit: [type],
})
const parsed = yaml.load(`
includedPNG: !!data "file.png"
`, { schema })
```
