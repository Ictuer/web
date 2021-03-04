const fs = require('fs')

class Model {
    constructor(name, parent) {
        this.__name__ = name
        this.__parent__ = parent
        this.__fields__ = []
    }
}

fs.readdirSync(__dirname + '/../types').map(type => type.replace('.js', '')).forEach(type => {
    Model.prototype[type] = function(name) {
        let field = this.__fields__.find(a => a.__name__== name)
        if(!field) {
            let clazz = require(__dirname + '/../types/' + type)
            field = new clazz(name, this)
            this.__fields__.push(field)
        }
        return field
    }
})

fs.readdirSync(__dirname + '/../relationships').map(type => type.replace('.js', '')).forEach(type => {
    Model.prototype[type] = function(name) {
        let field = this.__fields__.find(a => a.__name__ == name)
        if(!field) {
            let clazz = require(__dirname + '/../relationships/' + type)
            field = new clazz(name, this)
            this.__fields__.push(field)
        }
        return field
    }
})

module.exports = Model
