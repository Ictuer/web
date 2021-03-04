class Type {
    constructor(name) {
        this.__name__ = name
        this.__type__ = this.constructor.name
    }

    name(name) {
        this.__name__ = name
    }

    notnull() {
        this.__notnull__ = true
    }

    unique() {
        this.__unique__ = true
        return this
    }

    length(length = 255) {
        this.__length__ = length
        return this
    }

    isRelationship() {
        return false
    }

}

module.exports = Type
