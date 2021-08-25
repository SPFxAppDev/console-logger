// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../node_modules/@spfxappdev/logger/lib/functions/library/isset.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isset;

/**
 * Determines if the provided Property is set.
 * @param {any} property The Property to checked.
 * @returns {boolean} If the Property is set <c>true</c> otherwise <c>false</c>.
 */
function isset(property) {
  return typeof property !== 'undefined' && property != null;
}
},{}],"../node_modules/@spfxappdev/logger/lib/functions/library/isNullOrEmpty.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = isNullOrEmpty;

var _isset = _interopRequireDefault(require("./isset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Determines if the provided Property is Null or Empty (or whitespace if string-value).
 * @param {any} property The Property to checked.
 * @returns {boolean} If the Property is Null or Empty or has
 * not "length" as property <c>true</c> otherwise <c>false</c>.
 */
function isNullOrEmpty(property) {
  if (!(0, _isset.default)(property)) {
    return true;
  }

  if (typeof property === 'string') {
    return property.trim().length < 1;
  }

  if (!property.hasOwnProperty('length')) {
    return false;
  }

  return property.length < 1;
}
},{"./isset":"../node_modules/@spfxappdev/logger/lib/functions/library/isset.js"}],"../node_modules/@spfxappdev/logger/lib/functions/library/getUrlParameter.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = getUrlParameter;

var _isNullOrEmpty = _interopRequireDefault(require("./isNullOrEmpty"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get's the Value of a specific Url-Parameter.
 * @param {string} parameterName The Name of the searched Parameter.
 * @param {string} url The Url which the Parameter-Value is read from (if not set the current Url is used).
 * @returns {string|null} If the Parameter exists on the Url the Value is returned as a string.
 */
function getUrlParameter(parameterName, url) {
  if (url === void 0) {
    url = null;
  }

  if ((0, _isNullOrEmpty.default)(url)) {
    url = window.location.href;
  }

  url = url.toLowerCase();
  var name = parameterName.toLowerCase();
  name = name.replace(/[\[]/, '\\\[').replace(/[\]]/, '\\\]');
  var regexS = '[\\?&]' + name + '=([^&#]*)';
  var regex = new RegExp(regexS);
  var results = regex.exec(url);

  if (results == null) {
    return null;
  }

  return results[1];
}
},{"./isNullOrEmpty":"../node_modules/@spfxappdev/logger/lib/functions/library/isNullOrEmpty.js"}],"../node_modules/@spfxappdev/logger/lib/functions/library/toBoolean.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = toBoolean;

var _isset = _interopRequireDefault(require("./isset"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Converts an object to a Boolean.
 * @param {any} value The Value to be converted to a Boolean.
 * @returns {boolean} If the Value is convertable to a Boolean it
 * is returned as a Boolean otherwise <c>false</c> is returned.
 */
function toBoolean(value) {
  if (!(0, _isset.default)(value)) {
    return false;
  }

  if (typeof value === 'boolean') {
    return value;
  }

  if (typeof value === 'string') {
    value = value.toLowerCase();
  }

  if (value !== 'false' && value !== 'true' && value !== '0' && value !== '1' && value !== 0 && value !== 1) {
    return false;
  }

  return value === 'false' || value === '0' || value === 0 ? false : true;
}
},{"./isset":"../node_modules/@spfxappdev/logger/lib/functions/library/isset.js"}],"../node_modules/@spfxappdev/logger/lib/functions/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "getUrlParameter", {
  enumerable: true,
  get: function () {
    return _getUrlParameter.default;
  }
});
Object.defineProperty(exports, "isNullOrEmpty", {
  enumerable: true,
  get: function () {
    return _isNullOrEmpty.default;
  }
});
Object.defineProperty(exports, "isset", {
  enumerable: true,
  get: function () {
    return _isset.default;
  }
});
Object.defineProperty(exports, "toBoolean", {
  enumerable: true,
  get: function () {
    return _toBoolean.default;
  }
});

var _getUrlParameter = _interopRequireDefault(require("./library/getUrlParameter"));

var _isNullOrEmpty = _interopRequireDefault(require("./library/isNullOrEmpty"));

var _isset = _interopRequireDefault(require("./library/isset"));

var _toBoolean = _interopRequireDefault(require("./library/toBoolean"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"./library/getUrlParameter":"../node_modules/@spfxappdev/logger/lib/functions/library/getUrlParameter.js","./library/isNullOrEmpty":"../node_modules/@spfxappdev/logger/lib/functions/library/isNullOrEmpty.js","./library/isset":"../node_modules/@spfxappdev/logger/lib/functions/library/isset.js","./library/toBoolean":"../node_modules/@spfxappdev/logger/lib/functions/library/toBoolean.js"}],"../node_modules/@spfxappdev/logger/lib/library/Logger.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Logger = exports.LogType = void 0;

var _functions = require("../functions");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
};

var logsEnabled = {
  EnableAll: true,
  EnableError: true,
  EnableInfo: true,
  EnableLog: true,
  EnableTable: true,
  EnableWarn: true
};
var DefaultLoggerSettings = {
  LogNamespaceUrlParameterName: 'LogOnly',
  LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
  LoggingEnabled: logsEnabled
};
var LogType;
exports.LogType = LogType;

(function (LogType) {
  LogType[LogType["Warning"] = 0] = "Warning";
  LogType[LogType["Info"] = 1] = "Info";
  LogType[LogType["Error"] = 2] = "Error";
  LogType[LogType["Table"] = 3] = "Table";
  LogType[LogType["Log"] = 4] = "Log";
})(LogType || (exports.LogType = LogType = {}));

var Logger = function () {
  function Logger(logNamespace, settings) {
    if (settings === void 0) {
      settings = null;
    }

    this.logNamespace = logNamespace;
    this.settings = settings;
    this._loggingEnabledByUrl = undefined;
    this._namespacesToLog = undefined;

    if (!(0, _functions.isset)(settings)) {
      this.settings = Logger.DefaultSettings;
    }
  }

  Object.defineProperty(Logger.prototype, "isLoggingEnabledByUrl", {
    get: function () {
      // URL Parameter already checked, return value from Parameter
      if ((0, _functions.isset)(this._loggingEnabledByUrl)) {
        return this._loggingEnabledByUrl;
      } // URL Parameter is not checked. Check and set Parameter


      var isEnabledValue = (0, _functions.getUrlParameter)(this.settings.LoggingEnabledUrlParameterName);

      if (!(0, _functions.isset)(isEnabledValue)) {
        this._loggingEnabledByUrl = false;
        return this._loggingEnabledByUrl;
      }

      this._loggingEnabledByUrl = (0, _functions.toBoolean)(isEnabledValue);
      return this._loggingEnabledByUrl;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Logger.prototype, "isLoggingEnabledBySettings", {
    get: function () {
      var enableLog = this.settings.LoggingEnabled;
      return enableLog.EnableAll || enableLog.EnableError || enableLog.EnableInfo || enableLog.EnableLog || enableLog.EnableTable || enableLog.EnableWarn;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(Logger.prototype, "namespacesToLogFromUrl", {
    get: function () {
      if ((0, _functions.isset)(this._namespacesToLog)) {
        return this._namespacesToLog;
      }

      var modules = (0, _functions.getUrlParameter)(this.settings.LogNamespaceUrlParameterName);

      if ((0, _functions.isNullOrEmpty)(modules)) {
        this._namespacesToLog = [];
        return this._namespacesToLog;
      }

      this._namespacesToLog = modules.toLowerCase().split(',');
      return this._namespacesToLog;
    },
    enumerable: false,
    configurable: true
  });

  Logger.prototype.getCurrentSettings = function () {
    return __assign({}, this.settings);
  };

  Logger.prototype.logToConsole = function (logType) {
    var _this = this;

    var data = [];

    for (var _i = 1; _i < arguments.length; _i++) {
      data[_i - 1] = arguments[_i];
    }

    if (!(0, _functions.isset)(console)) {
      return;
    }

    if (!this.isLoggingEnabledBySettings && !this.isLoggingEnabledByUrl) {
      return;
    } //If namespaces are filtered by URL and the current namespace is NOT one of it


    if (!(0, _functions.isNullOrEmpty)(this.namespacesToLogFromUrl) && this.namespacesToLogFromUrl.indexOf(this.logNamespace.toLowerCase()) < 0) {
      return;
    }

    var valuesToLog = __spreadArray(__spreadArray([], data), [this.logNamespace]);

    var logEnabled = this.isLoggingEnabledByUrl || this.settings.LoggingEnabled.EnableAll;

    switch (logType) {
      case LogType.Warning:
        if (logEnabled || this.settings.LoggingEnabled.EnableWarn) {
          console.warn.apply(console, valuesToLog);
        }

        break;

      case LogType.Info:
        if (logEnabled || this.settings.LoggingEnabled.EnableInfo) {
          /* tslint:disable:no-console */
          console.info.apply(console, valuesToLog);
        }

        break;

      case LogType.Error:
        if (logEnabled || this.settings.LoggingEnabled.EnableError) {
          console.error.apply(console, valuesToLog);
        }

        break;

      case LogType.Table:
        if (!(logEnabled || this.settings.LoggingEnabled.EnableTable)) {
          break;
        }

        if (typeof console.table !== 'function') {
          /* tslint:disable:no-console */
          console.info('Your browser does not support console.table, console.log was used instead', this.logNamespace);
          console.log.apply(console, valuesToLog);
          break;
        }

        data.forEach(function (d) {
          var valueType = typeof d;

          if (valueType !== 'array' && valueType !== 'object') {
            /* tslint:disable:no-console */
            console.info('It is not possible to log table if logValue is not an array or object, console.log was used instead', _this.logNamespace);
            console.log(d, _this.logNamespace);
            return;
          }

          console.table(d, [_this.logNamespace]);
        });
        break;

      case LogType.Log:
      default:
        if (logEnabled || this.settings.LoggingEnabled.EnableLog) {
          console.log.apply(console, valuesToLog);
        }

        break;
    }
  };

  Logger.prototype.log = function () {
    var data = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }

    this.logToConsole.apply(this, __spreadArray([LogType.Log], data));
  };

  Logger.prototype.warn = function () {
    var data = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }

    this.logToConsole.apply(this, __spreadArray([LogType.Warning], data));
  };

  Logger.prototype.info = function () {
    var data = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }

    this.logToConsole.apply(this, __spreadArray([LogType.Info], data));
  };

  Logger.prototype.error = function () {
    var data = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }

    this.logToConsole.apply(this, __spreadArray([LogType.Error], data));
  };

  Logger.prototype.table = function () {
    var data = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      data[_i] = arguments[_i];
    }

    this.logToConsole.apply(this, __spreadArray([LogType.Table], data));
  };

  Logger.Log = function (logNamespace, logType) {
    var data = [];

    for (var _i = 2; _i < arguments.length; _i++) {
      data[_i - 2] = arguments[_i];
    }

    var logger = new Logger(logNamespace);

    switch (logType) {
      case LogType.Error:
        logger.error.apply(logger, data);
        break;

      case LogType.Info:
        logger.info.apply(logger, data);
        break;

      case LogType.Table:
        logger.table.apply(logger, data);
        break;

      case LogType.Warning:
        logger.warn.apply(logger, data);
        break;

      case LogType.Log:
      default:
        logger.log.apply(logger, data);
        break;
    }
  };

  Logger.DefaultSettings = DefaultLoggerSettings;
  return Logger;
}();

exports.Logger = Logger;
},{"../functions":"../node_modules/@spfxappdev/logger/lib/functions/index.js"}],"../node_modules/@spfxappdev/logger/lib/library/decorators/decorators.utility.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogSettings = exports.getLogCategoryOrCustom = exports.logFunc = void 0;

var _Logger = require("../Logger");

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
};

var logFunc = function (target, enableConsoleLogging, loggingCategory, logType) {
  var logData = [];

  for (var _i = 4; _i < arguments.length; _i++) {
    logData[_i - 4] = arguments[_i];
  }

  var containsLogger = typeof target['logger'] === 'object'; // && (target as any).getLogger() instanceof Logger;

  var loggingSettings = containsLogger ? target.logger.getCurrentSettings() : _Logger.Logger.DefaultSettings;
  loggingSettings.LoggingEnabled = enableConsoleLogging;
  var logger = new _Logger.Logger(loggingCategory, loggingSettings);
  logger.logToConsole.apply(logger, __spreadArray([logType], logData));
};

exports.logFunc = logFunc;

var getLogCategoryOrCustom = function (target, customLogCategory, fallbackValue) {
  if (customLogCategory === void 0) {
    customLogCategory = null;
  }

  if (fallbackValue === void 0) {
    fallbackValue = '';
  }

  var loggingCategory = '';

  if (typeof customLogCategory === 'string') {
    loggingCategory = customLogCategory;
  } else {
    var containsLoggingCategory = typeof target['getLogCategory'] === 'function' && typeof target.getLogCategory() === 'string';
    loggingCategory = containsLoggingCategory ? target.getLogCategory() : fallbackValue;
  }

  return loggingCategory;
};

exports.getLogCategoryOrCustom = getLogCategoryOrCustom;

var getLogSettings = function () {
  return _Logger.Logger.DefaultSettings;
};

exports.getLogSettings = getLogSettings;
},{"../Logger":"../node_modules/@spfxappdev/logger/lib/library/Logger.js"}],"../node_modules/@spfxappdev/logger/lib/library/decorators/class.decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.classLogger = void 0;

var _Logger = require("../Logger");

var _decorators = require("./decorators.utility");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
};

var defaultOptions = {
  customLogCategory: null,
  enableConsoleLogging: null,
  override: true
}; //TODO: Check for generic classes MyClass<T>...

/**
* A Class logger dexorator
* For Intellisense with the @classLogger(), use this:
* @example export interface MyClass extends LoggerBase {}; export class MyClass;
*/

var classLogger = function (options) {
  if (options === void 0) {
    options = null;
  }

  options = __assign(__assign({}, defaultOptions), options);

  var classLoggerFunc = function (Base) {
    // save a reference to the original constructor
    var original = Base;
    var fallbackName = original && original.name ? original.name : '';
    var enableConsoleLogging = options.enableConsoleLogging || _Logger.Logger.DefaultSettings.LoggingEnabled;
    var loggingCategory = (0, _decorators.getLogCategoryOrCustom)(original, options.customLogCategory, fallbackName);

    var getLogCategoryFunc = function () {
      return (0, _decorators.getLogCategoryOrCustom)(original, options.customLogCategory, fallbackName);
    };

    var logFunc = function (logType) {
      var logData = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        logData[_i - 1] = arguments[_i];
      }

      _decorators.logFunc.apply(void 0, __spreadArray([original, enableConsoleLogging, loggingCategory, logType], logData));
    };

    var logSettingsFunc = function () {
      return (0, _decorators.getLogSettings)();
    };

    if (options.override) {
      original.prototype.getLogCategory = getLogCategoryFunc;
      original.prototype.log = logFunc;
      original.prototype.getLogSettings = logSettingsFunc;
    } else {
      original.prototype.getLogCategory = original.prototype.getLogCategory || getLogCategoryFunc;
      original.prototype.log = original.prototype.log || logFunc;
      original.prototype.getLogSettings = original.prototype.getLogSettings || logSettingsFunc;
    } // a utility function to generate instances of a class


    function construct(classConstructor, args) {
      var c = function () {
        return classConstructor.apply(this, args);
      };

      c.prototype = classConstructor.prototype;
      var instanceObj = new c();
      instanceObj.logger = new _Logger.Logger(instanceObj.getLogCategory(), instanceObj.getLogSettings());
      return instanceObj;
    } // the new constructor behaviour


    var f = function () {
      var args = [];

      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }

      return construct(original, args);
    }; // copy prototype so intanceof operator still works


    f.prototype = original.prototype; // return new constructor (will override original)

    return f;
  };

  return classLoggerFunc;
};

exports.classLogger = classLogger;
},{"../Logger":"../node_modules/@spfxappdev/logger/lib/library/Logger.js","./decorators.utility":"../node_modules/@spfxappdev/logger/lib/library/decorators/decorators.utility.js"}],"../node_modules/@spfxappdev/logger/lib/library/decorators/method.decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.methodLogger = void 0;

var _Logger = require("../Logger");

var _decorators = require("./decorators.utility");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
};

var defaultOptions = {
  customLogCategory: null,
  enableConsoleLogging: null
};

var methodLogger = function (options) {
  if (options === void 0) {
    options = null;
  }

  options = __assign(__assign({}, defaultOptions), options);
  return function (target, propertyKey, descriptor) {
    var originalMethod = descriptor.value;

    descriptor.value = function () {
      var enableConsoleLogging = options.enableConsoleLogging || _Logger.Logger.DefaultSettings.LoggingEnabled;
      var loggingCategory = (0, _decorators.getLogCategoryOrCustom)(target, options.customLogCategory, propertyKey);

      var logFunc = function (logType) {
        var logData = [];

        for (var _i = 1; _i < arguments.length; _i++) {
          logData[_i - 1] = arguments[_i];
        }

        _decorators.logFunc.apply(void 0, __spreadArray([target, enableConsoleLogging, loggingCategory, logType], logData));
      };

      var containsLoggingEnabled = typeof enableConsoleLogging !== 'undefined' && enableConsoleLogging !== null;
      enableConsoleLogging = containsLoggingEnabled ? enableConsoleLogging : _Logger.Logger.DefaultSettings.LoggingEnabled;

      if (arguments && arguments.length > 0) {
        logFunc(_Logger.LogType.Log, [propertyKey + " START with params", arguments]);
      } else {
        logFunc(_Logger.LogType.Log, propertyKey + " START");
      }

      var result = originalMethod.apply(this, arguments);

      if (!(result instanceof Promise)) {
        logFunc(_Logger.LogType.Log, propertyKey + " END");
        return result;
      }

      return Promise.resolve(result).then(function (value) {
        logFunc(_Logger.LogType.Log, propertyKey + " END");
        return value;
      }).catch(function (error) {
        logFunc(_Logger.LogType.Error, "ERROR occurred in " + propertyKey);
        logFunc(_Logger.LogType.Error, error);
        logFunc(_Logger.LogType.Log, propertyKey + " END");
        return Promise.reject(error);
      });
    };
  };
};

exports.methodLogger = methodLogger;
},{"../Logger":"../node_modules/@spfxappdev/logger/lib/library/Logger.js","./decorators.utility":"../node_modules/@spfxappdev/logger/lib/library/decorators/decorators.utility.js"}],"../node_modules/@spfxappdev/logger/lib/library/decorators/property.decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.propertyLogger = void 0;

var _Logger = require("../Logger");

var _decorators = require("./decorators.utility");

var __assign = void 0 && (void 0).__assign || function () {
  __assign = Object.assign || function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
      s = arguments[i];

      for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
    }

    return t;
  };

  return __assign.apply(this, arguments);
};

var __spreadArray = void 0 && (void 0).__spreadArray || function (to, from) {
  for (var i = 0, il = from.length, j = to.length; i < il; i++, j++) to[j] = from[i];

  return to;
};

var defaultOptions = {
  customLogCategory: null,
  enableConsoleLogging: null
};

var propertyLogger = function (options) {
  if (options === void 0) {
    options = null;
  }

  options = __assign(__assign({}, defaultOptions), options);
  return function (target, propertyName) {
    var enableConsoleLogging = options.enableConsoleLogging || _Logger.Logger.DefaultSettings.LoggingEnabled;
    var loggingCategory = (0, _decorators.getLogCategoryOrCustom)(target, options.customLogCategory, target.constructor['name'] + "." + propertyName);

    var logFunc = function (logType) {
      var logData = [];

      for (var _i = 1; _i < arguments.length; _i++) {
        logData[_i - 1] = arguments[_i];
      }

      _decorators.logFunc.apply(void 0, __spreadArray([target, enableConsoleLogging, loggingCategory, logType], logData));
    };

    var containsLoggingEnabled = typeof enableConsoleLogging !== 'undefined' && enableConsoleLogging !== null;
    enableConsoleLogging = containsLoggingEnabled ? enableConsoleLogging : _Logger.Logger.DefaultSettings.LoggingEnabled; // property value

    var _val = target[propertyName]; // property getter method

    var getter = function () {
      logFunc(_Logger.LogType.Log, "Get: " + propertyName + " => " + _val);
      return _val;
    }; // property setter method


    var setter = function (newVal) {
      logFunc(_Logger.LogType.Log, "Set: " + propertyName + " => " + newVal);
      _val = newVal;
    }; // Delete property.


    if (delete target[propertyName]) {
      // Create new property with getter and setter
      Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter,
        enumerable: true,
        configurable: true
      });
    }
  };
};

exports.propertyLogger = propertyLogger;
},{"../Logger":"../node_modules/@spfxappdev/logger/lib/library/Logger.js","./decorators.utility":"../node_modules/@spfxappdev/logger/lib/library/decorators/decorators.utility.js"}],"../node_modules/@spfxappdev/logger/lib/library/decorators/logFactory.decorators.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.log = void 0;

var _class = require("./class.decorators");

var _method = require("./method.decorators");

var _property = require("./property.decorators");

var _this = void 0;

// decorator factory - which calls the corresponding decorators based on arguments passed
var log = function (options) {
  if (options === void 0) {
    options = null;
  }

  var factoryFunction = function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    switch (args.length) {
      case 3:
        // can be method or property decorator
        if (typeof args[2] === 'number' || typeof args[2] === 'undefined') {
          return (0, _property.propertyLogger)(options).apply(_this, args);
        }

        return (0, _method.methodLogger)(options).apply(_this, args);

      case 2:
        // parameter decorator
        return (0, _property.propertyLogger)(options).apply(_this, args);

      case 1:
        // class decorator
        // return classLogger.apply(this, args);
        return (0, _class.classLogger)(options).apply(_this, args);

      default:
        // invalid size of arguments
        throw new Error('Not a valid decorator');
    }
  };

  return factoryFunction;
};

exports.log = log;
},{"./class.decorators":"../node_modules/@spfxappdev/logger/lib/library/decorators/class.decorators.js","./method.decorators":"../node_modules/@spfxappdev/logger/lib/library/decorators/method.decorators.js","./property.decorators":"../node_modules/@spfxappdev/logger/lib/library/decorators/property.decorators.js"}],"../node_modules/@spfxappdev/logger/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "Logger", {
  enumerable: true,
  get: function () {
    return _Logger.Logger;
  }
});
Object.defineProperty(exports, "LogType", {
  enumerable: true,
  get: function () {
    return _Logger.LogType;
  }
});
Object.defineProperty(exports, "log", {
  enumerable: true,
  get: function () {
    return _logFactory.log;
  }
});

var _Logger = require("./library/Logger");

var _logFactory = require("./library/decorators/logFactory.decorators");
},{"./library/Logger":"../node_modules/@spfxappdev/logger/lib/library/Logger.js","./library/decorators/logFactory.decorators":"../node_modules/@spfxappdev/logger/lib/library/decorators/logFactory.decorators.js"}],"App.ts":[function(require,module,exports) {
"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var __decorate = this && this.__decorate || function (decorators, target, key, desc) {
  var c = arguments.length,
      r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc,
      d;
  if ((typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);else for (var i = decorators.length - 1; i >= 0; i--) {
    if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
  }
  return c > 3 && r && Object.defineProperty(target, key, r), r;
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var logger_1 = require("@spfxappdev/logger"); // import { Logger, ILoggerSettings } from '../../src/index';
// import { log } from '../../src/library/decorators/logFactory.decorators';
// import { LoggerBase } from '../../src/library/LoggerBase';
// import { ILogger } from '../../src/library/ILogger';


var TestApp = function () {
  function TestApp() {
    this.logger = new logger_1.Logger("spfxAppDev");
  }

  TestApp.prototype.doThings = function () {
    this.logger.log("doThings START");
    this.logger.log("Hello World");
    this.logger.log("doThings END");
  };

  TestApp.prototype.doThingsWithParam = function (a, b) {
    this.logger.log("doThingsWithParam START", a, b);
    this.logger.log("Hello World");
    this.logger.log("doThingsWithParam END", a, b);
  };

  TestApp.prototype.examples = function () {
    this.logger.log("Welcome to @spfxappdev/logger");
    this.logger.warn("Welcome to @spfxappdev/logger");
    this.logger.info("Welcome to @spfxappdev/logger");
    this.logger.error("Welcome to @spfxappdev/logger");
    this.logger.table(["Welcome to @spfxappdev/logger"]);
  };

  return TestApp;
}();

var myLoggerSettings = {
  LogNamespaceUrlParameterName: 'LogOnlyMy',
  LoggingEnabledUrlParameterName: 'EnableLogging',
  LoggingEnabled: {
    EnableAll: false,
    EnableError: true,
    EnableInfo: false,
    EnableLog: false,
    EnableTable: false,
    EnableWarn: true
  }
};
logger_1.Logger.DefaultSettings = myLoggerSettings;
var t = new TestApp();
t.doThings();
t.doThingsWithParam("Hello console logger number", 1);
t.examples();

var TestAppWithDecorators = function () {
  function TestAppWithDecorators() {
    this.myProp = "";
  }

  TestAppWithDecorators.prototype.doThings = function () {
    this.logger.log("Hello World");
  };

  TestAppWithDecorators.prototype.doThingsWithParam = function (a, b) {
    this.logger.log("doThingsWithParam START", a, b);
    this.logger.log("Hello World");
    this.logger.log("doThingsWithParam END", a, b);
  };

  TestAppWithDecorators.prototype.examples = function () {
    this.myProp = "Welcome to @spfxappdev/logger";
    this.logger.log(this.myProp);
    this.logger.warn(this.myProp);
    this.logger.info(this.myProp);
    this.logger.error(this.myProp);
    this.logger.table([this.myProp]);
  };

  TestAppWithDecorators.prototype.getLogSettings = function () {
    return {
      LogNamespaceUrlParameterName: 'LogOnly',
      LoggingEnabledUrlParameterName: 'EnableConsoleLogging',
      LoggingEnabled: {
        EnableAll: false,
        EnableError: true,
        EnableInfo: false,
        EnableLog: true,
        EnableTable: false,
        EnableWarn: true
      }
    };
  };

  __decorate([logger_1.log()], TestAppWithDecorators.prototype, "myProp", void 0);

  __decorate([logger_1.log()], TestAppWithDecorators.prototype, "doThings", null);

  __decorate([logger_1.log()], TestAppWithDecorators.prototype, "doThingsWithParam", null);

  __decorate([logger_1.log()], TestAppWithDecorators.prototype, "examples", null);

  TestAppWithDecorators = __decorate([logger_1.log({
    customLogCategory: "myCustomLoggingCategory",
    override: false
  })], TestAppWithDecorators);
  return TestAppWithDecorators;
}();

var t2 = new TestAppWithDecorators();
t2.doThings();
t2.doThingsWithParam("Hello console logger number", 1);
t2.examples();
console.log(t2 instanceof TestAppWithDecorators);
},{"@spfxappdev/logger":"../node_modules/@spfxappdev/logger/lib/index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "51752" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","App.ts"], null)
//# sourceMappingURL=/App.7a936cda.js.map