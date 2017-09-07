# Pope

![](https://img.shields.io/travis/poppinss/pope.svg)
[![Coverage Status](https://coveralls.io/repos/poppinss/pope/badge.svg?branch=master&service=github)](https://coveralls.io/github/poppinss/pope?branch=master)

Pope is a fast, minimal and micro template engine for strings only, it plays well where you want to embed micro templates inside your module.

## Examples

### string interpolation
```javascript
const pope = require('pope')
pope('There are {{count}} emails in your inbox', {count:20})
```

### nested values

```javascript
const pope = require('pope')
pope('My name is {{profile.name}} and age is {{profile.age}}', {profile: {name:'virk', age: 26}})
```

### arrays only

```javascript
const pope = require('pope')
pope('There are {{0}} emails in your inbox', [20])
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



## The MIT License

Copyright (c) 2015 Harminder Virk

Permission is hereby granted, free of charge, to any person obtaining a
copy of this software and associated documentation files (the "Software"),
to deal in the Software without restriction, including without limitation
the rights to use, copy, modify, merge, publish, distribute, sublicense,
and/or sell copies of the Software, and to permit persons to whom the
Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
DEALINGS IN THE SOFTWARE.
