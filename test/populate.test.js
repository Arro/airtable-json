import { jest } from "@jest/globals"
import nock from "nock"
import airtableJson from "#src/airtable-json.js"
import videos_fixture from "#test/fixtures/videos.js"
import topics_fixture from "#test/fixtures/topics-from-populate.js"
import populate_correct from "#test/fixtures/populate-correct-object.js"
import { auth_key, base_name } from "#test/fixtures/config.js"

jest.useRealTimers()

test("basic usage of populate", async () => {
  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Videos`)
    .query({ view: "Main" })
    .reply(200, videos_fixture.resp, videos_fixture.headers)

  let record_ids = [
    "recRX8ZBZ7i9pS1Kx",
    "recMmlCVKO4uWKEIc",
    "recK4izMl1yAh7Ewd"
  ]
  let topic_filter = record_ids.map((r) => `RECORD_ID() = '${r}'`).join(", ")
  topic_filter = `OR(${topic_filter})`
  topic_filter = encodeURIComponent(topic_filter)
  topic_filter = topic_filter
    .replaceAll("(", "%28")
    .replaceAll(")", "%29")
    .replaceAll("'", "%27")

  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Topics`)
    .query({
      filterByFormula: topic_filter
    })
    .reply(200, topics_fixture.resp, topics_fixture.headers)

  const videos = await airtableJson({
    auth_key,
    base_name,
    primary: "Videos",
    view: "Main",
    populate: [
      {
        local: "Topics",
        other: "Topics"
      }
    ]
  })

  expect(videos).toMatchObject(populate_correct)
})

test("nonexistent local passed into populate", async () => {
  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Videos`)
    .query({ view: "Main" })
    .reply(200, videos_fixture.resp, videos_fixture.headers)

  const videos = await airtableJson({
    auth_key,
    base_name,
    primary: "Videos",
    view: "Main",
    populate: [
      {
        local: "Non-Topics",
        other: "Topics"
      }
    ]
  })
  expect(videos).toMatchObject(videos_fixture.json_resp)
})
