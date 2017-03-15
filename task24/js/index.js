function Observer(obj){
    this.data = {}; 
    for(let i in obj){
        this['data'][i] = obj[i];
        Object.defineProperty(this['data'],i,{
            set:function(newValue){
                console.log('你设置了'+i+'，新的值为'+newValue)
            },
            get:function(){
                console.log('你访问了'+i)
            }
        })
    }
}
let app1 = new Observer({
    name: 'youngwind',
    age: 25
});
console.log(app1);
let app2 = new Observer({
    university: 'bupt',
    major: 'computer'
});