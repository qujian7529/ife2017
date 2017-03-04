window.onload=function(){
  var aBtn = document.querySelectorAll('input');
  var oRoot = document.querySelector('.root');
  const aDiv = document.getElementsByTagName('div');
  var num = 0;
  var boo = false;
  for(let i=0;i<aDiv.length;i++){
    aDiv[i].left = aDiv[i].children[0]||null; 
    aDiv[i].right = aDiv[i].children[1]||null; 
  }
  function visualization(obj){
      setTimeout(function(){
        obj.classList.add('blue');
        setTimeout(function(){
          obj.classList.remove('blue');
        },500);
      },num++ * 500);
  }
  function preOrder(node){
    if(node!=null){
      visualization(node);
      preOrder(node.left);
      preOrder(node.right);
    }
  }
  function midOrder(node){
    if(node!=null){
      midOrder(node.left);
      visualization(node);
      midOrder(node.right);
    }
  }
  function nextOrder(node){
    if(node!=null){
      nextOrder(node.left);
      nextOrder(node.right);
      visualization(node);
    }
  }
  aBtn[0].onclick=function(){
    num = 0;
    preOrder(oRoot);
  }
  aBtn[1].onclick=function(){
    num = 0;
    midOrder(oRoot);
  }
  aBtn[2].onclick=function(){
    num = 0;
    nextOrder(oRoot);
  }
}