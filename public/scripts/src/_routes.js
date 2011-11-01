FD.AppRouter = Backbone.Router.extend({

	routes: {
		"/": "home",
		"editor": "editor",
		"gallery": "gallery"
	},

	home: function() {
		this.routeHandler("/");
	},
	
	editor: function() {
		this.routeHandler("editor");
	},

	gallery: function() {
		this.routeHandler("gallery");
	},
	
	routeHandler: function(tmpl) {
		var localstorage = window.localStorage,
			view = (tmpl === "/") ? "home" : tmpl,
			localData = localstorage.getItem("fd-"+view),
			busta = localstorage.getItem("fd-version-"+view) === FD.version,
			container = $(".container"),
			subcontainer = $("#subcontainer");
		
		// Highlight nav item
		$("li",container).removeClass("active");
		$("a[href$='"+ tmpl +"']",container).parent().addClass("active");
		
		if(localstorage && localData && busta) {
			// Force innerHTML since IE8< cracks the shits when injecting with jQuery.html()
			subcontainer[0].innerHTML = localData;
			FD.fontListView.render();
		} else {
			$.ajax({
				url: tmpl,
				success: function (resp) {
					subcontainer.html(resp);
					localstorage.setItem("fd-version-"+view,FD.version);
					
					if(!!~tmpl.indexOf("gallery")) {
						// On initial load click event is attached twice, remove first.
						$("#subcontainer").undelegate(".button", "click");
						FD.fontGalleryView = new FD.FontGalleryView(FD.gallery);
						localstorage.setItem("fd-"+view,subcontainer.html());
					} else {
						localstorage.setItem("fd-"+view,resp);
					}
					
					FD.fontListView.render();
				},
				failure: function (err) { }
			});
		}
	}

});