# Development
## Client - javascript
You can create the minified JavaScript using the default "all" task of the Ant build.xml file which you can execute by running ant in the etc/build folder of the repo.
```
$ cd etc/build
$ ant all
```
## Server + Client
Server provides Gliffy and .vsdx importers, the embed support, icon search and publishing to Imgur.

If you want to build the full war with the Java server-side code and the client-side JavaScript, invoke the "war" task in the Ant build.xml file. Deploy the resulting .war file to a servlet engine.
```
$ cd etc/build
$ ant war
```
## Docker
```
$ cd drawio/src/main
$ docker build -t codelytics-design .
$ docker run -p 8888:90 -d codelytics-design
```
## mxGraph
The [mxGraph documentation](https://jgraph.github.io/mxgraph/) provides a lot of the docs for the bottom part of the stack. There is an [mxgraph tag on SO](http://stackoverflow.com/questions/tagged/mxgraph).

# Supported Browsers
draw.io supports IE 11, Chrome 32+, Firefox 38+, Safari 9.1.x, 10.1.x and 11.0.x, Opera 20+, Native Android browser 5.1.x+, the default browser in the current and previous major iOS versions (e.g. 11.2.x and 10.3.x) and Edge 23+.
