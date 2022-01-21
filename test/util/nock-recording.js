import dotenv from "dotenv"
import nock from "nock"

import airtableJson from "#src/airtable-json.js"

//import videos_fixture from "#test/fixtures/videos.js"
//import topics_fixture from "#test/fixtures/topics-from-populate.js"

dotenv.config()

const auth_key = process.env.airtable_key
const base_name = process.env.airtable_base

nock.recorder.rec()

const abc = await airtableJson({
  auth_key,
  base_name,
  primary: "Videos",
  filter: "Status='Idea'"
})

console.log(abc)
nock.restore()
//console.log(JSON.stringify(videos_resp, null, 2))
