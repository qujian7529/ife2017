window.onload=function(){
    console.log
    let oHeader = document.querySelector('.header>ul');
    let oAside = document.querySelector('aside>ul');
    let oBoard = document.querySelector('.board');
    let oPieces = document.querySelector('.pieces');
    let oBtn = document.querySelector('[type=button]');
    let oText = document.getElementById("text");
    let deg = 1;
    let className = 'piecesR';
    // 0 1 2 3   4个方向 上右 下 左
    oPieces.left=function(){
        let left = parseInt(getComputedStyle(this).left);
        if(left>=40){
            this.style.left = left - 40 + 'px';
            oPieces.go=arguments.callee;      
        }else{
            alert("撞墙了！");
        } 
    }
    oPieces.right=function(){
        let left = parseInt(getComputedStyle(this).left);
        if(left<=320){
            this.style.left = left + 40 + 'px';
            oPieces.go=arguments.callee;      
        }else{
            alert("撞墙了！");
        } 
    }
    oPieces.top=function(){
        let top = parseInt(getComputedStyle(this).top);
        if(top>=40){
            this.style.top = top - 40 + 'px';      
            oPieces.go=arguments.callee;      
        }else{
            alert("撞墙了！");
        } 
    }
    oPieces.bottom=function(){
        let top = parseInt(getComputedStyle(this).top);
        if(top<360){
            this.style.top = top + 40 + 'px';      
            oPieces.go=arguments.callee;      
        }else{
            alert("撞墙了！");
        } 
    }
    oPieces.addRemove = function(add,remove){
        this.classList.add(add);
        this.classList.remove(remove);
    }
    oPieces.go = oPieces.right;
    function detectionChar(){
        if(oText.value==''){   
            alert("不能为空")
            return;
        }else if(oText.value=='GO'){
            console.log(oPieces.go);
            oPieces.go();
            return;
        }else if(oText.value =='TUN LEF'){
            deg +=1;
        }else if(oText.value =='TUN RIG'){
            deg +=1;
        }else if(oText.value =='TUN BAG'){
            deg +=2;
        }
        onMove(deg);
    }
    function onMove(num){
        num %=4;
        if(num==0){
            oPieces.addRemove('piecesT',className);
            className = 'piecesT';
            oPieces.go = oPieces.top;
        }else if(num==1){
            oPieces.addRemove('piecesR',className);
            className = 'piecesR';
            oPieces.go = oPieces.right;
        }else if(num==2){
            oPieces.addRemove('piecesB',className);
            className = 'piecesB';
            oPieces.go = oPieces.bottom;
        }else if(num==3){
            oPieces.addRemove('piecesL',className);
            className = 'piecesL';
            oPieces.go = oPieces.left;
        }
    }
    function createNode(node,string){
        let n = document.createElement(node);
        if(string){
            let text = document.createTextNode(string);
            n.appendChild(text);
        }
        return n;
    }//创建节点
    for(let i = 0;i<10;i++){
        oHeader.appendChild(createNode('li',i+1));
        oAside.appendChild(createNode('li',i+1));
    }//生成 标尺
    oBtn.onclick=function(){
        detectionChar();
    }
    
}