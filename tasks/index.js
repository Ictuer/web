function run(web) {
    readDir(__dirname).forEach(f => {
        f != 'index.js' && require(__dirname + '/' + f)(web)
    })
}

module.exports = run
