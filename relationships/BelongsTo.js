const Relationship = require('../classes/Relationship')

class belongsTo extends Relationship {
    constructor(model, parent) {
        super(model, parent)

    }
}

module.exports = belongsTo
