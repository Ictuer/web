require('dotenv').config()
require('./utils')

var tasks = require('./tasks')

const Web = require('./classes/Web')

var web = new Web('Laravel')

var User = web.model('User')
User.string('username').unique().length(30)
User.string('password')
User.integer('age').notnull()
User.datetime('created_at')
User.datetime('updated_at')
User.belongsTo('Node')

var Permission = web.model('Permission')
Permission.id('hi')
Permission.string('name')

tasks(web)
console.log(web.model('User').belongsTo("Node").__parent__.__parent__)
console.log(view('test.ejs', {name: "Manh"}))

//new
