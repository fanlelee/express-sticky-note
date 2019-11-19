require('less/note.less')
var Event = require('mod/event.js')
var Toast = require('mod/toast.js').Toast

function Note(opt){
    this.opt = opt
    this.initOpt()
    this.createNote()
    this.setStyle()
    this.setlayout()
    this.bindEvent()
}
Note.prototype = {
    colors: [
        ['#ea9b35','#efb04e'], // headColor, containerColor
        ['#dd598b','#e672a2'],
        ['#eee34b','#f2eb67'],
        ['#c24226','#d15a39'],
        ['#c1c341','#d0d25c'],
        ['#3f78c3','#5591d2']
    ],  
    defaultOpt: {
        id: '',
        content: 'input here',
        username: ''
    },
    initOpt: function(){
        this.opt = $.extend({}, this.defaultOpt, this.opt)
    },
     
    createNote: function(){
        var tpl = '<div class="note">'
                    +'<div class="note-head">'
                        +'<span class="note-username"></span>'
                        +'<span class="note-delete">x</span>'
                    +'</div>'
                    +'<div class="note-content" contenteditable="true"></div>'
                  +'</div>'
        this.$note = $(tpl)
        this.$note.find('.note-username').text(this.opt.username)
        this.$note.find('.note-content').text(this.opt.content)
        $('.content').append(this.$note)
    },
    setStyle: function(){        
        var colorArr = this.colors[Math.floor(Math.random()*6)]
        this.$note.find('.note-head').css('background-color', colorArr[0])
        this.$note.find('.note-content').css('background-color', colorArr[1])

    },
    setlayout: function(){
        var eResult = Event.fire('waterfall')

        //设置容器高度
        eResult[0].sort(function(a, b){
            if(a>b) return -1
            if(a<b) return 1
            return 0
        })
        if(window.innerHeight>eResult[0][0]){
            $('.content').css('height',window.innerHeight+'px')
        }
    },

    bindEvent: function(){
        var _this = this
            $note = this.$note
            $delete = $note.find('.note-delete')
            $noteHead = $note.find('.note-head')
            $noteContent = $note.find('.note-content')

        //移动note 3个事件：鼠标点击、鼠标移动、鼠标弹起
        $noteHead.on('mousedown', function(e){
            var x = e.pageX - $(this).parent().offset().left
            var y = e.pageY - $(this).parent().offset().top
            $(this).parent().addClass('dragable').data('move',{ex:x, ey:y})
        }).on('mouseup', function(){
            $(this).parent().removeClass('dragable').removeData('move')
        })
        $('.content').on('mousemove', function(e){
            if($('.dragable').length === 1){
                var ox = e.pageX - $('.dragable').data('move').ex
                var oy = e.pageY - $('.dragable').data('move').ey
                $('.dragable').offset({
                    left: ox,
                    top: oy
                })
            }
        })

        //编辑保存  contenteditable没有change事件，这里用focus(获得焦点)、blur(失去焦点)
        $noteContent.on('focus', function(e){
            if($(this).html()==='input here') $(this).html('')
            $(this).data('beforeContent', $(this).html())
        }).on('blur', function(){
            if($(this).data('beforeContent')!==$(this).html()){ //识别到内容发生改变
                if(_this.opt.id){
                    _this.edit(_this.opt.id,$(this).html())
                }else{
                    _this.add($(this).html())
                }
            }
            $(this).removeData('beforeContent')
        })


        //删除事件
        $delete.on('click',function(){
            _this.delete()
        })

    },
    add: function(content){
        var _this = this
        $.post('/api/note/add',{
            content: content,
            username: _this.opt.username
        }).done(function(res){
            console.log(res)
            if(res.status === 0){
                Toast('添加成功!')
                Event.fire('waterfall')
            }else{
                _this.$note.remove()
                Toast(res.errorMsg)
            }
        })
    },
    delete: function(id){
        var _this = this
        $.post('/api/note/delete',{
            id:id
        }).done(function(res){
            if(res.status === 0){
                Toast('删除成功！')
                _this.$note.remove()
                Event.fire('waterfall')
            }
        })
    },
    edit: function(id, content){
        console.log('edit')
        $.post('/api/note/edit',{
            id:id,
            content:content
        }).done(function(res){
            if(res.status === 0){
                Toast('修改成功！')
                Event.fire('waterfall')
            }
        })
    }
}

module.exports.Note = Note