Object.prototype.log = function() {
    if(this instanceof String) 
        console.log(this + '')
    else
        console.log(this)

    return this
}

Object.prototype.keys = function() { 
    return Object.keys(this) 
}


Object.prototype.assign = function(data) {
    Object.assign(this, data)
}