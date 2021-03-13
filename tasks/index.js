function run() {
    readDir(__dirname).filter(f => f.endsWith(".js") && f != "index.js").sort((a, b) => {
        a = require(__dirname + '/' + a)
        b = require(__dirname + '/' + b)

        if(typeof a == 'function' && typeof b == 'function') {
            return 0
        }

        if(typeof a != 'function' && typeof b != 'function') {
            if(a.keys()[0] == b.keys()[0])
                return 0
            return a.keys()[0] > b.keys()[0] ? 1 : -1
        }

        if(typeof a == 'function') {
            return 1
        }

        return -1

    }).forEach(f => {
      
        let m = require(__dirname + '/' + f)
        if(typeof m === 'function') {
            m(...arguments)
        } else {
            if(m.keys().length > 0) {
                m[m.keys()[0]](...arguments)
            } else {
                Err(('Task ' + f + ' is invalid!!').red.bold)
            }
        }
    })
}

module.exports = run
