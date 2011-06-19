FD.AppRouter = Backbone.Router.extend({

	routes: {
		"/": "home",
		"editor.html": "editor",
		"gallery.html": "gallery"
	},

	home: function() {
		this.routeHandler("home.tmpl");
	},
	
	editor: function() {
		this.routeHandler("editor.tmpl");
	},

	gallery: function() {
		this.routeHandler("gallery.tmpl");
	},
	
	routeHandler: function(tmpl) {
		var localstorage = window.localStorage,
			localData = localstorage.getItem("fd-"+tmpl),
			busta = localstorage.getItem("fd-version-"+tmpl) === FD.version,
			subcontainer = $("#subcontainer");
			
		if(localstorage && localData && busta) {
			// Force innerHTML since IE8< cracks the shits when injecting with jQuery.html()
			subcontainer[0].innerHTML = localData;
			FD.fontListView.render();
		} else {
			$.ajax({
				url: "app/"+tmpl,
				success: function (resp) {
					subcontainer.html(resp);
					localstorage.setItem("fd-version-"+tmpl,FD.version);
					
					if(!!~tmpl.indexOf("gallery")) {
						// On initial load click event is attached twice, remove first.
						$("#subcontainer").undelegate(".button", "click");
						FD.fontGalleryView = new FD.FontGalleryView(FD.gallery);
						localstorage.setItem("fd-"+tmpl,subcontainer.html());
					} else {
						localstorage.setItem("fd-"+tmpl,resp);
					}
					
					FD.fontListView.render();
				},
				failure: function (err) { }
			});
		}
	}

});