airtable-json
=============



```
import airtable from 'airtable'
import airtableJson from 'airtable-json'

airtable.configure({ apiKey: '<airtable-auth-key>' })
const my_base = airtable.base('<airtable-base>')

const getStuff = () => {
  let statuses
  return airtableJson({
    base: my_base,
    primary: '<table>',
    view: `Main`,
    populate: [{ 
      local:     `<local-field-name-of-other-table>`,
      other:     `<foreign-name-of-other-table>`,
    }]
  }).then((results) => {
    console.log(JSON.stringify(results, null, 4))
  })
})
```

