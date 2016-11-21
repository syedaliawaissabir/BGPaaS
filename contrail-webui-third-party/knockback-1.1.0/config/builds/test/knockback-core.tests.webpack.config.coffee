path = require 'path'
_ = require 'underscore'

module.exports = _.extend  _.clone(require '../../webpack/base-config.coffee'), {
  entry:
    'knockback-core.tests': require('../../files').tests_core
}

module.exports.resolve.alias =
  knockback: path.resolve('./knockback-core.js')
