// title: Up time monitoring application API
// DISCRETION: A restful API to monitor Up or Down of user defines link
// Author : Riad
// Date: 05/06/2022



// dependency:
const http = require('http');

// app object
const app = {}

// conflagration
app.config = {
    port: 5000
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleServer);
    server.listen(app.config.port, () => {
        console.log(`listening to port number is ${app.config.port}`);
    })
}

// handle request response
app.handleServer = (req, res) => {
    // response handle
    res.end("server is running continue");
}

// start server
app.createServer();