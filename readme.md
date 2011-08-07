# font dragr

## Introduction

[Font dragr](http://dev.fontdragr.com/) is a `@font-face` testing web app that allows your to test fonts right in the browser. Whether it's from your file system or from the font dragr gallery you can easily test in multiple browsers how a font will look.

In supporting browsers<sup><a href="#sup1">1</a></sup> you can simply drag and drop a font file right into the browser and it will render for you to test away.

## Bookmarklet

The font dragr bookmarklet<sup><a href="#sup1">2</a></sup> allows you to test custom fonts on any website either from the font dragr [gallery](http://dev.fontdragr.com/gallery) or by dropping a font from your file system<sup><a href="#sup1">1</a></sup> into a page with the bookmarklet loaded.

<sup name="sup1">1.</sup> Works in FF3.6+, Chrome 6+ and IE10 PP2.<br />
<sup name="sup2">2.</sup> Github doesn't like bookmarklets so go to the [font dragr](http://dev.fontdragr.com/) homepage and get it off there.

## Run it locally

You can get a copy of font dragr running on your local environment following these steps:

1. Install [Node.js](https://github.com/joyent/node) and [Express with Jade](https://github.com/visionmedia/express) follow the instructions on each project page.
2. Run `make clean install` to build the project. This will create a deploy folder
3. Run `node app.js' inside the deploy folder
4. View 127.0.0.1:45995 on your machine to see it working.

This project doesnt include the gallery files found on font dragr live site but dropping font files from your file system will work fine in supporting browsers.

## Contribute

See something that can be improved, want a feature added or you've found a bug?

### Feature or bug fix

1. Fork the project and make your changes or write a fix for that bug you found.
2. Create a pull request and smile :)

### Found a bug or want to request a feature?

1. File an issue with as much information as possible in the [issue section](/ryanseddon/font-dragr/issues) of the project

## License

Font dragr is licensed under MIT so you can pretty much do as you please with it. See [license](http://fontdragr.com/license.txt) file.
