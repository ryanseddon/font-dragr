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
			busta = localstorage.getItem("fd-version-"+tmpl) === FD.version;
			
		if(localstorage && localData && busta) {
			document.getElementById("subcontainer").innerHTML = localData;
			FD.fontListView.render();
		} else {
			reqwest({
			  url: "app/"+tmpl,
			  method: 'get',
			  type: 'html',
			  success: function (resp) {
				document.getElementById("subcontainer").innerHTML = resp;
				localstorage.setItem("fd-version-"+tmpl,FD.version);
				
				if(!!~tmpl.indexOf("gallery")) {
					FD.fontGalleryView = new FD.FontGalleryView(FD.gallery);
					localstorage.setItem("fd-"+tmpl,document.getElementById("subcontainer").innerHTML);
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