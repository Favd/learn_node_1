import {User, Answer} from './usersMy.js';
import * as http from 'http';
import fs from "fs";


const host = 'localhost';
const port = 8000;

const requestListener = function (req, res) {

    if (req.method === 'GET') {
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

            } else if(received.stepEnter && received.nicName !== ''){
                console.log('raz');
                let user = new User(received.nicName, received.password);
                answer.enterStatus = user.checkNicPassword();
                if(answer.enterStatus){
                    answer.textStatus = "You are inside";
                } else {
                    answer.textStatus = "Enter error. Nik name or password is wrong";
                }

            } else if(!received.stepEnter && received.nicName !== '' && received.password !== ''){
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
                        answer.textStatus = "You are inside. Registration is OK";
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
