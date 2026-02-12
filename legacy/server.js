const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 8080;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  console.log(`${req.method} ${req.url}`);

  // Parse URL - remove query string
  const urlPath = req.url.split('?')[0];
  let filePath = '.' + urlPath;
  
  // Root path serves index.html
  if (filePath === './' || filePath === '.') {
    filePath = './index.html';
  }

  // Get file extension
  const extname = String(path.extname(filePath)).toLowerCase();
  
  // Check if it's a static asset (has extension)
  const isStaticAsset = extname && extname.match(/\.(html|png|jpg|jpeg|gif|svg|ico|css|js|json)$/i);
  
  // If no extension or path doesn't exist, serve index.html for SPA routing
  if (!isStaticAsset) {
    // Check if the requested path exists as a file
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // File doesn't exist, serve index.html for SPA routing
        serveIndexHtml(res);
      } else {
        // File exists, check if it's a directory
        fs.stat(filePath, (statErr, stats) => {
          if (statErr || stats.isDirectory()) {
            // It's a directory or error, serve index.html
            serveIndexHtml(res);
          } else {
            // It's a file, serve it
            serveFile(filePath, res);
          }
        });
      }
    });
  } else {
    // It's a static asset, try to serve it
    fs.access(filePath, fs.constants.F_OK, (err) => {
      if (err) {
        // Static asset not found, serve index.html
        serveIndexHtml(res);
      } else {
        // Static asset exists, serve it
        serveFile(filePath, res);
      }
    });
  }
});

function serveFile(filePath, res) {
  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  fs.readFile(filePath, (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end(`Server Error: ${error.code}`);
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
}

function serveIndexHtml(res) {
  fs.readFile('./index.html', (err, content) => {
    if (err) {
      res.writeHead(500);
      res.end('Server Error: Could not read index.html');
    } else {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content, 'utf-8');
    }
  });
}

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log('SPA routing enabled - all routes will serve index.html');
});
