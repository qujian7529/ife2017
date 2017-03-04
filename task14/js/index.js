window.onload=function(){
  var aBtn = document.querySelectorAll('input');
  var oRoot = document.querySelector('.root');
  const aDiv = document.getElementsByTagName('div');

  function animation(obj){
    obj.switch = !obj.switch;
    //遍历过后 就为true;
    if(obj.switch==false){
      //说明第一个 又开始了 可以结束遍历了
      alert('遍历结束');
      return initialize();
    }
    clearTimeout(obj.timer);
    obj.classList.add('blue');
    obj.timer=setTimeout(function(){
      obj.classList.remove('blue');  
    },500);
    return true;
  }//加 'blue'类名  0.5s后消失
  function get_nextSibling(obj){
    let y = obj.nextSibling;
    if(y==null){
      return null;
    }
    while(y.nodeType!=1){
      y = y.nextSibling;
      if(y==null){
        return null;
      }
    }
    return y;
  }//获取下个兄弟节点
  function get_previousSibling(obj){
    let y = obj.previousSibling;
    if(y==null){
      return null;
    }
    while(y.nodeType!=1){
      y = y.previousSibling;
      if(y == null){
        return null;
      }
    }
    return y;
  }//获取前一个兄弟节点
  function initialize(){
    for(let i = 0;i<aDiv.length;i++){
      aDiv[i].left= false;
      aDiv[i].right= false;
      aDiv[i].switch = false;
    }
    return false;
  }//初始化节点属性  left right代表方向,false表示节点还没遍历
  //用switch来检测每个元素是否被遍历过一次
  function disabled(boo){
    for(let i=0;i<aBtn.length;i++){
      aBtn[i].disabled = boo;
    }
  }//遍历时禁用按钮

  function recursion(obj,color){
    color = color;//控制是否加'blue'类名
    let boo = obj.hasChildNodes();
    let previous = get_previousSibling(obj);
    let next = get_nextSibling(obj);
    let fNode = obj.children[0];
    let lNode = obj.children[1];
    if(obj.parentNode==null){
      return;
    }//说明遍历完了

    if(color){
      if(!animation(obj)){
        disabled(false);
        return;
      };
    }
    if(fNode && obj.left==false){
      //如果有孩子节点 而且左节点还没有遍历 就执行
      setTimeout(function(){
        obj.left = true;
        recursion(fNode,true);
      },500)
    }else if(next && obj.parentNode.right==false){
      // 当左节点遍历到底 而且节点有右兄弟 
      // 而且其父元素的right==false 说明这个右兄弟还没遍历到
      setTimeout(function(){
        obj.parentNode.right = true;
        recursion(next,true);
      },500)
    }else if(obj.parentNode.right){
      //当节点的父元素的right==true 说明 此节点和其孩子都遍历了
        obj = obj.parentNode;
        recursion(obj,false);
    }else{
      //到了这里说明 次节点的右兄弟节点没有遍历到 递归进行遍历
      setTimeout(function(){
        obj.parentNode.right=true;
        recursion(obj,true);
      },500)
    }
  }//前序遍历

  aBtn[0].onclick=function(){
    initialize();
    disabled(true);
    recursion(oRoot,true);
  }//前序遍历
}