var ncp = require("copy-paste");
var fs = require('fs'),
    path = require('path'),
    _ = require('underscore');

// Return only base file name without dir
function getMostRecentFileName(dir) {
    var files = fs.readdirSync(dir);

    // use underscore for max()
    return _.max(files, f => {
        var fullpath = path.join(dir, f);

        // ctime = creation time is used
        // replace with mtime for modification time
        return fs.statSync(fullpath).ctime;
    });
}

var dir = '/Users/adrian/projects/vd/prod/drawio/src/main/webapp/vd/images'
var f = getMostRecentFileName(dir);
var f2 = 'vd/images/' + f;
console.log(f2);
ncp.copy(f2);
