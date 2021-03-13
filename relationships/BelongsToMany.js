const Relationship = require('../classes/Relationship')

class BelongsToMany extends Relationship {
    constructor(model, parent) {
        super(model, parent)
    }

    Pivot(model) {
        this.pivot = this.parent.parent.Model(model)
        return this
    }
}

module.exports = BelongsToMany
