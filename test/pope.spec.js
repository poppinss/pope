'use strict'

/*
* pope
*
* (c) Harminder Virk <virk@adonisjs.com>
*
* For the full copyright and license information, please view the LICENSE
* file that was distributed with this source code.
*/

const test = require('japa')
const pope = require('..')
const prop = pope.prop

test.group('pope', function () {
  test('should fetch properties from a given object', (assert) => {
    const name = prop({name: 'virk'}, 'name')
    assert.equal(name, 'virk')
  })

  test('should fetch nested properties from a given object', (assert) => {
    const name = prop({profile: {name: 'virk'}}, 'profile.name')
    assert.equal(name, 'virk')
  })

  test('should fetch nested properties from a given object using array index', (assert) => {
    const name = prop({users: ['virk', 'nikk']}, 'users.1')
    assert.equal(name, 'nikk')
  })

  test('should parse a template and replace mustache like placeholders', (assert) => {
    const template = pope('Hello {{name}}', {name: 'virk'})
    assert.equal(template, 'Hello virk')
  })

  test('should parse a template and replace multiple mustache like placeholders', (assert) => {
    const template = pope('Hello {{name}}, your age seems to be {{age}}', {name: 'virk', age: 22})
    assert.equal(template, 'Hello virk, your age seems to be 22')
  })

  test('should parse a template and ignore whitespaces inside placeholders', (assert) => {
    const template = pope('Hello {{ name }}', {name: 'virk'})
    assert.equal(template, 'Hello virk')
  })

  test('should skip placeholders when values are missing', (assert) => {
    const template = pope('Hello {{ name }}')
    assert.equal(template, 'Hello ')
  })

  test('should replace array values at root level', (assert) => {
    const template = pope('Hello {{ 0 }}', ['virk'])
    assert.equal(template.trim(), 'Hello virk')
  })

  test('should not replace array keys', (assert) => {
    const template = pope('Function {{splice}}', [])
    assert.equal(template.trim(), 'Function')
  })

  test('should work fine when there is nothing to replace', (assert) => {
    const template = pope('Hello world')
    assert.equal(template.trim(), 'Hello world')
  })

  test('work fine when has special chars in placeholders', (assert) => {
    assert.equal(pope('Hello {{ user_name }}', { user_name: 'virk' }).trim(), 'Hello virk')
    assert.equal(pope('Hello {{ $user_name }}', { '$user_name': 'virk' }).trim(), 'Hello virk')
  })

  test('skip undefined', (assert) => {
    const output = pope('Hello {{ user_name }}', {}, { skipUndefined: true }).trim()
    assert.equal(output, 'Hello {{ user_name }}')
  })

  test('throw exception on undefined', (assert) => {
    assert.plan(3)
    try {
      pope('Hello {{ user_name }}', {}, { throwOnUndefined: true })
    } catch (error) {
      assert.equal(error.message, 'Missing value for {{ user_name }}')
      assert.equal(error.code, 'E_MISSING_KEY')
      assert.equal(error.key, 'user_name')
    }
  })

  test('give priority to throwOnUndefined over skipUndefined', (assert) => {
    assert.plan(3)
    try {
      pope('Hello {{ user_name }}', {}, { throwOnUndefined: true, skipUndefined: true })
    } catch (error) {
      assert.equal(error.message, 'Missing value for {{ user_name }}')
      assert.equal(error.code, 'E_MISSING_KEY')
      assert.equal(error.key, 'user_name')
    }
  })

  test('work fine with nested values', (assert) => {
    assert.equal(pope('Hello {{ user.username }}', { user: { username: 'virk' } }), 'Hello virk')
  })

  test('should replace a value whose value is zero', (assert) => {
    const template = pope('Zero value {{index}}', {index: 0})
    assert.equal(template, 'Zero value 0')
  })
})
