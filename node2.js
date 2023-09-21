const http = require('http');
const fs = require('fs');
const server=http.createServer((req,res) => {
    console.log(req.url, req.method, req.headers);
    const url=req.url;
    if ( url ==='/login'){
    res.setHeader('Content-Type','text/html');
    res.write('<html>');
    res.write('<head><title>hey</title></head>');
    res.write('<body><div id="nameDisplay"></div><form id="nameForm"><label for="nameInput"></label><input type="text" id="nameInput" required><button type="button" onclick="submitName()">Send</button></form><script>function submitName() {const name = document.getElementById("nameInput").value;const nameDisplay = document.getElementById("nameDisplay");nameDisplay.textContent = name;}</script></body>');
    res.write('</html>');
      
    return res.end();
    }
    if (url==='/login'){
        fs.writeFile('123.txt', nameDisplay);
        res.setHeader('Location', '/login');
        res.end()
    }
});
server.listen(3000);