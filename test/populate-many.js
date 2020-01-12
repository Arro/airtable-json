import test from 'ava'
import nock from 'nock'

import airtableJson from '../src/airtable-json'
import headers from './fixtures/headers'
import chunk from 'lodash/fp/chunk'

import { auth_key, base_name } from './fixtures/config'

test("many widgets", async(t) => {

  const many_widgets = {
    records: Array(100).fill({}).map((widget, i) => {
      return {
        id: `rec_${i}`,
        fields: {
          Name: `Number ${i}`,
          Id: i
        },
        "createdTime": "2019-02-08T05:11:18.000Z"
      }
    })
  }

  nock('https://api.airtable.com:443', { encodedQueryParams: true })
    .get(`/v0/${base_name}/Widgets`)
    .query({ view: "Main" })
    .reply(200, many_widgets, headers)

  t.context.widgets = await airtableJson({
    auth_key,
    base_name,
    primary: 'Widgets',
    view: 'Main',
    populate: []
  })

  const records_transformed  = Array(100).fill({}).map((widget, i) => {
    return {
      __id: `rec_${i}`,
      Name: `Number ${i}`,
      Id: i
    }
  })

  t.deepEqual(records_transformed, t.context.widgets)
})


test("many widgets populate", async(t) => {
  const number_to_make = 100
  const many_widgets = {
    records: Array(number_to_make).fill({}).map((widget, i) => {
      return {
        id: `rec_${i}`,
        fields: {
          Name: `Widget number ${i}`,
          Id: i,
          Doodad: [`rec_${number_to_make + i}`]
        },
        "createdTime": "2019-02-08T05:11:18.000Z"
      }
    })
  }


  nock('https://api.airtable.com:443', { encodedQueryParams: true })
    .get(`/v0/${base_name}/Widgets`)
    .query({ view: "Main" })
    .reply(200, many_widgets, headers)

  const max_ids_per_query = 40

  const many_doodads = {
    records: Array(number_to_make).fill({}).map((widget, i) => {
      return {
        id: `rec_${number_to_make + i}`,
        fields: {
          Name: `Doodad number ${number_to_make + i}`,
          Id: number_to_make + i ,
        },
        "createdTime": "2019-02-08T05:11:18.000Z"
      }
    })
  }
  const w_compares = many_doodads.records.map((doodad) => `RECORD_ID()+%3D+%27${doodad.id}%27`)
  const chunked_w_compares = chunk(max_ids_per_query, w_compares)

  let j = 0
  for (const w of chunked_w_compares) {
    const the_correct_doodads = {
      records: many_doodads.records.slice(j * max_ids_per_query, (j + 1) * max_ids_per_query)
    }

    j += 1
    const w_formula = `OR(${w.join('%2C+')})`
    nock('https://api.airtable.com:443', { encodedQueryParams: true })
      .get(`/v0/${base_name}/Doodads`)
      .query({ filterByFormula: w_formula})
      .reply(200, the_correct_doodads, headers)
      

  }

  t.context.widgets = await airtableJson({
    auth_key,
    base_name,
    primary: 'Widgets',
    view: 'Main',
    populate: [{
      local: "Doodad",
      other: "Doodads",
    }]
  })

  const records_transformed  = Array(number_to_make).fill({}).map((widget, i) => {
    return {
      __id: `rec_${i}`,
      Name: `Widget number ${i}`,
      Id: i,
      Doodad: [{
        __id: `rec_${i + number_to_make}`,
        Name: `Doodad number ${number_to_make + i}`,
        Id: number_to_make + i ,
      }]
    }
  })

  t.deepEqual(records_transformed, t.context.widgets)
})



