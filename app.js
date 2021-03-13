const Laravel = require('./classes/Laravel')

var web = new Laravel('Laravel')

var User = web.Model('User')
User.String('username').Unique().Length(30)
User.String('password')
User.Integer('age').NotNull()
User.DateTime('created_at')
User.DateTime('updated_at')
User.BelongsTo('Role')
User.BelongsToMany("Comment")

User.Fillable(["username", "password", "age"])

web.export()


