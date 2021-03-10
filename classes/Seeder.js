const ExportAble = require("./ExportAble")

class Seeder extends ExportAble {
    constructor(name) {
        super()
        this.name = name
    }

    export() {
        Log("Export Seeder", this.name)
    }
}

module.exports = Seeder