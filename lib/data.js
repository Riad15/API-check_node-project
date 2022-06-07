// dependency
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');
// write data to file
lib.create = function (dir, file, data, callback) {
    fs.open(lib.basedir + dir + '/' + file + '.json', 'wx', function (err, fileDesCriptor) {
        if (!err && fileDesCriptor) {
            // convert data to string
            const stringData = JSON.stringify(data);

            // write data to file and close it 
            fs.writeFile(fileDesCriptor, stringData, function (err) {
                if (!err) {
                    fs.close(fileDesCriptor, function (err) {
                        if (!err) {
                            callback(false);

                        } else {
                            callback('error closings the new file');
                        }
                    })

                } else {
                    callback("error writing to new file");

                }

            });

        } else {
            callback('could not new file,it may already exist');
        }
    })

};
module.exports = lib;