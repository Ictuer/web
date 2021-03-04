class Relationship {
    constructor(model, parent) {
        this.__type__  = this.constructor.name
        this.__parent__ = parent
        if(typeof model === 'string') {
            model = this.__parent__.__parent__.model(model)
        }
        this.__model__ = model
    }

    isRelationship() {
        return true
    }

}

module.exports = Relationship
