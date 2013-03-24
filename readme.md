# font dragr

## Introduction

[Font dragr](http://fontdragr.com/) is a `@font-face` testing web app that allows your to test fonts right in the browser. Whether it's from your file system or from the font dragr gallery you can easily test in multiple browsers how a font will look.

In supporting browsers<sup><a href="#sup1">1</a></sup> you can simply drag and drop a font file right into the browser and it will render for you to test away.

## Bookmarklet

The font dragr bookmarklet<sup><a href="#sup1">2</a></sup> allows you to test custom fonts on any website either from the font dragr [gallery](http://dev.fontdragr.com/gallery) or by dropping a font from your file system<sup><a href="#sup1">1</a></sup> into a page with the bookmarklet loaded.

<sup name="sup1">1.</sup> Works in FF3.6+, Chrome 6+ and IE10 PP2.<br />
<sup name="sup2">2.</sup> Github doesn't like bookmarklets so go to the [font dragr](http://dev.fontdragr.com/) homepage and get it off there.

## Run it locally

You can get a copy of font dragr running on your local environment following these steps:

1. Install [Node.js](nodejs.org), [Yeoman v1.0](http://yeoman.io) and [PhantomJS](http://phantomjs.org/).
2. Run `grunt server` to spin up instance of font dragr.
3. Run `grunt test` to run unit tests.

This project doesnt include the gallery files found on font dragr live site but dropping font files from your file system will work fine in supporting browsers.

## Build with Source Map support

[Source maps](http://www.html5rocks.com/en/tutorials/developertools/sourcemaps/) allow you to map your combined files back to their original state. I will add support very soon using uglifyjs.

## Contribute

See something that can be improved, want a feature added or you've found a bug?

### Feature or bug fix

1. Fork the project and make your changes or write a fix for that bug you found.
2. Create a pull request and smile :)

### Found a bug or want to request a feature?

* File an issue with as much information as possible in the [issue section](/ryanseddon/font-dragr/issues) of the project
* Hit me up on twitter [@ryanseddon](https://twitter.com/ryanseddon)

## License

Copyright 2013, Ryan Seddon
This content is released under the MIT license
http://ryanseddon.mit-license.org