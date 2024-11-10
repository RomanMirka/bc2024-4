const { program } = require('commander');
const http = require("http");

program 
  .requiredOption('-h, --host <host>', 'servers address')
  .requiredOption('-p, --port <port>', 'servers port')
  .requiredOption('-c, --cache <cache>', 'directory path');

program.parse(process.argv);

const o = program.opts();

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end("My first server!");
};

const server = http.createServer(requestListener);
server.listen(o.port, o.host, () => {
  console.log(`Server is running on http://${o.host}:${o.port}`) });
