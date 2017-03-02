window.onload=function(){
  var oUl = document.querySelector('ul');
  var oText = document.querySelector('[type=text]');
  var aBtn = document.querySelectorAll('[type=button]');
  var aLi = oUl.getElementsByTagName('li');
  var aH1 = document.getElementsByTagName('h1');
  var RegExpNum = /(^\d{1}\d{1}$)|(^100$)/;
  var id = 0;

  //createLi 功能:左右增减li
  //direction true为左 right为右
  //operation true为增 false为减
  function createLi(num,direction,operation){
    var liNode = document.createElement('li');
    var h1Node = document.createElement('h1');
    var textNode = document.createTextNode(num);
    var childBoo = oUl.hasChildNodes();
    
    h1Node.appendChild(textNode);
    liNode.appendChild(h1Node);
    liNode.size = num;
    liNode.id = id++;
    liNode.style.height = num*3+'px';
    if(childBoo){
      if(direction){
        if(operation){
          oUl.insertBefore(liNode,oUl.firstChild);
        }else{
          oUl.removeChild(oUl.firstChild);
        }
      }else{
        if(operation){
          oUl.appendChild(liNode);
        }else{
          oUl.removeChild(oUl.lasstChild);
        }
      }
    }else{
      if(direction){
        if(operation){
          oUl.appendChild(liNode);
        }else{
          alert('没有节点可以删除！')
        }
      }else{
        if(operation){
          oUl.appendChild(liNode);
        }else{
          alert('没有节点可以删除！')
        }
      }
    }//是否有孩子节点
  }
  
  function valueNum(){
    if(aLi.length>=60){
      alert('队列已经60个了不可以在输入了！')
      return false;
    }
    if(RegExpNum.test(oText.value)){
      return true;
    }else{
      alert('请输入10-100！')
      return false;
    }
  }//检测节点个数

  //4个干功能
  aBtn[0].onclick=function(){
      if(valueNum()){
        createLi(oText.value,true,true);
        remove();//节点变换后 再次遍历一下
      }
  }
  aBtn[1].onclick=function(){
      if(valueNum()){
        createLi(oText.value,false,true);
        remove();
      }
  }
  aBtn[2].onclick=function(){
      if(valueNum()){
        createLi(oText.value,true,false);
        remove();
      }
}
  aBtn[3].onclick=function(){
      if(valueNum()){
        createLi(oText.value,false,false);
        remove();
      }
  }
  function remove(){
    for(let i =0;i<aLi.length;i++){
      aLi[i].onclick=function(){
        this.parentNode.removeChild(this);
      }
    }
  }//点击li 将会删除此节点
  
  //排序可视化
  var time = 0;
  var timer = null;
  aBtn[4].onclick=function(){
    for(let i = 0;i<aLi.length;i++){
      for(let j = i;j<aLi.length;j++){
        if(aLi[i].size>aLi[j].size){
          let tempS = aLi[i].size;
          aLi[i].size = aLi[j].size;
          aH1[i].firstChild.nodeValue = aLi[j].size;
          aLi[j].size = tempS;
          aH1[j].firstChild.nodeValue = tempS;
          setTimeout(function(){
            let tempH = getComputedStyle(aLi[i]).height; 
            aLi[i].style.height = getComputedStyle(aLi[j]).height;
            aLi[j].style.height = tempH;
          },++time*10);          
      }
    }
  }//.size属性是li的数值大小  用高来展示这个数值大小
  //生成随机li
  function randomNum(start,end){
    var num = Math.round(Math.random()*(end-start) +start);
    return num;
  }
  aBtn[5].onclick=function(){
    let num = randomNum(10,60);
    if(aLi.length+num<=60){
      for(let i =0;i<num;i++){
        createLi(randomNum(10,100),true,true);
      }
    }else if(60-aLi.length>0){
      for(let i =0;i<60-aLi.length;i++){
        createLi(randomNum(10,100),true,true);
      }
    }else{
      alert('已经60个了！');
    }
  }  
}
