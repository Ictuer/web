module.exports = function(web) {
    for(let model of web.models) {
        Log(model.name)
    }
}