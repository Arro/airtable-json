import { jest } from "@jest/globals"
import nock from "nock"
import airtableJson from "#src/airtable-json.js"
import filter_fixture from "#test/_fixtures/filter.js"
import { auth_key, base_name } from "#test/_fixtures/config.js"

jest.useRealTimers()

test("basic usage of filter", async () => {
  nock("https://api.airtable.com:443", { encodedQueryParams: true })
    .get(`/v0/${base_name}/Videos`)
    .query({ filterByFormula: "Status%3D%27Idea%27" })
    .reply(200, filter_fixture.resp, filter_fixture.headers)

  const videos = await airtableJson({
    auth_key,
    base_name,
    primary: "Videos",
    filter: "Status='Idea'"
  })
  expect(videos).toStrictEqual(filter_fixture.json_resp)
})
