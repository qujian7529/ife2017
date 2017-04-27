window.onload=function(){
    const oMyself = document.querySelector('.myself');
    const oPhoto = document.querySelector('.photo');
    const oContact = document.querySelector('.contact');
    const domList = Array.from([oMyself, oPhoto, oContact]);
    const titles = [...document.querySelectorAll('.menu a')];
    let aInput = [...document.querySelectorAll('input,textarea')];
    let temp = titles[0];
    let tempNum = 0;
    aInput.pop();
    aInput.forEach(function(input){
        input.addEventListener('focus',function(){
            this.classList.add('for');
        });
        input.addEventListener('blur',function(){
            this.classList.remove('for');
        });
    })

    window.addEventListener('scroll',function(e){
        let n = scope(domList, 100);
        if(titles[n].classList.contains('current')){
            return;
        } else {
            temp.classList.remove('current');
            titles[n].classList.add('current');
            temp = titles[n];
        }
    }, false)
    //检测 在 x:0 y100 的位置是哪个版块 其对应的titles上CLASS
    function scope(doms, num){
        let aDomVal = [];
        let indexNum = 0;
        doms.forEach(function(item, index){
            aDomVal.push([item.getBoundingClientRect().top, item.getBoundingClientRect().bottom]);
        })
        aDomVal.forEach(function(item, index){
            if(item[0]<num && num<item[1] ){
                indexNum = index;
            }
        })
        return indexNum
    }

    //给导航栏的a上移动
    titles.forEach(function(item, index){
        item.addEventListener('click',function(e){
            e.preventDefault();//阻止默认事件;
            let id = e.target.dataset.target.trim();
            let dom = document.getElementById(id);
            let newY = dom.getBoundingClientRect().top + document.body.scrollTop;//元素相对于视图的TOP + 滚动了TOP
            //元素相对于整个页面的TOP;
            onMove(e.pageY,newY)
        })
    })
    //2个点之间的移动
    function onMove(nowY, newY){
        move();
        function move(){
            let offsetY = (newY - nowY)/10 ;
            offsetY = offsetY > 0 ? Math.floor(offsetY): Math.ceil(offsetY);

            if(offsetY === 0){
                return;
            }

            window.scrollBy(0,offsetY);
            nowY = nowY + offsetY;
            setTimeout(move,10);
        }
    }
    
    //移动端 向下滑动时 隐藏顶部  向上滑动显示
    let n = 0;
    let oHeader = document.querySelector('header');
    window.addEventListener('touchstart', function(e){
        n = e.touches[0].clientY;
    }, false)
    window.addEventListener('touchmove', function(e){
        if( (e.touches[0].clientY - n ) < 0){
            //隐藏
            console.log(1)
            oHeader.style.display = 'none';
        } else {
            // 显示
            console.log(2)
            oHeader.style.display = 'block';
        }
        n = e.touches[0].clientY;
    }, false)


    // 移动端顶部菜单
    let oSing = document.querySelector('.sign');
    let oMenu = document.querySelector('.menu');
    oSing.addEventListener('click', function(){
        oMenu.classList.toggle('hide')
    }, false);
}

