const ExportAble = require("./ExportAble")

class Migration extends ExportAble {
    constructor(name) {
        super()
        this.name = name
    }

    export() {
        Log("Export Migration", this.name)
    }
}

module.exports = Migration