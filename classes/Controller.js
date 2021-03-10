const ExportAble = require("./ExportAble")

class Controller extends ExportAble {
    constructor(name) {
        super()
        this.name = name
    }

    export() {
        // Log("Export Controller", this.name)
    }
}

module.exports = Controller