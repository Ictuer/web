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
global.isNumber = num => !isNaN(parseFloat(num)) && !isNaN(num - 0)
global.bash = script => require('child_process').execSync(script).toString()
global.bashAt = (dir, script) => require('child_process').execSync(`cd ${dir}; ${script}`).toString()
global.mkdir = path => {
    root = ''
    path.split(/\/+/).forEach(i => {
        root +=  i + '/'
        if(!fs.existsSync(root)) {
            fs.mkdirSync(root)
        }
    })
}

global.rm = path => bash(`rm -rf ${path}`)
global.cp = (p1, p2) => bash(`cp -rf ${p1} ${p2}`)
global.clear = (path, except = []) => {
    if(!fs.existsSync(path)) {
        return false
    }

    let res = {deleted: 0, skip: 0}
    
    fs.readdirSync(path).forEach(f => {
        if(!except.includes(f)) {
            let link = path + '/' + f
            rm(link)
            res.deleted++
        } else {
            res.skip++
        }
    })

    return res
}

global.query = query => bash(`mysql -u"${env('DB_USERNAME')}" ${env('DB_PASSWORD') ? '-p"' + env('DB_PASSWORD') + '"': ''} -e"${query}"`)

