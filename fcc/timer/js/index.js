// red #dc2727 green #42cc42
const aA = document.querySelectorAll('.parameter a');
const aEm = document.querySelectorAll('.parameter em');
const oGo = document.querySelector('.go');
const oT = document.querySelector('.go p:nth-of-type(1)');
const oV = document.querySelector('.go p:nth-of-type(2)');

let nH = 1;
let nM = 5;
let nS = 0;
let timer = null;
let temp = 0;
let i = 0;
let boo = true;
let view = '00:05:00';
function time([h = '00', m = '05' , s = '00']){
    if(Number(h)<10){
        h = '0' + Number(h);
    }
    if(Number(m)<10){
        m = '0' + Number(m);
    }
    if(Number(s)<10){
        s = '0' + Number(s);
    }
    view = `${h}:${m}:${s}`;
    oV.innerHTML = view;
}

function bgColor(num){
    let str = '';
    i += 0.1;
    let n = i / temp;
    str = `linear-gradient(to top,#42cc42 ${n * 100}%,rgba(0,0,0,0) 0%);`
    oGo.style.backgroundImage = `linear-gradient(to top,#42cc42 ${n * 100}%,rgba(0,0,0,0) 0%)`
}
oGo.addEventListener('click',()=>{
    if(boo){
        boo = false;
        oT.innerHTML = '取消'
        let num = nH * 3600 + nM * 60 + nS;
        let h , m , s;
        temp = num;
        timer = setInterval(()=>{
            num -= 0.1;
            h = Math.floor(num / 3600);
            m = Math.floor(num % 3600 / 60);
            s = Math.floor(num % 3600 % 60);
            time([h,m,s]);
            bgColor();
            console.log(num)
            if(num <= 1){
                oT.innerHTML = '结束!'
                clearInterval(timer);
                i = 0;
            }
        },10)
    } else {
        boo = true;
        oT.innerHTML = 'GO';
        time([nH,nM]);
        clearInterval(timer);
        i = 0;
        oGo.style.backgroundImage = `linear-gradient(to top,#42cc42 0%,rgba(0,0,0,0) 0%)`
    }
})




aA[0].addEventListener('click',()=>{
    if(nH === 0){
        return;
    }    
    nH--;
    time([nH]);
    aEm[0].innerHTML = nH; 
})
aA[1].addEventListener('click',()=>{
    nH++;
    aEm[0].innerHTML = nH; 
    time([nH]);
})
aA[2].addEventListener('click',()=>{
    if(nM === 1){
        return;
    }    
    nM--;
    aEm[1].innerHTML = nM; 
    time([,nM]);
})
aA[3].addEventListener('click',()=>{
    nM++;
    aEm[1].innerHTML = nM; 
    time([,nM]);
})