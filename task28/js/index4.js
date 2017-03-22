function insertAfter( newElement, targetElement){
   var parent = targetElement.parentNode;
   if ( parent.lastChild == targetElement ){
        parent.a( newElement );
   }else{
        parent.insertBefore( newElement, targetElement.nextSibling );
   }
}
function Event(data){
    this.events = {};
    this.data = data;
    this.spread = true;//控制是否传播
}
Event.prototype.on = function(attr,callback){
    if(this.events[attr]){
        this.events[attr].push(callback);
    }else{
        this.events[attr] = [callback];
    }
}//事件绑定
Event.prototype.off = function(attr){
    for(let ket in this.evnets){
        if(key === attr && this.events.hasOwnProperty(attr)){
            delete this.events[attr];
        }
    }
}//事件取消
Event.prototype.emit = function(attr,obj,val,newVal){
     //检查是否有该属性的回调
     //是否完全符合属性链
     //触发属性链上的所有回调(可控制)
     let callbackArr = [];
     let _this = this;
     Object.keys(this.events).forEach(function(key){
        let attrArr = key.split('.');
        let attrLast = attrArr[attrArr.length-1];
        if(attrLast === attr && attributeChain(attrArr,obj)){
            callbackArr = callbackArr.reduce(function(a,b){
                return a.concat(b);
            })//回调数组扁平化
            callbackArr.forEach(function(callback){
                if(typeof callback === 'function'){
                    callback();
                }//运行回调

                if(callback.nodeType === 3){
                    callback.nodeValue = newVal;
                } //数据绑定节点
            })//依次运行数组中的回调         并且如果有绑定的数据的文本节点 将文本节点也修改
        }
     })
     function attributeChain(attrArr,obj){
        let tempObj = _this.data;
        let i ;
        for( i = 0 ; i<attrArr.length-1; i++){
            if(tempObj[attrArr[i]]){
                tempObj = tempObj[attrArr[i]];
                if(_this.events[attrArr[i]] && _this.spread){
                    callbackArr.unshift(_this.events[attrArr[i]]);
                    //将父辈的回调存入数组  用了实现事件传播
                }
            }else{
                callbackArr = []
                return false;
            }
        }
        if(tempObj === obj){
            callbackArr.unshift(_this.events[attrArr.join('.')])
            //检查完后  由于attrArr是个数组 在用 "."合并去找到其回调函数
            // 例如：user.name 回调函数存在 属性名为user.name中 
            return true;
        }else{
            callbackArr = []
            return false;
        }
     }
}//事件触发



function Vue (json){
    this.id = json.el.split('#')[1];
    this.data = json.data;
    this.traverse(this.data);
    this.eventsBus = new Event(this.data);

    let dom = this.nodeToFragment(document.getElementById(this.id));
    document.getElementById(this.id).appendChild(dom);
}
Vue.prototype.nodeToFragment = function(node){
    let frag = document.createDocumentFragment();
    let child ;
    while( child = node.firstChild ){
        this.compile(child);
        frag.appendChild(child);
    }
    return frag;
}//劫持节点
Vue.prototype.compile = function(node){
    let reg = /\{\{(.*)\}\}/;
    if(node.nodeType === 1){
        this.compile(node.firstChild);
    }
    if(node.nodeType === 3){
        if(reg.test(node.nodeValue)){
            let attr = RegExp.$1;
            atrr = attr.trim();
            let attrArr = attr.split('.');
            let data = this.data;
            for(let i = 0 ;i<attrArr.length; i++){
                data = data[attrArr[i]];
            }


            let indexAttr = reg.exec(node.nodeValue)[0];
            let num = node.nodeValue.indexOf(indexAttr)
            node.nodeValue = node.nodeValue.replace(indexAttr,"");//将文本中 {{text}} 去掉
            node.splitText(num);//将文本节点分开
            let textNode = document.createTextNode(data);
            insertAfter(textNode,node.parentNode.firstChild);//插入

            //将和数据绑定的节点 传入
            if(this.eventsBus.events[attr]){
                this.eventsBus.events[attr].push(textNode); 
            }else{
                this.eventsBus.events[attr] = [textNode];
            }
        }
    }
}//节点编译
Vue.prototype.setterAndGetter = function(obj,key,val){
    let _this = this;
    Object.defineProperty(obj,key,{
        get:function(){
            // console.log('你访问了'+key);
            return val;
        },
        set:function(newVal){
            if(val === newVal){ return}
            console.log('你修改了'+key+'    新的值为：'+newVal);
            _this.eventsBus.emit(key,this,val,newVal);//实现 回调和 数据绑定节点

            val = newVal;
            
            if(typeof newVal === 'object'){
                _this.traverse(newVal);
            }
        }
    })
}//数据在访问和修改进行的操作
Vue.prototype.traverse = function(obj){
    let _this = this;
    Object.keys(obj).forEach(function(key){
        if(typeof obj[key] === 'object'){
            _this.traverse(obj[key]);
        }
        _this.setterAndGetter(obj,key,obj[key]);
    })
}//遍历 给所有属性 加上set get
Vue.prototype.$watch = function(attr,callback){
    this.eventsBus.on(attr,callback);
}//事件绑定


let app = new Vue({
  el: '#app',
  data: {
    user: {
      name: 'youngwind',
      age: 25,
    },
    schoold:'bupt',
    major:'computer'
  }
});

app.$watch('user',function(){
    console.log('向上传递回调！');
})
app.$watch('user.age',function(){
    console.log('回调2！');
})
app.$watch('user.obj.a',function(){
    console.log('别出BUG!!!!!!!!!!!!!');
})
