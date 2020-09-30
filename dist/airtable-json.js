"use strict";

require("core-js/modules/es.promise");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _airtable = _interopRequireDefault(require("airtable"));

var _keyBy = _interopRequireDefault(require("lodash/fp/keyBy"));

var _chunk = _interopRequireDefault(require("lodash/fp/chunk"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const max_ids_per_query = 40;

async function handlePopulate({
  base,
  things,
  local,
  other
}) {
  const foreign_ids = things.reduce((acc, thing) => {
    if (thing[local]) {
      return acc.concat(thing[local]);
    }

    return acc;
  }, []);
  const comparisons = foreign_ids.map(id => `RECORD_ID() = '${id}'`);
  const chunked_comparisons = (0, _chunk.default)(max_ids_per_query, comparisons);
  let all_results = [];

  for (const c of chunked_comparisons) {
    const filterByFormula = `OR(${c.join(', ')})`;
    let results = await base(other).select({
      filterByFormula
    }).all();
    results = results.map(results => {
      return { ...results._rawJson.fields,
        __id: results.id
      };
    });
    all_results = all_results.concat(results);
  }

  all_results = (0, _keyBy.default)('__id', all_results);
  const new_things = things.map(thing => {
    if (thing[local]) {
      return { ...thing,
        [local]: thing[local].map(id => all_results[id])
      };
    }

    return thing;
  });
  return new_things;
}

const airtableJson = async ({
  auth_key,
  base_name,
  primary,
  view,
  populate = [],
  filter
}) => {
  _airtable.default.configure({
    apiKey: auth_key
  });

  const base = _airtable.default.base(base_name);

  let select_object = {
    view
  };

  if (filter) {
    select_object.filterByFormula = filter;
  }

  let things = await base(primary).select(select_object).all();
  things = things.map(thing => {
    return { ...thing._rawJson.fields,
      __id: thing.id
    };
  });

  for (const {
    local,
    other
  } of populate) {
    things = await handlePopulate({
      local,
      other,
      base,
      things
    });
  }

  return things;
};

var _default = airtableJson;
exports.default = _default;