window.onload=function(){
    var oBtn = document.querySelector('body>[type=button]');
    var oPopup = document.querySelector('.popup');
    var popupBtn = oPopup.querySelectorAll('[type=button]');
    var oBox = document.querySelector('.popup>.box');
    function controlPopup(obj){
        let bounced = obj.bounced||null;//弹出层
        if(bounced==null){
            return false;
        }
        let bgNode = bounced.parentNode||null;//获取背景Div
        let mobile = obj.mobile||false;//是否可拉伸
        let drag  = obj.drag||false;//是否可拖拽
        let display = obj.display||'none';//默认不显示
        let height = obj.height||parseInt(getComputedStyle(bounced).height);//获取高度 不带单位
        let width = obj.width||parseInt(getComputedStyle(bounced).width);//获取宽度 不带单位
        bounced.style.left = window.innerWidth/2-width/2+'px';
        bounced.style.top = window.innerHeight/2-height/2+'px';
        let left = parseInt(getComputedStyle(bounced).left);
        let top = parseInt(getComputedStyle(bounced).top);
        
        bgNode.style.display=display;
        bounced.addEventListener('click',function(){
            event.stopPropagation ? event.stopPropagation() :   (event.cancelBuddle = true);
        },false);
        bgNode.onclick=function(){
            this.style.display="none";
        }
        //拉伸事件
        let oDivr = bounced.querySelector('div.r');
        let oDivb = bounced.querySelector('div.b');
        let oDivrb = bounced.querySelector('div.rb');
        (function(){
            if(mobile==false){
                return false;
            }
            let height = parseInt(getComputedStyle(bounced).height);
            let width = parseInt(getComputedStyle(bounced).width);
            oDivr.onmousedown=function(){
                if(mobile==false){
                    return false;
                }
                event.stopPropagation ? event.stopPropagation() :   (event.cancelBubble = true);
                let e = window.event;
                let eX = e.clientX;
                let eY = e.clientY;
                window.onmousemove=function(){
                    e = window.event;
                    bounced.style.width = width + e.clientX-eX +'px';
                    this.onmouseup=function(){
                        width = parseInt(getComputedStyle(bounced).width);
                        this.onmousemove=null;        
                    }
                }
            }
            oDivb.onmousedown=function(){
                if(mobile==false){
                    return false;
                }
                event.stopPropagation ? event.stopPropagation() :   (event.cancelBubble = true);
                let e = window.event;
                let eX = e.clientX;
                let eY = e.clientY;
                window.onmousemove=function(){
                    e = window.event;
                    bounced.style.height = height + e.clientY-eY +'px';
                    this.onmouseup=function(){
                        height = parseInt(getComputedStyle(bounced).height);
                        this.onmousemove=null;        
                    }
                }
            }
             oDivrb.onmousedown=function(){
                if(mobile==false){
                    return false;
                }
                event.stopPropagation ? event.stopPropagation() :   (event.cancelBubble = true);
                let e = window.event;
                let eX = e.clientX;
                let eY = e.clientY;
                window.onmousemove=function(){
                    e = window.event;
                    bounced.style.width = width + e.clientX-eX +'px';
                    bounced.style.height = height + e.clientY-eY +'px';
                    this.onmouseup=function(){
                        width = parseInt(getComputedStyle(bounced).width);
                        height = parseInt(getComputedStyle(bounced).height);
                        this.onmousemove=null;        
                    }
                }
            }
        })();
        //拉伸

        //拖拽事件
        bounced.onmousedown=function(){
            if(drag==false){
                return false;
            }
            let e = window.event;
            
            let eX = e.clientX;
            let eY = e.clientY; 
            this.onmousemove=function(){
                e = window.event;
                this.style.left = left + e.clientX-eX+'px';   
                this.style.top = top + e.clientY-eY +'px'; 
                event.stopPropagation ? event.stopPropagation() :   (event.cancelBubble = true);//阻止事件的传播 兼容写法
            };
            bounced.onmouseup=function(){
                this.onmousemove=null;
                left = parseInt(getComputedStyle(bounced).left);
                top = parseInt(getComputedStyle(bounced).top);
            };
        };
        
        return {
            onDrag:function(boo){
                drag = boo;
            },
            onDisplay:function(display){
                bgNode.style.display = display;
            },
            onMoblie:function(moblie){
                moblie=moblie;
            }
        }
    }
    let obj = new controlPopup({
        bounced:oBox,
        mobile:true,
        drag:true,
        display:'none'
    });
    // obj.onDrag(false);
    oBtn.onclick=function(){
        obj.onDisplay('block');
    }
    popupBtn[0].onclick=function(){
        obj.onDisplay('none');
    }
    popupBtn[1].onclick=function(){
        obj.onDisplay('none');
    }
}