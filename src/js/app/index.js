
$('.github-login').on('click', function(){
    $.get('/auth/github')
})

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