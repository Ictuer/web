require('dotenv').config()
require('../utils')
var tasks = require('../tasks')
const Model = require('./Model')


class Laravel {
    constructor(name) {
        this.env = require("../config/default-env.js")
        this.name   = name
        this.models = []
    }

    Model(name) {
        
        if (name instanceof Model) {
            return name
        }

        let model = this.models.find(m => m.name == name)

        if(!model) {
            model = new Model(name, this)
            this.models.push(model)
        }
        return model
    }

    export() {
        tasks(this)
    }

    output(p = '/') {
        return (__dirname + '/../output/' + this.name + '/' + p).path()
    }

    view(p) {
        return this.output('/resources/views/' + p)
    }

    controller(p) {
        return this.output('/app/Http/Controllers/' + p)
    }

    policy(p) {

    }

    request(p) {

    }

    clearOutput() {
        clear(this.output())
    }
}

module.exports = Laravel
