require('dotenv').config()
require('./utils')

var tasks = require('./tasks')

const Laravel = require('./classes/Laravel')

var web = new Laravel('Laravel')

var User = web.Model('User')
User.String('username').Unique().Length(30).Fillable()
User.String('password').Fillable()
User.Integer('age').NotNull().Fillable()
User.DateTime('created_at')
User.DateTime('updated_at')

User.BelongsTo('Role')
User.BelongsToMany("Comment")

// Log(User.belongsTo)
tasks(web)