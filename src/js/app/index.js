// var Toast = require('../mod/toast.js').Toast
// Toast('hello', 1000)

// var event = require('../mod/event.js')
// event.on('haha', function(data){
//     console.log('yes')
//     console.log(data)
// })

// obj = {
//     a:1,
//     b:'bbb'
// }
// event.fire('haha', obj)

// var o = {a:[1,2,3],b:'ddd'}
// for(var key in o){
//     console.log(o[key])
// }


// var Note = require('mod/note.js').Note
var NoteManager = require('mod/note-manager.js')
var Event = require('mod/event.js')
var WaterFall = require('mod/waterfall.js')

Event.on('waterfall', function(){
    return WaterFall.init($('.content'))
})

$('.add-note').on('click', function(){
    NoteManager.add()
})
NoteManager.load()
// new Note({id:1, username:'fanlelee', content:'input here'})
// new Note({id:2, username:'dinglelee', content:'米瑞索拉西多啦米瑞索拉西多啦米瑞索拉西多啦'})
// new Note({id:3, username:'dinglelee', content:'米瑞索拉西多啦米瑞索拉西多啦米瑞索拉西多啦'})

// Event.fire('waterfall')
// WaterFall.init($('.content'))
// console.log(WaterFall['heightArr'])