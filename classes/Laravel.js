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

}

module.exports = Laravel
