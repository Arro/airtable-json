airtable-json
=============

Motivation
----------

When you want Airtable records to be in a raw json format, and that's all you care about.



Usage
-----
```
import airtableJson from 'airtable-json'

const getStuff = () => {
  let statuses
  return airtableJson({
    auth_key: '<airtable-auth-key>',
    base_name: '<airtable-base>',
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

