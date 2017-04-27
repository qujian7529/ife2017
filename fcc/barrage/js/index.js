    let oView = document.getElementsByTagName('section')[0];
    let oText = document.querySelector('[type="text"]');
    let oLaunch = document.getElementById('launch');
    let oClear = document.getElementById('clear');
    let height = parseInt(getComputedStyle(oView).height,10);
    oLaunch.addEventListener('click',function(){
        if(oText.value.length<=0){
            barrageHair('6666666666');
        } else {
            barrageHair(oText.value);
            oText.value = '';
        }
    },false)
    oClear.addEventListener('click',function(){
        oView.innerHTML = '';
    })



    barrageHair('hellow');
    setTimeout(function(){
        barrageHair('测试文本');
    },500);
    setTimeout(function(){
        barrageHair('测试文本');
        barrageHair('大家好！');
    },1500);
    setTimeout(function(){
        barrageHair('我是弹幕君!');
    },2000);

    

    function barrageHair(val){
        let str = dataView(val);
        let node = createNode(str);
        oView.appendChild(node);
        onMove(node, oView.offsetWidth);
    }
    function onMove(node, width, ms=5000){
        let speed = width / ms * 10;
        let length = 0;
        move();
        function move(){
            length = length + speed;    
            node.style.transform  = `translateX(-${length}px)`;
            node.timer = setTimeout(move,10)
            if(length >= width+node.offsetWidth){
                clearTimeout(node.timer);
                try{
                    node.parentNode.removeChild(node);
                } catch(e){
                    return
                }
            }
        }
    }
    function dataView(val){
        let ndSpan =  `<span style="width:${val.length*22}px;color:rgb(${randomNum(0,255)},${randomNum(0,255)},${randomNum(0,255)});left:100%;top:${randomNum(0, height/1.4)}px;">${val}</span>`;
        return ndSpan;
    }
    function createNode(htmlStr){
        let div = document.createElement('div');
        div.innerHTML = htmlStr;
        return div.childNodes[0];
    }
    function randomNum(start, end){
        return Math.round(Math.random()*(end-start) + start);
    }