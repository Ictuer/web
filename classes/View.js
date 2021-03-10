const ExportAble = require("./ExportAble")

class View extends ExportAble {
    constructor(name, parent) {
        super()
        this.name = name
        this.parent = parent
        this.model = this.parent.Model(this.name)
    }

    export() {
        // Log("Export View", this.name)
    }
}

module.exports = View