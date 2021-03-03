import test from "ava"
import nock from "nock"

import airtableJson from "../src/airtable-json"
import headers from "./fixtures/headers"
import songs_response from "./fixtures/songs"
import artists_response from "./fixtures/artists"
import remixers_response from "./fixtures/remixers"

import { auth_key, base_name } from "./fixtures/config"

test.beforeEach(async (t) => {
  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Songs`)
    .query({ view: "Main View" })
    .reply(200, songs_response, headers)

  const a_ids = [
    "reca9IDlX0gvu32ml",
    "recgh3XeMcdmX8uPj",
    "reczBZBWZG06DOsCO",
    "recXvnMcZKmxyBtUi"
  ]
  const a_compares = a_ids.map((id) => `RECORD_ID()+%3D+%27${id}%27`)
  const a_formula = `OR(${a_compares.join("%2C+")})`

  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Artists`)
    .query({ filterByFormula: a_formula })
    .reply(200, artists_response, headers)

  const r_ids = ["recCe40NX0vOrQ1iK"]
  const r_compares = r_ids.map((id) => `RECORD_ID()+%3D+%27${id}%27`)
  const r_formula = `OR(${r_compares.join("%2C+")})`

  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Artists`)
    .query({ filterByFormula: r_formula })
    .reply(200, remixers_response, headers)

  t.context.songs = await airtableJson({
    auth_key,
    base_name,
    primary: "Songs",
    view: "Main View",
    populate: [
      {
        local: "Artists",
        other: "Artists"
      },
      {
        local: "Remixers",
        other: "Artists"
      }
    ]
  })
})

test("correctly joins tables for first populate", async (t) => {
  t.is(
    artists_response.records[0].fields.Name,
    t.context.songs[2].Artists[0].Name
  )
  t.is(
    artists_response.records[1].fields.Name,
    t.context.songs[1].Artists[0].Name
  )
  t.is(
    artists_response.records[2].fields.Name,
    t.context.songs[0].Artists[0].Name
  )
  t.is(
    artists_response.records[3].fields.Name,
    t.context.songs[2].Artists[1].Name
  )
})

test("correctly joins tables for second populate", async (t) => {
  t.is(
    remixers_response.records[0].fields.Name,
    t.context.songs[0].Remixers[0].Name
  )
})
