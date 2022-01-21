import { jest } from "@jest/globals"
import nock from "nock"
import airtableJson from "#src/airtable-json.js"
import videos_fixture from "#test/fixtures/videos.js"
import { auth_key, base_name } from "#test/fixtures/config.js"

jest.useRealTimers()

test("basic airtable-json pull", async () => {
  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Videos`)
    .query({ view: "Main" })
    .reply(200, videos_fixture.resp, videos_fixture.headers)

  const videos = await airtableJson({
    auth_key,
    base_name,
    primary: "Videos",
    view: "Main"
  })
  expect(videos).toMatchObject(videos_fixture.json_resp)
})
