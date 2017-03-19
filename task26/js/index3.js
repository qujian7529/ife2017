function Event(data){
    this.events = {};
    this.data = data;
}//模拟事件
Event.prototype.on = function(attr,callback){
    if(this.events[attr]){
        this.events[attr].push([callback]); 
    }else{
        this.events[attr] = [callback];
    }
};//事件保存
Event.prototype.off = function(attr){
    for(let key in this.events){
        if(this.events.hasOwnProperty(key) && key ===attr){
            delete this.events[key];
        }
    }
}//事件删除
Event.prototype.emit = function(attr,val,newVal,obj){
    let _this = this;
    Object.keys(this.events).forEach(function(key){
        let keyArr = key.split('.'); 
        let keyArrLast = keyArr[keyArr.length-1];
        if(keyArrLast === attr && _this.attributeChain(key,obj) ){
            _this.events[key].forEach(function(item){
                item(val,newVal);
            });
            _this.spread(keyArr,val,newVal);
        }
    })
}//运行事件

Event.prototype.attributeChain = function(attr,obj){
    let attrArr = attr.split('.');
    let tempObj = this.data;
    for(let i = 0 ;i<attrArr.length-1 ;i++){
        if(tempObj.hasOwnProperty(attrArr[i])){
            tempObj = tempObj[attrArr[i]];
        }else{
            return false;
        }
    }
    if(tempObj===obj){
        return true; 
    }else{
        return false;
    }
}//检测属性链 是否在对象上完全符合

Event.prototype.spread = function(keyArr,val,newVal){
    for(let i  = keyArr.length-2 ; i>=0 ;i--){
        if(this.events[keyArr[i]]){
            this.events[keyArr[i]].forEach(function(item){
                item(val,newVal);
            });
        }
    }
}//将事件传播      -2 因为第一个本身已经运行了事件
 



function Observer(data){
    this.data = data;
    this.traverse(this.data);
    Observer.prototype.eventBus = new Event(this.data);
}


Observer.prototype.setterAndGetter = function(key,val){
    let _this  = this;
    Object.defineProperty(this.data,key,{
        enmerable: true,
        configurable: true,
        get: function (){
            console.log('你访问了：'+key);
            return val;
        },
        set: function (newVal){
            if(newVal === val) {
                return;
            }
            _this.eventBus.emit(key,val,newVal,this);
            //运行事件 (没有事件运行后也不会发生任何事)

            val = newVal;
            console.log('你设置了：'+key+' 新值：'+val);

            if(typeof val === 'object'){
                // 对象的深度遍历
                new Observer(val);
            }
        }
    })
}
Observer.prototype.traverse = function(obj){
    let _this = this;
    Object.keys(obj).forEach(function(key){
        if(typeof obj[key] === 'object'){
            new Observer(obj[key]);
        }
        _this.setterAndGetter(key,obj[key]);
    })
}
Observer.prototype.$watch = function(attr,callback){
    this.eventBus.on(attr,callback);
}



var app = new Observer({
    age:11,
    name:{
        firstName:'first',
        lastName:'last',
        obj:{
            lzf:'刘志飞'
        }
    }
})

app.$watch('name',function(val,newVal){
    console.log('进行了传播');
})
app.$watch('name.firstName',function(val,newVal){
    console.log('完成某个任务');
})
app.$watch('age',function(val,newVal){
    console.log('回调函数');
})