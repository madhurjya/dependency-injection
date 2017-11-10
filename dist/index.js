module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 3);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dependencyMapping = __webpack_require__(4);

var _dependencyMapping2 = _interopRequireDefault(_dependencyMapping);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _registrations = new Map();

class DependencyContainer {
    static isRegistered(registrationName) {
        return _registrations.has(registrationName);
    }
    static register(name) {
        if (!_registrations.has(name)) {
            _registrations.set(name, new _dependencyMapping2.default());
        }
        return _registrations.get(name);
    }
    static resolve(registrationName, mappingName) {
        if (!_registrations.has(registrationName)) {
            throw new Error(`${registrationName} is not registered.`);
        }
        const dependencyMapping = _registrations.get(registrationName);
        if (!dependencyMapping._mappings.has(mappingName)) {
            throw new Error(`Mapping ${mappingName} is not registered.`);
        }
        const dependencyDetails = dependencyMapping._mappings.get(mappingName);
        return dependencyDetails._resolve();
    }
    static inject(func) {
        if (!(0, _utils.isFunction)(func)) {
            throw new TypeError('Must be a function of class');
        }
        const funcArguments = (0, _utils.getFunctionParameters)(func).map(param => {
            return DependencyContainer.resolve(param);
        });
        return func(...funcArguments);
    }
}

exports.default = DependencyContainer;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dependencyContainer = __webpack_require__(0);

var _dependencyContainer2 = _interopRequireDefault(_dependencyContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ParameterDetails {
    constructor(parameterName) {
        this._name = parameterName;

        this._resolveAsValue = false;
        this._valueToResolve = null;

        this._resolveAsDependency = false;
        this._registrationNameToResolve = null;
        this._mappingNameToResolve = null;
    }
    asValue(valueToResolve) {
        this._resolveAsValue = true;
        this._valueToResolve = valueToResolve;
    }
    asDependency(registrationName, mappingName) {
        this._resolveAsDependency = true;
        this._registrationNameToResolve = registrationName;
        this._mappingNameToResolve = mappingName;
    }

    _resolve() {
        if (this._resolveAsValue) {
            return this._valueToResolve;
        } else if (this._resolveAsDependency) {
            return _dependencyContainer2.default.resolve(this._registrationNameToResolve, this._mappingNameToResolve);
        }
    }
}

exports.default = ParameterDetails;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.isFunction = isFunction;
exports.getFunctionParameters = getFunctionParameters;
function isFunction(func) {
    return typeof func === 'function';
}

function getFunctionParameters(func) {
    const paramExtract = func.toString().match(/\s*function[^(]*\(([^)]*)\)/);
    if (paramExtract && paramExtract.length === 2) {
        return paramExtract[1].split(',').map(param => param.replace(/\/\/.*?[\r\n]|\/\*(?:.|[\r\n])*?\*\//g, '').trim());
    } else {
        throw new Error('Unable to fetch parameter details.');
    }
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _dependencyContainer = __webpack_require__(0);

var _dependencyContainer2 = _interopRequireDefault(_dependencyContainer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _dependencyContainer2.default;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dependencyDetails = __webpack_require__(5);

var _dependencyDetails2 = _interopRequireDefault(_dependencyDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DependencyMapping {
    constructor() {
        this._mappings = new Map();
    }
    asType(type, mappingName) {
        if (this._mappings.has(mappingName)) {
            throw new Error(`${mappingName || 'default'} mapping is already registered.`);
        }
        const dependencyDetails = new _dependencyDetails2.default(type);
        this._mappings.set(mappingName, dependencyDetails);
        return dependencyDetails;
    }
}

exports.default = DependencyMapping;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parameterMapper = __webpack_require__(6);

var _parameterMapper2 = _interopRequireDefault(_parameterMapper);

var _propertyMapper = __webpack_require__(7);

var _propertyMapper2 = _interopRequireDefault(_propertyMapper);

var _utils = __webpack_require__(2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class DependencyDetails {
    constructor(type) {
        this._type = type;
        this._resolveWithConstructor = false;
        this._constructorParameterMapper = null;
        this._resolvePropertyValues = false;
        this._propertyValueMapper = false;
        this._isInSingletonScope = false;
        this._resolvedInstance = null;
    }
    withConstructor(parameterMapperFunc) {
        if (this._resolveWithConstructor === true) {
            throw new Error('Constructor is already configured.');
        }
        this._resolveWithConstructor = true;
        this._constructorParameterMapper = new _parameterMapper2.default((0, _utils.getFunctionParameters)(this._type));
        if ((0, _utils.isFunction)(parameterMapperFunc)) {
            parameterMapperFunc(this._constructorParameterMapper);
        }
        return this;
    }

    withProperties(propertyValueMapperFunc) {
        if (this._resolvePropertyValues === true) {
            throw new Error('Property values are already configured.');
        }
        this._resolvePropertyValues = true;
        this._propertyValueMapper = new _propertyMapper2.default();
        if ((0, _utils.isFunction)(propertyValueMapperFunc)) {
            propertyValueMapperFunc(this._propertyValueMapper);
        }
        return this;
    }

    inSingletonScope() {
        this._isInSingletonScope = true;
    }

    _resolve() {
        if (this._isInSingletonScope && this._resolvedInstance) {
            return this._resolvedInstance;
        } else {
            if (this._resolveWithConstructor === true) {
                const constructorArguments = this._constructorParameterMapper._resolve();
                this._resolvedInstance = new this._type(...constructorArguments);
            } else {
                this._resolvedInstance = new this._type();
            }
            if (this._resolvePropertyValues === true) {
                this._propertyValueMapper._resolve().forEach(([name, value]) => {
                    this._resolvedInstance[name] = value;
                });
            }
            return this._resolvedInstance;
        }
    }
}

exports.default = DependencyDetails;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _dependencyContainer = __webpack_require__(0);

var _dependencyContainer2 = _interopRequireDefault(_dependencyContainer);

var _parameterDetails = __webpack_require__(1);

var _parameterDetails2 = _interopRequireDefault(_parameterDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ParameterMapper {
    constructor(parameterNames) {
        this._parameterMap = new Map(parameterNames.map(param => [param, new _parameterDetails2.default(param)]));
    }
    param(name) {
        if (!this._parameterMap.has(name)) {
            throw new Error(`Parameter "${name}" was not detected.`);
        }
        return this._parameterMap.get(name);
    }

    _resolve() {
        return [...this._parameterMap.values()].map(param => param._resolve());
    }
}

exports.default = ParameterMapper;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _parameterDetails = __webpack_require__(1);

var _parameterDetails2 = _interopRequireDefault(_parameterDetails);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class PropertyMapper {
    constructor() {
        this._propertyMap = new Map();
    }
    property(name) {
        if (!this._propertyMap.has(name)) {
            this._propertyMap.set(name, new _parameterDetails2.default(name));
        }
        return this._propertyMap.get(name);
    }
    _resolve() {
        return [...this._propertyMap.entries()].map(([name, prop]) => [name, prop._resolve()]);
    }
}

exports.default = PropertyMapper;

/***/ })
/******/ ]);
//# sourceMappingURL=index.js.map