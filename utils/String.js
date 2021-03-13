require('colors') // https://www.npmjs.com/package/colors

String.prototype.path = function() {
    return require('path').resolve(this + '')
}


