require('dotenv').config()
require('./utils')

var tasks = require('./tasks')

const Laravel = require('./classes/Laravel')

var web = new Laravel('Laravel')

var User = web.Model('User')
User.String('username').Unique().Length(30)
User.String('password')
User.Integer('age').NotNull()
User.DateTime('created_at')
User.DateTime('updated_at')
User.BelongsTo('Node')


var Permission = web.Model('Permission')
Permission.Id('hi')
Permission.String('name')

web.View("hahaha");


({hi: '2222'}).log()

tasks(web)

Log(30)
Log(31)

