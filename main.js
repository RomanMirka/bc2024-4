const { program } = require('commander');
const http = require("http");
const fs = require('fs');

program 
  .requiredOption('-h, --host <host>', 'servers address')
  .requiredOption('-p, --port <port>', 'servers port')
  .requiredOption('-c, --cache <cache>', 'directory path');

program.parse(process.argv);

const o = program.opts();

const requestListener = function (req, res) {
    if (req.url === "/200") {
        try {
    const res200 = fs.readFileSync(__dirname + "/200.jpg");
    res.setHeader("Content-Type", "image/jpeg");
    res.writeHead(200);
    res.end(res200);
    } catch(err) {
    const error404 = fs.readFileSync(__dirname + "/404.jpg");
    res.setHeader("Content-Type", "image/jpeg");
    res.writeHead(404);
    res.end(error404);
    }
    } else {
    const error404 = fs.readFileSync(__dirname + "/404.jpg");
    res.setHeader("Content-Type", "image/jpeg");
    res.writeHead(404);
    res.end(error404);
    }
};

const server = http.createServer(requestListener);
server.listen(o.port, o.host, () => {
  console.log(`Server is running on http://${o.host}:${o.port}`) });

