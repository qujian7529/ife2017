window.onload=function(){
  var aText = document.querySelectorAll('[type=text]');
  var aSub = document.querySelectorAll('[type=submit]');
  var aP = document.querySelectorAll('p');
  var oDiv= document.querySelectorAll('div.text')[0];
  var zh = /[\u4E00-\u9FA5]/g;
  var en = /[A-Za-z0-9]/g;
  var SBC = /[^\x00-\xff]/g;
  var DBC = /[\u0000-\u00ff]/g;

  function detection(obj){
    if(obj==null){
      return 0 ;
    }else{
      return obj.length;
    }
  }
  aSub[0].onclick=function(){
    event.preventDefault();
    if(aText[0].value.length==0){
      aP[0].innerText='姓名不能为空';
      oDiv.classList.add('red');
      oDiv.classList.remove('green');
      return;
    }
    var zNum = detection(aText[0].value.match(zh));
    // 汉字
    var eNum = detection(aText[0].value.match(en));
    // 英文和数字
    var SBCNum  = detection(aText[0].value.match(SBC))-zNum;
    // 全角
    var DBCNum = detection(aText[0].value.match(DBC))-eNum;
    // 半角符号
    console.log('汉字个数：'+zNum+'   英文和数字个数：'+eNum+'   全角个数：'+SBCNum+'   半角个数'+DBCNum);
    var sum = (zNum+SBCNum)*2+eNum+DBCNum;
    if(sum>=4&&sum<=16){
      aP[0].innerText='名称格式正确';
      oDiv.classList.remove('red');
      oDiv.classList.add('green');
    }
  }
}