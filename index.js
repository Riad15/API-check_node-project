// title: Up time monitoring application API
// DISCRETION: A restful API to monitor Up or Down of user defines link
// Author : Riad
// Date: 05/06/2022



// dependency:
const http = require('http');
const { handleServer } = require('./pages/handleReqRes')
const data = require('./lib/data')

// test  create data
data.update('test', 'newFile', { name: 'katar', language: 'arbi' }, function (err) {
    console.log('error was', err);
})
// app object
const app = {}

// conflagration
app.config = {
    port: 5000,
};

//create server
app.createServer = () => {
    const server = http.createServer(app.handleServer);
    server.listen(app.config.port, () => {
        console.log(`listening to port number is ${app.config.port}`);
    })
}

// handle request response
app.handleServer = handleServer;

// start server
app.createServer();