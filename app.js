require('dotenv').config()
require('./utils')

var tasks = require('./tasks')

const Laravel = require('./classes/Laravel')

var web = new Laravel('Laravel')

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
web.model('User').belongsTo("Node").__parent__.__parent__.log()
view('test.ejs', {name: "Manh"}).log()

