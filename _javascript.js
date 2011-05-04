/*
 * font dragr v2
 * http://www.thecssninja.com/javascript/font-dragr2
 * Copyright (c) 2010 Ryan Seddon 
 * released under the MIT License
 * http://www.fontdragr.com/license.txt
*/

var FD = FD || {};

(function(win){
	win.onload = function(){
		var nav = document.getElementsByTagName("nav")[0];
		
		// Collections
		FD.fonts = new FD.Fonts;
		FD.galleryFonts = new FD.GalleryFonts;
		
		// Views
		FD.fontListView = new FD.FontListView;
		FD.fontEditorView = new FD.FontEditorView;
		FD.fontGalleryView = new FD.FontGalleryView([
			{
				name: "VomZom",
				size: "15kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Strato",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Reenie Beanie",
				friendlyname: "ReenieBeanie",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Tangerine",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Vollkorn",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Lobster",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Null",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Ubuntu",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			},{
				name: "Gamaliel",
				size: "58kb",
				author: "D.Rock",
				authorurl: "http://defaulterror.com/typo.htm",
				license: "Free for personal and commercial use.",
				licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
			}
		]);
		
		// Controllers
		FD.appController = new FD.AppController;
		Backbone.history.start();
		
		// No server side so turn  sync into noop fn call
		Backbone.sync = function () {
			return false;
		};
		
		bean.add(nav, "a", "click", function(evt){
			var location = $(this).attr("href");
			
			$("nav li").removeClass("active");
			$(this).parent().addClass("active");
			Backbone.history.saveLocation(location);
			evt.preventDefault();
		}, qwery);
	}
})(this);