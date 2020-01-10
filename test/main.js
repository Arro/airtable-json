import test from 'ava'
import nock from 'nock'

import airtableJson from '../src/airtable-json'
import headers from './fixtures/headers'
import songs_response from './fixtures/songs'

import { auth_key, base_name } from './fixtures/config'

test.beforeEach(async(t) => {
  nock('https://api.airtable.com:443', { encodedQueryParams: true })
    .get(`/v0/${base_name}/Songs`)
    .query({ view: "Main" })
    .reply(200, songs_response, headers)

  t.context.songs = await airtableJson({
    auth_key,
    base_name,
    primary: 'Songs',
    view: 'Main'
  })
})

test("responds with a body", (t) => {
  t.truthy(t.context.songs.length)
})

test("doesn't have a records section", (t) => {
  t.falsy(t.context.songs.records)
})

test("id of records is set to __id", (t) => {
  t.is(songs_response.records[0].id, t.context.songs[0].__id)
  t.is(songs_response.records[1].id, t.context.songs[1].__id)
  t.is(songs_response.records[2].id, t.context.songs[2].__id)
})

test("fields correctly map", (t) => {
  t.is(songs_response.records[0].fields.Title, t.context.songs[0].Title)
  t.is(songs_response.records[1].fields.Title, t.context.songs[1].Title)
  t.is(songs_response.records[2].fields.Title, t.context.songs[2].Title)
})

test("no createdTime", (t) => {
  t.falsy(t.context.songs[0].createdTime)
  t.falsy(t.context.songs[1].createdTime)
  t.falsy(t.context.songs[2].createdTime)
})


