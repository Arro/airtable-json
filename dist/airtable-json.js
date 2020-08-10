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

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var max_ids_per_query = 40;

function handlePopulate(_x) {
  return _handlePopulate.apply(this, arguments);
}

function _handlePopulate() {
  _handlePopulate = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2(_ref) {
    var base, things, local, other, foreign_ids, comparisons, chunked_comparisons, all_results, _iterator2, _step2, c, filterByFormula, results, new_things;

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
            _iterator2 = _createForOfIteratorHelper(chunked_comparisons);
            _context2.prev = 6;

            _iterator2.s();

          case 8:
            if ((_step2 = _iterator2.n()).done) {
              _context2.next = 18;
              break;
            }

            c = _step2.value;
            filterByFormula = "OR(".concat(c.join(', '), ")");
            _context2.next = 13;
            return base(other).select({
              filterByFormula: filterByFormula
            }).all();

          case 13:
            results = _context2.sent;
            results = results.map(function (results) {
              return _objectSpread(_objectSpread({}, results._rawJson.fields), {}, {
                __id: results.id
              });
            });
            all_results = all_results.concat(results);

          case 16:
            _context2.next = 8;
            break;

          case 18:
            _context2.next = 23;
            break;

          case 20:
            _context2.prev = 20;
            _context2.t0 = _context2["catch"](6);

            _iterator2.e(_context2.t0);

          case 23:
            _context2.prev = 23;

            _iterator2.f();

            return _context2.finish(23);

          case 26:
            all_results = (0, _keyBy["default"])('__id', all_results);
            new_things = things.map(function (thing) {
              if (thing[local]) {
                return _objectSpread(_objectSpread({}, thing), {}, (0, _defineProperty2["default"])({}, local, thing[local].map(function (id) {
                  return all_results[id];
                })));
              }

              return thing;
            });
            return _context2.abrupt("return", new_things);

          case 29:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[6, 20, 23, 26]]);
  }));
  return _handlePopulate.apply(this, arguments);
}

var airtableJson = /*#__PURE__*/function () {
  var _ref3 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(_ref2) {
    var auth_key, base_name, primary, view, _ref2$populate, populate, filter, base, select_object, things, _iterator, _step, _step$value, local, other;

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
              return _objectSpread(_objectSpread({}, thing._rawJson.fields), {}, {
                __id: thing.id
              });
            });
            _iterator = _createForOfIteratorHelper(populate);
            _context.prev = 10;

            _iterator.s();

          case 12:
            if ((_step = _iterator.n()).done) {
              _context.next = 19;
              break;
            }

            _step$value = _step.value, local = _step$value.local, other = _step$value.other;
            _context.next = 16;
            return handlePopulate({
              local: local,
              other: other,
              base: base,
              things: things
            });

          case 16:
            things = _context.sent;

          case 17:
            _context.next = 12;
            break;

          case 19:
            _context.next = 24;
            break;

          case 21:
            _context.prev = 21;
            _context.t0 = _context["catch"](10);

            _iterator.e(_context.t0);

          case 24:
            _context.prev = 24;

            _iterator.f();

            return _context.finish(24);

          case 27:
            return _context.abrupt("return", things);

          case 28:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[10, 21, 24, 27]]);
  }));

  return function airtableJson(_x2) {
    return _ref3.apply(this, arguments);
  };
}();

var _default = airtableJson;
exports["default"] = _default;