path = require 'path'
_ = require 'underscore'

module.exports = _.extend  _.clone(require '../../webpack/base-config.coffee'), {
  entry:
    'knockback-core-lodash.tests': require('../../files').tests_core
}

module.exports.resolve.alias =
  underscore: require.resolve('lodash')
  knockback: path.resolve('./knockback-core.js')
