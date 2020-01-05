import Promise from 'bluebird'


const airtableJson = ({ base, primary, view, populate=[], filter }) => {
  let things
  let select_object = { view }
  if (filter) {
    select_object.filterByFormula = filter
  }

  return base(primary).select(select_object).all().then((_things) => {
    things = _things.map((_thing) => {
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
  })
}

export default airtableJson
