window.onload=function(){
  // 移动匹配
  var oY = /^1(3[45689]|47|5[012789]|78|8[23478])\d{8}$/
  // 联通
  var oL = /^1(3[0-2]|5[56]|8[56]|45|76)\d{8}$/
  //电信
  var oD = /^1(33|53|77|8[019])$/

  var oBut = document.querySelectorAll('[type=button]')[0];
  var oBut2 = document.querySelectorAll('[type=button]')[1];
  var oText = document.querySelectorAll('[type=text]')[0];
  oBut.onclick=function(){
    if(oY.test(oText.value)==true){
      alert('这是移动号码！');
    }else if(oL.test(oText.value)==true){
      alert('这是联通号码');
    }else if(oD.test(oText.value)==true){
      alert('这是电信号码')
    }else{
      alert('啥也不是！');
    }
  }
  var oTa = document.querySelectorAll('textarea')[0];
  var oR = /\b(\b\w+\b)\s*\1\b/;
  oBut2.onclick=function(){
    if(oR.test(oTa.value)==true){
      alert('有相邻的重复字符串');
    }else{
      alert('没有');
    }
  }
}

