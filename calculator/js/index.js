let aBtn = document.querySelectorAll('input');
let oView = document.querySelector('p');
//录入字符串
//解析字符串 按优先级计算
let str = '';
let numReg = /\d|\./;
let sReg = /AC|CE|Ans/;

aBtn.forEach((item)=>{
    item.addEventListener('click',()=>{
        if(/=/.test(item.value)){
            if(str.length === 0) { return };
            console.log(`str: ${str}`);
            str = calculate(str);
            oView.innerHTML = str;
            return
        }
        if(sReg.test(item.value)){
            str = acCeAns(item.value)    
        } else {
            str += item.value;
        }

        oView.innerHTML = str;
    })
    //移动端
    item.addEventListener('touched',(e)=>{
        e.preventDefault();
        if(/=/.test(item.value)){
            if(str.length === 0) { return };
            console.log(`str: ${str}`);
            str = calculate(str);
            oView.innerHTML = str;
            return
        }
        if(sReg.test(item.value)){
            str = acCeAns(item.value)    
        } else {
            str += item.value;
        }

        oView.innerHTML = str;
    })
})
//清零 退一步 ans
function acCeAns(s){  
    switch(s){
        case 'AC':
            str = '';
        break;
        case 'CE':
            str = oView.innerText;
            str = str.slice(0,str.length-1);
        break;
    }
    return str;
}
//计算编译
function compile(aNum,aSbl){
    if(aSbl.length >= aNum.length){
        return '输入有误！';
    }
    aNum = aNum.map((item)=>{
        return parseFloat(item);
    })
    let tempNum = 0;
    let index = 0;
    while(aSbl.length !== 0){
        switch(true){
            case (index = aSbl.indexOf('%')) !== -1:
                tempNum = aNum[index] % aNum[index + 1];
                aNum.splice(index,2,tempNum);
                aSbl.splice(index,1);
            break;
            case (index = aSbl.indexOf('*')) !== -1:
                tempNum = aNum[index] * aNum[index + 1];
                aNum.splice(index,2,tempNum);
                aSbl.splice(index,1);
            break;
            case (index = aSbl.indexOf('/')) !== -1:
                if(aNum[index+1] === 0){
                    tempNum = 0;                        
                } else {
                    tempNum = aNum[index] / aNum[index + 1];
                }
                aNum.splice(index,2,tempNum);
                aSbl.splice(index,1);
            break;
            case (index = aSbl.indexOf('-')) !== -1:
                tempNum = (aNum[index] - aNum[index + 1]);
                aNum.splice(index,2,tempNum);
                aSbl.splice(index,1);
            break;
            case (index = aSbl.indexOf('+')) !== -1:
                tempNum = aNum[index] + aNum[index + 1];
                aNum.splice(index,2,tempNum);
                aSbl.splice(index,1);
            break;
        }
    }
    return tempNum
}
//编译
function calculate(numStr){
    let aNum = [];
    let aSymbol = [];
    //找数字
    let reverseStr = numStr.split('').reverse().join('');
    // /\d+\.+\-$ | \d+\.+\-(?=%|\*|\/|\+|\-) | \d+\-$|\d+\-(?=%|\*|\/|\+|\-) | \d+\.+ | \d+/g
    //带小数点的负数其位置在开头的时候  带小数点的负数其位置在中间   负数在开头  负数在中间  带小数点数  数  
    let nReg = /\d+\.+\d+\-$|\d+\.+\d+\-(?=%|\*|\/|\+|\-)|\d+\-$|\d+\-(?=%|\*|\/|\+|\-)|\d+\.+\d+|\d+/g;
    aNum = reverseStr.match(nReg);
    reverStr = reverseStr.replace(nReg,'');
    aNum.reverse().forEach((item,ind,array)=>{
        array[ind] = item.split('').reverse().join('');
    });
    //找符号
    let symbolReg = /%|\*|\/|\+|\-/g;
    aSymbol = reverStr.split('').reverse();
    console.log(aNum,aSymbol);
    return compile(aNum,aSymbol);
}