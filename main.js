const { Command } = require('commander');
const http = require('http');
const program = new Command();

program
    .option('-h, --host <host>', 'адреса сервера', 'localhost') //параметр для адреси
    .option('-p, --port <port>', 'порт сервера', '3000') //пареметр для порту
    .option('-c, --cache <path>', 'шлях до директорії з кешованими файлами', './cache'); //п. для кешу

    program.parse(process.argv);

    const options = program.opts();
    
    const server = http.createServer((req, res) => { //req: реквест ,res: результат, () => - виконується тільки якщо сервер готовий.
        res.writeHead(200, { 'Content-Type': 'text/plain' });
        res.end('server`s running');
    });
    
    server.listen(options.port, options.host, () => {
        console.log(`Сервер запущено на http://${options.host}:${options.port}`);
    });

    if (!options.host || !options.port || !options.cache) {
        console.error('Немає доступу до параметра(-ів)');
        process.exit(1);
    }