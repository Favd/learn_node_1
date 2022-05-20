import fs from 'fs';

export function User(nic, password, name){
    this.nameNic = nic;
    this.userPassword = password;
    this.fullName = name;
    this.userIs = false;
    this.userPassOk = false

    this.save = function(writeAlways){

        if (this.userIs & !writeAlways) {return true}

        let fileExist = fs.existsSync('./data/users.txt');
        if (!fileExist) {
            fs.stat('./data', (err, stat) => {
                if (err) {
                    fs.mkdirSync('./data');
                }
                let arayUsers = new Array(
                    {nameNic:this.nameNic, fullName: this.fullName, userPassword: this.userPassword}
                    );
                try {
                    fs.writeFileSync('./data/users.txt', JSON.stringify(arayUsers),"utf-8");
                    this.userIs = true;
                    console.log('User saved');
                } catch (err) {
                    console.log(err);
                }
            });
        } else {
            if (this.check() & !writeAlways){
                this.userIs = true;
                return this.userIs;
            }

            let str = fs.readFileSync('./data/users.txt', 'utf8');
            let arayUsers = JSON.parse(str);
            let FoundUserIndex = arayUsers.findIndex(elem => elem.nameNic === this.nameNic);
            if (FoundUserIndex >= 0) {
                arayUsers[FoundUserIndex] = {nameNic: this.nameNic, fullName: this.fullName, userPassword: this.userPassword};
            } else {
                arayUsers.push({nameNic: this.nameNic, fullName: this.fullName, userPassword: this.userPassword});
            }
            let PPP = JSON.stringify(arayUsers);

            try {
                fs.writeFileSync('./data/users.txt', JSON.stringify(arayUsers),"utf-8");
                this.userIs = true;
                console.log('User saved');
            } catch (err) {
                console.log(err);
            }
        }}

    this.check = function (){

        let fileExist = fs.existsSync('./data/users.txt');
        if (!fileExist) {
            this.userIs = false;
            return false;
        } else {
            let str = fs.readFileSync('./data/users.txt', 'utf8');
            let arayUsers = JSON.parse(str);
            this.userIs = arayUsers.some((elem)=>{
                return elem.nameNic === this.nameNic;
            });
            return this.userIs;
        }}

    this.checkNicPassword = function (){

        let fileExist = fs.existsSync('./data/users.txt');
        if (!fileExist) {
            this.userPassOk = false;
            return false;
        } else {
            let str = fs.readFileSync('./data/users.txt', 'utf8');
            let arayUsers = JSON.parse(str);
            this.userPassOk = arayUsers.some((elem)=>{
                return elem.nameNic === this.nameNic && elem.userPassword === this.userPassword;
            });
            return this.userPassOk;
        }}

}

export function Answer(enterStatus = false, registrStatus = false, textStatus = ""){
    this.enterStatus = enterStatus;
    this.registrStatus = registrStatus;
    this.textStatus = textStatus;
}

