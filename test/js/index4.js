//       计算器
function calculator(str){
   str = operation(str);
   str = findParentheses(str);
//    str = Number(str).toFixed(4);
   console.log(str);
   if(str.indexOf('Infinity')!=-1){
       str = n
   }
   if(str.indexOf('-Infinity')!=-1){
       str = -n
   }


   return Number(str);
}
//      运算       符号
function operation(str){
    let math = /ln\d+|e|π/gi;
    let mathArr = str.match(math);
    let temp = '';
    if(mathArr!=null){
        mathArr.forEach((item)=>{
            switch(true){
                case item.indexOf('π')!==-1:
                    temp = Math.PI;
                    str = str.replace(item,temp);
                break;
                case item.indexOf('e')!==-1:
                    temp = Math.E;
                    str = str.replace(item,temp);
                break;
                case item.indexOf('ln')!==-1:
                    temp = Math.log(Number(item.slice(2)));
                    str = str.replace(item,temp);
                break;
            }
        });
    }
    


    math = /[A-Za-z]+(\([\-0-9,]+\)?)/gi;
    let num = /[-0-9]+/g;
    mathArr = str.match(math);
    if(mathArr!=null){
        mathArr.forEach((item)=>{
            switch(true){
                case item.indexOf('abs')!==-1:
                    temp = item.match(num);
                    temp = Math.abs(Number(temp[0]));
                    str = str.replace(item,temp)
                break;
                case item.indexOf('avg')!==-1:
                    temp = item.match(num);
                    temp = temp.reduce((a,b)=>{return Number(a)+Number(b)}) / temp.length;
                    str = str.replace(item,temp)
                break;
                case item.indexOf('sin')!==-1:
                    temp = item.match(num);
                    temp = Math.sin(Number(temp[0]));
                    str = str.replace(item,temp)
                break;
                case item.indexOf('cos')!==-1:
                    temp = item.match(num);
                    temp = Math.cos(Number(temp[0]));
                    str = str.replace(item,temp)
                break;
                case item.indexOf('tan')!==-1:
                    temp = item.match(num);
                    temp = Math.tan(Number(temp[0]));
                    str = str.replace(item,temp)
                break;
                case item.indexOf('log')!==-1:
                    temp = item.match(num);
                    temp = Math.log10(Number(temp[0]));
                    str = str.replace(item,temp)
                break;
            }
        })
    }
    return str;
}


//        解析
function parse(str){
    console.log(str)
    str = str.replace(/\(|\)/g,'');
    let num = /-?\d\.\d+|-?\d+/g;
    let arr = str.match(num).map((item)=>{
        return Number(item);
    });
    let arr2 = str.match(/[\+\-\*\/\%\^]/g)||[];
    if(arr.length-1!==arr2.length){
        let n = arr2.length - arr.length-1;
        arr2.forEach((item,i)=>{
            if(item == '-'|| n>0){
                arr2.splice(i,1);
                n--;
            }
        })  
    }   
    let index = 0,lastIndex = 0,temp;
    while(arr2.length){
        switch(true){
            case arr2.indexOf('^')!==-1:
                    index = arr2.indexOf('^');
                    temp = Math.pow(arr[index],arr[index+1]);
                    str = str.replace(arr[index]+'^'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
            break;
            case arr2.indexOf('*')!==-1:
                    index = arr2.indexOf('*');
                    temp = arr[index] * arr[index+1];
                    str = str.replace(arr[index]+'*'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
            break;
            case arr2.indexOf('/')!==-1:
                    index = arr2.indexOf('/');
                    console.log('/',arr,arr2,index)
                    temp = arr[index] / arr[index+1];
                    str = str.replace(arr[index]+'/'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
                    console.log('/',arr,arr2,str)
            break;
            case arr2.indexOf('%')!==-1:
                    index = arr2.indexOf('%');
                    temp = arr[index] % arr[index+1];
                    str = str.replace(arr[index]+'%'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
            break;
            case arr2.indexOf('+')!==-1:
                    index = arr2.indexOf('+');
                    temp = arr[index] + arr[index+1];
                    str = str.replace(arr[index]+'+'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
            break;
            case arr2.indexOf('-')!==-1:
                    index = arr2.indexOf('-');
                    temp = arr[index] - arr[index+1];
                    str = str.replace(arr[index]+'-'+arr[index+1],temp)
                    arr.splice(index,2,temp);
                    arr2.splice(index,1);
            break;
        }
    }
    return str
}//解析

//      寻找括号
function findParentheses(str){
    str = str.trim();
    let nL = str.length ,nR = -1,nLR = str.length;
    let temp = '';
    while(nL!=-1){
        nL = str.lastIndexOf('(',nL-1);    
        nR = str.indexOf(')',nR+1);        
        nLR = str.lastIndexOf(')',nLR-1);  
        if(nL < nR){
            temp = str.slice(nL,nR+1);
            str = str.replace(temp,parse(temp))
        } else if(nL < nLR){
            temp = str.slice(nL,nLR+1);
            str = str.replace(temp,parse(temp))
        } else {
            str = parse(str);
        }
    }
    return str;
}


var val = document.getElementById('j');
var vm = document.getElementById('val');
var btn = document.getElementById('btn');
btn.addEventListener('click',()=>{
    if(val.value.length !==0 ){
        vm.innerHTML = calculator(val.value);
    };
})
// calculator('(1+2)*(4/4)-1')
// calculator('1+(9/(1+1*6/3)*3)')
// calculator('1+2*3')
// calculator('avg(1,2)*sin(30)+tan(45)/abs(-1)')
calculator('ln2*2');
