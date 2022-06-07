
// dependance section
const { StringDecoder } = require('string_decoder');
const url = require('url');
const routes = require('../route');
const { notFound } = require('../pages/routeHandler/notFound');

// app object


// module scaffolding
const handler = {};



handler.handleServer = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/+|\/+$/g, '');
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;
    const handleObject = req.headers;

    const reqProperty = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryString,
        handleObject
    }


    console.log(queryString);

    const decoder = new StringDecoder('utf-8');
    let realData = '';

    const choseHandler = routes[trimmedPath] ? routes[trimmedPath] : notFound;


    req.on('data', (buffer) => {
        realData += decoder.write(buffer)

    })
    req.on('end', () => {
        realData += decoder.end();

        choseHandler(reqProperty, (statusCode, payLoad) => {
            console.log(`statusCode:${statusCode} and payLoad:${payLoad}`);

            statusCode = typeof (statusCode) === "number" ? statusCode : 500;
            payLoad = typeof (payLoad) === "object" ? payLoad : {};
            const payloadString = JSON.stringify(payLoad)
            // finally response
            res.writeHead(statusCode);
            res.end(payloadString);
        })
        res.end("server is running continue");
    })
    // response handle

}
module.exports = handler;