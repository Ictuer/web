class Relationship {
    constructor(model, parent) {
        this.type  = this.constructor.name
        this.parent = parent
        if(typeof model === 'string') {
            model = this.parent.parent.Model(model)
        }
        this.model = model
    }

    IsRelationship() {
        return true
    }
}

module.exports = Relationship
