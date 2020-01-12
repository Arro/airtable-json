"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _airtable = _interopRequireDefault(require("airtable"));

var _keyBy = _interopRequireDefault(require("lodash/fp/keyBy"));

var _chunk = _interopRequireDefault(require("lodash/fp/chunk"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var max_ids_per_query = 40;

function handlePopulate(_x) {
  return _handlePopulate.apply(this, arguments);
}

function _handlePopulate() {
  _handlePopulate = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee2(_ref) {
    var base, things, local, other, foreign_ids, comparisons, chunked_comparisons, all_results, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, c, filterByFormula, results, new_things;

    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            base = _ref.base, things = _ref.things, local = _ref.local, other = _ref.other;
            foreign_ids = things.reduce(function (acc, thing) {
              if (thing[local]) {
                return acc.concat(thing[local]);
              }

              return acc;
            }, []);
            comparisons = foreign_ids.map(function (id) {
              return "RECORD_ID() = '".concat(id, "'");
            });
            chunked_comparisons = (0, _chunk["default"])(max_ids_per_query, comparisons);
            all_results = [];
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 8;
            _iterator2 = chunked_comparisons[Symbol.iterator]();

          case 10:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context2.next = 21;
              break;
            }

            c = _step2.value;
            filterByFormula = "OR(".concat(c.join(', '), ")");
            _context2.next = 15;
            return base(other).select({
              filterByFormula: filterByFormula
            }).all();

          case 15:
            results = _context2.sent;
            results = results.map(function (results) {
              return _objectSpread({}, results._rawJson.fields, {
                __id: results.id
              });
            });
            all_results = all_results.concat(results);

          case 18:
            _iteratorNormalCompletion2 = true;
            _context2.next = 10;
            break;

          case 21:
            _context2.next = 27;
            break;

          case 23:
            _context2.prev = 23;
            _context2.t0 = _context2["catch"](8);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 27:
            _context2.prev = 27;
            _context2.prev = 28;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError2) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError2;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(27);

          case 35:
            all_results = (0, _keyBy["default"])('__id', all_results);
            new_things = things.map(function (thing) {
              if (thing[local]) {
                return _objectSpread({}, thing, (0, _defineProperty2["default"])({}, local, thing[local].map(function (id) {
                  return all_results[id];
                })));
              }

              return thing;
            });
            return _context2.abrupt("return", new_things);

          case 38:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[8, 23, 27, 35], [28,, 30, 34]]);
  }));
  return _handlePopulate.apply(this, arguments);
}

var airtableJson =
/*#__PURE__*/
function () {
  var _ref3 = (0, _asyncToGenerator2["default"])(
  /*#__PURE__*/
  _regenerator["default"].mark(function _callee(_ref2) {
    var auth_key, base_name, primary, view, _ref2$populate, populate, filter, base, select_object, things, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, local, other;

    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            auth_key = _ref2.auth_key, base_name = _ref2.base_name, primary = _ref2.primary, view = _ref2.view, _ref2$populate = _ref2.populate, populate = _ref2$populate === void 0 ? [] : _ref2$populate, filter = _ref2.filter;

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
            things = _context.sent;
            things = things.map(function (thing) {
              return _objectSpread({}, thing._rawJson.fields, {
                __id: thing.id
              });
            });
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 12;
            _iterator = populate[Symbol.iterator]();

          case 14:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context.next = 22;
              break;
            }

            _step$value = _step.value, local = _step$value.local, other = _step$value.other;
            _context.next = 18;
            return handlePopulate({
              local: local,
              other: other,
              base: base,
              things: things
            });

          case 18:
            things = _context.sent;

          case 19:
            _iteratorNormalCompletion = true;
            _context.next = 14;
            break;

          case 22:
            _context.next = 28;
            break;

          case 24:
            _context.prev = 24;
            _context.t0 = _context["catch"](12);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 28:
            _context.prev = 28;
            _context.prev = 29;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 31:
            _context.prev = 31;

            if (!_didIteratorError) {
              _context.next = 34;
              break;
            }

            throw _iteratorError;

          case 34:
            return _context.finish(31);

          case 35:
            return _context.finish(28);

          case 36:
            return _context.abrupt("return", things);

          case 37:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[12, 24, 28, 36], [29,, 31, 35]]);
  }));

  return function airtableJson(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = airtableJson;
exports["default"] = _default;