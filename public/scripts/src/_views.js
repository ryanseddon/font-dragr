FD.FontView = Backbone.View.extend({
	initialize: function () {
		_.bindAll(this, 'unactivateFont');
		this.model.bind('change', this.unactivateFont);
	},
	
	parent: $("#fonts"),
	
	events: {
		'click': 'handleFontChange'
	},
	
	tagName: 'li',
	
	className: '',
	
	template: FD.templates.fontView,
	
	handleFontChange: function (e) {
		var evt = e || event
			elem = $(this.el),
			key = e.which,
			type = e.type,
			model = this.model;
		
		FD.fontListView.resetActiveState(model.get("name"));
		
		model.set({active: true});
		
		elem.addClass("active");
		
		FD.fontEditorView.updateFont(model.get("name"));
	},
	
	unactivateFont: function () {
		$(this.el).removeClass("active");
	},
	
	render: function () {
		this.className = (this.model.get("active")) ? "active" : "";
		$(this.el).html(this.template(this.model.toJSON()));
		
		if(this.model.get("active")) {
			this.handleFontChange(this);
		}
		
		return this;
	}
});

FD.FontListView = Backbone.View.extend({
	id: $("#fonts"),
	
	tagName: "ul",
	
	initialize: function () {
		_.bindAll(this, 'addFont', 'render', 'handleDrop', 'preventActions');
		
		FD.fonts.bind("add", this.addFont);
		FD.fonts.add({
			name: "VomZom",
			size: "15kb",
			author: "D.Rock",
			authorurl: "http://defaulterror.com/typo.htm",
			license: "Free for personal and commercial use.",
			licenseurl: "http://defaulterror.com/typo.htm#Font%20License%20Information"
		});
		
		$("body").bind({
		  drop: this.handleDrop,
		  dragenter: function(e){ e.preventDefault(); },
		  dragover: function(e){ e.preventDefault(); }
		});
	},	
	
	addFont: function (font) {
		var fontView = new FD.FontView({model: font}),
			parent = $("#fonts");
		
		parent.append(fontView.render().el);
	},
	
	addAllFonts: function() {
		_.each(FD.fonts.models, function(model, i, list) {
			this.addFont(model);
		});
	},
	
	render: function() {
		_.each(FD.fonts.models, function(model, i, list) {
			FD.fontListView.addFont(model);
		});
	},
	
	resetActiveState: function(name) {
		_.each(FD.fonts.models, function(model, i, list) {
			if(model.get("name") !== name) {
				model.set({active:false});
			}
		});
	},
	
	handleDrop: function (e) {
		var	dt = e.dataTransfer,
			// IE doesn't like anything other than "Text"
			data = dt.getData(/*@cc_on!@*/0 ? "Text" : "text/plain")
			files = dt.files || false;
		
		if(files) {
			this.parseDroppedFonts(files);
		} else {
			this.parseDataFonts(data);
		}
		
		e.preventDefault();
	},
	
	parseDroppedFonts: function (files) {
		var file, droppedFullFileName, droppedFileName, droppedFileSize, font,
			count = files.length,
			acceptedFileExtensions = /^.*\.(ttf|otf|woff)$/i,
			reader = new FileReader(),
			url = window.URL || window.webkitURL,
			objURL = url.createObjectURL || false;
		
		for (var i = 0; i < count; i++) {
			file = files[i];
			droppedFullFileName = file.name;
			
			if(droppedFullFileName.match(acceptedFileExtensions)) {
				droppedFileName = droppedFullFileName.replace(/\..+$/,""); // Removes file extension from name
				droppedFileName = droppedFileName.replace(/\W+/g, "-"); // Replace any non alpha numeric characters with -
				droppedFileSize = Math.round(file.size/1024) + "kb";
				
				// If the browser supports referencing a file without having to load it into memory let's use it
				if(objURL) {
					font = url.createObjectURL(file);
					
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
					reader.onloadend = function (event) { FD.fontListView.addFontFace(event); };
					reader.readAsDataURL(file); 
				}
			} else {
				alert("Invalid file extension. Will only accept ttf, otf or woff font files");
			}
		}
	},
	
	parseDataFonts: function (data) {
		// Create crude JSON schema validator
		// Make sure data being parsed is valid JSON
		try {
			data = (typeof data == "string") ? JSON.parse(data) : data;
			if(!data.error) {
				var fontFileName = data.fontName.split("/").reverse()[0];
					fontFileName = fontFileName.replace(/\..+$/,"");
				
				data.fontSize = Math.round(data.fontSize/1024) + "kb";
				
				if(/*@cc_on!@*/0 && !!FD.ltIE9) {
					// IE can't do base64 fonts but it can load cross domain fonts. Pass url instead.
					data.fontDataURL = data.fontName;
				} else {
					data.fontDataURL = "data:application/octet-stream;base64," + data.fontDataURL;
				}
				
				this.addFontFace({
					target: {
						name: fontFileName,
						size: data.fontSize,
						license: data.fontLicense,
						licenseurl: data.fontLicenseUrl,
						author: data.fontAuthor,
						authorurl: data.fontAuthorUrl,
						result: data.fontDataURL
					}
				});
				
				delete data;
			} else {
				alert(data.error);
			}
		} catch(e) {
			alert("Data was not valid JSON.");
		}
	},
	
	addFontFace: function (data) {
		var target = data.target,
			name = target.name,
			size = target.size,
			license = target.license || "unknown",
			licenseurl = target.licenseurl || "",
			author = target.author || "unknown",
			authorurl = target.authorurl || "",
			font = target.result,
			isObjectURL = data.objectURL || false,
			dataURL, fontFaceStyle,
			styleSheet = document.styleSheets[0];
			
		if(!isObjectURL) {
			// Dodgy fork because Chrome 6 dev doesn't add media type to base64 string when a dropped file(s) type isn't known
			// http://code.google.com/p/chromium/issues/detail?id=48368
			dataURL = font.split("base64");
			
			if(!~dataURL[0].indexOf("application/octet-stream")) {
				dataURL[0] = "data:application/octet-stream;base64";
				
				font = dataURL[0] + dataURL[1];
			}
		}
		
		// Get font file and prepend it to stylsheet using @font-face rule
		fontFaceStyle = ["@font-face{font-family: ",name,"; src:url(",font,");}"].join('');
		if(!!styleSheet.insertRule) {
			styleSheet.insertRule(fontFaceStyle, 0);
		} else {
			styleSheet.cssText += fontFaceStyle;
		}
		
		FD.fonts.add({
			name: name,
			size: size,
			license: license,
			licenseurl: licenseurl,
			author: author,
			authorurl: authorurl,
			active: true,
			objURL: (isObjectURL) ? font : false
		});
	}
});

FD.FontEditorView = Backbone.View.extend({
	
	initialize: function () {
		_.bindAll(this, 'updateFont');
	},
	
	el: document.getElementById("wfs"),
	
	updateFont: function (font) {
		var fontname = $("#fontname");
		
		// Requery the DOM as element may not exist yet or it may not be on the page
		this.el = $("#wfs") || $(this.el);
		
		if(!!fontname[0] || !!this.el[0]) {
			fontname.text(font).css({"font-family":font});
			this.el.css({"font-family":font});
		}
		
	}
	
});

FD.FontGalleryView = Backbone.View.extend({
	
	initialize: function (models) {
		models = models || this.options;
		
		_.bindAll(this, 'template', 'render', 'requestFont');
		
		_.each(models,this.render);
	},
	
	el: $("#subcontainer"),
	
	template: FD.templates.galleryView,
	
	events: {
		'click .button': 'addFont'
	},
	
	addFont: function (evt) {
		var font, 
			elem = $(evt.target),
			name = elem.attr("data-font"),
			fonturl = elem[0].href+"index.json";
		
		_.each(this.options,function(k,i){
			if(k.name === name) {
				font = k;
			}
		});
		
		this.requestFont(fonturl, elem);
		
		evt.preventDefault();
	},
	
	requestFont: function (url, elem) {
		$.getJSON(url, function(data) {
			var font = $(elem),
				btns = $(".button",$("#subcontainer"));
			
			FD.fontGalleryView.fontData = JSON.stringify(data);
			
			btns.each( function( i, el ) {
				$(el)
					.removeAttr( "title" )
					.text("Load " + $(el).data("font"))
					.removeClass("loaded");
			});
			
			font
				.attr("title","Drag and drop me!")
				.text("Font loaded")
				.addClass("loaded")
				.bind("dragstart", function(evt) {
					// IE6-8 will only accept setData("Text")
					// setting this for every browser breaks ability to drag from different browser e.g. safari 4 to firefox 3.5 except IE7-8
					evt.dataTransfer.setData((/*@cc_on!@*/0 ? "Text" : "text/plain"), FD.fontGalleryView.fontData);
				});
			
			FD.fontListView.parseDataFonts(data);
		});
	},
	
	fontData: '',
	
	render: function (model) {
		this.el = $("#gallery") || $(this.el);
		this.el.append(this.template(model));
		
		return this;
	}
});