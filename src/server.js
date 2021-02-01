const http = require("http");
const fs = require('fs').promises;

const host = 'localhost';
const port = 8077;

const requestListener = function (req, res) {
    const url = req.url === '/'
        ? '/index.html'
        : req.url;

    if (url.includes("/api/")) {
        res.setHeader("Content-Type", "text/json");
        res.writeHead(200);
        if (url.endsWith("/api/call")) res.end('{ "data": "response from network" }');
    } else {

    fs.readFile(__dirname + url)
        .then(contents => {
            if (url.endsWith(".html")) res.setHeader("Content-Type", "text/html");
            if (url.endsWith(".css")) res.setHeader("Content-Type", "text/css");
            if (url.endsWith(".js")) res.setHeader("Content-Type", "text/javascript");
            if (url.endsWith(".jpeg")) res.setHeader("Content-Type", "image/jpeg");
            if (url.endsWith(".ico")) res.setHeader("Content-Type", "image/x-icon");

            res.writeHead(200);
            res.end(contents);
        })
        .catch(err => {
            console.error(`Could not read ${req.url} file: ${err}`);
            // process.exit(1);
        })
    }

};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});
