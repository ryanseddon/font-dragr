'use strict';
(function(e, t, n) {
  function r(e) {
    return function() {
      var t,
        r,
        i = arguments[0],
        o = '[' + (e ? e + ':' : '') + i + '] ',
        a = arguments[1],
        s = arguments,
        c = function(e) {
          return 'function' == typeof e
            ? ('' + e).replace(/ \{[\s\S]*$/, '')
            : e === n
            ? 'undefined'
            : 'string' != typeof e
            ? JSON.stringify(e)
            : e;
        };
      for (
        t =
          o +
          a.replace(/\{\d+\}/g, function(e) {
            var t,
              r = +e.slice(1, -1);
            return s.length > r + 2
              ? ((t = s[r + 2]),
                'function' == typeof t
                  ? ('' + t).replace(/ ?\{[\s\S]*$/, '')
                  : t === n
                  ? 'undefined'
                  : 'string' != typeof t
                  ? _(t)
                  : t)
              : e;
          }),
          t =
            t +
            '\nhttp://errors.angularjs.org/1.2.11-build.2192+sha.e2173f9/' +
            (e ? e + '/' : '') +
            i,
          r = 2;
        arguments.length > r;
        r++
      )
        t =
          t +
          (2 == r ? '?' : '&') +
          'p' +
          (r - 2) +
          '=' +
          encodeURIComponent(c(arguments[r]));
      return Error(t);
    };
  }
  function i(e) {
    if (null == e || E(e)) return !1;
    var t = e.length;
    return 1 === e.nodeType && t
      ? !0
      : w(e) ||
          k(e) ||
          0 === t ||
          ('number' == typeof t && t > 0 && t - 1 in e);
  }
  function o(e, t, n) {
    var r;
    if (e)
      if (S(e))
        for (r in e)
          'prototype' == r ||
            'length' == r ||
            'name' == r ||
            (e.hasOwnProperty && !e.hasOwnProperty(r)) ||
            t.call(n, e[r], r);
      else if (e.forEach && e.forEach !== o) e.forEach(t, n);
      else if (i(e)) for (r = 0; e.length > r; r++) t.call(n, e[r], r);
      else for (r in e) e.hasOwnProperty(r) && t.call(n, e[r], r);
    return e;
  }
  function a(e) {
    var t = [];
    for (var n in e) e.hasOwnProperty(n) && t.push(n);
    return t.sort();
  }
  function s(e, t, n) {
    for (var r = a(e), i = 0; r.length > i; i++) t.call(n, e[r[i]], r[i]);
    return r;
  }
  function c(e) {
    return function(t, n) {
      e(n, t);
    };
  }
  function u() {
    for (var e, t = wr.length; t; ) {
      if ((t--, (e = wr[t].charCodeAt(0)), 57 == e))
        return (wr[t] = 'A'), wr.join('');
      if (90 != e) return (wr[t] = String.fromCharCode(e + 1)), wr.join('');
      wr[t] = '0';
    }
    return wr.unshift('0'), wr.join('');
  }
  function l(e, t) {
    t ? (e.$$hashKey = t) : delete e.$$hashKey;
  }
  function f(e) {
    var t = e.$$hashKey;
    return (
      o(arguments, function(t) {
        t !== e &&
          o(t, function(t, n) {
            e[n] = t;
          });
      }),
      l(e, t),
      e
    );
  }
  function h(e) {
    return parseInt(e, 10);
  }
  function p(e, t) {
    return f(new (f(function() {}, {prototype: e}))(), t);
  }
  function d() {}
  function $(e) {
    return e;
  }
  function v(e) {
    return function() {
      return e;
    };
  }
  function g(e) {
    return e === n;
  }
  function m(e) {
    return e !== n;
  }
  function y(e) {
    return null != e && 'object' == typeof e;
  }
  function w(e) {
    return 'string' == typeof e;
  }
  function b(e) {
    return 'number' == typeof e;
  }
  function x(e) {
    return '[object Date]' === gr.call(e);
  }
  function k(e) {
    return '[object Array]' === gr.call(e);
  }
  function S(e) {
    return 'function' == typeof e;
  }
  function C(e) {
    return '[object RegExp]' === gr.call(e);
  }
  function E(e) {
    return e && e.document && e.location && e.alert && e.setInterval;
  }
  function A(e) {
    return e && e.$evalAsync && e.$watch;
  }
  function T(e) {
    return '[object File]' === gr.call(e);
  }
  function P(e) {
    return !(!e || !(e.nodeName || (e.on && e.find)));
  }
  function j(e, t, n) {
    var r = [];
    return (
      o(e, function(e, i, o) {
        r.push(t.call(n, e, i, o));
      }),
      r
    );
  }
  function O(e, t) {
    return -1 != M(e, t);
  }
  function M(e, t) {
    if (e.indexOf) return e.indexOf(t);
    for (var n = 0; e.length > n; n++) if (t === e[n]) return n;
    return -1;
  }
  function D(e, t) {
    var n = M(e, t);
    return n >= 0 && e.splice(n, 1), t;
  }
  function N(e, t) {
    if (E(e) || A(e))
      throw mr(
        'cpws',
        "Can't copy! Making copies of Window or Scope instances is not supported.",
      );
    if (t) {
      if (e === t)
        throw mr('cpi', "Can't copy! Source and destination are identical.");
      if (k(e)) {
        t.length = 0;
        for (var n = 0; e.length > n; n++) t.push(N(e[n]));
      } else {
        var r = t.$$hashKey;
        o(t, function(e, n) {
          delete t[n];
        });
        for (var i in e) t[i] = N(e[i]);
        l(t, r);
      }
    } else
      (t = e),
        e &&
          (k(e)
            ? (t = N(e, []))
            : x(e)
            ? (t = new Date(e.getTime()))
            : C(e)
            ? (t = RegExp(e.source))
            : y(e) && (t = N(e, {})));
    return t;
  }
  function F(e, t) {
    t = t || {};
    for (var n in e)
      e.hasOwnProperty(n) &&
        '$' !== n.charAt(0) &&
        '$' !== n.charAt(1) &&
        (t[n] = e[n]);
    return t;
  }
  function q(e, t) {
    if (e === t) return !0;
    if (null === e || null === t) return !1;
    if (e !== e && t !== t) return !0;
    var r,
      i,
      o,
      a = typeof e,
      s = typeof t;
    if (a == s && 'object' == a) {
      if (!k(e)) {
        if (x(e)) return x(t) && e.getTime() == t.getTime();
        if (C(e) && C(t)) return '' + e == '' + t;
        if (A(e) || A(t) || E(e) || E(t) || k(t)) return !1;
        o = {};
        for (i in e)
          if ('$' !== i.charAt(0) && !S(e[i])) {
            if (!q(e[i], t[i])) return !1;
            o[i] = !0;
          }
        for (i in t)
          if (
            !o.hasOwnProperty(i) &&
            '$' !== i.charAt(0) &&
            t[i] !== n &&
            !S(t[i])
          )
            return !1;
        return !0;
      }
      if (!k(t)) return !1;
      if ((r = e.length) == t.length) {
        for (i = 0; r > i; i++) if (!q(e[i], t[i])) return !1;
        return !0;
      }
    }
    return !1;
  }
  function R() {
    return (
      (t.securityPolicy && t.securityPolicy.isActive) ||
      (t.querySelector &&
        !(!t.querySelector('[ng-csp]') && !t.querySelector('[data-ng-csp]')))
    );
  }
  function I(e, t, n) {
    return e.concat($r.call(t, n));
  }
  function U(e, t) {
    return $r.call(e, t || 0);
  }
  function V(e, t) {
    var n = arguments.length > 2 ? U(arguments, 2) : [];
    return !S(t) || t instanceof RegExp
      ? t
      : n.length
      ? function() {
          return arguments.length
            ? t.apply(e, n.concat($r.call(arguments, 0)))
            : t.apply(e, n);
        }
      : function() {
          return arguments.length ? t.apply(e, arguments) : t.call(e);
        };
  }
  function L(e, r) {
    var i = r;
    return (
      'string' == typeof e && '$' === e.charAt(0)
        ? (i = n)
        : E(r)
        ? (i = '$WINDOW')
        : r && t === r
        ? (i = '$DOCUMENT')
        : A(r) && (i = '$SCOPE'),
      i
    );
  }
  function _(e, t) {
    return e === n ? n : JSON.stringify(e, L, t ? '  ' : null);
  }
  function z(e) {
    return w(e) ? JSON.parse(e) : e;
  }
  function H(e) {
    if ('function' == typeof e) e = !0;
    else if (e && 0 !== e.length) {
      var t = ar('' + e);
      e = !(
        'f' == t ||
        '0' == t ||
        'false' == t ||
        'no' == t ||
        'n' == t ||
        '[]' == t
      );
    } else e = !1;
    return e;
  }
  function B(e) {
    e = fr(e).clone();
    try {
      e.empty();
    } catch (t) {}
    var n = 3,
      r = fr('<div>')
        .append(e)
        .html();
    try {
      return e[0].nodeType === n
        ? ar(r)
        : r.match(/^(<[^>]+>)/)[1].replace(/^<([\w\-]+)/, function(e, t) {
            return '<' + ar(t);
          });
    } catch (t) {
      return ar(r);
    }
  }
  function W(e) {
    try {
      return decodeURIComponent(e);
    } catch (t) {}
  }
  function G(e) {
    var t,
      n,
      r = {};
    return (
      o((e || '').split('&'), function(e) {
        if (e && ((t = e.split('=')), (n = W(t[0])), m(n))) {
          var i = m(t[1]) ? W(t[1]) : !0;
          r[n] ? (k(r[n]) ? r[n].push(i) : (r[n] = [r[n], i])) : (r[n] = i);
        }
      }),
      r
    );
  }
  function Y(e) {
    var t = [];
    return (
      o(e, function(e, n) {
        k(e)
          ? o(e, function(e) {
              t.push(Q(n, !0) + (e === !0 ? '' : '=' + Q(e, !0)));
            })
          : t.push(Q(n, !0) + (e === !0 ? '' : '=' + Q(e, !0)));
      }),
      t.length ? t.join('&') : ''
    );
  }
  function J(e) {
    return Q(e, !0)
      .replace(/%26/gi, '&')
      .replace(/%3D/gi, '=')
      .replace(/%2B/gi, '+');
  }
  function Q(e, t) {
    return encodeURIComponent(e)
      .replace(/%40/gi, '@')
      .replace(/%3A/gi, ':')
      .replace(/%24/g, '$')
      .replace(/%2C/gi, ',')
      .replace(/%20/g, t ? '%20' : '+');
  }
  function Z(e, n) {
    function r(e) {
      e && s.push(e);
    }
    var i,
      a,
      s = [e],
      c = ['ng:app', 'ng-app', 'x-ng-app', 'data-ng-app'],
      u = /\sng[:\-]app(:\s*([\w\d_]+);?)?\s/;
    o(c, function(n) {
      (c[n] = !0),
        r(t.getElementById(n)),
        (n = n.replace(':', '\\:')),
        e.querySelectorAll &&
          (o(e.querySelectorAll('.' + n), r),
          o(e.querySelectorAll('.' + n + '\\:'), r),
          o(e.querySelectorAll('[' + n + ']'), r));
    }),
      o(s, function(e) {
        if (!i) {
          var t = ' ' + e.className + ' ',
            n = u.exec(t);
          n
            ? ((i = e), (a = (n[2] || '').replace(/\s+/g, ',')))
            : o(e.attributes, function(t) {
                !i && c[t.name] && ((i = e), (a = t.value));
              });
        }
      }),
      i && n(i, a ? [a] : []);
  }
  function K(r, i) {
    var a = function() {
        if (((r = fr(r)), r.injector())) {
          var e = r[0] === t ? 'document' : B(r);
          throw mr(
            'btstrpd',
            "App Already Bootstrapped with this Element '{0}'",
            e,
          );
        }
        (i = i || []),
          i.unshift([
            '$provide',
            function(e) {
              e.value('$rootElement', r);
            },
          ]),
          i.unshift('ng');
        var n = jt(i);
        return (
          n.invoke([
            '$rootScope',
            '$rootElement',
            '$compile',
            '$injector',
            '$animate',
            function(e, t, n, r) {
              e.$apply(function() {
                t.data('$injector', r), n(t)(e);
              });
            },
          ]),
          n
        );
      },
      s = /^NG_DEFER_BOOTSTRAP!/;
    return e && !s.test(e.name)
      ? a()
      : ((e.name = e.name.replace(s, '')),
        (yr.resumeBootstrap = function(e) {
          o(e, function(e) {
            i.push(e);
          }),
            a();
        }),
        n);
  }
  function X(e, t) {
    return (
      (t = t || '_'),
      e.replace(xr, function(e, n) {
        return (n ? t : '') + e.toLowerCase();
      })
    );
  }
  function et() {
    (hr = e.jQuery),
      hr
        ? ((fr = hr),
          f(hr.fn, {
            scope: Mr.scope,
            isolateScope: Mr.isolateScope,
            controller: Mr.controller,
            injector: Mr.injector,
            inheritedData: Mr.inheritedData,
          }),
          lt('remove', !0, !0, !1),
          lt('empty', !1, !1, !1),
          lt('html', !1, !1, !0))
        : (fr = ft),
      (yr.element = fr);
  }
  function tt(e, t, n) {
    if (!e)
      throw mr('areq', "Argument '{0}' is {1}", t || '?', n || 'required');
    return e;
  }
  function nt(e, t, n) {
    return (
      n && k(e) && (e = e[e.length - 1]),
      tt(
        S(e),
        t,
        'not a function, got ' +
          (e && 'object' == typeof e
            ? e.constructor.name || 'Object'
            : typeof e),
      ),
      e
    );
  }
  function rt(e, t) {
    if ('hasOwnProperty' === e)
      throw mr('badname', 'hasOwnProperty is not a valid {0} name', t);
  }
  function it(e, t, n) {
    if (!t) return e;
    for (var r, i = t.split('.'), o = e, a = i.length, s = 0; a > s; s++)
      (r = i[s]), e && (e = (o = e)[r]);
    return !n && S(e) ? V(o, e) : e;
  }
  function ot(e) {
    var t = e[0],
      n = e[e.length - 1];
    if (t === n) return fr(t);
    var r = t,
      i = [r];
    do {
      if (((r = r.nextSibling), !r)) break;
      i.push(r);
    } while (r !== n);
    return fr(i);
  }
  function at(e) {
    function t(e, t, n) {
      return e[t] || (e[t] = n());
    }
    var n = r('$injector'),
      i = r('ng'),
      o = t(e, 'angular', Object);
    return (
      (o.$$minErr = o.$$minErr || r),
      t(o, 'module', function() {
        var e = {};
        return function(r, o, a) {
          var s = function(e, t) {
            if ('hasOwnProperty' === e)
              throw i('badname', 'hasOwnProperty is not a valid {0} name', t);
          };
          return (
            s(r, 'module'),
            o && e.hasOwnProperty(r) && (e[r] = null),
            t(e, r, function() {
              function e(e, n, r) {
                return function() {
                  return t[r || 'push']([e, n, arguments]), c;
                };
              }
              if (!o)
                throw n(
                  'nomod',
                  "Module '{0}' is not available! You either misspelled the module name or forgot to load it. If registering a module ensure that you specify the dependencies as the second argument.",
                  r,
                );
              var t = [],
                i = [],
                s = e('$injector', 'invoke'),
                c = {
                  _invokeQueue: t,
                  _runBlocks: i,
                  requires: o,
                  name: r,
                  provider: e('$provide', 'provider'),
                  factory: e('$provide', 'factory'),
                  service: e('$provide', 'service'),
                  value: e('$provide', 'value'),
                  constant: e('$provide', 'constant', 'unshift'),
                  animation: e('$animateProvider', 'register'),
                  filter: e('$filterProvider', 'register'),
                  controller: e('$controllerProvider', 'register'),
                  directive: e('$compileProvider', 'directive'),
                  config: s,
                  run: function(e) {
                    return i.push(e), this;
                  },
                };
              return a && s(a), c;
            })
          );
        };
      })
    );
  }
  function st(t) {
    f(t, {
      bootstrap: K,
      copy: N,
      extend: f,
      equals: q,
      element: fr,
      forEach: o,
      injector: jt,
      noop: d,
      bind: V,
      toJson: _,
      fromJson: z,
      identity: $,
      isUndefined: g,
      isDefined: m,
      isString: w,
      isFunction: S,
      isObject: y,
      isNumber: b,
      isElement: P,
      isArray: k,
      version: kr,
      isDate: x,
      lowercase: ar,
      uppercase: sr,
      callbacks: {counter: 0},
      $$minErr: r,
      $$csp: R,
    }),
      (pr = at(e));
    try {
      pr('ngLocale');
    } catch (n) {
      pr('ngLocale', []).provider('$locale', Kt);
    }
    pr(
      'ng',
      ['ngLocale'],
      [
        '$provide',
        function(e) {
          e.provider({$$sanitizeUri: Cn}),
            e
              .provider('$compile', qt)
              .directive({
                a: pi,
                input: ki,
                textarea: ki,
                form: gi,
                script: io,
                select: so,
                style: uo,
                option: co,
                ngBind: Fi,
                ngBindHtml: Ri,
                ngBindTemplate: qi,
                ngClass: Ii,
                ngClassEven: Vi,
                ngClassOdd: Ui,
                ngCloak: Li,
                ngController: _i,
                ngForm: mi,
                ngHide: Ki,
                ngIf: Hi,
                ngInclude: Bi,
                ngInit: Gi,
                ngNonBindable: Yi,
                ngPluralize: Ji,
                ngRepeat: Qi,
                ngShow: Zi,
                ngStyle: Xi,
                ngSwitch: eo,
                ngSwitchWhen: to,
                ngSwitchDefault: no,
                ngOptions: ao,
                ngTransclude: ro,
                ngModel: Pi,
                ngList: Mi,
                ngChange: ji,
                required: Oi,
                ngRequired: Oi,
                ngValue: Ni,
              })
              .directive({ngInclude: Wi})
              .directive(di)
              .directive(zi),
            e.provider({
              $anchorScroll: Ot,
              $animate: _r,
              $browser: Dt,
              $cacheFactory: Nt,
              $controller: Ut,
              $document: Vt,
              $exceptionHandler: Lt,
              $filter: qn,
              $interpolate: Qt,
              $interval: Zt,
              $http: Wt,
              $httpBackend: Yt,
              $location: hn,
              $log: pn,
              $parse: bn,
              $rootScope: Sn,
              $q: xn,
              $sce: jn,
              $sceDelegate: Pn,
              $sniffer: On,
              $templateCache: Ft,
              $timeout: Mn,
              $window: Fn,
            });
        },
      ],
    );
  }
  function ct() {
    return ++Er;
  }
  function ut(e) {
    return e
      .replace(Pr, function(e, t, n, r) {
        return r ? n.toUpperCase() : n;
      })
      .replace(jr, 'Moz$1');
  }
  function lt(e, t, n, r) {
    function i(e) {
      var i,
        a,
        s,
        c,
        u,
        l,
        f,
        h = n && e ? [this.filter(e)] : [this],
        p = t;
      if (!r || null != e)
        for (; h.length; )
          for (i = h.shift(), a = 0, s = i.length; s > a; a++)
            for (
              c = fr(i[a]),
                p ? c.triggerHandler('$destroy') : (p = !p),
                u = 0,
                l = (f = c.children()).length;
              l > u;
              u++
            )
              h.push(hr(f[u]));
      return o.apply(this, arguments);
    }
    var o = hr.fn[e];
    (o = o.$original || o), (i.$original = o), (hr.fn[e] = i);
  }
  function ft(e) {
    if (e instanceof ft) return e;
    if (!(this instanceof ft)) {
      if (w(e) && '<' != e.charAt(0))
        throw Or(
          'nosel',
          'Looking up elements via selectors is not supported by jqLite! See: http://docs.angularjs.org/api/angular.element',
        );
      return new ft(e);
    }
    if (w(e)) {
      var n = t.createElement('div');
      (n.innerHTML = '<div>&#160;</div>' + e),
        n.removeChild(n.firstChild),
        bt(this, n.childNodes);
      var r = fr(t.createDocumentFragment());
      r.append(this);
    } else bt(this, e);
  }
  function ht(e) {
    return e.cloneNode(!0);
  }
  function pt(e) {
    $t(e);
    for (var t = 0, n = e.childNodes || []; n.length > t; t++) pt(n[t]);
  }
  function dt(e, t, n, r) {
    if (m(r))
      throw Or(
        'offargs',
        'jqLite#off() does not support the `selector` argument',
      );
    var i = vt(e, 'events'),
      a = vt(e, 'handle');
    a &&
      (g(t)
        ? o(i, function(t, n) {
            Tr(e, n, t), delete i[n];
          })
        : o(t.split(' '), function(t) {
            g(n) ? (Tr(e, t, i[t]), delete i[t]) : D(i[t] || [], n);
          }));
  }
  function $t(e, t) {
    var r = e[Cr],
      i = Sr[r];
    if (i) {
      if (t) return delete Sr[r].data[t], n;
      i.handle && (i.events.$destroy && i.handle({}, '$destroy'), dt(e)),
        delete Sr[r],
        (e[Cr] = n);
    }
  }
  function vt(e, t, r) {
    var i = e[Cr],
      o = Sr[i || -1];
    return m(r)
      ? (o || ((e[Cr] = i = ct()), (o = Sr[i] = {})), (o[t] = r), n)
      : o && o[t];
  }
  function gt(e, t, n) {
    var r = vt(e, 'data'),
      i = m(n),
      o = !i && m(t),
      a = o && !y(t);
    if ((r || a || vt(e, 'data', (r = {})), i)) r[t] = n;
    else {
      if (!o) return r;
      if (a) return r && r[t];
      f(r, t);
    }
  }
  function mt(e, t) {
    return e.getAttribute
      ? (' ' + (e.getAttribute('class') || '') + ' ')
          .replace(/[\n\t]/g, ' ')
          .indexOf(' ' + t + ' ') > -1
      : !1;
  }
  function yt(e, t) {
    t &&
      e.setAttribute &&
      o(t.split(' '), function(t) {
        e.setAttribute(
          'class',
          br(
            (' ' + (e.getAttribute('class') || '') + ' ')
              .replace(/[\n\t]/g, ' ')
              .replace(' ' + br(t) + ' ', ' '),
          ),
        );
      });
  }
  function wt(e, t) {
    if (t && e.setAttribute) {
      var n = (' ' + (e.getAttribute('class') || '') + ' ').replace(
        /[\n\t]/g,
        ' ',
      );
      o(t.split(' '), function(e) {
        (e = br(e)), -1 === n.indexOf(' ' + e + ' ') && (n += e + ' ');
      }),
        e.setAttribute('class', br(n));
    }
  }
  function bt(e, t) {
    if (t) {
      t = t.nodeName || !m(t.length) || E(t) ? [t] : t;
      for (var n = 0; t.length > n; n++) e.push(t[n]);
    }
  }
  function xt(e, t) {
    return kt(e, '$' + (t || 'ngController') + 'Controller');
  }
  function kt(e, t, r) {
    (e = fr(e)), 9 == e[0].nodeType && (e = e.find('html'));
    for (var i = k(t) ? t : [t]; e.length; ) {
      for (var o = 0, a = i.length; a > o; o++)
        if ((r = e.data(i[o])) !== n) return r;
      e = e.parent();
    }
  }
  function St(e) {
    for (var t = 0, n = e.childNodes; n.length > t; t++) pt(n[t]);
    for (; e.firstChild; ) e.removeChild(e.firstChild);
  }
  function Ct(e, t) {
    var n = Dr[t.toLowerCase()];
    return n && Nr[e.nodeName] && n;
  }
  function Et(e, n) {
    var r = function(r, i) {
      if (
        (r.preventDefault ||
          (r.preventDefault = function() {
            r.returnValue = !1;
          }),
        r.stopPropagation ||
          (r.stopPropagation = function() {
            r.cancelBubble = !0;
          }),
        r.target || (r.target = r.srcElement || t),
        g(r.defaultPrevented))
      ) {
        var a = r.preventDefault;
        (r.preventDefault = function() {
          (r.defaultPrevented = !0), a.call(r);
        }),
          (r.defaultPrevented = !1);
      }
      r.isDefaultPrevented = function() {
        return r.defaultPrevented || r.returnValue === !1;
      };
      var s = F(n[i || r.type] || []);
      o(s, function(t) {
        t.call(e, r);
      }),
        8 >= lr
          ? ((r.preventDefault = null),
            (r.stopPropagation = null),
            (r.isDefaultPrevented = null))
          : (delete r.preventDefault,
            delete r.stopPropagation,
            delete r.isDefaultPrevented);
    };
    return (r.elem = e), r;
  }
  function At(e) {
    var t,
      r = typeof e;
    return (
      'object' == r && null !== e
        ? 'function' == typeof (t = e.$$hashKey)
          ? (t = e.$$hashKey())
          : t === n && (t = e.$$hashKey = u())
        : (t = e),
      r + ':' + t
    );
  }
  function Tt(e) {
    o(e, this.put, this);
  }
  function Pt(e) {
    var t, n, r, i;
    return (
      'function' == typeof e
        ? (t = e.$inject) ||
          ((t = []),
          e.length &&
            ((n = ('' + e).replace(Ur, '')),
            (r = n.match(qr)),
            o(r[1].split(Rr), function(e) {
              e.replace(Ir, function(e, n, r) {
                t.push(r);
              });
            })),
          (e.$inject = t))
        : k(e)
        ? ((i = e.length - 1), nt(e[i], 'fn'), (t = e.slice(0, i)))
        : nt(e, 'fn', !0),
      t
    );
  }
  function jt(e) {
    function t(e) {
      return function(t, r) {
        return y(t) ? (o(t, c(e)), n) : e(t, r);
      };
    }
    function r(e, t) {
      if ((rt(e, 'service'), (S(t) || k(t)) && (t = x.instantiate(t)), !t.$get))
        throw Vr('pget', "Provider '{0}' must define $get factory method.", e);
      return (b[e + $] = t);
    }
    function i(e, t) {
      return r(e, {$get: t});
    }
    function a(e, t) {
      return i(e, [
        '$injector',
        function(e) {
          return e.instantiate(t);
        },
      ]);
    }
    function s(e, t) {
      return i(e, v(t));
    }
    function u(e, t) {
      rt(e, 'constant'), (b[e] = t), (C[e] = t);
    }
    function l(e, t) {
      var n = x.get(e + $),
        r = n.$get;
      n.$get = function() {
        var e = E.invoke(r, n);
        return E.invoke(t, null, {$delegate: e});
      };
    }
    function f(e) {
      var t,
        n,
        r,
        i,
        a = [];
      return (
        o(e, function(e) {
          if (!m.get(e)) {
            m.put(e, !0);
            try {
              if (w(e))
                for (
                  t = pr(e),
                    a = a.concat(f(t.requires)).concat(t._runBlocks),
                    n = t._invokeQueue,
                    r = 0,
                    i = n.length;
                  i > r;
                  r++
                ) {
                  var o = n[r],
                    s = x.get(o[0]);
                  s[o[1]].apply(s, o[2]);
                }
              else
                S(e)
                  ? a.push(x.invoke(e))
                  : k(e)
                  ? a.push(x.invoke(e))
                  : nt(e, 'module');
            } catch (c) {
              throw (k(e) && (e = e[e.length - 1]),
              c.message &&
                c.stack &&
                -1 == c.stack.indexOf(c.message) &&
                (c = c.message + '\n' + c.stack),
              Vr(
                'modulerr',
                'Failed to instantiate module {0} due to:\n{1}',
                e,
                c.stack || c.message || c,
              ));
            }
          }
        }),
        a
      );
    }
    function h(e, t) {
      function n(n) {
        if (e.hasOwnProperty(n)) {
          if (e[n] === p)
            throw Vr('cdep', 'Circular dependency found: {0}', g.join(' <- '));
          return e[n];
        }
        try {
          return g.unshift(n), (e[n] = p), (e[n] = t(n));
        } catch (r) {
          throw (e[n] === p && delete e[n], r);
        } finally {
          g.shift();
        }
      }
      function r(e, t, r) {
        var i,
          o,
          a,
          s = [],
          c = Pt(e);
        for (o = 0, i = c.length; i > o; o++) {
          if (((a = c[o]), 'string' != typeof a))
            throw Vr(
              'itkn',
              'Incorrect injection token! Expected service name as string, got {0}',
              a,
            );
          s.push(r && r.hasOwnProperty(a) ? r[a] : n(a));
        }
        return e.$inject || (e = e[i]), e.apply(t, s);
      }
      function i(e, t) {
        var n,
          i,
          o = function() {};
        return (
          (o.prototype = (k(e) ? e[e.length - 1] : e).prototype),
          (n = new o()),
          (i = r(e, n, t)),
          y(i) || S(i) ? i : n
        );
      }
      return {
        invoke: r,
        instantiate: i,
        get: n,
        annotate: Pt,
        has: function(t) {
          return b.hasOwnProperty(t + $) || e.hasOwnProperty(t);
        },
      };
    }
    var p = {},
      $ = 'Provider',
      g = [],
      m = new Tt(),
      b = {
        $provide: {
          provider: t(r),
          factory: t(i),
          service: t(a),
          value: t(s),
          constant: t(u),
          decorator: l,
        },
      },
      x = (b.$injector = h(b, function() {
        throw Vr('unpr', 'Unknown provider: {0}', g.join(' <- '));
      })),
      C = {},
      E = (C.$injector = h(C, function(e) {
        var t = x.get(e + $);
        return E.invoke(t.$get, t);
      }));
    return (
      o(f(e), function(e) {
        E.invoke(e || d);
      }),
      E
    );
  }
  function Ot() {
    var e = !0;
    (this.disableAutoScrolling = function() {
      e = !1;
    }),
      (this.$get = [
        '$window',
        '$location',
        '$rootScope',
        function(t, n, r) {
          function i(e) {
            var t = null;
            return (
              o(e, function(e) {
                t || 'a' !== ar(e.nodeName) || (t = e);
              }),
              t
            );
          }
          function a() {
            var e,
              r = n.hash();
            r
              ? (e = s.getElementById(r))
                ? e.scrollIntoView()
                : (e = i(s.getElementsByName(r)))
                ? e.scrollIntoView()
                : 'top' === r && t.scrollTo(0, 0)
              : t.scrollTo(0, 0);
          }
          var s = t.document;
          return (
            e &&
              r.$watch(
                function() {
                  return n.hash();
                },
                function() {
                  r.$evalAsync(a);
                },
              ),
            a
          );
        },
      ]);
  }
  function Mt(e, t, r, i) {
    function a(e) {
      try {
        e.apply(null, U(arguments, 1));
      } finally {
        if ((m--, 0 === m))
          for (; y.length; )
            try {
              y.pop()();
            } catch (t) {
              r.error(t);
            }
      }
    }
    function s(e, t) {
      (function n() {
        o(x, function(e) {
          e();
        }),
          (b = t(n, e));
      })();
    }
    function c() {
      (C = null),
        k != u.url() &&
          ((k = u.url()),
          o(E, function(e) {
            e(u.url());
          }));
    }
    var u = this,
      l = t[0],
      f = e.location,
      h = e.history,
      p = e.setTimeout,
      $ = e.clearTimeout,
      v = {};
    u.isMock = !1;
    var m = 0,
      y = [];
    (u.$$completeOutstandingRequest = a),
      (u.$$incOutstandingRequestCount = function() {
        m++;
      }),
      (u.notifyWhenNoOutstandingRequests = function(e) {
        o(x, function(e) {
          e();
        }),
          0 === m ? e() : y.push(e);
      });
    var b,
      x = [];
    u.addPollFn = function(e) {
      return g(b) && s(100, p), x.push(e), e;
    };
    var k = f.href,
      S = t.find('base'),
      C = null;
    u.url = function(t, n) {
      if (
        (f !== e.location && (f = e.location),
        h !== e.history && (h = e.history),
        t)
      ) {
        if (k == t) return;
        return (
          (k = t),
          i.history
            ? n
              ? h.replaceState(null, '', t)
              : (h.pushState(null, '', t), S.attr('href', S.attr('href')))
            : ((C = t), n ? f.replace(t) : (f.href = t)),
          u
        );
      }
      return C || f.href.replace(/%27/g, "'");
    };
    var E = [],
      A = !1;
    (u.onUrlChange = function(t) {
      return (
        A ||
          (i.history && fr(e).on('popstate', c),
          i.hashchange ? fr(e).on('hashchange', c) : u.addPollFn(c),
          (A = !0)),
        E.push(t),
        t
      );
    }),
      (u.baseHref = function() {
        var e = S.attr('href');
        return e ? e.replace(/^(https?\:)?\/\/[^\/]*/, '') : '';
      });
    var T = {},
      P = '',
      j = u.baseHref();
    (u.cookies = function(e, t) {
      var i, o, a, s, c;
      if (!e) {
        if (l.cookie !== P)
          for (
            P = l.cookie, o = P.split('; '), T = {}, s = 0;
            o.length > s;
            s++
          )
            (a = o[s]),
              (c = a.indexOf('=')),
              c > 0 &&
                ((e = unescape(a.substring(0, c))),
                T[e] === n && (T[e] = unescape(a.substring(c + 1))));
        return T;
      }
      t === n
        ? (l.cookie =
            escape(e) +
            '=;path=' +
            j +
            ';expires=Thu, 01 Jan 1970 00:00:00 GMT')
        : w(t) &&
          ((i =
            (l.cookie = escape(e) + '=' + escape(t) + ';path=' + j).length + 1),
          i > 4096 &&
            r.warn(
              "Cookie '" +
                e +
                "' possibly not set or overflowed because it was too large (" +
                i +
                ' > 4096 bytes)!',
            ));
    }),
      (u.defer = function(e, t) {
        var n;
        return (
          m++,
          (n = p(function() {
            delete v[n], a(e);
          }, t || 0)),
          (v[n] = !0),
          n
        );
      }),
      (u.defer.cancel = function(e) {
        return v[e] ? (delete v[e], $(e), a(d), !0) : !1;
      });
  }
  function Dt() {
    this.$get = [
      '$window',
      '$log',
      '$sniffer',
      '$document',
      function(e, t, n, r) {
        return new Mt(e, r, t, n);
      },
    ];
  }
  function Nt() {
    this.$get = function() {
      function e(e, i) {
        function o(e) {
          e != p &&
            (d ? d == e && (d = e.n) : (d = e),
            a(e.n, e.p),
            a(e, p),
            (p = e),
            (p.n = null));
        }
        function a(e, t) {
          e != t && (e && (e.p = t), t && (t.n = e));
        }
        if (e in t)
          throw r('$cacheFactory')('iid', "CacheId '{0}' is already taken!", e);
        var s = 0,
          c = f({}, i, {id: e}),
          u = {},
          l = (i && i.capacity) || Number.MAX_VALUE,
          h = {},
          p = null,
          d = null;
        return (t[e] = {
          put: function(e, t) {
            var r = h[e] || (h[e] = {key: e});
            return (
              o(r),
              g(t)
                ? n
                : (e in u || s++, (u[e] = t), s > l && this.remove(d.key), t)
            );
          },
          get: function(e) {
            var t = h[e];
            return t ? (o(t), u[e]) : void 0;
          },
          remove: function(e) {
            var t = h[e];
            t &&
              (t == p && (p = t.p),
              t == d && (d = t.n),
              a(t.n, t.p),
              delete h[e],
              delete u[e],
              s--);
          },
          removeAll: function() {
            (u = {}), (s = 0), (h = {}), (p = d = null);
          },
          destroy: function() {
            (u = null), (c = null), (h = null), delete t[e];
          },
          info: function() {
            return f({}, c, {size: s});
          },
        });
      }
      var t = {};
      return (
        (e.info = function() {
          var e = {};
          return (
            o(t, function(t, n) {
              e[n] = t.info();
            }),
            e
          );
        }),
        (e.get = function(e) {
          return t[e];
        }),
        e
      );
    };
  }
  function Ft() {
    this.$get = [
      '$cacheFactory',
      function(e) {
        return e('templates');
      },
    ];
  }
  function qt(e, r) {
    var i = {},
      a = 'Directive',
      s = /^\s*directive\:\s*([\d\w\-_]+)\s+(.*)$/,
      u = /(([\d\w\-_]+)(?:\:([^;]+))?;?)/,
      l = /^(on[a-z]+|formaction)$/;
    (this.directive = function h(t, n) {
      return (
        rt(t, 'directive'),
        w(t)
          ? (tt(n, 'directiveFactory'),
            i.hasOwnProperty(t) ||
              ((i[t] = []),
              e.factory(t + a, [
                '$injector',
                '$exceptionHandler',
                function(e, n) {
                  var r = [];
                  return (
                    o(i[t], function(i, o) {
                      try {
                        var a = e.invoke(i);
                        S(a)
                          ? (a = {compile: v(a)})
                          : !a.compile && a.link && (a.compile = v(a.link)),
                          (a.priority = a.priority || 0),
                          (a.index = o),
                          (a.name = a.name || t),
                          (a.require = a.require || (a.controller && a.name)),
                          (a.restrict = a.restrict || 'A'),
                          r.push(a);
                      } catch (s) {
                        n(s);
                      }
                    }),
                    r
                  );
                },
              ])),
            i[t].push(n))
          : o(t, c(h)),
        this
      );
    }),
      (this.aHrefSanitizationWhitelist = function(e) {
        return m(e)
          ? (r.aHrefSanitizationWhitelist(e), this)
          : r.aHrefSanitizationWhitelist();
      }),
      (this.imgSrcSanitizationWhitelist = function(e) {
        return m(e)
          ? (r.imgSrcSanitizationWhitelist(e), this)
          : r.imgSrcSanitizationWhitelist();
      }),
      (this.$get = [
        '$injector',
        '$interpolate',
        '$exceptionHandler',
        '$http',
        '$templateCache',
        '$parse',
        '$controller',
        '$rootScope',
        '$document',
        '$sce',
        '$animate',
        '$$sanitizeUri',
        function(e, r, c, h, d, g, m, b, x, C, E, A) {
          function T(e, t, n, r, i) {
            e instanceof fr || (e = fr(e)),
              o(e, function(t, n) {
                3 == t.nodeType &&
                  t.nodeValue.match(/\S+/) &&
                  (e[n] = t = fr(t)
                    .wrap('<span></span>')
                    .parent()[0]);
              });
            var a = j(e, t, e, n, r, i);
            return (
              P(e, 'ng-scope'),
              function(t, n, r) {
                tt(t, 'scope');
                var i = n ? Mr.clone.call(e) : e;
                o(r, function(e, t) {
                  i.data('$' + t + 'Controller', e);
                });
                for (var s = 0, c = i.length; c > s; s++) {
                  var u = i[s],
                    l = u.nodeType;
                  (1 === l || 9 === l) && i.eq(s).data('$scope', t);
                }
                return n && n(i, t), a && a(t, i, i), i;
              }
            );
          }
          function P(e, t) {
            try {
              e.addClass(t);
            } catch (n) {}
          }
          function j(e, t, r, i, o, a) {
            function s(e, r, i, o) {
              var a,
                s,
                c,
                u,
                l,
                f,
                h,
                p,
                $,
                v = r.length,
                g = Array(v);
              for (h = 0; v > h; h++) g[h] = r[h];
              for (h = 0, $ = 0, p = d.length; p > h; $++)
                (c = g[$]),
                  (a = d[h++]),
                  (s = d[h++]),
                  (u = fr(c)),
                  a
                    ? (a.scope
                        ? ((l = e.$new()), u.data('$scope', l))
                        : (l = e),
                      (f = a.transclude),
                      f || (!o && t)
                        ? a(s, l, c, i, O(e, f || t))
                        : a(s, l, c, i, o))
                    : s && s(e, c.childNodes, n, o);
            }
            for (var c, u, l, f, h, p, d = [], $ = 0; e.length > $; $++)
              (c = new K()),
                (u = M(e[$], [], c, 0 === $ ? i : n, o)),
                (l = u.length ? R(u, e[$], c, t, r, null, [], [], a) : null),
                l && l.scope && P(fr(e[$]), 'ng-scope'),
                (h =
                  (l && l.terminal) || !(f = e[$].childNodes) || !f.length
                    ? null
                    : j(f, l ? l.transclude : t)),
                d.push(l, h),
                (p = p || l || h),
                (a = null);
            return p ? s : null;
          }
          function O(e, t) {
            return function(n, r, i) {
              var o = !1;
              n || ((n = e.$new()), (n.$$transcluded = !0), (o = !0));
              var a = t(n, r, i);
              return o && a.on('$destroy', V(n, n.$destroy)), a;
            };
          }
          function M(e, t, n, r, i) {
            var o,
              a,
              c = e.nodeType,
              l = n.$attr;
            switch (c) {
              case 1:
                L(t, Rt(dr(e).toLowerCase()), 'E', r, i);
                for (
                  var f, h, p, d, $, v = e.attributes, g = 0, m = v && v.length;
                  m > g;
                  g++
                ) {
                  var y = !1,
                    b = !1;
                  if (((f = v[g]), !lr || lr >= 8 || f.specified)) {
                    (h = f.name),
                      (d = Rt(h)),
                      it.test(d) && (h = X(d.substr(6), '-'));
                    var x = d.replace(/(Start|End)$/, '');
                    d === x + 'Start' &&
                      ((y = h),
                      (b = h.substr(0, h.length - 5) + 'end'),
                      (h = h.substr(0, h.length - 6))),
                      (p = Rt(h.toLowerCase())),
                      (l[p] = h),
                      (n[p] = $ = br(f.value)),
                      Ct(e, p) && (n[p] = !0),
                      J(e, t, $, p),
                      L(t, p, 'A', r, i, y, b);
                  }
                }
                if (((a = e.className), w(a) && '' !== a))
                  for (; (o = u.exec(a)); )
                    (p = Rt(o[2])),
                      L(t, p, 'C', r, i) && (n[p] = br(o[3])),
                      (a = a.substr(o.index + o[0].length));
                break;
              case 3:
                G(t, e.nodeValue);
                break;
              case 8:
                try {
                  (o = s.exec(e.nodeValue)),
                    o &&
                      ((p = Rt(o[1])), L(t, p, 'M', r, i) && (n[p] = br(o[2])));
                } catch (k) {}
            }
            return t.sort(H), t;
          }
          function D(e, t, n) {
            var r = [],
              i = 0;
            if (t && e.hasAttribute && e.hasAttribute(t)) {
              do {
                if (!e)
                  throw zr(
                    'uterdir',
                    "Unterminated attribute, found '{0}' but no matching '{1}' found.",
                    t,
                    n,
                  );
                1 == e.nodeType &&
                  (e.hasAttribute(t) && i++, e.hasAttribute(n) && i--),
                  r.push(e),
                  (e = e.nextSibling);
              } while (i > 0);
            } else r.push(e);
            return fr(r);
          }
          function N(e, t, n) {
            return function(r, i, o, a, s) {
              return (i = D(i[0], t, n)), e(r, i, o, a, s);
            };
          }
          function R(e, i, a, s, u, l, f, h, p) {
            function d(e, t, n, r) {
              e &&
                (n && (e = N(e, n, r)),
                (e.require = x.require),
                (V === x || x.$$isolateScope) && (e = Z(e, {isolateScope: !0})),
                f.push(e)),
                t &&
                  (n && (t = N(t, n, r)),
                  (t.require = x.require),
                  (V === x || x.$$isolateScope) &&
                    (t = Z(t, {isolateScope: !0})),
                  h.push(t));
            }
            function $(e, t, n) {
              var r,
                i = 'data',
                a = !1;
              if (w(e)) {
                for (; '^' == (r = e.charAt(0)) || '?' == r; )
                  (e = e.substr(1)),
                    '^' == r && (i = 'inheritedData'),
                    (a = a || '?' == r);
                if (
                  ((r = null),
                  n && 'data' === i && (r = n[e]),
                  (r = r || t[i]('$' + e + 'Controller')),
                  !r && !a)
                )
                  throw zr(
                    'ctreq',
                    "Controller '{0}', required by directive '{1}', can't be found!",
                    e,
                    C,
                  );
                return r;
              }
              return (
                k(e) &&
                  ((r = []),
                  o(e, function(e) {
                    r.push($(e, t, n));
                  })),
                r
              );
            }
            function v(e, t, s, u, l) {
              function p(e, t) {
                var r;
                return (
                  2 > arguments.length && ((t = e), (e = n)),
                  Y && (r = C),
                  l(e, t, r)
                );
              }
              var d,
                v,
                y,
                w,
                b,
                x,
                k,
                S,
                C = {};
              if (
                ((d = i === s ? a : F(a, new K(fr(s), a.$attr))),
                (v = d.$$element),
                V)
              ) {
                var E = /^\s*([@=&])(\??)\s*(\w*)\s*$/,
                  A = fr(s);
                (k = t.$new(!0)),
                  L && L === V.$$originalDirective
                    ? A.data('$isolateScope', k)
                    : A.data('$isolateScopeNoTemplate', k),
                  P(A, 'ng-isolate-scope'),
                  o(V.scope, function(e, n) {
                    var i,
                      o,
                      a,
                      s,
                      c = e.match(E) || [],
                      u = c[3] || n,
                      l = '?' == c[2],
                      f = c[1];
                    switch (((k.$$isolateBindings[n] = f + u), f)) {
                      case '@':
                        d.$observe(u, function(e) {
                          k[n] = e;
                        }),
                          (d.$$observers[u].$$scope = t),
                          d[u] && (k[n] = r(d[u])(t));
                        break;
                      case '=':
                        if (l && !d[u]) return;
                        (o = g(d[u])),
                          (s = o.literal
                            ? q
                            : function(e, t) {
                                return e === t;
                              }),
                          (a =
                            o.assign ||
                            function() {
                              throw ((i = k[n] = o(t)),
                              zr(
                                'nonassign',
                                "Expression '{0}' used with directive '{1}' is non-assignable!",
                                d[u],
                                V.name,
                              ));
                            }),
                          (i = k[n] = o(t)),
                          k.$watch(
                            function() {
                              var e = o(t);
                              return (
                                s(e, k[n]) ||
                                  (s(e, i) ? a(t, (e = k[n])) : (k[n] = e)),
                                (i = e)
                              );
                            },
                            null,
                            o.literal,
                          );
                        break;
                      case '&':
                        (o = g(d[u])),
                          (k[n] = function(e) {
                            return o(t, e);
                          });
                        break;
                      default:
                        throw zr(
                          'iscp',
                          "Invalid isolate scope definition for directive '{0}'. Definition: {... {1}: '{2}' ...}",
                          V.name,
                          n,
                          e,
                        );
                    }
                  });
              }
              for (
                S = l && p,
                  R &&
                    o(R, function(e) {
                      var n,
                        r = {
                          $scope: e === V || e.$$isolateScope ? k : t,
                          $element: v,
                          $attrs: d,
                          $transclude: S,
                        };
                      (x = e.controller),
                        '@' == x && (x = d[e.name]),
                        (n = m(x, r)),
                        (C[e.name] = n),
                        Y || v.data('$' + e.name + 'Controller', n),
                        e.controllerAs && (r.$scope[e.controllerAs] = n);
                    }),
                  y = 0,
                  w = f.length;
                w > y;
                y++
              )
                try {
                  (b = f[y]),
                    b(
                      b.isolateScope ? k : t,
                      v,
                      d,
                      b.require && $(b.require, v, C),
                      S,
                    );
                } catch (T) {
                  c(T, B(v));
                }
              var j = t;
              for (
                V && (V.template || null === V.templateUrl) && (j = k),
                  e && e(j, s.childNodes, n, l),
                  y = h.length - 1;
                y >= 0;
                y--
              )
                try {
                  (b = h[y]),
                    b(
                      b.isolateScope ? k : t,
                      v,
                      d,
                      b.require && $(b.require, v, C),
                      S,
                    );
                } catch (T) {
                  c(T, B(v));
                }
            }
            p = p || {};
            for (
              var b,
                x,
                C,
                E,
                A,
                j,
                O = -Number.MAX_VALUE,
                R = p.controllerDirectives,
                V = p.newIsolateScopeDirective,
                L = p.templateDirective,
                H = p.nonTlbTranscludeDirective,
                G = !1,
                Y = !1,
                J = (a.$$element = fr(i)),
                X = l,
                et = s,
                tt = 0,
                nt = e.length;
              nt > tt;
              tt++
            ) {
              x = e[tt];
              var it = x.$$start,
                ot = x.$$end;
              if ((it && (J = D(i, it, ot)), (E = n), O > x.priority)) break;
              if (
                ((j = x.scope) &&
                  ((b = b || x),
                  x.templateUrl ||
                    (W('new/isolated scope', V, x, J), y(j) && (V = x))),
                (C = x.name),
                !x.templateUrl &&
                  x.controller &&
                  ((j = x.controller),
                  (R = R || {}),
                  W("'" + C + "' controller", R[C], x, J),
                  (R[C] = x)),
                (j = x.transclude) &&
                  ((G = !0),
                  x.$$tlb || (W('transclusion', H, x, J), (H = x)),
                  'element' == j
                    ? ((Y = !0),
                      (O = x.priority),
                      (E = D(i, it, ot)),
                      (J = a.$$element = fr(
                        t.createComment(' ' + C + ': ' + a[C] + ' '),
                      )),
                      (i = J[0]),
                      Q(u, fr(U(E)), i),
                      (et = T(E, s, O, X && X.name, {
                        nonTlbTranscludeDirective: H,
                      })))
                    : ((E = fr(ht(i)).contents()), J.empty(), (et = T(E, s)))),
                x.template)
              )
                if (
                  (W('template', L, x, J),
                  (L = x),
                  (j = S(x.template) ? x.template(J, a) : x.template),
                  (j = rt(j)),
                  x.replace)
                ) {
                  if (
                    ((X = x),
                    (E = fr('<div>' + br(j) + '</div>').contents()),
                    (i = E[0]),
                    1 != E.length || 1 !== i.nodeType)
                  )
                    throw zr(
                      'tplrt',
                      "Template for directive '{0}' must have exactly one root element. {1}",
                      C,
                      '',
                    );
                  Q(u, J, i);
                  var at = {$attr: {}},
                    st = M(i, [], at),
                    ct = e.splice(tt + 1, e.length - (tt + 1));
                  V && I(st),
                    (e = e.concat(st).concat(ct)),
                    _(a, at),
                    (nt = e.length);
                } else J.html(j);
              if (x.templateUrl)
                W('template', L, x, J),
                  (L = x),
                  x.replace && (X = x),
                  (v = z(e.splice(tt, e.length - tt), J, a, u, et, f, h, {
                    controllerDirectives: R,
                    newIsolateScopeDirective: V,
                    templateDirective: L,
                    nonTlbTranscludeDirective: H,
                  })),
                  (nt = e.length);
              else if (x.compile)
                try {
                  (A = x.compile(J, a, et)),
                    S(A) ? d(null, A, it, ot) : A && d(A.pre, A.post, it, ot);
                } catch (ut) {
                  c(ut, B(J));
                }
              x.terminal && ((v.terminal = !0), (O = Math.max(O, x.priority)));
            }
            return (v.scope = b && b.scope === !0), (v.transclude = G && et), v;
          }
          function I(e) {
            for (var t = 0, n = e.length; n > t; t++)
              e[t] = p(e[t], {$$isolateScope: !0});
          }
          function L(t, r, o, s, u, l, f) {
            if (r === u) return null;
            var h = null;
            if (i.hasOwnProperty(r))
              for (var d, $ = e.get(r + a), v = 0, g = $.length; g > v; v++)
                try {
                  (d = $[v]),
                    (s === n || s > d.priority) &&
                      -1 != d.restrict.indexOf(o) &&
                      (l && (d = p(d, {$$start: l, $$end: f})),
                      t.push(d),
                      (h = d));
                } catch (m) {
                  c(m);
                }
            return h;
          }
          function _(e, t) {
            var n = t.$attr,
              r = e.$attr,
              i = e.$$element;
            o(e, function(r, i) {
              '$' != i.charAt(0) &&
                (t[i] && (r += ('style' === i ? ';' : ' ') + t[i]),
                e.$set(i, r, !0, n[i]));
            }),
              o(t, function(t, o) {
                'class' == o
                  ? (P(i, t),
                    (e['class'] = (e['class'] ? e['class'] + ' ' : '') + t))
                  : 'style' == o
                  ? (i.attr('style', i.attr('style') + ';' + t),
                    (e.style = (e.style ? e.style + ';' : '') + t))
                  : '$' == o.charAt(0) ||
                    e.hasOwnProperty(o) ||
                    ((e[o] = t), (r[o] = n[o]));
              });
          }
          function z(e, t, n, r, i, a, s, c) {
            var u,
              l,
              p = [],
              $ = t[0],
              v = e.shift(),
              g = f({}, v, {
                templateUrl: null,
                transclude: null,
                replace: null,
                $$originalDirective: v,
              }),
              m = S(v.templateUrl) ? v.templateUrl(t, n) : v.templateUrl;
            return (
              t.empty(),
              h
                .get(C.getTrustedResourceUrl(m), {cache: d})
                .success(function(f) {
                  var h, d, w, b;
                  if (((f = rt(f)), v.replace)) {
                    if (
                      ((w = fr('<div>' + br(f) + '</div>').contents()),
                      (h = w[0]),
                      1 != w.length || 1 !== h.nodeType)
                    )
                      throw zr(
                        'tplrt',
                        "Template for directive '{0}' must have exactly one root element. {1}",
                        v.name,
                        m,
                      );
                    (d = {$attr: {}}), Q(r, t, h);
                    var x = M(h, [], d);
                    y(v.scope) && I(x), (e = x.concat(e)), _(n, d);
                  } else (h = $), t.html(f);
                  for (
                    e.unshift(g),
                      u = R(e, h, n, i, t, v, a, s, c),
                      o(r, function(e, n) {
                        e == h && (r[n] = t[0]);
                      }),
                      l = j(t[0].childNodes, i);
                    p.length;

                  ) {
                    var k = p.shift(),
                      S = p.shift(),
                      C = p.shift(),
                      E = p.shift(),
                      A = t[0];
                    S !== $ && ((A = ht(h)), Q(C, fr(S), A)),
                      (b = u.transclude ? O(k, u.transclude) : E),
                      u(l, k, A, r, b);
                  }
                  p = null;
                })
                .error(function(e, t, n, r) {
                  throw zr('tpload', 'Failed to load template: {0}', r.url);
                }),
              function(e, t, n, r, i) {
                p
                  ? (p.push(t), p.push(n), p.push(r), p.push(i))
                  : u(l, t, n, r, i);
              }
            );
          }
          function H(e, t) {
            var n = t.priority - e.priority;
            return 0 !== n
              ? n
              : e.name !== t.name
              ? e.name < t.name
                ? -1
                : 1
              : e.index - t.index;
          }
          function W(e, t, n, r) {
            if (t)
              throw zr(
                'multidir',
                'Multiple directives [{0}, {1}] asking for {2} on: {3}',
                t.name,
                n.name,
                e,
                B(r),
              );
          }
          function G(e, t) {
            var n = r(t, !0);
            n &&
              e.push({
                priority: 0,
                compile: v(function(e, t) {
                  var r = t.parent(),
                    i = r.data('$binding') || [];
                  i.push(n),
                    P(r.data('$binding', i), 'ng-binding'),
                    e.$watch(n, function(e) {
                      t[0].nodeValue = e;
                    });
                }),
              });
          }
          function Y(e, t) {
            if ('srcdoc' == t) return C.HTML;
            var r = dr(e);
            return 'xlinkHref' == t ||
              ('FORM' == r && 'action' == t) ||
              ('IMG' != r && ('src' == t || 'ngSrc' == t))
              ? C.RESOURCE_URL
              : n;
          }
          function J(e, t, n, i) {
            var o = r(n, !0);
            if (o) {
              if ('multiple' === i && 'SELECT' === dr(e))
                throw zr(
                  'selmulti',
                  "Binding to the 'multiple' attribute is not supported. Element: {0}",
                  B(e),
                );
              t.push({
                priority: 100,
                compile: function() {
                  return {
                    pre: function(t, n, a) {
                      var s = a.$$observers || (a.$$observers = {});
                      if (l.test(i))
                        throw zr(
                          'nodomevents',
                          'Interpolations for HTML DOM event attributes are disallowed.  Please use the ng- versions (such as ng-click instead of onclick) instead.',
                        );
                      (o = r(a[i], !0, Y(e, i))),
                        o &&
                          ((a[i] = o(t)),
                          ((s[i] || (s[i] = [])).$$inter = !0),
                          (
                            (a.$$observers && a.$$observers[i].$$scope) ||
                            t
                          ).$watch(o, function(e, t) {
                            'class' === i && e != t
                              ? a.$updateClass(e, t)
                              : a.$set(i, e);
                          }));
                    },
                  };
                },
              });
            }
          }
          function Q(e, n, r) {
            var i,
              o,
              a = n[0],
              s = n.length,
              c = a.parentNode;
            if (e)
              for (i = 0, o = e.length; o > i; i++)
                if (e[i] == a) {
                  e[i++] = r;
                  for (var u = i, l = u + s - 1, f = e.length; f > u; u++, l++)
                    f > l ? (e[u] = e[l]) : delete e[u];
                  e.length -= s - 1;
                  break;
                }
            c && c.replaceChild(r, a);
            var h = t.createDocumentFragment();
            h.appendChild(a), (r[fr.expando] = a[fr.expando]);
            for (var p = 1, d = n.length; d > p; p++) {
              var $ = n[p];
              fr($).remove(), h.appendChild($), delete n[p];
            }
            (n[0] = r), (n.length = 1);
          }
          function Z(e, t) {
            return f(
              function() {
                return e.apply(null, arguments);
              },
              e,
              t,
            );
          }
          var K = function(e, t) {
            (this.$$element = e), (this.$attr = t || {});
          };
          K.prototype = {
            $normalize: Rt,
            $addClass: function(e) {
              e && e.length > 0 && E.addClass(this.$$element, e);
            },
            $removeClass: function(e) {
              e && e.length > 0 && E.removeClass(this.$$element, e);
            },
            $updateClass: function(e, t) {
              this.$removeClass(It(t, e)), this.$addClass(It(e, t));
            },
            $set: function(e, t, r, i) {
              var a,
                s = Ct(this.$$element[0], e);
              s && (this.$$element.prop(e, t), (i = s)),
                (this[e] = t),
                i
                  ? (this.$attr[e] = i)
                  : ((i = this.$attr[e]), i || (this.$attr[e] = i = X(e, '-'))),
                (a = dr(this.$$element)),
                (('A' === a && 'href' === e) || ('IMG' === a && 'src' === e)) &&
                  (this[e] = t = A(t, 'src' === e)),
                r !== !1 &&
                  (null === t || t === n
                    ? this.$$element.removeAttr(i)
                    : this.$$element.attr(i, t));
              var u = this.$$observers;
              u &&
                o(u[e], function(e) {
                  try {
                    e(t);
                  } catch (n) {
                    c(n);
                  }
                });
            },
            $observe: function(e, t) {
              var n = this,
                r = n.$$observers || (n.$$observers = {}),
                i = r[e] || (r[e] = []);
              return (
                i.push(t),
                b.$evalAsync(function() {
                  i.$$inter || t(n[e]);
                }),
                t
              );
            },
          };
          var et = r.startSymbol(),
            nt = r.endSymbol(),
            rt =
              '{{' == et || '}}' == nt
                ? $
                : function rt(e) {
                    return e.replace(/\{\{/g, et).replace(/}}/g, nt);
                  },
            it = /^ngAttr[A-Z]/;
          return T;
        },
      ]);
  }
  function Rt(e) {
    return ut(e.replace(Hr, ''));
  }
  function It(e, t) {
    var n = '',
      r = e.split(/\s+/),
      i = t.split(/\s+/);
    e: for (var o = 0; r.length > o; o++) {
      for (var a = r[o], s = 0; i.length > s; s++) if (a == i[s]) continue e;
      n += (n.length > 0 ? ' ' : '') + a;
    }
    return n;
  }
  function Ut() {
    var e = {},
      t = /^(\S+)(\s+as\s+(\w+))?$/;
    (this.register = function(t, n) {
      rt(t, 'controller'), y(t) ? f(e, t) : (e[t] = n);
    }),
      (this.$get = [
        '$injector',
        '$window',
        function(n, i) {
          return function(o, a) {
            var s, c, u, l;
            if (
              (w(o) &&
                ((c = o.match(t)),
                (u = c[1]),
                (l = c[3]),
                (o = e.hasOwnProperty(u)
                  ? e[u]
                  : it(a.$scope, u, !0) || it(i, u, !0)),
                nt(o, u, !0)),
              (s = n.instantiate(o, a)),
              l)
            ) {
              if (!a || 'object' != typeof a.$scope)
                throw r('$controller')(
                  'noscp',
                  "Cannot export controller '{0}' as '{1}'! No $scope object provided via `locals`.",
                  u || o.name,
                  l,
                );
              a.$scope[l] = s;
            }
            return s;
          };
        },
      ]);
  }
  function Vt() {
    this.$get = [
      '$window',
      function(e) {
        return fr(e.document);
      },
    ];
  }
  function Lt() {
    this.$get = [
      '$log',
      function(e) {
        return function() {
          e.error.apply(e, arguments);
        };
      },
    ];
  }
  function _t(e) {
    var t,
      n,
      r,
      i = {};
    return e
      ? (o(e.split('\n'), function(e) {
          (r = e.indexOf(':')),
            (t = ar(br(e.substr(0, r)))),
            (n = br(e.substr(r + 1))),
            t && (i[t] ? (i[t] += ', ' + n) : (i[t] = n));
        }),
        i)
      : i;
  }
  function zt(e) {
    var t = y(e) ? e : n;
    return function(n) {
      return t || (t = _t(e)), n ? t[ar(n)] || null : t;
    };
  }
  function Ht(e, t, n) {
    return S(n)
      ? n(e, t)
      : (o(n, function(n) {
          e = n(e, t);
        }),
        e);
  }
  function Bt(e) {
    return e >= 200 && 300 > e;
  }
  function Wt() {
    var e = /^\s*(\[|\{[^\{])/,
      t = /[\}\]]\s*$/,
      r = /^\)\]\}',?\n/,
      i = {'Content-Type': 'application/json;charset=utf-8'},
      a = (this.defaults = {
        transformResponse: [
          function(n) {
            return (
              w(n) &&
                ((n = n.replace(r, '')), e.test(n) && t.test(n) && (n = z(n))),
              n
            );
          },
        ],
        transformRequest: [
          function(e) {
            return y(e) && !T(e) ? _(e) : e;
          },
        ],
        headers: {
          common: {Accept: 'application/json, text/plain, */*'},
          post: N(i),
          put: N(i),
          patch: N(i),
        },
        xsrfCookieName: 'XSRF-TOKEN',
        xsrfHeaderName: 'X-XSRF-TOKEN',
      }),
      c = (this.interceptors = []),
      u = (this.responseInterceptors = []);
    this.$get = [
      '$httpBackend',
      '$browser',
      '$cacheFactory',
      '$rootScope',
      '$q',
      '$injector',
      function(e, t, r, i, l, h) {
        function p(e) {
          function r(e) {
            var t = f({}, e, {
              data: Ht(e.data, e.headers, s.transformResponse),
            });
            return Bt(e.status) ? t : l.reject(t);
          }
          function i(e) {
            function t(e) {
              var t;
              o(e, function(n, r) {
                S(n) && ((t = n()), null != t ? (e[r] = t) : delete e[r]);
              });
            }
            var n,
              r,
              i,
              s = a.headers,
              c = f({}, e.headers);
            (s = f({}, s.common, s[ar(e.method)])), t(s), t(c);
            e: for (n in s) {
              r = ar(n);
              for (i in c) if (ar(i) === r) continue e;
              c[n] = s[n];
            }
            return c;
          }
          var s = {
              transformRequest: a.transformRequest,
              transformResponse: a.transformResponse,
            },
            c = i(e);
          f(s, e), (s.headers = c), (s.method = sr(s.method));
          var u = Nn(s.url)
            ? t.cookies()[s.xsrfCookieName || a.xsrfCookieName]
            : n;
          u && (c[s.xsrfHeaderName || a.xsrfHeaderName] = u);
          var h = function(e) {
              c = e.headers;
              var t = Ht(e.data, zt(c), e.transformRequest);
              return (
                g(e.data) &&
                  o(c, function(e, t) {
                    'content-type' === ar(t) && delete c[t];
                  }),
                g(e.withCredentials) &&
                  !g(a.withCredentials) &&
                  (e.withCredentials = a.withCredentials),
                v(e, t, c).then(r, r)
              );
            },
            p = [h, n],
            d = l.when(s);
          for (
            o(C, function(e) {
              (e.request || e.requestError) &&
                p.unshift(e.request, e.requestError),
                (e.response || e.responseError) &&
                  p.push(e.response, e.responseError);
            });
            p.length;

          ) {
            var $ = p.shift(),
              m = p.shift();
            d = d.then($, m);
          }
          return (
            (d.success = function(e) {
              return (
                d.then(function(t) {
                  e(t.data, t.status, t.headers, s);
                }),
                d
              );
            }),
            (d.error = function(e) {
              return (
                d.then(null, function(t) {
                  e(t.data, t.status, t.headers, s);
                }),
                d
              );
            }),
            d
          );
        }
        function d() {
          o(arguments, function(e) {
            p[e] = function(t, n) {
              return p(f(n || {}, {method: e, url: t}));
            };
          });
        }
        function $() {
          o(arguments, function(e) {
            p[e] = function(t, n, r) {
              return p(f(r || {}, {method: e, url: t, data: n}));
            };
          });
        }
        function v(t, n, r) {
          function o(e, t, n) {
            u && (Bt(e) ? u.put($, [e, t, _t(n)]) : u.remove($)),
              s(t, e, n),
              i.$$phase || i.$apply();
          }
          function s(e, n, r) {
            (n = Math.max(n, 0)),
              (Bt(n) ? h.resolve : h.reject)({
                data: e,
                status: n,
                headers: zt(r),
                config: t,
              });
          }
          function c() {
            var e = M(p.pendingRequests, t);
            -1 !== e && p.pendingRequests.splice(e, 1);
          }
          var u,
            f,
            h = l.defer(),
            d = h.promise,
            $ = b(t.url, t.params);
          if (
            (p.pendingRequests.push(t),
            d.then(c, c),
            (t.cache || a.cache) &&
              t.cache !== !1 &&
              'GET' == t.method &&
              (u = y(t.cache) ? t.cache : y(a.cache) ? a.cache : x),
            u)
          )
            if (((f = u.get($)), m(f))) {
              if (f.then) return f.then(c, c), f;
              k(f) ? s(f[1], f[0], N(f[2])) : s(f, 200, {});
            } else u.put($, d);
          return (
            g(f) &&
              e(
                t.method,
                $,
                n,
                o,
                r,
                t.timeout,
                t.withCredentials,
                t.responseType,
              ),
            d
          );
        }
        function b(e, t) {
          if (!t) return e;
          var n = [];
          return (
            s(t, function(e, t) {
              null === e ||
                g(e) ||
                (k(e) || (e = [e]),
                o(e, function(e) {
                  y(e) && (e = _(e)), n.push(Q(t) + '=' + Q(e));
                }));
            }),
            e + (-1 == e.indexOf('?') ? '?' : '&') + n.join('&')
          );
        }
        var x = r('$http'),
          C = [];
        return (
          o(c, function(e) {
            C.unshift(w(e) ? h.get(e) : h.invoke(e));
          }),
          o(u, function(e, t) {
            var n = w(e) ? h.get(e) : h.invoke(e);
            C.splice(t, 0, {
              response: function(e) {
                return n(l.when(e));
              },
              responseError: function(e) {
                return n(l.reject(e));
              },
            });
          }),
          (p.pendingRequests = []),
          d('get', 'delete', 'head', 'jsonp'),
          $('post', 'put'),
          (p.defaults = a),
          p
        );
      },
    ];
  }
  function Gt(t) {
    return 8 >= lr && 'patch' === ar(t)
      ? new ActiveXObject('Microsoft.XMLHTTP')
      : new e.XMLHttpRequest();
  }
  function Yt() {
    this.$get = [
      '$browser',
      '$window',
      '$document',
      function(e, t, n) {
        return Jt(e, Gt, e.defer, t.angular.callbacks, n[0]);
      },
    ];
  }
  function Jt(e, t, n, r, i) {
    function a(e, t) {
      var n = i.createElement('script'),
        r = function() {
          (n.onreadystatechange = n.onload = n.onerror = null),
            i.body.removeChild(n),
            t && t();
        };
      return (
        (n.type = 'text/javascript'),
        (n.src = e),
        lr && 8 >= lr
          ? (n.onreadystatechange = function() {
              /loaded|complete/.test(n.readyState) && r();
            })
          : (n.onload = n.onerror = function() {
              r();
            }),
        i.body.appendChild(n),
        r
      );
    }
    var s = -1;
    return function(i, c, u, l, f, h, p, $) {
      function v() {
        (y = s), b && b(), x && x.abort();
      }
      function g(t, r, i, o) {
        k && n.cancel(k),
          (b = x = null),
          (r = 0 === r ? (i ? 200 : 404) : r),
          (r = 1223 == r ? 204 : r),
          t(r, i, o),
          e.$$completeOutstandingRequest(d);
      }
      var y;
      if (
        (e.$$incOutstandingRequestCount(), (c = c || e.url()), 'jsonp' == ar(i))
      ) {
        var w = '_' + (r.counter++).toString(36);
        r[w] = function(e) {
          r[w].data = e;
        };
        var b = a(
          c.replace('JSON_CALLBACK', 'angular.callbacks.' + w),
          function() {
            r[w].data ? g(l, 200, r[w].data) : g(l, y || -2), (r[w] = yr.noop);
          },
        );
      } else {
        var x = t(i);
        x.open(i, c, !0),
          o(f, function(e, t) {
            m(e) && x.setRequestHeader(t, e);
          }),
          (x.onreadystatechange = function() {
            if (x && 4 == x.readyState) {
              var e = null,
                t = null;
              y !== s &&
                ((e = x.getAllResponseHeaders()),
                (t = 'response' in x ? x.response : x.responseText)),
                g(l, y || x.status, t, e);
            }
          }),
          p && (x.withCredentials = !0),
          $ && (x.responseType = $),
          x.send(u || null);
      }
      if (h > 0) var k = n(v, h);
      else h && h.then && h.then(v);
    };
  }
  function Qt() {
    var e = '{{',
      t = '}}';
    (this.startSymbol = function(t) {
      return t ? ((e = t), this) : e;
    }),
      (this.endSymbol = function(e) {
        return e ? ((t = e), this) : t;
      }),
      (this.$get = [
        '$parse',
        '$exceptionHandler',
        '$sce',
        function(r, i, o) {
          function a(a, u, l) {
            for (
              var f, h, p, d, $ = 0, v = [], m = a.length, y = !1, w = [];
              m > $;

            )
              -1 != (f = a.indexOf(e, $)) && -1 != (h = a.indexOf(t, f + s))
                ? ($ != f && v.push(a.substring($, f)),
                  v.push((p = r((d = a.substring(f + s, h))))),
                  (p.exp = d),
                  ($ = h + c),
                  (y = !0))
                : ($ != m && v.push(a.substring($)), ($ = m));
            if (((m = v.length) || (v.push(''), (m = 1)), l && v.length > 1))
              throw Br(
                'noconcat',
                'Error while interpolating: {0}\nStrict Contextual Escaping disallows interpolations that concatenate multiple expressions when a trusted value is required.  See http://docs.angularjs.org/api/ng.$sce',
                a,
              );
            return !u || y
              ? ((w.length = m),
                (p = function(e) {
                  try {
                    for (var t, n = 0, r = m; r > n; n++)
                      'function' == typeof (t = v[n]) &&
                        ((t = t(e)),
                        (t = l ? o.getTrusted(l, t) : o.valueOf(t)),
                        null === t || g(t)
                          ? (t = '')
                          : 'string' != typeof t && (t = _(t))),
                        (w[n] = t);
                    return w.join('');
                  } catch (s) {
                    var c = Br(
                      'interr',
                      "Can't interpolate: {0}\n{1}",
                      a,
                      '' + s,
                    );
                    i(c);
                  }
                }),
                (p.exp = a),
                (p.parts = v),
                p)
              : n;
          }
          var s = e.length,
            c = t.length;
          return (
            (a.startSymbol = function() {
              return e;
            }),
            (a.endSymbol = function() {
              return t;
            }),
            a
          );
        },
      ]);
  }
  function Zt() {
    this.$get = [
      '$rootScope',
      '$window',
      '$q',
      function(e, t, n) {
        function r(r, o, a, s) {
          var c = t.setInterval,
            u = t.clearInterval,
            l = n.defer(),
            f = l.promise,
            h = 0,
            p = m(s) && !s;
          return (
            (a = m(a) ? a : 0),
            f.then(null, null, r),
            (f.$$intervalId = c(function() {
              l.notify(h++),
                a > 0 &&
                  h >= a &&
                  (l.resolve(h), u(f.$$intervalId), delete i[f.$$intervalId]),
                p || e.$apply();
            }, o)),
            (i[f.$$intervalId] = l),
            f
          );
        }
        var i = {};
        return (
          (r.cancel = function(e) {
            return e && e.$$intervalId in i
              ? (i[e.$$intervalId].reject('canceled'),
                clearInterval(e.$$intervalId),
                delete i[e.$$intervalId],
                !0)
              : !1;
          }),
          r
        );
      },
    ];
  }
  function Kt() {
    this.$get = function() {
      return {
        id: 'en-us',
        NUMBER_FORMATS: {
          DECIMAL_SEP: '.',
          GROUP_SEP: ',',
          PATTERNS: [
            {
              minInt: 1,
              minFrac: 0,
              maxFrac: 3,
              posPre: '',
              posSuf: '',
              negPre: '-',
              negSuf: '',
              gSize: 3,
              lgSize: 3,
            },
            {
              minInt: 1,
              minFrac: 2,
              maxFrac: 2,
              posPre: '¤',
              posSuf: '',
              negPre: '(¤',
              negSuf: ')',
              gSize: 3,
              lgSize: 3,
            },
          ],
          CURRENCY_SYM: '$',
        },
        DATETIME_FORMATS: {
          MONTH: 'January,February,March,April,May,June,July,August,September,October,November,December'.split(
            ',',
          ),
          SHORTMONTH: 'Jan,Feb,Mar,Apr,May,Jun,Jul,Aug,Sep,Oct,Nov,Dec'.split(
            ',',
          ),
          DAY: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday'.split(
            ',',
          ),
          SHORTDAY: 'Sun,Mon,Tue,Wed,Thu,Fri,Sat'.split(','),
          AMPMS: ['AM', 'PM'],
          medium: 'MMM d, y h:mm:ss a',
          short: 'M/d/yy h:mm a',
          fullDate: 'EEEE, MMMM d, y',
          longDate: 'MMMM d, y',
          mediumDate: 'MMM d, y',
          shortDate: 'M/d/yy',
          mediumTime: 'h:mm:ss a',
          shortTime: 'h:mm a',
        },
        pluralCat: function(e) {
          return 1 === e ? 'one' : 'other';
        },
      };
    };
  }
  function Xt(e) {
    for (var t = e.split('/'), n = t.length; n--; ) t[n] = J(t[n]);
    return t.join('/');
  }
  function en(e, t, n) {
    var r = Dn(e, n);
    (t.$$protocol = r.protocol),
      (t.$$host = r.hostname),
      (t.$$port = h(r.port) || Gr[r.protocol] || null);
  }
  function tn(e, t, n) {
    var r = '/' !== e.charAt(0);
    r && (e = '/' + e);
    var i = Dn(e, n);
    (t.$$path = decodeURIComponent(
      r && '/' === i.pathname.charAt(0) ? i.pathname.substring(1) : i.pathname,
    )),
      (t.$$search = G(i.search)),
      (t.$$hash = decodeURIComponent(i.hash)),
      t.$$path && '/' != t.$$path.charAt(0) && (t.$$path = '/' + t.$$path);
  }
  function nn(e, t) {
    return 0 === t.indexOf(e) ? t.substr(e.length) : n;
  }
  function rn(e) {
    var t = e.indexOf('#');
    return -1 == t ? e : e.substr(0, t);
  }
  function on(e) {
    return e.substr(0, rn(e).lastIndexOf('/') + 1);
  }
  function an(e) {
    return e.substring(0, e.indexOf('/', e.indexOf('//') + 2));
  }
  function sn(e, t) {
    (this.$$html5 = !0), (t = t || '');
    var r = on(e);
    en(e, this, e),
      (this.$$parse = function(t) {
        var n = nn(r, t);
        if (!w(n))
          throw Yr(
            'ipthprfx',
            'Invalid url "{0}", missing path prefix "{1}".',
            t,
            r,
          );
        tn(n, this, e), this.$$path || (this.$$path = '/'), this.$$compose();
      }),
      (this.$$compose = function() {
        var e = Y(this.$$search),
          t = this.$$hash ? '#' + J(this.$$hash) : '';
        (this.$$url = Xt(this.$$path) + (e ? '?' + e : '') + t),
          (this.$$absUrl = r + this.$$url.substr(1));
      }),
      (this.$$rewrite = function(i) {
        var o, a;
        return (o = nn(e, i)) !== n
          ? ((a = o), (o = nn(t, o)) !== n ? r + (nn('/', o) || o) : e + a)
          : (o = nn(r, i)) !== n
          ? r + o
          : r == i + '/'
          ? r
          : n;
      });
  }
  function cn(e, t) {
    var r = on(e);
    en(e, this, e),
      (this.$$parse = function(n) {
        function i(e, t, n) {
          var r,
            i = /^\/?.*?:(\/.*)/;
          return (
            0 === t.indexOf(n) && (t = t.replace(n, '')),
            i.exec(t) ? e : ((r = i.exec(e)), r ? r[1] : e)
          );
        }
        var o = nn(e, n) || nn(r, n),
          a = '#' == o.charAt(0) ? nn(t, o) : this.$$html5 ? o : '';
        if (!w(a))
          throw Yr(
            'ihshprfx',
            'Invalid url "{0}", missing hash prefix "{1}".',
            n,
            t,
          );
        tn(a, this, e), (this.$$path = i(this.$$path, a, e)), this.$$compose();
      }),
      (this.$$compose = function() {
        var n = Y(this.$$search),
          r = this.$$hash ? '#' + J(this.$$hash) : '';
        (this.$$url = Xt(this.$$path) + (n ? '?' + n : '') + r),
          (this.$$absUrl = e + (this.$$url ? t + this.$$url : ''));
      }),
      (this.$$rewrite = function(t) {
        return rn(e) == rn(t) ? t : n;
      });
  }
  function un(e, t) {
    (this.$$html5 = !0), cn.apply(this, arguments);
    var r = on(e);
    this.$$rewrite = function(i) {
      var o;
      return e == rn(i)
        ? i
        : (o = nn(r, i))
        ? e + t + o
        : r === i + '/'
        ? r
        : n;
    };
  }
  function ln(e) {
    return function() {
      return this[e];
    };
  }
  function fn(e, t) {
    return function(n) {
      return g(n) ? this[e] : ((this[e] = t(n)), this.$$compose(), this);
    };
  }
  function hn() {
    var t = '',
      n = !1;
    (this.hashPrefix = function(e) {
      return m(e) ? ((t = e), this) : t;
    }),
      (this.html5Mode = function(e) {
        return m(e) ? ((n = e), this) : n;
      }),
      (this.$get = [
        '$rootScope',
        '$browser',
        '$sniffer',
        '$rootElement',
        function(r, i, o, a) {
          function s(e) {
            r.$broadcast('$locationChangeSuccess', c.absUrl(), e);
          }
          var c,
            u,
            l,
            f = i.baseHref(),
            h = i.url();
          n
            ? ((l = an(h) + (f || '/')), (u = o.history ? sn : un))
            : ((l = rn(h)), (u = cn)),
            (c = new u(l, '#' + t)),
            c.$$parse(c.$$rewrite(h)),
            a.on('click', function(t) {
              if (!t.ctrlKey && !t.metaKey && 2 != t.which) {
                for (var n = fr(t.target); 'a' !== ar(n[0].nodeName); )
                  if (n[0] === a[0] || !(n = n.parent())[0]) return;
                var o = n.prop('href');
                y(o) &&
                  '[object SVGAnimatedString]' == '' + o &&
                  (o = Dn(o.animVal).href);
                var s = c.$$rewrite(o);
                o &&
                  !n.attr('target') &&
                  s &&
                  !t.isDefaultPrevented() &&
                  (t.preventDefault(),
                  s != i.url() &&
                    (c.$$parse(s),
                    r.$apply(),
                    (e.angular['ff-684208-preventDefault'] = !0)));
              }
            }),
            c.absUrl() != h && i.url(c.absUrl(), !0),
            i.onUrlChange(function(e) {
              c.absUrl() != e &&
                (r.$evalAsync(function() {
                  var t = c.absUrl();
                  c.$$parse(e),
                    r.$broadcast('$locationChangeStart', e, t).defaultPrevented
                      ? (c.$$parse(t), i.url(t))
                      : s(t);
                }),
                r.$$phase || r.$digest());
            });
          var p = 0;
          return (
            r.$watch(function() {
              var e = i.url(),
                t = c.$$replace;
              return (
                (p && e == c.absUrl()) ||
                  (p++,
                  r.$evalAsync(function() {
                    r.$broadcast('$locationChangeStart', c.absUrl(), e)
                      .defaultPrevented
                      ? c.$$parse(e)
                      : (i.url(c.absUrl(), t), s(e));
                  })),
                (c.$$replace = !1),
                p
              );
            }),
            c
          );
        },
      ]);
  }
  function pn() {
    var e = !0,
      t = this;
    (this.debugEnabled = function(t) {
      return m(t) ? ((e = t), this) : e;
    }),
      (this.$get = [
        '$window',
        function(n) {
          function r(e) {
            return (
              e instanceof Error &&
                (e.stack
                  ? (e =
                      e.message && -1 === e.stack.indexOf(e.message)
                        ? 'Error: ' + e.message + '\n' + e.stack
                        : e.stack)
                  : e.sourceURL &&
                    (e = e.message + '\n' + e.sourceURL + ':' + e.line)),
              e
            );
          }
          function i(e) {
            var t = n.console || {},
              i = t[e] || t.log || d,
              a = !1;
            try {
              a = !!i.apply;
            } catch (s) {}
            return a
              ? function() {
                  var e = [];
                  return (
                    o(arguments, function(t) {
                      e.push(r(t));
                    }),
                    i.apply(t, e)
                  );
                }
              : function(e, t) {
                  i(e, null == t ? '' : t);
                };
          }
          return {
            log: i('log'),
            info: i('info'),
            warn: i('warn'),
            error: i('error'),
            debug: (function() {
              var n = i('debug');
              return function() {
                e && n.apply(t, arguments);
              };
            })(),
          };
        },
      ]);
  }
  function dn(e, t) {
    if ('constructor' === e)
      throw Qr(
        'isecfld',
        'Referencing "constructor" field in Angular expressions is disallowed! Expression: {0}',
        t,
      );
    return e;
  }
  function $n(e, t) {
    if (e) {
      if (e.constructor === e)
        throw Qr(
          'isecfn',
          'Referencing Function in Angular expressions is disallowed! Expression: {0}',
          t,
        );
      if (e.document && e.location && e.alert && e.setInterval)
        throw Qr(
          'isecwindow',
          'Referencing the Window in Angular expressions is disallowed! Expression: {0}',
          t,
        );
      if (e.children && (e.nodeName || (e.on && e.find)))
        throw Qr(
          'isecdom',
          'Referencing DOM nodes in Angular expressions is disallowed! Expression: {0}',
          t,
        );
    }
    return e;
  }
  function vn(e, t, r, i, o) {
    o = o || {};
    for (var a, s = t.split('.'), c = 0; s.length > 1; c++) {
      a = dn(s.shift(), i);
      var u = e[a];
      u || ((u = {}), (e[a] = u)),
        (e = u),
        e.then &&
          o.unwrapPromises &&
          (Jr(i),
          '$$v' in e ||
            (function(e) {
              e.then(function(t) {
                e.$$v = t;
              });
            })(e),
          e.$$v === n && (e.$$v = {}),
          (e = e.$$v));
    }
    return (a = dn(s.shift(), i)), (e[a] = r), r;
  }
  function gn(e, t, r, i, o, a, s) {
    return (
      dn(e, a),
      dn(t, a),
      dn(r, a),
      dn(i, a),
      dn(o, a),
      s.unwrapPromises
        ? function(s, c) {
            var u,
              l = c && c.hasOwnProperty(e) ? c : s;
            return null == l
              ? l
              : ((l = l[e]),
                l &&
                  l.then &&
                  (Jr(a),
                  '$$v' in l ||
                    ((u = l),
                    (u.$$v = n),
                    u.then(function(e) {
                      u.$$v = e;
                    })),
                  (l = l.$$v)),
                t
                  ? null == l
                    ? n
                    : ((l = l[t]),
                      l &&
                        l.then &&
                        (Jr(a),
                        '$$v' in l ||
                          ((u = l),
                          (u.$$v = n),
                          u.then(function(e) {
                            u.$$v = e;
                          })),
                        (l = l.$$v)),
                      r
                        ? null == l
                          ? n
                          : ((l = l[r]),
                            l &&
                              l.then &&
                              (Jr(a),
                              '$$v' in l ||
                                ((u = l),
                                (u.$$v = n),
                                u.then(function(e) {
                                  u.$$v = e;
                                })),
                              (l = l.$$v)),
                            i
                              ? null == l
                                ? n
                                : ((l = l[i]),
                                  l &&
                                    l.then &&
                                    (Jr(a),
                                    '$$v' in l ||
                                      ((u = l),
                                      (u.$$v = n),
                                      u.then(function(e) {
                                        u.$$v = e;
                                      })),
                                    (l = l.$$v)),
                                  o
                                    ? null == l
                                      ? n
                                      : ((l = l[o]),
                                        l &&
                                          l.then &&
                                          (Jr(a),
                                          '$$v' in l ||
                                            ((u = l),
                                            (u.$$v = n),
                                            u.then(function(e) {
                                              u.$$v = e;
                                            })),
                                          (l = l.$$v)),
                                        l)
                                    : l)
                              : l)
                        : l)
                  : l);
          }
        : function(a, s) {
            var c = s && s.hasOwnProperty(e) ? s : a;
            return null == c
              ? c
              : ((c = c[e]),
                t
                  ? null == c
                    ? n
                    : ((c = c[t]),
                      r
                        ? null == c
                          ? n
                          : ((c = c[r]),
                            i
                              ? null == c
                                ? n
                                : ((c = c[i]),
                                  o ? (null == c ? n : (c = c[o])) : c)
                              : c)
                        : c)
                  : c);
          }
    );
  }
  function mn(e, t) {
    return (
      dn(e, t),
      function(t, r) {
        return null == t ? n : (r && r.hasOwnProperty(e) ? r : t)[e];
      }
    );
  }
  function yn(e, t, r) {
    return (
      dn(e, r),
      dn(t, r),
      function(r, i) {
        return null == r
          ? n
          : ((r = (i && i.hasOwnProperty(e) ? i : r)[e]), null == r ? n : r[t]);
      }
    );
  }
  function wn(e, t, r) {
    if (ni.hasOwnProperty(e)) return ni[e];
    var i,
      a = e.split('.'),
      s = a.length;
    if (t.unwrapPromises || 1 !== s)
      if (t.unwrapPromises || 2 !== s)
        if (t.csp)
          i =
            6 > s
              ? gn(a[0], a[1], a[2], a[3], a[4], r, t)
              : function(e, i) {
                  var o,
                    c = 0;
                  do
                    (o = gn(a[c++], a[c++], a[c++], a[c++], a[c++], r, t)(
                      e,
                      i,
                    )),
                      (i = n),
                      (e = o);
                  while (s > c);
                  return o;
                };
        else {
          var c = 'var p;\n';
          o(a, function(e, n) {
            dn(e, r),
              (c +=
                'if(s == null) return undefined;\ns=' +
                (n ? 's' : '((k&&k.hasOwnProperty("' + e + '"))?k:s)') +
                '["' +
                e +
                '"]' +
                ';\n' +
                (t.unwrapPromises
                  ? 'if (s && s.then) {\n pw("' +
                    r.replace(/(["\r\n])/g, '\\$1') +
                    '");\n' +
                    ' if (!("$$v" in s)) {\n' +
                    ' p=s;\n' +
                    ' p.$$v = undefined;\n' +
                    ' p.then(function(v) {p.$$v=v;});\n' +
                    '}\n' +
                    ' s=s.$$v\n' +
                    '}\n'
                  : ''));
          }),
            (c += 'return s;');
          var u = Function('s', 'k', 'pw', c);
          (u.toString = v(c)),
            (i = t.unwrapPromises
              ? function(e, t) {
                  return u(e, t, Jr);
                }
              : u);
        }
      else i = yn(a[0], a[1], r);
    else i = mn(a[0], r);
    return 'hasOwnProperty' !== e && (ni[e] = i), i;
  }
  function bn() {
    var e = {},
      t = {csp: !1, unwrapPromises: !1, logPromiseWarnings: !0};
    (this.unwrapPromises = function(e) {
      return m(e) ? ((t.unwrapPromises = !!e), this) : t.unwrapPromises;
    }),
      (this.logPromiseWarnings = function(e) {
        return m(e) ? ((t.logPromiseWarnings = e), this) : t.logPromiseWarnings;
      }),
      (this.$get = [
        '$filter',
        '$sniffer',
        '$log',
        function(n, r, i) {
          return (
            (t.csp = r.csp),
            (Jr = function(e) {
              t.logPromiseWarnings &&
                !Zr.hasOwnProperty(e) &&
                ((Zr[e] = !0),
                i.warn(
                  '[$parse] Promise found in the expression `' +
                    e +
                    '`. ' +
                    'Automatic unwrapping of promises in Angular expressions is deprecated.',
                ));
            }),
            function(r) {
              var i;
              switch (typeof r) {
                case 'string':
                  if (e.hasOwnProperty(r)) return e[r];
                  var o = new ei(t),
                    a = new ti(o, n, t);
                  return (
                    (i = a.parse(r, !1)),
                    'hasOwnProperty' !== r && (e[r] = i),
                    i
                  );
                case 'function':
                  return r;
                default:
                  return d;
              }
            }
          );
        },
      ]);
  }
  function xn() {
    this.$get = [
      '$rootScope',
      '$exceptionHandler',
      function(e, t) {
        return kn(function(t) {
          e.$evalAsync(t);
        }, t);
      },
    ];
  }
  function kn(e, t) {
    function r(e) {
      return e;
    }
    function i(e) {
      return u(e);
    }
    function a(e) {
      var t = s(),
        n = 0,
        r = k(e) ? [] : {};
      return (
        o(e, function(e, i) {
          n++,
            c(e).then(
              function(e) {
                r.hasOwnProperty(i) || ((r[i] = e), --n || t.resolve(r));
              },
              function(e) {
                r.hasOwnProperty(i) || t.reject(e);
              },
            );
        }),
        0 === n && t.resolve(r),
        t.promise
      );
    }
    var s = function() {
        var o,
          a,
          l = [];
        return (a = {
          resolve: function(t) {
            if (l) {
              var r = l;
              (l = n),
                (o = c(t)),
                r.length &&
                  e(function() {
                    for (var e, t = 0, n = r.length; n > t; t++)
                      (e = r[t]), o.then(e[0], e[1], e[2]);
                  });
            }
          },
          reject: function(e) {
            a.resolve(u(e));
          },
          notify: function(t) {
            if (l) {
              var n = l;
              l.length &&
                e(function() {
                  for (var e, r = 0, i = n.length; i > r; r++)
                    (e = n[r]), e[2](t);
                });
            }
          },
          promise: {
            then: function(e, n, a) {
              var c = s(),
                u = function(n) {
                  try {
                    c.resolve((S(e) ? e : r)(n));
                  } catch (i) {
                    c.reject(i), t(i);
                  }
                },
                f = function(e) {
                  try {
                    c.resolve((S(n) ? n : i)(e));
                  } catch (r) {
                    c.reject(r), t(r);
                  }
                },
                h = function(e) {
                  try {
                    c.notify((S(a) ? a : r)(e));
                  } catch (n) {
                    t(n);
                  }
                };
              return l ? l.push([u, f, h]) : o.then(u, f, h), c.promise;
            },
            catch: function(e) {
              return this.then(null, e);
            },
            finally: function(e) {
              function t(e, t) {
                var n = s();
                return t ? n.resolve(e) : n.reject(e), n.promise;
              }
              function n(n, i) {
                var o = null;
                try {
                  o = (e || r)();
                } catch (a) {
                  return t(a, !1);
                }
                return o && S(o.then)
                  ? o.then(
                      function() {
                        return t(n, i);
                      },
                      function(e) {
                        return t(e, !1);
                      },
                    )
                  : t(n, i);
              }
              return this.then(
                function(e) {
                  return n(e, !0);
                },
                function(e) {
                  return n(e, !1);
                },
              );
            },
          },
        });
      },
      c = function(t) {
        return t && S(t.then)
          ? t
          : {
              then: function(n) {
                var r = s();
                return (
                  e(function() {
                    r.resolve(n(t));
                  }),
                  r.promise
                );
              },
            };
      },
      u = function(n) {
        return {
          then: function(r, o) {
            var a = s();
            return (
              e(function() {
                try {
                  a.resolve((S(o) ? o : i)(n));
                } catch (e) {
                  a.reject(e), t(e);
                }
              }),
              a.promise
            );
          },
        };
      },
      l = function(n, o, a, l) {
        var f,
          h = s(),
          p = function(e) {
            try {
              return (S(o) ? o : r)(e);
            } catch (n) {
              return t(n), u(n);
            }
          },
          d = function(e) {
            try {
              return (S(a) ? a : i)(e);
            } catch (n) {
              return t(n), u(n);
            }
          },
          $ = function(e) {
            try {
              return (S(l) ? l : r)(e);
            } catch (n) {
              t(n);
            }
          };
        return (
          e(function() {
            c(n).then(
              function(e) {
                f || ((f = !0), h.resolve(c(e).then(p, d, $)));
              },
              function(e) {
                f || ((f = !0), h.resolve(d(e)));
              },
              function(e) {
                f || h.notify($(e));
              },
            );
          }),
          h.promise
        );
      };
    return {defer: s, reject: u, when: l, all: a};
  }
  function Sn() {
    var e = 10,
      t = r('$rootScope'),
      n = null;
    (this.digestTtl = function(t) {
      return arguments.length && (e = t), e;
    }),
      (this.$get = [
        '$injector',
        '$exceptionHandler',
        '$parse',
        '$browser',
        function(r, a, s, c) {
          function l() {
            (this.$id = u()),
              (this.$$phase = this.$parent = this.$$watchers = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null),
              (this['this'] = this.$root = this),
              (this.$$destroyed = !1),
              (this.$$asyncQueue = []),
              (this.$$postDigestQueue = []),
              (this.$$listeners = {}),
              (this.$$listenerCount = {}),
              (this.$$isolateBindings = {});
          }
          function f(e) {
            if (g.$$phase)
              throw t('inprog', '{0} already in progress', g.$$phase);
            g.$$phase = e;
          }
          function h() {
            g.$$phase = null;
          }
          function p(e, t) {
            var n = s(e);
            return nt(n, t), n;
          }
          function $(e, t, n) {
            do
              (e.$$listenerCount[n] -= t),
                0 === e.$$listenerCount[n] && delete e.$$listenerCount[n];
            while ((e = e.$parent));
          }
          function v() {}
          l.prototype = {
            constructor: l,
            $new: function(e) {
              var t, n;
              return (
                e
                  ? ((n = new l()),
                    (n.$root = this.$root),
                    (n.$$asyncQueue = this.$$asyncQueue),
                    (n.$$postDigestQueue = this.$$postDigestQueue))
                  : ((t = function() {}),
                    (t.prototype = this),
                    (n = new t()),
                    (n.$id = u())),
                (n['this'] = n),
                (n.$$listeners = {}),
                (n.$$listenerCount = {}),
                (n.$parent = this),
                (n.$$watchers = n.$$nextSibling = n.$$childHead = n.$$childTail = null),
                (n.$$prevSibling = this.$$childTail),
                this.$$childHead
                  ? ((this.$$childTail.$$nextSibling = n),
                    (this.$$childTail = n))
                  : (this.$$childHead = this.$$childTail = n),
                n
              );
            },
            $watch: function(e, t, r) {
              var i = this,
                o = p(e, 'watch'),
                a = i.$$watchers,
                s = {fn: t, last: v, get: o, exp: e, eq: !!r};
              if (((n = null), !S(t))) {
                var c = p(t || d, 'listener');
                s.fn = function(e, t, n) {
                  c(n);
                };
              }
              if ('string' == typeof e && o.constant) {
                var u = s.fn;
                s.fn = function(e, t, n) {
                  u.call(this, e, t, n), D(a, s);
                };
              }
              return (
                a || (a = i.$$watchers = []),
                a.unshift(s),
                function() {
                  D(a, s), (n = null);
                }
              );
            },
            $watchCollection: function(e, t) {
              function n() {
                a = l(c);
                var e, t;
                if (y(a))
                  if (i(a)) {
                    o !== f && ((o = f), (p = o.length = 0), u++),
                      (e = a.length),
                      p !== e && (u++, (o.length = p = e));
                    for (var n = 0; e > n; n++)
                      o[n] !== a[n] && (u++, (o[n] = a[n]));
                  } else {
                    o !== h && ((o = h = {}), (p = 0), u++), (e = 0);
                    for (t in a)
                      a.hasOwnProperty(t) &&
                        (e++,
                        o.hasOwnProperty(t)
                          ? o[t] !== a[t] && (u++, (o[t] = a[t]))
                          : (p++, (o[t] = a[t]), u++));
                    if (p > e) {
                      u++;
                      for (t in o)
                        o.hasOwnProperty(t) &&
                          !a.hasOwnProperty(t) &&
                          (p--, delete o[t]);
                    }
                  }
                else o !== a && ((o = a), u++);
                return u;
              }
              function r() {
                t(a, o, c);
              }
              var o,
                a,
                c = this,
                u = 0,
                l = s(e),
                f = [],
                h = {},
                p = 0;
              return this.$watch(n, r);
            },
            $digest: function() {
              var r,
                i,
                o,
                s,
                c,
                u,
                l,
                p,
                d,
                $,
                g,
                m = this.$$asyncQueue,
                y = this.$$postDigestQueue,
                w = e,
                b = this,
                x = [];
              f('$digest'), (n = null);
              do {
                for (u = !1, p = b; m.length; ) {
                  try {
                    (g = m.shift()), g.scope.$eval(g.expression);
                  } catch (k) {
                    h(), a(k);
                  }
                  n = null;
                }
                e: do {
                  if ((s = p.$$watchers))
                    for (c = s.length; c--; )
                      try {
                        if ((r = s[c]))
                          if (
                            (i = r.get(p)) === (o = r.last) ||
                            (r.eq
                              ? q(i, o)
                              : 'number' == typeof i &&
                                'number' == typeof o &&
                                isNaN(i) &&
                                isNaN(o))
                          ) {
                            if (r === n) {
                              u = !1;
                              break e;
                            }
                          } else
                            (u = !0),
                              (n = r),
                              (r.last = r.eq ? N(i) : i),
                              r.fn(i, o === v ? i : o, p),
                              5 > w &&
                                ((d = 4 - w),
                                x[d] || (x[d] = []),
                                ($ = S(r.exp)
                                  ? 'fn: ' + (r.exp.name || '' + r.exp)
                                  : r.exp),
                                ($ +=
                                  '; newVal: ' + _(i) + '; oldVal: ' + _(o)),
                                x[d].push($));
                      } catch (k) {
                        h(), a(k);
                      }
                  if (!(l = p.$$childHead || (p !== b && p.$$nextSibling)))
                    for (; p !== b && !(l = p.$$nextSibling); ) p = p.$parent;
                } while ((p = l));
                if ((u || m.length) && !w--)
                  throw (h(),
                  t(
                    'infdig',
                    '{0} $digest() iterations reached. Aborting!\nWatchers fired in the last 5 iterations: {1}',
                    e,
                    _(x),
                  ));
              } while (u || m.length);
              for (h(); y.length; )
                try {
                  y.shift()();
                } catch (k) {
                  a(k);
                }
            },
            $destroy: function() {
              if (!this.$$destroyed) {
                var e = this.$parent;
                this.$broadcast('$destroy'),
                  (this.$$destroyed = !0),
                  this !== g &&
                    (o(this.$$listenerCount, V(null, $, this)),
                    e.$$childHead == this &&
                      (e.$$childHead = this.$$nextSibling),
                    e.$$childTail == this &&
                      (e.$$childTail = this.$$prevSibling),
                    this.$$prevSibling &&
                      (this.$$prevSibling.$$nextSibling = this.$$nextSibling),
                    this.$$nextSibling &&
                      (this.$$nextSibling.$$prevSibling = this.$$prevSibling),
                    (this.$parent = this.$$nextSibling = this.$$prevSibling = this.$$childHead = this.$$childTail = null));
              }
            },
            $eval: function(e, t) {
              return s(e)(this, t);
            },
            $evalAsync: function(e) {
              g.$$phase ||
                g.$$asyncQueue.length ||
                c.defer(function() {
                  g.$$asyncQueue.length && g.$digest();
                }),
                this.$$asyncQueue.push({scope: this, expression: e});
            },
            $$postDigest: function(e) {
              this.$$postDigestQueue.push(e);
            },
            $apply: function(e) {
              try {
                return f('$apply'), this.$eval(e);
              } catch (t) {
                a(t);
              } finally {
                h();
                try {
                  g.$digest();
                } catch (t) {
                  throw (a(t), t);
                }
              }
            },
            $on: function(e, t) {
              var n = this.$$listeners[e];
              n || (this.$$listeners[e] = n = []), n.push(t);
              var r = this;
              do
                r.$$listenerCount[e] || (r.$$listenerCount[e] = 0),
                  r.$$listenerCount[e]++;
              while ((r = r.$parent));
              var i = this;
              return function() {
                (n[M(n, t)] = null), $(i, 1, e);
              };
            },
            $emit: function(e) {
              var t,
                n,
                r,
                i = [],
                o = this,
                s = !1,
                c = {
                  name: e,
                  targetScope: o,
                  stopPropagation: function() {
                    s = !0;
                  },
                  preventDefault: function() {
                    c.defaultPrevented = !0;
                  },
                  defaultPrevented: !1,
                },
                u = I([c], arguments, 1);
              do {
                for (
                  t = o.$$listeners[e] || i,
                    c.currentScope = o,
                    n = 0,
                    r = t.length;
                  r > n;
                  n++
                )
                  if (t[n])
                    try {
                      t[n].apply(null, u);
                    } catch (l) {
                      a(l);
                    }
                  else t.splice(n, 1), n--, r--;
                if (s) return c;
                o = o.$parent;
              } while (o);
              return c;
            },
            $broadcast: function(e) {
              for (
                var t,
                  n,
                  r,
                  i = this,
                  o = i,
                  s = i,
                  c = {
                    name: e,
                    targetScope: i,
                    preventDefault: function() {
                      c.defaultPrevented = !0;
                    },
                    defaultPrevented: !1,
                  },
                  u = I([c], arguments, 1);
                (o = s);

              ) {
                for (
                  c.currentScope = o,
                    t = o.$$listeners[e] || [],
                    n = 0,
                    r = t.length;
                  r > n;
                  n++
                )
                  if (t[n])
                    try {
                      t[n].apply(null, u);
                    } catch (l) {
                      a(l);
                    }
                  else t.splice(n, 1), n--, r--;
                if (
                  !(s =
                    (o.$$listenerCount[e] && o.$$childHead) ||
                    (o !== i && o.$$nextSibling))
                )
                  for (; o !== i && !(s = o.$$nextSibling); ) o = o.$parent;
              }
              return c;
            },
          };
          var g = new l();
          return g;
        },
      ]);
  }
  function Cn() {
    var e = /^\s*(https?|ftp|mailto|tel|file):/,
      t = /^\s*(https?|ftp|file):|data:image\//;
    (this.aHrefSanitizationWhitelist = function(t) {
      return m(t) ? ((e = t), this) : e;
    }),
      (this.imgSrcSanitizationWhitelist = function(e) {
        return m(e) ? ((t = e), this) : t;
      }),
      (this.$get = function() {
        return function(n, r) {
          var i,
            o = r ? t : e;
          return (lr && !(lr >= 8)) ||
            ((i = Dn(n).href), '' === i || i.match(o))
            ? n
            : 'unsafe:' + i;
        };
      });
  }
  function En(e) {
    return e
      .replace(/([-()\[\]{}+?*.$\^|,:#<!\\])/g, '\\$1')
      .replace(/\x08/g, '\\x08');
  }
  function An(e) {
    if ('self' === e) return e;
    if (w(e)) {
      if (e.indexOf('***') > -1)
        throw ri(
          'iwcard',
          'Illegal sequence *** in string matcher.  String: {0}',
          e,
        );
      return (
        (e = En(e)
          .replace('\\*\\*', '.*')
          .replace('\\*', '[^:/.?&;]*')),
        RegExp('^' + e + '$')
      );
    }
    if (C(e)) return RegExp('^' + e.source + '$');
    throw ri(
      'imatcher',
      'Matchers may only be "self", string patterns or RegExp objects',
    );
  }
  function Tn(e) {
    var t = [];
    return (
      m(e) &&
        o(e, function(e) {
          t.push(An(e));
        }),
      t
    );
  }
  function Pn() {
    this.SCE_CONTEXTS = ii;
    var e = ['self'],
      t = [];
    (this.resourceUrlWhitelist = function(t) {
      return arguments.length && (e = Tn(t)), e;
    }),
      (this.resourceUrlBlacklist = function(e) {
        return arguments.length && (t = Tn(e)), t;
      }),
      (this.$get = [
        '$injector',
        function(r) {
          function i(e, t) {
            return 'self' === e ? Nn(t) : !!e.exec(t.href);
          }
          function o(n) {
            var r,
              o,
              a = Dn('' + n),
              s = !1;
            for (r = 0, o = e.length; o > r; r++)
              if (i(e[r], a)) {
                s = !0;
                break;
              }
            if (s)
              for (r = 0, o = t.length; o > r; r++)
                if (i(t[r], a)) {
                  s = !1;
                  break;
                }
            return s;
          }
          function a(e) {
            var t = function(e) {
              this.$$unwrapTrustedValue = function() {
                return e;
              };
            };
            return (
              e && (t.prototype = new e()),
              (t.prototype.valueOf = function() {
                return this.$$unwrapTrustedValue();
              }),
              (t.prototype.toString = function() {
                return '' + this.$$unwrapTrustedValue();
              }),
              t
            );
          }
          function s(e, t) {
            var r = h.hasOwnProperty(e) ? h[e] : null;
            if (!r)
              throw ri(
                'icontext',
                'Attempted to trust a value in invalid context. Context: {0}; Value: {1}',
                e,
                t,
              );
            if (null === t || t === n || '' === t) return t;
            if ('string' != typeof t)
              throw ri(
                'itype',
                'Attempted to trust a non-string value in a content requiring a string: Context: {0}',
                e,
              );
            return new r(t);
          }
          function c(e) {
            return e instanceof f ? e.$$unwrapTrustedValue() : e;
          }
          function u(e, t) {
            if (null === t || t === n || '' === t) return t;
            var r = h.hasOwnProperty(e) ? h[e] : null;
            if (r && t instanceof r) return t.$$unwrapTrustedValue();
            if (e === ii.RESOURCE_URL) {
              if (o(t)) return t;
              throw ri(
                'insecurl',
                'Blocked loading resource from url not allowed by $sceDelegate policy.  URL: {0}',
                '' + t,
              );
            }
            if (e === ii.HTML) return l(t);
            throw ri(
              'unsafe',
              'Attempting to use an unsafe value in a safe context.',
            );
          }
          var l = function l() {
            throw ri(
              'unsafe',
              'Attempting to use an unsafe value in a safe context.',
            );
          };
          r.has('$sanitize') && (l = r.get('$sanitize'));
          var f = a(),
            h = {};
          return (
            (h[ii.HTML] = a(f)),
            (h[ii.CSS] = a(f)),
            (h[ii.URL] = a(f)),
            (h[ii.JS] = a(f)),
            (h[ii.RESOURCE_URL] = a(h[ii.URL])),
            {trustAs: s, getTrusted: u, valueOf: c}
          );
        },
      ]);
  }
  function jn() {
    var e = !0;
    (this.enabled = function(t) {
      return arguments.length && (e = !!t), e;
    }),
      (this.$get = [
        '$parse',
        '$sniffer',
        '$sceDelegate',
        function(t, n, r) {
          if (e && n.msie && 8 > n.msieDocumentMode)
            throw ri(
              'iequirks',
              'Strict Contextual Escaping does not support Internet Explorer version < 9 in quirks mode.  You can fix this by adding the text <!doctype html> to the top of your HTML document.  See http://docs.angularjs.org/api/ng.$sce for more information.',
            );
          var i = N(ii);
          (i.isEnabled = function() {
            return e;
          }),
            (i.trustAs = r.trustAs),
            (i.getTrusted = r.getTrusted),
            (i.valueOf = r.valueOf),
            e ||
              ((i.trustAs = i.getTrusted = function(e, t) {
                return t;
              }),
              (i.valueOf = $)),
            (i.parseAs = function(e, n) {
              var r = t(n);
              return r.literal && r.constant
                ? r
                : function(t, n) {
                    return i.getTrusted(e, r(t, n));
                  };
            });
          var a = i.parseAs,
            s = i.getTrusted,
            c = i.trustAs;
          return (
            o(ii, function(e, t) {
              var n = ar(t);
              (i[ut('parse_as_' + n)] = function(t) {
                return a(e, t);
              }),
                (i[ut('get_trusted_' + n)] = function(t) {
                  return s(e, t);
                }),
                (i[ut('trust_as_' + n)] = function(t) {
                  return c(e, t);
                });
            }),
            i
          );
        },
      ]);
  }
  function On() {
    this.$get = [
      '$window',
      '$document',
      function(e, t) {
        var n,
          r,
          i = {},
          o = h(
            (/android (\d+)/.exec(ar((e.navigator || {}).userAgent)) || [])[1],
          ),
          a = /Boxee/i.test((e.navigator || {}).userAgent),
          s = t[0] || {},
          c = s.documentMode,
          u = /^(Moz|webkit|O|ms)(?=[A-Z])/,
          l = s.body && s.body.style,
          f = !1,
          p = !1;
        if (l) {
          for (var d in l)
            if ((r = u.exec(d))) {
              (n = r[0]), (n = n.substr(0, 1).toUpperCase() + n.substr(1));
              break;
            }
          n || (n = 'WebkitOpacity' in l && 'webkit'),
            (f = !!('transition' in l || n + 'Transition' in l)),
            (p = !!('animation' in l || n + 'Animation' in l)),
            !o ||
              (f && p) ||
              ((f = w(s.body.style.webkitTransition)),
              (p = w(s.body.style.webkitAnimation)));
        }
        return {
          history: !(!e.history || !e.history.pushState || 4 > o || a),
          hashchange: 'onhashchange' in e && (!c || c > 7),
          hasEvent: function(e) {
            if ('input' == e && 9 == lr) return !1;
            if (g(i[e])) {
              var t = s.createElement('div');
              i[e] = 'on' + e in t;
            }
            return i[e];
          },
          csp: R(),
          vendorPrefix: n,
          transitions: f,
          animations: p,
          android: o,
          msie: lr,
          msieDocumentMode: c,
        };
      },
    ];
  }
  function Mn() {
    this.$get = [
      '$rootScope',
      '$browser',
      '$q',
      '$exceptionHandler',
      function(e, t, n, r) {
        function i(i, a, s) {
          var c,
            u = n.defer(),
            l = u.promise,
            f = m(s) && !s;
          return (
            (c = t.defer(function() {
              try {
                u.resolve(i());
              } catch (t) {
                u.reject(t), r(t);
              } finally {
                delete o[l.$$timeoutId];
              }
              f || e.$apply();
            }, a)),
            (l.$$timeoutId = c),
            (o[c] = u),
            l
          );
        }
        var o = {};
        return (
          (i.cancel = function(e) {
            return e && e.$$timeoutId in o
              ? (o[e.$$timeoutId].reject('canceled'),
                delete o[e.$$timeoutId],
                t.defer.cancel(e.$$timeoutId))
              : !1;
          }),
          i
        );
      },
    ];
  }
  function Dn(e) {
    var t = e;
    return (
      lr && (oi.setAttribute('href', t), (t = oi.href)),
      oi.setAttribute('href', t),
      {
        href: oi.href,
        protocol: oi.protocol ? oi.protocol.replace(/:$/, '') : '',
        host: oi.host,
        search: oi.search ? oi.search.replace(/^\?/, '') : '',
        hash: oi.hash ? oi.hash.replace(/^#/, '') : '',
        hostname: oi.hostname,
        port: oi.port,
        pathname:
          '/' === oi.pathname.charAt(0) ? oi.pathname : '/' + oi.pathname,
      }
    );
  }
  function Nn(e) {
    var t = w(e) ? Dn(e) : e;
    return t.protocol === ai.protocol && t.host === ai.host;
  }
  function Fn() {
    this.$get = v(e);
  }
  function qn(e) {
    function t(r, i) {
      if (y(r)) {
        var a = {};
        return (
          o(r, function(e, n) {
            a[n] = t(n, e);
          }),
          a
        );
      }
      return e.factory(r + n, i);
    }
    var n = 'Filter';
    (this.register = t),
      (this.$get = [
        '$injector',
        function(e) {
          return function(t) {
            return e.get(t + n);
          };
        },
      ]),
      t('currency', In),
      t('date', Wn),
      t('filter', Rn),
      t('json', Gn),
      t('limitTo', Yn),
      t('lowercase', fi),
      t('number', Un),
      t('orderBy', Jn),
      t('uppercase', hi);
  }
  function Rn() {
    return function(e, t, r) {
      if (!k(e)) return e;
      var i = typeof r,
        o = [];
      (o.check = function(e) {
        for (var t = 0; o.length > t; t++) if (!o[t](e)) return !1;
        return !0;
      }),
        'function' !== i &&
          (r =
            'boolean' === i && r
              ? function(e, t) {
                  return yr.equals(e, t);
                }
              : function(e, t) {
                  return (
                    (t = ('' + t).toLowerCase()),
                    ('' + e).toLowerCase().indexOf(t) > -1
                  );
                });
      var a = function(e, t) {
        if ('string' == typeof t && '!' === t.charAt(0))
          return !a(e, t.substr(1));
        switch (typeof e) {
          case 'boolean':
          case 'number':
          case 'string':
            return r(e, t);
          case 'object':
            switch (typeof t) {
              case 'object':
                return r(e, t);
              default:
                for (var n in e)
                  if ('$' !== n.charAt(0) && a(e[n], t)) return !0;
            }
            return !1;
          case 'array':
            for (var i = 0; e.length > i; i++) if (a(e[i], t)) return !0;
            return !1;
          default:
            return !1;
        }
      };
      switch (typeof t) {
        case 'boolean':
        case 'number':
        case 'string':
          t = {$: t};
        case 'object':
          for (var s in t)
            (function(e) {
              t[e] !== n &&
                o.push(function(n) {
                  return a('$' == e ? n : it(n, e), t[e]);
                });
            })(s);
          break;
        case 'function':
          o.push(t);
          break;
        default:
          return e;
      }
      for (var c = [], u = 0; e.length > u; u++) {
        var l = e[u];
        o.check(l) && c.push(l);
      }
      return c;
    };
  }
  function In(e) {
    var t = e.NUMBER_FORMATS;
    return function(e, n) {
      return (
        g(n) && (n = t.CURRENCY_SYM),
        Vn(e, t.PATTERNS[1], t.GROUP_SEP, t.DECIMAL_SEP, 2).replace(
          /\u00A4/g,
          n,
        )
      );
    };
  }
  function Un(e) {
    var t = e.NUMBER_FORMATS;
    return function(e, n) {
      return Vn(e, t.PATTERNS[0], t.GROUP_SEP, t.DECIMAL_SEP, n);
    };
  }
  function Vn(e, t, n, r, i) {
    if (isNaN(e) || !isFinite(e)) return '';
    var o = 0 > e;
    e = Math.abs(e);
    var a = e + '',
      s = '',
      c = [],
      u = !1;
    if (-1 !== a.indexOf('e')) {
      var l = a.match(/([\d\.]+)e(-?)(\d+)/);
      l && '-' == l[2] && l[3] > i + 1 ? (a = '0') : ((s = a), (u = !0));
    }
    if (u) i > 0 && e > -1 && 1 > e && (s = e.toFixed(i));
    else {
      var f = (a.split(si)[1] || '').length;
      g(i) && (i = Math.min(Math.max(t.minFrac, f), t.maxFrac));
      var h = Math.pow(10, i);
      e = Math.round(e * h) / h;
      var p = ('' + e).split(si),
        d = p[0];
      p = p[1] || '';
      var $,
        v = 0,
        m = t.lgSize,
        y = t.gSize;
      if (d.length >= m + y)
        for (v = d.length - m, $ = 0; v > $; $++)
          0 === (v - $) % y && 0 !== $ && (s += n), (s += d.charAt($));
      for ($ = v; d.length > $; $++)
        0 === (d.length - $) % m && 0 !== $ && (s += n), (s += d.charAt($));
      for (; i > p.length; ) p += '0';
      i && '0' !== i && (s += r + p.substr(0, i));
    }
    return (
      c.push(o ? t.negPre : t.posPre),
      c.push(s),
      c.push(o ? t.negSuf : t.posSuf),
      c.join('')
    );
  }
  function Ln(e, t, n) {
    var r = '';
    for (0 > e && ((r = '-'), (e = -e)), e = '' + e; t > e.length; )
      e = '0' + e;
    return n && (e = e.substr(e.length - t)), r + e;
  }
  function _n(e, t, n, r) {
    return (
      (n = n || 0),
      function(i) {
        var o = i['get' + e]();
        return (
          (n > 0 || o > -n) && (o += n),
          0 === o && -12 == n && (o = 12),
          Ln(o, t, r)
        );
      }
    );
  }
  function zn(e, t) {
    return function(n, r) {
      var i = n['get' + e](),
        o = sr(t ? 'SHORT' + e : e);
      return r[o][i];
    };
  }
  function Hn(e) {
    var t = -1 * e.getTimezoneOffset(),
      n = t >= 0 ? '+' : '';
    return (n +=
      Ln(Math[t > 0 ? 'floor' : 'ceil'](t / 60), 2) + Ln(Math.abs(t % 60), 2));
  }
  function Bn(e, t) {
    return 12 > e.getHours() ? t.AMPMS[0] : t.AMPMS[1];
  }
  function Wn(e) {
    function t(e) {
      var t;
      if ((t = e.match(n))) {
        var r = new Date(0),
          i = 0,
          o = 0,
          a = t[8] ? r.setUTCFullYear : r.setFullYear,
          s = t[8] ? r.setUTCHours : r.setHours;
        t[9] && ((i = h(t[9] + t[10])), (o = h(t[9] + t[11]))),
          a.call(r, h(t[1]), h(t[2]) - 1, h(t[3]));
        var c = h(t[4] || 0) - i,
          u = h(t[5] || 0) - o,
          l = h(t[6] || 0),
          f = Math.round(1e3 * parseFloat('0.' + (t[7] || 0)));
        return s.call(r, c, u, l, f), r;
      }
      return e;
    }
    var n = /^(\d{4})-?(\d\d)-?(\d\d)(?:T(\d\d)(?::?(\d\d)(?::?(\d\d)(?:\.(\d+))?)?)?(Z|([+-])(\d\d):?(\d\d))?)?$/;
    return function(n, r) {
      var i,
        a,
        s = '',
        c = [];
      if (
        ((r = r || 'mediumDate'),
        (r = e.DATETIME_FORMATS[r] || r),
        w(n) && (n = li.test(n) ? h(n) : t(n)),
        b(n) && (n = new Date(n)),
        !x(n))
      )
        return n;
      for (; r; )
        (a = ui.exec(r)),
          a ? ((c = I(c, a, 1)), (r = c.pop())) : (c.push(r), (r = null));
      return (
        o(c, function(t) {
          (i = ci[t]),
            (s += i
              ? i(n, e.DATETIME_FORMATS)
              : t.replace(/(^'|'$)/g, '').replace(/''/g, "'"));
        }),
        s
      );
    };
  }
  function Gn() {
    return function(e) {
      return _(e, !0);
    };
  }
  function Yn() {
    return function(e, t) {
      if (!k(e) && !w(e)) return e;
      if (((t = h(t)), w(e)))
        return t ? (t >= 0 ? e.slice(0, t) : e.slice(t, e.length)) : '';
      var n,
        r,
        i = [];
      for (
        t > e.length ? (t = e.length) : -e.length > t && (t = -e.length),
          t > 0 ? ((n = 0), (r = t)) : ((n = e.length + t), (r = e.length));
        r > n;
        n++
      )
        i.push(e[n]);
      return i;
    };
  }
  function Jn(e) {
    return function(t, n, r) {
      function i(e, t) {
        for (var r = 0; n.length > r; r++) {
          var i = n[r](e, t);
          if (0 !== i) return i;
        }
        return 0;
      }
      function o(e, t) {
        return H(t)
          ? function(t, n) {
              return e(n, t);
            }
          : e;
      }
      function a(e, t) {
        var n = typeof e,
          r = typeof t;
        return n == r
          ? ('string' == n && ((e = e.toLowerCase()), (t = t.toLowerCase())),
            e === t ? 0 : t > e ? -1 : 1)
          : r > n
          ? -1
          : 1;
      }
      if (!k(t)) return t;
      if (!n) return t;
      (n = k(n) ? n : [n]),
        (n = j(n, function(t) {
          var n = !1,
            r = t || $;
          return (
            w(t) &&
              (('+' == t.charAt(0) || '-' == t.charAt(0)) &&
                ((n = '-' == t.charAt(0)), (t = t.substring(1))),
              (r = e(t))),
            o(function(e, t) {
              return a(r(e), r(t));
            }, n)
          );
        }));
      for (var s = [], c = 0; t.length > c; c++) s.push(t[c]);
      return s.sort(o(i, r));
    };
  }
  function Qn(e) {
    return S(e) && (e = {link: e}), (e.restrict = e.restrict || 'AC'), v(e);
  }
  function Zn(e, t) {
    function n(t, n) {
      (n = n ? '-' + X(n, '-') : ''),
        e.removeClass((t ? Ci : Si) + n).addClass((t ? Si : Ci) + n);
    }
    var r = this,
      i = e.parent().controller('form') || $i,
      a = 0,
      s = (r.$error = {}),
      c = [];
    (r.$name = t.name || t.ngForm),
      (r.$dirty = !1),
      (r.$pristine = !0),
      (r.$valid = !0),
      (r.$invalid = !1),
      i.$addControl(r),
      e.addClass(Ei),
      n(!0),
      (r.$addControl = function(e) {
        rt(e.$name, 'input'), c.push(e), e.$name && (r[e.$name] = e);
      }),
      (r.$removeControl = function(e) {
        e.$name && r[e.$name] === e && delete r[e.$name],
          o(s, function(t, n) {
            r.$setValidity(n, !0, e);
          }),
          D(c, e);
      }),
      (r.$setValidity = function(e, t, o) {
        var c = s[e];
        if (t)
          c &&
            (D(c, o),
            c.length ||
              (a--,
              a || (n(t), (r.$valid = !0), (r.$invalid = !1)),
              (s[e] = !1),
              n(!0, e),
              i.$setValidity(e, !0, r)));
        else {
          if ((a || n(t), c)) {
            if (O(c, o)) return;
          } else (s[e] = c = []), a++, n(!1, e), i.$setValidity(e, !1, r);
          c.push(o), (r.$valid = !1), (r.$invalid = !0);
        }
      }),
      (r.$setDirty = function() {
        e.removeClass(Ei).addClass(Ai),
          (r.$dirty = !0),
          (r.$pristine = !1),
          i.$setDirty();
      }),
      (r.$setPristine = function() {
        e.removeClass(Ai).addClass(Ei),
          (r.$dirty = !1),
          (r.$pristine = !0),
          o(c, function(e) {
            e.$setPristine();
          });
      });
  }
  function Kn(e, t, r, i) {
    return e.$setValidity(t, r), r ? i : n;
  }
  function Xn(e, t, n, i, o, a) {
    if (!o.android) {
      var s = !1;
      t.on('compositionstart', function() {
        s = !0;
      }),
        t.on('compositionend', function() {
          s = !1;
        });
    }
    var c = function() {
      if (!s) {
        var r = t.val();
        H(n.ngTrim || 'T') && (r = br(r)),
          i.$viewValue !== r &&
            (e.$$phase
              ? i.$setViewValue(r)
              : e.$apply(function() {
                  i.$setViewValue(r);
                }));
      }
    };
    if (o.hasEvent('input')) t.on('input', c);
    else {
      var u,
        l = function() {
          u ||
            (u = a.defer(function() {
              c(), (u = null);
            }));
        };
      t.on('keydown', function(e) {
        var t = e.keyCode;
        91 === t || (t > 15 && 19 > t) || (t >= 37 && 40 >= t) || l();
      }),
        o.hasEvent('paste') && t.on('paste cut', l);
    }
    t.on('change', c),
      (i.$render = function() {
        t.val(i.$isEmpty(i.$viewValue) ? '' : i.$viewValue);
      });
    var f,
      p,
      d = n.ngPattern;
    if (d) {
      var $ = function(e, t) {
        return Kn(i, 'pattern', i.$isEmpty(t) || e.test(t), t);
      };
      (p = d.match(/^\/(.*)\/([gim]*)$/)),
        p
          ? ((d = RegExp(p[1], p[2])),
            (f = function(e) {
              return $(d, e);
            }))
          : (f = function(n) {
              var i = e.$eval(d);
              if (!i || !i.test)
                throw r('ngPattern')(
                  'noregexp',
                  'Expected {0} to be a RegExp but was {1}. Element: {2}',
                  d,
                  i,
                  B(t),
                );
              return $(i, n);
            }),
        i.$formatters.push(f),
        i.$parsers.push(f);
    }
    if (n.ngMinlength) {
      var v = h(n.ngMinlength),
        g = function(e) {
          return Kn(i, 'minlength', i.$isEmpty(e) || e.length >= v, e);
        };
      i.$parsers.push(g), i.$formatters.push(g);
    }
    if (n.ngMaxlength) {
      var m = h(n.ngMaxlength),
        y = function(e) {
          return Kn(i, 'maxlength', i.$isEmpty(e) || m >= e.length, e);
        };
      i.$parsers.push(y), i.$formatters.push(y);
    }
  }
  function er(e, t, r, i, o, a) {
    if (
      (Xn(e, t, r, i, o, a),
      i.$parsers.push(function(e) {
        var t = i.$isEmpty(e);
        return t || bi.test(e)
          ? (i.$setValidity('number', !0),
            '' === e ? null : t ? e : parseFloat(e))
          : (i.$setValidity('number', !1), n);
      }),
      i.$formatters.push(function(e) {
        return i.$isEmpty(e) ? '' : '' + e;
      }),
      r.min)
    ) {
      var s = function(e) {
        var t = parseFloat(r.min);
        return Kn(i, 'min', i.$isEmpty(e) || e >= t, e);
      };
      i.$parsers.push(s), i.$formatters.push(s);
    }
    if (r.max) {
      var c = function(e) {
        var t = parseFloat(r.max);
        return Kn(i, 'max', i.$isEmpty(e) || t >= e, e);
      };
      i.$parsers.push(c), i.$formatters.push(c);
    }
    i.$formatters.push(function(e) {
      return Kn(i, 'number', i.$isEmpty(e) || b(e), e);
    });
  }
  function tr(e, t, n, r, i, o) {
    Xn(e, t, n, r, i, o);
    var a = function(e) {
      return Kn(r, 'url', r.$isEmpty(e) || yi.test(e), e);
    };
    r.$formatters.push(a), r.$parsers.push(a);
  }
  function nr(e, t, n, r, i, o) {
    Xn(e, t, n, r, i, o);
    var a = function(e) {
      return Kn(r, 'email', r.$isEmpty(e) || wi.test(e), e);
    };
    r.$formatters.push(a), r.$parsers.push(a);
  }
  function rr(e, t, n, r) {
    g(n.name) && t.attr('name', u()),
      t.on('click', function() {
        t[0].checked &&
          e.$apply(function() {
            r.$setViewValue(n.value);
          });
      }),
      (r.$render = function() {
        var e = n.value;
        t[0].checked = e == r.$viewValue;
      }),
      n.$observe('value', r.$render);
  }
  function ir(e, t, n, r) {
    var i = n.ngTrueValue,
      o = n.ngFalseValue;
    w(i) || (i = !0),
      w(o) || (o = !1),
      t.on('click', function() {
        e.$apply(function() {
          r.$setViewValue(t[0].checked);
        });
      }),
      (r.$render = function() {
        t[0].checked = r.$viewValue;
      }),
      (r.$isEmpty = function(e) {
        return e !== i;
      }),
      r.$formatters.push(function(e) {
        return e === i;
      }),
      r.$parsers.push(function(e) {
        return e ? i : o;
      });
  }
  function or(e, t) {
    return (
      (e = 'ngClass' + e),
      function() {
        return {
          restrict: 'AC',
          link: function(n, r, i) {
            function a(e) {
              if (t === !0 || n.$index % 2 === t) {
                var r = s(e || '');
                c ? q(e, c) || i.$updateClass(r, s(c)) : i.$addClass(r);
              }
              c = N(e);
            }
            function s(e) {
              if (k(e)) return e.join(' ');
              if (y(e)) {
                var t = [];
                return (
                  o(e, function(e, n) {
                    e && t.push(n);
                  }),
                  t.join(' ')
                );
              }
              return e;
            }
            var c;
            n.$watch(i[e], a, !0),
              i.$observe('class', function() {
                a(n.$eval(i[e]));
              }),
              'ngClass' !== e &&
                n.$watch('$index', function(r, o) {
                  var a = 1 & r;
                  if (1 & (a !== o)) {
                    var c = s(n.$eval(i[e]));
                    a === t ? i.$addClass(c) : i.$removeClass(c);
                  }
                });
          },
        };
      }
    );
  }
  var ar = function(e) {
      return w(e) ? e.toLowerCase() : e;
    },
    sr = function(e) {
      return w(e) ? e.toUpperCase() : e;
    },
    cr = function(e) {
      return w(e)
        ? e.replace(/[A-Z]/g, function(e) {
            return String.fromCharCode(32 | e.charCodeAt(0));
          })
        : e;
    },
    ur = function(e) {
      return w(e)
        ? e.replace(/[a-z]/g, function(e) {
            return String.fromCharCode(-33 & e.charCodeAt(0));
          })
        : e;
    };
  'i' !== 'I'.toLowerCase() && ((ar = cr), (sr = ur));
  var lr,
    fr,
    hr,
    pr,
    dr,
    $r = [].slice,
    vr = [].push,
    gr = Object.prototype.toString,
    mr = r('ng'),
    yr = (e.angular, e.angular || (e.angular = {})),
    wr = ['0', '0', '0'];
  (lr = h((/msie (\d+)/.exec(ar(navigator.userAgent)) || [])[1])),
    isNaN(lr) &&
      (lr = h(
        (/trident\/.*; rv:(\d+)/.exec(ar(navigator.userAgent)) || [])[1],
      )),
    (d.$inject = []),
    ($.$inject = []);
  var br = (function() {
    return String.prototype.trim
      ? function(e) {
          return w(e) ? e.trim() : e;
        }
      : function(e) {
          return w(e) ? e.replace(/^\s\s*/, '').replace(/\s\s*$/, '') : e;
        };
  })();
  dr =
    9 > lr
      ? function(e) {
          return (
            (e = e.nodeName ? e : e[0]),
            e.scopeName && 'HTML' != e.scopeName
              ? sr(e.scopeName + ':' + e.nodeName)
              : e.nodeName
          );
        }
      : function(e) {
          return e.nodeName ? e.nodeName : e[0].nodeName;
        };
  var xr = /[A-Z]/g,
    kr = {
      full: '1.2.11-build.2192+sha.e2173f9',
      major: 1,
      minor: 2,
      dot: 11,
      codeName: 'cryptocurrency-hyperdeflation',
    },
    Sr = (ft.cache = {}),
    Cr = (ft.expando = 'ng-' + new Date().getTime()),
    Er = 1,
    Ar = e.document.addEventListener
      ? function(e, t, n) {
          e.addEventListener(t, n, !1);
        }
      : function(e, t, n) {
          e.attachEvent('on' + t, n);
        },
    Tr = e.document.removeEventListener
      ? function(e, t, n) {
          e.removeEventListener(t, n, !1);
        }
      : function(e, t, n) {
          e.detachEvent('on' + t, n);
        },
    Pr = /([\:\-\_]+(.))/g,
    jr = /^moz([A-Z])/,
    Or = r('jqLite'),
    Mr = (ft.prototype = {
      ready: function(n) {
        function r() {
          i || ((i = !0), n());
        }
        var i = !1;
        'complete' === t.readyState
          ? setTimeout(r)
          : (this.on('DOMContentLoaded', r), ft(e).on('load', r));
      },
      toString: function() {
        var e = [];
        return (
          o(this, function(t) {
            e.push('' + t);
          }),
          '[' + e.join(', ') + ']'
        );
      },
      eq: function(e) {
        return e >= 0 ? fr(this[e]) : fr(this[this.length + e]);
      },
      length: 0,
      push: vr,
      sort: [].sort,
      splice: [].splice,
    }),
    Dr = {};
  o(
    'multiple,selected,checked,disabled,readOnly,required,open'.split(','),
    function(e) {
      Dr[ar(e)] = e;
    },
  );
  var Nr = {};
  o('input,select,option,textarea,button,form,details'.split(','), function(e) {
    Nr[sr(e)] = !0;
  }),
    o(
      {
        data: gt,
        inheritedData: kt,
        scope: function(e) {
          return (
            fr(e).data('$scope') ||
            kt(e.parentNode || e, ['$isolateScope', '$scope'])
          );
        },
        isolateScope: function(e) {
          return (
            fr(e).data('$isolateScope') || fr(e).data('$isolateScopeNoTemplate')
          );
        },
        controller: xt,
        injector: function(e) {
          return kt(e, '$injector');
        },
        removeAttr: function(e, t) {
          e.removeAttribute(t);
        },
        hasClass: mt,
        css: function(e, t, r) {
          if (((t = ut(t)), !m(r))) {
            var i;
            return (
              8 >= lr &&
                ((i = e.currentStyle && e.currentStyle[t]),
                '' === i && (i = 'auto')),
              (i = i || e.style[t]),
              8 >= lr && (i = '' === i ? n : i),
              i
            );
          }
          e.style[t] = r;
        },
        attr: function(e, t, r) {
          var i = ar(t);
          if (Dr[i]) {
            if (!m(r))
              return e[t] || (e.attributes.getNamedItem(t) || d).specified
                ? i
                : n;
            r
              ? ((e[t] = !0), e.setAttribute(t, i))
              : ((e[t] = !1), e.removeAttribute(i));
          } else if (m(r)) e.setAttribute(t, r);
          else if (e.getAttribute) {
            var o = e.getAttribute(t, 2);
            return null === o ? n : o;
          }
        },
        prop: function(e, t, r) {
          return m(r) ? ((e[t] = r), n) : e[t];
        },
        text: (function() {
          function e(e, r) {
            var i = t[e.nodeType];
            return g(r) ? (i ? e[i] : '') : ((e[i] = r), n);
          }
          var t = [];
          return (
            9 > lr
              ? ((t[1] = 'innerText'), (t[3] = 'nodeValue'))
              : (t[1] = t[3] = 'textContent'),
            (e.$dv = ''),
            e
          );
        })(),
        val: function(e, t) {
          if (g(t)) {
            if ('SELECT' === dr(e) && e.multiple) {
              var n = [];
              return (
                o(e.options, function(e) {
                  e.selected && n.push(e.value || e.text);
                }),
                0 === n.length ? null : n
              );
            }
            return e.value;
          }
          e.value = t;
        },
        html: function(e, t) {
          if (g(t)) return e.innerHTML;
          for (var n = 0, r = e.childNodes; r.length > n; n++) pt(r[n]);
          e.innerHTML = t;
        },
        empty: St,
      },
      function(e, t) {
        ft.prototype[t] = function(t, r) {
          var i, o;
          if (
            e !== St &&
            (2 == e.length && e !== mt && e !== xt ? t : r) === n
          ) {
            if (y(t)) {
              for (i = 0; this.length > i; i++)
                if (e === gt) e(this[i], t);
                else for (o in t) e(this[i], o, t[o]);
              return this;
            }
            for (
              var a = e.$dv,
                s = a === n ? Math.min(this.length, 1) : this.length,
                c = 0;
              s > c;
              c++
            ) {
              var u = e(this[c], t, r);
              a = a ? a + u : u;
            }
            return a;
          }
          for (i = 0; this.length > i; i++) e(this[i], t, r);
          return this;
        };
      },
    ),
    o(
      {
        removeData: $t,
        dealoc: pt,
        on: function Fr(e, n, r, i) {
          if (m(i))
            throw Or(
              'onargs',
              'jqLite#on() does not support the `selector` or `eventData` parameters',
            );
          var a = vt(e, 'events'),
            s = vt(e, 'handle');
          a || vt(e, 'events', (a = {})),
            s || vt(e, 'handle', (s = Et(e, a))),
            o(n.split(' '), function(n) {
              var i = a[n];
              if (!i) {
                if ('mouseenter' == n || 'mouseleave' == n) {
                  var o =
                    t.body.contains || t.body.compareDocumentPosition
                      ? function(e, t) {
                          var n = 9 === e.nodeType ? e.documentElement : e,
                            r = t && t.parentNode;
                          return (
                            e === r ||
                            !(
                              !r ||
                              1 !== r.nodeType ||
                              !(n.contains
                                ? n.contains(r)
                                : e.compareDocumentPosition &&
                                  16 & e.compareDocumentPosition(r))
                            )
                          );
                        }
                      : function(e, t) {
                          if (t)
                            for (; (t = t.parentNode); ) if (t === e) return !0;
                          return !1;
                        };
                  a[n] = [];
                  var c = {mouseleave: 'mouseout', mouseenter: 'mouseover'};
                  Fr(e, c[n], function(e) {
                    var t = this,
                      r = e.relatedTarget;
                    (!r || (r !== t && !o(t, r))) && s(e, n);
                  });
                } else Ar(e, n, s), (a[n] = []);
                i = a[n];
              }
              i.push(r);
            });
        },
        off: dt,
        one: function(e, t, n) {
          (e = fr(e)),
            e.on(t, function r() {
              e.off(t, n), e.off(t, r);
            }),
            e.on(t, n);
        },
        replaceWith: function(e, t) {
          var n,
            r = e.parentNode;
          pt(e),
            o(new ft(t), function(t) {
              n ? r.insertBefore(t, n.nextSibling) : r.replaceChild(t, e),
                (n = t);
            });
        },
        children: function(e) {
          var t = [];
          return (
            o(e.childNodes, function(e) {
              1 === e.nodeType && t.push(e);
            }),
            t
          );
        },
        contents: function(e) {
          return e.childNodes || [];
        },
        append: function(e, t) {
          o(new ft(t), function(t) {
            (1 === e.nodeType || 11 === e.nodeType) && e.appendChild(t);
          });
        },
        prepend: function(e, t) {
          if (1 === e.nodeType) {
            var n = e.firstChild;
            o(new ft(t), function(t) {
              e.insertBefore(t, n);
            });
          }
        },
        wrap: function(e, t) {
          t = fr(t)[0];
          var n = e.parentNode;
          n && n.replaceChild(t, e), t.appendChild(e);
        },
        remove: function(e) {
          pt(e);
          var t = e.parentNode;
          t && t.removeChild(e);
        },
        after: function(e, t) {
          var n = e,
            r = e.parentNode;
          o(new ft(t), function(e) {
            r.insertBefore(e, n.nextSibling), (n = e);
          });
        },
        addClass: wt,
        removeClass: yt,
        toggleClass: function(e, t, n) {
          g(n) && (n = !mt(e, t)), (n ? wt : yt)(e, t);
        },
        parent: function(e) {
          var t = e.parentNode;
          return t && 11 !== t.nodeType ? t : null;
        },
        next: function(e) {
          if (e.nextElementSibling) return e.nextElementSibling;
          for (var t = e.nextSibling; null != t && 1 !== t.nodeType; )
            t = t.nextSibling;
          return t;
        },
        find: function(e, t) {
          return e.getElementsByTagName ? e.getElementsByTagName(t) : [];
        },
        clone: ht,
        triggerHandler: function(e, t, n) {
          var r = (vt(e, 'events') || {})[t];
          n = n || [];
          var i = [{preventDefault: d, stopPropagation: d}];
          o(r, function(t) {
            t.apply(e, i.concat(n));
          });
        },
      },
      function(e, t) {
        (ft.prototype[t] = function(t, n, r) {
          for (var i, o = 0; this.length > o; o++)
            g(i)
              ? ((i = e(this[o], t, n, r)), m(i) && (i = fr(i)))
              : bt(i, e(this[o], t, n, r));
          return m(i) ? i : this;
        }),
          (ft.prototype.bind = ft.prototype.on),
          (ft.prototype.unbind = ft.prototype.off);
      },
    ),
    (Tt.prototype = {
      put: function(e, t) {
        this[At(e)] = t;
      },
      get: function(e) {
        return this[At(e)];
      },
      remove: function(e) {
        var t = this[(e = At(e))];
        return delete this[e], t;
      },
    });
  var qr = /^function\s*[^\(]*\(\s*([^\)]*)\)/m,
    Rr = /,/,
    Ir = /^\s*(_?)(\S+?)\1\s*$/,
    Ur = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm,
    Vr = r('$injector'),
    Lr = r('$animate'),
    _r = [
      '$provide',
      function(e) {
        (this.$$selectors = {}),
          (this.register = function(t, n) {
            var r = t + '-animation';
            if (t && '.' != t.charAt(0))
              throw Lr(
                'notcsel',
                "Expecting class selector starting with '.' got '{0}'.",
                t,
              );
            (this.$$selectors[t.substr(1)] = r), e.factory(r, n);
          }),
          (this.classNameFilter = function(e) {
            return (
              1 === arguments.length &&
                (this.$$classNameFilter = e instanceof RegExp ? e : null),
              this.$$classNameFilter
            );
          }),
          (this.$get = [
            '$timeout',
            function(e) {
              return {
                enter: function(t, n, r, i) {
                  r
                    ? r.after(t)
                    : ((n && n[0]) || (n = r.parent()), n.append(t)),
                    i && e(i, 0, !1);
                },
                leave: function(t, n) {
                  t.remove(), n && e(n, 0, !1);
                },
                move: function(e, t, n, r) {
                  this.enter(e, t, n, r);
                },
                addClass: function(t, n, r) {
                  (n = w(n) ? n : k(n) ? n.join(' ') : ''),
                    o(t, function(e) {
                      wt(e, n);
                    }),
                    r && e(r, 0, !1);
                },
                removeClass: function(t, n, r) {
                  (n = w(n) ? n : k(n) ? n.join(' ') : ''),
                    o(t, function(e) {
                      yt(e, n);
                    }),
                    r && e(r, 0, !1);
                },
                enabled: d,
              };
            },
          ]);
      },
    ],
    zr = r('$compile');
  qt.$inject = ['$provide', '$$sanitizeUriProvider'];
  var Hr = /^(x[\:\-_]|data[\:\-_])/i,
    Br = r('$interpolate'),
    Wr = /^([^\?#]*)(\?([^#]*))?(#(.*))?$/,
    Gr = {http: 80, https: 443, ftp: 21},
    Yr = r('$location');
  un.prototype = cn.prototype = sn.prototype = {
    $$html5: !1,
    $$replace: !1,
    absUrl: ln('$$absUrl'),
    url: function(e, t) {
      if (g(e)) return this.$$url;
      var n = Wr.exec(e);
      return (
        n[1] && this.path(decodeURIComponent(n[1])),
        (n[2] || n[1]) && this.search(n[3] || ''),
        this.hash(n[5] || '', t),
        this
      );
    },
    protocol: ln('$$protocol'),
    host: ln('$$host'),
    port: ln('$$port'),
    path: fn('$$path', function(e) {
      return '/' == e.charAt(0) ? e : '/' + e;
    }),
    search: function(e, t) {
      switch (arguments.length) {
        case 0:
          return this.$$search;
        case 1:
          if (w(e)) this.$$search = G(e);
          else {
            if (!y(e))
              throw Yr(
                'isrcharg',
                'The first argument of the `$location#search()` call must be a string or an object.',
              );
            this.$$search = e;
          }
          break;
        default:
          g(t) || null === t ? delete this.$$search[e] : (this.$$search[e] = t);
      }
      return this.$$compose(), this;
    },
    hash: fn('$$hash', $),
    replace: function() {
      return (this.$$replace = !0), this;
    },
  };
  var Jr,
    Qr = r('$parse'),
    Zr = {},
    Kr = {
      null: function() {
        return null;
      },
      true: function() {
        return !0;
      },
      false: function() {
        return !1;
      },
      undefined: d,
      '+': function(e, t, r, i) {
        return (
          (r = r(e, t)), (i = i(e, t)), m(r) ? (m(i) ? r + i : r) : m(i) ? i : n
        );
      },
      '-': function(e, t, n, r) {
        return (n = n(e, t)), (r = r(e, t)), (m(n) ? n : 0) - (m(r) ? r : 0);
      },
      '*': function(e, t, n, r) {
        return n(e, t) * r(e, t);
      },
      '/': function(e, t, n, r) {
        return n(e, t) / r(e, t);
      },
      '%': function(e, t, n, r) {
        return n(e, t) % r(e, t);
      },
      '^': function(e, t, n, r) {
        return n(e, t) ^ r(e, t);
      },
      '=': d,
      '===': function(e, t, n, r) {
        return n(e, t) === r(e, t);
      },
      '!==': function(e, t, n, r) {
        return n(e, t) !== r(e, t);
      },
      '==': function(e, t, n, r) {
        return n(e, t) == r(e, t);
      },
      '!=': function(e, t, n, r) {
        return n(e, t) != r(e, t);
      },
      '<': function(e, t, n, r) {
        return n(e, t) < r(e, t);
      },
      '>': function(e, t, n, r) {
        return n(e, t) > r(e, t);
      },
      '<=': function(e, t, n, r) {
        return n(e, t) <= r(e, t);
      },
      '>=': function(e, t, n, r) {
        return n(e, t) >= r(e, t);
      },
      '&&': function(e, t, n, r) {
        return n(e, t) && r(e, t);
      },
      '||': function(e, t, n, r) {
        return n(e, t) || r(e, t);
      },
      '&': function(e, t, n, r) {
        return n(e, t) & r(e, t);
      },
      '|': function(e, t, n, r) {
        return r(e, t)(e, t, n(e, t));
      },
      '!': function(e, t, n) {
        return !n(e, t);
      },
    },
    Xr = {n: '\n', f: '\f', r: '\r', t: '	', v: '', "'": "'", '"': '"'},
    ei = function(e) {
      this.options = e;
    };
  ei.prototype = {
    constructor: ei,
    lex: function(e) {
      (this.text = e),
        (this.index = 0),
        (this.ch = n),
        (this.lastCh = ':'),
        (this.tokens = []);
      for (var t, r = []; this.index < this.text.length; ) {
        if (((this.ch = this.text.charAt(this.index)), this.is('"\'')))
          this.readString(this.ch);
        else if (
          this.isNumber(this.ch) ||
          (this.is('.') && this.isNumber(this.peek()))
        )
          this.readNumber();
        else if (this.isIdent(this.ch))
          this.readIdent(),
            this.was('{,') &&
              '{' === r[0] &&
              (t = this.tokens[this.tokens.length - 1]) &&
              (t.json = -1 === t.text.indexOf('.'));
        else if (this.is('(){}[].,;:?'))
          this.tokens.push({
            index: this.index,
            text: this.ch,
            json: (this.was(':[,') && this.is('{[')) || this.is('}]:,'),
          }),
            this.is('{[') && r.unshift(this.ch),
            this.is('}]') && r.shift(),
            this.index++;
        else {
          if (this.isWhitespace(this.ch)) {
            this.index++;
            continue;
          }
          var i = this.ch + this.peek(),
            o = i + this.peek(2),
            a = Kr[this.ch],
            s = Kr[i],
            c = Kr[o];
          c
            ? (this.tokens.push({index: this.index, text: o, fn: c}),
              (this.index += 3))
            : s
            ? (this.tokens.push({index: this.index, text: i, fn: s}),
              (this.index += 2))
            : a
            ? (this.tokens.push({
                index: this.index,
                text: this.ch,
                fn: a,
                json: this.was('[,:') && this.is('+-'),
              }),
              (this.index += 1))
            : this.throwError(
                'Unexpected next character ',
                this.index,
                this.index + 1,
              );
        }
        this.lastCh = this.ch;
      }
      return this.tokens;
    },
    is: function(e) {
      return -1 !== e.indexOf(this.ch);
    },
    was: function(e) {
      return -1 !== e.indexOf(this.lastCh);
    },
    peek: function(e) {
      var t = e || 1;
      return this.index + t < this.text.length
        ? this.text.charAt(this.index + t)
        : !1;
    },
    isNumber: function(e) {
      return e >= '0' && '9' >= e;
    },
    isWhitespace: function(e) {
      return (
        ' ' === e ||
        '\r' === e ||
        '	' === e ||
        '\n' === e ||
        '' === e ||
        ' ' === e
      );
    },
    isIdent: function(e) {
      return (
        (e >= 'a' && 'z' >= e) ||
        (e >= 'A' && 'Z' >= e) ||
        '_' === e ||
        '$' === e
      );
    },
    isExpOperator: function(e) {
      return '-' === e || '+' === e || this.isNumber(e);
    },
    throwError: function(e, t, n) {
      n = n || this.index;
      var r = m(t)
        ? 's ' + t + '-' + this.index + ' [' + this.text.substring(t, n) + ']'
        : ' ' + n;
      throw Qr(
        'lexerr',
        'Lexer Error: {0} at column{1} in expression [{2}].',
        e,
        r,
        this.text,
      );
    },
    readNumber: function() {
      for (var e = '', t = this.index; this.index < this.text.length; ) {
        var n = ar(this.text.charAt(this.index));
        if ('.' == n || this.isNumber(n)) e += n;
        else {
          var r = this.peek();
          if ('e' == n && this.isExpOperator(r)) e += n;
          else if (
            this.isExpOperator(n) &&
            r &&
            this.isNumber(r) &&
            'e' == e.charAt(e.length - 1)
          )
            e += n;
          else {
            if (
              !this.isExpOperator(n) ||
              (r && this.isNumber(r)) ||
              'e' != e.charAt(e.length - 1)
            )
              break;
            this.throwError('Invalid exponent');
          }
        }
        this.index++;
      }
      (e = 1 * e),
        this.tokens.push({
          index: t,
          text: e,
          json: !0,
          fn: function() {
            return e;
          },
        });
    },
    readIdent: function() {
      for (
        var e, t, n, r, i = this, o = '', a = this.index;
        this.index < this.text.length &&
        ((r = this.text.charAt(this.index)),
        '.' === r || this.isIdent(r) || this.isNumber(r));

      )
        '.' === r && (e = this.index), (o += r), this.index++;
      if (e)
        for (t = this.index; this.text.length > t; ) {
          if (((r = this.text.charAt(t)), '(' === r)) {
            (n = o.substr(e - a + 1)),
              (o = o.substr(0, e - a)),
              (this.index = t);
            break;
          }
          if (!this.isWhitespace(r)) break;
          t++;
        }
      var s = {index: a, text: o};
      if (Kr.hasOwnProperty(o)) (s.fn = Kr[o]), (s.json = Kr[o]);
      else {
        var c = wn(o, this.options, this.text);
        s.fn = f(
          function(e, t) {
            return c(e, t);
          },
          {
            assign: function(e, t) {
              return vn(e, o, t, i.text, i.options);
            },
          },
        );
      }
      this.tokens.push(s),
        n &&
          (this.tokens.push({index: e, text: '.', json: !1}),
          this.tokens.push({index: e + 1, text: n, json: !1}));
    },
    readString: function(e) {
      var t = this.index;
      this.index++;
      for (var r = '', i = e, o = !1; this.index < this.text.length; ) {
        var a = this.text.charAt(this.index);
        if (((i += a), o)) {
          if ('u' === a) {
            var s = this.text.substring(this.index + 1, this.index + 5);
            s.match(/[\da-f]{4}/i) ||
              this.throwError('Invalid unicode escape [\\u' + s + ']'),
              (this.index += 4),
              (r += String.fromCharCode(parseInt(s, 16)));
          } else {
            var c = Xr[a];
            r += c ? c : a;
          }
          o = !1;
        } else if ('\\' === a) o = !0;
        else {
          if (a === e)
            return (
              this.index++,
              this.tokens.push({
                index: t,
                text: i,
                string: r,
                json: !0,
                fn: function() {
                  return r;
                },
              }),
              n
            );
          r += a;
        }
        this.index++;
      }
      this.throwError('Unterminated quote', t);
    },
  };
  var ti = function(e, t, n) {
    (this.lexer = e), (this.$filter = t), (this.options = n);
  };
  (ti.ZERO = function() {
    return 0;
  }),
    (ti.prototype = {
      constructor: ti,
      parse: function(e, t) {
        (this.text = e),
          (this.json = t),
          (this.tokens = this.lexer.lex(e)),
          t &&
            ((this.assignment = this.logicalOR),
            (this.functionCall = this.fieldAccess = this.objectIndex = this.filterChain = function() {
              this.throwError('is not valid json', {text: e, index: 0});
            }));
        var n = t ? this.primary() : this.statements();
        return (
          0 !== this.tokens.length &&
            this.throwError('is an unexpected token', this.tokens[0]),
          (n.literal = !!n.literal),
          (n.constant = !!n.constant),
          n
        );
      },
      primary: function() {
        var e;
        if (this.expect('(')) (e = this.filterChain()), this.consume(')');
        else if (this.expect('[')) e = this.arrayDeclaration();
        else if (this.expect('{')) e = this.object();
        else {
          var t = this.expect();
          (e = t.fn),
            e || this.throwError('not a primary expression', t),
            t.json && ((e.constant = !0), (e.literal = !0));
        }
        for (var n, r; (n = this.expect('(', '[', '.')); )
          '(' === n.text
            ? ((e = this.functionCall(e, r)), (r = null))
            : '[' === n.text
            ? ((r = e), (e = this.objectIndex(e)))
            : '.' === n.text
            ? ((r = e), (e = this.fieldAccess(e)))
            : this.throwError('IMPOSSIBLE');
        return e;
      },
      throwError: function(e, t) {
        throw Qr(
          'syntax',
          "Syntax Error: Token '{0}' {1} at column {2} of the expression [{3}] starting at [{4}].",
          t.text,
          e,
          t.index + 1,
          this.text,
          this.text.substring(t.index),
        );
      },
      peekToken: function() {
        if (0 === this.tokens.length)
          throw Qr('ueoe', 'Unexpected end of expression: {0}', this.text);
        return this.tokens[0];
      },
      peek: function(e, t, n, r) {
        if (this.tokens.length > 0) {
          var i = this.tokens[0],
            o = i.text;
          if (
            o === e ||
            o === t ||
            o === n ||
            o === r ||
            (!e && !t && !n && !r)
          )
            return i;
        }
        return !1;
      },
      expect: function(e, t, n, r) {
        var i = this.peek(e, t, n, r);
        return i
          ? (this.json && !i.json && this.throwError('is not valid json', i),
            this.tokens.shift(),
            i)
          : !1;
      },
      consume: function(e) {
        this.expect(e) ||
          this.throwError('is unexpected, expecting [' + e + ']', this.peek());
      },
      unaryFn: function(e, t) {
        return f(
          function(n, r) {
            return e(n, r, t);
          },
          {constant: t.constant},
        );
      },
      ternaryFn: function(e, t, n) {
        return f(
          function(r, i) {
            return e(r, i) ? t(r, i) : n(r, i);
          },
          {constant: e.constant && t.constant && n.constant},
        );
      },
      binaryFn: function(e, t, n) {
        return f(
          function(r, i) {
            return t(r, i, e, n);
          },
          {constant: e.constant && n.constant},
        );
      },
      statements: function() {
        for (var e = []; ; )
          if (
            (this.tokens.length > 0 &&
              !this.peek('}', ')', ';', ']') &&
              e.push(this.filterChain()),
            !this.expect(';'))
          )
            return 1 === e.length
              ? e[0]
              : function(t, n) {
                  for (var r, i = 0; e.length > i; i++) {
                    var o = e[i];
                    o && (r = o(t, n));
                  }
                  return r;
                };
      },
      filterChain: function() {
        for (var e, t = this.expression(); ; ) {
          if (!(e = this.expect('|'))) return t;
          t = this.binaryFn(t, e.fn, this.filter());
        }
      },
      filter: function() {
        for (var e = this.expect(), t = this.$filter(e.text), n = []; ; ) {
          if (!(e = this.expect(':'))) {
            var r = function(e, r, i) {
              for (var o = [i], a = 0; n.length > a; a++) o.push(n[a](e, r));
              return t.apply(e, o);
            };
            return function() {
              return r;
            };
          }
          n.push(this.expression());
        }
      },
      expression: function() {
        return this.assignment();
      },
      assignment: function() {
        var e,
          t,
          n = this.ternary();
        return (t = this.expect('='))
          ? (n.assign ||
              this.throwError(
                'implies assignment but [' +
                  this.text.substring(0, t.index) +
                  '] can not be assigned to',
                t,
              ),
            (e = this.ternary()),
            function(t, r) {
              return n.assign(t, e(t, r), r);
            })
          : n;
      },
      ternary: function() {
        var e,
          t,
          r = this.logicalOR();
        return (t = this.expect('?'))
          ? ((e = this.ternary()),
            (t = this.expect(':'))
              ? this.ternaryFn(r, e, this.ternary())
              : (this.throwError('expected :', t), n))
          : r;
      },
      logicalOR: function() {
        for (var e, t = this.logicalAND(); ; ) {
          if (!(e = this.expect('||'))) return t;
          t = this.binaryFn(t, e.fn, this.logicalAND());
        }
      },
      logicalAND: function() {
        var e,
          t = this.equality();
        return (
          (e = this.expect('&&')) &&
            (t = this.binaryFn(t, e.fn, this.logicalAND())),
          t
        );
      },
      equality: function() {
        var e,
          t = this.relational();
        return (
          (e = this.expect('==', '!=', '===', '!==')) &&
            (t = this.binaryFn(t, e.fn, this.equality())),
          t
        );
      },
      relational: function() {
        var e,
          t = this.additive();
        return (
          (e = this.expect('<', '>', '<=', '>=')) &&
            (t = this.binaryFn(t, e.fn, this.relational())),
          t
        );
      },
      additive: function() {
        for (var e, t = this.multiplicative(); (e = this.expect('+', '-')); )
          t = this.binaryFn(t, e.fn, this.multiplicative());
        return t;
      },
      multiplicative: function() {
        for (var e, t = this.unary(); (e = this.expect('*', '/', '%')); )
          t = this.binaryFn(t, e.fn, this.unary());
        return t;
      },
      unary: function() {
        var e;
        return this.expect('+')
          ? this.primary()
          : (e = this.expect('-'))
          ? this.binaryFn(ti.ZERO, e.fn, this.unary())
          : (e = this.expect('!'))
          ? this.unaryFn(e.fn, this.unary())
          : this.primary();
      },
      fieldAccess: function(e) {
        var t = this,
          n = this.expect().text,
          r = wn(n, this.options, this.text);
        return f(
          function(t, n, i) {
            return r(i || e(t, n));
          },
          {
            assign: function(r, i, o) {
              return vn(e(r, o), n, i, t.text, t.options);
            },
          },
        );
      },
      objectIndex: function(e) {
        var t = this,
          r = this.expression();
        return (
          this.consume(']'),
          f(
            function(i, o) {
              var a,
                s,
                c = e(i, o),
                u = r(i, o);
              return c
                ? ((a = $n(c[u], t.text)),
                  a &&
                    a.then &&
                    t.options.unwrapPromises &&
                    ((s = a),
                    '$$v' in a ||
                      ((s.$$v = n),
                      s.then(function(e) {
                        s.$$v = e;
                      })),
                    (a = a.$$v)),
                  a)
                : n;
            },
            {
              assign: function(n, i, o) {
                var a = r(n, o),
                  s = $n(e(n, o), t.text);
                return (s[a] = i);
              },
            },
          )
        );
      },
      functionCall: function(e, t) {
        var n = [];
        if (')' !== this.peekToken().text)
          do n.push(this.expression());
          while (this.expect(','));
        this.consume(')');
        var r = this;
        return function(i, o) {
          for (var a = [], s = t ? t(i, o) : i, c = 0; n.length > c; c++)
            a.push(n[c](i, o));
          var u = e(i, o, s) || d;
          $n(s, r.text), $n(u, r.text);
          var l = u.apply ? u.apply(s, a) : u(a[0], a[1], a[2], a[3], a[4]);
          return $n(l, r.text);
        };
      },
      arrayDeclaration: function() {
        var e = [],
          t = !0;
        if (']' !== this.peekToken().text)
          do {
            var n = this.expression();
            e.push(n), n.constant || (t = !1);
          } while (this.expect(','));
        return (
          this.consume(']'),
          f(
            function(t, n) {
              for (var r = [], i = 0; e.length > i; i++) r.push(e[i](t, n));
              return r;
            },
            {literal: !0, constant: t},
          )
        );
      },
      object: function() {
        var e = [],
          t = !0;
        if ('}' !== this.peekToken().text)
          do {
            var n = this.expect(),
              r = n.string || n.text;
            this.consume(':');
            var i = this.expression();
            e.push({key: r, value: i}), i.constant || (t = !1);
          } while (this.expect(','));
        return (
          this.consume('}'),
          f(
            function(t, n) {
              for (var r = {}, i = 0; e.length > i; i++) {
                var o = e[i];
                r[o.key] = o.value(t, n);
              }
              return r;
            },
            {literal: !0, constant: t},
          )
        );
      },
    });
  var ni = {},
    ri = r('$sce'),
    ii = {
      HTML: 'html',
      CSS: 'css',
      URL: 'url',
      RESOURCE_URL: 'resourceUrl',
      JS: 'js',
    },
    oi = t.createElement('a'),
    ai = Dn(e.location.href, !0);
  (qn.$inject = ['$provide']),
    (In.$inject = ['$locale']),
    (Un.$inject = ['$locale']);
  var si = '.',
    ci = {
      yyyy: _n('FullYear', 4),
      yy: _n('FullYear', 2, 0, !0),
      y: _n('FullYear', 1),
      MMMM: zn('Month'),
      MMM: zn('Month', !0),
      MM: _n('Month', 2, 1),
      M: _n('Month', 1, 1),
      dd: _n('Date', 2),
      d: _n('Date', 1),
      HH: _n('Hours', 2),
      H: _n('Hours', 1),
      hh: _n('Hours', 2, -12),
      h: _n('Hours', 1, -12),
      mm: _n('Minutes', 2),
      m: _n('Minutes', 1),
      ss: _n('Seconds', 2),
      s: _n('Seconds', 1),
      sss: _n('Milliseconds', 3),
      EEEE: zn('Day'),
      EEE: zn('Day', !0),
      a: Bn,
      Z: Hn,
    },
    ui = /((?:[^yMdHhmsaZE']+)|(?:'(?:[^']|'')*')|(?:E+|y+|M+|d+|H+|h+|m+|s+|a|Z))(.*)/,
    li = /^\-?\d+$/;
  Wn.$inject = ['$locale'];
  var fi = v(ar),
    hi = v(sr);
  Jn.$inject = ['$parse'];
  var pi = v({
      restrict: 'E',
      compile: function(e, r) {
        return (
          8 >= lr &&
            (r.href || r.name || r.$set('href', ''),
            e.append(t.createComment('IE fix'))),
          r.href || r.xlinkHref || r.name
            ? n
            : function(e, t) {
                var n =
                  '[object SVGAnimatedString]' === gr.call(t.prop('href'))
                    ? 'xlink:href'
                    : 'href';
                t.on('click', function(e) {
                  t.attr(n) || e.preventDefault();
                });
              }
        );
      },
    }),
    di = {};
  o(Dr, function(e, t) {
    if ('multiple' != e) {
      var n = Rt('ng-' + t);
      di[n] = function() {
        return {
          priority: 100,
          link: function(e, r, i) {
            e.$watch(i[n], function(e) {
              i.$set(t, !!e);
            });
          },
        };
      };
    }
  }),
    o(['src', 'srcset', 'href'], function(e) {
      var t = Rt('ng-' + e);
      di[t] = function() {
        return {
          priority: 99,
          link: function(n, r, i) {
            i.$observe(t, function(t) {
              t && (i.$set(e, t), lr && r.prop(e, i[e]));
            });
          },
        };
      };
    });
  var $i = {
    $addControl: d,
    $removeControl: d,
    $setValidity: d,
    $setDirty: d,
    $setPristine: d,
  };
  Zn.$inject = ['$element', '$attrs', '$scope'];
  var vi = function(e) {
      return [
        '$timeout',
        function(t) {
          var r = {
            name: 'form',
            restrict: e ? 'EAC' : 'E',
            controller: Zn,
            compile: function() {
              return {
                pre: function(e, r, i, o) {
                  if (!i.action) {
                    var a = function(e) {
                      e.preventDefault
                        ? e.preventDefault()
                        : (e.returnValue = !1);
                    };
                    Ar(r[0], 'submit', a),
                      r.on('$destroy', function() {
                        t(
                          function() {
                            Tr(r[0], 'submit', a);
                          },
                          0,
                          !1,
                        );
                      });
                  }
                  var s = r.parent().controller('form'),
                    c = i.name || i.ngForm;
                  c && vn(e, c, o, c),
                    s &&
                      r.on('$destroy', function() {
                        s.$removeControl(o), c && vn(e, c, n, c), f(o, $i);
                      });
                },
              };
            },
          };
          return r;
        },
      ];
    },
    gi = vi(),
    mi = vi(!0),
    yi = /^(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?$/,
    wi = /^[a-z0-9!#$%&'*+/=?^_`{|}~.-]+@[a-z0-9-]+(\.[a-z0-9-]+)*$/i,
    bi = /^\s*(\-|\+)?(\d+|(\d*(\.\d*)))\s*$/,
    xi = {
      text: Xn,
      number: er,
      url: tr,
      email: nr,
      radio: rr,
      checkbox: ir,
      hidden: d,
      button: d,
      submit: d,
      reset: d,
    },
    ki = [
      '$browser',
      '$sniffer',
      function(e, t) {
        return {
          restrict: 'E',
          require: '?ngModel',
          link: function(n, r, i, o) {
            o && (xi[ar(i.type)] || xi.text)(n, r, i, o, t, e);
          },
        };
      },
    ],
    Si = 'ng-valid',
    Ci = 'ng-invalid',
    Ei = 'ng-pristine',
    Ai = 'ng-dirty',
    Ti = [
      '$scope',
      '$exceptionHandler',
      '$attrs',
      '$element',
      '$parse',
      function(e, t, n, i, a) {
        function s(e, t) {
          (t = t ? '-' + X(t, '-') : ''),
            i.removeClass((e ? Ci : Si) + t).addClass((e ? Si : Ci) + t);
        }
        (this.$viewValue = Number.NaN),
          (this.$modelValue = Number.NaN),
          (this.$parsers = []),
          (this.$formatters = []),
          (this.$viewChangeListeners = []),
          (this.$pristine = !0),
          (this.$dirty = !1),
          (this.$valid = !0),
          (this.$invalid = !1),
          (this.$name = n.name);
        var c = a(n.ngModel),
          u = c.assign;
        if (!u)
          throw r('ngModel')(
            'nonassign',
            "Expression '{0}' is non-assignable. Element: {1}",
            n.ngModel,
            B(i),
          );
        (this.$render = d),
          (this.$isEmpty = function(e) {
            return g(e) || '' === e || null === e || e !== e;
          });
        var l = i.inheritedData('$formController') || $i,
          f = 0,
          h = (this.$error = {});
        i.addClass(Ei),
          s(!0),
          (this.$setValidity = function(e, t) {
            h[e] !== !t &&
              (t
                ? (h[e] && f--,
                  f || (s(!0), (this.$valid = !0), (this.$invalid = !1)))
                : (s(!1), (this.$invalid = !0), (this.$valid = !1), f++),
              (h[e] = !t),
              s(t, e),
              l.$setValidity(e, t, this));
          }),
          (this.$setPristine = function() {
            (this.$dirty = !1),
              (this.$pristine = !0),
              i.removeClass(Ai).addClass(Ei);
          }),
          (this.$setViewValue = function(n) {
            (this.$viewValue = n),
              this.$pristine &&
                ((this.$dirty = !0),
                (this.$pristine = !1),
                i.removeClass(Ei).addClass(Ai),
                l.$setDirty()),
              o(this.$parsers, function(e) {
                n = e(n);
              }),
              this.$modelValue !== n &&
                ((this.$modelValue = n),
                u(e, n),
                o(this.$viewChangeListeners, function(e) {
                  try {
                    e();
                  } catch (n) {
                    t(n);
                  }
                }));
          });
        var p = this;
        e.$watch(function() {
          var t = c(e);
          if (p.$modelValue !== t) {
            var n = p.$formatters,
              r = n.length;
            for (p.$modelValue = t; r--; ) t = n[r](t);
            p.$viewValue !== t && ((p.$viewValue = t), p.$render());
          }
          return t;
        });
      },
    ],
    Pi = function() {
      return {
        require: ['ngModel', '^?form'],
        controller: Ti,
        link: function(e, t, n, r) {
          var i = r[0],
            o = r[1] || $i;
          o.$addControl(i),
            e.$on('$destroy', function() {
              o.$removeControl(i);
            });
        },
      };
    },
    ji = v({
      require: 'ngModel',
      link: function(e, t, n, r) {
        r.$viewChangeListeners.push(function() {
          e.$eval(n.ngChange);
        });
      },
    }),
    Oi = function() {
      return {
        require: '?ngModel',
        link: function(e, t, r, i) {
          if (i) {
            r.required = !0;
            var o = function(e) {
              return r.required && i.$isEmpty(e)
                ? (i.$setValidity('required', !1), n)
                : (i.$setValidity('required', !0), e);
            };
            i.$formatters.push(o),
              i.$parsers.unshift(o),
              r.$observe('required', function() {
                o(i.$viewValue);
              });
          }
        },
      };
    },
    Mi = function() {
      return {
        require: 'ngModel',
        link: function(e, t, r, i) {
          var a = /\/(.*)\//.exec(r.ngList),
            s = (a && RegExp(a[1])) || r.ngList || ',',
            c = function(e) {
              if (!g(e)) {
                var t = [];
                return (
                  e &&
                    o(e.split(s), function(e) {
                      e && t.push(br(e));
                    }),
                  t
                );
              }
            };
          i.$parsers.push(c),
            i.$formatters.push(function(e) {
              return k(e) ? e.join(', ') : n;
            }),
            (i.$isEmpty = function(e) {
              return !e || !e.length;
            });
        },
      };
    },
    Di = /^(true|false|\d+)$/,
    Ni = function() {
      return {
        priority: 100,
        compile: function(e, t) {
          return Di.test(t.ngValue)
            ? function(e, t, n) {
                n.$set('value', e.$eval(n.ngValue));
              }
            : function(e, t, n) {
                e.$watch(n.ngValue, function(e) {
                  n.$set('value', e);
                });
              };
        },
      };
    },
    Fi = Qn(function(e, t, r) {
      t.addClass('ng-binding').data('$binding', r.ngBind),
        e.$watch(r.ngBind, function(e) {
          t.text(e == n ? '' : e);
        });
    }),
    qi = [
      '$interpolate',
      function(e) {
        return function(t, n, r) {
          var i = e(n.attr(r.$attr.ngBindTemplate));
          n.addClass('ng-binding').data('$binding', i),
            r.$observe('ngBindTemplate', function(e) {
              n.text(e);
            });
        };
      },
    ],
    Ri = [
      '$sce',
      '$parse',
      function(e, t) {
        return function(n, r, i) {
          function o() {
            return '' + (a(n) || '');
          }
          r.addClass('ng-binding').data('$binding', i.ngBindHtml);
          var a = t(i.ngBindHtml);
          n.$watch(o, function() {
            r.html(e.getTrustedHtml(a(n)) || '');
          });
        };
      },
    ],
    Ii = or('', !0),
    Ui = or('Odd', 0),
    Vi = or('Even', 1),
    Li = Qn({
      compile: function(e, t) {
        t.$set('ngCloak', n), e.removeClass('ng-cloak');
      },
    }),
    _i = [
      function() {
        return {scope: !0, controller: '@', priority: 500};
      },
    ],
    zi = {};
  o(
    'click dblclick mousedown mouseup mouseover mouseout mousemove mouseenter mouseleave keydown keyup keypress submit focus blur copy cut paste'.split(
      ' ',
    ),
    function(e) {
      var t = Rt('ng-' + e);
      zi[t] = [
        '$parse',
        function(n) {
          return {
            compile: function(r, i) {
              var o = n(i[t]);
              return function(t, n) {
                n.on(ar(e), function(e) {
                  t.$apply(function() {
                    o(t, {$event: e});
                  });
                });
              };
            },
          };
        },
      ];
    },
  );
  var Hi = [
      '$animate',
      function(e) {
        return {
          transclude: 'element',
          priority: 600,
          terminal: !0,
          restrict: 'A',
          $$tlb: !0,
          link: function(n, r, i, o, a) {
            var s, c;
            n.$watch(i.ngIf, function(o) {
              H(o)
                ? c ||
                  ((c = n.$new()),
                  a(c, function(n) {
                    (n[n.length++] = t.createComment(
                      ' end ngIf: ' + i.ngIf + ' ',
                    )),
                      (s = {clone: n}),
                      e.enter(n, r.parent(), r);
                  }))
                : (c && (c.$destroy(), (c = null)),
                  s && (e.leave(ot(s.clone)), (s = null)));
            });
          },
        };
      },
    ],
    Bi = [
      '$http',
      '$templateCache',
      '$anchorScroll',
      '$animate',
      '$sce',
      function(e, t, n, r, i) {
        return {
          restrict: 'ECA',
          priority: 400,
          terminal: !0,
          transclude: 'element',
          controller: yr.noop,
          compile: function(o, a) {
            var s = a.ngInclude || a.src,
              c = a.onload || '',
              u = a.autoscroll;
            return function(o, a, l, f, h) {
              var p,
                d,
                $ = 0,
                v = function() {
                  p && (p.$destroy(), (p = null)),
                    d && (r.leave(d), (d = null));
                };
              o.$watch(i.parseAsResourceUrl(s), function(i) {
                var s = function() {
                    !m(u) || (u && !o.$eval(u)) || n();
                  },
                  l = ++$;
                i
                  ? (e
                      .get(i, {cache: t})
                      .success(function(e) {
                        if (l === $) {
                          var t = o.$new();
                          f.template = e;
                          var n = h(t, function(e) {
                            v(), r.enter(e, null, a, s);
                          });
                          (p = t),
                            (d = n),
                            p.$emit('$includeContentLoaded'),
                            o.$eval(c);
                        }
                      })
                      .error(function() {
                        l === $ && v();
                      }),
                    o.$emit('$includeContentRequested'))
                  : (v(), (f.template = null));
              });
            };
          },
        };
      },
    ],
    Wi = [
      '$compile',
      function(e) {
        return {
          restrict: 'ECA',
          priority: -400,
          require: 'ngInclude',
          link: function(t, n, r, i) {
            n.html(i.template), e(n.contents())(t);
          },
        };
      },
    ],
    Gi = Qn({
      priority: 450,
      compile: function() {
        return {
          pre: function(e, t, n) {
            e.$eval(n.ngInit);
          },
        };
      },
    }),
    Yi = Qn({terminal: !0, priority: 1e3}),
    Ji = [
      '$locale',
      '$interpolate',
      function(e, t) {
        var n = /{}/g;
        return {
          restrict: 'EA',
          link: function(r, i, a) {
            var s = a.count,
              c = a.$attr.when && i.attr(a.$attr.when),
              u = a.offset || 0,
              l = r.$eval(c) || {},
              f = {},
              h = t.startSymbol(),
              p = t.endSymbol(),
              d = /^when(Minus)?(.+)$/;
            o(a, function(e, t) {
              d.test(t) &&
                (l[ar(t.replace('when', '').replace('Minus', '-'))] = i.attr(
                  a.$attr[t],
                ));
            }),
              o(l, function(e, r) {
                f[r] = t(e.replace(n, h + s + '-' + u + p));
              }),
              r.$watch(
                function() {
                  var t = parseFloat(r.$eval(s));
                  return isNaN(t)
                    ? ''
                    : (t in l || (t = e.pluralCat(t - u)), f[t](r, i, !0));
                },
                function(e) {
                  i.text(e);
                },
              );
          },
        };
      },
    ],
    Qi = [
      '$parse',
      '$animate',
      function(e, n) {
        function a(e) {
          return e.clone[0];
        }
        function s(e) {
          return e.clone[e.clone.length - 1];
        }
        var c = '$$NG_REMOVED',
          u = r('ngRepeat');
        return {
          transclude: 'element',
          priority: 1e3,
          terminal: !0,
          $$tlb: !0,
          link: function(r, l, f, h, p) {
            var d,
              $,
              v,
              g,
              m,
              y,
              w,
              b,
              x,
              k = f.ngRepeat,
              S = k.match(
                /^\s*([\s\S]+?)\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?\s*$/,
              ),
              C = {$id: At};
            if (!S)
              throw u(
                'iexp',
                "Expected expression in form of '_item_ in _collection_[ track by _id_]' but got '{0}'.",
                k,
              );
            if (
              ((y = S[1]),
              (w = S[2]),
              (d = S[3]),
              d
                ? (($ = e(d)),
                  (v = function(e, t, n) {
                    return x && (C[x] = e), (C[b] = t), (C.$index = n), $(r, C);
                  }))
                : ((g = function(e, t) {
                    return At(t);
                  }),
                  (m = function(e) {
                    return e;
                  })),
              (S = y.match(/^(?:([\$\w]+)|\(([\$\w]+)\s*,\s*([\$\w]+)\))$/)),
              !S)
            )
              throw u(
                'iidexp',
                "'_item_' in '_item_ in _collection_' should be an identifier or '(_key_, _value_)' expression, but got '{0}'.",
                y,
              );
            (b = S[3] || S[1]), (x = S[2]);
            var E = {};
            r.$watchCollection(w, function(e) {
              var f,
                h,
                d,
                $,
                y,
                w,
                S,
                C,
                A,
                T,
                P,
                j,
                O = l[0],
                M = {},
                D = [];
              if (i(e)) (T = e), (A = v || g);
              else {
                (A = v || m), (T = []);
                for (w in e)
                  e.hasOwnProperty(w) && '$' != w.charAt(0) && T.push(w);
                T.sort();
              }
              for ($ = T.length, h = D.length = T.length, f = 0; h > f; f++)
                if (
                  ((w = e === T ? f : T[f]),
                  (S = e[w]),
                  (C = A(w, S, f)),
                  rt(C, '`track by` id'),
                  E.hasOwnProperty(C))
                )
                  (P = E[C]), delete E[C], (M[C] = P), (D[f] = P);
                else {
                  if (M.hasOwnProperty(C))
                    throw (o(D, function(e) {
                      e && e.scope && (E[e.id] = e);
                    }),
                    u(
                      'dupes',
                      "Duplicates in a repeater are not allowed. Use 'track by' expression to specify unique keys. Repeater: {0}, Duplicate key: {1}",
                      k,
                      C,
                    ));
                  (D[f] = {id: C}), (M[C] = !1);
                }
              for (w in E)
                E.hasOwnProperty(w) &&
                  ((P = E[w]),
                  (j = ot(P.clone)),
                  n.leave(j),
                  o(j, function(e) {
                    e[c] = !0;
                  }),
                  P.scope.$destroy());
              for (f = 0, h = T.length; h > f; f++) {
                if (
                  ((w = e === T ? f : T[f]),
                  (S = e[w]),
                  (P = D[f]),
                  D[f - 1] && (O = s(D[f - 1])),
                  P.scope)
                ) {
                  (y = P.scope), (d = O);
                  do d = d.nextSibling;
                  while (d && d[c]);
                  a(P) != d && n.move(ot(P.clone), null, fr(O)), (O = s(P));
                } else y = r.$new();
                (y[b] = S),
                  x && (y[x] = w),
                  (y.$index = f),
                  (y.$first = 0 === f),
                  (y.$last = f === $ - 1),
                  (y.$middle = !(y.$first || y.$last)),
                  (y.$odd = !(y.$even = 0 === (1 & f))),
                  P.scope ||
                    p(y, function(e) {
                      (e[e.length++] = t.createComment(
                        ' end ngRepeat: ' + k + ' ',
                      )),
                        n.enter(e, null, fr(O)),
                        (O = e),
                        (P.scope = y),
                        (P.clone = e),
                        (M[P.id] = P);
                    });
              }
              E = M;
            });
          },
        };
      },
    ],
    Zi = [
      '$animate',
      function(e) {
        return function(t, n, r) {
          t.$watch(r.ngShow, function(t) {
            e[H(t) ? 'removeClass' : 'addClass'](n, 'ng-hide');
          });
        };
      },
    ],
    Ki = [
      '$animate',
      function(e) {
        return function(t, n, r) {
          t.$watch(r.ngHide, function(t) {
            e[H(t) ? 'addClass' : 'removeClass'](n, 'ng-hide');
          });
        };
      },
    ],
    Xi = Qn(function(e, t, n) {
      e.$watch(
        n.ngStyle,
        function(e, n) {
          n &&
            e !== n &&
            o(n, function(e, n) {
              t.css(n, '');
            }),
            e && t.css(e);
        },
        !0,
      );
    }),
    eo = [
      '$animate',
      function(e) {
        return {
          restrict: 'EA',
          require: 'ngSwitch',
          controller: [
            '$scope',
            function() {
              this.cases = {};
            },
          ],
          link: function(t, n, r, i) {
            var a,
              s,
              c = r.ngSwitch || r.on,
              u = [];
            t.$watch(c, function(n) {
              for (var c = 0, l = u.length; l > c; c++)
                u[c].$destroy(), e.leave(s[c]);
              (s = []),
                (u = []),
                (a = i.cases['!' + n] || i.cases['?']) &&
                  (t.$eval(r.change),
                  o(a, function(n) {
                    var r = t.$new();
                    u.push(r),
                      n.transclude(r, function(t) {
                        var r = n.element;
                        s.push(t), e.enter(t, r.parent(), r);
                      });
                  }));
            });
          },
        };
      },
    ],
    to = Qn({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      link: function(e, t, n, r, i) {
        (r.cases['!' + n.ngSwitchWhen] = r.cases['!' + n.ngSwitchWhen] || []),
          r.cases['!' + n.ngSwitchWhen].push({transclude: i, element: t});
      },
    }),
    no = Qn({
      transclude: 'element',
      priority: 800,
      require: '^ngSwitch',
      link: function(e, t, n, r, i) {
        (r.cases['?'] = r.cases['?'] || []),
          r.cases['?'].push({transclude: i, element: t});
      },
    }),
    ro = Qn({
      controller: [
        '$element',
        '$transclude',
        function(e, t) {
          if (!t)
            throw r('ngTransclude')(
              'orphan',
              'Illegal use of ngTransclude directive in the template! No parent directive that requires a transclusion found. Element: {0}',
              B(e),
            );
          this.$transclude = t;
        },
      ],
      link: function(e, t, n, r) {
        r.$transclude(function(e) {
          t.empty(), t.append(e);
        });
      },
    }),
    io = [
      '$templateCache',
      function(e) {
        return {
          restrict: 'E',
          terminal: !0,
          compile: function(t, n) {
            if ('text/ng-template' == n.type) {
              var r = n.id,
                i = t[0].text;
              e.put(r, i);
            }
          },
        };
      },
    ],
    oo = r('ngOptions'),
    ao = v({terminal: !0}),
    so = [
      '$compile',
      '$parse',
      function(e, r) {
        var i = /^\s*([\s\S]+?)(?:\s+as\s+([\s\S]+?))?(?:\s+group\s+by\s+([\s\S]+?))?\s+for\s+(?:([\$\w][\$\w]*)|(?:\(\s*([\$\w][\$\w]*)\s*,\s*([\$\w][\$\w]*)\s*\)))\s+in\s+([\s\S]+?)(?:\s+track\s+by\s+([\s\S]+?))?$/,
          s = {$setViewValue: d};
        return {
          restrict: 'E',
          require: ['select', '?ngModel'],
          controller: [
            '$element',
            '$scope',
            '$attrs',
            function(e, t, n) {
              var r,
                i,
                o = this,
                a = {},
                c = s;
              (o.databound = n.ngModel),
                (o.init = function(e, t, n) {
                  (c = e), (r = t), (i = n);
                }),
                (o.addOption = function(t) {
                  rt(t, '"option value"'),
                    (a[t] = !0),
                    c.$viewValue == t && (e.val(t), i.parent() && i.remove());
                }),
                (o.removeOption = function(e) {
                  this.hasOption(e) &&
                    (delete a[e],
                    c.$viewValue == e && this.renderUnknownOption(e));
                }),
                (o.renderUnknownOption = function(t) {
                  var n = '? ' + At(t) + ' ?';
                  i.val(n), e.prepend(i), e.val(n), i.prop('selected', !0);
                }),
                (o.hasOption = function(e) {
                  return a.hasOwnProperty(e);
                }),
                t.$on('$destroy', function() {
                  o.renderUnknownOption = d;
                });
            },
          ],
          link: function(s, c, u, l) {
            function f(e, t, n, r) {
              (n.$render = function() {
                var e = n.$viewValue;
                r.hasOption(e)
                  ? (C.parent() && C.remove(),
                    t.val(e),
                    '' === e && d.prop('selected', !0))
                  : g(e) && d
                  ? t.val('')
                  : r.renderUnknownOption(e);
              }),
                t.on('change', function() {
                  e.$apply(function() {
                    C.parent() && C.remove(), n.$setViewValue(t.val());
                  });
                });
            }
            function h(e, t, n) {
              var r;
              (n.$render = function() {
                var e = new Tt(n.$viewValue);
                o(t.find('option'), function(t) {
                  t.selected = m(e.get(t.value));
                });
              }),
                e.$watch(function() {
                  q(r, n.$viewValue) || ((r = N(n.$viewValue)), n.$render());
                }),
                t.on('change', function() {
                  e.$apply(function() {
                    var e = [];
                    o(t.find('option'), function(t) {
                      t.selected && e.push(t.value);
                    }),
                      n.$setViewValue(e);
                  });
                });
            }
            function p(t, o, s) {
              function c() {
                var e,
                  n,
                  r,
                  i,
                  c,
                  u,
                  v,
                  w,
                  E,
                  A,
                  T,
                  P,
                  j,
                  O,
                  M,
                  D = {'': []},
                  N = [''],
                  F = s.$modelValue,
                  q = $(t) || [],
                  R = h ? a(q) : q,
                  I = {},
                  U = !1;
                if (y)
                  if (g && k(F)) {
                    U = new Tt([]);
                    for (var V = 0; F.length > V; V++)
                      (I[f] = F[V]), U.put(g(t, I), F[V]);
                  } else U = new Tt(F);
                for (T = 0; (E = R.length), E > T; T++) {
                  if (((v = T), h)) {
                    if (((v = R[T]), '$' === v.charAt(0))) continue;
                    I[h] = v;
                  }
                  if (
                    ((I[f] = q[v]),
                    (e = p(t, I) || ''),
                    (n = D[e]) || ((n = D[e] = []), N.push(e)),
                    y)
                  )
                    P = m(U.remove(g ? g(t, I) : d(t, I)));
                  else {
                    if (g) {
                      var L = {};
                      (L[f] = F), (P = g(t, L) === g(t, I));
                    } else P = F === d(t, I);
                    U = U || P;
                  }
                  (M = l(t, I)),
                    (M = m(M) ? M : ''),
                    n.push({
                      id: g ? g(t, I) : h ? R[T] : T,
                      label: M,
                      selected: P,
                    });
                }
                for (
                  y ||
                    (b || null === F
                      ? D[''].unshift({id: '', label: '', selected: !U})
                      : U || D[''].unshift({id: '?', label: '', selected: !0})),
                    A = 0,
                    w = N.length;
                  w > A;
                  A++
                ) {
                  for (
                    e = N[A],
                      n = D[e],
                      A >= C.length
                        ? ((i = {
                            element: S.clone().attr('label', e),
                            label: n.label,
                          }),
                          (c = [i]),
                          C.push(c),
                          o.append(i.element))
                        : ((c = C[A]),
                          (i = c[0]),
                          i.label != e &&
                            i.element.attr('label', (i.label = e))),
                      j = null,
                      T = 0,
                      E = n.length;
                    E > T;
                    T++
                  )
                    (r = n[T]),
                      (u = c[T + 1])
                        ? ((j = u.element),
                          u.label !== r.label && j.text((u.label = r.label)),
                          u.id !== r.id && j.val((u.id = r.id)),
                          j[0].selected !== r.selected &&
                            j.prop('selected', (u.selected = r.selected)))
                        : ('' === r.id && b
                            ? (O = b)
                            : (O = x.clone())
                                .val(r.id)
                                .attr('selected', r.selected)
                                .text(r.label),
                          c.push(
                            (u = {
                              element: O,
                              label: r.label,
                              id: r.id,
                              selected: r.selected,
                            }),
                          ),
                          j ? j.after(O) : i.element.append(O),
                          (j = O));
                  for (T++; c.length > T; ) c.pop().element.remove();
                }
                for (; C.length > A; ) C.pop()[0].element.remove();
              }
              var u;
              if (!(u = w.match(i)))
                throw oo(
                  'iexp',
                  "Expected expression in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '{0}'. Element: {1}",
                  w,
                  B(o),
                );
              var l = r(u[2] || u[1]),
                f = u[4] || u[6],
                h = u[5],
                p = r(u[3] || ''),
                d = r(u[2] ? u[1] : f),
                $ = r(u[7]),
                v = u[8],
                g = v ? r(u[8]) : null,
                C = [[{element: o, label: ''}]];
              b && (e(b)(t), b.removeClass('ng-scope'), b.remove()),
                o.empty(),
                o.on('change', function() {
                  t.$apply(function() {
                    var e,
                      r,
                      i,
                      a,
                      c,
                      u,
                      l,
                      p,
                      v,
                      m = $(t) || [],
                      w = {};
                    if (y) {
                      for (i = [], u = 0, p = C.length; p > u; u++)
                        for (e = C[u], c = 1, l = e.length; l > c; c++)
                          if ((a = e[c].element)[0].selected) {
                            if (((r = a.val()), h && (w[h] = r), g))
                              for (
                                v = 0;
                                m.length > v && ((w[f] = m[v]), g(t, w) != r);
                                v++
                              );
                            else w[f] = m[r];
                            i.push(d(t, w));
                          }
                    } else if (((r = o.val()), '?' == r)) i = n;
                    else if ('' === r) i = null;
                    else if (g) {
                      for (v = 0; m.length > v; v++)
                        if (((w[f] = m[v]), g(t, w) == r)) {
                          i = d(t, w);
                          break;
                        }
                    } else (w[f] = m[r]), h && (w[h] = r), (i = d(t, w));
                    s.$setViewValue(i);
                  });
                }),
                (s.$render = c),
                t.$watch(c);
            }
            if (l[1]) {
              for (
                var d,
                  $ = l[0],
                  v = l[1],
                  y = u.multiple,
                  w = u.ngOptions,
                  b = !1,
                  x = fr(t.createElement('option')),
                  S = fr(t.createElement('optgroup')),
                  C = x.clone(),
                  E = 0,
                  A = c.children(),
                  T = A.length;
                T > E;
                E++
              )
                if ('' === A[E].value) {
                  d = b = A.eq(E);
                  break;
                }
              $.init(v, b, C),
                y &&
                  (v.$isEmpty = function(e) {
                    return !e || 0 === e.length;
                  }),
                w ? p(s, c, v) : y ? h(s, c, v) : f(s, c, v, $);
            }
          },
        };
      },
    ],
    co = [
      '$interpolate',
      function(e) {
        var t = {addOption: d, removeOption: d};
        return {
          restrict: 'E',
          priority: 100,
          compile: function(n, r) {
            if (g(r.value)) {
              var i = e(n.text(), !0);
              i || r.$set('value', n.text());
            }
            return function(e, n, r) {
              var o = '$selectController',
                a = n.parent(),
                s = a.data(o) || a.parent().data(o);
              s && s.databound ? n.prop('selected', !1) : (s = t),
                i
                  ? e.$watch(i, function(e, t) {
                      r.$set('value', e),
                        e !== t && s.removeOption(t),
                        s.addOption(e);
                    })
                  : s.addOption(r.value),
                n.on('$destroy', function() {
                  s.removeOption(r.value);
                });
            };
          },
        };
      },
    ],
    uo = v({restrict: 'E', terminal: !0});
  et(),
    st(yr),
    fr(t).ready(function() {
      Z(t, K);
    });
})(window, document),
  !angular.$$csp() &&
    angular
      .element(document)
      .find('head')
      .prepend(
        '<style type="text/css">@charset "UTF-8";[ng\\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide{display:none !important;}ng\\:form{display:block;}</style>',
      ),
  (function(e, t) {
    function n() {
      function e(e, n) {
        return t.extend(new (t.extend(function() {}, {prototype: e}))(), n);
      }
      function n(e, t) {
        var n = t.caseInsensitiveMatch,
          r = {originalPath: e, regexp: e},
          i = (r.keys = []);
        return (
          (e = e
            .replace(/([().])/g, '\\$1')
            .replace(/(\/)?:(\w+)([\?\*])?/g, function(e, t, n, r) {
              var o = '?' === r ? r : null,
                a = '*' === r ? r : null;
              return (
                i.push({name: n, optional: !!o}),
                (t = t || ''),
                '' +
                  (o ? '' : t) +
                  '(?:' +
                  (o ? t : '') +
                  ((a && '(.+?)') || '([^/]+)') +
                  (o || '') +
                  ')' +
                  (o || '')
              );
            })
            .replace(/([\/$\*])/g, '\\$1')),
          (r.regexp = RegExp('^' + e + '$', n ? 'i' : '')),
          r
        );
      }
      var r = {};
      (this.when = function(e, i) {
        if (((r[e] = t.extend({reloadOnSearch: !0}, i, e && n(e, i))), e)) {
          var o = '/' == e[e.length - 1] ? e.substr(0, e.length - 1) : e + '/';
          r[o] = t.extend({redirectTo: e}, n(o, i));
        }
        return this;
      }),
        (this.otherwise = function(e) {
          return this.when(null, e), this;
        }),
        (this.$get = [
          '$rootScope',
          '$location',
          '$routeParams',
          '$q',
          '$injector',
          '$http',
          '$templateCache',
          '$sce',
          function(n, i, o, a, s, c, u, l) {
            function f(e, t) {
              var n = t.keys,
                r = {};
              if (!t.regexp) return null;
              var i = t.regexp.exec(e);
              if (!i) return null;
              for (var o = 1, a = i.length; a > o; ++o) {
                var s = n[o - 1],
                  c = 'string' == typeof i[o] ? decodeURIComponent(i[o]) : i[o];
                s && c && (r[s.name] = c);
              }
              return r;
            }
            function h() {
              var e = p(),
                r = v.current;
              e &&
              r &&
              e.$$route === r.$$route &&
              t.equals(e.pathParams, r.pathParams) &&
              !e.reloadOnSearch &&
              !$
                ? ((r.params = e.params),
                  t.copy(r.params, o),
                  n.$broadcast('$routeUpdate', r))
                : (e || r) &&
                  (($ = !1),
                  n.$broadcast('$routeChangeStart', e, r),
                  (v.current = e),
                  e &&
                    e.redirectTo &&
                    (t.isString(e.redirectTo)
                      ? i
                          .path(d(e.redirectTo, e.params))
                          .search(e.params)
                          .replace()
                      : i
                          .url(e.redirectTo(e.pathParams, i.path(), i.search()))
                          .replace()),
                  a
                    .when(e)
                    .then(function() {
                      if (e) {
                        var n,
                          r,
                          i = t.extend({}, e.resolve);
                        return (
                          t.forEach(i, function(e, n) {
                            i[n] = t.isString(e) ? s.get(e) : s.invoke(e);
                          }),
                          t.isDefined((n = e.template))
                            ? t.isFunction(n) && (n = n(e.params))
                            : t.isDefined((r = e.templateUrl)) &&
                              (t.isFunction(r) && (r = r(e.params)),
                              (r = l.getTrustedResourceUrl(r)),
                              t.isDefined(r) &&
                                ((e.loadedTemplateUrl = r),
                                (n = c.get(r, {cache: u}).then(function(e) {
                                  return e.data;
                                })))),
                          t.isDefined(n) && (i.$template = n),
                          a.all(i)
                        );
                      }
                    })
                    .then(
                      function(i) {
                        e == v.current &&
                          (e && ((e.locals = i), t.copy(e.params, o)),
                          n.$broadcast('$routeChangeSuccess', e, r));
                      },
                      function(t) {
                        e == v.current &&
                          n.$broadcast('$routeChangeError', e, r, t);
                      },
                    ));
            }
            function p() {
              var n, o;
              return (
                t.forEach(r, function(r) {
                  !o &&
                    (n = f(i.path(), r)) &&
                    ((o = e(r, {
                      params: t.extend({}, i.search(), n),
                      pathParams: n,
                    })),
                    (o.$$route = r));
                }),
                o || (r[null] && e(r[null], {params: {}, pathParams: {}}))
              );
            }
            function d(e, n) {
              var r = [];
              return (
                t.forEach((e || '').split(':'), function(e, t) {
                  if (0 === t) r.push(e);
                  else {
                    var i = e.match(/(\w+)(.*)/),
                      o = i[1];
                    r.push(n[o]), r.push(i[2] || ''), delete n[o];
                  }
                }),
                r.join('')
              );
            }
            var $ = !1,
              v = {
                routes: r,
                reload: function() {
                  ($ = !0), n.$evalAsync(h);
                },
              };
            return n.$on('$locationChangeSuccess', h), v;
          },
        ]);
    }
    function r() {
      this.$get = function() {
        return {};
      };
    }
    function i(e, n, r) {
      return {
        restrict: 'ECA',
        terminal: !0,
        priority: 400,
        transclude: 'element',
        link: function(i, o, a, s, c) {
          function u() {
            f && (f.$destroy(), (f = null)), h && (r.leave(h), (h = null));
          }
          function l() {
            var a = e.current && e.current.locals,
              s = a && a.$template;
            if (t.isDefined(s)) {
              var l = i.$new(),
                $ = e.current,
                v = c(l, function(e) {
                  r.enter(e, null, h || o, function() {
                    !t.isDefined(p) || (p && !i.$eval(p)) || n();
                  }),
                    u();
                });
              (h = v),
                (f = $.scope = l),
                f.$emit('$viewContentLoaded'),
                f.$eval(d);
            } else u();
          }
          var f,
            h,
            p = a.autoscroll,
            d = a.onload || '';
          i.$on('$routeChangeSuccess', l), l();
        },
      };
    }
    function o(e, t, n) {
      return {
        restrict: 'ECA',
        priority: -400,
        link: function(r, i) {
          var o = n.current,
            a = o.locals;
          i.html(a.$template);
          var s = e(i.contents());
          if (o.controller) {
            a.$scope = r;
            var c = t(o.controller, a);
            o.controllerAs && (r[o.controllerAs] = c),
              i.data('$ngControllerController', c),
              i.children().data('$ngControllerController', c);
          }
          s(r);
        },
      };
    }
    var a = t.module('ngRoute', ['ng']).provider('$route', n);
    a.provider('$routeParams', r),
      a.directive('ngView', i),
      a.directive('ngView', o),
      (i.$inject = ['$route', '$anchorScroll', '$animate']),
      (o.$inject = ['$compile', '$controller', '$route']);
  })(window, window.angular),
  angular.module('fdApp', ['ngRoute']).config([
    '$routeProvider',
    '$locationProvider',
    function(e, t) {
      e
        .when('/', {templateUrl: 'views/main.html'})
        .when('/editor', {templateUrl: 'views/editor.html'})
        .when('/gallery', {
          templateUrl: 'views/gallery.html',
          controller: 'GalleryCtrl',
        })
        .otherwise({redirectTo: '/'}),
        t.html5Mode(!0);
    },
  ]),
  angular.module('fdApp').controller('AppCtrl', [
    '$scope',
    '$location',
    '$filter',
    'Font',
    function(e, t, n, r) {
      (e.routeIs = function(e) {
        return t.path() === e;
      }),
        (e.fonts = [
          {
            name: 'VomZom',
            size: '15kb',
            author: 'D.Rock',
            authorurl: 'http://defaulterror.com/typo.htm',
            license: 'Free for personal and commercial use.',
            licenseurl:
              'http://defaulterror.com/typo.htm#Font%20License%20Information',
            active: !0,
          },
        ]),
        (e.font = r),
        (e.handleDrop = function(t) {
          var n = t.getData('text/plain'),
            r = t.files || !1,
            i = r || n,
            o = r && r.length;
          e.$emit('addFont', i, o);
        }),
        (e.year = new Date().getFullYear()),
        (e.addFont = function(t, r, i) {
          var o,
            a = n('file'),
            s = n('jsonfile'),
            c = n('fontfacecss');
          (o = i ? a(r) : s(r)),
            (e.fonts = e.fonts.concat(o)),
            e.$emit('injectfontface', c(o));
        }),
        e.$on('addFont', e.addFont);
    },
  ]),
  angular.module('fdApp').controller('GalleryCtrl', [
    '$scope',
    '$http',
    function(e, t) {
      t.get('/gallery/gallery.json').success(function(t) {
        e.gallery = t;
      }),
        (e.loadFont = function(n) {
          t.get(n + '/index.json').success(function(t) {
            e.$emit('addFont', t);
          });
        });
    },
  ]),
  angular.module('fdApp').directive('fdDnd', function() {
    return {
      restrict: 'A',
      link: function(e, t, n) {
        t.bind('drop', function(t) {
          t.preventDefault(),
            e.$apply(function(e) {
              e[n.fdDnd](t.dataTransfer);
            });
        }),
          t.bind('dragenter', function(e) {
            e.preventDefault();
          }),
          t.bind('dragover', function(e) {
            e.preventDefault();
          });
      },
    };
  }),
  angular.module('fdApp').directive('fdFontList', [
    'Font',
    function(e) {
      var t = [
        '<ul id="fonts" class="fonts">',
        '<li ng-repeat="font in fonts" fd-tap="updateFont()" ng-class="{active: font.active}">',
        '<div tabindex="0" ng-style="{ \'font-family\': font.name }">',
        '<span>{{font.name}}</span>',
        '<div tabindex="0" class="info01">',
        '<ul>',
        '<li class="title">',
        '<strong ng-style="{ \'font-family\': font.name }">{{font.name}}</strong>',
        '</li>',
        '<li>',
        '<strong>Size</strong> {{font.size}}',
        '</li>',
        '<li>',
        '<strong>Author</strong> <a href="{{font.authorurl}}">{{font.author}}</a>',
        '</li>',
        '<li>',
        '<strong>License</strong> <a href="{{font.licenseurl}}">{{font.license}}</a>',
        '</li>',
        '</ul>',
        '</div>',
        '</div>',
        '</li>',
        '</ul>',
      ].join('');
      return {
        restrict: 'A',
        replace: !0,
        template: t,
        link: function(t) {
          t.updateFont = function() {
            angular.forEach(t.fonts, function(e) {
              e.active = !1;
            }),
              (this.font.active = !0),
              (e.activeFont = this.font.name);
          };
        },
      };
    },
  ]),
  angular.module('fdApp').directive('fdTap', function() {
    return {
      restrict: 'A',
      link: function(e, t, n) {
        if ('ontouchstart' in window) {
          var r = !1;
          t.bind('touchstart', function() {
            r = !0;
          }),
            t.bind('touchmove', function() {
              r = !1;
            }),
            t.bind('touchcancel', function() {
              r = !1;
            }),
            t.bind('touchend', function() {
              r && e.$apply(n.fdTap, t);
            });
        } else
          t.bind('click', function() {
            e.$apply(n.fdTap, t);
          });
      },
    };
  }),
  angular.module('fdApp').directive('fdVideo', function() {
    return {
      template: '<iframe frameborder="0"></iframe>',
      restrict: 'A',
      replace: !0,
      scope: {src: '@', width: '@', height: '@'},
    };
  }),
  angular.module('fdApp').directive('link', function() {
    return {
      restrict: 'E',
      link: function(e, t) {
        var n = t[0].sheet;
        e.$on('injectfontface', function(e, t) {
          angular.forEach(t, function(e) {
            n.insertRule(e, 0);
          });
        });
      },
    };
  }),
  angular.module('fdApp').filter('file', function() {
    return function(e) {
      var t,
        n,
        r,
        i,
        o = [],
        a = /\.(ttf|otf|woff)$/i,
        s = window.URL || window.webkitURL || {};
      return (
        angular.forEach(e, function(e) {
          (t = e.name),
            t.match(a)
              ? ((n = t.replace(/\.\w+$/, '')),
                (n = n.replace(/\W+/g, '-')),
                (r = Math.round(e.size / 1024) + 'kb'),
                (i = s.createObjectURL(e)),
                o.push({
                  result: i,
                  name: n,
                  size: r,
                  author: '',
                  authorurl: '',
                  license: '',
                  licenseurl: '',
                }))
              : alert(
                  'Invalid file extension. Will only accept ttf, otf or woff font files',
                );
        }),
        o
      );
    };
  }),
  angular.module('fdApp').filter('fontfacecss', function() {
    return function(e) {
      var t = [];
      return (
        angular.forEach(e, function(e) {
          t.push(
            [
              '@font-face{font-family: ',
              e.name,
              '; src:url(',
              e.result,
              ');}',
            ].join(''),
          );
        }),
        t
      );
    };
  }),
  angular.module('fdApp').filter('jsonfile', function() {
    return function(e) {
      if (!e.error) {
        var t = [],
          n = e.fontName.split('/').reverse()[0];
        return (
          (n = n.replace(/\.\w+$/, '')),
          (e.fontSize = Math.round(e.fontSize / 1024) + 'kb'),
          (e.fontDataURL =
            'data:application/octet-stream;base64,' + e.fontDataURL),
          t.push({
            name: n,
            size: e.fontSize,
            license: e.fontLicense,
            licenseurl: e.fontLicenseUrl,
            author: e.fontAuthor,
            authorurl: e.fontAuthorUrl,
            result: e.fontDataURL,
          }),
          t
        );
      }
      alert(e.error);
    };
  }),
  angular.module('fdApp').factory('Font', function() {
    return {activeFont: 'VomZom'};
  }),
  angular.module('fdApp').run([
    '$templateCache',
    function(e) {
      e.put(
        'views/editor.html',
        '<section id="banner" role="banner" class="clearfix"><div class="container grid"><h1 id="fontname" ng-style="{ \'font-family\': font.activeFont }" class="colx8">{{font.activeFont}}</h1><aside role="complementary" class="colx4"><div fd-font-list=""></div></aside></div></section><div id="wfs" contenteditable="true" ng-style="{ \'font-family\': font.activeFont }" class="grid"><section role="region" class="colx6"><h2>Text sample <span>&#8211; CSS font-size (px) with 1.4em line-height</span></h2><p class="s s18"><span>18</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221;&hellip;</p><p class="s s14"><span>14</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221; and the progressive tendencies of&hellip;</p><p class="s s12"><span>12</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221; and the progressive tendencies of an able mind. For, let a man be as able &amp; original&hellip;</p><p class="s s11"><span>11</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221; and the progressive tendencies of an able mind. For, let a man be as able &amp; original as he may&hellip;</p><p class="s s10"><span>10</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221; and the progressive tendencies of an able mind. For, let a man be as able &amp; original as he may, he can&#8217;t afford to discard knowledge of what&hellip;</p><p class="s s9"><span>9</span>Is not the best kind of originality that which comes after a sound apprenticeship? That which shall prove to be the blending of a firm conception of, &#8220;useful precedent&#8221; and the progressive tendencies of an able mind. For, let a man be as able &amp; original as he may, he can&#8217;t afford to discard knowledge of what has gone before or what is now going&hellip;</p></section><section role="region" class="colx6 charset"><h2>Characters</h2><p class="s s56">A&#8201;B&#8201;C&#8201;D&#8201;E&#8201;F&#8201;G&#8201;H&#8201;I&#8201;J&#8201;K&#8201;L&#8201;M&#8201;N&#8201;O&#8201;P&#8201;Q&#8201;R&#8201;S&#8201;T&#8201;U&#8201;V&#8201;W&#8201;X&#8201;Y&#8201;Z<br/>a&#8201;b&#8201;c&#8201;d&#8201;e&#8201;f&#8201;g&#8201;h&#8201;i&#8201;j&#8201;k&#8201;l&#8201;m&#8201;n&#8201;o&#8201;p&#8201;q&#8201;r&#8201;s&#8201;t&#8201;u&#8201;v&#8201;w&#8201;x&#8201;y&#8201;z<br/>1&#8201;2&#8201;3&#8201;4&#8201;5&#8201;6&#8201;7&#8201;8&#8201;9&#8201;0&#8201;&amp;&#8201;@&#8201;.&#8201;,&#8201;?&#8201;!&#8201;&#8217;&#8201;&#8220;&#8201;&#8221;&#8201;(&#8201;)</p></section><section class="colx12"><h2>Body size comparison</h2><div class="bodysize"><table><tr><th class="fontname">Font name</th><th>Arial<a href="http://www.codestyle.org/servlets/FontStack?stack=Arial,Helvetica&amp;generic=sans-serif">stack</a></th><th>Times<a href="http://www.codestyle.org/servlets/FontStack?stack=Times+New+Roman,Times&amp;generic=serif">stack</a></th><th>Georgia<a href="http://www.codestyle.org/servlets/FontStack?stack=Georgia,New+Century+Schoolbook,Nimbus+Roman+No9+L&amp;generic=serif">stack</a></th></tr><tr><td><span>Body</span></td><td class="tf typeface2"><span>Body</span></td><td class="tf typeface3"><span>Body</span></td><td class="tf typeface4"><span>Body</span></td></tr></table></div></section><section class="colx12"><h2>Grayscale<span>&#8211; CSS hex color</span></h2><div class="grayscale clearfix"><div class="colx6 white alpha"><p class="c000"><span>#000</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c333"><span>#333</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c666"><span>#666</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c999"><span>#999</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="cCCC"><span>#CCC</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p></div><div class="colx6 black omega"><p class="cFFF"><span>#FFF</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="cCCC"><span>#CCC</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c999"><span>#999</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c666"><span>#666</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p><p class="c333"><span>#333</span>The best kind of originality is that which comes after a sound apprenticeship, that which shall prove to be the blending of a firm conception of useful precedent and the progressive tendencies of an able mind. For, let a man be as able and original as he may, he cannot afford to</p></div></div></section><section class="ulc clearfix"><section class="colx12"><h2>Size<span>&#8211; CSS font-size (px)</span></h2><p class="s s36"><span>36</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s30"><span>30</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s24"><span>24</span><span class="text">Pack my box with five dozen liquor jugs.</span></p></section><section class="colx8"><p class="s s21"><span>21</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s18"><span>18</span><span class="text">Pack my box with five dozen liquor jugs.</span></p></section><section class="colx4 upp"><p class="s s9"><span>9</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s10"><span>10</span><span class="text">Pack my box with five dozen liquor jugs</span></p></section><div class="clearfix"></div><section class="colx6"><p class="s s16"><span>16</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s14"><span>14</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s13"><span>13</span><span class="text">Pack my box with five dozen liquor jugs.</span></p></section><section class="colx6 upp"><p class="s s11"><span>11</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s12"><span>12</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s13"><span>13</span><span class="text">Pack my box with five dozen liquor jugs</span></p></section><div class="clearfix"></div><section class="colx4"><p class="s s12"><span>12</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s11"><span>11</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s10"><span>10</span><span class="text">Pack my box with five dozen liquor jugs.</span></p><p class="s s9"><span>9</span><span class="text">Pack my box with five dozen liquor jugs.</span></p></section><section class="colx8 upp"><p class="s s14"><span>14</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s16"><span>16</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s18"><span>18</span><span class="text">Pack my box with five dozen liquor jugs</span></p></section><div class="clearfix"></div><section class="colx12 upp"><p class="s s21"><span>21</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s24"><span>24</span><span class="text">Pack my box with five dozen liquor jugs</span></p><p class="s s30"><span>30</span><span class="text">Pack my box with five dozen liquor jugs</span></p></section></section></div>',
      ),
        e.put(
          'views/gallery.html',
          '<section id="banner" role="banner" class="clearfix"><div class="container grid"><h1 id="fontname" ng-style="{ \'font-family\': font.activeFont }" class="colx8">{{font.activeFont}}</h1><aside role="complementary" class="colx4"><div fd-font-list=""></div></aside></div></section><div class="content grid gallery clearfix"><div ng-repeat="font in gallery" class="colx4 item"><h2>{{ font.name }}<div tabindex="0" class="info01"><ul><li class="title"><strong>{{ font.name }}</strong></li><li><strong>Size: </strong>{{ font.size }}</li><li><strong>Author:</strong><a ng-href="{{ font.authorurl }}">{{ font.author }}</a></li><li><strong>License:</strong><a ng-href="{{ font.licenseurl }}">{{ font.license }}</a></li></ul></div></h2><p ng-style="{\'font-family\': font.name + \'-subset\'}" class="preview">AaBbCcDd</p><a id="{{font.name}}" draggable="true" fd-tap="loadFont(\'gallery/{{font.name}}\')" class="button"> \nLoad {{ font.name }}</a></div></div>',
        ),
        e.put(
          'views/main.html',
          '<section id="banner" role="banner" class="clearfix"><div class="container grid"><h1 class="colx8">A revolutionary way to test custom fonts in the browser. No coding, no uploading, just drag and drop.</h1><aside role="complementary" class="colx4"><div fd-video="" src="http://www.screenr.com/embed/D8hs" height="200" width="300"></div></aside></div></section><div class="content grid clearfix"><section role="region" class="colx4"><h1>Drag your fonts here</h1><div fd-font-list=""></div></section><section id="custom" role="main" class="colx8"><div class="colx4 alpha"><h1>What is it?</h1><p>font dragr allows you to easily test custom fonts, through the <code>@font-face</code> at-rule, without the need for any CSS coding or knowledge of CSS coding. All you need to do is drag and drop.</p><p>It alleviates the cumbersome nature of testing custom fonts and allows you to quickly and easily load in a font, play around with it and see if it\'s the right one for you.</p></div><div class="colx4 omega"><h1>How do I use it?</h1><p>It\'s incredibly easy to use. All you need to do is drag and drop a font file from your computer into font dragr in a supporting browser (Such as Firefox 3.6+ or Chrome 6+).</p><p>You can also select a font to test from the gallery. These fonts can be tested in most browsers, including IE6 and up.</p></div></section><section class="colx12"><h1 class="hr01"><span>The revolution doesn\'t end there</span></h1><div class="colx8 alpha"><h1>You can test on any website</h1><p>Testing fonts within font dragr, while useful, won\'t give the full look and feel of testing it on your own site. That\'s where the font dragr bookmarklet comes in handy.</p><p>The bookmarklet allows you to test any font from your file system or any of the fonts found in the gallery. Same simple approach the web app has, with the added ability for testing on any website.</p><p>To install the bookmarklet in your browser just drag and drop the button below to your bookmarks. If you\'re not sure where to drag it too or you want to get a quick inside look at how you can use it make sure to check out the bookmarklet screencast.</p><p> \nDrag the <a href="javascript:(function(d){var%20s=d.createElement(\'script\'),h=d.head||d.getElementsByTagName(\'head\')[0];s.src=(\'https:\' == document.location.protocol ? \'https://rawgithub.com/ryanseddon/font-dragr/master/bookmarklet/fd-script.js\' : \'https://fontdragr.js.org/bookmarklet/fd-script.js\');h.appendChild(s);})(document);" class="button vomzom">font dragr</a> bookmarklet to your bookmarks.</p></div><div class="colx4 omega"><h1>Bookmarklet in action</h1><div fd-video="" src="http://www.screenr.com/embed/P8hs" height="200" width="300"></div></div></section><section class="colx12"><h1 class="hr01"><span>The bookmarklet in three simple steps</span></h1><div class="colx4 alpha"><h1>Load it</h1><p><img src="/images/gr_load.png"/></p><p>Load the font dragr bookmarklet in the website you wish to test. Once it loads it will appear at the top of the browser window ready to use.</p></div><div class="colx4"><h1>Drag it</h1><p><img src="/images/gr_drag.png"/></p><p>Drag and drop a font from your desktop or from the gallery. The last dropped font will become active and be applied to the body element by default.</p></div><div class="colx4 omega"><h1>Test it</h1><p><img src="/images/gr_test.png"/></p><p>With the bookmarklet you can target specific elements using CSS selectors. Or by selecting some text you can apply the custom font to a selection.</p></div></section></div>',
        );
    },
  ]);
//# sourceMappingURL=scripts.js.map
