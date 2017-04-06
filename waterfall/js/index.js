let oLi = document.getElementsByTagName('li')[0];
let oUl = document.getElementsByTagName('ul')[0];
let oFooter = document.getElementsByTagName('footer')[0];
let oFrag = document.createDocumentFragment();
let num = 16;
let timer = null;
let boo = true;

let get = (event)=>{
    
    //ul已经滚动大小
    var rollTop = oUl.scrollTop;
    //可见ul
    var winHeight = oUl.clientHeight;
    //跟个 ul大小
    var ulHeight = oUl.scrollHeight;

    console.log(ulHeight,rollTop + winHeight)
    if(ulHeight === rollTop + winHeight && boo){
        boo = false;
        oFooter.classList.remove('vanish');
        for(let i = 0 ; i<5; i++){
            oLi = oLi.cloneNode();
            oLi.innerHTML = 'item ' + num++;
            oFrag.appendChild(oLi);
        }

        timer = setTimeout(()=>{
            oFooter.classList.add('vanish')
            
            oUl.appendChild(oFrag);
            clearTimeout(timer);
            boo = true;
        },1000)
    }
}
document.addEventListener('mousewheel',get)





//已经 滚动 的大小区域
// var rollTop = (window.pageYOffset !== undefined) ? window.pageYOffset:(document.documentElement || document.body.parentNode || document.body).scrollTop;
// var rollLeft = (window.pageXOffset !== undefined) ? window.pageXOffset:(document.documentElement || document.body.parentNode || document.body).scrollLeft; 

// //可见区域
// var winWidth = window.innerWidth || document.body.clientWidth;
// var winHeight = window.innerHeight || document.body.clientHeight;

// //整个页面区域
// var bodyHeight = document.body.scrollHeight;
// var bodyWidth =  document.body.scrollWidth;