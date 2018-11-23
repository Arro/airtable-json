'use strict';

var _bluebird = require('bluebird');

var _bluebird2 = _interopRequireDefault(_bluebird);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var airtableJson = function airtableJson(_ref) {
  var base = _ref.base,
      primary = _ref.primary,
      view = _ref.view,
      populate = _ref.populate;

  var things = void 0;
  return base(primary).select({ view: view }).all().then(function (_things) {
    things = _things.map(function (_thing) {
      return _thing._rawJson;
    });

    return _bluebird2.default.all(things.map(function (thing) {
      thing.fields.__id = thing.id;

      populate.forEach(function (_ref2) {
        var local = _ref2.local,
            other = _ref2.other;

        thing.fields[local] = base(other).find(thing.fields[local][0]).then(function (o) {
          return o._rawJson;
        });
      });

      return _bluebird2.default.props(thing.fields);
    }));
  });
};
