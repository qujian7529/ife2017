window.onload=function(){
    let oHeader = document.querySelector('.header>ul');
    let oAside = document.querySelector('aside>ul');
    let oBoard = document.querySelector('.board');
    let oPieces = document.querySelector('.pieces');
    let oBtn = document.querySelector('[type=button]');
    let oText = document.getElementById("text");
   
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
    
    
    oPieces.detectionChar =function(str){
        switch(str){
            case 'TRA LEF':
                oPieces.onMove('left');
                break;
            case 'TRA TOP':
                oPieces.onMove('top');
                break;
            case 'TRA RIG':
                oPieces.onMove('right');
                break;
            case 'TRA BOT':
                oPieces.onMove('bottom');
                break;
            case 'MOV LEF':
                oPieces.onMove('left',-90);
                break;
            case 'MOV TOP':
                oPieces.onMove('top',0);
                break;
            case 'MOV RIG':
                oPieces.onMove('right',90);
                break;
            case 'MOV BOT':
                oPieces.onMove('bottom',180);
                break;  
            default:
                alert('输入的指令有误');  
        }
    }
    oPieces.onMove = function(attr,deg){
        this.move(attr);
        this.rotate(deg);
    }
    oPieces.move=function (attr){
        let left = parseInt(getComputedStyle(this).left);
        let top = parseInt(getComputedStyle(this).top);   
        if(left%40!=0||top%40!=0){
            return false;
        } 
        if(attr=='left'){
            if(left>=40){
                this.style.left = left - 40 + 'px';
            }else{
                alert("撞墙了！");
            }
            return;
        };
        if(attr=='right'){
            if(left<=320){
                this.style.left = left + 40 + 'px';
            }else{
                alert("撞墙了！");
            }
            return;
        };
        if(attr=='top'){
            if(top>=40){
                this.style.top = top - 40 + 'px';      
            }else{
                alert("撞墙了！");
            }
            return;
        };
        if(attr=='bottom'){
            if(top<360){
                this.style.top = top + 40 + 'px';      
            }else{
                alert("撞墙了！");
            } 
            return;
        }
    }//方向的移动
    oPieces.rotate = function (deg){
        this.style.transform = 'rotate('+deg+'deg)';
        console.log(this.style.transform);
    }//图像的旋转
    oBtn.onclick=function(){
        if(oText.value==''){
            alert('请输入指令');
        }else{
            oPieces.detectionChar(oText.value);
        }
    }
}