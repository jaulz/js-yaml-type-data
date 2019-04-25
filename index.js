const fs = require('fs')
const path = require('path')
const yaml = require('js-yaml')
const createDataURI = require('datauri').sync

module.exports = function createType({ relativeTo = process.cwd() } = {}) {
  return new yaml.Type('tag:yaml.org,2002:data', {
    kind: 'scalar',
    resolve: dataPath => {
      try {
        createDataURI(path.resolve(relativeTo, dataPath))
        return true 
      } catch (error) {
        return false
      }
    },
    construct: dataPath => {
      return createDataURI(path.resolve(relativeTo, dataPath))
    },
  })
}
