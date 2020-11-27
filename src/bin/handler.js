#!/usr/bin/env node

var net = require('net');
var stdin = process.openStdin();
var chalk = require("chalk");

module.exports.Handler =function Handler() {

    this.listen = (port) => {

        var server = net.createServer(function(connection) {
            console.log(chalk.greenBright('[+] New client : ', connection.remoteAddress + ':' + connection.remotePort));
            connection.on("error", (e) => {

                    setTimeout(() => {
                        connection.end()
                        console.log(chalk.yellow(`\n[!] Error, trying to reconnect`))
                        connection.connect(5000)
                    }, 2000);
                

            })
            connection.on("close", () =>{
                console.log(chalk.redBright(`\n[!] Error, connection closed`))


            })
            connection.on('end', function() {
                console.log(chalk.redBright(`\n\n[-] client disconnected `));
            });
            stdin.on("data", function(d) {
                connection.write(d.toString());
            });
            connection.on('data', function(d) {
                process.stdout.write(d.toString())
            });
        });
        server.listen(port, function() {
            console.log(chalk.greenBright(`\n[+] server listening  on ${port}`));
        });
    }
}
