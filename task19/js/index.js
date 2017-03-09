window.onload=function(){
    var oTable = document.getElementsByTagName('div')[0];
    var oBtn = document.querySelector('[type="button"]');
    var aText = document.querySelectorAll('[type="text"]');
    var aOl = oTable.querySelectorAll('li');

    var objArr =[];//对象管理

    function createForm(name,language,math,english){
        var json = {
            name:name||'参数错误',
            language:Number(language)||'参数错误',
            math:Number(math)||'参数错误',
            english:Number(english)||'参数错误',
            add:Number(english) + Number(language) + Number(math)||0
        };//属性 值
        let liJson={};//根据属性名 来保存li对象
        let ul =(function found(){
            let ul = document.createElement('ul');
            for(let i in json){
                let li = document.createElement('li');
                let liText = document.createTextNode(json[i]);
                liJson[i]=li;
                li.appendChild(liText);
                ul.appendChild(li);
            }
            return ul;
        })();//创建ul li 返回ul
        function alterValue(attr,value){
            json[attr]= value;
            liJson[attr].firstChild.nodeValue=json[attr];
        };
        return {
            alterValue:alterValue,
            joinParent:function(parent){
                parent.appendChild(ul);
            },
            removeUl:function(){
                ul.parentNode.removeChild(ul);
            },
            getValue:function(attr){
                return json[attr];
            },
            getNode:function(){
                return ul;
            }
        }
    }//创建一个ul  
    //alertValue(attr,value) 修改值
    //joinParent(parent) 添加到父节点下
    //removeUl() 删除此节点
    //getValue(attr) 获取值
    //getNode  获取创建的节点

    function nodeSort(obj,boo){
        let attr = obj.getAttribute('item');
        objArr.sort(function(a,b){
            if(boo){
                return a.getValue(attr)-b.getValue(attr);
            }else{
                return b.getValue(attr)-a.getValue(attr);
            }
        })
        for(let i=0;i<objArr.length;i++){
            oTable.appendChild(objArr[i].getNode());//该节点已经存在 那么appendChild会直接将节点移动到最后
        }
        obj.boo = !boo;
        //如果直接 boo = !boo 不会改变原来的值 因为是JS按值传递的
    }

    for(let i=0;i<aOl.length;i++){
        aOl[i].boo = true;
        aOl[i].onclick=function(){
            nodeSort(this,this.boo);
        };
    }//初始化
    
    oBtn.onclick=function(){
        let oUl = new createForm(aText[0].value,
        aText[1].value,
        aText[2].value,
        aText[3].value
        ); 
        oUl.joinParent(oTable);
        objArr.push(oUl);
    }//创建


    //加一些初始数据
    let temp = new createForm('小明',80,90,75);temp.joinParent(oTable);
    let temp1 = new createForm('阿红',90,30,90);temp1.joinParent(oTable);
    let temp2 = new createForm('碧亮',60,100,70);temp2.joinParent(oTable);
    objArr.push(temp,temp1,temp2);
}