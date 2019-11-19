var WaterFall = (function(){
    var $container
    function render($ct){
        var heightArr = []
        $container = $ct
        var $items = $ct.children()
        var wid = $items.outerWidth(true)
        var colNum = parseInt($(window).width()/wid)
        
        if(heightArr.length === 0){
            for(var i=0; i<colNum; i++){
                heightArr.push(0)
            }
        }
        $items.each(function(){
            var minIdx = 0
            var minHeight = heightArr[minIdx]
            for(var i=0; i<heightArr.length; i++){
                if(heightArr[i]<minHeight){
                    minIdx = i
                    minHeight = heightArr[i]
                }
            }
            
            $(this).css({
                top: minHeight,
                left: wid*minIdx
            })
            
            heightArr[minIdx] = minHeight + $(this).outerHeight(true)
        })
        return heightArr
    }

    $(window).on('resize', function(){
        render($container)
    })

    return {
        init: render
    }
})()

module.exports = WaterFall