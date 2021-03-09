const ExportAble = require("./ExportAble")

class View extends ExportAble {
    constructor(name) {
        super()
        this.name = name
    }

    export() {
        Log("Export View", this.name)
    }
}

module.exports = View