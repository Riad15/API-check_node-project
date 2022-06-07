
// dependance section
const { StringDecoder } = require('string_decoder')
const url = require('url');

// app object
const app = {};

// module scaffolding
const handler = {};



app.handleServer = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimedPath = path.replace(/^\/+|$/g, '')
    const method = req.method.toLowerCase();
    const queryString = parsedUrl.query;


    console.log(queryString);

    const decoder = new StringDecoder('utf-8');
    let realData = '';
    req.on('data', (buffer) => {
        realData += decoder.write(buffer)

    })
    req.on('end', () => {
        realData += decoder.end();
        console.log(realData);
        res.end("server is running continue");
    })
    // response handle

}
module.exports = handler;