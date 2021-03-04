const Model = require('./Model')

class Web {
    constructor(name) {
        this.__name__   = name
        this.__models__ = []
    }

    model(name) {
        let model = this.__models__.find(m => m.__name__ == name)
        if(!model) {
            model = new Model(name, this)
            this.__models__.push(model)
        }
        return model
    }


}

module.exports = Web
