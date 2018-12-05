'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var airtableJson = function airtableJson(_ref) {
  var base = _ref.base,
      primary = _ref.primary,
      view = _ref.view,
      _ref$populate = _ref.populate,
      populate = _ref$populate === undefined ? [] : _ref$populate,
      filter = _ref.filter;

  var things = void 0;
  var select_object = { view: view };
  if (filter) {
    select_object.filterByFormula = filter;
  }

  return base(primary).select(select_object).all().then(function (_things) {
    things = _things.map(function (_thing) {
      return _thing._rawJson;
    });

    return _bluebird2.default.all(things.map(function (thing) {
      thing.fields.__id = thing.id;

      populate.forEach(function (_ref2) {
        var local = _ref2.local,
            other = _ref2.other;

        thing.fields[local] = _bluebird2.default.all(thing.fields[local].map(function (t) {
          return base(other).find(t).then(function (o) {
            var obj = o._rawJson.fields;
            obj.__id = o._rawJson.id;
            return obj;
          });
        }));
      });

      return _bluebird2.default.props(thing.fields);
    }));
  });
};

exports.default = airtableJson;
