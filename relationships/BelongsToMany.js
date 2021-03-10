const Relationship = require('../classes/Relationship')

class BelongsToMany extends Relationship {
    constructor(model, parent) {
        super(model, parent)
    }
}

module.exports = BelongsToMany
