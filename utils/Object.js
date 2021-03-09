Object.prototype.log = function() {
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
        console.log(callerFile.split("/").pop().yellow.bold + `[${currentLine}]`.cyan, this)  
    } else {
        console.log(this)
    }

    return this
}

Object.prototype.keys = function() { 
    return Object.keys(this) 
}


Object.prototype.assign = function(data) {
    Object.assign(this, data)
}