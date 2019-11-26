var Note = require('mod/note.js').Note
var NoteManager = (function(){
    function load(){
        $.get('/api/notes',function(res){
            if(res.status === 0){
                $.each(res.data, function(key, value){
                    var opt = {
                        id: value.id,
                        content: value.content,
                        username: value.username
                    }
                    new Note(opt)
                })
            }
        })
    }
    function add(){
        new Note()
    }

    return {
        load:load,
        add:add
    }
})()

module.exports = NoteManager