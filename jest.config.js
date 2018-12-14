const path = require('path')
module.exports =  {
    globalTeardown: path.join(__dirname, 'testHelpers', 'globalTeardown')
}