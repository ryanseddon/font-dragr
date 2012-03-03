app =					app.js

master-file-deploy =	deploy/views/layout.jade
master-css =			\    link(rel='stylesheet', href='/css/$(css-deploy-build)')
master-js =				\    script(src='/scripts/$(js-deploy-build)')

deploy-folder =			deploy/
public-folder =			public
views-folder =			views

css-path =				public/css/
css-deploy-path =		$(deploy-folder)$(css-path)
css-filename =			_styles.min.css
css-build =				$(css-path)$(css-filename)
css-prereq =			$(css-path)src/_styles.css \
						$(css-path)src/wfs.css \
						$(css-path)src/_media-queries.css


js-path =				public/scripts/
js-deploy-path =		$(deploy-folder)$(js-path)
js-filename =			_scripts.min.js
js-build =				$(js-path)$(js-filename)
js-prereq =				$(js-path)src/jquery.js \
						$(js-path)src/underscore.js \
						$(js-path)src/json2.js \
						$(js-path)src/_javascript.js \
						$(js-path)src/_fonts.js \
						$(js-path)src/_templates.js \
						$(js-path)src/backbone.js \
						$(js-path)src/_routes.js \
						$(js-path)src/_models-collections.js \
						$(js-path)src/_views.js

yui-jar =				build/tools/yuicompressor-2.4.5.jar



all: $(css-build) $(js-build)

install: css-deploy-build = `cat $(css-build) | /usr/bin/openssl sha1 | cut -c1-8`.css
install: js-deploy-build = `cat $(js-build) | /usr/bin/openssl sha1 | cut -c1-8`.js
install: all
	@mkdir $(deploy-folder)
	@cp $(app) $(deploy-folder)
	@cp -R $(public-folder) $(deploy-folder)
	@cp -R $(views-folder) $(deploy-folder)
	@rm -rf $(deploy-folder)$(css-path)src
	@rm -rf $(deploy-folder)$(js-path)src
	@cp $(css-build) $(css-deploy-path)$(css-deploy-build)
	@cp $(js-build) $(js-deploy-path)$(js-deploy-build)
	@echo "Linking to updated CSS and JavaScript…\t\c"
	@gsed -i "/\/\/ START: Concat css/,/\/\/ END: Concat css/c$(master-css)" $(master-file-deploy)
	@gsed -i "/\/\/ START: Concat scripts/,/\/\/ END: Concat scripts/c$(master-js)" $(master-file-deploy)
	@echo "[ Done ]"
	@echo "Installation is complete."

$(css-build): $(css-prereq)
	@rm -f $(css-build)
	@echo "Merging CSS files…\t\t\t\c"
	@cat $(css-prereq) > $(css-path)tmp.css
	@echo "[ Done ]"
	@echo "Compressing merged CSS…\t\c"
	@java -jar $(yui-jar) -o $(css-build) $(css-path)tmp.css
	@rm -f $(css-path)tmp.css
	@echo "[ Done ]"

$(js-build): $(js-prereq)
	@rm -f $(js-build)
	@echo "Merging JS files…\t\t\t\c"
	@cat $(js-prereq) > $(js-path)tmp.js
	@echo "[ Done ]"
	@echo "Compressing merged JS…\t\c"
	@java -jar $(yui-jar) -o $(js-build) $(js-path)tmp.js
	@rm -f $(js-path)tmp.js
	@echo "[ Done ]"

clean:
	@rm -rf $(deploy-folder)
	@rm -f $(css-build)
	@rm -f $(js-build)