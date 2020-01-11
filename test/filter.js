import test from 'ava'
import nock from 'nock'

import airtableJson from '../src/airtable-json'
import headers from './fixtures/headers'
import songs_response from './fixtures/songs'

import { auth_key, base_name } from './fixtures/config'


test("test filter", async(t) => {
  const filtered_songs = {
    records: [
      songs_response.records[0]
    ]
  }

  nock('https://api.airtable.com:443', { encodedQueryParams: true })
    .get(`/v0/${base_name}/Songs`)
    .query({
      view: "Main",
      filterByFormula: "Length%3D%273%3A22%27"
    })
    .reply(200, filtered_songs, headers)

  t.context.songs = await airtableJson({
    auth_key,
    base_name,
    primary: 'Songs',
    view: 'Main',
    filter: "Length='3:22'",
  })

  t.is(filtered_songs.records[0].id, t.context.songs[0].__id)
  t.is(t.context.songs[0].Length, "3:22")
})
