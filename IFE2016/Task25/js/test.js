'use strict';
!function() {
    function CMS(root, info) {
        this.root = root;
        this.info = info;
        parseInfo(this);    
        slideToggle(root);
    }
    CMS.prototype = {
        constructor:CMS,
        openEditing(admin, menu, root = this.root){
            startEditing(admin, menu, root);
        },
        startDrag(root = this.root){
            drag(root);
        }
    }
    //菜单功能
    function menuFn(method, selectNode, str) {
        let menuFn = {
            //重命名
            rename(){
                selectNode.ref.obj[selectNode.ref.key] = str;
            },
            //删除
            remove(){
                let dataObj , dataParentObj , o;
                //若是在文件夹名('folder-name')上删除,则删除整个文件夹
                //获取 要删除的属性对象, 以及它的父级对象(用来下面触发set),
                if(selectNode.classList.contains('folder-name')){
                    dataObj = selectNode.parentNode.ref;
                    dataParentObj = selectNode.parentNode.parentNode.ref;
                } else {
                //若是在文件名('file')上删除,则删除文件
                    dataObj = selectNode.ref;
                    dataParentObj = selectNode.parentNode.ref;
                }
                // 将对象中的数据delete后, 复制新对象, 将新对象赋值, 触发set 让DOM更新
                delete dataObj.obj[dataObj.key];
                o = copyObj(dataObj.obj); 
                dataParentObj.obj[dataParentObj.key] = o; 
                selectNode = null;
            },
            //添加
            add(){
                let o,parent;
                console.log(selectNode);
                switch (true) {
                    //文件夹下添加文件
                    case selectNode.classList.contains('folder-name'):
                        parent = selectNode.parentNode;
                        o = copyObj(parent.ref.obj[parent.ref.key]);
                        o['item'+Object.keys(o).length] = str;
                        parent.ref.obj[parent.ref.key] = o;
                        parent._show = true;
                        console.log(1);
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
                        console.log(2);
                        selectNode.ref.obj[selectNode.ref.key] = o;
                        break;                                
                    case selectNode.classList.contains('folder'):
                        parent = selectNode;
                        o = copyObj(parent.ref.obj[parent.ref.key]);
                        o['item'+Object.keys(o).length] = str;
                        parent.ref.obj[parent.ref.key] = o;
                        parent._show = true;
                        break;                    
                }
            }
        }
        menuFn[method]();
    }
    //开启编辑模式
    function startEditing(admin, menu, root) {
        let selectNode = null, //右键选择的节点
            boo = true; 
        admin.addEventListener('click', startAdmin);
        
        //开始编辑
        function startAdmin(e) {
            if(boo){
                admin.innerText = '右键进行编辑'
                document.addEventListener('contextmenu', showMenu);
            } else {
                admin.innerText = '编辑模式'
                document.removeEventListener('contextmenu', showMenu);
            }
            boo = !boo;
        }
        
        //开启菜单功能
        function openMenu(e) {
            let str;
            switch (e.target.id) {
                case 'rename':
                    str = prompt('请输入新文件名');
                    if(selectNode && str){
                        // menuFn.rename(str);
                        menuFn('rename',selectNode,str);
                    } 
                    break;
                case 'remove':
                    if(selectNode && confirm('确定要删除吗?')){
                        // menuFn.remove();
                        menuFn('remove',selectNode);
                    }
                    break;
                case 'add':
                    str = prompt('请输入要添加的文件名');
                    if(selectNode && str){
                        // menuFn.add(str);
                        menuFn('add',selectNode,str);
                    }
                    break;
            }
        }

        //右键显示菜单
        function showMenu(e) {
            e.preventDefault();
            //菜单移动带鼠标点击位置, 
            menu.style.cssText += `top:${e.pageY}px;left:${e.pageX}px;display:block`;
            //突出显示被点击节点
            if( parentsHaveNode(e.target, root) ){
                selectNode && selectNode.classList.remove('select');
                selectNode = e.target;
                selectNode.classList.add('select');
            }
            menu.addEventListener('click', openMenu);
            document.addEventListener('click', hideMenu);
        }
        
        //点击其他区域隐藏菜单
        function hideMenu( e ){
            let node = e.target;
            if ( !parentsHaveNode(node, menu) ) {
                menu.style.display = 'none';
                selectNode && selectNode.classList.remove('select');

                document.removeEventListener('click',hideMenu,false);
                menu.removeEventListener('click',openMenu);
            }
        }

    }
    //开启拖拽
    function drag(root) {
        let startNode, endNode;
        root.addEventListener('dragstart', function (e) {
            if(e.target.classList.contains('folder-name')){
                startNode = e.target.parentNode;
            } else {
                startNode = e.target;
            }
        });
        root.addEventListener('dragenter', function (e) {
            if(e.target.classList.contains('folder-name')){
                endNode = e.target.parentNode;
            } else {
                endNode = e.target;
            }
        });
        root.addEventListener('dragend', function (e) {
            if(parentsHaveNode(startNode,endNode) || (endNode===startNode) ){
                return ;
            } else {
                menuFn('add',endNode, startNode.ref.obj[startNode.ref.key]);
                menuFn('remove',startNode);
            }
        });        
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
                        child.draggable= true;
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
    //展开 收缩         
    function slideToggle(root) {
        function slide(e){
            // 点击文件夹名字   伸缩文件夹
            if(!e.target.classList.contains('folder-name')){return};
            let target = e.target,
                folder = target.parentNode, 
                itemHeight = target.offsetHeight,
                height;
            // 判断是否展开
            switch (!!folder._show) { 
                case true:
                    height = -(folder.offsetHeight - itemHeight);
                    break;
                case false:
                    height = folder.scrollHeight - target.offsetHeight;
                    break;
            }
            // 节点添加属性 _show
            folder._show = !folder._show;
            //文件夹展开 父级文件夹也要相应增大
            while( folder !== root ){
                if( folder.classList.contains('folder') ){
                    let nowHeight = parseInt(getComputedStyle(folder).height);
                    folder.style.height = nowHeight + height + 'px';
                }
                folder = folder.parentNode;
            }
        }
        root.addEventListener('click', slide);
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
let drag = document.getElementsByClassName('drag')[0];
let cms = new CMS(root,info);
cms.openEditing(admin, rightClick);
drag.onclick = function(){
    cms.startDrag();
    this.innerText = '已开启'
};