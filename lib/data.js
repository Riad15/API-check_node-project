// dependency
const fs = require('fs');
const path = require('path');

const lib = {};

// base directory of the data folder
lib.basedir = path.join(__dirname, '/../.data/');

// -----------write data to file------------
lib.create = function (dir, file, data, callback) {
    // open file for writing
    fs.open(`${lib.basedir + dir}'/'${file}.json`, 'wx', function (err, fileDesCriptor) {
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
//------------ read data from file --------------
lib.read = function (dir, file, callback) {
    // open file for read data
    fs.readFile(`${lib.basedir + dir}'/'${file}.json`, 'utf8', function (err, data) {
        callback(err, data);
    })
}

// ---------update data from file ---------------
lib.update = function (dir, file, data, callback) {
    fs.open(`${lib.basedir + dir}/${file}.json`, 'r+', function (err, fileDesCriptor) {
        if (!err && fileDesCriptor) {
            const stringData = JSON.stringify(data);
            // truncate the data 
            fs.ftruncate(fileDesCriptor, (err) => {
                fs.writeFile(fileDesCriptor, stringData, (err) => {
                    if (!err) {
                        fs.close(fileDesCriptor, (err) => {
                            if (!err) {
                                callback(false);
                            } else {
                                callback("error closing file");
                            }
                        })
                    } else {
                        callback('error writing to file');
                    }
                })
            });
        } else {
            console.log("error updating! file may not existing ");
        }
    })
}

// ---------Delete data from file --------------
lib.delete = function (dir, file, data, callback) {
    fs.unlink(`${lib.basedir + dir}'/'${file}.json`, (err) => {
        if (!err) {
            callback(false);
        } else {
            callback('error deleting file');
        }
    })
}

module.exports = lib;