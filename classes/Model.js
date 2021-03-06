const fs = require('fs')
const pluralize = require('pluralize')

class Model {
    constructor(name, parent) {
        this.name = name
        this.parent = parent
        this.fields = []
        this.timestamps = true
    }

    Hidden(names) {
        names.forEach(name => {
            let field = this.fields.find(f => f.name === name)
            if(field) {
                field.Hidden()    
            } else {
                throw new Error("I do not know field " + name)
            }
        })
        return this
    }

    Fillable(names) {
        names.forEach(name => {
            let field = this.fields.find(f => f.name === name)
            if(field) {
                if(!field.isRelationship()) {
                    field.Fillable()    
                } else {
                    throw new Error("Can not add a relationship to fillable")
                }
                
            } else {
                throw new Error("I do not know field " + name)
            }
        })
        return this
    }

    Timestamps() {
        this.timestamps = true
        return this
    }

    get tableName() {
        return /^[A-Z]+[a-z]+$/.test(this.name) ? pluralize(this.name.toLowerCase()) :this.name.split(/(?=[A-Z])/g).join('_').toLocaleLowerCase()
    }

    get lowerName() {
        return this.name.toLowerCase()
    }

    get fillable() {
        return this.fields.filter(field => field.fillable)
    }

    get hidden() {
        return this.fields.filter(field => field.hidden)
    }

    get belongsTo() {
        return this.fields.filter(field => field.type == "BelongsTo").map(field => field.model)
    }

    get belongsToMany() {
        return this.fields.filter(field => field.type == "BelongsToMany").map(field => field.model)
    }

    get hasMany() {
        return this.fields.filter(field => field.type == "HasMany").map(field => field.model)
    }

    get hasOne() {
        return this.fields.filter(field => field.type == "HasOne").map(field => field.model)
    }

    linkTo() {
        return " => "
    }

    export() {
        Log("Export", this.constructor.name, this.name)
        writeFile(
            this.parent.output + '/' + this.name + '.php',
            render("backend/model.ejs", { self: this })
        )
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
