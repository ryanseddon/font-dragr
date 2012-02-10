
js-filename =			fd-script.js
js-build =				$(js-filename)
js-prereq =				fd-script-dev.js

yui-jar =				../../build/tools/yuicompressor-2.4.5.jar


all: $(js-build)

$(js-build): $(js-prereq)
	@rm -f $(js-build)
	@echo "Compressing JS…\t\c"
	@cat $(js-prereq) > $(js-path)tmp.js
	@java -jar $(yui-jar) -o $(js-build) $(js-path)tmp.js
	@rm -f $(js-path)tmp.js
	@echo "[ Done ]"