const { program } = require('commander');
const http = require("http");
const fs = require('fs').promises;

program 
  .requiredOption('-h, --host <host>', 'servers address')
  .requiredOption('-p, --port <port>', 'servers port')
  .requiredOption('-c, --cache <cache>', 'directory path');

program.parse(process.argv);

const o = program.opts();

const requestListener = async function (req, res) {
    const code = req.url.slice(1);
    const filePath = `${__dirname}/${code}.jpg`;

    try {
        switch (req.method) {
            case 'GET': {
                try {
                    const image = await fs.readFile(filePath);
                    res.setHeader("Content-Type", "image/jpeg");
                    res.writeHead(200);
                    res.end(image);
                } catch (err) {
                    const error404 = await fs.readFile(__dirname + "/404.jpg");
                    res.setHeader("Content-Type", "image/jpeg");
                    res.writeHead(404);
                    res.end(error404);
                }
                break;
            }
            case 'DELETE': {
                try {
                    await fs.unlink(filePath);
                    res.writeHead(200);
                    res.end("Image deleted");
                } catch (err) {
                    const error404 = await fs.readFile(__dirname + "/404.jpg");
                    res.setHeader("Content-Type", "image/jpeg");
                    res.writeHead(404);
                    res.end(error404);
                }
                break;
            }
            default: {
                const error405 = await fs.readFile(__dirname + "/405.jpg");
                res.setHeader("Content-Type", "image/jpeg");
                res.writeHead(405);
                res.end(error405);
            }
        }
    } catch (err) {
        res.writeHead(500);
        res.end("Server Error");
    }
};

const server = http.createServer(requestListener);
server.listen(o.port, o.host, () => {
  console.log(`Server is running on http://${o.host}:${o.port}`);
});
