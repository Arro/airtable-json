import keyBy from "lodash.keyby"
import chunk from "lodash.chunk"
import airtableJson from "./airtable-json.js"

const max_ids_per_query = 40

export default async function ({ auth_key, base_name, local, other, things }) {
  let foreign_ids = things.reduce((acc, thing) => {
    if (thing[local]) {
      return acc.concat(thing[local])
    }
    return acc
  }, [])

  foreign_ids = [...new Set(foreign_ids)]

  const comparisons = foreign_ids.map((id) => `RECORD_ID() = '${id}'`)
  const chunked_comparisons = chunk(comparisons, max_ids_per_query)
  let all_results = []

  for (const c of chunked_comparisons) {
    const filterByFormula = `OR(${c.join(", ")})`
    let results = await airtableJson({
      auth_key,
      base_name,
      primary: other,
      filter: filterByFormula
    })
    all_results = all_results.concat(results)
  }

  all_results = keyBy(all_results, "__id")

  const new_things = things.map((thing) => {
    if (thing[local]) {
      return {
        ...thing,
        [local]: thing[local].map((id) => all_results[id])
      }
    }
    return thing
  })

  return new_things
}
