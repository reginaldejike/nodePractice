const http = require('http');
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const logEvent = require('./logEvents');

const EventEmitter = require('events');
const { log } = require('console');

class Emitter extends EventEmitter {}

//intialize objects
const myEmitter = new Emitter();
myEmitter.on('log', (msg, fileName) => logEvent(msg, fileName));

const PORT = process.env.PORT || 5000;

const serverFile = async (filePath, contentType, response) => {
  try {
    const rawData = await fsPromises.readFile(
      filePath,
      !contentType.includes('image') ? 'utf8' : ''
    );
    const data =
      contentType === 'application/json' ? JSON.parse(rawData) : rawData;

    response.writeHead(filePath.includes('404.html') ? 404 : 200, {
      'Content-Type': contentType,
    });
    response.end(
      contentType === 'application/json' ? JSON.stringify(data) : data
    );
  } catch (err) {
    console.log(err);
    myEmitter.emit('log', `${err.name} : ${err.message}`, 'errlog.txt');
    response.statusCode = 500;
    response.end('Server Error');
  }
};

const server = http.createServer((req, res) => {
  console.log(req.url, req.method);
  myEmitter.emit('log', `URL: ${req.url} Method: ${req.method}`, 'reqlog.txt');

  const extension = path.extname(req.url);

  let contentType;

  switch (extension) {
    case '.css':
      contentType = 'text/css';
      break;
    case '.js':
      contentType = 'text/javascript';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.txt':
      contentType = 'text/plain';
      break;
    default:
      contentType = 'text/html';
  }

  let filePath =
    contentType === 'text/html' && req.url === '/'
      ? path.join(__dirname, 'view', 'index.html')
      : contentType === 'text/html' && req.url.slice(-1) === '/'
      ? path.join(__dirname, 'view', req.url, 'index.html')
      : contentType === 'text/html'
      ? path.join(__dirname, 'view', req.url)
      : path.join(__dirname, req.url);
  //make .html extension not required in a brower
  if (!extension && req.url.slice(-1) !== '/') {
    filePath = path.join(__dirname, 'view', req.url + '.html');
  }
  const fileExists = fs.existsSync(filePath);

  if (fileExists) {
    //serve the file
    serverFile(filePath, contentType, res);
  } else {
    switch (path.parse(filePath).base) {
      case 'old-page.html':
        res.writeHead(301, { Location: '/new-page.html' });
        res.end();
        break;

      case 'www-page.html':
        res.writeHead(301, { Location: '/' });
        res.end();
        break;
      default:
        serverFile(path.join(__dirname, 'view', '404.html'), 'text/html', res);
    }
  }
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
