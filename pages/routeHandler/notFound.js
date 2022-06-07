


const handler = {};

handler.notFound = (reqProperty, callback) => {
    console.log(reqProperty);
    callback(404, {
        message: "your request url is not found",
    });

}

module.exports = handler;