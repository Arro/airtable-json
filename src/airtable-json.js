import airtable from "airtable"

import handlePopulate from "./populate.js"

const airtableJson = async ({
  auth_key,
  base_name,
  primary,
  view,
  populate = [],
  filter
}) => {
  airtable.configure({ apiKey: auth_key })
  const base = airtable.base(base_name)

  let select_object = {}
  if (view) select_object.view = view
  if (filter) select_object.filterByFormula = filter

  let things = []
  await base(primary)
    .select(select_object)
    .eachPage((records, fetchNextPage) => {
      records.forEach(function (record) {
        things.push({
          ...record._rawJson.fields,
          __id: record.id
        })
      })
      fetchNextPage()
    })

  for (const { local, other } of populate) {
    things = await handlePopulate({ auth_key, base_name, local, other, things })
  }

  return things
}

export default airtableJson
