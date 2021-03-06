!
function e(t, n, r) {
    function i(a, o) {
        if (!n[a]) {
            if (!t[a]) {
                var u = "function" == typeof require && require;
                if (!o && u) return u(a, !0);
                if (s) return s(a, !0);
                var c = new Error("Cannot find module '" + a + "'");
                throw c.code = "MODULE_NOT_FOUND",
                c
            }
            var l = n[a] = {
                exports: {}
            };
            t[a][0].call(l.exports,
            function(e) {
                var n = t[a][1][e];
                return i(n ? n: e)
            },
            l, l.exports, e, t, n, r)
        }
        return n[a].exports
    }
    for (var s = "function" == typeof require && require,
    a = 0; a < r.length; a++) i(r[a]);
    return i
} ({
    1 : [function(e, t, n) {
        var r = t.exports = {};
        r._ = e("underscore"),
        r.VERSION = e("./version"),
        r.Promise = e("./promise"),
        r.XMLHttpRequest = e("xmlhttprequest").XMLHttpRequest,
        r.localStorage = e("localStorage"),
        e("./utils")(r),
        e("./error")(r),
        e("./event")(r),
        e("./geopoint")(r),
        e("./acl")(r),
        e("./op")(r),
        e("./relation")(r),
        e("./file")(r),
        e("./object")(r),
        e("./role")(r),
        e("./collection")(r),
        e("./view")(r),
        e("./user")(r),
        e("./query")(r),
        e("./facebook")(r),
        e("./history")(r),
        e("./router")(r),
        e("./cloudfunction")(r),
        e("./push")(r),
        e("./status")(r),
        e("./search")(r),
        e("./insight")(r),
        e("./bigquery")(r),
        r.AV = r
    },
    {
        "./acl": 2,
        "./bigquery": 4,
        "./cloudfunction": 9,
        "./collection": 10,
        "./error": 11,
        "./event": 12,
        "./facebook": 13,
        "./file": 14,
        "./geopoint": 15,
        "./history": 16,
        "./insight": 17,
        "./object": 18,
        "./op": 19,
        "./promise": 20,
        "./push": 21,
        "./query": 22,
        "./relation": 23,
        "./role": 24,
        "./router": 25,
        "./search": 26,
        "./status": 27,
        "./user": 28,
        "./utils": 29,
        "./version": 30,
        "./view": 31,
        localStorage: 5,
        underscore: 35,
        xmlhttprequest: 8
    }],
    2 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            var t = "*";
            e.ACL = function(t) {
                var n = this;
                if (n.permissionsById = {},
                r.isObject(t)) if (t instanceof e.User) n.setReadAccess(t, !0),
                n.setWriteAccess(t, !0);
                else {
                    if (r.isFunction(t)) throw "AV.ACL() called with a function.  Did you forget ()?";
                    e._objectEach(t,
                    function(t, i) {
                        if (!r.isString(i)) throw "Tried to create an ACL with an invalid userId.";
                        n.permissionsById[i] = {},
                        e._objectEach(t,
                        function(e, t) {
                            if ("read" !== t && "write" !== t) throw "Tried to create an ACL with an invalid permission type.";
                            if (!r.isBoolean(e)) throw "Tried to create an ACL with an invalid permission value.";
                            n.permissionsById[i][t] = e
                        })
                    })
                }
            },
            e.ACL.prototype.toJSON = function() {
                return r.clone(this.permissionsById)
            },
            e.ACL.prototype._setAccess = function(t, n, i) {
                if (n instanceof e.User ? n = n.id: n instanceof e.Role && (n = "role:" + n.getName()), !r.isString(n)) throw "userId must be a string.";
                if (!r.isBoolean(i)) throw "allowed must be either true or false.";
                var s = this.permissionsById[n];
                if (!s) {
                    if (!i) return;
                    s = {},
                    this.permissionsById[n] = s
                }
                i ? this.permissionsById[n][t] = !0 : (delete s[t], r.isEmpty(s) && delete s[n])
            },
            e.ACL.prototype._getAccess = function(t, n) {
                n instanceof e.User ? n = n.id: n instanceof e.Role && (n = "role:" + n.getName());
                var r = this.permissionsById[n];
                return r && r[t] ? !0 : !1
            },
            e.ACL.prototype.setReadAccess = function(e, t) {
                this._setAccess("read", e, t)
            },
            e.ACL.prototype.getReadAccess = function(e) {
                return this._getAccess("read", e)
            },
            e.ACL.prototype.setWriteAccess = function(e, t) {
                this._setAccess("write", e, t)
            },
            e.ACL.prototype.getWriteAccess = function(e) {
                return this._getAccess("write", e)
            },
            e.ACL.prototype.setPublicReadAccess = function(e) {
                this.setReadAccess(t, e)
            },
            e.ACL.prototype.getPublicReadAccess = function() {
                return this.getReadAccess(t)
            },
            e.ACL.prototype.setPublicWriteAccess = function(e) {
                this.setWriteAccess(t, e)
            },
            e.ACL.prototype.getPublicWriteAccess = function() {
                return this.getWriteAccess(t)
            },
            e.ACL.prototype.getRoleReadAccess = function(t) {
                if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return this.getReadAccess("role:" + t);
                throw "role must be a AV.Role or a String"
            },
            e.ACL.prototype.getRoleWriteAccess = function(t) {
                if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return this.getWriteAccess("role:" + t);
                throw "role must be a AV.Role or a String"
            },
            e.ACL.prototype.setRoleReadAccess = function(t, n) {
                if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return void this.setReadAccess("role:" + t, n);
                throw "role must be a AV.Role or a String"
            },
            e.ACL.prototype.setRoleWriteAccess = function(t, n) {
                if (t instanceof e.Role && (t = t.getName()), r.isString(t)) return void this.setWriteAccess("role:" + t, n);
                throw "role must be a AV.Role or a String"
            }
        }
    },
    {
        underscore: 35
    }],
    3 : [function(e, t, n) { (function(t) {
            "use strict";
            var n = e("./AV");
            t.AV = n
        }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
    },
    {
        "./AV": 1
    }],
    4 : [function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            Object.defineProperty(e, "BigQuery", {
                get: function() {
                    return console.warn("AV.BigQuery is deprecated, please use AV.Insight instead."),
                    e.Insight
                }
            })
        }
    },
    {}],
    5 : [function(e, t, n) { (function(n) {
            "use strict";
            var r = n.localStorage;
            try {
                var i = "__storejs__";
                if (r.setItem(i, i), r.getItem(i) != i) throw new Error;
                r.removeItem(i)
            } catch(s) {
                r = e("localstorage-memory")
            }
            t.exports = r
        }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
    },
    {
        "localstorage-memory": 32
    }],
    6 : [function(e, t, n) {
        "use strict";
        var r = function(e, t) {
            var n;
            n = e.indexOf("base64") < 0 ? atob(e) : e.split(",")[0].indexOf("base64") >= 0 ? atob(e.split(",")[1]) : unescape(e.split(",")[1]);
            for (var r = t || e.split(",")[0].split(":")[1].split(";")[0], i = new Uint8Array(n.length), s = 0; s < n.length; s++) i[s] = n.charCodeAt(s);
            return new Blob([i], {
                type: r
            })
        };
        t.exports = r
    },
    {}],
    7 : [function(e, t, n) {
        "use strict";
        t.exports = function(e, t, n) {
            var r, i = e;
            i._previousSave = i._source.then(function(e, t) {
                return r = e,
                i._qiniuToken(t)
            }).then(function(e) {
                i._url = e.url,
                i._bucket = e.bucket,
                i.id = e.objectId;
                var s = e.token,
                a = new FormData;
                a.append("file", r, i._name),
                a.append("key", i._qiniu_key),
                a.append("token", s);
                var o = new t.Promise,
                u = !1,
                c = new t.XMLHttpRequest;
                return c.upload.addEventListener("progress",
                function(e) {
                    e.lengthComputable && n.onProgress && n.onProgress(e)
                },
                !1),
                c.onreadystatechange = function() {
                    if (4 === c.readyState) {
                        if (u) return;
                        if (u = !0, delete i._qiniu_key, c.status >= 200 && c.status < 300) {
                            var e;
                            try {
                                e = JSON.parse(c.responseText)
                            } catch(t) {
                                o.reject(t),
                                i.destroy()
                            }
                            e ? o.resolve(i) : o.reject(e)
                        } else o.reject(c),
                        i.destroy()
                    }
                },
                c.open("POST", "http://upload.qiniu.com", !0),
                c.send(a),
                o
            })
        }
    },
    {}],
    8 : [function(e, t, n) { (function(e) {
            "use strict";
            n.XMLHttpRequest = e.XMLHttpRequest
        }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
    },
    {}],
    9 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Cloud = e.Cloud || {},
            r.extend(e.Cloud, {
                run: function(t, n, r) {
                    var i = e._request("functions", t, null, "POST", e._encode(n, null, !0));
                    return i.then(function(t) {
                        return e._decode(null, t).result
                    })._thenRunCallbacks(r)
                },
                getServerDate: function(t) {
                    var n = e._request("date", null, null, "GET");
                    return n.then(function(t) {
                        return e._decode(null, t)
                    })._thenRunCallbacks(t)
                },
                requestSmsCode: function(t, n) {
                    if (r.isString(t) && (t = {
                        mobilePhoneNumber: t
                    }), !t.mobilePhoneNumber) throw "Missing mobilePhoneNumber.";
                    var i = e._request("requestSmsCode", null, null, "POST", t);
                    return i._thenRunCallbacks(n)
                },
                verifySmsCode: function(t, n, r) {
                    if (!t) throw "Missing sms code.";
                    var i = {};
                    e._.isString(n) ? i.mobilePhoneNumber = n: r = n;
                    var s = e._request("verifySmsCode", t, null, "POST", i);
                    return s._thenRunCallbacks(r)
                }
            })
        }
    },
    {
        underscore: 35
    }],
    10 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Collection = function(e, t) {
                console.warn("AV.Collection is deprecated, please don't use it anymore."),
                t = t || {},
                t.comparator && (this.comparator = t.comparator),
                t.model && (this.model = t.model),
                t.query && (this.query = t.query),
                this._reset(),
                this.initialize.apply(this, arguments),
                e && this.reset(e, {
                    silent: !0,
                    parse: t.parse
                })
            },
            r.extend(e.Collection.prototype, e.Events, {
                model: e.Object,
                initialize: function() {},
                toJSON: function() {
                    return this.map(function(e) {
                        return e.toJSON()
                    })
                },
                add: function(t, n) {
                    var i, s, a, o, u, c, l = {},
                    h = {};
                    for (n = n || {},
                    t = r.isArray(t) ? t.slice() : [t], i = 0, a = t.length; a > i; i++) {
                        if (t[i] = this._prepareModel(t[i], n), o = t[i], !o) throw new Error("Can't add an invalid model to a collection");
                        if (u = o.cid, l[u] || this._byCid[u]) throw new Error("Duplicate cid: can't add the same model to a collection twice");
                        if (c = o.id, !e._isNullOrUndefined(c) && (h[c] || this._byId[c])) throw new Error("Duplicate id: can't add the same model to a collection twice");
                        h[c] = o,
                        l[u] = o
                    }
                    for (i = 0; a > i; i++)(o = t[i]).on("all", this._onModelEvent, this),
                    this._byCid[o.cid] = o,
                    o.id && (this._byId[o.id] = o);
                    if (this.length += a, s = e._isNullOrUndefined(n.at) ? this.models.length: n.at, this.models.splice.apply(this.models, [s, 0].concat(t)), this.comparator && this.sort({
                        silent: !0
                    }), n.silent) return this;
                    for (i = 0, a = this.models.length; a > i; i++) o = this.models[i],
                    l[o.cid] && (n.index = i, o.trigger("add", o, this, n));
                    return this
                },
                remove: function(e, t) {
                    var n, i, s, a;
                    for (t = t || {},
                    e = r.isArray(e) ? e.slice() : [e], n = 0, i = e.length; i > n; n++) a = this.getByCid(e[n]) || this.get(e[n]),
                    a && (delete this._byId[a.id], delete this._byCid[a.cid], s = this.indexOf(a), this.models.splice(s, 1), this.length--, t.silent || (t.index = s, a.trigger("remove", a, this, t)), this._removeReference(a));
                    return this
                },
                get: function(e) {
                    return e && this._byId[e.id || e]
                },
                getByCid: function(e) {
                    return e && this._byCid[e.cid || e]
                },
                at: function(e) {
                    return this.models[e]
                },
                sort: function(e) {
                    if (e = e || {},
                    !this.comparator) throw new Error("Cannot sort a set without a comparator");
                    var t = r.bind(this.comparator, this);
                    return 1 === this.comparator.length ? this.models = this.sortBy(t) : this.models.sort(t),
                    e.silent || this.trigger("reset", this, e),
                    this
                },
                pluck: function(e) {
                    return r.map(this.models,
                    function(t) {
                        return t.get(e)
                    })
                },
                reset: function(t, n) {
                    var r = this;
                    return t = t || [],
                    n = n || {},
                    e._arrayEach(this.models,
                    function(e) {
                        r._removeReference(e)
                    }),
                    this._reset(),
                    this.add(t, {
                        silent: !0,
                        parse: n.parse
                    }),
                    n.silent || this.trigger("reset", this, n),
                    this
                },
                fetch: function(t) {
                    t = r.clone(t) || {},
                    void 0 === t.parse && (t.parse = !0);
                    var n = this,
                    i = this.query || new e.Query(this.model);
                    return i.find().then(function(e) {
                        return t.add ? n.add(e, t) : n.reset(e, t),
                        n
                    })._thenRunCallbacks(t, this)
                },
                create: function(e, t) {
                    var n = this;
                    if (t = t ? r.clone(t) : {},
                    e = this._prepareModel(e, t), !e) return ! 1;
                    t.wait || n.add(e, t);
                    var i = t.success;
                    return t.success = function(r, s, a) {
                        t.wait && n.add(r, t),
                        i ? i(r, s) : r.trigger("sync", e, s, t)
                    },
                    e.save(null, t),
                    e
                },
                parse: function(e, t) {
                    return e
                },
                chain: function() {
                    return r(this.models).chain()
                },
                _reset: function(e) {
                    this.length = 0,
                    this.models = [],
                    this._byId = {},
                    this._byCid = {}
                },
                _prepareModel: function(t, n) {
                    if (t instanceof e.Object) t.collection || (t.collection = this);
                    else {
                        var r = t;
                        n.collection = this,
                        t = new this.model(r, n),
                        t._validate(t.attributes, n) || (t = !1)
                    }
                    return t
                },
                _removeReference: function(e) {
                    this === e.collection && delete e.collection,
                    e.off("all", this._onModelEvent, this)
                },
                _onModelEvent: function(e, t, n, r) { ("add" !== e && "remove" !== e || n === this) && ("destroy" === e && this.remove(t, r), t && "change:objectId" === e && (delete this._byId[t.previous("objectId")], this._byId[t.id] = t), this.trigger.apply(this, arguments))
                }
            });
            var t = ["forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy"];
            e._arrayEach(t,
            function(t) {
                e.Collection.prototype[t] = function() {
                    return r[t].apply(r, [this.models].concat(r.toArray(arguments)))
                }
            }),
            e.Collection.extend = e._extend
        }
    },
    {
        underscore: 35
    }],
    11 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Error = function(e, t) {
                this.code = e,
                this.message = t
            },
            r.extend(e.Error, {
                OTHER_CAUSE: -1,
                INTERNAL_SERVER_ERROR: 1,
                CONNECTION_FAILED: 100,
                OBJECT_NOT_FOUND: 101,
                INVALID_QUERY: 102,
                INVALID_CLASS_NAME: 103,
                MISSING_OBJECT_ID: 104,
                INVALID_KEY_NAME: 105,
                INVALID_POINTER: 106,
                INVALID_JSON: 107,
                COMMAND_UNAVAILABLE: 108,
                NOT_INITIALIZED: 109,
                INCORRECT_TYPE: 111,
                INVALID_CHANNEL_NAME: 112,
                PUSH_MISCONFIGURED: 115,
                OBJECT_TOO_LARGE: 116,
                OPERATION_FORBIDDEN: 119,
                CACHE_MISS: 120,
                INVALID_NESTED_KEY: 121,
                INVALID_FILE_NAME: 122,
                INVALID_ACL: 123,
                TIMEOUT: 124,
                INVALID_EMAIL_ADDRESS: 125,
                MISSING_CONTENT_TYPE: 126,
                MISSING_CONTENT_LENGTH: 127,
                INVALID_CONTENT_LENGTH: 128,
                FILE_TOO_LARGE: 129,
                FILE_SAVE_ERROR: 130,
                FILE_DELETE_ERROR: 153,
                DUPLICATE_VALUE: 137,
                INVALID_ROLE_NAME: 139,
                EXCEEDED_QUOTA: 140,
                SCRIPT_FAILED: 141,
                VALIDATION_ERROR: 142,
                INVALID_IMAGE_DATA: 150,
                UNSAVED_FILE_ERROR: 151,
                INVALID_PUSH_TIME_ERROR: 152,
                USERNAME_MISSING: 200,
                PASSWORD_MISSING: 201,
                USERNAME_TAKEN: 202,
                EMAIL_TAKEN: 203,
                EMAIL_MISSING: 204,
                EMAIL_NOT_FOUND: 205,
                SESSION_MISSING: 206,
                MUST_CREATE_USER_THROUGH_SIGNUP: 207,
                ACCOUNT_ALREADY_LINKED: 208,
                LINKED_ID_MISSING: 250,
                INVALID_LINKED_SESSION: 251,
                UNSUPPORTED_SERVICE: 252,
                X_DOMAIN_REQUEST: 602
            })
        }
    },
    {
        underscore: 35
    }],
    12 : [function(e, t, n) {
        t.exports = function(e) {
            var t = /\s+/,
            n = Array.prototype.slice;
            e.Events = {
                on: function(e, n, r) {
                    var i, s, a, o, u;
                    if (!n) return this;
                    for (e = e.split(t), i = this._callbacks || (this._callbacks = {}), s = e.shift(); s;) u = i[s],
                    a = u ? u.tail: {},
                    a.next = o = {},
                    a.context = r,
                    a.callback = n,
                    i[s] = {
                        tail: o,
                        next: u ? u.next: a
                    },
                    s = e.shift();
                    return this
                },
                off: function(e, n, r) {
                    var i, s, a, o, u, c;
                    if (s = this._callbacks) {
                        if (! (e || n || r)) return delete this._callbacks,
                        this;
                        for (e = e ? e.split(t) : _.keys(s), i = e.shift(); i;) if (a = s[i], delete s[i], a && (n || r)) {
                            for (o = a.tail, a = a.next; a !== o;) u = a.callback,
                            c = a.context,
                            (n && u !== n || r && c !== r) && this.on(i, u, c),
                            a = a.next;
                            i = e.shift()
                        }
                        return this
                    }
                },
                trigger: function(e) {
                    var r, i, s, a, o, u, c;
                    if (! (s = this._callbacks)) return this;
                    for (u = s.all, e = e.split(t), c = n.call(arguments, 1), r = e.shift(); r;) {
                        if (i = s[r]) for (a = i.tail; (i = i.next) !== a;) i.callback.apply(i.context || this, c);
                        if (i = u) for (a = i.tail, o = [r].concat(c); (i = i.next) !== a;) i.callback.apply(i.context || this, o);
                        r = e.shift()
                    }
                    return this
                }
            },
            e.Events.bind = e.Events.on,
            e.Events.unbind = e.Events.off
        }
    },
    {}],
    13 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            var t, n, i = !1,
            s = {
                authenticate: function(e) {
                    var n = this;
                    FB.login(function(t) {
                        t.authResponse ? e.success && e.success(n, {
                            id: t.authResponse.userID,
                            access_token: t.authResponse.accessToken,
                            expiration_date: new Date(1e3 * t.authResponse.expiresIn + (new Date).getTime()).toJSON()
                        }) : e.error && e.error(n, t)
                    },
                    {
                        scope: t
                    })
                },
                restoreAuthentication: function(t) {
                    if (t) {
                        var i = {
                            userID: t.id,
                            accessToken: t.access_token,
                            expiresIn: (e._parseDate(t.expiration_date).getTime() - (new Date).getTime()) / 1e3
                        },
                        s = r.clone(n);
                        s.authResponse = i,
                        s.status = !1,
                        FB.init(s)
                    }
                    return ! 0
                },
                getAuthType: function() {
                    return "facebook"
                },
                deauthenticate: function() {
                    this.restoreAuthentication(null),
                    FB.logout()
                }
            };
            e.FacebookUtils = {
                init: function(t) {
                    if (console.warn("AV.FacebookUtils is deprecated, please don't use it anymore."), "undefined" == typeof FB) throw "The Facebook JavaScript SDK must be loaded before calling init.";
                    if (n = r.clone(t) || {},
                    n.status && "undefined" != typeof console) {
                        var a = console.warn || console.log ||
                        function() {};
                        a.call(console, "The 'status' flag passed into FB.init, when set to true, can interfere with AV Facebook integration, so it has been suppressed. Please call FB.getLoginStatus() explicitly if you require this behavior.")
                    }
                    n.status = !1,
                    FB.init(n),
                    e.User._registerAuthenticationProvider(s),
                    i = !0
                },
                isLinked: function(e) {
                    return e._isLinked("facebook")
                },
                logIn: function(n, s) {
                    if (!n || r.isString(n)) {
                        if (!i) throw "You must initialize FacebookUtils before calling logIn.";
                        return t = n,
                        e.User._logInWith("facebook", s)
                    }
                    var a = r.clone(s) || {};
                    return a.authData = n,
                    e.User._logInWith("facebook", a)
                },
                link: function(e, n, s) {
                    if (!n || r.isString(n)) {
                        if (!i) throw "You must initialize FacebookUtils before calling link.";
                        return t = n,
                        e._linkWith("facebook", s)
                    }
                    var a = r.clone(s) || {};
                    return a.authData = n,
                    e._linkWith("facebook", a)
                },
                unlink: function(e, t) {
                    if (!i) throw "You must initialize FacebookUtils before calling unlink.";
                    return e._unlinkFrom("facebook", t)
                }
            }
        }
    },
    {
        underscore: 35
    }],
    14 : [function(e, t, n) { (function(n) {
            "use strict";
            var r = e("path"),
            i = e("underscore");
            t.exports = function(t) {
                var s = function(e) {
                    if (26 > e) return String.fromCharCode(65 + e);
                    if (52 > e) return String.fromCharCode(97 + (e - 26));
                    if (62 > e) return String.fromCharCode(48 + (e - 52));
                    if (62 === e) return "+";
                    if (63 === e) return "/";
                    throw "Tried to encode large digit " + e + " in base64."
                },
                a = function(e) {
                    var t = [];
                    return t.length = Math.ceil(e.length / 3),
                    i.times(t.length,
                    function(n) {
                        var r = e[3 * n],
                        i = e[3 * n + 1] || 0,
                        a = e[3 * n + 2] || 0,
                        o = 3 * n + 1 < e.length,
                        u = 3 * n + 2 < e.length;
                        t[n] = [s(r >> 2 & 63), s(r << 4 & 48 | i >> 4 & 15), o ? s(i << 2 & 60 | a >> 6 & 3) : "=", u ? s(63 & a) : "="].join("")
                    }),
                    t.join("")
                },
                o = function(e) {
                    return e.split(",")[0] && e.split(",")[0].indexOf("base64") >= 0 && (e = e.split(",")[1]),
                    e
                },
                u = function() {
                    var e = t.serverURL.match(/\/\/(.*)/, "g")[1],
                    n = t._config.cnApiUrl.match(/\/\/(.*)/, "g")[1];
                    return e === n
                },
                c = {
                    ai: "application/postscript",
                    aif: "audio/x-aiff",
                    aifc: "audio/x-aiff",
                    aiff: "audio/x-aiff",
                    asc: "text/plain",
                    atom: "application/atom+xml",
                    au: "audio/basic",
                    avi: "video/x-msvideo",
                    bcpio: "application/x-bcpio",
                    bin: "application/octet-stream",
                    bmp: "image/bmp",
                    cdf: "application/x-netcdf",
                    cgm: "image/cgm",
                    "class": "application/octet-stream",
                    cpio: "application/x-cpio",
                    cpt: "application/mac-compactpro",
                    csh: "application/x-csh",
                    css: "text/css",
                    dcr: "application/x-director",
                    dif: "video/x-dv",
                    dir: "application/x-director",
                    djv: "image/vnd.djvu",
                    djvu: "image/vnd.djvu",
                    dll: "application/octet-stream",
                    dmg: "application/octet-stream",
                    dms: "application/octet-stream",
                    doc: "application/msword",
                    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
                    dotx: "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
                    docm: "application/vnd.ms-word.document.macroEnabled.12",
                    dotm: "application/vnd.ms-word.template.macroEnabled.12",
                    dtd: "application/xml-dtd",
                    dv: "video/x-dv",
                    dvi: "application/x-dvi",
                    dxr: "application/x-director",
                    eps: "application/postscript",
                    etx: "text/x-setext",
                    exe: "application/octet-stream",
                    ez: "application/andrew-inset",
                    gif: "image/gif",
                    gram: "application/srgs",
                    grxml: "application/srgs+xml",
                    gtar: "application/x-gtar",
                    hdf: "application/x-hdf",
                    hqx: "application/mac-binhex40",
                    htm: "text/html",
                    html: "text/html",
                    ice: "x-conference/x-cooltalk",
                    ico: "image/x-icon",
                    ics: "text/calendar",
                    ief: "image/ief",
                    ifb: "text/calendar",
                    iges: "model/iges",
                    igs: "model/iges",
                    jnlp: "application/x-java-jnlp-file",
                    jp2: "image/jp2",
                    jpe: "image/jpeg",
                    jpeg: "image/jpeg",
                    jpg: "image/jpeg",
                    js: "application/x-javascript",
                    kar: "audio/midi",
                    latex: "application/x-latex",
                    lha: "application/octet-stream",
                    lzh: "application/octet-stream",
                    m3u: "audio/x-mpegurl",
                    m4a: "audio/mp4a-latm",
                    m4b: "audio/mp4a-latm",
                    m4p: "audio/mp4a-latm",
                    m4u: "video/vnd.mpegurl",
                    m4v: "video/x-m4v",
                    mac: "image/x-macpaint",
                    man: "application/x-troff-man",
                    mathml: "application/mathml+xml",
                    me: "application/x-troff-me",
                    mesh: "model/mesh",
                    mid: "audio/midi",
                    midi: "audio/midi",
                    mif: "application/vnd.mif",
                    mov: "video/quicktime",
                    movie: "video/x-sgi-movie",
                    mp2: "audio/mpeg",
                    mp3: "audio/mpeg",
                    mp4: "video/mp4",
                    mpe: "video/mpeg",
                    mpeg: "video/mpeg",
                    mpg: "video/mpeg",
                    mpga: "audio/mpeg",
                    ms: "application/x-troff-ms",
                    msh: "model/mesh",
                    mxu: "video/vnd.mpegurl",
                    nc: "application/x-netcdf",
                    oda: "application/oda",
                    ogg: "application/ogg",
                    pbm: "image/x-portable-bitmap",
                    pct: "image/pict",
                    pdb: "chemical/x-pdb",
                    pdf: "application/pdf",
                    pgm: "image/x-portable-graymap",
                    pgn: "application/x-chess-pgn",
                    pic: "image/pict",
                    pict: "image/pict",
                    png: "image/png",
                    pnm: "image/x-portable-anymap",
                    pnt: "image/x-macpaint",
                    pntg: "image/x-macpaint",
                    ppm: "image/x-portable-pixmap",
                    ppt: "application/vnd.ms-powerpoint",
                    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
                    potx: "application/vnd.openxmlformats-officedocument.presentationml.template",
                    ppsx: "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
                    ppam: "application/vnd.ms-powerpoint.addin.macroEnabled.12",
                    pptm: "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
                    potm: "application/vnd.ms-powerpoint.template.macroEnabled.12",
                    ppsm: "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
                    ps: "application/postscript",
                    qt: "video/quicktime",
                    qti: "image/x-quicktime",
                    qtif: "image/x-quicktime",
                    ra: "audio/x-pn-realaudio",
                    ram: "audio/x-pn-realaudio",
                    ras: "image/x-cmu-raster",
                    rdf: "application/rdf+xml",
                    rgb: "image/x-rgb",
                    rm: "application/vnd.rn-realmedia",
                    roff: "application/x-troff",
                    rtf: "text/rtf",
                    rtx: "text/richtext",
                    sgm: "text/sgml",
                    sgml: "text/sgml",
                    sh: "application/x-sh",
                    shar: "application/x-shar",
                    silo: "model/mesh",
                    sit: "application/x-stuffit",
                    skd: "application/x-koan",
                    skm: "application/x-koan",
                    skp: "application/x-koan",
                    skt: "application/x-koan",
                    smi: "application/smil",
                    smil: "application/smil",
                    snd: "audio/basic",
                    so: "application/octet-stream",
                    spl: "application/x-futuresplash",
                    src: "application/x-wais-source",
                    sv4cpio: "application/x-sv4cpio",
                    sv4crc: "application/x-sv4crc",
                    svg: "image/svg+xml",
                    swf: "application/x-shockwave-flash",
                    t: "application/x-troff",
                    tar: "application/x-tar",
                    tcl: "application/x-tcl",
                    tex: "application/x-tex",
                    texi: "application/x-texinfo",
                    texinfo: "application/x-texinfo",
                    tif: "image/tiff",
                    tiff: "image/tiff",
                    tr: "application/x-troff",
                    tsv: "text/tab-separated-values",
                    txt: "text/plain",
                    ustar: "application/x-ustar",
                    vcd: "application/x-cdlink",
                    vrml: "model/vrml",
                    vxml: "application/voicexml+xml",
                    wav: "audio/x-wav",
                    wbmp: "image/vnd.wap.wbmp",
                    wbmxl: "application/vnd.wap.wbxml",
                    wml: "text/vnd.wap.wml",
                    wmlc: "application/vnd.wap.wmlc",
                    wmls: "text/vnd.wap.wmlscript",
                    wmlsc: "application/vnd.wap.wmlscriptc",
                    wrl: "model/vrml",
                    xbm: "image/x-xbitmap",
                    xht: "application/xhtml+xml",
                    xhtml: "application/xhtml+xml",
                    xls: "application/vnd.ms-excel",
                    xml: "application/xml",
                    xpm: "image/x-xpixmap",
                    xsl: "application/xml",
                    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
                    xltx: "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
                    xlsm: "application/vnd.ms-excel.sheet.macroEnabled.12",
                    xltm: "application/vnd.ms-excel.template.macroEnabled.12",
                    xlam: "application/vnd.ms-excel.addin.macroEnabled.12",
                    xlsb: "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
                    xslt: "application/xslt+xml",
                    xul: "application/vnd.mozilla.xul+xml",
                    xwd: "image/x-xwindowdump",
                    xyz: "chemical/x-xyz",
                    zip: "application/zip"
                },
                l = function(e, n) {
                    var r = new t.Promise;
                    if ("undefined" == typeof FileReader) return t.Promise.error(new t.Error( - 1, "Attempted to use a FileReader on an unsupported browser."));
                    var i = new FileReader;
                    return i.onloadend = function() {
                        if (2 !== i.readyState) return void r.reject(new t.Error( - 1, "Error reading file."));
                        var e = i.result,
                        s = /^data:([^;]*);base64,(.*)$/.exec(e);
                        return s ? void r.resolve(s[2], n || s[1]) : void r.reject(new t.Error( - 1, "Unable to interpret data URL: " + e))
                    },
                    i.readAsDataURL(e),
                    r
                };
                t.File = function(r, s, u) {
                    this._name = r;
                    var l = t.User.current();
                    this._metaData = {
                        owner: null != l ? l.id: "unknown"
                    };
                    var h = /\.([^.]*)$/.exec(r);
                    h && (h = h[1].toLowerCase());
                    var f = u || c[h] || "text/plain";
                    if (this._guessedType = f, i.isArray(s)) this._base64 = a(s),
                    this._source = t.Promise.as(this._base64, f),
                    this._metaData.size = s.length;
                    else if (s && s.base64) {
                        var d = e("./browserify-wrapper/parse-base64"),
                        p = d(s.base64, f);
                        this._base64 = o(s.base64),
                        this._source = t.Promise.as(p, f)
                    } else if (s && s.blob) this._source = t.Promise.as(s.blob, f);
                    else if ("undefined" != typeof File && s instanceof File) this._source = t.Promise.as(s, f);
                    else if (t._isNode && n.Buffer.isBuffer(s)) this._base64 = s.toString("base64"),
                    this._source = t.Promise.as(this._base64, f),
                    this._metaData.size = s.length;
                    else if (i.isString(s)) throw "Creating a AV.File from a String is not yet supported."
                },
                t.File.withURL = function(e, n, r, i) {
                    if (!e || !n) throw "Please provide file name and url";
                    var s = new t.File(e, null, i);
                    if (r) for (var a in r) s._metaData[a] || (s._metaData[a] = r[a]);
                    return s._url = n,
                    s._metaData.__source = "external",
                    s
                },
                t.File.createWithoutData = function(e) {
                    var n = new t.File;
                    return n.id = e,
                    n
                },
                t.File.prototype = {
                    toJSON: function() {
                        return t._encode(this)
                    },
                    getACL: function() {
                        return this._acl
                    },
                    setACL: function(e) {
                        return e instanceof t.ACL ? void(this._acl = e) : new t.Error(t.Error.OTHER_CAUSE, "ACL must be a AV.ACL.")
                    },
                    name: function() {
                        return this._name
                    },
                    url: function() {
                        return this._url
                    },
                    metaData: function(e, t) {
                        return null != e && null != t ? (this._metaData[e] = t, this) : null != e ? this._metaData[e] : this._metaData
                    },
                    thumbnailURL: function(e, t, n, r, i) {
                        if (!this.url()) throw "Invalid url.";
                        if (!e || !t || 0 >= e || 0 >= t) throw "Invalid width or height value.";
                        if (n = n || 100, r = null == r ? !0 : r, 0 >= n || n > 100) throw "Invalid quality value.";
                        i = i || "png";
                        var s = r ? 2 : 1;
                        return this.url() + "?imageView/" + s + "/w/" + e + "/h/" + t + "/q/" + n + "/format/" + i
                    },
                    size: function() {
                        return this.metaData().size
                    },
                    ownerId: function() {
                        return this.metaData().owner
                    },
                    destroy: function(e) {
                        if (!this.id) return t.Promise.error("The file id is not eixsts.")._thenRunCallbacks(e);
                        var n = t._request("files", null, this.id, "DELETE");
                        return n._thenRunCallbacks(e)
                    },
                    _qiniuToken: function(e) {
                        var n = this,
                        i = r.extname(n._name),
                        s = function() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                        },
                        a = s() + s() + s() + s() + s() + i,
                        o = {
                            key: a,
                            ACL: n._acl,
                            name: n._name,
                            mime_type: e,
                            metaData: n._metaData
                        };
                        return e && null == n._metaData.mime_type && (n._metaData.mime_type = e),
                        n._qiniu_key = a,
                        t._request("qiniu", null, null, "POST", o)
                    },
                    save: function() {
                        var n = null,
                        r = {};
                        1 === arguments.length ? n = arguments[0] : 2 === arguments.length && (r = arguments[0], n = arguments[1]);
                        var i = this;
                        if (!i._previousSave) {
                            var s = u();
                            if (i._source && s) {
                                var a = e("./browserify-wrapper/upload");
                                a(i, t, r)
                            } else if (i._url && "external" == i._metaData.__source) {
                                var o = {
                                    name: i._name,
                                    ACL: i._acl,
                                    metaData: i._metaData,
                                    mime_type: i._guessedType,
                                    url: i._url
                                };
                                i._previousSave = t._request("files", i._name, null, "POST", o).then(function(e) {
                                    return i._name = e.name,
                                    i._url = e.url,
                                    i.id = e.objectId,
                                    e.size && (i._metaData.size = e.size),
                                    i
                                })
                            } else s || (i._previousSave = i._source.then(function(e, n) {
                                var r = {
                                    base64: "",
                                    _ContentType: n,
                                    ACL: i._acl,
                                    mime_type: n,
                                    metaData: i._metaData
                                };
                                return i._base64 ? (r.base64 = i._base64, t._request("files", i._name, null, "POST", r)) : l(e).then(function(e) {
                                    return r.base64 = e,
                                    t._request("files", i._name, null, "POST", r)
                                })
                            }).then(function(e) {
                                return i._name = e.name,
                                i._url = e.url,
                                i.id = e.objectId,
                                e.size && (i._metaData.size = e.size),
                                i
                            }))
                        }
                        return i._previousSave._thenRunCallbacks(n)
                    }
                }
            }
        }).call(this, "undefined" != typeof global ? global: "undefined" != typeof self ? self: "undefined" != typeof window ? window: {})
    },
    {
        "./browserify-wrapper/parse-base64": 6,
        "./browserify-wrapper/upload": 7,
        path: 33,
        underscore: 35
    }],
    15 : [function(e, t, n) {
        var r = e("underscore");
        t.exports = function(e) {
            e.GeoPoint = function(t, n) {
                r.isArray(t) ? (e.GeoPoint._validate(t[0], t[1]), this.latitude = t[0], this.longitude = t[1]) : r.isObject(t) ? (e.GeoPoint._validate(t.latitude, t.longitude), this.latitude = t.latitude, this.longitude = t.longitude) : r.isNumber(t) && r.isNumber(n) ? (e.GeoPoint._validate(t, n), this.latitude = t, this.longitude = n) : (this.latitude = 0, this.longitude = 0);
                var i = this;
                this.__defineGetter__ && this.__defineSetter__ && (this._latitude = this.latitude, this._longitude = this.longitude, this.__defineGetter__("latitude",
                function() {
                    return i._latitude
                }), this.__defineGetter__("longitude",
                function() {
                    return i._longitude
                }), this.__defineSetter__("latitude",
                function(t) {
                    e.GeoPoint._validate(t, i.longitude),
                    i._latitude = t
                }), this.__defineSetter__("longitude",
                function(t) {
                    e.GeoPoint._validate(i.latitude, t),
                    i._longitude = t
                }))
            },
            e.GeoPoint._validate = function(e, t) {
                if ( - 90 > e) throw "AV.GeoPoint latitude " + e + " < -90.0.";
                if (e > 90) throw "AV.GeoPoint latitude " + e + " > 90.0.";
                if ( - 180 > t) throw "AV.GeoPoint longitude " + t + " < -180.0.";
                if (t > 180) throw "AV.GeoPoint longitude " + t + " > 180.0."
            },
            e.GeoPoint.current = function(t) {
                var n = new e.Promise;
                return navigator.geolocation.getCurrentPosition(function(t) {
                    n.resolve(new e.GeoPoint({
                        latitude: t.coords.latitude,
                        longitude: t.coords.longitude
                    }))
                },
                function(e) {
                    n.reject(e)
                }),
                n._thenRunCallbacks(t)
            },
            e.GeoPoint.prototype = {
                toJSON: function() {
                    return e.GeoPoint._validate(this.latitude, this.longitude),
                    {
                        __type: "GeoPoint",
                        latitude: this.latitude,
                        longitude: this.longitude
                    }
                },
                radiansTo: function(e) {
                    var t = Math.PI / 180,
                    n = this.latitude * t,
                    r = this.longitude * t,
                    i = e.latitude * t,
                    s = e.longitude * t,
                    a = n - i,
                    o = r - s,
                    u = Math.sin(a / 2),
                    c = Math.sin(o / 2),
                    l = u * u + Math.cos(n) * Math.cos(i) * c * c;
                    return l = Math.min(1, l),
                    2 * Math.asin(Math.sqrt(l))
                },
                kilometersTo: function(e) {
                    return 6371 * this.radiansTo(e)
                },
                milesTo: function(e) {
                    return 3958.8 * this.radiansTo(e)
                }
            }
        }
    },
    {
        underscore: 35
    }],
    16 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.History = function() {
                console.warn("AV.History is deprecated, please don't use it anymore."),
                this.handlers = [],
                r.bindAll(this, "checkUrl")
            };
            var t = /^[#\/]/,
            n = /msie [\w.]+/;
            e.History.started = !1,
            r.extend(e.History.prototype, e.Events, {
                interval: 50,
                getHash: function(e) {
                    var t = e ? e.location: window.location,
                    n = t.href.match(/#(.*)$/);
                    return n ? n[1] : ""
                },
                getFragment: function(n, r) {
                    if (e._isNullOrUndefined(n)) if (this._hasPushState || r) {
                        n = window.location.pathname;
                        var i = window.location.search;
                        i && (n += i)
                    } else n = this.getHash();
                    return n.indexOf(this.options.root) || (n = n.substr(this.options.root.length)),
                    n.replace(t, "")
                },
                start: function(i) {
                    if (e.History.started) throw new Error("AV.history has already been started");
                    e.History.started = !0,
                    this.options = r.extend({},
                    {
                        root: "/"
                    },
                    this.options, i),
                    this._wantsHashChange = this.options.hashChange !== !1,
                    this._wantsPushState = !!this.options.pushState,
                    this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
                    var s = this.getFragment(),
                    a = document.documentMode,
                    o = n.exec(navigator.userAgent.toLowerCase()) && (!a || 7 >= a);
                    o && (this.iframe = e.$('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(s)),
                    this._hasPushState ? e.$(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !o ? e.$(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = window.setInterval(this.checkUrl, this.interval)),
                    this.fragment = s;
                    var u = window.location,
                    c = u.pathname === this.options.root;
                    return this._wantsHashChange && this._wantsPushState && !this._hasPushState && !c ? (this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0) : (this._wantsPushState && this._hasPushState && c && u.hash && (this.fragment = this.getHash().replace(t, ""), window.history.replaceState({},
                    document.title, u.protocol + "//" + u.host + this.options.root + this.fragment)), this.options.silent ? void 0 : this.loadUrl())
                },
                stop: function() {
                    e.$(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl),
                    window.clearInterval(this._checkUrlInterval),
                    e.History.started = !1
                },
                route: function(e, t) {
                    this.handlers.unshift({
                        route: e,
                        callback: t
                    })
                },
                checkUrl: function(e) {
                    var t = this.getFragment();
                    return t === this.fragment && this.iframe && (t = this.getFragment(this.getHash(this.iframe))),
                    t === this.fragment ? !1 : (this.iframe && this.navigate(t), void(this.loadUrl() || this.loadUrl(this.getHash())))
                },
                loadUrl: function(e) {
                    var t = this.fragment = this.getFragment(e),
                    n = r.any(this.handlers,
                    function(e) {
                        return e.route.test(t) ? (e.callback(t), !0) : void 0
                    });
                    return n
                },
                navigate: function(n, r) {
                    if (!e.History.started) return ! 1;
                    r && r !== !0 || (r = {
                        trigger: r
                    });
                    var i = (n || "").replace(t, "");
                    if (this.fragment !== i) {
                        if (this._hasPushState) {
                            0 !== i.indexOf(this.options.root) && (i = this.options.root + i),
                            this.fragment = i;
                            var s = r.replace ? "replaceState": "pushState";
                            window.history[s]({},
                            document.title, i)
                        } else this._wantsHashChange ? (this.fragment = i, this._updateHash(window.location, i, r.replace), this.iframe && i !== this.getFragment(this.getHash(this.iframe)) && (r.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, i, r.replace))) : window.location.assign(this.options.root + n);
                        r.trigger && this.loadUrl(n)
                    }
                },
                _updateHash: function(e, t, n) {
                    if (n) {
                        var r = e.toString().replace(/(javascript:|#).*$/, "");
                        e.replace(r + "#" + t)
                    } else e.hash = t
                }
            })
        }
    },
    {
        underscore: 35
    }],
    17 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Insight = e.Insight || {},
            r.extend(e.Insight, {
                startJob: function(t, n) {
                    if (!t || !t.sql) throw new Error("Please provide the sql to run the job.");
                    var r = {
                        jobConfig: t,
                        appId: e.applicationId
                    },
                    i = e._request("bigquery", "jobs", null, "POST", e._encode(r, null, !0));
                    return i.then(function(t) {
                        return e._decode(null, t).id
                    })._thenRunCallbacks(n)
                },
                on: function(e, t) {}
            }),
            e.Insight.JobQuery = function(e, t) {
                if (!e) throw new Error("Please provide the job id.");
                this.id = e,
                this.className = t,
                this._skip = 0,
                this._limit = 100
            },
            e.Insight.JobQuery.prototype = {
                skip: function(e) {
                    return this._skip = e,
                    this
                },
                limit: function(e) {
                    return this._limit = e,
                    this
                },
                find: function(t) {
                    var n = {
                        skip: this._skip,
                        limit: this._limit
                    },
                    r = e._request("bigquery", "jobs", this.id, "GET", n);
                    return r.then(function(t) {
                        return t.error ? e.Promise.error(new e.Error(t.code, t.error)) : e.Promise.as(t)
                    })._thenRunCallbacks(t)
                }
            }
        }
    },
    {
        underscore: 35
    }],
    18 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Object = function(t, n) {
                if (r.isString(t)) return e.Object._create.apply(this, arguments);
                t = t || {},
                n && n.parse && (t = this.parse(t));
                var i = e._getValue(this, "defaults");
                if (i && (t = r.extend({},
                i, t)), n && n.collection && (this.collection = n.collection), this._serverData = {},
                this._opSetQueue = [{}], this.attributes = {},
                this._hashedJSON = {},
                this._escapedAttributes = {},
                this.cid = r.uniqueId("c"), this.changed = {},
                this._silent = {},
                this._pending = {},
                !this.set(t, {
                    silent: !0
                })) throw new Error("Can't create an invalid AV.Object");
                this.changed = {},
                this._silent = {},
                this._pending = {},
                this._hasData = !0,
                this._previousAttributes = r.clone(this.attributes),
                this.initialize.apply(this, arguments)
            },
            e.Object.saveAll = function(t, n) {
                return e.Object._deepSaveAsync(t)._thenRunCallbacks(n)
            },
            r.extend(e.Object.prototype, e.Events, {
                _existed: !1,
                _fetchWhenSave: !1,
                initialize: function() {},
                fetchWhenSave: function(e) {
                    if (!r.isBoolean(e)) throw "Expect boolean value for fetchWhenSave";
                    this._fetchWhenSave = e
                },
                getObjectId: function() {
                    return this.id
                },
                getCreatedAt: function() {
                    return this.createdAt || this.get("createdAt")
                },
                getUpdatedAt: function() {
                    return this.updatedAt || this.get("updatedAt")
                },
                toJSON: function() {
                    var t = this._toFullJSON();
                    return e._arrayEach(["__type", "className"],
                    function(e) {
                        delete t[e]
                    }),
                    t
                },
                _toFullJSON: function(t) {
                    var n = r.clone(this.attributes);
                    return e._objectEach(n,
                    function(r, i) {
                        n[i] = e._encode(r, t)
                    }),
                    e._objectEach(this._operations,
                    function(e, t) {
                        n[t] = e
                    }),
                    r.has(this, "id") && (n.objectId = this.id),
                    r.has(this, "createdAt") && (r.isDate(this.createdAt) ? n.createdAt = this.createdAt.toJSON() : n.createdAt = this.createdAt),
                    r.has(this, "updatedAt") && (r.isDate(this.updatedAt) ? n.updatedAt = this.updatedAt.toJSON() : n.updatedAt = this.updatedAt),
                    n.__type = "Object",
                    n.className = this.className,
                    n
                },
                _refreshCache: function() {
                    var t = this;
                    t._refreshingCache || (t._refreshingCache = !0, e._objectEach(this.attributes,
                    function(n, i) {
                        n instanceof e.Object ? n._refreshCache() : r.isObject(n) && t._resetCacheForKey(i) && t.set(i, new e.Op.Set(n), {
                            silent: !0
                        })
                    }), delete t._refreshingCache)
                },
                dirty: function(e) {
                    this._refreshCache();
                    var t = r.last(this._opSetQueue);
                    return e ? t[e] ? !0 : !1 : this.id ? r.keys(t).length > 0 ? !0 : !1 : !0
                },
                _toPointer: function() {
                    return {
                        __type: "Pointer",
                        className: this.className,
                        objectId: this.id
                    }
                },
                get: function(e) {
                    return this.attributes[e]
                },
                relation: function(t) {
                    var n = this.get(t);
                    if (n) {
                        if (! (n instanceof e.Relation)) throw "Called relation() on non-relation field " + t;
                        return n._ensureParentAndKey(this, t),
                        n
                    }
                    return new e.Relation(this, t)
                },
                escape: function(t) {
                    var n = this._escapedAttributes[t];
                    if (n) return n;
                    var i, s = this.attributes[t];
                    return i = e._isNullOrUndefined(s) ? "": r.escape(s.toString()),
                    this._escapedAttributes[t] = i,
                    i
                },
                has: function(t) {
                    return ! e._isNullOrUndefined(this.attributes[t])
                },
                _mergeMagicFields: function(t) {
                    var n = this,
                    i = ["id", "objectId", "createdAt", "updatedAt"];
                    e._arrayEach(i,
                    function(i) {
                        t[i] && ("objectId" === i ? n.id = t[i] : "createdAt" !== i && "updatedAt" !== i || r.isDate(t[i]) ? n[i] = t[i] : n[i] = e._parseDate(t[i]), delete t[i])
                    })
                },
                _startSave: function() {
                    this._opSetQueue.push({})
                },
                _cancelSave: function() {
                    var t = r.first(this._opSetQueue);
                    this._opSetQueue = r.rest(this._opSetQueue);
                    var n = r.first(this._opSetQueue);
                    e._objectEach(t,
                    function(e, r) {
                        var i = t[r],
                        s = n[r];
                        i && s ? n[r] = s._mergeWithPrevious(i) : i && (n[r] = i)
                    }),
                    this._saving = this._saving - 1
                },
                _finishSave: function(t) {
                    var n = {};
                    e._traverse(this.attributes,
                    function(t) {
                        t instanceof e.Object && t.id && t._hasData && (n[t.id] = t)
                    });
                    var i = r.first(this._opSetQueue);
                    this._opSetQueue = r.rest(this._opSetQueue),
                    this._applyOpSet(i, this._serverData),
                    this._mergeMagicFields(t);
                    var s = this;
                    e._objectEach(t,
                    function(t, r) {
                        s._serverData[r] = e._decode(r, t);
                        var i = e._traverse(s._serverData[r],
                        function(t) {
                            return t instanceof e.Object && n[t.id] ? n[t.id] : void 0
                        });
                        i && (s._serverData[r] = i)
                    }),
                    this._rebuildAllEstimatedData(),
                    this._saving = this._saving - 1
                },
                _finishFetch: function(t, n) {
                    this._opSetQueue = [{}],
                    this._mergeMagicFields(t);
                    var r = this;
                    e._objectEach(t,
                    function(t, n) {
                        r._serverData[n] = e._decode(n, t)
                    }),
                    this._rebuildAllEstimatedData(),
                    this._refreshCache(),
                    this._opSetQueue = [{}],
                    this._hasData = n
                },
                _applyOpSet: function(t, n) {
                    var r = this;
                    e._objectEach(t,
                    function(t, i) {
                        n[i] = t._estimate(n[i], r, i),
                        n[i] === e.Op._UNSET && delete n[i]
                    })
                },
                _resetCacheForKey: function(t) {
                    var n = this.attributes[t];
                    if (r.isObject(n) && !(n instanceof e.Object) && !(n instanceof e.File)) {
                        n = n.toJSON ? n.toJSON() : n;
                        var i = JSON.stringify(n);
                        if (this._hashedJSON[t] !== i) {
                            var s = !!this._hashedJSON[t];
                            return this._hashedJSON[t] = i,
                            s
                        }
                    }
                    return ! 1
                },
                _rebuildEstimatedDataForKey: function(t) {
                    var n = this;
                    delete this.attributes[t],
                    this._serverData[t] && (this.attributes[t] = this._serverData[t]),
                    e._arrayEach(this._opSetQueue,
                    function(r) {
                        var i = r[t];
                        i && (n.attributes[t] = i._estimate(n.attributes[t], n, t), n.attributes[t] === e.Op._UNSET ? delete n.attributes[t] : n._resetCacheForKey(t))
                    })
                },
                _rebuildAllEstimatedData: function() {
                    var t = this,
                    n = r.clone(this.attributes);
                    this.attributes = r.clone(this._serverData),
                    e._arrayEach(this._opSetQueue,
                    function(n) {
                        t._applyOpSet(n, t.attributes),
                        e._objectEach(n,
                        function(e, n) {
                            t._resetCacheForKey(n)
                        })
                    }),
                    e._objectEach(n,
                    function(e, n) {
                        t.attributes[n] !== e && t.trigger("change:" + n, t, t.attributes[n], {})
                    }),
                    e._objectEach(this.attributes,
                    function(e, i) {
                        r.has(n, i) || t.trigger("change:" + i, t, e, {})
                    })
                },
                set: function(t, n, i) {
                    var s;
                    if (r.isObject(t) || e._isNullOrUndefined(t) ? (s = t, e._objectEach(s,
                    function(t, n) {
                        s[n] = e._decode(n, t)
                    }), i = n) : (s = {},
                    s[t] = e._decode(t, n)), i = i || {},
                    !s) return this;
                    s instanceof e.Object && (s = s.attributes),
                    i.unset && e._objectEach(s,
                    function(t, n) {
                        s[n] = new e.Op.Unset
                    });
                    var a = r.clone(s),
                    o = this;
                    if (e._objectEach(a,
                    function(t, n) {
                        t instanceof e.Op && (a[n] = t._estimate(o.attributes[n], o, n), a[n] === e.Op._UNSET && delete a[n])
                    }), !this._validate(s, i)) return ! 1;
                    this._mergeMagicFields(s),
                    i.changes = {};
                    var u = this._escapedAttributes;
                    this._previousAttributes || {};
                    return e._arrayEach(r.keys(s),
                    function(t) {
                        var n = s[t];
                        n instanceof e.Relation && (n.parent = o),
                        n instanceof e.Op || (n = new e.Op.Set(n));
                        var a = !0;
                        n instanceof e.Op.Set && r.isEqual(o.attributes[t], n.value) && (a = !1),
                        a && (delete u[t], i.silent ? o._silent[t] = !0 : i.changes[t] = !0);
                        var c = r.last(o._opSetQueue);
                        c[t] = n._mergeWithPrevious(c[t]),
                        o._rebuildEstimatedDataForKey(t),
                        a ? (o.changed[t] = o.attributes[t], i.silent || (o._pending[t] = !0)) : (delete o.changed[t], delete o._pending[t])
                    }),
                    i.silent || this.change(i),
                    this
                },
                unset: function(e, t) {
                    return t = t || {},
                    t.unset = !0,
                    this.set(e, null, t)
                },
                increment: function(t, n) {
                    return (r.isUndefined(n) || r.isNull(n)) && (n = 1),
                    this.set(t, new e.Op.Increment(n))
                },
                add: function(t, n) {
                    return this.set(t, new e.Op.Add([n]))
                },
                addUnique: function(t, n) {
                    return this.set(t, new e.Op.AddUnique([n]))
                },
                remove: function(t, n) {
                    return this.set(t, new e.Op.Remove([n]))
                },
                op: function(e) {
                    return r.last(this._opSetQueue)[e]
                },
                clear: function(e) {
                    e = e || {},
                    e.unset = !0;
                    var t = r.extend(this.attributes, this._operations);
                    return this.set(t, e)
                },
                _getSaveJSON: function() {
                    var t = r.clone(r.first(this._opSetQueue));
                    return e._objectEach(t,
                    function(e, n) {
                        t[n] = e.toJSON()
                    }),
                    t
                },
                _canBeSerialized: function() {
                    return e.Object._canBeSerializedAsValue(this.attributes)
                },
                fetch: function() {
                    var t = null,
                    n = {};
                    1 === arguments.length ? t = arguments[0] : 2 === arguments.length && (n = arguments[0], t = arguments[1]);
                    var r = this,
                    i = e._request("classes", this.className, this.id, "GET", n);
                    return i.then(function(e, t, n) {
                        return r._finishFetch(r.parse(e, t, n), !0),
                        r
                    })._thenRunCallbacks(t, this)
                },
                save: function(t, n, i) {
                    var s, a, o;
                    if (r.isObject(t) || e._isNullOrUndefined(t) ? (s = t, o = n) : (s = {},
                    s[t] = n, o = i), !o && s) {
                        var u = r.reject(s,
                        function(e, t) {
                            return r.include(["success", "error", "wait"], t)
                        });
                        if (0 === u.length) {
                            var c = !0;
                            if (r.has(s, "success") && !r.isFunction(s.success) && (c = !1), r.has(s, "error") && !r.isFunction(s.error) && (c = !1), c) return this.save(null, s)
                        }
                    }
                    o = r.clone(o) || {},
                    o.wait && (a = r.clone(this.attributes));
                    var l = r.clone(o) || {};
                    l.wait && (l.silent = !0);
                    var h;
                    if (l.error = function(e, t) {
                        h = t
                    },
                    s && !this.set(s, l)) return e.Promise.error(h)._thenRunCallbacks(o, this);
                    var f = this;
                    f._refreshCache();
                    var d = [],
                    p = [];
                    return e.Object._findUnsavedChildren(f.attributes, d, p),
                    d.length + p.length > 0 ? e.Object._deepSaveAsync(this.attributes, f).then(function() {
                        return f.save(null, o)
                    },
                    function(t) {
                        return e.Promise.error(t)._thenRunCallbacks(o, f)
                    }) : (this._startSave(), this._saving = (this._saving || 0) + 1, this._allPreviousSaves = this._allPreviousSaves || e.Promise.as(), this._allPreviousSaves = this._allPreviousSaves._continueWith(function() {
                        var t = f.id ? "PUT": "POST",
                        n = f._getSaveJSON();
                        if (f._fetchWhenSave && (n._fetchWhenSave = !0), o.fetchWhenSave && (n._fetchWhenSave = !0), o.query) {
                            var i;
                            if ("function" == typeof o.query.toJSON && (i = o.query.toJSON(), i && (n._where = i.where)), !n._where) {
                                var u = new Error("options.query is not an AV.Query");
                                return e.Promise.error(u)._thenRunCallbacks(o, f)
                            }
                        }
                        var c = "classes",
                        h = f.className;
                        "_User" !== f.className || f.id || (c = "users", h = null);
                        var d = o._makeRequest || e._request,
                        p = d(c, h, f.id, t, n);
                        return p = p.then(function(e, t, n) {
                            var i = f.parse(e, t, n);
                            return o.wait && (i = r.extend(s || {},
                            i)),
                            f._finishSave(i),
                            o.wait && f.set(a, l),
                            f
                        },
                        function(t) {
                            return f._cancelSave(),
                            e.Promise.error(t)
                        })._thenRunCallbacks(o, f)
                    }), this._allPreviousSaves)
                },
                destroy: function(t) {
                    t = t || {};
                    var n = this,
                    r = function() {
                        n.trigger("destroy", n, n.collection, t)
                    };
                    if (!this.id) return r();
                    t.wait || r();
                    var i = e._request("classes", this.className, this.id, "DELETE");
                    return i.then(function() {
                        return t.wait && r(),
                        n
                    })._thenRunCallbacks(t, this)
                },
                parse: function(t, n, i) {
                    var s = r.clone(t);
                    return r(["createdAt", "updatedAt"]).each(function(t) {
                        s[t] && (s[t] = e._parseDate(s[t]))
                    }),
                    s.updatedAt || (s.updatedAt = s.createdAt),
                    n && (this._existed = 201 !== n),
                    s
                },
                clone: function() {
                    return new this.constructor(this.attributes)
                },
                isNew: function() {
                    return ! this.id
                },
                change: function(t) {
                    t = t || {};
                    var n = this._changing;
                    this._changing = !0;
                    var i = this;
                    e._objectEach(this._silent,
                    function(e) {
                        i._pending[e] = !0
                    });
                    var s = r.extend({},
                    t.changes, this._silent);
                    if (this._silent = {},
                    e._objectEach(s,
                    function(e, n) {
                        i.trigger("change:" + n, i, i.get(n), t)
                    }), n) return this;
                    for (var a = function(e, t) {
                        i._pending[t] || i._silent[t] || delete i.changed[t]
                    }; ! r.isEmpty(this._pending);) this._pending = {},
                    this.trigger("change", this, t),
                    e._objectEach(this.changed, a),
                    i._previousAttributes = r.clone(this.attributes);
                    return this._changing = !1,
                    this
                },
                existed: function() {
                    return this._existed
                },
                hasChanged: function(e) {
                    return arguments.length ? this.changed && r.has(this.changed, e) : !r.isEmpty(this.changed)
                },
                changedAttributes: function(t) {
                    if (!t) return this.hasChanged() ? r.clone(this.changed) : !1;
                    var n = {},
                    i = this._previousAttributes;
                    return e._objectEach(t,
                    function(e, t) {
                        r.isEqual(i[t], e) || (n[t] = e)
                    }),
                    n
                },
                previous: function(e) {
                    return arguments.length && this._previousAttributes ? this._previousAttributes[e] : null
                },
                previousAttributes: function() {
                    return r.clone(this._previousAttributes)
                },
                isValid: function() {
                    return ! this.validate(this.attributes)
                },
                validate: function(t, n) {
                    return ! r.has(t, "ACL") || t.ACL instanceof e.ACL ? !1 : new e.Error(e.Error.OTHER_CAUSE, "ACL must be a AV.ACL.")
                },
                _validate: function(e, t) {
                    if (t.silent || !this.validate) return ! 0;
                    e = r.extend({},
                    this.attributes, e);
                    var n = this.validate(e, t);
                    return n ? (t && t.error ? t.error(this, n, t) : this.trigger("error", this, n, t), !1) : !0
                },
                getACL: function() {
                    return this.get("ACL")
                },
                setACL: function(e, t) {
                    return this.set("ACL", e, t)
                }
            }),
            e.Object.createWithoutData = function(t, n, r) {
                var i = new e.Object(t);
                return i.id = n,
                i._hasData = r,
                i
            },
            e.Object.destroyAll = function(t, n) {
                if (null == t || 0 == t.length) return e.Promise.as()._thenRunCallbacks(n);
                var r = t[0].className,
                i = "",
                s = !0;
                t.forEach(function(e) {
                    if (e.className != r) throw "AV.Object.destroyAll requires the argument object array's classNames must be the same";
                    if (!e.id) throw "Could not delete unsaved object";
                    s ? (i = e.id, s = !1) : i = i + "," + e.id
                });
                var a = e._request("classes", r, i, "DELETE");
                return a._thenRunCallbacks(n)
            },
            e.Object._getSubclass = function(t) {
                if (!r.isString(t)) throw "AV.Object._getSubclass requires a string argument.";
                var n = e.Object._classMap[t];
                return n || (n = e.Object.extend(t), e.Object._classMap[t] = n),
                n
            },
            e.Object._create = function(t, n, r) {
                var i = e.Object._getSubclass(t);
                return new i(n, r)
            },
            e.Object._classMap = {},
            e.Object._extend = e._extend,
            e.Object["new"] = function(t, n) {
                return new e.Object(t, n)
            },
            e.Object.extend = function(t, n, i) {
                if (!r.isString(t)) {
                    if (t && r.has(t, "className")) return e.Object.extend(t.className, t, n);
                    throw new Error("AV.Object.extend's first argument should be the className.")
                }
                "User" === t && (t = "_User");
                var s = null;
                if (r.has(e.Object._classMap, t)) {
                    var a = e.Object._classMap[t];
                    s = a._extend(n, i)
                } else n = n || {},
                n.className = t,
                s = this._extend(n, i);
                return s.extend = function(n) {
                    if (r.isString(n) || n && r.has(n, "className")) return e.Object.extend.apply(s, arguments);
                    var i = [t].concat(e._.toArray(arguments));
                    return e.Object.extend.apply(s, i)
                },
                s["new"] = function(e, t) {
                    return new s(e, t)
                },
                e.Object._classMap[t] = s,
                s
            },
            e.Object._findUnsavedChildren = function(t, n, r) {
                e._traverse(t,
                function(t) {
                    return t instanceof e.Object ? (t._refreshCache(), void(t.dirty() && n.push(t))) : t instanceof e.File ? void(t.url() || t.id || r.push(t)) : void 0
                })
            },
            e.Object._canBeSerializedAsValue = function(t) {
                var n = !0;
                return t instanceof e.Object || t instanceof e.File ? n = !!t.id: r.isArray(t) ? e._arrayEach(t,
                function(t) {
                    e.Object._canBeSerializedAsValue(t) || (n = !1)
                }) : r.isObject(t) && e._objectEach(t,
                function(t) {
                    e.Object._canBeSerializedAsValue(t) || (n = !1)
                }),
                n
            },
            e.Object._deepSaveAsync = function(t, n) {
                var i = [],
                s = [];
                e.Object._findUnsavedChildren(t, i, s),
                n && (i = r.filter(i,
                function(e) {
                    return e != n
                }));
                var a = e.Promise.as();
                r.each(s,
                function(e) {
                    a = a.then(function() {
                        return e.save()
                    })
                });
                var o = r.uniq(i),
                u = r.uniq(o);
                return a.then(function() {
                    return e.Promise._continueWhile(function() {
                        return u.length > 0
                    },
                    function() {
                        var t = [],
                        n = [];
                        if (e._arrayEach(u,
                        function(e) {
                            return t.length > 20 ? void n.push(e) : void(e._canBeSerialized() ? t.push(e) : n.push(e))
                        }), u = n, 0 === t.length) return e.Promise.error(new e.Error(e.Error.OTHER_CAUSE, "Tried to save a batch with a cycle."));
                        var i = e.Promise.when(r.map(t,
                        function(t) {
                            return t._allPreviousSaves || e.Promise.as()
                        })),
                        s = new e.Promise;
                        return e._arrayEach(t,
                        function(e) {
                            e._allPreviousSaves = s
                        }),
                        i._continueWith(function() {
                            return e._request("batch", null, null, "POST", {
                                requests: r.map(t,
                                function(e) {
                                    var t = e._getSaveJSON(),
                                    n = "POST",
                                    r = "/1.1/classes/" + e.className;
                                    return e.id && (r = r + "/" + e.id, n = "PUT"),
                                    e._startSave(),
                                    {
                                        method: n,
                                        path: r,
                                        body: t
                                    }
                                })
                            }).then(function(n, r, i) {
                                var s;
                                return e._arrayEach(t,
                                function(e, t) {
                                    n[t].success ? e._finishSave(e.parse(n[t].success, r, i)) : (s = s || n[t].error, e._cancelSave())
                                }),
                                s ? e.Promise.error(new e.Error(s.code, s.error)) : void 0
                            }).then(function(e) {
                                return s.resolve(e),
                                e
                            },
                            function(t) {
                                return s.reject(t),
                                e.Promise.error(t)
                            })
                        })
                    })
                }).then(function() {
                    return t
                })
            }
        }
    },
    {
        underscore: 35
    }],
    19 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Op = function() {
                this._initialize.apply(this, arguments)
            },
            e.Op.prototype = {
                _initialize: function() {}
            },
            r.extend(e.Op, {
                _extend: e._extend,
                _opDecoderMap: {},
                _registerDecoder: function(t, n) {
                    e.Op._opDecoderMap[t] = n
                },
                _decode: function(t) {
                    var n = e.Op._opDecoderMap[t.__op];
                    return n ? n(t) : void 0
                }
            }),
            e.Op._registerDecoder("Batch",
            function(t) {
                var n = null;
                return e._arrayEach(t.ops,
                function(t) {
                    t = e.Op._decode(t),
                    n = t._mergeWithPrevious(n)
                }),
                n
            }),
            e.Op.Set = e.Op._extend({
                _initialize: function(e) {
                    this._value = e
                },
                value: function() {
                    return this._value
                },
                toJSON: function() {
                    return e._encode(this.value())
                },
                _mergeWithPrevious: function(e) {
                    return this
                },
                _estimate: function(e) {
                    return this.value()
                }
            }),
            e.Op._UNSET = {},
            e.Op.Unset = e.Op._extend({
                toJSON: function() {
                    return {
                        __op: "Delete"
                    }
                },
                _mergeWithPrevious: function(e) {
                    return this
                },
                _estimate: function(t) {
                    return e.Op._UNSET
                }
            }),
            e.Op._registerDecoder("Delete",
            function(t) {
                return new e.Op.Unset
            }),
            e.Op.Increment = e.Op._extend({
                _initialize: function(e) {
                    this._amount = e
                },
                amount: function() {
                    return this._amount
                },
                toJSON: function() {
                    return {
                        __op: "Increment",
                        amount: this._amount
                    }
                },
                _mergeWithPrevious: function(t) {
                    if (t) {
                        if (t instanceof e.Op.Unset) return new e.Op.Set(this.amount());
                        if (t instanceof e.Op.Set) return new e.Op.Set(t.value() + this.amount());
                        if (t instanceof e.Op.Increment) return new e.Op.Increment(this.amount() + t.amount());
                        throw "Op is invalid after previous op."
                    }
                    return this
                },
                _estimate: function(e) {
                    return e ? e + this.amount() : this.amount()
                }
            }),
            e.Op._registerDecoder("Increment",
            function(t) {
                return new e.Op.Increment(t.amount)
            }),
            e.Op.Add = e.Op._extend({
                _initialize: function(e) {
                    this._objects = e
                },
                objects: function() {
                    return this._objects
                },
                toJSON: function() {
                    return {
                        __op: "Add",
                        objects: e._encode(this.objects())
                    }
                },
                _mergeWithPrevious: function(t) {
                    if (t) {
                        if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                        if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                        if (t instanceof e.Op.Add) return new e.Op.Add(t.objects().concat(this.objects()));
                        throw "Op is invalid after previous op."
                    }
                    return this
                },
                _estimate: function(e) {
                    return e ? e.concat(this.objects()) : r.clone(this.objects())
                }
            }),
            e.Op._registerDecoder("Add",
            function(t) {
                return new e.Op.Add(e._decode(void 0, t.objects))
            }),
            e.Op.AddUnique = e.Op._extend({
                _initialize: function(e) {
                    this._objects = r.uniq(e)
                },
                objects: function() {
                    return this._objects
                },
                toJSON: function() {
                    return {
                        __op: "AddUnique",
                        objects: e._encode(this.objects())
                    }
                },
                _mergeWithPrevious: function(t) {
                    if (t) {
                        if (t instanceof e.Op.Unset) return new e.Op.Set(this.objects());
                        if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                        if (t instanceof e.Op.AddUnique) return new e.Op.AddUnique(this._estimate(t.objects()));
                        throw "Op is invalid after previous op."
                    }
                    return this
                },
                _estimate: function(t) {
                    if (t) {
                        var n = r.clone(t);
                        return e._arrayEach(this.objects(),
                        function(t) {
                            if (t instanceof e.Object && t.id) {
                                var i = r.find(n,
                                function(n) {
                                    return n instanceof e.Object && n.id === t.id
                                });
                                if (i) {
                                    var s = r.indexOf(n, i);
                                    n[s] = t
                                } else n.push(t)
                            } else r.contains(n, t) || n.push(t)
                        }),
                        n
                    }
                    return r.clone(this.objects())
                }
            }),
            e.Op._registerDecoder("AddUnique",
            function(t) {
                return new e.Op.AddUnique(e._decode(void 0, t.objects))
            }),
            e.Op.Remove = e.Op._extend({
                _initialize: function(e) {
                    this._objects = r.uniq(e)
                },
                objects: function() {
                    return this._objects
                },
                toJSON: function() {
                    return {
                        __op: "Remove",
                        objects: e._encode(this.objects())
                    }
                },
                _mergeWithPrevious: function(t) {
                    if (t) {
                        if (t instanceof e.Op.Unset) return t;
                        if (t instanceof e.Op.Set) return new e.Op.Set(this._estimate(t.value()));
                        if (t instanceof e.Op.Remove) return new e.Op.Remove(r.union(t.objects(), this.objects()));
                        throw "Op is invalid after previous op."
                    }
                    return this
                },
                _estimate: function(t) {
                    if (t) {
                        var n = r.difference(t, this.objects());
                        return e._arrayEach(this.objects(),
                        function(t) {
                            t instanceof e.Object && t.id && (n = r.reject(n,
                            function(n) {
                                return n instanceof e.Object && n.id === t.id
                            }))
                        }),
                        n
                    }
                    return []
                }
            }),
            e.Op._registerDecoder("Remove",
            function(t) {
                return new e.Op.Remove(e._decode(void 0, t.objects))
            }),
            e.Op.Relation = e.Op._extend({
                _initialize: function(t, n) {
                    this._targetClassName = null;
                    var i = this,
                    s = function(t) {
                        if (t instanceof e.Object) {
                            if (!t.id) throw "You can't add an unsaved AV.Object to a relation.";
                            if (i._targetClassName || (i._targetClassName = t.className), i._targetClassName !== t.className) throw "Tried to create a AV.Relation with 2 different types: " + i._targetClassName + " and " + t.className + ".";
                            return t.id
                        }
                        return t
                    };
                    this.relationsToAdd = r.uniq(r.map(t, s)),
                    this.relationsToRemove = r.uniq(r.map(n, s))
                },
                added: function() {
                    var t = this;
                    return r.map(this.relationsToAdd,
                    function(n) {
                        var r = e.Object._create(t._targetClassName);
                        return r.id = n,
                        r
                    })
                },
                removed: function() {
                    var t = this;
                    return r.map(this.relationsToRemove,
                    function(n) {
                        var r = e.Object._create(t._targetClassName);
                        return r.id = n,
                        r
                    })
                },
                toJSON: function() {
                    var e = null,
                    t = null,
                    n = this,
                    i = function(e) {
                        return {
                            __type: "Pointer",
                            className: n._targetClassName,
                            objectId: e
                        }
                    },
                    s = null;
                    return this.relationsToAdd.length > 0 && (s = r.map(this.relationsToAdd, i), e = {
                        __op: "AddRelation",
                        objects: s
                    }),
                    this.relationsToRemove.length > 0 && (s = r.map(this.relationsToRemove, i), t = {
                        __op: "RemoveRelation",
                        objects: s
                    }),
                    e && t ? {
                        __op: "Batch",
                        ops: [e, t]
                    }: e || t || {}
                },
                _mergeWithPrevious: function(t) {
                    if (t) {
                        if (t instanceof e.Op.Unset) throw "You can't modify a relation after deleting it.";
                        if (t instanceof e.Op.Relation) {
                            if (t._targetClassName && t._targetClassName !== this._targetClassName) throw "Related object must be of class " + t._targetClassName + ", but " + this._targetClassName + " was passed in.";
                            var n = r.union(r.difference(t.relationsToAdd, this.relationsToRemove), this.relationsToAdd),
                            i = r.union(r.difference(t.relationsToRemove, this.relationsToAdd), this.relationsToRemove),
                            s = new e.Op.Relation(n, i);
                            return s._targetClassName = this._targetClassName,
                            s
                        }
                        throw "Op is invalid after previous op."
                    }
                    return this
                },
                _estimate: function(t, n, r) {
                    if (t) {
                        if (t instanceof e.Relation) {
                            if (this._targetClassName) if (t.targetClassName) {
                                if (t.targetClassName !== this._targetClassName) throw "Related object must be a " + t.targetClassName + ", but a " + this._targetClassName + " was passed in."
                            } else t.targetClassName = this._targetClassName;
                            return t
                        }
                        throw "Op is invalid after previous op."
                    }
                    var i = new e.Relation(n, r);
                    i.targetClassName = this._targetClassName
                }
            }),
            e.Op._registerDecoder("AddRelation",
            function(t) {
                return new e.Op.Relation(e._decode(void 0, t.objects), [])
            }),
            e.Op._registerDecoder("RemoveRelation",
            function(t) {
                return new e.Op.Relation([], e._decode(void 0, t.objects))
            })
        }
    },
    {
        underscore: 35
    }],
    20 : [function(e, t, n) { (function(n) {
            "use strict";
            var r = e("underscore"),
            i = t.exports = function(e) {
                this._resolved = !1,
                this._rejected = !1,
                this._resolvedCallbacks = [],
                this._rejectedCallbacks = [],
                this.doResolve(e)
            },
            s = function(e) {
                return r.isNull(e) || r.isUndefined(e)
            },
            a = !1;
            "undefined" != typeof n && n.versions && n.versions.node && (a = !0),
            r.extend(i, {
                _isPromisesAPlusCompliant: !a,
                _debugError: !1,
                setPromisesAPlusCompliant: function(e) {
                    i._isPromisesAPlusCompliant = e
                },
                setDebugError: function(e) {
                    i._debugError = e
                },
                is: function(e) {
                    return e && e.then && r.isFunction(e.then)
                },
                as: function() {
                    var e = new i;
                    return e.resolve.apply(e, arguments),
                    e
                },
                error: function() {
                    var e = new i;
                    return e.reject.apply(e, arguments),
                    e
                },
                when: function(e) {
                    var t;
                    t = e && s(e.length) ? arguments: e;
                    var n = r.last(arguments);
                    n = r.isBoolean(n) ? n: !1;
                    var a = t.length,
                    o = !1,
                    u = [],
                    c = [];
                    if (u.length = t.length, c.length = t.length, 0 === a) return n ? i.as.call(this, u) : i.as.apply(this, u);
                    var l = new i,
                    h = function(e) {
                        return a -= 1,
                        o && !l._rejected && n ? void l.reject.call(l, c[e]) : void(0 === a && (o && !l._rejected ? l.reject.call(l, c) : n ? l._rejected || l.resolve.call(l, u) : l.resolve.apply(l, u)))
                    };
                    return r.each(t,
                    function(e, t) {
                        i.is(e) ? e.then(function(e) {
                            u[t] = e,
                            h(t)
                        },
                        function(e) {
                            c[t] = e,
                            o = !0,
                            h(t)
                        }) : (u[t] = e, h(t))
                    }),
                    l
                },
                race: function(e) {
                    var t;
                    t = e && s(e.length) ? arguments: e;
                    var n = t.length,
                    a = !1,
                    o = [],
                    u = [];
                    if (o.length = u.length = t.length, 0 === n) return i.as.call(this);
                    var c = new i,
                    l = function(e) {
                        c._resolved || c._rejected || (a ? c.reject.call(c, u[e]) : c.resolve.call(c, o[e]))
                    };
                    return r.each(t,
                    function(e, t) {
                        i.is(e) ? e.then(function(e) {
                            o[t] = e,
                            l(t)
                        },
                        function(e) {
                            u[t] = e,
                            a = !0,
                            l(t)
                        }) : (o[t] = e, l(t))
                    }),
                    c
                },
                _continueWhile: function(e, t) {
                    return e() ? t().then(function() {
                        return i._continueWhile(e, t)
                    }) : i.as()
                }
            }),
            i.all = function(e) {
                return i.when(e, !0)
            },
            r.extend(i.prototype, {
                resolve: function(e) {
                    if (this._resolved || this._rejected) throw "A promise was resolved even though it had already been " + (this._resolved ? "resolved": "rejected") + ".";
                    this._resolved = !0,
                    this._result = arguments;
                    var t = arguments;
                    r.each(this._resolvedCallbacks,
                    function(e) {
                        e.apply(this, t)
                    }),
                    this._resolvedCallbacks = [],
                    this._rejectedCallbacks = []
                },
                doResolve: function(e) {
                    if (e) {
                        var t = !1,
                        n = this;
                        try {
                            e(function(e) {
                                t || (t = !0, n.resolve.call(n, e))
                            },
                            function(e) {
                                t || (t = !0, n.reject.call(n, e))
                            })
                        } catch(r) {
                            if (t) return;
                            t = !0,
                            n.reject.call(n, r)
                        }
                    }
                },
                reject: function(e) {
                    if (this._resolved || this._rejected) throw "A promise was rejected even though it had already been " + (this._resolved ? "resolved": "rejected") + ".";
                    this._rejected = !0,
                    this._error = e,
                    r.each(this._rejectedCallbacks,
                    function(t) {
                        t(e)
                    }),
                    this._resolvedCallbacks = [],
                    this._rejectedCallbacks = []
                },
                then: function(e, t) {
                    var s = new i,
                    a = function() {
                        var t = arguments;
                        if (e) if (i._isPromisesAPlusCompliant) try {
                            t = [e.apply(this, t)]
                        } catch(n) {
                            i._debugError && n && console.error("Error occurred in promise resolve callback.", n.stack || n),
                            t = [i.error(n)]
                        } else t = [e.apply(this, t)];
                        1 === t.length && i.is(t[0]) ? t[0].then(function() {
                            s.resolve.apply(s, arguments)
                        },
                        function(e) {
                            s.reject(e)
                        }) : s.resolve.apply(s, t)
                    },
                    o = function(e) {
                        var n = [];
                        if (t) {
                            if (i._isPromisesAPlusCompliant) try {
                                n = [t(e)]
                            } catch(r) {
                                i._debugError && r && console.error("Error occurred in promise reject callback.", r.stack || r),
                                n = [i.error(r)]
                            } else n = [t(e)];
                            1 === n.length && i.is(n[0]) ? n[0].then(function() {
                                s.resolve.apply(s, arguments)
                            },
                            function(e) {
                                s.reject(e)
                            }) : i._isPromisesAPlusCompliant ? s.resolve.apply(s, n) : s.reject(n[0])
                        } else s.reject(e)
                    },
                    u = function(e) {
                        e.call()
                    };
                    i._isPromisesAPlusCompliant && ("undefined" != typeof window && r.isFunction(window.setImmediate) ? u = function(e) {
                        window.setImmediate(e)
                    }: "undefined" != typeof n && n.nextTick ? u = function(e) {
                        n.nextTick(e)
                    }: "undefined" != typeof setTimeout && r.isFunction(setTimeout) && (u = function(e) {
                        setTimeout(e, 0)
                    }));
                    var c = this;
                    return this._resolved ? u(function() {
                        a.apply(c, c._result)
                    }) : this._rejected ? u(function() {
                        o.apply(c, [c._error])
                    }) : (this._resolvedCallbacks.push(a), this._rejectedCallbacks.push(o)),
                    s
                },
                "catch": function(e) {
                    return this.then(void 0, e)
                },
                always: function(e) {
                    return this.then(e, e)
                },
                done: function(e) {
                    return this.then(e)
                },
                fail: function(e) {
                    return this.then(null, e)
                },
                _thenRunCallbacks: function(e, t) {
                    var n;
                    if (r.isFunction(e)) {
                        var s = e;
                        n = {
                            success: function(e) {
                                s(e, null)
                            },
                            error: function(e) {
                                s(null, e)
                            }
                        }
                    } else n = r.clone(e);
                    return n = n || {},
                    this.then(function(e) {
                        return n.success ? n.success.apply(this, arguments) : t && t.trigger("sync", t, e, n),
                        i.as.apply(i, arguments)
                    },
                    function(e) {
                        return n.error ? r.isUndefined(t) ? n.error(e) : n.error(t, e) : t && t.trigger("error", t, e, n),
                        i.error(e)
                    })
                },
                _continueWith: function(e) {
                    return this.then(function() {
                        return e(arguments, null)
                    },
                    function(t) {
                        return e(null, t)
                    })
                }
            }),
            i.prototype["finally"] = i.prototype.always,
            i.prototype["try"] = i.prototype.done
        }).call(this, e("_process"))
    },
    {
        _process: 34,
        underscore: 35
    }],
    21 : [function(e, t, n) {
        "use strict";
        t.exports = function(e) {
            e.Installation = e.Object.extend("_Installation"),
            e.Push = e.Push || {},
            e.Push.send = function(t, n) {
                if (t.where && (t.where = t.where.toJSON().where), t.where && t.cql) throw "Both where and cql can't be set";
                if (t.push_time && (t.push_time = t.push_time.toJSON()), t.expiration_time && (t.expiration_time = t.expiration_time.toJSON()), t.expiration_time && t.expiration_time_interval) throw "Both expiration_time and expiration_time_interval can't be set";
                var r = e._request("push", null, null, "POST", t);
                return r._thenRunCallbacks(n)
            }
        }
    },
    {}],
    22 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Query = function(t) {
                r.isString(t) && (t = e.Object._getSubclass(t)),
                this.objectClass = t,
                this.className = t.prototype.className,
                this._where = {},
                this._include = [],
                this._limit = -1,
                this._skip = 0,
                this._extraOptions = {}
            },
            e.Query.or = function() {
                var t = r.toArray(arguments),
                n = null;
                e._arrayEach(t,
                function(e) {
                    if (r.isNull(n) && (n = e.className), n !== e.className) throw "All queries must be for the same class"
                });
                var i = new e.Query(n);
                return i._orQuery(t),
                i
            },
            e.Query.and = function() {
                var t = r.toArray(arguments),
                n = null;
                e._arrayEach(t,
                function(e) {
                    if (r.isNull(n) && (n = e.className), n !== e.className) throw "All queries must be for the same class"
                });
                var i = new e.Query(n);
                return i._andQuery(t),
                i
            },
            e.Query.doCloudQuery = function(t, n, i) {
                var s = {
                    cql: t
                };
                r.isArray(n) ? s.pvalues = n: i = n;
                var a = e._request("cloudQuery", null, null, "GET", s);
                return a.then(function(t) {
                    var n = new e.Query(t.className),
                    i = r.map(t.results,
                    function(e) {
                        var r = n._newObject(t);
                        return r._finishFetch(n._processResult(e), !0),
                        r
                    });
                    return {
                        results: i,
                        count: t.count,
                        className: t.className
                    }
                })._thenRunCallbacks(i)
            },
            e.Query._extend = e._extend,
            e.Query.prototype = {
                _processResult: function(e) {
                    return e
                },
                get: function(t, n) {
                    if (!t) {
                        var r = new e.Error(e.Error.OBJECT_NOT_FOUND, "Object not found.");
                        return e.Promise.error(r)
                    }
                    var i = this;
                    return i.equalTo("objectId", t),
                    i.first().then(function(t) {
                        if (!e._.isEmpty(t)) return t;
                        var n = new e.Error(e.Error.OBJECT_NOT_FOUND, "Object not found.");
                        return e.Promise.error(n)
                    })._thenRunCallbacks(n, null)
                },
                toJSON: function() {
                    var t = {
                        where: this._where
                    };
                    return this._include.length > 0 && (t.include = this._include.join(",")),
                    this._select && (t.keys = this._select.join(",")),
                    this._limit >= 0 && (t.limit = this._limit),
                    this._skip > 0 && (t.skip = this._skip),
                    void 0 !== this._order && (t.order = this._order),
                    e._objectEach(this._extraOptions,
                    function(e, n) {
                        t[n] = e
                    }),
                    t
                },
                _newObject: function(t) {
                    var n;
                    return n = t && t.className ? new e.Object(t.className) : new this.objectClass
                },
                _createRequest: function(t) {
                    return e._request("classes", this.className, null, "GET", t || this.toJSON())
                },
                find: function(e) {
                    var t = this,
                    n = this._createRequest();
                    return n.then(function(e) {
                        return r.map(e.results,
                        function(n) {
                            var r = t._newObject(e);
                            return r._finishFetch(t._processResult(n), !0),
                            r
                        })
                    })._thenRunCallbacks(e)
                },
                destroyAll: function(t) {
                    var n = this;
                    return n.find().then(function(t) {
                        return e.Object.destroyAll(t)
                    })._thenRunCallbacks(t)
                },
                count: function(e) {
                    var t = this.toJSON();
                    t.limit = 0,
                    t.count = 1;
                    var n = this._createRequest(t);
                    return n.then(function(e) {
                        return e.count
                    })._thenRunCallbacks(e)
                },
                first: function(e) {
                    var t = this,
                    n = this.toJSON();
                    n.limit = 1;
                    var i = this._createRequest(n);
                    return i.then(function(e) {
                        return r.map(e.results,
                        function(e) {
                            var n = t._newObject();
                            return n._finishFetch(t._processResult(e), !0),
                            n
                        })[0]
                    })._thenRunCallbacks(e)
                },
                collection: function(t, n) {
                    return n = n || {},
                    new e.Collection(t, r.extend(n, {
                        model: this._objectClass || this.objectClass,
                        query: this
                    }))
                },
                skip: function(e) {
                    return this._skip = e,
                    this
                },
                limit: function(e) {
                    return this._limit = e,
                    this
                },
                equalTo: function(t, n) {
                    return this._where[t] = e._encode(n),
                    this
                },
                _addCondition: function(t, n, r) {
                    return this._where[t] || (this._where[t] = {}),
                    this._where[t][n] = e._encode(r),
                    this
                },
                sizeEqualTo: function(e, t) {
                    this._addCondition(e, "$size", t)
                },
                notEqualTo: function(e, t) {
                    return this._addCondition(e, "$ne", t),
                    this
                },
                lessThan: function(e, t) {
                    return this._addCondition(e, "$lt", t),
                    this
                },
                greaterThan: function(e, t) {
                    return this._addCondition(e, "$gt", t),
                    this
                },
                lessThanOrEqualTo: function(e, t) {
                    return this._addCondition(e, "$lte", t),
                    this
                },
                greaterThanOrEqualTo: function(e, t) {
                    return this._addCondition(e, "$gte", t),
                    this
                },
                containedIn: function(e, t) {
                    return this._addCondition(e, "$in", t),
                    this
                },
                notContainedIn: function(e, t) {
                    return this._addCondition(e, "$nin", t),
                    this
                },
                containsAll: function(e, t) {
                    return this._addCondition(e, "$all", t),
                    this
                },
                exists: function(e) {
                    return this._addCondition(e, "$exists", !0),
                    this
                },
                doesNotExist: function(e) {
                    return this._addCondition(e, "$exists", !1),
                    this
                },
                matches: function(e, t, n) {
                    return this._addCondition(e, "$regex", t),
                    n || (n = ""),
                    t.ignoreCase && (n += "i"),
                    t.multiline && (n += "m"),
                    n && n.length && this._addCondition(e, "$options", n),
                    this
                },
                matchesQuery: function(e, t) {
                    var n = t.toJSON();
                    return n.className = t.className,
                    this._addCondition(e, "$inQuery", n),
                    this
                },
                doesNotMatchQuery: function(e, t) {
                    var n = t.toJSON();
                    return n.className = t.className,
                    this._addCondition(e, "$notInQuery", n),
                    this
                },
                matchesKeyInQuery: function(e, t, n) {
                    var r = n.toJSON();
                    return r.className = n.className,
                    this._addCondition(e, "$select", {
                        key: t,
                        query: r
                    }),
                    this
                },
                doesNotMatchKeyInQuery: function(e, t, n) {
                    var r = n.toJSON();
                    return r.className = n.className,
                    this._addCondition(e, "$dontSelect", {
                        key: t,
                        query: r
                    }),
                    this
                },
                _orQuery: function(e) {
                    var t = r.map(e,
                    function(e) {
                        return e.toJSON().where
                    });
                    return this._where.$or = t,
                    this
                },
                _andQuery: function(e) {
                    var t = r.map(e,
                    function(e) {
                        return e.toJSON().where
                    });
                    return this._where.$and = t,
                    this
                },
                _quote: function(e) {
                    return "\\Q" + e.replace("\\E", "\\E\\\\E\\Q") + "\\E"
                },
                contains: function(e, t) {
                    return this._addCondition(e, "$regex", this._quote(t)),
                    this
                },
                startsWith: function(e, t) {
                    return this._addCondition(e, "$regex", "^" + this._quote(t)),
                    this
                },
                endsWith: function(e, t) {
                    return this._addCondition(e, "$regex", this._quote(t) + "$"),
                    this
                },
                ascending: function(e) {
                    return this._order = e,
                    this
                },
                addAscending: function(e) {
                    return this._order ? this._order += "," + e: this._order = e,
                    this
                },
                descending: function(e) {
                    return this._order = "-" + e,
                    this
                },
                addDescending: function(e) {
                    return this._order ? this._order += ",-" + e: this._order = "-" + e,
                    e
                },
                near: function(t, n) {
                    return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)),
                    this._addCondition(t, "$nearSphere", n),
                    this
                },
                withinRadians: function(e, t, n) {
                    return this.near(e, t),
                    this._addCondition(e, "$maxDistance", n),
                    this
                },
                withinMiles: function(e, t, n) {
                    return this.withinRadians(e, t, n / 3958.8)
                },
                withinKilometers: function(e, t, n) {
                    return this.withinRadians(e, t, n / 6371)
                },
                withinGeoBox: function(t, n, r) {
                    return n instanceof e.GeoPoint || (n = new e.GeoPoint(n)),
                    r instanceof e.GeoPoint || (r = new e.GeoPoint(r)),
                    this._addCondition(t, "$within", {
                        $box: [n, r]
                    }),
                    this
                },
                include: function() {
                    var t = this;
                    return e._arrayEach(arguments,
                    function(e) {
                        r.isArray(e) ? t._include = t._include.concat(e) : t._include.push(e)
                    }),
                    this
                },
                select: function() {
                    var t = this;
                    return this._select = this._select || [],
                    e._arrayEach(arguments,
                    function(e) {
                        r.isArray(e) ? t._select = t._select.concat(e) : t._select.push(e)
                    }),
                    this
                },
                each: function(t, n) {
                    if (n = n || {},
                    this._order || this._skip || this._limit >= 0) {
                        var i = "Cannot iterate on a query with sort, skip, or limit.";
                        return e.Promise.error(i)._thenRunCallbacks(n)
                    }
                    var s = (new e.Promise, new e.Query(this.objectClass));
                    s._limit = n.batchSize || 100,
                    s._where = r.clone(this._where),
                    s._include = r.clone(this._include),
                    s.ascending("objectId");
                    var a = !1;
                    return e.Promise._continueWhile(function() {
                        return ! a
                    },
                    function() {
                        return s.find().then(function(n) {
                            var r = e.Promise.as();
                            return e._.each(n,
                            function(e) {
                                r = r.then(function() {
                                    return t(e)
                                })
                            }),
                            r.then(function() {
                                n.length >= s._limit ? s.greaterThan("objectId", n[n.length - 1].id) : a = !0
                            })
                        })
                    })._thenRunCallbacks(n)
                }
            },
            e.FriendShipQuery = e.Query._extend({
                _objectClass: e.User,
                _newObject: function() {
                    return new e.User
                },
                _processResult: function(e) {
                    if (e && e[this._friendshipTag]) {
                        var t = e[this._friendshipTag];
                        return "Pointer" === t.__type && "_User" === t.className && (delete t.__type, delete t.className),
                        t
                    }
                    return null
                }
            })
        }
    },
    {
        underscore: 35
    }],
    23 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Relation = function(e, t) {
                if (!r.isString(t)) throw new TypeError("key must be a string");
                this.parent = e,
                this.key = t,
                this.targetClassName = null
            },
            e.Relation.reverseQuery = function(t, n, r) {
                var i = new e.Query(t);
                return i.equalTo(n, r._toPointer()),
                i
            },
            e.Relation.prototype = {
                _ensureParentAndKey: function(e, t) {
                    if (this.parent = this.parent || e, this.key = this.key || t, this.parent !== e) throw "Internal Error. Relation retrieved from two different Objects.";
                    if (this.key !== t) throw "Internal Error. Relation retrieved from two different keys."
                },
                add: function(t) {
                    r.isArray(t) || (t = [t]);
                    var n = new e.Op.Relation(t, []);
                    this.parent.set(this.key, n),
                    this.targetClassName = n._targetClassName
                },
                remove: function(t) {
                    r.isArray(t) || (t = [t]);
                    var n = new e.Op.Relation([], t);
                    this.parent.set(this.key, n),
                    this.targetClassName = n._targetClassName
                },
                toJSON: function() {
                    return {
                        __type: "Relation",
                        className: this.targetClassName
                    }
                },
                query: function() {
                    var t, n;
                    return this.targetClassName ? (t = e.Object._getSubclass(this.targetClassName), n = new e.Query(t)) : (t = e.Object._getSubclass(this.parent.className), n = new e.Query(t), n._extraOptions.redirectClassNameForKey = this.key),
                    n._addCondition("$relatedTo", "object", this.parent._toPointer()),
                    n._addCondition("$relatedTo", "key", this.key),
                    n
                }
            }
        }
    },
    {
        underscore: 35
    }],
    24 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Role = e.Object.extend("_Role", {
                constructor: function(t, n) {
                    if (r.isString(t) ? (e.Object.prototype.constructor.call(this, null, null), this.setName(t)) : e.Object.prototype.constructor.call(this, t, n), void 0 === n) {
                        var i = new e.ACL;
                        i.setPublicReadAccess(!0),
                        this.getACL() || this.setACL(i)
                    } else {
                        if (! (n instanceof e.ACL)) throw new TypeError("acl must be an instance of AV.ACL");
                        this.setACL(n)
                    }
                },
                getName: function() {
                    return this.get("name")
                },
                setName: function(e, t) {
                    return this.set("name", e, t)
                },
                getUsers: function() {
                    return this.relation("users")
                },
                getRoles: function() {
                    return this.relation("roles")
                },
                validate: function(t, n) {
                    if ("name" in t && t.name !== this.getName()) {
                        var i = t.name;
                        if (this.id && this.id !== t.objectId) return new e.Error(e.Error.OTHER_CAUSE, "A role's name can only be set before it has been saved.");
                        if (!r.isString(i)) return new e.Error(e.Error.OTHER_CAUSE, "A role's name must be a String.");
                        if (!/^[0-9a-zA-Z\-_ ]+$/.test(i)) return new e.Error(e.Error.OTHER_CAUSE, "A role's name can only contain alphanumeric characters, _, -, and spaces.")
                    }
                    return e.Object.prototype.validate ? e.Object.prototype.validate.call(this, t, n) : !1
                }
            })
        }
    },
    {
        underscore: 35
    }],
    25 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Router = function(e) {
                console.warn("AV.Router is deprecated, please don't use it anymore."),
                e = e || {},
                e.routes && (this.routes = e.routes),
                this._bindRoutes(),
                this.initialize.apply(this, arguments)
            };
            var t = /:\w+/g,
            n = /\*\w+/g,
            i = /[\-\[\]{}()+?.,\\\^\$\|#\s]/g;
            r.extend(e.Router.prototype, e.Events, {
                initialize: function() {},
                route: function(t, n, i) {
                    return e.history = e.history || new e.History,
                    r.isRegExp(t) || (t = this._routeToRegExp(t)),
                    i || (i = this[n]),
                    e.history.route(t, r.bind(function(r) {
                        var s = this._extractParameters(t, r);
                        i && i.apply(this, s),
                        this.trigger.apply(this, ["route:" + n].concat(s)),
                        e.history.trigger("route", this, n, s)
                    },
                    this)),
                    this
                },
                navigate: function(t, n) {
                    e.history.navigate(t, n)
                },
                _bindRoutes: function() {
                    if (this.routes) {
                        var e = [];
                        for (var t in this.routes) this.routes.hasOwnProperty(t) && e.unshift([t, this.routes[t]]);
                        for (var n = 0,
                        r = e.length; r > n; n++) this.route(e[n][0], e[n][1], this[e[n][1]])
                    }
                },
                _routeToRegExp: function(e) {
                    return e = e.replace(i, "\\$&").replace(t, "([^/]+)").replace(n, "(.*?)"),
                    new RegExp("^" + e + "$")
                },
                _extractParameters: function(e, t) {
                    return e.exec(t).slice(1)
                }
            }),
            e.Router.extend = e._extend
        }
    },
    {
        underscore: 35
    }],
    26 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.SearchSortBuilder = function() {
                this._sortFields = []
            },
            e.SearchSortBuilder.prototype = {
                _addField: function(e, t, n, r) {
                    var i = {};
                    return i[e] = {
                        order: t || "asc",
                        mode: n || "avg",
                        missing: "_" + (r || "last")
                    },
                    this._sortFields.push(i),
                    this
                },
                ascending: function(e, t, n) {
                    return this._addField(e, "asc", t, n)
                },
                descending: function(e, t, n) {
                    return this._addField(e, "desc", t, n)
                },
                whereNear: function(e, t, n) {
                    n = n || {};
                    var r = {},
                    i = {
                        lat: t.latitude,
                        lon: t.longitude
                    },
                    s = {
                        order: n.order || "asc",
                        mode: n.mode || "avg",
                        unit: n.unit || "km"
                    };
                    return s[e] = i,
                    r._geo_distance = s,
                    this._sortFields.push(r),
                    this
                },
                build: function() {
                    return JSON.stringify(e._encode(this._sortFields))
                }
            },
            e.SearchQuery = e.Query._extend({
                _sid: null,
                _hits: 0,
                _queryString: null,
                _highlights: null,
                _sortBuilder: null,
                _createRequest: function(t) {
                    return e._request("search/select", null, null, "GET", t || this.toJSON())
                },
                sid: function(e) {
                    return this._sid = e,
                    this
                },
                queryString: function(e) {
                    return this._queryString = e,
                    this
                },
                highlights: function(e) {
                    var t;
                    return t = e && r.isString(e) ? arguments: e,
                    this._highlights = t,
                    this
                },
                sortBy: function(e) {
                    return this._sortBuilder = e,
                    this
                },
                hits: function() {
                    return this._hits || (this._hits = 0),
                    this._hits
                },
                _processResult: function(e) {
                    return delete e.className,
                    delete e._app_url,
                    delete e._deeplink,
                    e
                },
                hasMore: function() {
                    return ! this._hitEnd
                },
                reset: function() {
                    this._hitEnd = !1,
                    this._sid = null,
                    this._hits = 0
                },
                find: function(e) {
                    var t = this,
                    n = this._createRequest();
                    return n.then(function(e) {
                        return e.sid ? (t._oldSid = t._sid, t._sid = e.sid) : (t._sid = null, t._hitEnd = !0),
                        t._hits = e.hits || 0,
                        r.map(e.results,
                        function(n) {
                            n.className && (e.className = n.className);
                            var r = t._newObject(e);
                            return r.appURL = n._app_url,
                            r._finishFetch(t._processResult(n), !0),
                            r
                        })
                    })._thenRunCallbacks(e)
                },
                toJSON: function() {
                    var t = e.SearchQuery.__super__.toJSON.call(this);
                    if (delete t.where, this.className && (t.clazz = this.className), this._sid && (t.sid = this._sid), !this._queryString) throw "Please set query string.";
                    if (t.q = this._queryString, this._highlights && (t.highlights = this._highlights.join(",")), this._sortBuilder && t.order) throw "sort and order can not be set at same time.";
                    return this._sortBuilder && (t.sort = this._sortBuilder.build()),
                    t
                }
            })
        }
    },
    {
        underscore: 35
    }],
    27 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.Status = function(e, t) {
                return this.data = {},
                this.inboxType = "default",
                this.query = null,
                e && "object" == typeof e ? this.data = e: (e && (this.data.image = e), t && (this.data.message = t)),
                this
            },
            e.Status.prototype = {
                get: function(e) {
                    return this.data[e]
                },
                set: function(e, t) {
                    return this.data[e] = t,
                    this
                },
                destroy: function(t) {
                    if (!this.id) return e.Promise.error("The status id is not exists.")._thenRunCallbacks(t);
                    var n = e._request("statuses", null, this.id, "DELETE");
                    return n._thenRunCallbacks(t)
                },
                toObject: function() {
                    return this.id ? e.Object.createWithoutData("_Status", this.id) : null
                },
                _getDataJSON: function() {
                    var t = e._.clone(this.data);
                    return e._encode(t)
                },
                send: function(t) {
                    if (!e.User.current()) throw "Please signin an user.";
                    if (!this.query) return e.Status.sendStatusToFollowers(this, t);
                    var n = this.query.toJSON();
                    n.className = this.query.className;
                    var r = {};
                    r.query = n,
                    this.data = this.data || {};
                    var i = e.Object.createWithoutData("_User", e.User.current().id)._toPointer();
                    this.data.source = this.data.source || i,
                    r.data = this._getDataJSON(),
                    r.inboxType = this.inboxType || "default";
                    var s = e._request("statuses", null, null, "POST", r),
                    a = this;
                    return s.then(function(t) {
                        return a.id = t.objectId,
                        a.createdAt = e._parseDate(t.createdAt),
                        a
                    })._thenRunCallbacks(t)
                },
                _finishFetch: function(t) {
                    this.id = t.objectId,
                    this.createdAt = e._parseDate(t.createdAt),
                    this.updatedAt = e._parseDate(t.updatedAt),
                    this.messageId = t.messageId,
                    delete t.messageId,
                    delete t.objectId,
                    delete t.createdAt,
                    delete t.updatedAt,
                    this.data = e._decode(void 0, t)
                }
            },
            e.Status.sendStatusToFollowers = function(t, n) {
                if (!e.User.current()) throw "Please signin an user.";
                var r = {};
                r.className = "_Follower",
                r.keys = "follower";
                var i = e.Object.createWithoutData("_User", e.User.current().id)._toPointer();
                r.where = {
                    user: i
                };
                var s = {};
                s.query = r,
                t.data = t.data || {},
                t.data.source = t.data.source || i,
                s.data = t._getDataJSON(),
                s.inboxType = t.inboxType || "default";
                var a = e._request("statuses", null, null, "POST", s);
                return a.then(function(n) {
                    return t.id = n.objectId,
                    t.createdAt = e._parseDate(n.createdAt),
                    t
                })._thenRunCallbacks(n)
            },
            e.Status.sendPrivateStatus = function(t, n, i) {
                if (!e.User.current()) throw "Please signin an user.";
                if (!n) throw "Invalid target user.";
                var s = r.isString(n) ? n: n.id;
                if (!s) throw "Invalid target user.";
                var a = {};
                a.className = "_User";
                var o = e.Object.createWithoutData("_User", e.User.current().id)._toPointer();
                a.where = {
                    objectId: s
                };
                var u = {};
                u.query = a,
                t.data = t.data || {},
                t.data.source = t.data.source || o,
                u.data = t._getDataJSON(),
                u.inboxType = "private",
                t.inboxType = "private";
                var c = e._request("statuses", null, null, "POST", u);
                return c.then(function(n) {
                    return t.id = n.objectId,
                    t.createdAt = e._parseDate(n.createdAt),
                    t
                })._thenRunCallbacks(i)
            },
            e.Status.countUnreadStatuses = function(t) {
                if (!e.User.current() && null == t) throw "Please signin an user or pass the owner objectId.";
                t = t || e.User.current();
                var n = r.isString(arguments[1]) ? arguments[2] : arguments[1],
                i = r.isString(arguments[1]) ? arguments[1] : "default",
                s = {};
                s.inboxType = e._encode(i),
                s.owner = e._encode(t);
                var a = e._request("subscribe/statuses/count", null, null, "GET", s);
                return a._thenRunCallbacks(n)
            },
            e.Status.statusQuery = function(t) {
                var n = new e.Query("_Status");
                return t && n.equalTo("source", t),
                n
            },
            e.InboxQuery = e.Query._extend({
                _objectClass: e.Status,
                _sinceId: 0,
                _maxId: 0,
                _inboxType: "default",
                _owner: null,
                _newObject: function() {
                    return new e.Status
                },
                _createRequest: function(t) {
                    return e._request("subscribe/statuses", null, null, "GET", t || this.toJSON())
                },
                sinceId: function(e) {
                    return this._sinceId = e,
                    this
                },
                maxId: function(e) {
                    return this._maxId = e,
                    this
                },
                owner: function(e) {
                    return this._owner = e,
                    this
                },
                inboxType: function(e) {
                    return this._inboxType = e,
                    this
                },
                toJSON: function() {
                    var t = e.InboxQuery.__super__.toJSON.call(this);
                    return t.owner = e._encode(this._owner),
                    t.inboxType = e._encode(this._inboxType),
                    t.sinceId = e._encode(this._sinceId),
                    t.maxId = e._encode(this._maxId),
                    t
                }
            }),
            e.Status.inboxQuery = function(t, n) {
                var r = new e.InboxQuery(e.Status);
                return t && (r._owner = t),
                n && (r._inboxType = n),
                r
            }
        }
    },
    {
        underscore: 35
    }],
    28 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.User = e.Object.extend("_User", {
                _isCurrentUser: !1,
                _mergeMagicFields: function(t) {
                    t.sessionToken && (this._sessionToken = t.sessionToken, delete t.sessionToken),
                    e.User.__super__._mergeMagicFields.call(this, t)
                },
                _cleanupAuthData: function() {
                    if (this.isCurrent()) {
                        var t = this.get("authData");
                        t && e._objectEach(this.get("authData"),
                        function(e, n) {
                            t[n] || delete t[n]
                        })
                    }
                },
                _synchronizeAllAuthData: function() {
                    var t = this.get("authData");
                    if (t) {
                        var n = this;
                        e._objectEach(this.get("authData"),
                        function(e, t) {
                            n._synchronizeAuthData(t)
                        })
                    }
                },
                _synchronizeAuthData: function(t) {
                    if (this.isCurrent()) {
                        var n;
                        r.isString(t) ? (n = t, t = e.User._authProviders[n]) : n = t.getAuthType();
                        var i = this.get("authData");
                        if (i && t) {
                            var s = t.restoreAuthentication(i[n]);
                            s || this._unlinkFrom(t)
                        }
                    }
                },
                _handleSaveResult: function(t) {
                    t && (this._isCurrentUser = !0),
                    this._cleanupAuthData(),
                    this._synchronizeAllAuthData(),
                    delete this._serverData.password,
                    this._rebuildEstimatedDataForKey("password"),
                    this._refreshCache(),
                    (t || this.isCurrent()) && e.User._saveCurrentUser(this)
                },
                _linkWith: function(t, n) {
                    var i;
                    if (r.isString(t) ? (i = t, t = e.User._authProviders[t]) : i = t.getAuthType(), r.has(n, "authData")) {
                        var s = this.get("authData") || {};
                        s[i] = n.authData,
                        this.set("authData", s);
                        var a = r.clone(n) || {};
                        return a.success = function(e) {
                            e._handleSaveResult(!0),
                            n.success && n.success.apply(this, arguments)
                        },
                        this.save({
                            authData: s
                        },
                        a)
                    }
                    var o = this,
                    u = new e.Promise;
                    return t.authenticate({
                        success: function(e, t) {
                            o._linkWith(e, {
                                authData: t,
                                success: n.success,
                                error: n.error
                            }).then(function() {
                                u.resolve(o)
                            })
                        },
                        error: function(e, t) {
                            n.error && n.error(o, t),
                            u.reject(t)
                        }
                    }),
                    u
                },
                _unlinkFrom: function(t, n) {
                    var i;
                    r.isString(t) ? (i = t, t = e.User._authProviders[t]) : i = t.getAuthType();
                    var s = r.clone(n),
                    a = this;
                    return s.authData = null,
                    s.success = function(e) {
                        a._synchronizeAuthData(t),
                        n.success && n.success.apply(this, arguments)
                    },
                    this._linkWith(t, s)
                },
                _isLinked: function(e) {
                    var t;
                    t = r.isString(e) ? e: e.getAuthType();
                    var n = this.get("authData") || {};
                    return !! n[t]
                },
                _logOutWithAll: function() {
                    var t = this.get("authData");
                    if (t) {
                        var n = this;
                        e._objectEach(this.get("authData"),
                        function(e, t) {
                            n._logOutWith(t)
                        })
                    }
                },
                _logOutWith: function(t) {
                    this.isCurrent() && (r.isString(t) && (t = e.User._authProviders[t]), t && t.deauthenticate && t.deauthenticate())
                },
                signUp: function(t, n) {
                    var i;
                    n = n || {};
                    var s = t && t.username || this.get("username");
                    if (!s || "" === s) return i = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up user with an empty name."),
                    n && n.error && n.error(this, i),
                    e.Promise.error(i);
                    var a = t && t.password || this.get("password");
                    if (!a || "" === a) return i = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up user with an empty password."),
                    n && n.error && n.error(this, i),
                    e.Promise.error(i);
                    var o = r.clone(n);
                    return o.success = function(e) {
                        e._handleSaveResult(!0),
                        n.success && n.success.apply(this, arguments)
                    },
                    this.save(t, o)
                },
                signUpOrlogInWithMobilePhone: function(t, n) {
                    var i;
                    n = n || {};
                    var s = t && t.mobilePhoneNumber || this.get("mobilePhoneNumber");
                    if (!s || "" === s) return i = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber with an empty mobilePhoneNumber."),
                    n && n.error && n.error(this, i),
                    e.Promise.error(i);
                    var a = t && t.smsCode || this.get("smsCode");
                    if (!a || "" === a) return i = new e.Error(e.Error.OTHER_CAUSE, "Cannot sign up or login user by mobilePhoneNumber  with an empty smsCode."),
                    n && n.error && n.error(this, i),
                    e.Promise.error(i);
                    var o = r.clone(n);
                    return o._makeRequest = function(t, n, r, i, s) {
                        return e._request("usersByMobilePhone", null, null, "POST", s)
                    },
                    o.success = function(e) {
                        e._handleSaveResult(!0),
                        delete e.attributes.smsCode,
                        delete e._serverData.smsCode,
                        n.success && n.success.apply(this, arguments)
                    },
                    this.save(t, o)
                },
                logIn: function(t) {
                    var n = this,
                    r = e._request("login", null, null, "GET", this.toJSON());
                    return r.then(function(e, t, r) {
                        var i = n.parse(e, t, r);
                        return n._finishFetch(i),
                        n._handleSaveResult(!0),
                        i.smsCode || delete n.attributes.smsCode,
                        n
                    })._thenRunCallbacks(t, this)
                },
                save: function(t, n, i) {
                    var s, a;
                    r.isObject(t) || r.isNull(t) || r.isUndefined(t) ? (s = t, a = n) : (s = {},
                    s[t] = n, a = i),
                    a = a || {};
                    var o = r.clone(a);
                    return o.success = function(e) {
                        e._handleSaveResult(!1),
                        a.success && a.success.apply(this, arguments)
                    },
                    e.Object.prototype.save.call(this, s, o)
                },
                follow: function(t, n) {
                    if (!this.id) throw "Please signin.";
                    if (!t) throw "Invalid target user.";
                    var i = r.isString(t) ? t: t.id;
                    if (!i) throw "Invalid target user.";
                    var s = "users/" + this.id + "/friendship/" + i,
                    a = e._request(s, null, null, "POST", null);
                    return a._thenRunCallbacks(n)
                },
                unfollow: function(t, n) {
                    if (!this.id) throw "Please signin.";
                    if (!t) throw "Invalid target user.";
                    var i = r.isString(t) ? t: t.id;
                    if (!i) throw "Invalid target user.";
                    var s = "users/" + this.id + "/friendship/" + i,
                    a = e._request(s, null, null, "DELETE", null);
                    return a._thenRunCallbacks(n)
                },
                followerQuery: function() {
                    return e.User.followerQuery(this.id)
                },
                followeeQuery: function() {
                    return e.User.followeeQuery(this.id)
                },
                fetch: function() {
                    var t = null,
                    n = {};
                    1 === arguments.length ? t = arguments[0] : 2 === arguments.length && (n = arguments[0], t = arguments[1]);
                    var i = t ? r.clone(t) : {};
                    return i.success = function(e) {
                        e._handleSaveResult(!1),
                        t && t.success && t.success.apply(this, arguments)
                    },
                    e.Object.prototype.fetch.call(this, n, i)
                },
                updatePassword: function(t, n, r) {
                    var i = "users/" + this.id + "/updatePassword",
                    s = {
                        old_password: t,
                        new_password: n
                    },
                    a = e._request(i, null, null, "PUT", s);
                    return a._thenRunCallbacks(r, this)
                },
                isCurrent: function() {
                    return this._isCurrentUser
                },
                getUsername: function() {
                    return this.get("username")
                },
                getMobilePhoneNumber: function() {
                    return this.get("mobilePhoneNumber")
                },
                setMobilePhoneNumber: function(e, t) {
                    return this.set("mobilePhoneNumber", e, t)
                },
                setUsername: function(e, t) {
                    return this.set("username", e, t)
                },
                setPassword: function(e, t) {
                    return this.set("password", e, t)
                },
                getEmail: function() {
                    return this.get("email")
                },
                setEmail: function(e, t) {
                    return this.set("email", e, t)
                },
                authenticated: function() {
                    return !! this._sessionToken && e.User.current() && e.User.current().id === this.id
                }
            },
            {
                _currentUser: null,
                _currentUserMatchesDisk: !1,
                _CURRENT_USER_KEY: "currentUser",
                _authProviders: {},
                signUp: function(t, n, r, i) {
                    r = r || {},
                    r.username = t,
                    r.password = n;
                    var s = e.Object._create("_User");
                    return s.signUp(r, i)
                },
                logIn: function(t, n, r) {
                    var i = e.Object._create("_User");
                    return i._finishFetch({
                        username: t,
                        password: n
                    }),
                    i.logIn(r)
                },
                become: function(t, n) {
                    n = n || {};
                    var r = e.Object._create("_User");
                    return e._request("users", "me", null, "GET", {
                        useMasterKey: n.useMasterKey,
                        session_token: t
                    }).then(function(e, t, n) {
                        var i = r.parse(e, t, n);
                        return r._finishFetch(i),
                        r._handleSaveResult(!0),
                        r
                    })._thenRunCallbacks(n, r)
                },
                logInWithMobilePhoneSmsCode: function(t, n, r) {
                    var i = e.Object._create("_User");
                    return i._finishFetch({
                        mobilePhoneNumber: t,
                        smsCode: n
                    }),
                    i.logIn(r)
                },
                signUpOrlogInWithMobilePhone: function(t, n, r, i) {
                    r = r || {},
                    r.mobilePhoneNumber = t,
                    r.smsCode = n;
                    var s = e.Object._create("_User");
                    return s.signUpOrlogInWithMobilePhone(r, i)
                },
                logInWithMobilePhone: function(t, n, r) {
                    var i = e.Object._create("_User");
                    return i._finishFetch({
                        mobilePhoneNumber: t,
                        password: n
                    }),
                    i.logIn(r)
                },
                logOut: function() {
                    null !== e.User._currentUser && (e.User._currentUser._logOutWithAll(), e.User._currentUser._isCurrentUser = !1),
                    e.User._currentUserMatchesDisk = !0,
                    e.User._currentUser = null,
                    e.localStorage.removeItem(e._getAVPath(e.User._CURRENT_USER_KEY))
                },
                followerQuery: function(t) {
                    if (!t || !r.isString(t)) throw "Invalid user object id.";
                    var n = new e.FriendShipQuery("_Follower");
                    return n._friendshipTag = "follower",
                    n.equalTo("user", e.Object.createWithoutData("_User", t)),
                    n
                },
                followeeQuery: function(t) {
                    if (!t || !r.isString(t)) throw "Invalid user object id.";
                    var n = new e.FriendShipQuery("_Followee");
                    return n._friendshipTag = "followee",
                    n.equalTo("user", e.Object.createWithoutData("_User", t)),
                    n
                },
                requestPasswordReset: function(t, n) {
                    var r = {
                        email: t
                    },
                    i = e._request("requestPasswordReset", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                requestEmailVerify: function(t, n) {
                    var r = {
                        email: t
                    },
                    i = e._request("requestEmailVerify", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                requestEmailVerfiy: function(t, n) {
                    var r = {
                        email: t
                    },
                    i = e._request("requestEmailVerify", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                requestMobilePhoneVerify: function(t, n) {
                    var r = {
                        mobilePhoneNumber: t
                    },
                    i = e._request("requestMobilePhoneVerify", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                requestPasswordResetBySmsCode: function(t, n) {
                    var r = {
                        mobilePhoneNumber: t
                    },
                    i = e._request("requestPasswordResetBySmsCode", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                resetPasswordBySmsCode: function(t, n, r) {
                    var i = {
                        password: n
                    },
                    s = e._request("resetPasswordBySmsCode", null, t, "PUT", i);
                    return s._thenRunCallbacks(r)
                },
                verifyMobilePhone: function(t, n) {
                    var r = e._request("verifyMobilePhone", null, t, "POST", null);
                    return r._thenRunCallbacks(n)
                },
                requestLoginSmsCode: function(t, n) {
                    var r = {
                        mobilePhoneNumber: t
                    },
                    i = e._request("requestLoginSmsCode", null, null, "POST", r);
                    return i._thenRunCallbacks(n)
                },
                current: function() {
                    if (e.User._currentUser) return e.User._currentUser;
                    if (e.User._currentUserMatchesDisk) return e.User._currentUser;
                    e.User._currentUserMatchesDisk = !0;
                    var t = e.localStorage.getItem(e._getAVPath(e.User._CURRENT_USER_KEY));
                    if (!t) return null;
                    e.User._currentUser = e.Object._create("_User"),
                    e.User._currentUser._isCurrentUser = !0;
                    var n = JSON.parse(t);
                    return e.User._currentUser.id = n._id,
                    delete n._id,
                    e.User._currentUser._sessionToken = n._sessionToken,
                    delete n._sessionToken,
                    e.User._currentUser._finishFetch(n),
                    e.User._currentUser._synchronizeAllAuthData(),
                    e.User._currentUser._refreshCache(),
                    e.User._currentUser._opSetQueue = [{}],
                    e.User._currentUser
                },
                _saveCurrentUser: function(t) {
                    e.User._currentUser !== t && e.User.logOut(),
                    t._isCurrentUser = !0,
                    e.User._currentUser = t,
                    e.User._currentUserMatchesDisk = !0;
                    var n = t.toJSON();
                    n._id = t.id,
                    n._sessionToken = t._sessionToken,
                    e.localStorage.setItem(e._getAVPath(e.User._CURRENT_USER_KEY), JSON.stringify(n))
                },
                _registerAuthenticationProvider: function(t) {
                    e.User._authProviders[t.getAuthType()] = t,
                    e.User.current() && e.User.current()._synchronizeAuthData(t.getAuthType())
                },
                _logInWith: function(t, n) {
                    var r = e.Object._create("_User");
                    return r._linkWith(t, n)
                }
            })
        }
    },
    {
        underscore: 35
    }],
    29 : [function(e, t, n) { (function(n) {
            "use strict";
            var r = e("underscore");
            t.exports = function(e) {
                e._config = e._config || {},
                r.extend(e._config, {
                    //???????????????
                    cnApiUrl: "https://api.leancloud.cn",
                    usApiUrl: "https://us-api.leancloud.cn"
                }),
                "undefined" != typeof $ && (e.$ = $);
                var t = function() {},
                i = function(n, r, i) {
                    var s;
                    return s = r && r.hasOwnProperty("constructor") ? r.constructor: function() {
                        n.apply(this, arguments)
                    },
                    e._.extend(s, n),
                    t.prototype = n.prototype,
                    s.prototype = new t,
                    r && e._.extend(s.prototype, r),
                    i && e._.extend(s, i),
                    s.prototype.constructor = s,
                    s.__super__ = n.prototype,
                    s
                };
                e.serverURL = "https://api.leancloud.cn",
                "undefined" != typeof n && n.versions && n.versions.node && (e._isNode = !0),
                e.initialize = function(t, n, r) {
                    if (r) throw new Error("AV.initialize() was passed a Master Key, which is only allowed from within Node.js.");
                    e._initialize(t, n, r)
                },
                e._initialize = function(t, n, r) {
                    void 0 !== e.applicationId && t !== e.applicationId && n !== e.applicationKey && r !== e.masterKey && console.warn("AVOSCloud SDK is already initialized, please don't reinitialize it."),
                    e.applicationId = t,
                    e.applicationKey = n,
                    e.masterKey = r,
                    e._useMasterKey = !1
                },
                e.setProduction = function(t) {
                    e._isNullOrUndefined(t) || (t = t ? 1 : 0),
                    e.applicationProduction = e._isNullOrUndefined(t) ? 1 : t
                },
                e._isNode && (e.initialize = e._initialize, e.Cloud = e.Cloud || {},
                e.Cloud.useMasterKey = function() {
                    e._useMasterKey = !0
                }),
                e.useAVCloudCN = function() {
                    e.serverURL = e._config.cnApiUrl
                },
                e.useAVCloudUS = function() {
                    e.serverURL = e._config.usApiUrl
                },
                e._getAVPath = function(t) {
                    if (!e.applicationId) throw "You need to call AV.initialize before using AV.";
                    if (t || (t = ""), !e._.isString(t)) throw "Tried to get a localStorage path that wasn't a String.";
                    return "/" === t[0] && (t = t.substring(1)),
                    "AV/" + e.applicationId + "/" + t
                },
                e._installationId = null,
                e._getInstallationId = function() {
                    if (e._installationId) return e._installationId;
                    var t = e._getAVPath("installationId");
                    if (e._installationId = e.localStorage.getItem(t), !e._installationId || "" === e._installationId) {
                        var n = function() {
                            return Math.floor(65536 * (1 + Math.random())).toString(16).substring(1)
                        };
                        e._installationId = n() + n() + "-" + n() + "-" + n() + "-" + n() + "-" + n() + n() + n(),
                        e.localStorage.setItem(t, e._installationId)
                    }
                    return e._installationId
                },
                e._parseDate = function(e) {
                    var t = new RegExp("^([0-9]{1,4})-([0-9]{1,2})-([0-9]{1,2})T([0-9]{1,2}):([0-9]{1,2}):([0-9]{1,2})(.([0-9]+))?Z$"),
                    n = t.exec(e);
                    if (!n) return null;
                    var r = n[1] || 0,
                    i = (n[2] || 1) - 1,
                    s = n[3] || 0,
                    a = n[4] || 0,
                    o = n[5] || 0,
                    u = n[6] || 0,
                    c = n[8] || 0;
                    return new Date(Date.UTC(r, i, s, a, o, u, c))
                },
                e._ajaxIE8 = function(t, n, r) {
                    var i = new e.Promise,
                    s = new XDomainRequest;
                    return s.onload = function() {
                        var e;
                        try {
                            e = JSON.parse(s.responseText)
                        } catch(t) {
                            i.reject(t)
                        }
                        e && i.resolve(e)
                    },
                    s.onerror = s.ontimeout = function() { ({
                            responseText: JSON.stringify({
                                code: e.Error.X_DOMAIN_REQUEST,
                                error: "IE's XDomainRequest does not supply error info."
                            })
                        });
                        i.reject(s)
                    },
                    s.onprogress = function() {},
                    s.open(t, n),
                    s.send(r),
                    i
                },
                e._useXDomainRequest = function() {
                    return "undefined" != typeof XDomainRequest ? "withCredentials" in new XMLHttpRequest ? !1 : !0 : !1
                },
                e._ajax = function(t, r, i, s, a) {
                    var o = {
                        success: s,
                        error: a
                    };
                    if (e._useXDomainRequest()) return e._ajaxIE8(t, r, i)._thenRunCallbacks(o);
                    var u = new e.Promise,
                    c = !1,
                    l = new e.XMLHttpRequest;
                    return l.onreadystatechange = function() {
                        if (4 === l.readyState) {
                            if (c) return;
                            if (c = !0, l.status >= 200 && l.status < 300) {
                                var e;
                                try {
                                    e = JSON.parse(l.responseText)
                                } catch(t) {
                                    u.reject(t)
                                }
                                e && u.resolve(e, l.status, l)
                            } else u.reject(l)
                        }
                    },
                    l.open(t, r, !0),
                    l.setRequestHeader("Content-Type", "text/plain"),
                    e._isNode && l.setRequestHeader("User-Agent", "AV/" + e.VERSION + " (NodeJS " + n.versions.node + ")"),
                    l.send(i),
                    u._thenRunCallbacks(o)
                },
                e._extend = function(e, t) {
                    var n = i(this, e, t);
                    return n.extend = this.extend,
                    n
                },
                e._request = function(t, n, r, i, s) {
                    if (!e.applicationId) throw "You must specify your applicationId using AV.initialize";
                    if (!e.applicationKey && !e.masterKey) throw "You must specify a key using AV.initialize";
                    if ("batch" !== t && "classes" !== t && "files" !== t && "date" !== t && "functions" !== t && "login" !== t && "push" !== t && "search/select" !== t && "requestPasswordReset" !== t && "requestEmailVerify" !== t && "requestPasswordResetBySmsCode" !== t && "resetPasswordBySmsCode" !== t && "requestMobilePhoneVerify" !== t && "requestLoginSmsCode" !== t && "verifyMobilePhone" !== t && "requestSmsCode" !== t && "verifySmsCode" !== t && "users" !== t && "usersByMobilePhone" !== t && "cloudQuery" !== t && "qiniu" !== t && "statuses" !== t && "bigquery" !== t && "search/select" !== t && "subscribe/statuses/count" !== t && "subscribe/statuses" !== t && !/users\/[^\/]+\/updatePassword/.test(t) && !/users\/[^\/]+\/friendship\/[^\/]+/.test(t)) throw "Bad route: '" + t + "'.";
                    var a = e.serverURL;
                    "/" !== a.charAt(a.length - 1) && (a += "/"),
                    a += "1.1/" + t,
                    n && (a += "/" + n),
                    r && (a += "/" + r),
                    "users" !== t && "classes" !== t || !s || (a += "?", s._fetchWhenSave && (delete s._fetchWhenSave, a += "&new=true"), s._where && (a += "&where=" + encodeURIComponent(JSON.stringify(s._where)), delete s._where)),
                    s = e._.clone(s || {}),
                    "POST" !== i && (s._method = i, i = "POST"),
                    s._ApplicationId = e.applicationId,
                    s._ApplicationKey = e.applicationKey,
                    e._isNullOrUndefined(e.applicationProduction) || (s._ApplicationProduction = e.applicationProduction),
                    e._useMasterKey && (s._MasterKey = e.masterKey),
                    s._ClientVersion = e.VERSION,
                    s._InstallationId = e._getInstallationId();
                    var o = e.User.current();
                    o && o._sessionToken && (s._SessionToken = o._sessionToken);
                    var u = JSON.stringify(s);
                    return e._ajax(i, a, u).then(null,
                    function(t) {
                        var n;
                        if (t && t.responseText) try {
                            var r = JSON.parse(t.responseText);
                            r && (n = new e.Error(r.code, r.error))
                        } catch(i) {}
                        return n = n || new e.Error( - 1, t.responseText),
                        e.Promise.error(n)
                    })
                },
                e._getValue = function(t, n) {
                    return t && t[n] ? e._.isFunction(t[n]) ? t[n]() : t[n] : null
                },
                e._encode = function(t, n, r) {
                    var i = e._;
                    if (t instanceof e.Object) {
                        if (r) throw "AV.Objects not allowed here";
                        if (!n || i.include(n, t) || !t._hasData) return t._toPointer();
                        if (!t.dirty()) return n = n.concat(t),
                        e._encode(t._toFullJSON(n), n, r);
                        throw "Tried to save an object with a pointer to a new, unsaved object."
                    }
                    if (t instanceof e.ACL) return t.toJSON();
                    if (i.isDate(t)) return {
                        __type: "Date",
                        iso: t.toJSON()
                    };
                    if (t instanceof e.GeoPoint) return t.toJSON();
                    if (i.isArray(t)) return i.map(t,
                    function(t) {
                        return e._encode(t, n, r)
                    });
                    if (i.isRegExp(t)) return t.source;
                    if (t instanceof e.Relation) return t.toJSON();
                    if (t instanceof e.Op) return t.toJSON();
                    if (t instanceof e.File) {
                        if (!t.url() && !t.id) throw "Tried to save an object containing an unsaved file.";
                        return {
                            __type: "File",
                            id: t.id,
                            name: t.name(),
                            url: t.url()
                        }
                    }
                    if (i.isObject(t)) {
                        var s = {};
                        return e._objectEach(t,
                        function(t, i) {
                            s[i] = e._encode(t, n, r)
                        }),
                        s
                    }
                    return t
                },
                e._decode = function(t, n) {
                    var r = e._;
                    if (!r.isObject(n)) return n;
                    if (r.isArray(n)) return e._arrayEach(n,
                    function(t, r) {
                        n[r] = e._decode(r, t)
                    }),
                    n;
                    if (n instanceof e.Object) return n;
                    if (n instanceof e.File) return n;
                    if (n instanceof e.Op) return n;
                    if (n.__op) return e.Op._decode(n);
                    if ("Pointer" === n.__type) {
                        var i = n.className,
                        s = e.Object._create(i);
                        return Object.keys(n).length > 3 ? (delete n.__type, delete n.className, s._finishFetch(n, !0)) : s._finishFetch({
                            objectId: n.objectId
                        },
                        !1),
                        s
                    }
                    if ("Object" === n.__type) {
                        var i = n.className;
                        delete n.__type,
                        delete n.className;
                        var a = e.Object._create(i);
                        return a._finishFetch(n, !0),
                        a
                    }
                    if ("Date" === n.__type) return e._parseDate(n.iso);
                    if ("GeoPoint" === n.__type) return new e.GeoPoint({
                        latitude: n.latitude,
                        longitude: n.longitude
                    });
                    if ("ACL" === t) return n instanceof e.ACL ? n: new e.ACL(n);
                    if ("Relation" === n.__type) {
                        var o = new e.Relation(null, t);
                        return o.targetClassName = n.className,
                        o
                    }
                    if ("File" === n.__type) {
                        var u = new e.File(n.name);
                        return u._metaData = n.metaData || {},
                        u._url = n.url,
                        u.id = n.objectId,
                        u
                    }
                    return e._objectEach(n,
                    function(t, r) {
                        n[r] = e._decode(r, t)
                    }),
                    n
                },
                e._arrayEach = e._.each,
                e._traverse = function(t, n, r) {
                    if (t instanceof e.Object) {
                        if (r = r || [], e._.indexOf(r, t) >= 0) return;
                        return r.push(t),
                        e._traverse(t.attributes, n, r),
                        n(t)
                    }
                    return t instanceof e.Relation || t instanceof e.File ? n(t) : e._.isArray(t) ? (e._.each(t,
                    function(i, s) {
                        var a = e._traverse(i, n, r);
                        a && (t[s] = a)
                    }), n(t)) : e._.isObject(t) ? (e._each(t,
                    function(i, s) {
                        var a = e._traverse(i, n, r);
                        a && (t[s] = a)
                    }), n(t)) : n(t)
                },
                e._objectEach = e._each = function(t, n) {
                    var r = e._;
                    r.isObject(t) ? r.each(r.keys(t),
                    function(e) {
                        n(t[e], e)
                    }) : r.each(t, n)
                },
                e._isNullOrUndefined = function(t) {
                    return e._.isNull(t) || e._.isUndefined(t)
                }
            }
        }).call(this, e("_process"))
    },
    {
        _process: 34,
        underscore: 35
    }],
    30 : [function(e, t, n) {
        "use strict";
        t.exports = "js0.6.10"
    },
    {}],
    31 : [function(e, t, n) {
        "use strict";
        var r = e("underscore");
        t.exports = function(e) {
            e.View = function(e) {
                console.warn("AV.View is deprecated, please don't use it anymore."),
                this.cid = r.uniqueId("view"),
                this._configure(e || {}),
                this._ensureElement(),
                this.initialize.apply(this, arguments),
                this.delegateEvents()
            };
            var t = /^(\S+)\s*(.*)$/,
            n = ["model", "collection", "el", "id", "attributes", "className", "tagName"];
            r.extend(e.View.prototype, e.Events, {
                tagName: "div",
                $: function(e) {
                    return this.$el.find(e)
                },
                initialize: function() {},
                render: function() {
                    return this
                },
                remove: function() {
                    return this.$el.remove(),
                    this
                },
                make: function(t, n, r) {
                    var i = document.createElement(t);
                    return n && e.$(i).attr(n),
                    r && e.$(i).html(r),
                    i
                },
                setElement: function(t, n) {
                    return this.$el = e.$(t),
                    this.el = this.$el[0],
                    n !== !1 && this.delegateEvents(),
                    this
                },
                delegateEvents: function(n) {
                    if (n = n || e._getValue(this, "events")) {
                        this.undelegateEvents();
                        var i = this;
                        e._objectEach(n,
                        function(e, s) {
                            if (r.isFunction(e) || (e = i[n[s]]), !e) throw new Error('Event "' + n[s] + '" does not exist');
                            var a = s.match(t),
                            o = a[1],
                            u = a[2];
                            e = r.bind(e, i),
                            o += ".delegateEvents" + i.cid,
                            "" === u ? i.$el.bind(o, e) : i.$el.delegate(u, o, e)
                        })
                    }
                },
                undelegateEvents: function() {
                    this.$el.unbind(".delegateEvents" + this.cid)
                },
                _configure: function(e) {
                    this.options && (e = r.extend({},
                    this.options, e));
                    var t = this;
                    r.each(n,
                    function(n) {
                        e[n] && (t[n] = e[n])
                    }),
                    this.options = e
                },
                _ensureElement: function() {
                    if (this.el) this.setElement(this.el, !1);
                    else {
                        var t = e._getValue(this, "attributes") || {};
                        this.id && (t.id = this.id),
                        this.className && (t["class"] = this.className),
                        this.setElement(this.make(this.tagName, t), !1)
                    }
                }
            }),
            e.View.extend = e._extend
        }
    },
    {
        underscore: 35
    }],
    32 : [function(e, t, n) { !
        function(e) {
            var r = {},
            i = {};
            r.length = 0,
            r.getItem = function(e) {
                return i[e] || null
            },
            r.setItem = function(e, t) {
                "undefined" == typeof t ? r.removeItem(e) : (i.hasOwnProperty(e) || r.length++, i[e] = "" + t)
            },
            r.removeItem = function(e) {
                i.hasOwnProperty(e) && (delete i[e], r.length--)
            },
            r.key = function(e) {
                return Object.keys(i)[e] || null
            },
            r.clear = function() {
                i = {},
                r.length = 0
            },
            "object" == typeof n ? t.exports = r: e.localStorageMemory = r
        } (this)
    },
    {}],
    33 : [function(e, t, n) { (function(e) {
            function t(e, t) {
                for (var n = 0,
                r = e.length - 1; r >= 0; r--) {
                    var i = e[r];
                    "." === i ? e.splice(r, 1) : ".." === i ? (e.splice(r, 1), n++) : n && (e.splice(r, 1), n--)
                }
                if (t) for (; n--; n) e.unshift("..");
                return e
            }
            function r(e, t) {
                if (e.filter) return e.filter(t);
                for (var n = [], r = 0; r < e.length; r++) t(e[r], r, e) && n.push(e[r]);
                return n
            }
            var i = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/,
            s = function(e) {
                return i.exec(e).slice(1)
            };
            n.resolve = function() {
                for (var n = "",
                i = !1,
                s = arguments.length - 1; s >= -1 && !i; s--) {
                    var a = s >= 0 ? arguments[s] : e.cwd();
                    if ("string" != typeof a) throw new TypeError("Arguments to path.resolve must be strings");
                    a && (n = a + "/" + n, i = "/" === a.charAt(0))
                }
                return n = t(r(n.split("/"),
                function(e) {
                    return !! e
                }), !i).join("/"),
                (i ? "/": "") + n || "."
            },
            n.normalize = function(e) {
                var i = n.isAbsolute(e),
                s = "/" === a(e, -1);
                return e = t(r(e.split("/"),
                function(e) {
                    return !! e
                }), !i).join("/"),
                e || i || (e = "."),
                e && s && (e += "/"),
                (i ? "/": "") + e
            },
            n.isAbsolute = function(e) {
                return "/" === e.charAt(0)
            },
            n.join = function() {
                var e = Array.prototype.slice.call(arguments, 0);
                return n.normalize(r(e,
                function(e, t) {
                    if ("string" != typeof e) throw new TypeError("Arguments to path.join must be strings");
                    return e
                }).join("/"))
            },
            n.relative = function(e, t) {
                function r(e) {
                    for (var t = 0; t < e.length && "" === e[t]; t++);
                    for (var n = e.length - 1; n >= 0 && "" === e[n]; n--);
                    return t > n ? [] : e.slice(t, n - t + 1)
                }
                e = n.resolve(e).substr(1),
                t = n.resolve(t).substr(1);
                for (var i = r(e.split("/")), s = r(t.split("/")), a = Math.min(i.length, s.length), o = a, u = 0; a > u; u++) if (i[u] !== s[u]) {
                    o = u;
                    break
                }
                for (var c = [], u = o; u < i.length; u++) c.push("..");
                return c = c.concat(s.slice(o)),
                c.join("/")
            },
            n.sep = "/",
            n.delimiter = ":",
            n.dirname = function(e) {
                var t = s(e),
                n = t[0],
                r = t[1];
                return n || r ? (r && (r = r.substr(0, r.length - 1)), n + r) : "."
            },
            n.basename = function(e, t) {
                var n = s(e)[2];
                return t && n.substr( - 1 * t.length) === t && (n = n.substr(0, n.length - t.length)),
                n
            },
            n.extname = function(e) {
                return s(e)[3]
            };
            var a = "b" === "ab".substr( - 1) ?
            function(e, t, n) {
                return e.substr(t, n)
            }: function(e, t, n) {
                return 0 > t && (t = e.length + t),
                e.substr(t, n)
            }
        }).call(this, e("_process"))
    },
    {
        _process: 34
    }],
    34 : [function(e, t, n) {
        function r() {
            l = !1,
            o.length ? c = o.concat(c) : h = -1,
            c.length && i()
        }
        function i() {
            if (!l) {
                var e = setTimeout(r);
                l = !0;
                for (var t = c.length; t;) {
                    for (o = c, c = []; ++h < t;) o && o[h].run();
                    h = -1,
                    t = c.length
                }
                o = null,
                l = !1,
                clearTimeout(e)
            }
        }
        function s(e, t) {
            this.fun = e,
            this.array = t
        }
        function a() {}
        var o, u = t.exports = {},
        c = [],
        l = !1,
        h = -1;
        u.nextTick = function(e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1) for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            c.push(new s(e, t)),
            1 !== c.length || l || setTimeout(i, 0)
        },
        s.prototype.run = function() {
            this.fun.apply(null, this.array)
        },
        u.title = "browser",
        u.browser = !0,
        u.env = {},
        u.argv = [],
        u.version = "",
        u.versions = {},
        u.on = a,
        u.addListener = a,
        u.once = a,
        u.off = a,
        u.removeListener = a,
        u.removeAllListeners = a,
        u.emit = a,
        u.binding = function(e) {
            throw new Error("process.binding is not supported")
        },
        u.cwd = function() {
            return "/"
        },
        u.chdir = function(e) {
            throw new Error("process.chdir is not supported")
        },
        u.umask = function() {
            return 0
        }
    },
    {}],
    35 : [function(e, t, n) { (function() {
            function e(e) {
                function t(t, n, r, i, s, a) {
                    for (; s >= 0 && a > s; s += e) {
                        var o = i ? i[s] : s;
                        r = n(r, t[o], o, t)
                    }
                    return r
                }
                return function(n, r, i, s) {
                    r = w(r, s, 4);
                    var a = !C(n) && y.keys(n),
                    o = (a || n).length,
                    u = e > 0 ? 0 : o - 1;
                    return arguments.length < 3 && (i = n[a ? a[u] : u], u += e),
                    t(n, r, i, a, u, o)
                }
            }
            function r(e) {
                return function(t, n, r) {
                    n = O(n, r);
                    for (var i = j(t), s = e > 0 ? 0 : i - 1; s >= 0 && i > s; s += e) if (n(t[s], s, t)) return s;
                    return - 1
                }
            }
            function i(e, t, n) {
                return function(r, i, s) {
                    var a = 0,
                    o = j(r);
                    if ("number" == typeof s) e > 0 ? a = s >= 0 ? s: Math.max(s + o, a) : o = s >= 0 ? Math.min(s + 1, o) : s + o + 1;
                    else if (n && s && o) return s = n(r, i),
                    r[s] === i ? s: -1;
                    if (i !== i) return s = t(f.call(r, a, o), y.isNaN),
                    s >= 0 ? s + a: -1;
                    for (s = e > 0 ? a: o - 1; s >= 0 && o > s; s += e) if (r[s] === i) return s;
                    return - 1
                }
            }
            function s(e, t) {
                var n = U.length,
                r = e.constructor,
                i = y.isFunction(r) && r.prototype || c,
                s = "constructor";
                for (y.has(e, s) && !y.contains(t, s) && t.push(s); n--;) s = U[n],
                s in e && e[s] !== i[s] && !y.contains(t, s) && t.push(s)
            }
            var a = this,
            o = a._,
            u = Array.prototype,
            c = Object.prototype,
            l = Function.prototype,
            h = u.push,
            f = u.slice,
            d = c.toString,
            p = c.hasOwnProperty,
            _ = Array.isArray,
            m = Object.keys,
            v = l.bind,
            g = Object.create,
            b = function() {},
            y = function(e) {
                return e instanceof y ? e: this instanceof y ? void(this._wrapped = e) : new y(e)
            };
            "undefined" != typeof n ? ("undefined" != typeof t && t.exports && (n = t.exports = y), n._ = y) : a._ = y,
            y.VERSION = "1.8.3";
            var w = function(e, t, n) {
                if (void 0 === t) return e;
                switch (null == n ? 3 : n) {
                case 1:
                    return function(n) {
                        return e.call(t, n)
                    };
                case 2:
                    return function(n, r) {
                        return e.call(t, n, r)
                    };
                case 3:
                    return function(n, r, i) {
                        return e.call(t, n, r, i)
                    };
                case 4:
                    return function(n, r, i, s) {
                        return e.call(t, n, r, i, s)
                    }
                }
                return function() {
                    return e.apply(t, arguments)
                }
            },
            O = function(e, t, n) {
                return null == e ? y.identity: y.isFunction(e) ? w(e, t, n) : y.isObject(e) ? y.matcher(e) : y.property(e)
            };
            y.iteratee = function(e, t) {
                return O(e, t, 1 / 0)
            };
            var S = function(e, t) {
                return function(n) {
                    var r = arguments.length;
                    if (2 > r || null == n) return n;
                    for (var i = 1; r > i; i++) for (var s = arguments[i], a = e(s), o = a.length, u = 0; o > u; u++) {
                        var c = a[u];
                        t && void 0 !== n[c] || (n[c] = s[c])
                    }
                    return n
                }
            },
            x = function(e) {
                if (!y.isObject(e)) return {};
                if (g) return g(e);
                b.prototype = e;
                var t = new b;
                return b.prototype = null,
                t
            },
            A = function(e) {
                return function(t) {
                    return null == t ? void 0 : t[e]
                }
            },
            E = Math.pow(2, 53) - 1,
            j = A("length"),
            C = function(e) {
                var t = j(e);
                return "number" == typeof t && t >= 0 && E >= t
            };
            y.each = y.forEach = function(e, t, n) {
                t = w(t, n);
                var r, i;
                if (C(e)) for (r = 0, i = e.length; i > r; r++) t(e[r], r, e);
                else {
                    var s = y.keys(e);
                    for (r = 0, i = s.length; i > r; r++) t(e[s[r]], s[r], e)
                }
                return e
            },
            y.map = y.collect = function(e, t, n) {
                t = O(t, n);
                for (var r = !C(e) && y.keys(e), i = (r || e).length, s = Array(i), a = 0; i > a; a++) {
                    var o = r ? r[a] : a;
                    s[a] = t(e[o], o, e)
                }
                return s
            },
            y.reduce = y.foldl = y.inject = e(1),
            y.reduceRight = y.foldr = e( - 1),
            y.find = y.detect = function(e, t, n) {
                var r;
                return r = C(e) ? y.findIndex(e, t, n) : y.findKey(e, t, n),
                void 0 !== r && -1 !== r ? e[r] : void 0
            },
            y.filter = y.select = function(e, t, n) {
                var r = [];
                return t = O(t, n),
                y.each(e,
                function(e, n, i) {
                    t(e, n, i) && r.push(e)
                }),
                r
            },
            y.reject = function(e, t, n) {
                return y.filter(e, y.negate(O(t)), n)
            },
            y.every = y.all = function(e, t, n) {
                t = O(t, n);
                for (var r = !C(e) && y.keys(e), i = (r || e).length, s = 0; i > s; s++) {
                    var a = r ? r[s] : s;
                    if (!t(e[a], a, e)) return ! 1
                }
                return ! 0
            },
            y.some = y.any = function(e, t, n) {
                t = O(t, n);
                for (var r = !C(e) && y.keys(e), i = (r || e).length, s = 0; i > s; s++) {
                    var a = r ? r[s] : s;
                    if (t(e[a], a, e)) return ! 0
                }
                return ! 1
            },
            y.contains = y.includes = y.include = function(e, t, n, r) {
                return C(e) || (e = y.values(e)),
                ("number" != typeof n || r) && (n = 0),
                y.indexOf(e, t, n) >= 0
            },
            y.invoke = function(e, t) {
                var n = f.call(arguments, 2),
                r = y.isFunction(t);
                return y.map(e,
                function(e) {
                    var i = r ? t: e[t];
                    return null == i ? i: i.apply(e, n)
                })
            },
            y.pluck = function(e, t) {
                return y.map(e, y.property(t))
            },
            y.where = function(e, t) {
                return y.filter(e, y.matcher(t))
            },
            y.findWhere = function(e, t) {
                return y.find(e, y.matcher(t))
            },
            y.max = function(e, t, n) {
                var r, i, s = -(1 / 0),
                a = -(1 / 0);
                if (null == t && null != e) {
                    e = C(e) ? e: y.values(e);
                    for (var o = 0,
                    u = e.length; u > o; o++) r = e[o],
                    r > s && (s = r)
                } else t = O(t, n),
                y.each(e,
                function(e, n, r) {
                    i = t(e, n, r),
                    (i > a || i === -(1 / 0) && s === -(1 / 0)) && (s = e, a = i)
                });
                return s
            },
            y.min = function(e, t, n) {
                var r, i, s = 1 / 0,
                a = 1 / 0;
                if (null == t && null != e) {
                    e = C(e) ? e: y.values(e);
                    for (var o = 0,
                    u = e.length; u > o; o++) r = e[o],
                    s > r && (s = r)
                } else t = O(t, n),
                y.each(e,
                function(e, n, r) {
                    i = t(e, n, r),
                    (a > i || i === 1 / 0 && s === 1 / 0) && (s = e, a = i)
                });
                return s
            },
            y.shuffle = function(e) {
                for (var t, n = C(e) ? e: y.values(e), r = n.length, i = Array(r), s = 0; r > s; s++) t = y.random(0, s),
                t !== s && (i[s] = i[t]),
                i[t] = n[s];
                return i
            },
            y.sample = function(e, t, n) {
                return null == t || n ? (C(e) || (e = y.values(e)), e[y.random(e.length - 1)]) : y.shuffle(e).slice(0, Math.max(0, t))
            },
            y.sortBy = function(e, t, n) {
                return t = O(t, n),
                y.pluck(y.map(e,
                function(e, n, r) {
                    return {
                        value: e,
                        index: n,
                        criteria: t(e, n, r)
                    }
                }).sort(function(e, t) {
                    var n = e.criteria,
                    r = t.criteria;
                    if (n !== r) {
                        if (n > r || void 0 === n) return 1;
                        if (r > n || void 0 === r) return - 1
                    }
                    return e.index - t.index
                }), "value")
            };
            var N = function(e) {
                return function(t, n, r) {
                    var i = {};
                    return n = O(n, r),
                    y.each(t,
                    function(r, s) {
                        var a = n(r, s, t);
                        e(i, r, a)
                    }),
                    i
                }
            };
            y.groupBy = N(function(e, t, n) {
                y.has(e, n) ? e[n].push(t) : e[n] = [t]
            }),
            y.indexBy = N(function(e, t, n) {
                e[n] = t
            }),
            y.countBy = N(function(e, t, n) {
                y.has(e, n) ? e[n]++:e[n] = 1
            }),
            y.toArray = function(e) {
                return e ? y.isArray(e) ? f.call(e) : C(e) ? y.map(e, y.identity) : y.values(e) : []
            },
            y.size = function(e) {
                return null == e ? 0 : C(e) ? e.length: y.keys(e).length
            },
            y.partition = function(e, t, n) {
                t = O(t, n);
                var r = [],
                i = [];
                return y.each(e,
                function(e, n, s) { (t(e, n, s) ? r: i).push(e)
                }),
                [r, i]
            },
            y.first = y.head = y.take = function(e, t, n) {
                return null != e ? null == t || n ? e[0] : y.initial(e, e.length - t) : void 0
            },
            y.initial = function(e, t, n) {
                return f.call(e, 0, Math.max(0, e.length - (null == t || n ? 1 : t)))
            },
            y.last = function(e, t, n) {
                return null != e ? null == t || n ? e[e.length - 1] : y.rest(e, Math.max(0, e.length - t)) : void 0
            },
            y.rest = y.tail = y.drop = function(e, t, n) {
                return f.call(e, null == t || n ? 1 : t)
            },
            y.compact = function(e) {
                return y.filter(e, y.identity)
            };
            var R = function(e, t, n, r) {
                for (var i = [], s = 0, a = r || 0, o = j(e); o > a; a++) {
                    var u = e[a];
                    if (C(u) && (y.isArray(u) || y.isArguments(u))) {
                        t || (u = R(u, t, n));
                        var c = 0,
                        l = u.length;
                        for (i.length += l; l > c;) i[s++] = u[c++]
                    } else n || (i[s++] = u)
                }
                return i
            };
            y.flatten = function(e, t) {
                return R(e, t, !1)
            },
            y.without = function(e) {
                return y.difference(e, f.call(arguments, 1))
            },
            y.uniq = y.unique = function(e, t, n, r) {
                y.isBoolean(t) || (r = n, n = t, t = !1),
                null != n && (n = O(n, r));
                for (var i = [], s = [], a = 0, o = j(e); o > a; a++) {
                    var u = e[a],
                    c = n ? n(u, a, e) : u;
                    t ? (a && s === c || i.push(u), s = c) : n ? y.contains(s, c) || (s.push(c), i.push(u)) : y.contains(i, u) || i.push(u)
                }
                return i
            },
            y.union = function() {
                return y.uniq(R(arguments, !0, !0))
            },
            y.intersection = function(e) {
                for (var t = [], n = arguments.length, r = 0, i = j(e); i > r; r++) {
                    var s = e[r];
                    if (!y.contains(t, s)) {
                        for (var a = 1; n > a && y.contains(arguments[a], s); a++);
                        a === n && t.push(s)
                    }
                }
                return t
            },
            y.difference = function(e) {
                var t = R(arguments, !0, !0, 1);
                return y.filter(e,
                function(e) {
                    return ! y.contains(t, e)
                })
            },
            y.zip = function() {
                return y.unzip(arguments)
            },
            y.unzip = function(e) {
                for (var t = e && y.max(e, j).length || 0, n = Array(t), r = 0; t > r; r++) n[r] = y.pluck(e, r);
                return n
            },
            y.object = function(e, t) {
                for (var n = {},
                r = 0,
                i = j(e); i > r; r++) t ? n[e[r]] = t[r] : n[e[r][0]] = e[r][1];
                return n
            },
            y.findIndex = r(1),
            y.findLastIndex = r( - 1),
            y.sortedIndex = function(e, t, n, r) {
                n = O(n, r, 1);
                for (var i = n(t), s = 0, a = j(e); a > s;) {
                    var o = Math.floor((s + a) / 2);
                    n(e[o]) < i ? s = o + 1 : a = o
                }
                return s
            },
            y.indexOf = i(1, y.findIndex, y.sortedIndex),
            y.lastIndexOf = i( - 1, y.findLastIndex),
            y.range = function(e, t, n) {
                null == t && (t = e || 0, e = 0),
                n = n || 1;
                for (var r = Math.max(Math.ceil((t - e) / n), 0), i = Array(r), s = 0; r > s; s++, e += n) i[s] = e;
                return i
            };
            var I = function(e, t, n, r, i) {
                if (! (r instanceof t)) return e.apply(n, i);
                var s = x(e.prototype),
                a = e.apply(s, i);
                return y.isObject(a) ? a: s
            };
            y.bind = function(e, t) {
                if (v && e.bind === v) return v.apply(e, f.call(arguments, 1));
                if (!y.isFunction(e)) throw new TypeError("Bind must be called on a function");
                var n = f.call(arguments, 2),
                r = function() {
                    return I(e, r, t, this, n.concat(f.call(arguments)))
                };
                return r
            },
            y.partial = function(e) {
                var t = f.call(arguments, 1),
                n = function() {
                    for (var r = 0,
                    i = t.length,
                    s = Array(i), a = 0; i > a; a++) s[a] = t[a] === y ? arguments[r++] : t[a];
                    for (; r < arguments.length;) s.push(arguments[r++]);
                    return I(e, n, this, this, s)
                };
                return n
            },
            y.bindAll = function(e) {
                var t, n, r = arguments.length;
                if (1 >= r) throw new Error("bindAll must be passed function names");
                for (t = 1; r > t; t++) n = arguments[t],
                e[n] = y.bind(e[n], e);
                return e
            },
            y.memoize = function(e, t) {
                var n = function(r) {
                    var i = n.cache,
                    s = "" + (t ? t.apply(this, arguments) : r);
                    return y.has(i, s) || (i[s] = e.apply(this, arguments)),
                    i[s]
                };
                return n.cache = {},
                n
            },
            y.delay = function(e, t) {
                var n = f.call(arguments, 2);
                return setTimeout(function() {
                    return e.apply(null, n)
                },
                t)
            },
            y.defer = y.partial(y.delay, y, 1),
            y.throttle = function(e, t, n) {
                var r, i, s, a = null,
                o = 0;
                n || (n = {});
                var u = function() {
                    o = n.leading === !1 ? 0 : y.now(),
                    a = null,
                    s = e.apply(r, i),
                    a || (r = i = null)
                };
                return function() {
                    var c = y.now();
                    o || n.leading !== !1 || (o = c);
                    var l = t - (c - o);
                    return r = this,
                    i = arguments,
                    0 >= l || l > t ? (a && (clearTimeout(a), a = null), o = c, s = e.apply(r, i), a || (r = i = null)) : a || n.trailing === !1 || (a = setTimeout(u, l)),
                    s
                }
            },
            y.debounce = function(e, t, n) {
                var r, i, s, a, o, u = function() {
                    var c = y.now() - a;
                    t > c && c >= 0 ? r = setTimeout(u, t - c) : (r = null, n || (o = e.apply(s, i), r || (s = i = null)))
                };
                return function() {
                    s = this,
                    i = arguments,
                    a = y.now();
                    var c = n && !r;
                    return r || (r = setTimeout(u, t)),
                    c && (o = e.apply(s, i), s = i = null),
                    o
                }
            },
            y.wrap = function(e, t) {
                return y.partial(t, e)
            },
            y.negate = function(e) {
                return function() {
                    return ! e.apply(this, arguments)
                }
            },
            y.compose = function() {
                var e = arguments,
                t = e.length - 1;
                return function() {
                    for (var n = t,
                    r = e[t].apply(this, arguments); n--;) r = e[n].call(this, r);
                    return r
                }
            },
            y.after = function(e, t) {
                return function() {
                    return--e < 1 ? t.apply(this, arguments) : void 0
                }
            },
            y.before = function(e, t) {
                var n;
                return function() {
                    return--e > 0 && (n = t.apply(this, arguments)),
                    1 >= e && (t = null),
                    n
                }
            },
            y.once = y.partial(y.before, 2);
            var P = !{
                toString: null
            }.propertyIsEnumerable("toString"),
            U = ["valueOf", "isPrototypeOf", "toString", "propertyIsEnumerable", "hasOwnProperty", "toLocaleString"];
            y.keys = function(e) {
                if (!y.isObject(e)) return [];
                if (m) return m(e);
                var t = [];
                for (var n in e) y.has(e, n) && t.push(n);
                return P && s(e, t),
                t
            },
            y.allKeys = function(e) {
                if (!y.isObject(e)) return [];
                var t = [];
                for (var n in e) t.push(n);
                return P && s(e, t),
                t
            },
            y.values = function(e) {
                for (var t = y.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = e[t[i]];
                return r
            },
            y.mapObject = function(e, t, n) {
                t = O(t, n);
                for (var r, i = y.keys(e), s = i.length, a = {},
                o = 0; s > o; o++) r = i[o],
                a[r] = t(e[r], r, e);
                return a
            },
            y.pairs = function(e) {
                for (var t = y.keys(e), n = t.length, r = Array(n), i = 0; n > i; i++) r[i] = [t[i], e[t[i]]];
                return r
            },
            y.invert = function(e) {
                for (var t = {},
                n = y.keys(e), r = 0, i = n.length; i > r; r++) t[e[n[r]]] = n[r];
                return t
            },
            y.functions = y.methods = function(e) {
                var t = [];
                for (var n in e) y.isFunction(e[n]) && t.push(n);
                return t.sort()
            },
            y.extend = S(y.allKeys),
            y.extendOwn = y.assign = S(y.keys),
            y.findKey = function(e, t, n) {
                t = O(t, n);
                for (var r, i = y.keys(e), s = 0, a = i.length; a > s; s++) if (r = i[s], t(e[r], r, e)) return r
            },
            y.pick = function(e, t, n) {
                var r, i, s = {},
                a = e;
                if (null == a) return s;
                y.isFunction(t) ? (i = y.allKeys(a), r = w(t, n)) : (i = R(arguments, !1, !1, 1), r = function(e, t, n) {
                    return t in n
                },
                a = Object(a));
                for (var o = 0,
                u = i.length; u > o; o++) {
                    var c = i[o],
                    l = a[c];
                    r(l, c, a) && (s[c] = l)
                }
                return s
            },
            y.omit = function(e, t, n) {
                if (y.isFunction(t)) t = y.negate(t);
                else {
                    var r = y.map(R(arguments, !1, !1, 1), String);
                    t = function(e, t) {
                        return ! y.contains(r, t)
                    }
                }
                return y.pick(e, t, n)
            },
            y.defaults = S(y.allKeys, !0),
            y.create = function(e, t) {
                var n = x(e);
                return t && y.extendOwn(n, t),
                n
            },
            y.clone = function(e) {
                return y.isObject(e) ? y.isArray(e) ? e.slice() : y.extend({},
                e) : e
            },
            y.tap = function(e, t) {
                return t(e),
                e
            },
            y.isMatch = function(e, t) {
                var n = y.keys(t),
                r = n.length;
                if (null == e) return ! r;
                for (var i = Object(e), s = 0; r > s; s++) {
                    var a = n[s];
                    if (t[a] !== i[a] || !(a in i)) return ! 1
                }
                return ! 0
            };
            var T = function(e, t, n, r) {
                if (e === t) return 0 !== e || 1 / e === 1 / t;
                if (null == e || null == t) return e === t;
                e instanceof y && (e = e._wrapped),
                t instanceof y && (t = t._wrapped);
                var i = d.call(e);
                if (i !== d.call(t)) return ! 1;
                switch (i) {
                case "[object RegExp]":
                case "[object String]":
                    return "" + e == "" + t;
                case "[object Number]":
                    return + e !== +e ? +t !== +t: 0 === +e ? 1 / +e === 1 / t: +e === +t;
                case "[object Date]":
                case "[object Boolean]":
                    return + e === +t
                }
                var s = "[object Array]" === i;
                if (!s) {
                    if ("object" != typeof e || "object" != typeof t) return ! 1;
                    var a = e.constructor,
                    o = t.constructor;
                    if (a !== o && !(y.isFunction(a) && a instanceof a && y.isFunction(o) && o instanceof o) && "constructor" in e && "constructor" in t) return ! 1
                }
                n = n || [],
                r = r || [];
                for (var u = n.length; u--;) if (n[u] === e) return r[u] === t;
                if (n.push(e), r.push(t), s) {
                    if (u = e.length, u !== t.length) return ! 1;
                    for (; u--;) if (!T(e[u], t[u], n, r)) return ! 1
                } else {
                    var c, l = y.keys(e);
                    if (u = l.length, y.keys(t).length !== u) return ! 1;
                    for (; u--;) if (c = l[u], !y.has(t, c) || !T(e[c], t[c], n, r)) return ! 1
                }
                return n.pop(),
                r.pop(),
                !0
            };
            y.isEqual = function(e, t) {
                return T(e, t)
            },
            y.isEmpty = function(e) {
                return null == e ? !0 : C(e) && (y.isArray(e) || y.isString(e) || y.isArguments(e)) ? 0 === e.length: 0 === y.keys(e).length
            },
            y.isElement = function(e) {
                return ! (!e || 1 !== e.nodeType)
            },
            y.isArray = _ ||
            function(e) {
                return "[object Array]" === d.call(e)
            },
            y.isObject = function(e) {
                var t = typeof e;
                return "function" === t || "object" === t && !!e
            },
            y.each(["Arguments", "Function", "String", "Number", "Date", "RegExp", "Error"],
            function(e) {
                y["is" + e] = function(t) {
                    return d.call(t) === "[object " + e + "]"
                }
            }),
            y.isArguments(arguments) || (y.isArguments = function(e) {
                return y.has(e, "callee")
            }),
            "function" != typeof / . / &&"object" != typeof Int8Array && (y.isFunction = function(e) {
                return "function" == typeof e || !1
            }),
            y.isFinite = function(e) {
                return isFinite(e) && !isNaN(parseFloat(e))
            },
            y.isNaN = function(e) {
                return y.isNumber(e) && e !== +e
            },
            y.isBoolean = function(e) {
                return e === !0 || e === !1 || "[object Boolean]" === d.call(e)
            },
            y.isNull = function(e) {
                return null === e
            },
            y.isUndefined = function(e) {
                return void 0 === e
            },
            y.has = function(e, t) {
                return null != e && p.call(e, t)
            },
            y.noConflict = function() {
                return a._ = o,
                this
            },
            y.identity = function(e) {
                return e
            },
            y.constant = function(e) {
                return function() {
                    return e
                }
            },
            y.noop = function() {},
            y.property = A,
            y.propertyOf = function(e) {
                return null == e ?
                function() {}: function(t) {
                    return e[t]
                }
            },
            y.matcher = y.matches = function(e) {
                return e = y.extendOwn({},
                e),
                function(t) {
                    return y.isMatch(t, e)
                }
            },
            y.times = function(e, t, n) {
                var r = Array(Math.max(0, e));
                t = w(t, n, 1);
                for (var i = 0; e > i; i++) r[i] = t(i);
                return r
            },
            y.random = function(e, t) {
                return null == t && (t = e, e = 0),
                e + Math.floor(Math.random() * (t - e + 1))
            },
            y.now = Date.now ||
            function() {
                return (new Date).getTime()
            };
            var k = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;"
            },
            D = y.invert(k),
            q = function(e) {
                var t = function(t) {
                    return e[t]
                },
                n = "(?:" + y.keys(e).join("|") + ")",
                r = RegExp(n),
                i = RegExp(n, "g");
                return function(e) {
                    return e = null == e ? "": "" + e,
                    r.test(e) ? e.replace(i, t) : e
                }
            };
            y.escape = q(k),
            y.unescape = q(D),
            y.result = function(e, t, n) {
                var r = null == e ? void 0 : e[t];
                return void 0 === r && (r = n),
                y.isFunction(r) ? r.call(e) : r
            };
            var F = 0;
            y.uniqueId = function(e) {
                var t = ++F + "";
                return e ? e + t: t
            },
            y.templateSettings = {
                evaluate: /<%([\s\S]+?)%>/g,
                interpolate: /<%=([\s\S]+?)%>/g,
                escape: /<%-([\s\S]+?)%>/g
            };
            var L = /(.)^/,
            M = {
                "'": "'",
                "\\": "\\",
                "\r": "r",
                "\n": "n",
                "\u2028": "u2028",
                "\u2029": "u2029"
            },
            V = /\\|'|\r|\n|\u2028|\u2029/g,
            J = function(e) {
                return "\\" + M[e]
            };
            y.template = function(e, t, n) { ! t && n && (t = n),
                t = y.defaults({},
                t, y.templateSettings);
                var r = RegExp([(t.escape || L).source, (t.interpolate || L).source, (t.evaluate || L).source].join("|") + "|$", "g"),
                i = 0,
                s = "__p+='";
                e.replace(r,
                function(t, n, r, a, o) {
                    return s += e.slice(i, o).replace(V, J),
                    i = o + t.length,
                    n ? s += "'+\n((__t=(" + n + "))==null?'':_.escape(__t))+\n'": r ? s += "'+\n((__t=(" + r + "))==null?'':__t)+\n'": a && (s += "';\n" + a + "\n__p+='"),
                    t
                }),
                s += "';\n",
                t.variable || (s = "with(obj||{}){\n" + s + "}\n"),
                s = "var __t,__p='',__j=Array.prototype.join,print=function(){__p+=__j.call(arguments,'');};\n" + s + "return __p;\n";
                try {
                    var a = new Function(t.variable || "obj", "_", s)
                } catch(o) {
                    throw o.source = s,
                    o
                }
                var u = function(e) {
                    return a.call(this, e, y)
                },
                c = t.variable || "obj";
                return u.source = "function(" + c + "){\n" + s + "}",
                u
            },
            y.chain = function(e) {
                var t = y(e);
                return t._chain = !0,
                t
            };
            var Q = function(e, t) {
                return e._chain ? y(t).chain() : t
            };
            y.mixin = function(e) {
                y.each(y.functions(e),
                function(t) {
                    var n = y[t] = e[t];
                    y.prototype[t] = function() {
                        var e = [this._wrapped];
                        return h.apply(e, arguments),
                        Q(this, n.apply(y, e))
                    }
                })
            },
            y.mixin(y),
            y.each(["pop", "push", "reverse", "shift", "sort", "splice", "unshift"],
            function(e) {
                var t = u[e];
                y.prototype[e] = function() {
                    var n = this._wrapped;
                    return t.apply(n, arguments),
                    "shift" !== e && "splice" !== e || 0 !== n.length || delete n[0],
                    Q(this, n)
                }
            }),
            y.each(["concat", "join", "slice"],
            function(e) {
                var t = u[e];
                y.prototype[e] = function() {
                    return Q(this, t.apply(this._wrapped, arguments))
                }
            }),
            y.prototype.value = function() {
                return this._wrapped
            },
            y.prototype.valueOf = y.prototype.toJSON = y.prototype.value,
            y.prototype.toString = function() {
                return "" + this._wrapped
            },
            "function" == typeof define && define.amd && define("underscore", [],
            function() {
                return y
            })
        }).call(this)
    },
    {}]
},
{},
[3]);