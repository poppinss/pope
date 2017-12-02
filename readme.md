# Pope

![](https://img.shields.io/travis/poppinss/pope.svg)
[![Coverage Status](https://coveralls.io/repos/poppinss/pope/badge.svg?branch=master&service=github)](https://coveralls.io/github/poppinss/pope?branch=master)

Pope is a fast, minimal and micro template engine for strings only, it plays well where you want to embed micro templates inside your module.

## Examples

### string interpolation
```javascript
const pope = require('pope')
pope('There are {{count}} emails in your inbox', { count:20 })
```

### nested values

```javascript
const pope = require('pope')
pope('My name is {{profile.name}} and age is {{profile.age}}', { profile: { name:'virk', age: 26 } })
```

### arrays only

```javascript
const pope = require('pope')
pope('There are {{0}} emails in your inbox', [20])
```

### prop
Pulls the nested/flat values from an object. It is similar to `lodash.get` method.

```javascript
const pope = require('pope')
pope.prop({ count:20 }, 'count') // 20
pope.prop({profile: { name:'virk', age: 26 }}, 'profile.name') // virk
pope.prop([20], '0') // 20
pope.prop({profile: { validate: /^[A-Z][a-z]+/} }, 'profile.validate') //   /^[A-Z][a-z]+/
```

## Options

You can also pass an options object to define the interpolation behavior.

#### skipUndefined
Do not replace the undefined values with an empty string.

```javascript
const pope = require('pope')
pope('There are {{0}} emails in your inbox', {}, {
  skipUndefined: true
})
// returns - There are {{0}} emails in your inbox
```

#### throwOnUndefined
Throw exception when a undefined value is found. `throwOnUndefined` gets priority over `skipUndefined` if both are defined.

```javascript
const pope = require('pope')
pope('Hello {{ username }}', {}, {
  throwOnUndefined: true
})

// throws exception
```

```js
{
  message: 'Missing value for {{ username }}',
  key: 'username',
  code: 'E_MISSING_KEY',
  stack: '.....'
}
```
