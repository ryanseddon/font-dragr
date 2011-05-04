FD.AppController = Backbone.Controller.extend({

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

	gallery: function(font, weight) {
		this.routeHandler("gallery.tmpl");
	},
	
	routeHandler: function(tmpl) {
		var localstorage = window.localStorage,
			cacheBuster = "2.0.1",
			localData = localstorage.getItem("fd-"+tmpl),
			busta = localstorage.getItem("fd-version") === cacheBuster;
			
		if(localstorage && localData && busta) {
			document.getElementById("subcontainer").innerHTML = localData;
			FD.fontListView.render();
		} else {
			$.get("app/"+tmpl,function(e){
				document.getElementById("subcontainer").innerHTML = e;
				localstorage.setItem("fd-"+tmpl,e);
				localstorage.setItem("fd-version",cacheBuster);
				FD.fontListView.render();
				//FD.fontGalleryView.initialize();
			},"text");
		}
	}

});