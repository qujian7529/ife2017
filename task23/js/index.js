
var div = document.getElementsByTagName('div');
console.log(1);
for(var i=0;i<div.length;i++){
    div[i].onclick=function(){
        console.log(i);
    }
}