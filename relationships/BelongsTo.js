const Relationship = require('../classes/Relationship')

class BelongsTo extends Relationship {
    constructor(model, parent) {
        super(model, parent)
    }
}

module.exports = BelongsTo
