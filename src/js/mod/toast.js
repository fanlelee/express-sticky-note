require('less/toast.less')

function toast(msg, time){
    this.msg = msg
    this.time = time
    this.creatToast()
    this.showToast()
}



toast.prototype = {
    creatToast: function(){
        var tpl = '<div class="toast">'+this.msg+'</div>'
        this.$tpl = $(tpl)
        $('body').append(this.$tpl)
    },
    showToast: function(){
        var long = this.time||2000
        var _this = this
        this.$tpl.fadeIn(500, function(){
            setTimeout(function(){
                _this.$tpl.fadeOut(500, function(){
                    _this.$tpl.remove()
                })
            }, long)
        })
    }
}

function Toast(msg, time){
    return new toast(msg, time)
}


module.exports.Toast = Toast