class ExportAble {
    constructor() {

    }

    export() {
        Log("Export of " + this.constructor.name + " is not ready")
    }
}

module.exports = ExportAble