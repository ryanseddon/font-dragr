FD.fontView = Backbone.View.extend({
	initialize: function () {
		var fonts = document.getElementById("fonts");
		
		_.bindAll(this, 'unactivateFont');
		this.model.bind('change', this.unactivateFont);
	},
	
	parent: document.getElementById("fonts"),
	
	events: {
		'click': 'handleFontChange'
	},
	
	tagName: 'li',
	
	className: '',
	
	template: _.template([
		'<div class="<%= active ? \'active"\' : \'\' %>" style="font-family: \'<%= name %>\';" tabindex="0">',
			'<span><%= name %></span>',
			'<div class="info01" tabindex="0">',
				'<ul>',
					'<li class="title"><strong style="font-family: \'<%= name %>\';"><%= name %></strong></li>',
					'<li><strong>Size:</strong> <%= size %> </li>',
					'<li><strong>Author:</strong> <a href="<%= authorurl %>"><%= author %></a> </li>',
					'<li><strong>License:</strong> <a href="<%= licenseurl %>"><%= license %></a></li>',
				'</ul>',
			'</div>',
		'</div>'
	].join('')),
	
	handleFontChange: function (e,t) {
		var evt = e || event,
			elem = this.el,
			model = this.model;
		
		FD.App.resetActiveState(model.get("name"));
		
		model.set({active: true});
		
		elem.className = "active";
		
		FD.AppEditor.updateFont(model.get("name"));
	},
	
	unactivateFont: function () {
		this.el.className = "";
	},
	
	render: function () {
		this.className = (this.model.get("active")) ? "active" : "";
		this.el.innerHTML = this.template(this.model.toJSON());
		
		if(this.model.get("active")) {
			this.handleFontChange(this);
		}
		
		return this;
	}
});

FD.fontListView = Backbone.View.extend({
	id: document.getElementById("fonts"),
	
	tagName: "ul",
	
	initialize: function () {
		var dnd = document;
		
		_.bindAll(this, 'addFont', 'render', 'handleDrop', 'preventActions');
		
		FD.fontCollection.bind("add", this.addFont);
		FD.fontCollection.add({
			name: "VomZom",
			size: "15kb",
			author: "D.Rock",
			authorurl: "http://defaulterror.com/typo.htm",
			license: "Free for personal and commercial use.",
			licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
		});
		
		dnd.addEventListener("drop",this.handleDrop,false);
		dnd.addEventListener("dragenter",this.preventActions,false);
		dnd.addEventListener("dragover",this.preventActions,false);
	},	
	
	addFont: function (font) {
		var fontView = new FD.fontView({model: font}),
			parent = document.getElementById("fonts");
		
		parent.appendChild(fontView.render().el);
	},
	
	addAllFonts: function() {
		_.each(FD.fontCollection.models, function(model, i, list) {
			this.addFont(model);
		});
	},
	
	resetActiveState: function(name) {
		_.each(FD.fontCollection.models, function(model, i, list) {
			if(model.get("name") !== name) {
				model.set({active:false});
			}
		});
	},
	
	handleDrop: function (e) {
			e = e || event;
		var dt = e.dataTransfer,
			// IE8 doesn't like anything other than "Text"
			data = ((/*@cc_on!@*/0) ? dt.getData("Text") : dt.getData("text/plain")),
			files = dt.files || false;
		
		if(files && !data) {
			this.parseDroppedFonts(files);
		} else {
			this.parseDataFonts(data);
		}
		
		this.preventActions(e);
	},
	
	parseDroppedFonts: function (files) {
		var file, droppedFullFileName, droppedFileName, droppedFileSize, font,
			count = files.length,
			acceptedFileExtensions = /^.*\.(ttf|otf|woff)$/i,
			reader = new FileReader();
		
		for (var i = 0; i < count; i++) {
			file = files[i];
			droppedFullFileName = file.name;
			
			if(droppedFullFileName.match(acceptedFileExtensions)) {
				droppedFileName = droppedFullFileName.replace(/\..+$/,""); // Removes file extension from name
				droppedFileName = droppedFileName.replace(/\W+/g, "-"); // Replace any non alpha numeric characters with -
				droppedFileSize = Math.round(file.size/1024) + "kb";
				
				// If the browser supports referencing a file without having to load it into memory let's use it
				if("createObjectURL" in window || "URL" in window && "createObjectURL" in window.URL || "webkitURL" in window && "createObjectURL" in window.webkitURL) {
					if("createObjectURL" in window) {
						// Chrome exposes create/revokeObjectURL directly on window
						font = window.createObjectURL(file);
					} else if("webkitURL" in window) {
						// Chrome exposes create/revokeObjectURL on the new webkitURL API
						font = window.webkitURL.createObjectURL(file);
					} else {
						// FF4 exposes create/revokeObjectURL on the new URL API
						font = window.URL.createObjectURL(file);
					}
					this.addFontFace({
						target: {
							result: font,
							name: droppedFileName,
							size: droppedFileSize
						},
						objectURL: true
					});
				} else {
					reader.name = droppedFileName;
					reader.size = droppedFileSize;
					
					/* 
					   Chrome 6 dev can't do DOM2 event based listeners on the FileReader object so fallback to DOM0
					   http://code.google.com/p/chromium/issues/detail?id=48367
					   reader.addEventListener("loadend", FD.App.addFontFace(event);, false);
					*/
					reader.onloadend = function (event) { FD.App.addFontFace(event); };
					reader.readAsDataURL(file); 
				}
			} else {
				alert("Invalid file extension. Will only accept ttf, otf or woff font files");
			}
		}
	},
	
	parseDataFonts: function (data) {
		// Create crude JSON schema validator
	},
	
	addFontFace: function (data) {
		var name = data.target.name,
			size = data.target.size,
			font = data.target.result,
			isObjectURL = data.objectURL,
			dataURL, fontFaceStyle,
			styleSheet = document.styleSheets[0];
			
		if(!isObjectURL) {
			// Dodgy fork because Chrome 6 dev doesn't add media type to base64 string when a dropped file(s) type isn't known
			// http://code.google.com/p/chromium/issues/detail?id=48368
			dataURL = font.split("base64");
			
			if(dataURL[0].indexOf("application/octet-stream") == -1) {
				dataURL[0] = "data:application/octet-stream;base64";
				
				font = dataURL[0] + dataURL[1];
			}
		}
		
		// Get font file and prepend it to stylsheet using @font-face rule
		fontFaceStyle = ["@font-face{font-family: ",name,"; src:url(",font,");}"].join('');
		if(!!styleSheet.insertRule) {
			styleSheet.insertRule(fontFaceStyle, 0);
		} else {
			styleSheet.cssText = fontFaceStyle;
		}
		
		FD.fontCollection.add({
			name: name,
			size: size,
			active: true,
			objURL: (isObjectURL) ? font : false
		});
	},
	
	preventActions: function (evt) {
		evt = evt || window.event;
		if(evt.stopPropagation && evt.preventDefault) {
			evt.stopPropagation();
			evt.preventDefault();
		} else {
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
	}
});

FD.fontEditorView = Backbone.View.extend({
	
	initialize: function () {
		_.bindAll(this, 'updateFont');
	},
	
	el: document.getElementById("wfs"),
	
	updateFont: function (font) {
		var fontname = document.getElementById("fontname");
		
		if(!!fontname) {
			fontname.innerHTML = font;
			fontname.style.fontFamily = font;
		}
		this.el.style.fontFamily = font;
	}
	
});

FD.fontGalleryView = Backbone.View.extend({
	
	initialize: function () {
		_.bindAll(this, 'updateFont');
	},
	
	slab: document.getElementById("wfs"),
	
	updateFont: function (font) {
		var fontname = document.getElementById("fontname");
		
		if(!!fontname) {
			fontname.innerHTML = font;
			fontname.style.fontFamily = font;
		}
		this.el.style.fontFamily = font;
	}
	
});