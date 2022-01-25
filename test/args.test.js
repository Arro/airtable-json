import airtableJson from "#src/airtable-json.js"

test("don't provide base_name", async () => {
  let error_thrown = false
  let error_value
  try {
    await airtableJson({
      auth_key: "foo",
      primary: "Videos",
      view: "Main"
    })
  } catch (e) {
    error_thrown = true
    error_value = e
  }

  expect(error_thrown).toBe(true)
  expect(error_value).toBe("You need to pass in a base_name")
})

test("base_name not right length", async () => {
  let error_thrown = false
  let error_value
  try {
    await airtableJson({
      auth_key: "foo",
      base_name: "abc123",
      primary: "Videos",
      view: "Main"
    })
  } catch (e) {
    error_thrown = true
    error_value = e
  }

  expect(error_thrown).toBe(true)
  expect(error_value).toBe("base_name should be exactly 17 characters")
})
