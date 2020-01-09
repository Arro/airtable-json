import test from 'ava'
import nock from 'nock'

import airtableJson from '../src/airtable-json'
import { colors_response, colors_headers } from './fixtures/colors.js'
import { auth_key, base_name } from './fixtures/config.js'

test.beforeEach(async(t) => {
  nock('https://api.airtable.com:443', { encodedQueryParams: true })
    .get(`/v0/${base_name}/Colors`)
    .query({ view: "Main" })
    .reply(200, colors_response, colors_headers)

  t.context.colors = await airtableJson({
    auth_key,
    base_name,
    primary: 'Colors',
    view: 'Main',
    populate: []
  })
})

test("responds with a body", (t) => {
  t.truthy(t.context.colors.length)
})

test("doesn't have a records section", (t) => {
  t.falsy(t.context.colors.records)
})

test("id of records is set to __id", (t) => {
  t.is(colors_response.records[0].id, t.context.colors[0].__id)
  t.is(colors_response.records[1].id, t.context.colors[1].__id)
  t.is(colors_response.records[2].id, t.context.colors[2].__id)
})

test("fields correctly map", (t) => {
  t.is(colors_response.records[0].fields.Name, t.context.colors[0].Name)
  t.is(colors_response.records[1].fields.Name, t.context.colors[1].Name)
  t.is(colors_response.records[2].fields.Name, t.context.colors[2].Name)
})

test("no createdTime", (t) => {
  t.falsy(t.context.colors[0].createdTime)
  t.falsy(t.context.colors[1].createdTime)
  t.falsy(t.context.colors[2].createdTime)
})
