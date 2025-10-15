const __getOwnPropNames = Object.getOwnPropertyNames;
const __commonJS = (cb, mod) =>
  function __require2() {
    return (
      mod ||
        (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod),
      mod.exports
    );
  };

// https://github.com/facebook/react/blob/e7984651e4f123d8112f5abab39782ee70d8f4aa/packages/react-server/src/ReactServerStreamConfigNode.js#L41
const VIEW_SIZE = 2048;

// This can bring the difference down to only 1.3x when used with the lower heap sizes
// const VIEW_SIZE = 2 * 1024 * 1024;

const require_react = __commonJS({
  "node_modules/react/cjs/react.production.min.js"(exports) {
    "use strict";
    var l = Symbol.for("react.element");
    var n = Symbol.for("react.portal");
    var p = Symbol.for("react.fragment");
    var q = Symbol.for("react.strict_mode");
    var r = Symbol.for("react.profiler");
    var t = Symbol.for("react.provider");
    var u = Symbol.for("react.context");
    var v = Symbol.for("react.forward_ref");
    var w = Symbol.for("react.suspense");
    var x = Symbol.for("react.memo");
    var y = Symbol.for("react.lazy");
    var z = Symbol.iterator;
    function A(a) {
      if (null === a || "object" !== typeof a) return null;
      a = (z && a[z]) || a["@@iterator"];
      return "function" === typeof a ? a : null;
    }
    var B = {
      isMounted: function () {
        return false;
      },
      enqueueForceUpdate: function () {},
      enqueueReplaceState: function () {},
      enqueueSetState: function () {},
    };
    var C = Object.assign;
    var D = {};
    function E(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    E.prototype.isReactComponent = {};
    E.prototype.setState = function (a, b) {
      if ("object" !== typeof a && "function" !== typeof a && null != a)
        throw Error(
          "setState(...): takes an object of state variables to update or a function which returns an object of state variables."
        );
      this.updater.enqueueSetState(this, a, b, "setState");
    };
    E.prototype.forceUpdate = function (a) {
      this.updater.enqueueForceUpdate(this, a, "forceUpdate");
    };
    function F() {}
    F.prototype = E.prototype;
    function G(a, b, e) {
      this.props = a;
      this.context = b;
      this.refs = D;
      this.updater = e || B;
    }
    var H = (G.prototype = new F());
    H.constructor = G;
    C(H, E.prototype);
    H.isPureReactComponent = true;
    var I = Array.isArray;
    var J = Object.prototype.hasOwnProperty;
    var K = { current: null };
    var L = { key: true, ref: true, __self: true, __source: true };
    function M(a, b, e) {
      var d,
        c = {},
        k = null,
        h = null;
      if (null != b)
        for (d in (void 0 !== b.ref && (h = b.ref),
        void 0 !== b.key && (k = "" + b.key),
        b))
          J.call(b, d) && !L.hasOwnProperty(d) && (c[d] = b[d]);
      var g = arguments.length - 2;
      if (1 === g) c.children = e;
      else if (1 < g) {
        for (var f = Array(g), m = 0; m < g; m++) f[m] = arguments[m + 2];
        c.children = f;
      }
      if (a && a.defaultProps)
        for (d in ((g = a.defaultProps), g)) void 0 === c[d] && (c[d] = g[d]);
      return {
        $$typeof: l,
        type: a,
        key: k,
        ref: h,
        props: c,
        _owner: K.current,
      };
    }
    function N(a, b) {
      return {
        $$typeof: l,
        type: a.type,
        key: b,
        ref: a.ref,
        props: a.props,
        _owner: a._owner,
      };
    }
    function O(a) {
      return "object" === typeof a && null !== a && a.$$typeof === l;
    }
    function escape(a) {
      var b = { "=": "=0", ":": "=2" };
      return (
        "$" +
        a.replace(/[=:]/g, function (a2) {
          return b[a2];
        })
      );
    }
    var P = /\/+/g;
    function Q(a, b) {
      return "object" === typeof a && null !== a && null != a.key
        ? escape("" + a.key)
        : b.toString(36);
    }
    function R(a, b, e, d, c) {
      var k = typeof a;
      if ("undefined" === k || "boolean" === k) a = null;
      var h = false;
      if (null === a) h = true;
      else
        switch (k) {
          case "string":
          case "number":
            h = true;
            break;
          case "object":
            switch (a.$$typeof) {
              case l:
              case n:
                h = true;
            }
        }
      if (h)
        return (
          (h = a),
          (c = c(h)),
          (a = "" === d ? "." + Q(h, 0) : d),
          I(c)
            ? ((e = ""),
              null != a && (e = a.replace(P, "$&/") + "/"),
              R(c, b, e, "", function (a2) {
                return a2;
              }))
            : null != c &&
              (O(c) &&
                (c = N(
                  c,
                  e +
                    (!c.key || (h && h.key === c.key)
                      ? ""
                      : ("" + c.key).replace(P, "$&/") + "/") +
                    a
                )),
              b.push(c)),
          1
        );
      h = 0;
      d = "" === d ? "." : d + ":";
      if (I(a))
        for (var g = 0; g < a.length; g++) {
          k = a[g];
          var f = d + Q(k, g);
          h += R(k, b, e, f, c);
        }
      else if (((f = A(a)), "function" === typeof f))
        for (a = f.call(a), g = 0; !(k = a.next()).done; )
          (k = k.value), (f = d + Q(k, g++)), (h += R(k, b, e, f, c));
      else if ("object" === k)
        throw (
          ((b = String(a)),
          Error(
            "Objects are not valid as a React child (found: " +
              ("[object Object]" === b
                ? "object with keys {" + Object.keys(a).join(", ") + "}"
                : b) +
              "). If you meant to render a collection of children, use an array instead."
          ))
        );
      return h;
    }
    function S(a, b, e) {
      if (null == a) return a;
      var d = [],
        c = 0;
      R(a, d, "", "", function (a2) {
        return b.call(e, a2, c++);
      });
      return d;
    }
    function T(a) {
      if (-1 === a._status) {
        var b = a._result;
        b = b();
        b.then(
          function (b2) {
            if (0 === a._status || -1 === a._status)
              (a._status = 1), (a._result = b2);
          },
          function (b2) {
            if (0 === a._status || -1 === a._status)
              (a._status = 2), (a._result = b2);
          }
        );
        -1 === a._status && ((a._status = 0), (a._result = b));
      }
      if (1 === a._status) return a._result.default;
      throw a._result;
    }
    var U = { current: null };
    var V = { transition: null };
    var W = {
      ReactCurrentDispatcher: U,
      ReactCurrentBatchConfig: V,
      ReactCurrentOwner: K,
    };
    function act() {
      throw Error("act(...) is not supported in production builds of React.");
    }
    exports.Children = {
      map: S,
      forEach: function (a, b, e) {
        S(
          a,
          function () {
            b.apply(this, arguments);
          },
          e
        );
      },
      count: function (a) {
        var b = 0;
        S(a, function () {
          b++;
        });
        return b;
      },
      toArray: function (a) {
        return (
          S(a, function (a2) {
            return a2;
          }) || []
        );
      },
      only: function (a) {
        if (!O(a))
          throw Error(
            "React.Children.only expected to receive a single React element child."
          );
        return a;
      },
    };
    exports.Component = E;
    exports.Fragment = p;
    exports.Profiler = r;
    exports.PureComponent = G;
    exports.StrictMode = q;
    exports.Suspense = w;
    exports.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED = W;
    exports.act = act;
    exports.cloneElement = function (a, b, e) {
      if (null === a || void 0 === a)
        throw Error(
          "React.cloneElement(...): The argument must be a React element, but you passed " +
            a +
            "."
        );
      var d = C({}, a.props),
        c = a.key,
        k = a.ref,
        h = a._owner;
      if (null != b) {
        void 0 !== b.ref && ((k = b.ref), (h = K.current));
        void 0 !== b.key && (c = "" + b.key);
        if (a.type && a.type.defaultProps) var g = a.type.defaultProps;
        for (f in b)
          J.call(b, f) &&
            !L.hasOwnProperty(f) &&
            (d[f] = void 0 === b[f] && void 0 !== g ? g[f] : b[f]);
      }
      var f = arguments.length - 2;
      if (1 === f) d.children = e;
      else if (1 < f) {
        g = Array(f);
        for (var m = 0; m < f; m++) g[m] = arguments[m + 2];
        d.children = g;
      }
      return { $$typeof: l, type: a.type, key: c, ref: k, props: d, _owner: h };
    };
    exports.createContext = function (a) {
      a = {
        $$typeof: u,
        _currentValue: a,
        _currentValue2: a,
        _threadCount: 0,
        Provider: null,
        Consumer: null,
        _defaultValue: null,
        _globalName: null,
      };
      a.Provider = { $$typeof: t, _context: a };
      return (a.Consumer = a);
    };
    exports.createElement = M;
    exports.createFactory = function (a) {
      var b = M.bind(null, a);
      b.type = a;
      return b;
    };
    exports.createRef = function () {
      return { current: null };
    };
    exports.forwardRef = function (a) {
      return { $$typeof: v, render: a };
    };
    exports.isValidElement = O;
    exports.lazy = function (a) {
      return { $$typeof: y, _payload: { _status: -1, _result: a }, _init: T };
    };
    exports.memo = function (a, b) {
      return { $$typeof: x, type: a, compare: void 0 === b ? null : b };
    };
    exports.startTransition = function (a) {
      var b = V.transition;
      V.transition = {};
      try {
        a();
      } finally {
        V.transition = b;
      }
    };
    exports.unstable_act = act;
    exports.useCallback = function (a, b) {
      return U.current.useCallback(a, b);
    };
    exports.useContext = function (a) {
      return U.current.useContext(a);
    };
    exports.useDebugValue = function () {};
    exports.useDeferredValue = function (a) {
      return U.current.useDeferredValue(a);
    };
    exports.useEffect = function (a, b) {
      return U.current.useEffect(a, b);
    };
    exports.useId = function () {
      return U.current.useId();
    };
    exports.useImperativeHandle = function (a, b, e) {
      return U.current.useImperativeHandle(a, b, e);
    };
    exports.useInsertionEffect = function (a, b) {
      return U.current.useInsertionEffect(a, b);
    };
    exports.useLayoutEffect = function (a, b) {
      return U.current.useLayoutEffect(a, b);
    };
    exports.useMemo = function (a, b) {
      return U.current.useMemo(a, b);
    };
    exports.useReducer = function (a, b, e) {
      return U.current.useReducer(a, b, e);
    };
    exports.useRef = function (a) {
      return U.current.useRef(a);
    };
    exports.useState = function (a) {
      return U.current.useState(a);
    };
    exports.useSyncExternalStore = function (a, b, e) {
      return U.current.useSyncExternalStore(a, b, e);
    };
    exports.useTransition = function () {
      return U.current.useTransition();
    };
    exports.version = "18.3.1";
  },
});

const React = require_react();

const require_server_node = __commonJS({
  "node_modules/react-dom/cjs/react-dom-server.node.production.min.js"(
    exports
  ) {
    "use strict";
    var currentView = null;
    var writtenBytes = 0;
    var destinationHasCapacity = true;

    function writeStringChunk(destination, chunk) {
      if (0 !== chunk.length) {
        if (VIEW_SIZE < 3 * chunk.length) {
          0 < writtenBytes &&
            (writeToDestination(
              destination,
              currentView.subarray(0, writtenBytes)
            ),
            (currentView = new Uint8Array(VIEW_SIZE)),
            (writtenBytes = 0)),
            writeToDestination(destination, textEncoder.encode(chunk));
        } else {
          var target = currentView;
          0 < writtenBytes && (target = currentView.subarray(writtenBytes));
          target = textEncoder.encodeInto(chunk, target);
          var d = target.read;
          writtenBytes += target.written;
          d < chunk.length &&
            (writeToDestination(destination, currentView),
            (currentView = new Uint8Array(VIEW_SIZE)),
            (writtenBytes = textEncoder.encodeInto(
              chunk.slice(d),
              currentView
            ).written));
          VIEW_SIZE === writtenBytes &&
            (writeToDestination(destination, currentView),
            (currentView = new Uint8Array(VIEW_SIZE)),
            (writtenBytes = 0));
        }
      }
    }

    function writeViewChunk(destination, chunk) {
      var allowableBytes;
      0 !== chunk.byteLength &&
        (VIEW_SIZE < chunk.byteLength
          ? (0 < writtenBytes &&
              (writeToDestination(
                destination,
                currentView.subarray(0, writtenBytes)
              ),
              (currentView = new Uint8Array(VIEW_SIZE)),
              (writtenBytes = 0)),
            writeToDestination(destination, chunk))
          : ((allowableBytes = currentView.length - writtenBytes),
            allowableBytes < chunk.byteLength &&
              (0 === allowableBytes
                ? writeToDestination(destination, currentView)
                : (currentView.set(
                    chunk.subarray(0, allowableBytes),
                    writtenBytes
                  ),
                  (writtenBytes += allowableBytes),
                  writeToDestination(destination, currentView),
                  (chunk = chunk.subarray(allowableBytes))),
              (currentView = new Uint8Array(VIEW_SIZE)),
              (writtenBytes = 0)),
            currentView.set(chunk, writtenBytes),
            (writtenBytes += chunk.byteLength),
            VIEW_SIZE === writtenBytes &&
              (writeToDestination(destination, currentView),
              (currentView = new Uint8Array(VIEW_SIZE)),
              (writtenBytes = 0))));
    }

    function writeChunk(destination, chunk) {
      if ("string" === typeof chunk) {
        writeStringChunk(destination, chunk);
      } else {
        writeViewChunk(destination, chunk);
      }
    }

    function writeToDestination(destination, view) {
      destination = destination.write(view);
      destinationHasCapacity = destinationHasCapacity && destination;
    }

    function writeChunkAndReturn(a, b) {
      writeChunk(a, b);
      return destinationHasCapacity;
    }

    function completeWriting(destination) {
      currentView &&
        0 < writtenBytes &&
        destination.write(currentView.subarray(0, writtenBytes));
      currentView = null;
      writtenBytes = 0;
      destinationHasCapacity = true;
    }

    var textEncoder = new TextEncoder();

    function stringToPrecomputedChunk(a) {
      return textEncoder.encode(a);
    }

    var hasOwnProperty = Object.prototype.hasOwnProperty;

    var VALID_ATTRIBUTE_NAME_REGEX =
      /^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/;
    var illegalAttributeNameCache = {};
    var validatedAttributeNameCache = {};
    function isAttributeNameSafe(attributeName) {
      if (hasOwnProperty.call(validatedAttributeNameCache, attributeName))
        return true;
      if (hasOwnProperty.call(illegalAttributeNameCache, attributeName))
        return false;
      if (VALID_ATTRIBUTE_NAME_REGEX.test(attributeName))
        return (validatedAttributeNameCache[attributeName] = true);
      illegalAttributeNameCache[attributeName] = true;
      return false;
    }
    function PropertyInfoRecord(a, b, c, d, f, e, g) {
      this.acceptsBooleans = 2 === b || 3 === b || 4 === b;
      this.attributeName = d;
      this.attributeNamespace = f;
      this.mustUseProperty = c;
      this.propertyName = a;
      this.type = b;
      this.sanitizeURL = e;
      this.removeEmptyString = g;
    }
    var properties = {};
    "children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style"
      .split(" ")
      .forEach(function (a) {
        properties[a] = new PropertyInfoRecord(
          a,
          0,
          false,
          a,
          null,
          false,
          false
        );
      });
    [
      ["acceptCharset", "accept-charset"],
      ["className", "class"],
      ["htmlFor", "for"],
      ["httpEquiv", "http-equiv"],
    ].forEach(function (a) {
      var b = a[0];
      properties[b] = new PropertyInfoRecord(
        b,
        1,
        false,
        a[1],
        null,
        false,
        false
      );
    });
    ["contentEditable", "draggable", "spellCheck", "value"].forEach(function (
      a
    ) {
      properties[a] = new PropertyInfoRecord(
        a,
        2,
        false,
        a.toLowerCase(),
        null,
        false,
        false
      );
    });
    [
      "autoReverse",
      "externalResourcesRequired",
      "focusable",
      "preserveAlpha",
    ].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        2,
        false,
        a,
        null,
        false,
        false
      );
    });
    "allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope"
      .split(" ")
      .forEach(function (a) {
        properties[a] = new PropertyInfoRecord(
          a,
          3,
          false,
          a.toLowerCase(),
          null,
          false,
          false
        );
      });
    ["checked", "multiple", "muted", "selected"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(a, 3, true, a, null, false, false);
    });
    ["capture", "download"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        4,
        false,
        a,
        null,
        false,
        false
      );
    });
    ["cols", "rows", "size", "span"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        6,
        false,
        a,
        null,
        false,
        false
      );
    });
    ["rowSpan", "start"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        5,
        false,
        a.toLowerCase(),
        null,
        false,
        false
      );
    });
    var ia = /[\-:]([a-z])/g;
    function ja(a) {
      return a[1].toUpperCase();
    }
    "accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ia, ja);
        properties[b] = new PropertyInfoRecord(
          b,
          1,
          false,
          a,
          null,
          false,
          false
        );
      });
    "xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type"
      .split(" ")
      .forEach(function (a) {
        var b = a.replace(ia, ja);
        properties[b] = new PropertyInfoRecord(
          b,
          1,
          false,
          a,
          "http://www.w3.org/1999/xlink",
          false,
          false
        );
      });
    ["xml:base", "xml:lang", "xml:space"].forEach(function (a) {
      var b = a.replace(ia, ja);
      properties[b] = new PropertyInfoRecord(
        b,
        1,
        false,
        a,
        "http://www.w3.org/XML/1998/namespace",
        false,
        false
      );
    });
    ["tabIndex", "crossOrigin"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        1,
        false,
        a.toLowerCase(),
        null,
        false,
        false
      );
    });
    properties.xlinkHref = new PropertyInfoRecord(
      "xlinkHref",
      1,
      false,
      "xlink:href",
      "http://www.w3.org/1999/xlink",
      true,
      false
    );
    ["src", "href", "action", "formAction"].forEach(function (a) {
      properties[a] = new PropertyInfoRecord(
        a,
        1,
        false,
        a.toLowerCase(),
        null,
        true,
        true
      );
    });
    var isUnitlessNumber = {
      animationIterationCount: true,
      aspectRatio: true,
      borderImageOutset: true,
      borderImageSlice: true,
      borderImageWidth: true,
      boxFlex: true,
      boxFlexGroup: true,
      boxOrdinalGroup: true,
      columnCount: true,
      columns: true,
      flex: true,
      flexGrow: true,
      flexPositive: true,
      flexShrink: true,
      flexNegative: true,
      flexOrder: true,
      gridArea: true,
      gridRow: true,
      gridRowEnd: true,
      gridRowSpan: true,
      gridRowStart: true,
      gridColumn: true,
      gridColumnEnd: true,
      gridColumnSpan: true,
      gridColumnStart: true,
      fontWeight: true,
      lineClamp: true,
      lineHeight: true,
      opacity: true,
      order: true,
      orphans: true,
      tabSize: true,
      widows: true,
      zIndex: true,
      zoom: true,
      fillOpacity: true,
      floodOpacity: true,
      stopOpacity: true,
      strokeDasharray: true,
      strokeDashoffset: true,
      strokeMiterlimit: true,
      strokeOpacity: true,
      strokeWidth: true,
    };
    var prefixes = ["Webkit", "ms", "Moz", "O"];
    Object.keys(isUnitlessNumber).forEach(function (a) {
      prefixes.forEach(function (b) {
        b = b + a.charAt(0).toUpperCase() + a.substring(1);
        isUnitlessNumber[b] = isUnitlessNumber[a];
      });
    });
    var matchHtmlRegExp = /["'&<>]/;
    function escapeTextForBrowser(text) {
      if ("boolean" === typeof text || "number" === typeof text)
        return "" + text;
      // escapeHtml
      text = "" + text;
      var b = matchHtmlRegExp.exec(text);
      if (b) {
        var c = "",
          d,
          f = 0;
        for (d = b.index; d < text.length; d++) {
          switch (text.charCodeAt(d)) {
            case 34:
              b = "&quot;";
              break;
            case 38:
              b = "&amp;";
              break;
            case 39:
              b = "&#x27;";
              break;
            case 60:
              b = "&lt;";
              break;
            case 62:
              b = "&gt;";
              break;
            default:
              continue;
          }
          f !== d && (c += text.substring(f, d));
          f = d + 1;
          c += b;
        }
        text = f !== d ? c + text.substring(f, d) : c;
      }
      return text;
    }
    var uppercasePattern = /([A-Z])/g;
    var msPattern$1 = /^ms-/;
    var isArrayImpl = Array.isArray;
    var startInlineScript = stringToPrecomputedChunk("<script>");
    var endInlineScript = stringToPrecomputedChunk("</script>");
    var startScriptSrc = stringToPrecomputedChunk('<script src="');
    var startModuleSrc = stringToPrecomputedChunk(
      '<script type="module" src="'
    );
    var endAsyncScript = stringToPrecomputedChunk('" async=""></script>');
    var scriptRegex = /(<\/|<)(s)(cript)/gi;
    function scriptReplacer(a, prefix2, s, suffix) {
      return "" + prefix2 + ("s" === s ? "\\u0073" : "\\u0053") + suffix;
    }
    function createFormatContext(a, b) {
      return { insertionMode: a, selectedValue: b };
    }
    function getChildFormatContext(a, b, c) {
      switch (b) {
        case "select":
          return createFormatContext(
            1,
            null != c.value ? c.value : c.defaultValue
          );
        case "svg":
          return createFormatContext(2, null);
        case "math":
          return createFormatContext(3, null);
        case "foreignObject":
          return createFormatContext(1, null);
        case "table":
          return createFormatContext(4, null);
        case "thead":
        case "tbody":
        case "tfoot":
          return createFormatContext(5, null);
        case "colgroup":
          return createFormatContext(7, null);
        case "tr":
          return createFormatContext(6, null);
      }
      return 4 <= a.insertionMode || 0 === a.insertionMode
        ? createFormatContext(1, null)
        : a;
    }
    var textSeparator = stringToPrecomputedChunk("<!-- -->");
    function pushTextInstance(target, text, c, textEmbedded) {
      if ("" === text) return textEmbedded;
      textEmbedded && target.push(textSeparator);
      target.push(escapeTextForBrowser(text));
      return true;
    }
    var styleNameCache = /* @__PURE__ */ new Map();
    var styleAttributeStart = stringToPrecomputedChunk(' style="');
    var styleAssign = stringToPrecomputedChunk(":");
    var styleSeparator = stringToPrecomputedChunk(";");
    function pushStyle(target, _responseState, style) {
      if ("object" !== typeof style)
        throw Error(
          "The `style` prop expects a mapping from style properties to values, not a string. For example, style={{marginRight: spacing + 'em'}} when using JSX."
        );
      var isFirst = true;
      for (var d in style)
        if (hasOwnProperty.call(style, d)) {
          var valueChunk = style[d];
          if (
            null != valueChunk &&
            "boolean" !== typeof valueChunk &&
            "" !== valueChunk
          ) {
            if (0 === d.indexOf("--")) {
              var nameChunk = escapeTextForBrowser(d);
              valueChunk = escapeTextForBrowser(("" + valueChunk).trim());
            } else {
              nameChunk = d;
              var g = styleNameCache.get(nameChunk);
              void 0 !== g
                ? (nameChunk = g)
                : ((g = stringToPrecomputedChunk(
                    escapeTextForBrowser(
                      nameChunk
                        .replace(uppercasePattern, "-$1")
                        .toLowerCase()
                        .replace(msPattern$1, "-ms-")
                    )
                  )),
                  styleNameCache.set(nameChunk, g),
                  (nameChunk = g));
              valueChunk =
                "number" === typeof valueChunk
                  ? 0 === valueChunk || hasOwnProperty.call(isUnitlessNumber, d)
                    ? "" + valueChunk
                    : valueChunk + "px"
                  : escapeTextForBrowser(("" + valueChunk).trim());
            }
            isFirst
              ? ((isFirst = false),
                target.push(
                  styleAttributeStart,
                  nameChunk,
                  styleAssign,
                  valueChunk
                ))
              : target.push(styleSeparator, nameChunk, styleAssign, valueChunk);
          }
        }
      isFirst || target.push(attributeEnd);
    }
    var attributeSeparator = stringToPrecomputedChunk(" ");
    var attributeAssign = stringToPrecomputedChunk('="');
    var attributeEnd = stringToPrecomputedChunk('"');
    var attributeEmptyString = stringToPrecomputedChunk('=""');
    function pushAttribute(target, responseState, name, value) {
      switch (name) {
        case "style":
          pushStyle(target, responseState, value);
          return;
        case "defaultValue":
        case "defaultChecked":
        case "innerHTML":
        case "suppressContentEditableWarning":
        case "suppressHydrationWarning":
          return;
      }
      if (
        !(2 < name.length) ||
        ("o" !== name[0] && "O" !== name[0]) ||
        ("n" !== name[1] && "N" !== name[1])
      ) {
        if (
          ((responseState = properties.hasOwnProperty(name)
            ? properties[name]
            : null),
          null !== responseState)
        ) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (!responseState.acceptsBooleans) return;
          }
          name = responseState.attributeName;
          switch (responseState.type) {
            case 3:
              value &&
                target.push(attributeSeparator, name, attributeEmptyString);
              break;
            case 4:
              true === value
                ? target.push(attributeSeparator, name, attributeEmptyString)
                : false !== value &&
                  target.push(
                    attributeSeparator,
                    name,
                    attributeAssign,
                    escapeTextForBrowser(value),
                    attributeEnd
                  );
              break;
            case 5:
              isNaN(value) ||
                target.push(
                  attributeSeparator,
                  name,
                  attributeAssign,
                  escapeTextForBrowser(value),
                  attributeEnd
                );
              break;
            case 6:
              !isNaN(value) &&
                1 <= value &&
                target.push(
                  attributeSeparator,
                  name,
                  attributeAssign,
                  escapeTextForBrowser(value),
                  attributeEnd
                );
              break;
            default:
              responseState.sanitizeURL && (value = "" + value),
                target.push(
                  attributeSeparator,
                  name,
                  attributeAssign,
                  escapeTextForBrowser(value),
                  attributeEnd
                );
          }
        } else if (isAttributeNameSafe(name)) {
          switch (typeof value) {
            case "function":
            case "symbol":
              return;
            case "boolean":
              if (
                ((responseState = name.toLowerCase().slice(0, 5)),
                "data-" !== responseState && "aria-" !== responseState)
              )
                return;
          }
          target.push(
            attributeSeparator,
            name,
            attributeAssign,
            escapeTextForBrowser(value),
            attributeEnd
          );
        }
      }
    }
    var endOfStartTag = stringToPrecomputedChunk(">");
    var endOfStartTagSelfClosing = stringToPrecomputedChunk("/>");
    function pushInnerHTML(target, innerHTML, children) {
      if (null != innerHTML) {
        if (null != children)
          throw Error(
            "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
          );
        if ("object" !== typeof innerHTML || !("__html" in innerHTML))
          throw Error(
            "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information."
          );
        innerHTML = innerHTML.__html;
        null !== innerHTML &&
          void 0 !== innerHTML &&
          target.push("" + innerHTML);
      }
    }
    function flattenOptionChildren(a) {
      var content = "";
      React.Children.forEach(a, function (a2) {
        null != a2 && (content += a2);
      });
      return content;
    }
    var selectedMarkerAttribute = stringToPrecomputedChunk(' selected=""');
    function pushStartGenericElement(a, b, c, d) {
      a.push(startChunkForTag(c));
      var f = (c = null),
        e;
      for (e in b)
        if (hasOwnProperty.call(b, e)) {
          var g = b[e];
          if (null != g)
            switch (e) {
              case "children":
                c = g;
                break;
              case "dangerouslySetInnerHTML":
                f = g;
                break;
              default:
                pushAttribute(a, d, e, g);
            }
        }
      a.push(endOfStartTag);
      pushInnerHTML(a, f, c);
      return "string" === typeof c
        ? (a.push(escapeTextForBrowser(c)), null)
        : c;
    }
    var leadingNewline = stringToPrecomputedChunk("\n");
    var VALID_TAG_REGEX = /^[a-zA-Z][a-zA-Z:_\.\-\d]*$/;
    var validatedTagCache = /* @__PURE__ */ new Map();
    function startChunkForTag(a) {
      var b = validatedTagCache.get(a);
      if (void 0 === b) {
        if (!VALID_TAG_REGEX.test(a)) throw Error("Invalid tag: " + a);
        b = stringToPrecomputedChunk("<" + a);
        validatedTagCache.set(a, b);
      }
      return b;
    }
    var DOCTYPE = stringToPrecomputedChunk("<!DOCTYPE html>");
    function pushStartInstance(a, b, c, d, f) {
      switch (b) {
        case "select":
          a.push(startChunkForTag("select"));
          var e = null,
            g = null;
          for (p in c)
            if (hasOwnProperty.call(c, p)) {
              var h = c[p];
              if (null != h)
                switch (p) {
                  case "children":
                    e = h;
                    break;
                  case "dangerouslySetInnerHTML":
                    g = h;
                    break;
                  case "defaultValue":
                  case "value":
                    break;
                  default:
                    pushAttribute(a, d, p, h);
                }
            }
          a.push(endOfStartTag);
          pushInnerHTML(a, g, e);
          return e;
        case "option":
          g = f.selectedValue;
          a.push(startChunkForTag("option"));
          var m = (h = null),
            n = null;
          var p = null;
          for (e in c)
            if (hasOwnProperty.call(c, e)) {
              var v = c[e];
              if (null != v)
                switch (e) {
                  case "children":
                    h = v;
                    break;
                  case "selected":
                    n = v;
                    break;
                  case "dangerouslySetInnerHTML":
                    p = v;
                    break;
                  case "value":
                    m = v;
                  default:
                    pushAttribute(a, d, e, v);
                }
            }
          if (null != g)
            if (
              ((c = null !== m ? "" + m : flattenOptionChildren(h)),
              isArrayImpl(g))
            )
              for (d = 0; d < g.length; d++) {
                if ("" + g[d] === c) {
                  a.push(selectedMarkerAttribute);
                  break;
                }
              }
            else "" + g === c && a.push(selectedMarkerAttribute);
          else n && a.push(selectedMarkerAttribute);
          a.push(endOfStartTag);
          pushInnerHTML(a, p, h);
          return h;
        case "textarea":
          a.push(startChunkForTag("textarea"));
          p = g = e = null;
          for (h in c)
            if (hasOwnProperty.call(c, h) && ((m = c[h]), null != m))
              switch (h) {
                case "children":
                  p = m;
                  break;
                case "value":
                  e = m;
                  break;
                case "defaultValue":
                  g = m;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(
                    "`dangerouslySetInnerHTML` does not make sense on <textarea>."
                  );
                default:
                  pushAttribute(a, d, h, m);
              }
          null === e && null !== g && (e = g);
          a.push(endOfStartTag);
          if (null != p) {
            if (null != e)
              throw Error(
                "If you supply `defaultValue` on a <textarea>, do not pass children."
              );
            if (isArrayImpl(p) && 1 < p.length)
              throw Error("<textarea> can only have at most one child.");
            e = "" + p;
          }
          "string" === typeof e && "\n" === e[0] && a.push(leadingNewline);
          null !== e && a.push(escapeTextForBrowser("" + e));
          return null;
        case "input":
          a.push(startChunkForTag("input"));
          m = p = h = e = null;
          for (g in c)
            if (hasOwnProperty.call(c, g) && ((n = c[g]), null != n))
              switch (g) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    "input is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                case "defaultChecked":
                  m = n;
                  break;
                case "defaultValue":
                  h = n;
                  break;
                case "checked":
                  p = n;
                  break;
                case "value":
                  e = n;
                  break;
                default:
                  pushAttribute(a, d, g, n);
              }
          null !== p
            ? pushAttribute(a, d, "checked", p)
            : null !== m && pushAttribute(a, d, "checked", m);
          null !== e
            ? pushAttribute(a, d, "value", e)
            : null !== h && pushAttribute(a, d, "value", h);
          a.push(endOfStartTagSelfClosing);
          return null;
        case "menuitem":
          a.push(startChunkForTag("menuitem"));
          for (var C in c)
            if (hasOwnProperty.call(c, C) && ((e = c[C]), null != e))
              switch (C) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    "menuitems cannot have `children` nor `dangerouslySetInnerHTML`."
                  );
                default:
                  pushAttribute(a, d, C, e);
              }
          a.push(endOfStartTag);
          return null;
        case "title":
          a.push(startChunkForTag("title"));
          e = null;
          for (v in c)
            if (hasOwnProperty.call(c, v) && ((g = c[v]), null != g))
              switch (v) {
                case "children":
                  e = g;
                  break;
                case "dangerouslySetInnerHTML":
                  throw Error(
                    "`dangerouslySetInnerHTML` does not make sense on <title>."
                  );
                default:
                  pushAttribute(a, d, v, g);
              }
          a.push(endOfStartTag);
          return e;
        case "listing":
        case "pre":
          a.push(startChunkForTag(b));
          g = e = null;
          for (m in c)
            if (hasOwnProperty.call(c, m) && ((h = c[m]), null != h))
              switch (m) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                default:
                  pushAttribute(a, d, m, h);
              }
          a.push(endOfStartTag);
          if (null != g) {
            if (null != e)
              throw Error(
                "Can only set one of `children` or `props.dangerouslySetInnerHTML`."
              );
            if ("object" !== typeof g || !("__html" in g))
              throw Error(
                "`props.dangerouslySetInnerHTML` must be in the form `{__html: ...}`. Please visit https://reactjs.org/link/dangerously-set-inner-html for more information."
              );
            c = g.__html;
            null !== c &&
              void 0 !== c &&
              ("string" === typeof c && 0 < c.length && "\n" === c[0]
                ? a.push(leadingNewline, c)
                : a.push("" + c));
          }
          "string" === typeof e && "\n" === e[0] && a.push(leadingNewline);
          return e;
        case "area":
        case "base":
        case "br":
        case "col":
        case "embed":
        case "hr":
        case "img":
        case "keygen":
        case "link":
        case "meta":
        case "param":
        case "source":
        case "track":
        case "wbr":
          a.push(startChunkForTag(b));
          for (var D in c)
            if (hasOwnProperty.call(c, D) && ((e = c[D]), null != e))
              switch (D) {
                case "children":
                case "dangerouslySetInnerHTML":
                  throw Error(
                    b +
                      " is a self-closing tag and must neither have `children` nor use `dangerouslySetInnerHTML`."
                  );
                default:
                  pushAttribute(a, d, D, e);
              }
          a.push(endOfStartTagSelfClosing);
          return null;
        case "annotation-xml":
        case "color-profile":
        case "font-face":
        case "font-face-src":
        case "font-face-uri":
        case "font-face-format":
        case "font-face-name":
        case "missing-glyph":
          return pushStartGenericElement(a, c, b, d);
        case "html":
          return (
            0 === f.insertionMode && a.push(DOCTYPE),
            pushStartGenericElement(a, c, b, d)
          );
        default:
          if (-1 === b.indexOf("-") && "string" !== typeof c.is)
            return pushStartGenericElement(a, c, b, d);
          a.push(startChunkForTag(b));
          g = e = null;
          for (n in c)
            if (hasOwnProperty.call(c, n) && ((h = c[n]), null != h))
              switch (n) {
                case "children":
                  e = h;
                  break;
                case "dangerouslySetInnerHTML":
                  g = h;
                  break;
                case "style":
                  pushStyle(a, d, h);
                  break;
                case "suppressContentEditableWarning":
                case "suppressHydrationWarning":
                  break;
                default:
                  isAttributeNameSafe(n) &&
                    "function" !== typeof h &&
                    "symbol" !== typeof h &&
                    a.push(
                      attributeSeparator,
                      n,
                      attributeAssign,
                      escapeTextForBrowser(h),
                      attributeEnd
                    );
              }
          a.push(endOfStartTag);
          pushInnerHTML(a, g, e);
          return e;
      }
    }
    var Qa = stringToPrecomputedChunk("</");
    var Ra = stringToPrecomputedChunk(">");
    var placeholder1 = stringToPrecomputedChunk('<template id="');
    var placeholder2 = stringToPrecomputedChunk('"></template>');
    var Ua = stringToPrecomputedChunk("<!--$-->");
    var Va = stringToPrecomputedChunk('<!--$?--><template id="');
    var Wa = stringToPrecomputedChunk('"></template>');
    var Xa = stringToPrecomputedChunk("<!--$!-->");
    var Ya = stringToPrecomputedChunk("<!--/$-->");
    var Za = stringToPrecomputedChunk("<template");
    var $a = stringToPrecomputedChunk('"');
    var ab = stringToPrecomputedChunk(' data-dgst="');
    stringToPrecomputedChunk(' data-msg="');
    stringToPrecomputedChunk(' data-stck="');
    var bb = stringToPrecomputedChunk("></template>");
    function writeStartPendingSuspenseBoundary(a, b, c) {
      writeChunk(a, Va);
      if (null === c)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      writeChunk(a, c);
      return writeChunkAndReturn(a, Wa);
    }
    var db = stringToPrecomputedChunk('<div hidden id="');
    var eb = stringToPrecomputedChunk('">');
    var fb = stringToPrecomputedChunk("</div>");
    var gb = stringToPrecomputedChunk(
      '<svg aria-hidden="true" style="display:none" id="'
    );
    var hb = stringToPrecomputedChunk('">');
    var ib = stringToPrecomputedChunk("</svg>");
    var jb = stringToPrecomputedChunk(
      '<math aria-hidden="true" style="display:none" id="'
    );
    var kb = stringToPrecomputedChunk('">');
    var lb = stringToPrecomputedChunk("</math>");
    var mb = stringToPrecomputedChunk('<table hidden id="');
    var nb = stringToPrecomputedChunk('">');
    var ob = stringToPrecomputedChunk("</table>");
    var pb = stringToPrecomputedChunk('<table hidden><tbody id="');
    var qb = stringToPrecomputedChunk('">');
    var rb = stringToPrecomputedChunk("</tbody></table>");
    var sb = stringToPrecomputedChunk('<table hidden><tr id="');
    var tb = stringToPrecomputedChunk('">');
    var ub = stringToPrecomputedChunk("</tr></table>");
    var vb = stringToPrecomputedChunk('<table hidden><colgroup id="');
    var wb = stringToPrecomputedChunk('">');
    var xb = stringToPrecomputedChunk("</colgroup></table>");
    function writeStartSegment(a, b, c, d) {
      switch (c.insertionMode) {
        case 0:
        case 1:
          return (
            writeChunk(a, db),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, eb)
          );
        case 2:
          return (
            writeChunk(a, gb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, hb)
          );
        case 3:
          return (
            writeChunk(a, jb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, kb)
          );
        case 4:
          return (
            writeChunk(a, mb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, nb)
          );
        case 5:
          return (
            writeChunk(a, pb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, qb)
          );
        case 6:
          return (
            writeChunk(a, sb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, tb)
          );
        case 7:
          return (
            writeChunk(a, vb),
            writeChunk(a, b.segmentPrefix),
            writeChunk(a, d.toString(16)),
            writeChunkAndReturn(a, wb)
          );
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    function writeEndSegment(a, b) {
      switch (b.insertionMode) {
        case 0:
        case 1:
          return writeChunkAndReturn(a, fb);
        case 2:
          return writeChunkAndReturn(a, ib);
        case 3:
          return writeChunkAndReturn(a, lb);
        case 4:
          return writeChunkAndReturn(a, ob);
        case 5:
          return writeChunkAndReturn(a, rb);
        case 6:
          return writeChunkAndReturn(a, ub);
        case 7:
          return writeChunkAndReturn(a, xb);
        default:
          throw Error("Unknown insertion mode. This is a bug in React.");
      }
    }
    var Ab = stringToPrecomputedChunk(
      'function $RS(a,b){a=document.getElementById(a);b=document.getElementById(b);for(a.parentNode.removeChild(a);a.firstChild;)b.parentNode.insertBefore(a.firstChild,b);b.parentNode.removeChild(b)};$RS("'
    );
    var Bb = stringToPrecomputedChunk('$RS("');
    var Cb = stringToPrecomputedChunk('","');
    var Db = stringToPrecomputedChunk('")</script>');
    var Fb = stringToPrecomputedChunk(
      'function $RC(a,b){a=document.getElementById(a);b=document.getElementById(b);b.parentNode.removeChild(b);if(a){a=a.previousSibling;var f=a.parentNode,c=a.nextSibling,e=0;do{if(c&&8===c.nodeType){var d=c.data;if("/$"===d)if(0===e)break;else e--;else"$"!==d&&"$?"!==d&&"$!"!==d||e++}d=c.nextSibling;f.removeChild(c);c=d}while(c);for(;b.firstChild;)f.insertBefore(b.firstChild,c);a.data="$";a._reactRetry&&a._reactRetry()}};$RC("'
    );
    var Gb = stringToPrecomputedChunk('$RC("');
    var Hb = stringToPrecomputedChunk('","');
    var Ib = stringToPrecomputedChunk('")</script>');
    var Jb = stringToPrecomputedChunk(
      'function $RX(b,c,d,e){var a=document.getElementById(b);a&&(b=a.previousSibling,b.data="$!",a=a.dataset,c&&(a.dgst=c),d&&(a.msg=d),e&&(a.stck=e),b._reactRetry&&b._reactRetry())};$RX("'
    );
    var Kb = stringToPrecomputedChunk('$RX("');
    var Lb = stringToPrecomputedChunk('"');
    var Mb = stringToPrecomputedChunk(")</script>");
    var Nb = stringToPrecomputedChunk(",");
    var regexForJSStringsInScripts = /[<\u2028\u2029]/g;
    function escapeJSStringsForInstructionScripts(a) {
      return JSON.stringify(a).replace(
        regexForJSStringsInScripts,
        function (a2) {
          switch (a2) {
            case "<":
              return "\\u003c";
            case "\u2028":
              return "\\u2028";
            case "\u2029":
              return "\\u2029";
            default:
              throw Error(
                "escapeJSStringsForInstructionScripts encountered a match it does not know how to replace. this means the match regex and the replacement characters are no longer in sync. This is a bug in React"
              );
          }
        }
      );
    }
    var assign = Object.assign;
    var REACT_ELEMENT_TYPE = Symbol.for("react.element");
    var REACT_PORTAL_TYPE = Symbol.for("react.portal");
    var REACT_FRAGMENT_TYPE = Symbol.for("react.fragment");
    var REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode");
    var REACT_PROFILER_TYPE = Symbol.for("react.profiler");
    var REACT_PROVIDER_TYPE = Symbol.for("react.provider");
    var REACT_CONTEXT_TYPE = Symbol.for("react.context");
    var REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref");
    var REACT_SUSPENSE_TYPE = Symbol.for("react.suspense");
    var REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list");
    var REACT_MEMO_TYPE = Symbol.for("react.memo");
    var REACT_LAZY_TYPE = Symbol.for("react.lazy");
    var REACT_SCOPE_TYPE = Symbol.for("react.scope");
    var REACT_DEBUG_TRACING_MODE_TYPE = Symbol.for("react.debug_trace_mode");
    var REACT_LEGACY_HIDDEN_TYPE = Symbol.for("react.legacy_hidden");
    var ec = Symbol.for("react.default_value");
    var fc = Symbol.iterator;
    function getComponentNameFromType(a) {
      if (null == a) return null;
      if ("function" === typeof a) return a.displayName || a.name || null;
      if ("string" === typeof a) return a;
      switch (a) {
        case REACT_FRAGMENT_TYPE:
          return "Fragment";
        case REACT_PORTAL_TYPE:
          return "Portal";
        case REACT_PROFILER_TYPE:
          return "Profiler";
        case REACT_STRICT_MODE_TYPE:
          return "StrictMode";
        case REACT_SUSPENSE_TYPE:
          return "Suspense";
        case REACT_SUSPENSE_LIST_TYPE:
          return "SuspenseList";
      }
      if ("object" === typeof a)
        switch (a.$$typeof) {
          case REACT_CONTEXT_TYPE:
            return (a.displayName || "Context") + ".Consumer";
          case REACT_PROVIDER_TYPE:
            return (a._context.displayName || "Context") + ".Provider";
          case REACT_FORWARD_REF_TYPE:
            var b = a.render;
            a = a.displayName;
            a ||
              ((a = b.displayName || b.name || ""),
              (a = "" !== a ? "ForwardRef(" + a + ")" : "ForwardRef"));
            return a;
          case REACT_MEMO_TYPE:
            return (
              (b = a.displayName || null),
              null !== b ? b : getComponentNameFromType(a.type) || "Memo"
            );
          case REACT_LAZY_TYPE:
            b = a._payload;
            a = a._init;
            try {
              return getComponentNameFromType(a(b));
            } catch (c) {}
        }
      return null;
    }
    var emptyContextObject = {};
    function getMaskedContext(a, b) {
      a = a.contextTypes;
      if (!a) return emptyContextObject;
      var c = {},
        d;
      for (d in a) c[d] = b[d];
      return c;
    }
    var currentActiveSnapshot = null;
    function popToNearestCommonAncestor(a, b) {
      if (a !== b) {
        a.context._currentValue = a.parentValue;
        a = a.parent;
        var c = b.parent;
        if (null === a) {
          if (null !== c)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
        } else {
          if (null === c)
            throw Error(
              "The stacks must reach the root at the same time. This is a bug in React."
            );
          popToNearestCommonAncestor(a, c);
        }
        b.context._currentValue = b.value;
      }
    }
    function popAllPrevious(a) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      null !== a && popAllPrevious(a);
    }
    function pushAllNext(a) {
      var b = a.parent;
      null !== b && pushAllNext(b);
      a.context._currentValue = a.value;
    }
    function popPreviousToCommonLevel(a, b) {
      a.context._currentValue = a.parentValue;
      a = a.parent;
      if (null === a)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      a.depth === b.depth
        ? popToNearestCommonAncestor(a, b)
        : popPreviousToCommonLevel(a, b);
    }
    function popNextToCommonLevel(a, b) {
      var c = b.parent;
      if (null === c)
        throw Error(
          "The depth must equal at least at zero before reaching the root. This is a bug in React."
        );
      a.depth === c.depth
        ? popToNearestCommonAncestor(a, c)
        : popNextToCommonLevel(a, c);
      b.context._currentValue = b.value;
    }
    function switchContext(next) {
      var prev = currentActiveSnapshot;
      prev !== next &&
        (null === prev
          ? pushAllNext(next)
          : null === next
          ? popAllPrevious(prev)
          : prev.depth === next.depth
          ? popToNearestCommonAncestor(prev, next)
          : prev.depth > next.depth
          ? popPreviousToCommonLevel(prev, next)
          : popNextToCommonLevel(prev, next),
        (currentActiveSnapshot = next));
    }
    var classComponentUpdater = {
      isMounted: function () {
        return false;
      },
      enqueueSetState: function (a, b) {
        a = a._reactInternals;
        null !== a.queue && a.queue.push(b);
      },
      enqueueReplaceState: function (a, b) {
        a = a._reactInternals;
        a.replace = true;
        a.queue = [b];
      },
      enqueueForceUpdate: function () {},
    };
    function pc(a, b, c, d) {
      var f = void 0 !== a.state ? a.state : null;
      a.updater = classComponentUpdater;
      a.props = c;
      a.state = f;
      var e = { queue: [], replace: false };
      a._reactInternals = e;
      var g = b.contextType;
      a.context = "object" === typeof g && null !== g ? g._currentValue : d;
      g = b.getDerivedStateFromProps;
      "function" === typeof g &&
        ((g = g(c, f)),
        (f = null === g || void 0 === g ? f : assign({}, f, g)),
        (a.state = f));
      if (
        "function" !== typeof b.getDerivedStateFromProps &&
        "function" !== typeof a.getSnapshotBeforeUpdate &&
        ("function" === typeof a.UNSAFE_componentWillMount ||
          "function" === typeof a.componentWillMount)
      )
        if (
          ((b = a.state),
          "function" === typeof a.componentWillMount && a.componentWillMount(),
          "function" === typeof a.UNSAFE_componentWillMount &&
            a.UNSAFE_componentWillMount(),
          b !== a.state &&
            classComponentUpdater.enqueueReplaceState(a, a.state, null),
          null !== e.queue && 0 < e.queue.length)
        )
          if (
            ((b = e.queue),
            (g = e.replace),
            (e.queue = null),
            (e.replace = false),
            g && 1 === b.length)
          )
            a.state = b[0];
          else {
            e = g ? b[0] : a.state;
            f = true;
            for (g = g ? 1 : 0; g < b.length; g++) {
              var h = b[g];
              h = "function" === typeof h ? h.call(a, e, c, d) : h;
              null != h &&
                (f ? ((f = false), (e = assign({}, e, h))) : assign(e, h));
            }
            a.state = e;
          }
        else e.queue = null;
    }
    var qc = { id: 1, overflow: "" };
    function pushTreeContext(a, b, c) {
      var d = a.id;
      a = a.overflow;
      var f = 32 - sc(d) - 1;
      d &= ~(1 << f);
      c += 1;
      var e = 32 - sc(b) + f;
      if (30 < e) {
        var g = f - (f % 5);
        e = (d & ((1 << g) - 1)).toString(32);
        d >>= g;
        f -= g;
        return { id: (1 << (32 - sc(b) + f)) | (c << f) | d, overflow: e + a };
      }
      return { id: (1 << e) | (c << f) | d, overflow: a };
    }
    var sc = Math.clz32 ? Math.clz32 : tc;
    var uc = Math.log;
    var vc = Math.LN2;
    function tc(a) {
      a >>>= 0;
      return 0 === a ? 32 : (31 - ((uc(a) / vc) | 0)) | 0;
    }
    function wc(a, b) {
      return (a === b && (0 !== a || 1 / a === 1 / b)) || (a !== a && b !== b);
    }
    var xc = "function" === typeof Object.is ? Object.is : wc;
    var currentlyRenderingComponent = null;
    var yc = null;
    var zc = null;
    var workInProgressHook = null;
    var T = false;
    var didScheduleRenderPhaseUpdate = false;
    var localIdCounter = 0;
    var renderPhaseUpdates = null;
    var numberOfReRenders = 0;
    function resolveCurrentlyRenderingComponent() {
      if (null === currentlyRenderingComponent)
        throw Error(
          "Invalid hook call. Hooks can only be called inside of the body of a function component. This could happen for one of the following reasons:\n1. You might have mismatching versions of React and the renderer (such as React DOM)\n2. You might be breaking the Rules of Hooks\n3. You might have more than one copy of React in the same app\nSee https://reactjs.org/link/invalid-hook-call for tips about how to debug and fix this problem."
        );
      return currentlyRenderingComponent;
    }
    function Cc() {
      if (0 < numberOfReRenders)
        throw Error("Rendered more hooks than during the previous render");
      return { memoizedState: null, queue: null, next: null };
    }
    function createWorkInProgressHook() {
      null === workInProgressHook
        ? null === zc
          ? ((T = false), (zc = workInProgressHook = Cc()))
          : ((T = true), (workInProgressHook = zc))
        : null === workInProgressHook.next
        ? ((T = false), (workInProgressHook = workInProgressHook.next = Cc()))
        : ((T = true), (workInProgressHook = workInProgressHook.next));
      return workInProgressHook;
    }
    function resetHooksState() {
      yc = currentlyRenderingComponent = null;
      didScheduleRenderPhaseUpdate = false;
      zc = null;
      numberOfReRenders = 0;
      workInProgressHook = renderPhaseUpdates = null;
    }
    function basicStateReducer(a, b) {
      return "function" === typeof b ? b(a) : b;
    }
    function useReducer(a, b, c) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      if (T) {
        var d = workInProgressHook.queue;
        b = d.dispatch;
        if (
          null !== renderPhaseUpdates &&
          ((c = renderPhaseUpdates.get(d)), void 0 !== c)
        ) {
          renderPhaseUpdates.delete(d);
          d = workInProgressHook.memoizedState;
          do (d = a(d, c.action)), (c = c.next);
          while (null !== c);
          workInProgressHook.memoizedState = d;
          return [d, b];
        }
        return [workInProgressHook.memoizedState, b];
      }
      a =
        a === basicStateReducer
          ? "function" === typeof b
            ? b()
            : b
          : void 0 !== c
          ? c(b)
          : b;
      workInProgressHook.memoizedState = a;
      a = workInProgressHook.queue = { last: null, dispatch: null };
      a = a.dispatch = dispatchAction.bind(
        null,
        currentlyRenderingComponent,
        a
      );
      return [workInProgressHook.memoizedState, a];
    }
    function useMemo(nextCreate, deps) {
      currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
      workInProgressHook = createWorkInProgressHook();
      deps = void 0 === deps ? null : deps;
      if (null !== workInProgressHook) {
        var c = workInProgressHook.memoizedState;
        if (null !== c && null !== deps) {
          var d = c[1];
          a: if (null === d) d = false;
          else {
            for (var f = 0; f < d.length && f < deps.length; f++)
              if (!xc(deps[f], d[f])) {
                d = false;
                break a;
              }
            d = true;
          }
          if (d) return c[0];
        }
      }
      nextCreate = nextCreate();
      workInProgressHook.memoizedState = [nextCreate, deps];
      return nextCreate;
    }
    function dispatchAction(componentIdentity, queue, action) {
      if (25 <= numberOfReRenders)
        throw Error(
          "Too many re-renders. React limits the number of renders to prevent an infinite loop."
        );
      if (componentIdentity === currentlyRenderingComponent)
        if (
          ((didScheduleRenderPhaseUpdate = true),
          (componentIdentity = { action: action, next: null }),
          null === renderPhaseUpdates &&
            (renderPhaseUpdates = /* @__PURE__ */ new Map()),
          (action = renderPhaseUpdates.get(queue)),
          void 0 === action)
        )
          renderPhaseUpdates.set(queue, componentIdentity);
        else {
          for (queue = action; null !== queue.next; ) queue = queue.next;
          queue.next = componentIdentity;
        }
    }
    function unsupportedStartTransition() {
      throw Error("startTransition cannot be called during server rendering.");
    }
    function noop() {}
    var Dispatcher = {
      readContext: function (a) {
        return a._currentValue;
      },
      useContext: function (a) {
        resolveCurrentlyRenderingComponent();
        return a._currentValue;
      },
      useMemo: useMemo,
      useReducer: useReducer,
      useRef: function (a) {
        currentlyRenderingComponent = resolveCurrentlyRenderingComponent();
        workInProgressHook = createWorkInProgressHook();
        var b = workInProgressHook.memoizedState;
        return null === b
          ? ((a = { current: a }), (workInProgressHook.memoizedState = a))
          : b;
      },
      useState: function (a) {
        return useReducer(basicStateReducer, a);
      },
      useInsertionEffect: noop,
      useLayoutEffect: function () {},
      useCallback: function (a, b) {
        return useMemo(function () {
          return a;
        }, b);
      },
      useImperativeHandle: noop,
      useEffect: noop,
      useDebugValue: noop,
      useDeferredValue: function (a) {
        resolveCurrentlyRenderingComponent();
        return a;
      },
      useTransition: function () {
        resolveCurrentlyRenderingComponent();
        return [false, unsupportedStartTransition];
      },
      useId: function () {
        var a = yc.treeContext;
        var b = a.overflow;
        a = a.id;
        a = (a & ~(1 << (32 - sc(a) - 1))).toString(32) + b;
        var c = currentResponseState;
        if (null === c)
          throw Error(
            "Invalid hook call. Hooks can only be called inside of the body of a function component."
          );
        b = localIdCounter++;
        a = ":" + c.idPrefix + "R" + a;
        0 < b && (a += "H" + b.toString(32));
        return a + ":";
      },
      useMutableSource: function (a, b) {
        resolveCurrentlyRenderingComponent();
        return b(a._source);
      },
      useSyncExternalStore: function (a, b, c) {
        if (void 0 === c)
          throw Error(
            "Missing getServerSnapshot, which is required for server-rendered content. Will revert to client rendering."
          );
        return c();
      },
    };
    var currentResponseState = null;
    var ReactCurrentDispatcher$1 =
      React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED
        .ReactCurrentDispatcher;
    function Oc(a) {
      console.error(a);
      return null;
    }
    function X() {}
    function pingTask(request, task) {
      var c = request.pingedTasks;
      c.push(task);
      1 === c.length &&
        queueMicrotask(function scheduleWorkCallback() {
          return performWork(request);
        });
    }
    function createTask(a, b, c, d, f, e, g, h) {
      a.allPendingTasks++;
      null === c ? a.pendingRootTasks++ : c.pendingTasks++;
      var m = {
        node: b,
        ping: function () {
          return pingTask(a, m);
        },
        blockedBoundary: c,
        blockedSegment: d,
        abortSet: f,
        legacyContext: e,
        context: g,
        treeContext: h,
      };
      f.add(m);
      return m;
    }
    function createPendingSegment(a, b, c, d, f, e) {
      return {
        status: 0,
        id: -1,
        index: b,
        parentFlushed: false,
        chunks: [],
        children: [],
        formatContext: d,
        boundary: c,
        lastPushedText: f,
        textEmbedded: e,
      };
    }
    function logRecoverableError(a, b) {
      a = a.onError(b);
      if (null != a && "string" !== typeof a)
        throw Error(
          'onError returned something with a type other than "string". onError should return a string and may return null or undefined but must not return anything else. It received something of type "' +
            typeof a +
            '" instead'
        );
      return a;
    }
    function fatalError(a, b) {
      var c = a.onShellError;
      c(b);
      c = a.onFatalError;
      c(b);
      null !== a.destination
        ? ((a.status = 2), a.destination.destroy(b))
        : ((a.status = 1), (a.fatalError = b));
    }
    function renderWithHooks(a, b, c, d, f) {
      currentlyRenderingComponent = {};
      yc = b;
      localIdCounter = 0;
      for (a = c(d, f); didScheduleRenderPhaseUpdate; )
        (didScheduleRenderPhaseUpdate = false),
          (localIdCounter = 0),
          (numberOfReRenders += 1),
          (workInProgressHook = null),
          (a = c(d, f));
      resetHooksState();
      return a;
    }
    function finishClassComponent(request, task, instance, Component) {
      var nextChildren = instance.render(),
        e = Component.childContextTypes;
      if (null !== e && void 0 !== e) {
        var g = task.legacyContext;
        if ("function" !== typeof instance.getChildContext) Component = g;
        else {
          instance = instance.getChildContext();
          for (var h in instance)
            if (!(h in e))
              throw Error(
                (getComponentNameFromType(Component) || "Unknown") +
                  '.getChildContext(): key "' +
                  h +
                  '" is not defined in childContextTypes.'
              );
          Component = assign({}, g, instance);
        }
        task.legacyContext = Component;
        renderNodeDestructive(request, task, nextChildren);
        task.legacyContext = g;
      } else renderNodeDestructive(request, task, nextChildren);
    }
    function resolveDefaultProps(a, b) {
      if (a && a.defaultProps) {
        b = assign({}, b);
        a = a.defaultProps;
        for (var c in a) void 0 === b[c] && (b[c] = a[c]);
        return b;
      }
      return b;
    }
    function renderElement(request, task, type, props, ref) {
      if ("function" === typeof type)
        if (type.prototype && type.prototype.isReactComponent) {
          ref = getMaskedContext(type, task.legacyContext);
          var e = type.contextType;
          e = new type(
            props,
            "object" === typeof e && null !== e ? e._currentValue : ref
          );
          pc(e, type, props, ref);
          finishClassComponent(request, task, e, type);
        } else {
          e = getMaskedContext(type, task.legacyContext);
          ref = renderWithHooks(request, task, type, props, e);
          var g = 0 !== localIdCounter;
          if (
            "object" === typeof ref &&
            null !== ref &&
            "function" === typeof ref.render &&
            void 0 === ref.$$typeof
          )
            pc(ref, type, props, e),
              finishClassComponent(request, task, ref, type);
          else if (g) {
            props = task.treeContext;
            task.treeContext = pushTreeContext(props, 1, 0);
            try {
              renderNodeDestructive(request, task, ref);
            } finally {
              task.treeContext = props;
            }
          } else renderNodeDestructive(request, task, ref);
        }
      else if ("string" === typeof type) {
        ref = task.blockedSegment;
        e = pushStartInstance(
          ref.chunks,
          type,
          props,
          request.responseState,
          ref.formatContext
        );
        ref.lastPushedText = false;
        g = ref.formatContext;
        ref.formatContext = getChildFormatContext(g, type, props);
        renderNode(request, task, e);
        ref.formatContext = g;
        switch (type) {
          case "area":
          case "base":
          case "br":
          case "col":
          case "embed":
          case "hr":
          case "img":
          case "input":
          case "keygen":
          case "link":
          case "meta":
          case "param":
          case "source":
          case "track":
          case "wbr":
            break;
          default:
            ref.chunks.push(Qa, type, Ra);
        }
        ref.lastPushedText = false;
      } else {
        switch (type) {
          case REACT_LEGACY_HIDDEN_TYPE:
          case REACT_DEBUG_TRACING_MODE_TYPE:
          case REACT_STRICT_MODE_TYPE:
          case REACT_PROFILER_TYPE:
          case REACT_FRAGMENT_TYPE:
            renderNodeDestructive(request, task, props.children);
            return;
          case REACT_SUSPENSE_LIST_TYPE:
            renderNodeDestructive(request, task, props.children);
            return;
          case REACT_SCOPE_TYPE:
            throw Error(
              "ReactDOMServer does not yet support scope components."
            );
          case REACT_SUSPENSE_TYPE:
            // renderSuspenseBoundary
            a: {
              type = task.blockedBoundary;
              ref = task.blockedSegment;
              e = props.fallback;
              props = props.children;
              g = /* @__PURE__ */ new Set();
              var h = {
                  id: null,
                  rootSegmentID: -1,
                  parentFlushed: false,
                  pendingTasks: 0,
                  forceClientRender: false,
                  completedSegments: [],
                  byteSize: 0,
                  fallbackAbortableTasks: g,
                  errorDigest: null,
                },
                m = createPendingSegment(
                  request,
                  ref.chunks.length,
                  h,
                  ref.formatContext,
                  false,
                  false
                );
              ref.children.push(m);
              ref.lastPushedText = false;
              var n = createPendingSegment(
                request,
                0,
                null,
                ref.formatContext,
                false,
                false
              );
              n.parentFlushed = true;
              task.blockedBoundary = h;
              task.blockedSegment = n;
              try {
                if (
                  (renderNode(request, task, props),
                  n.lastPushedText &&
                    n.textEmbedded &&
                    n.chunks.push(textSeparator),
                  (n.status = 1),
                  queueCompletedSegment(h, n),
                  0 === h.pendingTasks)
                )
                  break a;
              } catch (p) {
                (n.status = 4),
                  (h.forceClientRender = true),
                  (h.errorDigest = logRecoverableError(request, p));
              } finally {
                (task.blockedBoundary = type), (task.blockedSegment = ref);
              }
              task = createTask(
                request,
                e,
                type,
                m,
                g,
                task.legacyContext,
                task.context,
                task.treeContext
              );
              request.pingedTasks.push(task);
            }
            return;
        }
        if ("object" === typeof type && null !== type)
          switch (type.$$typeof) {
            case REACT_FORWARD_REF_TYPE:
              props = renderWithHooks(request, task, type.render, props, ref);
              if (0 !== localIdCounter) {
                type = task.treeContext;
                task.treeContext = pushTreeContext(type, 1, 0);
                try {
                  renderNodeDestructive(request, task, props);
                } finally {
                  task.treeContext = type;
                }
              } else renderNodeDestructive(request, task, props);
              return;
            case REACT_MEMO_TYPE:
              type = type.type;
              props = resolveDefaultProps(type, props);
              renderElement(request, task, type, props, ref);
              return;
            case REACT_PROVIDER_TYPE:
              ref = props.children;
              type = type._context;
              props = props.value;
              e = type._currentValue;
              type._currentValue = props;
              g = currentActiveSnapshot;
              currentActiveSnapshot = props = {
                parent: g,
                depth: null === g ? 0 : g.depth + 1,
                context: type,
                parentValue: e,
                value: props,
              };
              task.context = props;
              renderNodeDestructive(request, task, ref);
              request = currentActiveSnapshot;
              if (null === request)
                throw Error(
                  "Tried to pop a Context at the root of the app. This is a bug in React."
                );
              props = request.parentValue;
              request.context._currentValue =
                props === ec ? request.context._defaultValue : props;
              request = currentActiveSnapshot = request.parent;
              task.context = request;
              return;
            case REACT_CONTEXT_TYPE:
              props = props.children;
              props = props(type._currentValue);
              renderNodeDestructive(request, task, props);
              return;
            case REACT_LAZY_TYPE:
              ref = type._init;
              type = ref(type._payload);
              props = resolveDefaultProps(type, props);
              renderElement(request, task, type, props, void 0);
              return;
          }
        throw Error(
          "Element type is invalid: expected a string (for built-in components) or a class/function (for composite components) but got: " +
            ((null == type ? type : typeof type) + ".")
        );
      }
    }
    function renderNodeDestructive(request, task, node) {
      task.node = node;
      if ("object" === typeof node && null !== node) {
        switch (node.$$typeof) {
          case REACT_ELEMENT_TYPE:
            renderElement(request, task, node.type, node.props, node.ref);
            return;
          case REACT_PORTAL_TYPE:
            throw Error(
              "Portals are not currently supported by the server renderer. Render them conditionally so that they only appear on the client render."
            );
          case REACT_LAZY_TYPE:
            var d = node._init;
            node = d(node._payload);
            renderNodeDestructive(request, task, node);
            return;
        }
        if (isArrayImpl(node)) {
          renderChildrenArray(request, task, node);
          return;
        }
        null === node || "object" !== typeof node
          ? (d = null)
          : ((d = (fc && node[fc]) || node["@@iterator"]),
            (d = "function" === typeof d ? d : null));
        if (d && (d = d.call(node))) {
          node = d.next();
          if (!node.done) {
            var f = [];
            do f.push(node.value), (node = d.next());
            while (!node.done);
            renderChildrenArray(request, task, f);
          }
          return;
        }
        request = Object.prototype.toString.call(node);
        throw Error(
          "Objects are not valid as a React child (found: " +
            ("[object Object]" === request
              ? "object with keys {" + Object.keys(node).join(", ") + "}"
              : request) +
            "). If you meant to render a collection of children, use an array instead."
        );
      }
      "string" === typeof node
        ? ((d = task.blockedSegment),
          (d.lastPushedText = pushTextInstance(
            task.blockedSegment.chunks,
            node,
            request.responseState,
            d.lastPushedText
          )))
        : "number" === typeof node &&
          ((d = task.blockedSegment),
          (d.lastPushedText = pushTextInstance(
            task.blockedSegment.chunks,
            "" + node,
            request.responseState,
            d.lastPushedText
          )));
    }
    function renderChildrenArray(request, task, children) {
      for (var d = children.length, f = 0; f < d; f++) {
        var prevTreeContext = task.treeContext;
        task.treeContext = pushTreeContext(prevTreeContext, d, f);
        try {
          renderNode(request, task, children[f]);
        } finally {
          task.treeContext = prevTreeContext;
        }
      }
    }
    function renderNode(request, task, node) {
      var previousFormatContext = task.blockedSegment.formatContext,
        previousLegacyContext = task.legacyContext,
        previousContext = task.context;
      try {
        return renderNodeDestructive(request, task, node);
      } catch (m) {
        if (
          (resetHooksState(),
          "object" === typeof m && null !== m && "function" === typeof m.then)
        ) {
          // spawnNewSuspendedTask
          node = m;
          var g = task.blockedSegment,
            newSegment = createPendingSegment(
              request,
              g.chunks.length,
              null,
              g.formatContext,
              g.lastPushedText,
              true
            );
          g.children.push(newSegment);
          g.lastPushedText = false;
          request = createTask(
            request,
            task.node,
            task.blockedBoundary,
            newSegment,
            task.abortSet,
            task.legacyContext,
            task.context,
            task.treeContext
          ).ping;
          node.then(request, request);
          task.blockedSegment.formatContext = previousFormatContext;
          task.legacyContext = previousLegacyContext;
          task.context = previousContext;
          switchContext(previousContext);
        } else
          throw (
            ((task.blockedSegment.formatContext = previousFormatContext),
            (task.legacyContext = previousLegacyContext),
            (task.context = previousContext),
            switchContext(previousContext),
            m)
          );
      }
    }
    function abortTaskSoft(a) {
      var b = a.blockedBoundary;
      a = a.blockedSegment;
      a.status = 3;
      finishedTask(this, b, a);
    }
    function abortTask(a, b, c) {
      var d = a.blockedBoundary;
      a.blockedSegment.status = 3;
      null === d
        ? (b.allPendingTasks--,
          2 !== b.status &&
            ((b.status = 2), null !== b.destination && b.destination.end()))
        : (d.pendingTasks--,
          d.forceClientRender ||
            ((d.forceClientRender = true),
            (d.errorDigest = b.onError(
              void 0 === c
                ? Error(
                    "The render was aborted by the server without a reason."
                  )
                : c
            )),
            d.parentFlushed && b.clientRenderedBoundaries.push(d)),
          d.fallbackAbortableTasks.forEach(function (a2) {
            return abortTask(a2, b, c);
          }),
          d.fallbackAbortableTasks.clear(),
          b.allPendingTasks--,
          0 === b.allPendingTasks && ((a = b.onAllReady), a()));
    }
    function queueCompletedSegment(boundary, segment) {
      if (
        0 === segment.chunks.length &&
        1 === segment.children.length &&
        null === segment.children[0].boundary
      ) {
        var c = segment.children[0];
        c.id = segment.id;
        c.parentFlushed = true;
        1 === c.status && queueCompletedSegment(boundary, c);
      } else boundary.completedSegments.push(segment);
    }
    function finishedTask(request, boundary, segment) {
      if (null === boundary) {
        if (segment.parentFlushed) {
          if (null !== request.completedRootSegment)
            throw Error(
              "There can only be one root segment. This is a bug in React."
            );
          request.completedRootSegment = segment;
        }
        request.pendingRootTasks--;
        0 === request.pendingRootTasks &&
          ((request.onShellError = X),
          (boundary = request.onShellReady),
          boundary());
      } else
        boundary.pendingTasks--,
          boundary.forceClientRender ||
            (0 === boundary.pendingTasks
              ? (segment.parentFlushed &&
                  1 === segment.status &&
                  queueCompletedSegment(boundary, segment),
                boundary.parentFlushed &&
                  request.completedBoundaries.push(boundary),
                boundary.fallbackAbortableTasks.forEach(abortTaskSoft, request),
                boundary.fallbackAbortableTasks.clear())
              : segment.parentFlushed &&
                1 === segment.status &&
                (queueCompletedSegment(boundary, segment),
                1 === boundary.completedSegments.length &&
                  boundary.parentFlushed &&
                  request.partialBoundaries.push(boundary)));
      request.allPendingTasks--;
      0 === request.allPendingTasks &&
        ((request = request.onAllReady), request());
    }
    function performWork(request) {
      if (2 !== request.status) {
        var prevContext = currentActiveSnapshot,
          prevDispatcher = ReactCurrentDispatcher$1.current;
        ReactCurrentDispatcher$1.current = Dispatcher;
        var prevResponseState = currentResponseState;
        currentResponseState = request.responseState;
        try {
          var pingedTasks = request.pingedTasks,
            e;
          for (e = 0; e < pingedTasks.length; e++) {
            var g = pingedTasks[e];
            // retryTask
            var h = request,
              m = g.blockedSegment;
            if (0 === m.status) {
              switchContext(g.context);
              try {
                renderNodeDestructive(h, g, g.node),
                  m.lastPushedText &&
                    m.textEmbedded &&
                    m.chunks.push(textSeparator),
                  g.abortSet.delete(g),
                  (m.status = 1),
                  finishedTask(h, g.blockedBoundary, m);
              } catch (E) {
                if (
                  (resetHooksState(),
                  "object" === typeof E &&
                    null !== E &&
                    "function" === typeof E.then)
                ) {
                  var n = g.ping;
                  E.then(n, n);
                } else {
                  g.abortSet.delete(g);
                  m.status = 4;
                  var p = g.blockedBoundary,
                    v = E,
                    C = logRecoverableError(h, v);
                  null === p
                    ? fatalError(h, v)
                    : (p.pendingTasks--,
                      p.forceClientRender ||
                        ((p.forceClientRender = true),
                        (p.errorDigest = C),
                        p.parentFlushed && h.clientRenderedBoundaries.push(p)));
                  h.allPendingTasks--;
                  if (0 === h.allPendingTasks) {
                    var D = h.onAllReady;
                    D();
                  }
                }
              } finally {
              }
            }
          }
          pingedTasks.splice(0, e);
          null !== request.destination &&
            flushCompletedQueues(request, request.destination);
        } catch (E) {
          logRecoverableError(request, E), fatalError(request, E);
        } finally {
          (currentResponseState = prevResponseState),
            (ReactCurrentDispatcher$1.current = prevDispatcher),
            prevDispatcher === Dispatcher && switchContext(prevContext);
        }
      }
    }
    function flushSubtree(request, destination, segment) {
      segment.parentFlushed = true;
      switch (segment.status) {
        case 0:
          var d = (segment.id = request.nextSegmentId++);
          segment.lastPushedText = false;
          segment.textEmbedded = false;
          request = request.responseState;
          writeChunk(destination, placeholder1);
          writeChunk(destination, request.placeholderPrefix);
          request = d.toString(16);
          writeChunk(destination, request);
          return writeChunkAndReturn(destination, placeholder2);
        case 1:
          segment.status = 2;
          var f = true;
          d = segment.chunks;
          var e = 0;
          segment = segment.children;
          for (var g = 0; g < segment.length; g++) {
            for (f = segment[g]; e < f.index; e++)
              writeChunk(destination, d[e]);
            f = flushSegment(request, destination, f);
          }
          for (; e < d.length - 1; e++) writeChunk(destination, d[e]);
          e < d.length && (f = writeChunkAndReturn(destination, d[e]));
          return f;
        default:
          throw Error(
            "Aborted, errored or already flushed boundaries should not be flushed again. This is a bug in React."
          );
      }
    }
    function flushSegment(request, destination, segment) {
      var boundary = segment.boundary;
      if (null === boundary) return flushSubtree(request, destination, segment);
      boundary.parentFlushed = true;
      if (boundary.forceClientRender)
        (boundary = boundary.errorDigest),
          writeChunkAndReturn(destination, Xa),
          writeChunk(destination, Za),
          boundary &&
            (writeChunk(destination, ab),
            writeChunk(destination, escapeTextForBrowser(boundary)),
            writeChunk(destination, $a)),
          writeChunkAndReturn(destination, bb),
          flushSubtree(request, destination, segment);
      else if (0 < boundary.pendingTasks) {
        boundary.rootSegmentID = request.nextSegmentId++;
        0 < boundary.completedSegments.length &&
          request.partialBoundaries.push(boundary);
        var f = request.responseState;
        var e = f.nextSuspenseID++;
        f = stringToPrecomputedChunk(f.boundaryPrefix + e.toString(16));
        boundary = boundary.id = f;
        writeStartPendingSuspenseBoundary(
          destination,
          request.responseState,
          boundary
        );
        flushSubtree(request, destination, segment);
      } else if (boundary.byteSize > request.progressiveChunkSize)
        (boundary.rootSegmentID = request.nextSegmentId++),
          request.completedBoundaries.push(boundary),
          writeStartPendingSuspenseBoundary(
            destination,
            request.responseState,
            boundary.id
          ),
          flushSubtree(request, destination, segment);
      else {
        writeChunkAndReturn(destination, Ua);
        segment = boundary.completedSegments;
        if (1 !== segment.length)
          throw Error(
            "A previously unvisited boundary must have exactly one root segment. This is a bug in React."
          );
        flushSegment(request, destination, segment[0]);
      }
      return writeChunkAndReturn(destination, Ya);
    }
    function flushSegmentContainer(request, destination, segment) {
      writeStartSegment(
        destination,
        request.responseState,
        segment.formatContext,
        segment.id
      );
      flushSegment(request, destination, segment);
      return writeEndSegment(destination, segment.formatContext);
    }
    function flushCompletedBoundary(request, destination, boundary) {
      for (var d = boundary.completedSegments, f = 0; f < d.length; f++)
        flushPartiallyCompletedSegment(request, destination, boundary, d[f]);
      d.length = 0;
      request = request.responseState;
      d = boundary.id;
      boundary = boundary.rootSegmentID;
      writeChunk(destination, request.startInlineScript);
      request.sentCompleteBoundaryFunction
        ? writeChunk(destination, Gb)
        : ((request.sentCompleteBoundaryFunction = true),
          writeChunk(destination, Fb));
      if (null === d)
        throw Error(
          "An ID must have been assigned before we can complete the boundary."
        );
      boundary = boundary.toString(16);
      writeChunk(destination, d);
      writeChunk(destination, Hb);
      writeChunk(destination, request.segmentPrefix);
      writeChunk(destination, boundary);
      return writeChunkAndReturn(destination, Ib);
    }
    function flushPartiallyCompletedSegment(
      request,
      destination,
      boundary,
      segment
    ) {
      if (2 === segment.status) return true;
      var f = segment.id;
      if (-1 === f) {
        if (-1 === (segment.id = boundary.rootSegmentID))
          throw Error(
            "A root segment ID must have been assigned by now. This is a bug in React."
          );
        return flushSegmentContainer(request, destination, segment);
      }
      flushSegmentContainer(request, destination, segment);
      request = request.responseState;
      writeChunk(destination, request.startInlineScript);
      request.sentCompleteSegmentFunction
        ? writeChunk(destination, Bb)
        : ((request.sentCompleteSegmentFunction = true),
          writeChunk(destination, Ab));
      writeChunk(destination, request.segmentPrefix);
      f = f.toString(16);
      writeChunk(destination, f);
      writeChunk(destination, Cb);
      writeChunk(destination, request.placeholderPrefix);
      writeChunk(destination, f);
      return writeChunkAndReturn(destination, Db);
    }
    function flushCompletedQueues(request, destination) {
      currentView = new Uint8Array(VIEW_SIZE);
      writtenBytes = 0;
      destinationHasCapacity = true;
      try {
        var c = request.completedRootSegment;
        if (null !== c && 0 === request.pendingRootTasks) {
          flushSegment(request, destination, c);
          request.completedRootSegment = null;
          var d = request.responseState.bootstrapChunks;
          for (c = 0; c < d.length - 1; c++) writeChunk(destination, d[c]);
          c < d.length && writeChunkAndReturn(destination, d[c]);
        }
        var f = request.clientRenderedBoundaries,
          e;
        for (e = 0; e < f.length; e++) {
          var g = f[e];
          d = destination;
          var h = request.responseState,
            m = g.id,
            n = g.errorDigest,
            p = g.errorMessage,
            v = g.errorComponentStack;
          writeChunk(d, h.startInlineScript);
          h.sentClientRenderFunction
            ? writeChunk(d, Kb)
            : ((h.sentClientRenderFunction = true), writeChunk(d, Jb));
          if (null === m)
            throw Error(
              "An ID must have been assigned before we can complete the boundary."
            );
          writeChunk(d, m);
          writeChunk(d, Lb);
          if (n || p || v)
            writeChunk(d, Nb),
              writeChunk(d, escapeJSStringsForInstructionScripts(n || ""));
          if (p || v)
            writeChunk(d, Nb),
              writeChunk(d, escapeJSStringsForInstructionScripts(p || ""));
          v &&
            (writeChunk(d, Nb),
            writeChunk(d, escapeJSStringsForInstructionScripts(v)));
          if (!writeChunkAndReturn(d, Mb)) {
            request.destination = null;
            e++;
            f.splice(0, e);
            return;
          }
        }
        f.splice(0, e);
        var C = request.completedBoundaries;
        for (e = 0; e < C.length; e++)
          if (!flushCompletedBoundary(request, destination, C[e])) {
            request.destination = null;
            e++;
            C.splice(0, e);
            return;
          }
        C.splice(0, e);
        completeWriting(destination);
        currentView = new Uint8Array(VIEW_SIZE);
        writtenBytes = 0;
        destinationHasCapacity = true;
        var D = request.partialBoundaries;
        for (e = 0; e < D.length; e++) {
          var E = D[e];
          a: {
            f = request;
            g = destination;
            var na = E.completedSegments;
            for (h = 0; h < na.length; h++)
              if (!flushPartiallyCompletedSegment(f, g, E, na[h])) {
                h++;
                na.splice(0, h);
                var Eb = false;
                break a;
              }
            na.splice(0, h);
            Eb = true;
          }
          if (!Eb) {
            request.destination = null;
            e++;
            D.splice(0, e);
            return;
          }
        }
        D.splice(0, e);
        var oa = request.completedBoundaries;
        for (e = 0; e < oa.length; e++)
          if (!flushCompletedBoundary(request, destination, oa[e])) {
            request.destination = null;
            e++;
            oa.splice(0, e);
            return;
          }
        oa.splice(0, e);
      } finally {
        completeWriting(destination),
          "function" === typeof destination.flush && destination.flush(),
          0 === request.allPendingTasks &&
            0 === request.pingedTasks.length &&
            0 === request.clientRenderedBoundaries.length &&
            0 === request.completedBoundaries.length &&
            destination.end();
      }
    }
    function startWork(request) {
      queueMicrotask(function scheduleWorkCallback() {
        return performWork(request);
      });
    }
    function startFlowing(a, b) {
      if (1 === a.status) (a.status = 2), b.destroy(a.fatalError);
      else if (2 !== a.status && null === a.destination) {
        a.destination = b;
        try {
          flushCompletedQueues(a, b);
        } catch (c) {
          logRecoverableError(a, c), fatalError(a, c);
        }
      }
    }
    function abort(a, b) {
      try {
        var c = a.abortableTasks;
        c.forEach(function (c2) {
          return abortTask(c2, a, b);
        });
        c.clear();
        null !== a.destination && flushCompletedQueues(a, a.destination);
      } catch (d) {
        logRecoverableError(a, d), fatalError(a, d);
      }
    }
    function createDrainHandler(a, b) {
      return function drainHandler() {
        return startFlowing(b, a);
      };
    }
    function createAbortHandler(a, b) {
      return function abortHandler() {
        return abort(a, b);
      };
    }
    function createRequestImpl(children, options) {
      var c = options ? options.identifierPrefix : void 0,
        d = options ? options.nonce : void 0,
        f = options ? options.bootstrapScriptContent : void 0,
        e = options ? options.bootstrapScripts : void 0;
      var g = options ? options.bootstrapModules : void 0;
      c = void 0 === c ? "" : c;
      d =
        void 0 === d
          ? startInlineScript
          : stringToPrecomputedChunk(
              '<script nonce="' + escapeTextForBrowser(d) + '">'
            );
      var h = [];
      void 0 !== f &&
        h.push(
          d,
          ("" + f).replace(scriptRegex, scriptReplacer),
          endInlineScript
        );
      if (void 0 !== e)
        for (f = 0; f < e.length; f++)
          h.push(startScriptSrc, escapeTextForBrowser(e[f]), endAsyncScript);
      if (void 0 !== g)
        for (e = 0; e < g.length; e++)
          h.push(startModuleSrc, escapeTextForBrowser(g[e]), endAsyncScript);
      g = {
        bootstrapChunks: h,
        startInlineScript: d,
        placeholderPrefix: stringToPrecomputedChunk(c + "P:"),
        segmentPrefix: stringToPrecomputedChunk(c + "S:"),
        boundaryPrefix: c + "B:",
        idPrefix: c,
        nextSuspenseID: 0,
        sentCompleteSegmentFunction: false,
        sentCompleteBoundaryFunction: false,
        sentClientRenderFunction: false,
      };
      e = options ? options.namespaceURI : void 0;
      e = createFormatContext(
        "http://www.w3.org/2000/svg" === e
          ? 2
          : "http://www.w3.org/1998/Math/MathML" === e
          ? 3
          : 0,
        null
      );
      f = options ? options.progressiveChunkSize : void 0;
      d = options ? options.onError : void 0;
      h = options ? options.onAllReady : void 0;
      var m = options ? options.onShellReady : void 0,
        n = options ? options.onShellError : void 0;
      options = [];
      c = /* @__PURE__ */ new Set();
      g = {
        destination: null,
        responseState: g,
        progressiveChunkSize: void 0 === f ? 12800 : f,
        status: 0,
        fatalError: null,
        nextSegmentId: 0,
        allPendingTasks: 0,
        pendingRootTasks: 0,
        completedRootSegment: null,
        abortableTasks: c,
        pingedTasks: options,
        clientRenderedBoundaries: [],
        completedBoundaries: [],
        partialBoundaries: [],
        onError: void 0 === d ? Oc : d,
        onAllReady: void 0 === h ? X : h,
        onShellReady: void 0 === m ? X : m,
        onShellError: void 0 === n ? X : n,
        onFatalError: X,
      };
      e = createPendingSegment(g, 0, null, e, false, false);
      e.parentFlushed = true;
      children = createTask(
        g,
        children,
        null,
        e,
        c,
        emptyContextObject,
        null,
        qc
      );
      options.push(children);
      return g;
    }
    exports.renderToPipeableStream = function (children, options) {
      var request = createRequestImpl(children, options),
        hasStartedFlowing = false;
      startWork(request);
      return {
        pipe: function pipe(destination) {
          if (hasStartedFlowing)
            throw Error(
              "React currently only supports piping to one writable stream."
            );
          hasStartedFlowing = true;
          startFlowing(request, destination);
          destination.on("drain", createDrainHandler(destination, request));
          destination.on(
            "error",
            createAbortHandler(
              request,
              Error("The destination stream errored while writing data.")
            )
          );
          destination.on(
            "close",
            createAbortHandler(
              request,
              Error("The destination stream closed early.")
            )
          );
          return destination;
        },
        abort: function abort(reason) {
          abort(request, reason);
        },
      };
    };
    exports.version = "18.3.1";
  },
});

// ComplexComponent.mjs
function generateComplexData() {
  const primes = Array.from({ length: 1e4 }, (_, i) => i);
  const fibs = Array.from({ length: 100 }, (_, i) => i);
  const complexData = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    title: `Section ${i + 1}`,
    primes: primes.slice(i * 100, (i + 1) * 100),
    fibonacci: fibs,
    items: Array.from({ length: 20 }, (_2, j) => ({
      id: j,
      value: Math.sqrt(i * 1e3 + j),
      description: `Item ${j} in section ${i}`,
      metadata: {
        timestamp: Date.now(),
        hash: (i * j * 12345).toString(36),
        complexity: Math.sin(i) * Math.cos(j),
      },
    })),
  }));
  return complexData;
}
var data = generateComplexData();
var totalPrimes = data.reduce((sum, section) => sum + section.primes.length, 0);
var averageFib =
  data[0].fibonacci.reduce((a, b) => a + b, 0) / data[0].fibonacci.length;
function ComplexComponent() {
  return React.createElement(
    "div",
    {
      style: {
        padding: "32px",
        maxWidth: "1280px",
        margin: "0 auto",
        backgroundColor: "white",
        color: "#111827",
      },
    },
    React.createElement(
      "h1",
      {
        style: {
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "24px",
          color: "#111827",
        },
      },
      "Complex Server-Rendered Component (React SSR - CloudFlare)"
    ),
    React.createElement(
      "div",
      {
        style: {
          marginBottom: "32px",
          padding: "16px",
          borderRadius: "8px",
          backgroundColor: "#f3f4f6",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
      React.createElement(
        "h2",
        {
          style: {
            fontSize: "24px",
            fontWeight: "600",
            marginBottom: "8px",
            color: "#1f2937",
          },
        },
        "Statistics"
      ),
      React.createElement(
        "p",
        { style: { fontSize: "18px" } },
        `Total Prime Numbers: ${totalPrimes}`
      ),
      React.createElement(
        "p",
        { style: { fontSize: "18px" } },
        `Average Fibonacci Value: ${averageFib.toFixed(2)}`
      ),
      React.createElement(
        "p",
        { style: { fontSize: "18px" } },
        `Total Sections: ${data.length}`
      )
    ),
    ...data.map((section) =>
      React.createElement(
        "div",
        {
          key: section.id,
          style: {
            marginBottom: "32px",
            border: "1px solid #e5e7eb",
            borderRadius: "8px",
            padding: "24px",
            backgroundColor: "white",
            boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          },
        },
        React.createElement(
          "h2",
          {
            style: {
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "16px",
              color: "#111827",
            },
          },
          section.title
        ),
        React.createElement(
          "div",
          { style: { marginBottom: "16px" } },
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#6b21a8",
              },
            },
            "Prime Numbers (100 samples)"
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(10, 1fr)",
                gap: "8px",
              },
            },
            ...section.primes.map((prime, idx) =>
              React.createElement(
                "div",
                {
                  key: idx,
                  style: {
                    backgroundColor: "#e9d5ff",
                    padding: "8px",
                    textAlign: "center",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#581c87",
                    border: "1px solid #d8b4fe",
                  },
                },
                prime
              )
            )
          )
        ),
        React.createElement(
          "div",
          { style: { marginBottom: "16px" } },
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#166534",
              },
            },
            "Fibonacci Sequence"
          ),
          React.createElement(
            "div",
            {
              style: { display: "flex", flexWrap: "wrap", gap: "8px" },
            },
            ...section.fibonacci.map((fib, idx) =>
              React.createElement(
                "div",
                {
                  key: idx,
                  style: {
                    backgroundColor: "#dcfce7",
                    padding: "4px 12px",
                    borderRadius: "4px",
                    fontSize: "14px",
                    color: "#14532d",
                    border: "1px solid #bbf7d0",
                  },
                },
                fib
              )
            )
          )
        ),
        React.createElement(
          "div",
          {},
          React.createElement(
            "h3",
            {
              style: {
                fontSize: "20px",
                fontWeight: "600",
                marginBottom: "8px",
                color: "#1e40af",
              },
            },
            `Items (${section.items.length})`
          ),
          React.createElement(
            "div",
            {
              style: {
                display: "grid",
                gridTemplateColumns: "repeat(2, 1fr)",
                gap: "16px",
              },
            },
            ...section.items.map((item) =>
              React.createElement(
                "div",
                {
                  key: item.id,
                  style: {
                    backgroundColor: "#f9fafb",
                    padding: "16px",
                    borderRadius: "4px",
                    border: "1px solid #d1d5db",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                  },
                },
                React.createElement(
                  "h4",
                  {
                    style: { fontWeight: "600", color: "#111827" },
                  },
                  `Item ${item.id}`
                ),
                React.createElement(
                  "p",
                  {
                    style: { fontSize: "14px", color: "#4b5563" },
                  },
                  item.description
                ),
                React.createElement(
                  "p",
                  {
                    style: { fontSize: "14px", color: "#1f2937" },
                  },
                  `Value: ${item.value.toFixed(4)}`
                ),
                React.createElement(
                  "div",
                  {
                    style: {
                      marginTop: "8px",
                      fontSize: "12px",
                      color: "#6b7280",
                    },
                  },
                  React.createElement("p", {}, `Hash: ${item.metadata.hash}`),
                  React.createElement(
                    "p",
                    {},
                    `Complexity: ${item.metadata.complexity.toFixed(6)}`
                  ),
                  React.createElement(
                    "p",
                    {},
                    `Timestamp: ${item.metadata.timestamp}`
                  )
                )
              )
            )
          )
        )
      )
    ),
    React.createElement(
      "div",
      {
        style: {
          marginTop: "32px",
          padding: "24px",
          backgroundColor: "#f3f4f6",
          borderRadius: "8px",
          border: "1px solid #e5e7eb",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
        },
      },
      React.createElement(
        "h2",
        {
          style: {
            fontSize: "24px",
            fontWeight: "bold",
            marginBottom: "16px",
            color: "#111827",
          },
        },
        "Additional Computations"
      ),
      React.createElement(
        "div",
        {
          style: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "16px",
          },
        },
        ...Array.from({ length: 300 }, (_, i) => {
          const n = i + 1;
          const factorial = Array.from(
            { length: Math.min(n, 20) },
            (_2, j) => j + 1
          ).reduce((acc, val) => acc * val, 1);
          return React.createElement(
            "div",
            {
              key: i,
              style: {
                backgroundColor: "white",
                padding: "12px",
                borderRadius: "4px",
                boxShadow: "0 1px 2px rgba(0,0,0,0.05)",
                border: "1px solid #e5e7eb",
              },
            },
            React.createElement(
              "p",
              {
                style: {
                  fontFamily: "monospace",
                  fontSize: "14px",
                  color: "#1f2937",
                },
              },
              `n=${n}, f=${factorial.toExponential(2)}`
            )
          );
        })
      )
    )
  );
}

function createRoot() {
  console.log("rendering", Date.now());
  const currentTime = new Date().toLocaleString();

  return React.createElement(
    "main",
    {
      style: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      },
    },
    React.createElement(
      "h1",
      {
        style: {
          fontSize: "24px",
          fontWeight: "bold",
          marginBottom: "16px",
        },
      },
      "Last rendered at:"
    ),
    React.createElement(
      "p",
      {
        style: {
          fontSize: "18px",
          fontFamily: "monospace",
          padding: "16px",
          borderRadius: "4px",
        },
      },
      currentTime
    ),
    React.createElement(ComplexComponent)
  );
}

const { renderToPipeableStream } = require_server_node();

export { renderToPipeableStream, createRoot };
