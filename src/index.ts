import fs from 'fs'
import path from 'path'
import yaml from 'js-yaml'
import { sync as createDataURI } from 'datauri'

export interface Options {
  name?: string,
  relativeTo?: string
}

export default function createType({ name = 'tag:yaml.org,2002:data', relativeTo = process.cwd() }:Options = {}) {
  return new yaml.Type(name, {
    kind: 'scalar',
    resolve: (dataPath:string) => {
      try {
        createDataURI(path.resolve(relativeTo, dataPath))
        return true 
      } catch (error) {
        return false
      }
    },
    construct: (dataPath:string) => {
      return createDataURI(path.resolve(relativeTo, dataPath))
    },
  })
}
