// 1：数据改动时通知
// . 深度遍历
// 2：加入回掉函数
function Event(){
    this.events = {};
}
Event.prototype.on = function(attr,callback){
    if(this.events[attr]){
        this.events[attr].push(callback);
    }else{
        this.events[attr] = [callback];
    }
}
Event.prototype.off = function(attr){
    for(let key in this.events){
        if(this.events.hasOwnProperty(key) && key === attr){
            delete this.events[key];
        }
    }
}
Event.prototype.emit = function(attr,key,newVal){
    this.events[attr] && this.events[attr].forEach(function(item){
        item(key,newVal);
    })
}





function Observer(json){
    this.data = json;
    this.eventsBus = new Event();
    this.traversal(this.data);
};

Observer.prototype.setAndGet = function(obj,attr,val){
    let _this = this;
    Object.defineProperty(obj,attr,{
        set:function(newVal){
            if(val === newVal) {
                console.log(1); 
                return ;
            } 
            _this.eventsBus.emit(attr,val,newVal);
            val = newVal;
            console.log('你修改了'+attr+'新值为：'+val);
        },
        get:function(){
            console.log('你访问了'+attr);
            return val;
        }
    })
};

Observer.prototype.traversal = function(obj){
    let _this = this;
    Object.keys(obj).forEach(function(key){
        if(typeof obj[key] == 'object'){
            _this.traversal(obj[key]);
        }// 深度遍历
        _this.setAndGet(obj,key,obj[key]);
    })
};

Observer.prototype.$watch = function(attr,callback){
    this.eventsBus.on(attr,callback);
}





let app1 = new Observer({
    name:'lzf',
    age:{
        num:11,
        sum:12
    }
})
app1.$watch('name',function(val,newVal){
    console.log(val+'--'+newVal);
})