class Type {
    constructor(name) {
        this.name = name
        this.type = this.constructor.name
    }

    Name(name) {
        this.name = name
    }

    NotNull() {
        this.notnull = true
    }

    Unique() {
        this.unique = true
        return this
    }

    Length(length = 255) {
        this.length = length
        return this
    }

    IsRelationship() {
        return false
    }

}

module.exports = Type
