var express = require('express')
var router = express.Router()
var noteModel = require('../model/note.js')

// noteModel.findAll({raw:true}).then(function(e){
//     console.log(e)
// })
/* 获取所有notes */
router.get('/notes', function(req, res, next){
    noteModel.findAll({raw:true}).then(function(notes){
        console.log(notes)
        res.send({
            status:0,
            data: notes
        })
    })
})

/* 新增note */
router.post('/note/add', function(req, res, next){
    noteModel.create({           
        content: req.body.content,
        username: req.body.username
    }).then(function(){
        res.send({
            status: 0           
        })
    }).catch(function(){
        res.send({
            status: 1,
            errorMsg: '数据库异常'
        })
    })
})

/* 删除指定note */
router.post('/note/delete', function(req, res, next){
    noteModel.destory({where:{id:req.body.id}}).then(function(){
        res.send({
            status:0
        })
    })
})

/* 修改指定note */
router.post('/note/edit', function(req, res, next){
    noteModel.update({content:req.body.content}, {where:{id:req.body.id}}).then(function(){
        res.send({
            status: 0
        })
    })
})



module.exports = router