"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _bluebird = _interopRequireDefault(require("bluebird"));

var _airtable = _interopRequireDefault(require("airtable"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var airtableJson =
/*#__PURE__*/
function () {
  var _ref2 = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function _callee(_ref) {
    var auth_key, base_name, primary, view, _ref$populate, populate, filter, base, select_object, _things, things;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth_key = _ref.auth_key, base_name = _ref.base_name, primary = _ref.primary, view = _ref.view, _ref$populate = _ref.populate, populate = _ref$populate === void 0 ? [] : _ref$populate, filter = _ref.filter;

            _airtable["default"].configure({
              apiKey: auth_key
            });

            base = _airtable["default"].base(base_name);
            select_object = {
              view: view
            };

            if (filter) {
              select_object.filterByFormula = filter;
            }

            _context.next = 7;
            return base(primary).select(select_object).all();

          case 7:
            _things = _context.sent;
            things = _things.map(function (_thing) {
              return _thing._rawJson;
            });
            return _context.abrupt("return", _bluebird["default"].all(things.map(function (thing) {
              thing.fields.__id = thing.id;
              populate.forEach(function (_ref3) {
                var local = _ref3.local,
                    other = _ref3.other;
                thing.fields[local] = _bluebird["default"].all(thing.fields[local].map(function (t) {
                  return base(other).find(t).then(function (o) {
                    var obj = o._rawJson.fields;
                    obj.__id = o._rawJson.id;
                    return obj;
                  });
                }));
              });
              return _bluebird["default"].props(thing.fields);
            })));

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function airtableJson(_x) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = airtableJson;
exports["default"] = _default;