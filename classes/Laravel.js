const ExportAble = require("./ExportAble")
const pluralize = require('pluralize')

class Laravel {
    constructor(name) {
        this.name   = name
        this.output = __dirname + '/../output/'
    }

    export() {
        this.keys().filter(key => this[key][0] instanceof ExportAble)
        .map(key => this[key])
        .forEach(list => list.map(i => i.export()))
    }

}

readDir(__dirname).filter(i => i != "Laravel.js").forEach(i => {
    const className = i.replace(".js", "")
    const classNames = pluralize(className.toLowerCase())
    const clazz = require(__dirname + "/" + className)
    if(clazz.prototype instanceof ExportAble) {
        
        Laravel.prototype[className] = function(name) {
            this[classNames] = this[classNames] || []
            let instance = this[classNames].find(m => m.name == name)
            if(!instance) {
                instance = new clazz(name, this)
                this[classNames].push(instance)
            }
            return instance
        }
    }
})

module.exports = Laravel
