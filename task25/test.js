

function nodeToFragment(node,vm){
    var flag = document.createDocumentFragment();
    var child;

    while( child = node.firstChild ){
        compile(child,vm);
        flag.appendChild(child);
    }

    return flag
}



function compile(node,vm){
    var reg = /\{\{(.*)\}\}/;
    //如果为元素节点
    if( node.nodeType === 1 ){
        var attr = node.attributes;//获取所有属性节点
        for(let i = 0 ; i<attr.length ; i++){
            if( attr[i].nodeName === 'v-model' ){// 检测属性节点的Key名是否为 'v-model'
                var name = attr[i].nodeValue;//获取相应的值
                node.addEventListener('input',function(e){
                    vm[name] = e.target.value;//e.taeget      触发事件的对象
                })
                node.value = vm[name];//将节点的value值改为 vue对象的数据 相对应的值
                node.removeAttribute('v-model')// 删除此属性节点
            }
        };

        new Watcher(vm,node,name,'input');
    }
    //节点为Text
    if( node.nodeType === 3 ){
        if(reg.test(node.nodeValue)){//是否是 {{}}  这种样式
            var name = RegExp.$1;//将第一组的内容取到
            name = name.trim();//删去前后空格
            // node.nodeValue = vm[name];// 将文本节点的nodeValue 赋值为 vue对象中对象的值
            
            new Watcher(vm,node,name,'text');    
        }
    }
}



//   定义   在...之前    在定义之前
function defineReactive(obj,key,val){
    //修改，或者添加属性    
    var dep = new Dep();
    Object.defineProperty(obj,key,{
        get: function(){
            if(Dep.target) dep.addSub(Dep.target);
            return val;
        },
        set: function(newValue){
            if(newValue === val) return;
            val = newValue;
            dep.notify();
            console.log(val);
        }
    });
}

//       观察
function observe(obj,vm){
    Object.keys(obj).forEach(function(key){
        defineReactive(vm,key,obj[key]);
    })
}



function Watcher (vm,node,name,nodeType){
    Dep.target = this;
    this.name = name;
    this.node = node;
    this.vm = vm;
    this.nodeType = nodeType;
    this.update();
    Dep.target = null;
}
Watcher.prototype = {
    get: function(){
        this.value = this.vm[this.name];
    },
    update: function(){
        this.get();
        if(this.nodeType =='text'){
            this.node.nodeValue = this.value;
        }
        if(this.nodeType =='input'){
            this.node.value = this.value;
        }
    }
}


function Dep(){
    this.subs = [];
}
Dep.prototype = {
    addSub: function(sub){
        this.subs.push(sub);
    },
    notify: function(){
        this.subs.forEach(function(sub){
            sub.update();
        })
    }
}



function Vue(options){
    this.data = options.data;

    observe(this.data,this)//将data的数据   加到对象中

    var id = options.el;
    var dom = nodeToFragment(document.getElementById(id),this);
    document.getElementById(id).appendChild(dom);
}
var vm = new Vue({
    el:'app',
    data:{
        text:'hello world'
    }
});