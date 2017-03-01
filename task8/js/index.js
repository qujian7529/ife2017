window.onload=function(){
  var aRadio = document.querySelectorAll('[type=radio]');
  var aDiv = document.querySelectorAll('div.case>div');
  var aSelect = document.querySelectorAll('select');
  var aOption = aSelect[1].querySelectorAll('option');
  var citySchool = {
    '北京':['北京大学','北京一大学','北京二大学','北京三大学'],
    '上海':['上海大学','上海一大学','上海二大学','上海三大学','上海四大学','上海五大学'],
    '湖南':['湖南大学','湖南一大学'],
    '山西':['山西大学','山西一大学','山西二大学']
  };
  aRadio[1].onclick=function(){
    aDiv[0].classList.add('no');
    aDiv[1].classList.remove('no');
  }
  aRadio[0].onclick=function(){
    aDiv[1].classList.add('no');
    aDiv[0].classList.remove('no');
  }

  aSelect[0].onchange=function(){
    for( attr in citySchool){
      if(attr==this.value){
        var num = citySchool[attr].length;
        if(num>aOption.length){
          for(let i = num-aOption.length;i>0;i--){
            var e = document.createElement('option');
            e.value='';
            aSelect[1].appendChild(e);
          }
        }else if(num<aOption.length){
          for(let i = aOption.length-num;i>0;i--){
            aSelect[1].remove(aSelect[1].lastChild);
          }
        }//删除多余节点 增加不足的节点
        aOption = aSelect[1].querySelectorAll('option');
        // 再次获取 增减后的
        num = citySchool[attr].length;
        console.log(num);
        for(var i = num-1;i>=0;i--){
          console.log('i:'+i+'  value：'+aOption[i].value)
          aOption[i].value= citySchool[attr][i];
          aOption[i].innerText = citySchool[attr][i];
        }//修改option
      }
    }
  }
} 