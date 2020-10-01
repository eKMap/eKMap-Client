var fs = require('fs');
var path = require('path');
var key = process.argv[2] ? process.argv[2].replace("--", "") : "leaflet";
var filePath = path.join(__dirname, "../dist");
var destDir = path.join(__dirname, "../src/" + key + "/dist");
if (!fs.existsSync(destDir)) {
    fs.mkdirSync(destDir);
}
fs.readdir(path.join(filePath, key), function (err, files) {
    if (err) {
        console.log(err);
        return;
    }
    files.forEach(function (fileName) {
        if (fileName.indexOf(key) >= 0 && fileName.indexOf("include") == -1) {
            var sourceFile = path.join(__dirname, "../dist/" + key, fileName);
            var destPath = path.join(__dirname, "../src/" + key + "/dist", fileName);
            var readStream = fs.createReadStream(sourceFile);
            var writeStream = fs.createWriteStream(destPath);
            readStream.pipe(writeStream);
            return;
        }
        //workers
        if (fs.statSync(path.join(filePath, key, fileName)).isDirectory()) {
            if (!fs.existsSync(path.join(__dirname, "../src/" + key + "/dist/", fileName))) {
                fs.mkdirSync(path.join(__dirname, "../src/" + key + "/dist/", fileName));
            }
            fs.readdir(path.join(filePath, key, fileName), function (err, subfiles) {
                if (err) {
                    console.log(err);
                    return;
                }
                subfiles.forEach(function (subfileName) {
                    var sourceFile = path.join(__dirname, "../dist/", key, fileName, subfileName);
                    var destPath = path.join(__dirname, "../src/" + key + "/dist/", fileName, subfileName);
                    var readStream = fs.createReadStream(sourceFile);
                    var writeStream = fs.createWriteStream(destPath);
                    readStream.pipe(writeStream);
                })
            })
        }
    })
})