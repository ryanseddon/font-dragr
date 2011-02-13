FD.font = Backbone.Model.extend({
	initialize: function ( attributes ) {
		this.bind("add",this.syncDroppedFonts);
	},
	defaults: {
		size: "35kb", // if for some reason we fail to get font size fake it.
		active: false,
		license: "unknown",
		licenseurl: "#",
		author: "unknown",
		authorurl: "#"
	},
	validate: function ( attributes ) {
		
	},
	syncDroppedFonts: function () {
		//this.save();
	}
});

FD.fonts = Backbone.Collection.extend({ 
	model: FD.font,
	
	initialize: function ( attributes ) {
		
	}
});

var fontGallery = Backbone.Collection.extend({});

/*FD.fontGallery = new fontGallery([
	{},
	{},
	{},
	{},
	{},
	{}
]);*/