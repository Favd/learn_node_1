import {User, Answer} from './usersMy.js';
import * as http from 'http';
import url from 'url';
import querystring from 'querystring'
import fs from "fs";


const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {

    if (req.method === 'GET') {
        let urlRequest = url.parse(req.url, true);
        let resp = urlRequest.query.nicName + ' /// ' + urlRequest.query.fullName;
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf8'});
        let index = fs.readFileSync('index.html');
        res.end(index);

    } else if (req.method === 'POST') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', () => {
            console.log(body);
            let answer = new Answer();
            let received = JSON.parse(body);

            if(received.nicName === '' || received.password === ''){
                answer.textStatus = "Username or password filled out.";

            } else if(received.stepEnter && received.nicName != ''){
                console.log('raz');
                let user = new User(received.nicName, received.password);
                answer.enterStatus = user.checkNicPassword();
                if(answer.enterStatus){
                    answer.textStatus = "You are inside";
                } else {
                    answer.textStatus = "Enter error. Nikname or password is wrong";
                }

            } else if(!received.stepEnter && received.nicName != '' && received.password != ''){
                console.log('dva');
                let user = new User(received.nicName, received.password, received.fullName);
                if(user.check()){
                    answer.registrStatus = false;
                    answer.textStatus = "User already exists"

                } else {
                    user.save(true);
                    if (user.userIs){
                        answer.enterStatus = true;
                        answer.registrStatus = true;
                        answer.textStatus = "You are inside. Registr OK";
                    }
                }

            }
            // console.log(user);
            res.setHeader('Content-Type', 'application/json');
            res.status = '200';
            res.end(JSON.stringify(answer));
        })

    }
};

const server = http.createServer(requestListener);
server.listen(port, host, () => {
    console.log(`Server is running on http://${host}:${port}`);
});


// let user1 = new User('vlad', 'FylymonOvv');
// let buf = new Buffer(1024);
// let rez = user1.save(true);
// let rez2 = user1.check();






// console.log("Going to open an existing file");
// fs.open('textLesson.txt', 'r+', function(err, fd) {
//     if (err) {
//         return console.error(err);
//     }
//     console.log("File opened successfully!");
//     console.log("Going to read the file");
//
//     fs.read(fd, buf, 0, buf.length, 0, function(err, bytes){
//         if (err){
//             console.log(err);
//         }
//         console.log(bytes + " bytes read");
//
//         // Print only read bytes to avoid junk.
//         if(bytes > 0){
//             let x = buf.slice(0, bytes).toString();
//             let s = buf.slice(0, bytes);
//             console.log(buf.slice(0, bytes).toString());
//         }
//     });
//
//     fs.close(fd, (err) => {
//         if(err){ return console.log(err) }
//         // console.log(buf.slice(0).toString());
//
//     });
//
// });
// console.log('!!!! ' + buf.slice(0).toString());