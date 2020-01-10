import airtable from 'airtable'
import keyBy from 'lodash/fp/keyBy'

async function handlePopulate({ base, things, local, other }) {
  const foreign_ids =  things.reduce((acc, thing) => {
    if (thing[local]) {
      return acc.concat(thing[local])
    }
    return acc
  }, [])

  const comparisons = foreign_ids.map((id) => `RECORD_ID() = '${id}'`)
  const filterByFormula = `OR(${comparisons.join(', ')})`

  let results  = await base(other).select({ filterByFormula }).all()

  results = results.map((results) => {
    return {
      ...results._rawJson.fields,
      __id: results.id
    }
  })
  results = keyBy('__id', results)

  const new_things = things.map((thing) => {
    if (thing[local]) {
      return {
        ...thing,
        [local]: thing[local].map((id) => results[id])
      }
    }
    return thing
  })

  return new_things
}


const airtableJson = async({ auth_key, base_name, primary, view, populate=[], filter }) => {

  airtable.configure({ apiKey: auth_key })
  const base = airtable.base(base_name)

  let select_object = { view }
  if (filter) {
    select_object.filterByFormula = filter
  }

  let things = await base(primary).select(select_object).all()
  things = things.map((thing) => {
    return {
      ...thing._rawJson.fields,
      __id: thing.id
    }
  })

  for (const { local, other } of populate) {
    things = await handlePopulate({ local, other, base, things })
  }

  return things
}

export default airtableJson
