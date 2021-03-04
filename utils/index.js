const fs = require('fs')
const ejs = require('ejs')

fs.readdirSync(__dirname).forEach(f => {
    require(__dirname + '/' + f)
})


global.view = (path, data) => {
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

