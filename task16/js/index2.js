window.onload=function(){
	var aBtn = document.querySelectorAll('[type=button]');
	var aText = document.querySelectorAll('[type=text]');
	var aLabel = document.querySelectorAll('label');
	var oRoot = document.querySelector('.root');
	var aDiv = document.getElementsByTagName('div');
	var num = 0;
	var boo = false;
	var aFind = [];
	var aClick = [];
	var str = '';
	var oDelete=null;
	for(let i=0;i<aDiv.length;i++){
		console.log(aDiv[i]);
		aDiv[i].left = aDiv[i].children[0]||null; 
		aDiv[i].next = getNextSibling(aDiv[i]); 
		aDiv[i].text = getText(aDiv[i]);
		addEvent(aDiv[i]);
	}
	function getNextSibling(node){
		node = node.nextSibling;
		if(node!=null&&node.nodeType!=1){
			return arguments.callee(node);
		}
		return node;
	}//获取 下个 兄弟节点

	function addEvent(node){
		node.addEventListener('click',function(e){
			e = e || window.event;
			e.stopPropagation()
			oDelete = node;
			node.classList.add('red');
		},false);
	}//加点击事件

	function deleteNode(){
		oDelete.parentNode.removeChild(oDelete);
	}//删除节点

	function createNode(){
		let node = document.createElement('div');
		node.innerText = str;
		oDelete.appendChild(node);
	}//添加节点

	function getText(node){
		let text = node.firstChild.nodeValue;
		if(text!=''){
			return text;
		}else{
			return null;
		}
	}//获取节点的 文本节点
	
	function visualization(obj){
		setTimeout(function(){
			obj.classList.add('blue');
			setTimeout(function(){
				obj.classList.remove('blue');
			},500);
		},num++ * 500);
	}//加 动画
	
	function detectionChar(node){
		if(str!=''&&node.text.indexOf(str) != -1){
			aFind.push(node);
			setTimeout(function(){
				node.classList.add('yellow');
			},num++ * 500);
		}
	}//字符串 检测
	
	function clearClass(){
		for(let i=0;i<aFind.length;i++){
			aFind[0].classList.remove('yellow');
		}	
	}//清除类名 

	function preOrder(node){
		if(node!=null){
			visualization(node);
			detectionChar(node);
			preOrder(node.left);
			preOrder(node.next);
		}
	}//前序遍历
	
	function nextOrder(node){
		if(node!=null){
			nextOrder(node.left);
			visualization(node);
			detectionChar(node)
			nextOrder(node.next);
		}
	}//后续遍历
	
	aBtn[0].onclick=function(){
		num = 0;
		clearClass();
		preOrder(oRoot);
	}
	aBtn[1].onclick=function(){
		num = 0;
		clearClass();
		nextOrder(oRoot);
	}
	aLabel[0].onclick=function(){
		num = 0;
		deleteNode();
	}
	aLabel[1].onclick=function(){
		num = 0;
		str = aText[0].value;
		createNode();
	}
}