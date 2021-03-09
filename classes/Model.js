const fs = require('fs')
const pluralize = require('pluralize')
const ExportAble = require('./ExportAble')

class Model extends ExportAble {
    constructor(name, parent) {
        super()
        this.name = name
        this.parent = parent
        this.fields = []
    }

    getTableName() {
        return this.name.split(/(?=[A-Z])/g).join('_').toLocaleLowerCase()
    }

    getModelName() {
        return this.name
    }
}

fs.readdirSync(__dirname + '/../types').map(type => type.replace('.js', '')).forEach(type => {
    Model.prototype[type] = function(name) {
        let field = this.fields.find(a => a.name == name)
        if(!field) {
            let clazz = require(__dirname + '/../types/' + type)
            field = new clazz(name, this)
            this.fields.push(field)
        }
        return field
    }
})

fs.readdirSync(__dirname + '/../relationships').map(type => type.replace('.js', '')).forEach(type => {
    Model.prototype[type] = function(name) {
        let field = this.fields.find(a => a.name == name)
        if(!field) {
            let clazz = require(__dirname + '/../relationships/' + type)
            field = new clazz(name, this)
            this.fields.push(field)
        }
        return field
    }
})

module.exports = Model
