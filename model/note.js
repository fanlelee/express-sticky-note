var Sequelize = require('sequelize')
var path = require('path')

var sequelize = new Sequelize('', '', '', {
    host: 'localhost',
    dialect: 'sqlite',
    storage: path.join(__dirname, '../database/database.sqlite')
  })

var Note = sequelize.define('note', {  //自动创建id、createAt、updatedAt
    content: {
        type: Sequelize.STRING
    },
    username: {
        type: Sequelize.STRING
    }
})

/*
Note.sync()
.then(function () {
    Note.create({           
        content: 'ffffi 哦蟆 vi 特科技的人们分位居 i 感觉',
        username: 'fanlelee'
    })
}).then(function(){
    Note.findAll({raw:true}).then(function(res){
        console.log(res)
    })
})*/

module.exports = Note
