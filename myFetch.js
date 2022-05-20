
export let say = function (){
    console.log("work my function");
};

import fetch from "node-fetch";
import chalk from 'chalk';


import http from "http";
http.createServer(function (request, response) {
    // Send the HTTP header
    // HTTP Status: 200 : OK
    // Content Type: text/plain
    response.writeHead(200, {'Content-Type': 'text/plain'});

    // Send the response body as "Hello World"
    response.end('Hello World\n');
}).listen(8085);

// Console will print the message
console.log('Server running at http://127.0.0.1:8085/');

