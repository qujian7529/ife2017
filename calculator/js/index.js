let aBtn = document.querySelectorAll('input');
let oView = document.querySelector('p');
//录入字符串
//解析字符串 按优先级计算
let str = '';
let numReg = /\d|\./;
let sReg = /AC|CE/;

aBtn.forEach((item)=>{
    item.addEventListener('click',()=>{
        if(oView.innerText === '输入有误！'){
            str = '';
        }
        //若是 等号  就求值
        if(/=/.test(item.value)){
            if(str.length === 0) { return };
            str = calculate(str);
            oView.innerHTML = str;
            return
        }
        //退格 和 归零
        if(sReg.test(item.value)){
            str = acCeAns(item.value)    
        } else {
            // 除上面3种情况 都拼接字符串
            str += item.value;
        }
        //视图显示
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
    let nowStr = ''
    switch(s){
        case 'AC':
            nowStr = '';
        break;
        case 'CE':
            nowStr = oView.innerText;
            nowStr = nowStr.slice(0,nowStr.length-1);
        break;
    }
    return nowStr;
}
//计算编译  0.1 % 0.03
function compile(aNum,aSbl){
    if(aSbl.length >= aNum.length){
        return '输入有误！';
    }
    aNum = aNum.map((item)=>{
        return parseFloat(item);
    })
    let tempNum = 0;
    let index = 0;
    let arr = [];
    while(aSbl.length !== 0){
        arr = solveFloat(aNum[index],aNum[index + 1]);
        switch(true){
            case (index = aSbl.indexOf('%')) !== -1:
                tempNum = arr[0] % arr[1] / arr[2];
                // tempNum = aNum[index] % aNum[index + 1];
            break;
            case (index = aSbl.indexOf('*')) !== -1:
                tempNum = arr[0] * arr[1] / arr[2];
                // tempNum = aNum[index] * aNum[index + 1];
            break;
            case (index = aSbl.indexOf('/')) !== -1:
                if(aNum[index+1] === 0){
                    tempNum = 0;                        
                } else {
                    tempNum = arr[0] / arr[1] / arr[2];
                }
            break;
            case (index = aSbl.indexOf('-')) !== -1:
                tempNum = (arr[0] - arr[1]) / arr[2];
            break;
            case (index = aSbl.indexOf('+')) !== -1:
                tempNum = (arr[0] + arr[1]) / arr[2];
            break;
        }
        aNum.splice(index,2,tempNum);
        aSbl.splice(index,1);
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
//去除浮点数影响
// 0.1 * 0.02   1/2   [1,2,100]  10*2  1000
function solveFloat(num1,num2){
    let index = 0 ;
    let length = 0;
    let arr = []
    let arr1 = [num1,1];
    let arr2 = [num2,1];
    if(num1 % 1 !== 0){
        num1 = num1 + '';
        arr1 = num1.split('.');
        arr1[0] = Number(arr1[0] + arr1[1]);
        arr1[1] = arr1[1].length*10;
    } 
    if(num2 % 1 !== 0){
        num2 = num2 + '';
        arr2 = num2.split('.');
        arr2[0] = Number(arr2[0] + arr2[1]);
        arr2[1] = arr2[1].length*10;
    }
    if(arr1[1] > arr2[1]){
        arr2[0] = arr2[0] * (arr1[1] / arr2[1]);
        arr2[1] = arr1[1]; 
    }
    if(arr1[1] < arr2[1]){
        arr1[0] = arr1[0] * (arr2[1] / arr1[1]);
        arr1[1] = arr2[1]; 
    }
    arr = [arr1[0],arr2[0],arr1[1]];
    console.log(arr)
    return arr;
}