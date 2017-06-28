'use strict';
!function(){
    function CMS(root, info) {
        this.root = root;
        this.info = info;
        parseInfo(this);
        slideToggle(root);
    }




    //
    function menuFn(method, selecNode, str) {
        let menuFn = {
            rename(){
                selectNode.ref.obj[selectNode.ref.key] = str;
            },
            remove(){
                let dataObj , dataParentObj , o;
                //若是在文件夹名('folder-name')上删除,则删除整个文件夹
                //获取 要删除的属性对象, 以及它的父级对象(用来下面触发set),
                if(selectNode.classList.contains('folder-name')){
                    dataObj = selectNode.parentNode.ref;
                    dataParentObj = selectNode.parentNode.parentNode.ref;
                }
                //若是在文件名('file')上删除,则删除文件
                if(selectNode.classList.contains('file')){
                    dataObj = selectNode.ref;
                    dataParentObj = selectNode.parentNode.ref;
                }

                // 将对象中的数据delete后, 复制新对象, 将新对象赋值, 触发set 让DOM更新
                delete dataObj.obj[dataObj.key];
                o = copyObj(dataObj.obj); 
                dataParentObj.obj[dataParentObj.key] = o; 
                selectNode = null;
            },
            add(){
                let o,parent;
                switch (true) {
                    //文件夹下添加文件
                    case selectNode.classList.contains('folder-name'):
                        parent = selectNode.parentNode;
                        o = copyObj(parent.ref.obj[parent.ref.key]);
                        o['item'+Object.keys(o).length] = str;
                        parent.ref.obj[parent.ref.key] = o;
                        parent._show = true;
                        break;
                    //文件转为文件夹 添加文件
                    case selectNode.classList.contains('file'):
                        selectNode.classList.add('folder');
                        selectNode.classList.remove('file');
                        selectNode.innerHTML = '';
                        selectNode._show = true;
                        o = {
                            title:selectNode.ref.obj[selectNode.ref.key],
                            item0:str
                        };
                        selectNode.ref.obj[selectNode.ref.key] = o;
                        break;                                
                }
            }
        }
        menuFn[method]();
    }
    //解析数据   container file folder folder-name
    function parseInfo(info){
        let container = document.createElement('div'),
            root = info.root,
            data = info.info;
        container.id = "container";
        container.classList.add('folder');
        setAndGet(info, 'info', container);
        
        //深度遍历数据
        parseData(container, data);
        function parseData(parent,data) {
            let keys = Object.keys(data);
            keys.forEach(function(key) {
                let child = document.createElement('div');
                switch (true) {
                    case typeof data[key] === 'object':
                        child.classList.add('folder');
                        child.style.height = '22px';
                        parseData(child, data[key] );
                        break;
                    case key === 'title':
                        child.classList.add('folder-name');
                        child.innerHTML = data[key];
                        break;
                    default:
                        child.classList.add('file');
                        child.innerHTML = data[key];
                        child.draggable = true;
                        break;
                }
                setAndGet(data, key, child);
                parent.appendChild(child);
            });
        };

        //数据绑定
        function setAndGet(obj, key, node) {
            let val = obj[key];
            node.ref = { obj , key };
            Object.defineProperty(obj, key,{
                get(){
                    return val;
                },
                set(newVal){
                    if(typeof newVal === 'object'){
                        node.innerHTML = '';
                        if(!node.classList.contains('folder')){
                            node.classList.add('folder');
                            node.classList.remove('file');
                        }
                        parseData(node, newVal);
                        
                        //删除后 将高度调整正确
                        let parent = node;
                        while (parent !== document) {
                            if(parent.classList.contains('folder')){
                                parent.style.height = 'auto';
                                parent.style.height = getComputedStyle(parent).height;
                            }
                            parent = parent.parentNode;
                        }
                    } else {
                        node.innerHTML = newVal;
                    }
                    val = newVal;
                    return newVal;
                }
            })
        }

        //将CMS实例的oot值更改
        info.root = container;
        root.appendChild(container);
        container.style.height = getComputedStyle(container).height;
    }
    //父辈是否有某节点
    function parentsHaveNode(startNode, findNode){
        while (startNode !== document ) {
            if(startNode === findNode){
                return true
            }
            startNode = startNode.parentNode;
        }
        return false;
    }
    //复制对象
    function copyObj(obj) {
        let o = {};
        Object.keys(obj).forEach( (key) => {
            o[key] = obj[key];
        })
        return o;
    }
    window.CMS = CMS;
}();
let info = {
    item0:'HTML',
    item1:{
        title:'CSS',
        item0:'Less',
        item1:'Sass',
        item2:'Poscss',
        item3:{
            title:'Css3',
            item0:'Animation',
            item1:'Transform',
        }
    },
    item2:'PS',
    itme3:{
        title:'Js',
        item0:'React',
        item1:'Vue',
    }
};
let admin = document.querySelector('.admin');
let rightClick = document.getElementById('right-click');
let root = document.getElementById('box');
let cms = new CMS(root,info);
cms.openEditing(admin, rightClick);
cms.startDrag();