class Type {
    constructor(name) {
        this.name = name
        this.type = this.constructor.name
    }

    Name(name) {
        this.name = name
    }

    NotNull() {
        this.notNull = true
        return this
    }

    Unique() {
        this.unique = true
        return this
    }

    Length(length = 255) {
        this.length = length
        return this
    }

    Fillable() {
        this.fillable = true
        return this
    }

    isRelationship() {
        return false
    }

}

module.exports = Type
