var exec = require("child_process").exec;

var querystring = require("querystring");

var fs = require("fs");

var formidable = require("formidable");

function start(response, postData) {
  console.log("Request handler 'start' was called.");
  // 上述代码中，我们引入了一个新的Node.js模块，child_process。之所以用它，是为了实现一个既简单又实用的非阻塞操作：exec()。
  // exec()做了什么呢？它从Node.js来执行一个shell命令。在上述例子中，我们用它来获取当前目录下所有的文件（“ls -lah”）,然后，当/startURL请求的时候将文件信息输出到浏览器中。
  // 下面的代码可以实现将文档结构显示在页面上
  // exec("ls -lah", function (error, stdout, stderr) {
  //   response.writeHead(200, {"Content-Type": "text/plain"});
  //   response.write(stdout);
  //   response.end();
  // });
  // 
  var body = '<html>'+
    '<head>'+
    '<meta http-equiv="Content-Type" content="text/html; '+
    'charset=UTF-8" />'+
    '</head>'+
    '<body>'+
    '<form action="/upload" enctype="multipart/form-data" '+
    'method="post">'+
    '<input type="file" name="upload" multiple="multiple">'+
    '<input type="submit" value="Upload file" />'+
    '</form>'+
    '</body>'+
    '</html>';

    response.writeHead(200, {"Content-Type": "text/html"});
    response.write(body);
    response.end();
}

function upload(response, request) {
  console.log("Request handler 'upload' was called.");

  var form = new formidable.IncomingForm();
  // 添加一个 form.uploadDir='tmp' 即可（写一个临时路径）
  form.uploadDir='tmp';
  console.log("about to parse");
  form.parse(request, function(error, fields, files) {
    console.log("parsing done");
    fs.renameSync(files.upload.path, "/tmp/test.png");
    response.writeHead(200, {"Content-Type": "text/html"});
    response.write("received image:<br/>");
    response.write("<img src='/show' />");
    response.end();
  });
}

// 显示本地的图片
function show(response) {
  console.log("Request handler 'show' was called.");
  // fs.readFile("/tmp/test.png", "binary", function(error, file) {
  //   if(error) {
  //     response.writeHead(500, {"Content-Type": "text/plain"});
  //     response.write(error + "\n");
  //     response.end();
  //   } else {
  //     response.writeHead(200, {"Content-Type": "image/png"});
  //     response.write(file, "binary");
  //     response.end();
  //   }
  // });
}

exports.start = start;
exports.upload = upload;
exports.show = show;