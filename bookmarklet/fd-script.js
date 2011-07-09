/*
 * font dragr v2 bookmarklet
 * http://www.fontdrag.com/
 * Copyright (c) 2011 Ryan Seddon 
 * released under the MIT License
 * http://www.fontdragr.com/license.txt
*/

/* Bookmarklet code
** javascript:(function(d){var s=d.createElement('script'),h=d.head||d.getElementsByTagName('head')[0];s.src='http://labs.thecssninja.com/font_dragr/dev/bookmarklet/fd-script.js';h.appendChild(s);})(document);
*/

var FD = FD || {};

(function(win, doc){
	
	var html = '<div id=fontdragr><div class=logo>fd</div><label>Fonts:<select id=fd-fonts><option value=sans-serif>Drag and drop a font</select></label><label>Selector:<input id=fd-selector placeholder="e.g. body > p"></label><button id=fd-selector-btn>Apply</button><div id=fd-handle></div></div>',
		body = doc.body,
		div = doc.createElement( "div" ),
		link = doc.createElement( "link" ),
		ss = doc.createElement( "style" ),
		selector, selectorVal, fonts, button, handle, fontFaceStyle, currentFont, fontdragr, currentSelector;
		
	function setup() {
		div.innerHTML = html;
		
		link.href="http://labs.thecssninja.com/font_dragr/dev/bookmarklet/style.css";
		link.rel = "stylesheet";
		div.appendChild( link );
		div.appendChild( ss );
				
		body.appendChild( div );
		
		fontdragr = doc.getElementById( "fontdragr" );
		fonts = doc.getElementById( "fd-fonts" );
		selector = doc.getElementById( "fd-selector-btn" );
		selectorVal = doc.getElementById( "fd-selector" );
		handle = doc.getElementById( "fd-handle" );
		
		attach( fonts, "change", changeFont, false );
		attach( selector, "click", changeFont, false );
		attach( handle, "click", toggle, false );
		
		attach( body, "drop", handleDrop, false );
		attach( body, "dragenter", preventActions, false );
		attach( body, "dragover", preventActions, false );
		
		//Load qwery as needed
		if(!( "querySelectorAll" in doc )) {
			var script = doc.createElement( "script" );
			
			script.src = "http://labs.thecssninja.com/font_dragr/dev/bookmarklet/qwery.js";
			body.appendChild( script );
		}
		FD.ltIE9 = (function(){
			var ie = document.createElement( "div" );
			ie.innerHTML = "<!--[if lte IE 8]><i></i><![endif]-->";
			return ( ie.getElementsByTagName( "i" ).length === 1 );         
		}());

	}
	
	// DnD
	function handleDrop( evt ) {
		evt = evt || event;
		
		var dt = evt.dataTransfer,
			// IE doesn't like anything other than "Text"
			data = (( /*@cc_on!@*/0 ) ? dt.getData( "Text" ) : dt.getData( "text/plain" )),
			files = dt.files || false,
			count = files.length,
			acceptedFileExtensions = /^.*\.(ttf|otf|woff)$/i;
		
		preventActions( evt );
		
		if( !!data ) {
			parseDataFont( data ); // We have data parse it, else assume file drop
		} else {
			var file, droppedFullFileName, droppedFileName, reader,
				url = window.URL || window.webkitURL || window.msURL || window.oURL,
				objURL = url.createObjectURL || false;
				
			for ( var i = 0; i < count; i++ ) {
				file = files[i];
				droppedFullFileName = file.name;
				
				if(acceptedFileExtensions.test( droppedFullFileName )) {
					droppedFileName = droppedFullFileName.replace( /\..+$/,"" ); // Removes file extension from name
					droppedFileName = droppedFileName.replace( /\W+/g, "-" ); // Replace any non alpha numeric characters with -
					
					// If the browser supports referencing a file without having to load it into memory let's use it
					if(objURL) {
						buildFontListItem( {
							target: {
								name: droppedFileName,
								result: url.createObjectURL( file )
							}
						} );
					} else {
						reader = new FileReader();
						reader.name = droppedFileName;
						
						/* 
						   Chrome 6 dev can't do DOM2 event based listeners on the FileReader object so fallback to DOM0
						   http://code.google.com/p/chromium/issues/detail?id=48367
						   reader.addEventListener("loadend", buildFontListItem, false);
						*/
						reader.onloadend = function( event ) { buildFontListItem( event ); };
						reader.readAsDataURL( file ); 
					} 
				} else {
					alert( "Invalid file extension. Will only accept ttf, otf or woff font files" );
				}
			}
		}
		
		data = null;
	}
	
	function buildFontListItem( event, name, size, data ) {
		var option = document.createElement( "option" ),
			selectLen = fonts.length,
			styleRef = ss.sheet || ss.styleSheet;
		
		// If file system drag and drop we don't pass any arguments, we get info from the event.
		if( !!event ) {
			name = event.target.name;
			data = event.target.result;
		}
		
		// Dodgy fork because Chrome 6 dev doesn't add media type to base64 string when a dropped file(s) type isn't known
		// http://code.google.com/p/chromium/issues/detail?id=48368
		var dataURL = data.split( "base64" );
		
		if(!!~dataURL[0].indexOf( "application/octet-stream" )) {
			dataURL[0] = "data:application/octet-stream;base64";
			
			data = dataURL[0] + dataURL[1];
		}
		
		// Get font file and prepend it to stylsheet using @font-face rule
		fontFaceStyle = "@font-face{font-family: "+name+"; src:url("+data+");}";
		
		if( styleRef.insertRule ) {
			styleRef.insertRule( fontFaceStyle, 0 );
		} else {
			var styles = doc.createElement( "style" );
			
			// IE 8< need a new stylesheet for each font, otherwise browser will crash
			body.appendChild( styles );
			styles.styleSheet.cssText = fontFaceStyle;
		}
		
		option.value = name;
		option.text = name;
		option.style.fontFamily = name;
		
		try {
			fonts.add( option, null ); // standards compliant; doesn't work in IE
		} catch(ex) {
			fonts.add( option ); // IE only
		}
		
		fonts[selectLen].selected = true;
		fonts.style.fontFamily = name;
		
		changeFont();
		
		data = null;
		dataURL = null;
	}
	
	function changeFont() {
		var font = fonts.value,
			isSel = !!(doc.selection && doc.selection.createRange),
			whichSel = ( isSel ) ? doc.selection : win.getSelection,
			getSel = ( isSel ) ? whichSel.createRange().text.toString() : whichSel().toString(),
			// webkit throws exception when no selection is made and you try to access getRangeAt
			range = ( isSel ) ? whichSel.createRange() : (getSel !== "") ? whichSel().getRangeAt( 0 ) : false;
		
		fonts.style.fontFamily = font;
		currentFont = font;
		
		if( getSel !== "" ) {
			if (isSel) {
				range.execCommand( "fontName", false, font );
			} else {
				doc.designMode = "on";
				whichSel().removeAllRanges();
				whichSel().addRange(range);
				doc.execCommand( "fontName", false, font );
				doc.designMode = "off";
			}
		} else {
			// If no selection is made apply font to selector
			applySelector();
		}
	}
	
	function applySelector() {
		var selectorRule = selectorVal.value || "body p";
			
		if( selectorRule !== "" && fonts.options.length > 1 ) { // If it's not empty and it's not a URL.
			try {	
				var	curElems = ( doc.querySelectorAll ) ? doc.querySelectorAll( selectorRule ) : qwery( selectorRule ),
					len = curElems.length,
					isMultiElems = (len > 1);
				
				if( !isMultiElems ) {
					curElems[0].style.fontFamily = currentFont;
				} else {
					while( len-- ) {
						curElems[len].style.fontFamily = currentFont;
					}
				}
				
				var currentSelector = selectorRule;
				
			} catch( e ) {
				alert( "'"+selectorRule+"' didn't find any elements to style. Try a simpler selector." );
			}
		} else {
			alert( "You need to specify a selector and have atleast one font" );
		}
	}
	
	function toggle() {
		var compStyle = parseInt(( window.getComputedStyle ? getComputedStyle( fontdragr, null ) : fontdragr.currentStyle )['height'],10);
		
		fontdragr.className = compStyle <= 15 ? "" : "fd-hidden";
	}
	
	function parseDataFont( data ) {
		// Make sure data being parsed is valid JSON
		try {
			data = JSON.parse( data );
			
			if( !data.error ) {
				data.fontSize = Math.round( data.fontSize/1024 ) + "kb";
				var fontFileName = data.fontName.split( "/" ).reverse()[0];
					fontFileName = fontFileName.replace( /\..+$/, "" ); // Remove file extension
					fontFileName = fontFileName.replace( /\W+/g, "-" ); // Replace any non alpha numeric characters with -
					
				var	fontFileNameChar = parseInt( fontFileName.charAt(0),10 );
					
				if( !isNaN( fontFileNameChar ) ) {
					fontFileName = "fd"+fontFileName; // If font name starts with a number prepend 'fd'
				}
				
				if( /*@cc_on!@*/0 && !!FD.ltIE9 ) {
					// IE8 can't do base64 fonts but it can load cross domain fonts. Pass url instead.
					data.fontDataURL = data.fontName;
				} else {
					data.fontDataURL = "data:application/octet-stream;base64," + data.fontDataURL;
				}
				
				buildFontListItem( {
					target: {
						name: fontFileName,
						size: data.fontSize,
						result: data.fontDataURL
					}
				} );
			} else {
				alert( data.error );
			}
		} catch(e) {
			alert("Data was not valid JSON.");
		}
	}
	
	//Utils
	function preventActions( evt ) {
		evt = evt || window.event;
		
		if( evt.stopPropagation && evt.preventDefault ) {
			evt.stopPropagation();
			evt.preventDefault();
		} else {
			evt.cancelBubble = true;
			evt.returnValue = false;
		}
	}
	function attach( node, type, fn, capture ) {
		if(node.addEventListener) {
			node.addEventListener( type, fn , capture );
		} else {
			node.attachEvent( "on" + type, fn );
		}
	}
	
	// Bookmarklet tracking code
	function gaTrack(g,h,i){function c(e,j){return e+Math.floor(Math.random()*(j-e));}var f=1000000000,k=c(f,9999999999),a=c(10000000,99999999),l=c(f,2147483647),b=(new Date()).getTime(),d=window.location,m=new Image(),n='http://www.google-analytics.com/__utm.gif?utmwv=1.3&utmn='+k+'&utmsr=-&utmsc=-&utmul=-&utmje=0&utmfl=-&utmdt=-&utmhn='+h+'&utmr='+d+'&utmp='+i+'&utmac='+g+'&utmcc=__utma%3D'+a+'.'+l+'.'+b+'.'+b+'.'+b+'.2%3B%2B__utmb%3D'+a+'%3B%2B__utmc%3D'+a+'%3B%2B__utmz%3D'+a+'.'+b+'.2.2.utmccn%3D(referral)%7Cutmcsr%3D'+d.host+'%7Cutmcct%3D'+d.pathname+'%7Cutmcmd%3Dreferral%3B%2B__utmv%3D'+a+'.-%3B';m.src=n;}gaTrack('UA-4638292-2','fontdragr.com','font dragr bookmarklet');
	
	setup();
})( this, this.document );

if(!this.JSON){this.JSON={};}
(function(){function f(n){return n<10?'0'+n:n;}
if(typeof Date.prototype.toJSON!=='function'){Date.prototype.toJSON=function(key){return isFinite(this.valueOf())?this.getUTCFullYear()+'-'+
f(this.getUTCMonth()+1)+'-'+
f(this.getUTCDate())+'T'+
f(this.getUTCHours())+':'+
f(this.getUTCMinutes())+':'+
f(this.getUTCSeconds())+'Z':null;};String.prototype.toJSON=Number.prototype.toJSON=Boolean.prototype.toJSON=function(key){return this.valueOf();};}
var cx=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,escapable=/[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,gap,indent,meta={'\b':'\\b','\t':'\\t','\n':'\\n','\f':'\\f','\r':'\\r','"':'\\"','\\':'\\\\'},rep;function quote(string){escapable.lastIndex=0;return escapable.test(string)?'"'+string.replace(escapable,function(a){var c=meta[a];return typeof c==='string'?c:'\\u'+('0000'+a.charCodeAt(0).toString(16)).slice(-4);})+'"':'"'+string+'"';}
function str(key,holder){var i,k,v,length,mind=gap,partial,value=holder[key];if(value&&typeof value==='object'&&typeof value.toJSON==='function'){value=value.toJSON(key);}
if(typeof rep==='function'){value=rep.call(holder,key,value);}
switch(typeof value){case'string':return quote(value);case'number':return isFinite(value)?String(value):'null';case'boolean':case'null':return String(value);case'object':if(!value){return'null';}
gap+=indent;partial=[];if(Object.prototype.toString.apply(value)==='[object Array]'){length=value.length;for(i=0;i<length;i+=1){partial[i]=str(i,value)||'null';}
v=partial.length===0?'[]':gap?'[\n'+gap+
partial.join(',\n'+gap)+'\n'+
mind+']':'['+partial.join(',')+']';gap=mind;return v;}
if(rep&&typeof rep==='object'){length=rep.length;for(i=0;i<length;i+=1){k=rep[i];if(typeof k==='string'){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}else{for(k in value){if(Object.hasOwnProperty.call(value,k)){v=str(k,value);if(v){partial.push(quote(k)+(gap?': ':':')+v);}}}}
v=partial.length===0?'{}':gap?'{\n'+gap+partial.join(',\n'+gap)+'\n'+
mind+'}':'{'+partial.join(',')+'}';gap=mind;return v;}}
if(typeof JSON.stringify!=='function'){JSON.stringify=function(value,replacer,space){var i;gap='';indent='';if(typeof space==='number'){for(i=0;i<space;i+=1){indent+=' ';}}else if(typeof space==='string'){indent=space;}
rep=replacer;if(replacer&&typeof replacer!=='function'&&(typeof replacer!=='object'||typeof replacer.length!=='number')){throw new Error('JSON.stringify');}
return str('',{'':value});};}
if(typeof JSON.parse!=='function'){JSON.parse=function(text,reviver){var j;function walk(holder,key){var k,v,value=holder[key];if(value&&typeof value==='object'){for(k in value){if(Object.hasOwnProperty.call(value,k)){v=walk(value,k);if(v!==undefined){value[k]=v;}else{delete value[k];}}}}
return reviver.call(holder,key,value);}
cx.lastIndex=0;if(cx.test(text)){text=text.replace(cx,function(a){return'\\u'+
('0000'+a.charCodeAt(0).toString(16)).slice(-4);});}
if(/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,'@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,']').replace(/(?:^|:|,)(?:\s*\[)+/g,''))){j=eval('('+text+')');return typeof reviver==='function'?walk({'':j},''):j;}
throw new SyntaxError('JSON.parse');};}}());