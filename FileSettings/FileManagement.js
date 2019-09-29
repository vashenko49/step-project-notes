const fs = require('fs');
const path = require('path');
const pathUpload = require('../upload/config');
module.exports = class FileManagment {
    static removeFileInUpload(filename){
        let pathImg = path.resolve(pathUpload.pathUpload, filename);
        fs.stat(pathImg, function (err, stats) {
            if(err){
                console.error(err);
            }
            fs.unlink(pathImg, function (err) {
                if(err) return console.log(err);
            })
        });
    }
};