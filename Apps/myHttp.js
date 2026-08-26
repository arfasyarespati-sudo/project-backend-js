
const http = require('http');
const PORT = 3000;

const server = http.createServer((req, res) => {

    res.writeHead(200, {'Content-type': 'text'});
    res.end('Hello Sekai\n');
});

server.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}/`);
})