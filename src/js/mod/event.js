var EventCenter = (function(){
    var events = {}
    var result = {}

    function on(type, handler){
        events[type] = events[type] || []

        events[type].push({
            handler: handler
        })
    }

    function fire(type, args){
        if(!events[type]){
            return
        }
        
        // var result = {}
        for(var i=0; i<events[type].length; i++){
            result[i] = events[type][i].handler(args)
        }
        
        return result
    }

    return {
        on: on,
        fire: fire,
        result: result
    }
})()

module.exports = EventCenter