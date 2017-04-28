// fb5753851edfdaa2853a4d49e2c400cb
//调用天行数据的API 
let ajax = new XMLHttpRequest;
console.log(ajax)
let quotesList = null;
ajax.onreadystatechange=function(){
    if(ajax.readyState == 4 && ajax.status == 200){
        quotesList = JSON.parse(ajax.responseText).newslist;
        extract(quotesList);
    }
}
ajax.open('GET','https://api.tianapi.com/txapi/dictum/?key=fb5753851edfdaa2853a4d49e2c400cb&num=50')
ajax.send();

let oView = document.querySelector('p');
let oBtn  = document.querySelector('input');
let aA  = [...document.getElementsByTagName('a')];
function randomNum(start, end){
    return Math.round(Math.random()*(end-start)+start);
}
function extract(list){
    let obj = list[randomNum(0,49)];
    oView.innerHTML = `${obj.content}<span>- ${obj.mrname}</span>`;
    bgColor();
    console.log(obj.content)
    window._bd_share_config = {
        common : {		
            bdText : obj.content,	
            bdDesc : obj.content,
            bdUrl : window.location.href	
        }
    };
}
function bgColor(){
    let color = `rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)})`;
    document.body.style.backgroundColor = color;
    oView.style.color = color;
    oBtn.style.background = color;
    aA.forEach(function(item){
        item.style.color = color;
    })
}

oBtn.addEventListener('click',function(){
    extract(quotesList)
})