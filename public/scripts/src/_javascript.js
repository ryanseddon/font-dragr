/*
 * font dragr v2
 * http://www.thecssninja.com/javascript/font-dragr2
 * Copyright (c) 2011 Ryan Seddon 
 * released under the MIT License
 * http://www.fontdragr.com/license.txt
*/

var FD = FD || {};

(function(win){
	FD.version = "2.0.5";
	
	$(function(){
		// Collections
		FD.fonts = new FD.Fonts;
		FD.galleryFonts = new FD.GalleryFonts;
		FD.galleryFonts.add(FD.gallery);
		
		// Views
		FD.fontListView = new FD.FontListView;
		FD.fontEditorView = new FD.FontEditorView;
		FD.fontGalleryView = new FD.FontGalleryView(FD.galleryFonts.toJSON());
		
		// Routes
		FD.appRouter = new FD.AppRouter;
		Backbone.history.start({pushState: true});
		
		// Add dataTransfer to jQuery event object
		jQuery.event.props.push("dataTransfer");
		
		// No server side so turn sync into noop fn call
		Backbone.sync = function () {
			return false;
		};
		
		$(".container").delegate("li a", "click", function(evt){
			evt.preventDefault();
			
			var location = $(this).attr("href"),
				parent = $(this).parent();

			$(".container li").removeClass("active");
			parent.addClass("active");
			
			Backbone.history.navigate(location,true);
		});	
	});
})(this);