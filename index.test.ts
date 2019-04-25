import fs from 'fs'
import yaml from 'js-yaml'
import createType from './index'

test('includes content of existing file', () => {
  const type = createType()
  const schema = new yaml.Schema({
    include: [yaml.DEFAULT_SAFE_SCHEMA],
    explicit: [type],
  })
  const content = yaml.load(
    `
includedPNG: !!data "fixtures/data.png"
includedSVG: !!data "fixtures/data.svg"
  `,
    { schema }
  )

  expect(content).not.toBeNull()
  expect(content.includedPNG).toContain('data:image/png;base64')
  expect(content.includedSVG).toContain('data:image/svg+xml;base64')
  expect(content).toMatchSnapshot('load')
  expect(yaml.dump(content)).toMatchSnapshot('dump')
})

test('includes content of existing file with custom path', () => {
  const type = createType({ relativeTo: './fixtures' })
  const schema = new yaml.Schema({
    include: [yaml.DEFAULT_SAFE_SCHEMA],
    explicit: [type],
  })
  const content = yaml.load(
    `
includedPNG: !!data "data.png"
includedSVG: !!data "data.svg"
  `,
    { schema }
  )

  expect(content).not.toBeNull()
  expect(content.includedPNG).toContain('data:image/png;base64')
  expect(content.includedSVG).toContain('data:image/svg+xml;base64')
  expect(content).toMatchSnapshot('load')
  expect(yaml.dump(content)).toMatchSnapshot('dump')
})

test('throw error for non-existing file', () => {
  const type = createType()
  const schema = new yaml.Schema({
    include: [yaml.DEFAULT_SAFE_SCHEMA],
    explicit: [type],
  })

  expect(() => {
    yaml.load(
      `
includedPNG: !!data "fixtures/nonExistant.png"
includedSVG: !!data "fixtures/nonExistant.svg"
  `,
      { schema }
    )
  }).toThrowErrorMatchingSnapshot()
})
