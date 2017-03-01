window.onload=function(){
  var aInput = document.querySelectorAll('input');
  var aP = document.querySelectorAll('p');
  var SBC = /[^\x00-\xff]/g;
  var DBC = /[\u0000-\u00f]/g;
  function color(obj,boo){
    if(boo){
      obj.classList.remove('red');
      obj.classList.add('green');
    }else{
      obj.classList.remove('green');
      obj.classList.add('red');
    }
  }// 正确和错误时的class名变换

  function detection(obj,i,string,fcc){
    obj = obj[i];
    var oP =document.querySelectorAll(obj.tagName+'+p')[i];
    
    obj.onblur=function(){
      if(obj.value.length==0){
        color(obj,false);
        oP.firstChild.nodeValue=string;
      }else{
        if(fcc().boo){
          color(obj,true);
          oP.firstChild.nodeValue=fcc().string;
        }else{
          color(obj,false);
          oP.firstChild.nodeValue=fcc().string;
        }
      }
    }
  }// 检查输入的文本

  function charNum(value){
    var sum = 0;
    if(value.match(SBC)==null){
      sum+=0;
    }else{
      sum+=value.match(SBC).length*2;
    }
    if(value.match(DBC)==null){
      sum+=0;
    }else{
      sum+=value.match(DBC).length;
    }
    return sum;
  }// 检查全角 半角数目

  detection(aInput,0,'名称不能为空',function(){
    var sum = charNum(aInput[0].value);
    var boo = true;
    var string = '';
    if(sum>=4&&sum<=16){
      string = '名称格式正确';
    }else{
      boo = false;
      string = '格式错误,长度应为4-16个字符';
    }
    return {
      boo,
      string
    }
  });// 检查名称
  
  detection(aInput,1,'密码不能为空',function(){
    var sum = charNum(aInput[1].value);
    var boo = true;
    var string = '';
    if(sum>=4&&sum<=16){
      string = '密码可用';
    }else{
      boo = false;
      string = '格式错误,长度应为4-16个字符';
    }
    return {
      boo,
      string
    }
  });// 检查密码

 detection(aInput,2,'再次输入密码不能为空',function(){
    var sum = charNum(aInput[1].value);
    var againSum = charNum(aInput[2].value);
    var boo = true;
    var string = '';
    if(sum==againSum){
      if(aInput[1].value==aInput[2].value){
        string = '密码输入一致!';     
      }else{
        boo=false;
        string = '两次密码不一致！'
      }
    }else{
      boo=false;
      string = '两次密码不一致！'
    }
    return {
      boo,
      string
    }
  });//二次输入密码相同

  detection(aInput,3,'邮箱不能为空',function(){
    var sum = aInput[3].value;
    var boo = true;
    var string = '';
    var email = /^.+@.+\.com/g;
    if(email.test(sum)){
      string = '邮箱格式正确';
    }else{
      boo = false;
      string = '邮箱格式错误';
    }
    return {
      boo,
      string
    }
  });//邮箱

  detection(aInput,4,'手机号码不能为空',function(){
    var sum = aInput[4].value;
    var boo = true;
    var string = '';
    var phone = /^\d{11}$/;
    if(phone.test(sum)){
      string = '手机格式正确'
    }else{
      console.log('0');
      boo = false;
      string = '手机格式错误';
    }
    return {
      boo,
      string
    }
  });//手机号码

  aInput[5].onclick=function(){
    var num = aInput.length;
    var sum = 0;
    for(var i=num-2;i>0;i--){
      if(aInput[i].classList.contains('green')==false){
        console.log(0);
        sum++;
      }else{
        console.log(1);
      }
    }
    if(sum == 0){
      alert('提交成功');
    }else{
      alert('提交失败');
    }
  }//aInput[5]  是button提交按钮 num-1-1
}