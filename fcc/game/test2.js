const oItemParent = document.querySelector('div.circles');//圆角父级
const aItem = document.querySelectorAll('div.circle');//4个圆角
const aMp3 = document.querySelectorAll('audio');//音频
const oRestart = document.querySelector('.restart > div');//重放
const oSwitch = document.querySelector('.off');//开关
const oCounter = document.querySelector('.title h1');//计数器
let timer = null;
let oGame = game(aItem);

// 重放
oRestart.addEventListener('mousedown',function(e){
    this.classList.add('click');
})
oRestart.addEventListener('click',function(e){
    if(oGame.canStart()){
        oGame.playback();
    }
    this.classList.remove('click');
})
// 按钮
oSwitch.addEventListener('click',function(e){
    this.classList.toggle('off');
    this.classList.toggle('on');
    if(this.classList.contains('on')){
        //开始游戏！
        oGame.go();
    }
    if(this.classList.contains('off')){
        //关闭游戏！为下一次开始准备
        oGame = game(aItem);
    }
})
//亮起
oItemParent.addEventListener('click',function(e){
    let itemNum = Number(e.target.dataset.item);
    console.log(oGame.canStart())
    if(oGame.canStart() == false || typeof itemNum !== 'number'){
        return;
    }
    let n = -1;
    switch(Number(itemNum)){
        case 0:
            n = 0;
        break;
        case 1:
            n = 1;
        break;
        case 2:
            n = 2;
        break;
        case 3:
            n = 3;
        break;
    }
    if(oGame.detection(n)){
        oGame.lightUp(e.target, n, 300);
        oGame.playMp3(1);
    } else {
        alert('走错了');
        oGame.playMp3(3);
        return;
    }
    if(oGame.length()<=0){
        setTimeout(function(){
            oGame.go();        
        },500)
    }
})
function game(domlist){
    const aBgColor = ['#00ff00','#ff0000','#ffff00','#007CFF'];
    const aiArr = ai();
    let steps = [];//用来检测用户按键的
    let stepsIndex = 0;

    let length = 0;//每次游戏 亮起的个数
    let start = false; //用户是否可以点击    
    
    
    //游戏开始
    function go(){
        if(i>=10){
            alert('游戏结束,你赢了!  确定将重开。');
            oGame = game(aItem);
            setTimeout(function(){
                oGame.go();
            },700)
            return 
        }
        start = false;
        length = aiArr[i].length;
        oCounter.innerText = length;
        steps = [];
        stepsIndex = 0;
        runArr();
    }
    //运行组
    let i = 0;
    let j = 0;
    function runArr(fun){
        if( aiArr[i] === undefined) {
            i = 0;
            return false;
        };
        let index = aiArr[i][j];
        if( index === undefined) {
            start = true;
            j = 0;
            i++;
            fun && fun();
            return false;
        };
        steps.push(index);
        lightUp(domlist[index], index, 1000, function(){
            runArr();
        })
        playMp3(0);
        j++;
    }
    //用户是否可以点击
    function canStart(){
        return start;
    }
    //每次游戏 亮起的个数
    function getLength(){
        return length;
    }
    //重放
    function playback(){
        i--;
        go();
    }
    //检测
    function detection(num){
        length--;
        if(num === steps[stepsIndex]){
            stepsIndex++;
            return true;
        } else {
            return false;
        }
    }

    //亮起
    function lightUp(dom, ind, time = 700, fun){
        let nowBgColor = getComputedStyle(dom).backgroundColor;
        dom.style.backgroundColor = aBgColor[ind];
        setTimeout(()=>{
            dom.style.backgroundColor = nowBgColor;
            fun && setTimeout(()=>{
                fun();
            },200)
        }, time)
    };
    //播放音效
    function playMp3(num){
        let mp3 = aMp3[num];
        mp3.currentTime = 0;
        mp3.play();
    }
    //产生10数组 每个数组中有对应索引值个数的项
    function ai(){
        let num = 0;
        let aiArr = new Array(10).fill(0).map((item, index)=>{
            let temp = -1;
            let a = new Array(index+1).fill(0).map( (item, index, arr) => {
                num = randomNum(0,3);
                while(num == temp){
                    num = randomNum(0,3);
                }
                temp =  num;
                return num;
            })
            return a;
        });
        return aiArr;
    }

    return{
        lightUp:lightUp,//亮起
        playMp3:playMp3,//播放 0-3
        go:go,//开始
        length:getLength,//亮起的个数
        canStart:canStart,//能否开始点击
        playback:playback,//重放
        detection:detection,//检测用户是否走对
    }
}
//随机数
function randomNum(start, end){
    return Math.round(Math.random()*(end-start) + start);
}