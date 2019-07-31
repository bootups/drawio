# Setup Environment
## In the dev space
```
$ cd /projects/vd/dev
$ python -m SimpleHTTPServer 8000
```
### Visual Studio Code
* Open the dev workspace
* Use the: "Dev Content Creation" and "Dev Presentation", debug configurations
## In the prod space
In one shell
```
$ cd /projects/vd/prod
$ python -m SimpleHTTPServer 9000
```
In another shell to open the publish browser
```
$ vdc
```
### Visual Studio Code
* Open the prod workspace
* Use the: "Prod Content Creation" and "Prod Presentation", debug configurations
* Publish files to: prod/drawio/src/main/webapp/vd
## GitHub
When releasing to Github. The minified production versions need to be generated and committed and pushed

If mxgraph2 has been modified:
```
$ cd vd/dev/mxgraph2/
./build.sh
```
This will copy the mxClient.js file into the drawio project. Then:
```
$ cd dev/drawio/etc/build
$ ant all
```
# Notes
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
