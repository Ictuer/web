const Relationship = require('../classes/Relationship')

class BelongsToMany extends Relationship {
    constructor(model, parent) {
        super(model, parent)
    }

    Pivot(name) {
        this.pivot = this.parent.Model(name)
        return this
    }
}

module.exports = BelongsToMany
