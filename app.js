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

User.BelongsToMany("User").Pivot(User)

web.export()

web.clearOutput()

Log(web.view("admin/index.js"))
Log(web.view("admin/edit.js"))
Log(web.controller("admin/controller.js"))



