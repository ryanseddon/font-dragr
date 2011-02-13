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
		
		// Collections
		FD.fontCollection = new FD.fonts;
		
		// Views
		FD.App = new FD.fontListView;
		FD.AppEditor = new FD.fontEditorView;
		FD.AppGallery = new FD.fontGalleryView;
		
		// Controllers
		FD.Controller = new FD.AppController;
		Backbone.history.start();
		
		Backbone.sync = function () {
			return false;
		};
		
	}
})(this);