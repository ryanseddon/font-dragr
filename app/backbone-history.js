/* backbone-history.js */
(function () {
    var b = window.location,
        c = !! (window.history && window.history.pushState),
        d = /^#*/, _checkUrl = this.checkUrl;
    _.extend(Backbone.History.prototype, {
        getFragment: function (a) {
            a = a || window.location;
            return c ? a.pathname + a.search : a.hash.replace(d, "") || "/";
        },
        start: function () {
            if (c) $(window).bind("popstate", this.checkUrl);
            else if (b.pathname === "/") $(window).bind("hashchange", this.checkUrl);
            else {
                b.replace("/#" + b.pathname);
                return;
            }
			return this.loadUrl()
        },
        saveLocation: function (a) {
            a = (a || "").replace(d, "");
            if (this.fragment != a) {
                if (c) {
                    this.fragment = a;
                    history.pushState({
                        ts: (new Date).getTime()
                    }, document.title, a);
                } else window.location.hash = this.fragment = a;
                this.loadUrl(a)
            }
        },
		checkUrl: function (evt) {
			var loc = b.hash.split("#")[1] || b.pathname.split("/").reverse()[0];
			
			loc = (loc === "" || loc === "/") ? "home.tmpl" : loc.split(".")[0]+".tmpl";
			FD.appController.routeHandler(loc);
			_checkUrl(evt);
			evt.preventDefault();
		},
        loadUrl: function (a) {
			a = this.fragment = a || this.getFragment();
            var f = _.any(this.handlers, function (e) {
                if (e.route.test(a)) {
                    e.callback(a);
                    return true
                }
            });
            $(document).trigger("loadurl", a);
            return f;
        }
    })
})();