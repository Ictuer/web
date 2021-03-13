function run() {
    readDir(__dirname).forEach(f => {
        f.endsWith(".js") && f != 'index.js' && require(__dirname + '/' + f)(...arguments)
        // Log(require('fs').statSync(__dirname + '/' + f).mtime)

    })
}

module.exports = run
