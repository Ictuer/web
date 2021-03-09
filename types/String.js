const Type = require('../classes/Type')

class string extends Type {
    constructor(name) {
        super(name)
        this.LENGTH = 255
    }
}

module.exports = string
