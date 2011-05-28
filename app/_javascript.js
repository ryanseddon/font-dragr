/*
 * font dragr v2
 * http://www.thecssninja.com/javascript/font-dragr2
 * Copyright (c) 2010 Ryan Seddon 
 * released under the MIT License
 * http://www.fontdragr.com/license.txt
*/

var FD = FD || {};

(function(win){
	var nav = document.getElementsByTagName("nav")[0];
	
	FD.version = "2.0.1";
	
	function $(selector) {
	  return bonzo(qwery(selector));
	}
	bonzo.aug(bonzo, $);
	
	bean.add(win, "load",function(){
		// Collections
		FD.fonts = new FD.Fonts;
		FD.galleryFonts = new FD.GalleryFonts;
		
		// Views
		FD.fontListView = new FD.FontListView;
		FD.fontEditorView = new FD.FontEditorView;
		FD.fontGalleryView = new FD.FontGalleryView(FD.gallery);
		
		// Controllers
		FD.appRouter = new FD.AppRouter;
		Backbone.history.start({pushState: true});
		
		// No server side so turn sync into noop fn call
		Backbone.sync = function () {
			return false;
		};
		
		bean.add(nav, "a", "click", function(evt){
			var location = $(this).attr("href"),
				parent = evt.target.parentNode;

			$("nav li").removeClass("active");
			$(parent).addClass("active");
			Backbone.history.saveLocation(location);
			evt.preventDefault();
		}, qwery);	
	});
})(this);