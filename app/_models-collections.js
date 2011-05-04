FD.Font = Backbone.Model.extend({
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

FD.Fonts = Backbone.Collection.extend({ 
	model: FD.Font,
	
	initialize: function ( attributes ) {
		
	}
});

// Rather than create a new model for gallery fonts we'll extend the main Font model
FD.GalleryFont = FD.Font.extend({
	
});

FD.GalleryFonts = Backbone.Collection.extend({
	model: FD.GalleryFont
});

/*FD.fontGallery = new fontGallery([
	{},
	{},
	{},
	{},
	{},
	{}
]);*/