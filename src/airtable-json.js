import airtable from "airtable"

import handlePopulate from "./populate.js"

const airtableJson = async ({
  auth_key,
  base_name,
  primary,
  view,
  populate = [],
  sort,
  filter
}) => {
  if (!base_name) {
    throw "You need to pass in a base_name"
  }
  if (base_name?.length !== 17) {
    throw "base_name should be exactly 17 characters"
  }
  airtable.configure({ apiKey: auth_key })
  const base = airtable.base(base_name)

  let select_object = {}
  if (view) select_object.view = view
  if (filter) select_object.filterByFormula = filter
  if (sort) select_object.sort = sort

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

  for (const { local, other, flatten, as } of populate) {
    things = await handlePopulate({
      auth_key,
      base_name,
      local,
      other,
      things,
      flatten,
      as
    })
  }

  return things
}

export default airtableJson
