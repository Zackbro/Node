var http = require('http');
var fs = require('fs');
var path = require('path');

var hostname = 'localhost';
var port = 3000;

var server = http.createServer(function(req, res){
  console.log('Request for ' + req.url + 'by method' + req.method);

  if (req.method === 'GET') {
    // file url
    var fileUrl;
    req.url === '/' ? fileUrl = '/index.html' : fileUrl = req.url;
    // file path
    var filePath = path.resolve('./public' + fileUrl);
    // the .html type
    var fileExt = path.extname(filePath);

    if (fileExt === '.html') {
      fs.exists(filePath, function(exists) {
        if (!exists) {
          res.writeHead(404, { 'Content-Type': 'text/html' });
          res.end('<html><body><h1> Error 404: ' + fileUrl + 'not found <h1></body></html>');
          return;
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        // put the file into res stream
        fs.createReadStream(filePath).pipe(res);
      })
    }
    else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1> Error 404: ' + fileUrl + 'not a html file <h1></body></html>');
    }
  }
  else {
      res.writeHead(404, { 'Content-Type': 'text/html' });
      res.end('<html><body><h1> Error 404: ' + req.method + 'not supported file <h1></body></html>');
    }
})

server.listen(port, hostname, function() {
  console.log(`server running at http://${hostname}:${port}/`)
})