import Promise from 'bluebird'
import airtable from 'airtable'

const airtableJson = async({ auth_key, base_name, primary, view, populate=[], filter }) => {

  airtable.configure({ apiKey: auth_key })
  const base = airtable.base(base_name)

  let select_object = { view }
  if (filter) {
    select_object.filterByFormula = filter
  }

  const _things = await base(primary).select(select_object).all()
  const things = _things.map((_thing) => {
    return  _thing._rawJson
  })

  return Promise.all(things.map((thing) => {
    thing.fields.__id = thing.id

    populate.forEach(({ local, other }) => {
      thing.fields[local] = Promise.all(thing.fields[local].map((t) => {
        return base(other).find(t).then((o) => {
          let obj = o._rawJson.fields
          obj.__id = o._rawJson.id
          return obj
        })
      }))
    })
   
    return Promise.props(thing.fields)
  }))
}

export default airtableJson
