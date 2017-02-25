window.onload=function(){
  var oDiv = document.getElementsByClassName('click')[0];
  document.addEventListener('contextmenu',function(){
    event.preventDefault();
    oDiv.style.display="block";
    var e = window.event;
    var bHeight = window.innerHeight;
    var bWidth = window.innerWidth;
    var sX = e.clientX;
    var sY = e.clientY;
    var oDivH = oDiv.offsetHeight+parseInt(getComputedStyle(oDiv).paddingTop)+parseInt(getComputedStyle(oDiv).paddingBottom);
    console.log('oDivH'+oDivH);
    var oDivW = parseInt(getComputedStyle(oDiv).width)+parseInt(getComputedStyle(oDiv).paddingLeft)+parseInt(getComputedStyle(oDiv).paddingRight);

    // 设置Y轴
    if(bHeight - sY <= oDivH){
      console.log('bHeight：'+bHeight+'  sY：'+sY+'  oDivH'+oDivH);
      oDiv.style.top = sY-oDivH+'px';
    }else{
      console.log('bHeight：'+bHeight+'  sY：'+sY+'  oDivH'+oDivH);
      oDiv.style.top = sY+'px';
    }
    // 设置X轴
    if(bWidth - sX <= oDivW){
      oDiv.style.left = sX - oDivW + 'px';
    }else{
      oDiv.style.left = sX+'px';
    };
    return false;
  },false);
  document.addEventListener('click',function(){
    oDiv.style.display="none";
  },false);
}