function Observer(obj){
    this.data = {};
    function dataBinding(obj,attr,value){
        Object.defineProperty(obj,attr,{
            set:function(newValue){
                console.log('你设置了'+attr+'，新的值为'+newValue)
                return newValue;
            },
            get:function(){
                console.log('你访问了'+attr)
                return value;
            }
        })
    }
    function forIn(newObj,objValue){
        for(let i in objValue){
            newObj[i] = objValue[i];
            if(typeof  objValue[i] == 'object'){
                arguments.callee(newObj[i],objValue[i]);
            }
            dataBinding(newObj,i,objValue[i]);
        }
    }
    forIn(this.data,obj);
}
Observer.prototype.$watch=function(attr,fcc){
    function forIn(obj){
        for(let i in obj){
            if(i == attr){
                Object.defineProperty(obj,attr,{
                    set:fcc||set
                })
            }
            if(typeof obj[i] == 'object'){
                arguments.callee(obj[i]);
                return
            }
        }
    }
    forIn(this);
}

let app1 = new Observer({
    name: {
        firstName:{
            one:'one',
            two:'two'
        },
        lastName:'last'
    },
    age: 25
});
let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});
app1.$watch('age',function(age){
    console.log('我的年纪变了，现在已经是：'+age+'岁了');
})