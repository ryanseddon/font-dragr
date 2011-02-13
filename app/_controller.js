FD.AppController = Backbone.Controller.extend({

	routes: {
		"": "home",
		"editor": "editor",
		"gallery/:font/:weight": "gallery"
	},

	home: function() {
		console.log(this);
	},
	
	editor: function() {
		console.log("editor");
	},

	gallery: function(font, weight) {
		console.log(font);
	}

});