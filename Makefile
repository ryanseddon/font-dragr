master-file =	views/layout.jade

css-path =		public/css/
css-build =		$(css-path)_styles.min.css
css-prereq =	$(css-path)src/_styles.css \
				$(css-path)src/wfs.css


js-path =		public/scripts/
js-build =		$(js-path)_scripts.min.js
js-prereq =		$(js-path)src/jquery.js \
				$(js-path)src/underscore.js \
				$(js-path)src/json2.js \
				$(js-path)src/_javascript.js \
				$(js-path)src/_fonts.js \
				$(js-path)src/_templates.js \
				$(js-path)src/backbone.js \
				$(js-path)src/_routes.js \
				$(js-path)src/_models-collections.js \
				$(js-path)src/_views.js

yui-jar =		/usr/share/yui-compressor/yui-compressor.jar



all: $(css-build) $(js-build)

install: all
	@echo "Linking to updated CSS and JavaScript…\t\c"
	@echo "[ Done ]"
	@echo "Installation is complete."

$(css-build): $(css-prereq)
	@rm -f $(css-build)
	@echo "Merging CSS files…\t\t\t\c"
	@cat $(css-prereq) > $(css-path)_styles.css
	@echo "[ Done ]"
	@echo "Compressing merged CSS…\t\c"
	@java -jar $(yui-jar) -o $(css-build) $(css-path)_styles.css
	@echo "[ Done ]"


$(js-build): $(js-prereq)
	@rm -f $(js-build)
	@echo "Merging JS files…\t\t\t\c"
	@cat $(js-prereq) > $(js-path)_scripts.js
	@echo "[ Done ]"
	@echo "Compressing merged JS…\t\c"
	@java -jar $(yui-jar) -o $(js-build) $(js-path)_scripts.js
	@echo "[ Done ]"

clean:
	@rm -f $(css-build)
	@rm -f $(js-build)