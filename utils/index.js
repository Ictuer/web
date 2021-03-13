const fs = require('fs')
const ejs = require('ejs')


global.Log = function() {
    var originalFunc = Error.prepareStackTrace;

    var callerFile;
    try {
        var err = new Error();
        var currentFile;
        var currentLine;
        var current

        Error.prepareStackTrace = function (err, stack) { return stack; };
        current = err.stack.shift()
        currentFile = current.getFileName();
        currentLine = current.getLineNumber();

        while (err.stack.length) {
            current = err.stack.shift()
            callerFile = current.getFileName();
            currentLine = current.getLineNumber();
            if(currentFile !== callerFile) break;
        }
    } catch (e) {}

    Error.prepareStackTrace = originalFunc; 
    
    if (process.env.DEBUG == "true") {
        console.log(callerFile.split("/").pop().replace(".js","").yellow.bold + `[${currentLine}]`.cyan, ...arguments)  
    } else {
        console.log(...arguments)
    }
     
}

fs.readdirSync(__dirname).forEach(f => {
    require(__dirname + '/' + f)
})


global.render = (path, data) => {
    return ejs.render(fs.readFileSync(__dirname + '/../templates/' + path, 'utf-8'), data, {
        outputFunctionName: "echo",
        views: [__dirname + '/../templates/']
    })
}

global.env = (key, dft) => {
    return process.env[key] ?? dft
}

global.writeFile = (path, content) => fs.writeFileSync(path, content)
global.readFile = path => fs.readFileSync(path, 'utf-8')
global.readDir = path => fs.readdirSync(path)

