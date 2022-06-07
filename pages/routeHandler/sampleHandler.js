// const sampleHandler = {};

// sampleHandler.handle = () => {
//     console.log("this is sample function");

// }

// module.exports = sampleHandler;


const handler = {};

handler.sampleHandler = (reqProperty, callback) => {
    console.log(reqProperty);
    callback(200, {
        message: "this is the sample url",
    });

}

module.exports = handler;