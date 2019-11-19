var Sequelize = require('sequelize')
var sequelize = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: '../database/database.sqlite'
  })

/* 数据库连接测试
sequelize
.authenticate()
.then(function(err) {
console.log('Connection has been established successfully.');
})
.catch(function (err) {
console.log('Unable to connect to the database:', err);
})
*/

//创建
var User = sequelize.define('user', {  //自动创建id、createAt、updatedAt
        firstName: {
        type: Sequelize.STRING,
        field: 'first_name' // Will result in an attribute that is firstName when user facing but first_name in the database
        },
        lastName: {
        type: Sequelize.STRING
        }
    }, {
        freezeTableName: true // Model tableName will be the same as the model name
})

/*
User.sync()
.then(function () {
    User.create({           
        firstName: 'John',
        lastName: 'Hancock'
    })
}).then(function(){
    User.findAll({raw:true}).then(function(res){
        console.log(res)
    })
})*/
User.findAll({raw:true,where:{id:2}}).then(function(res){
    console.log(res)
})

