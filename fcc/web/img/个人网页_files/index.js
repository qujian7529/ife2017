window.onload=function(){
    const oMyself = document.querySelector('.myself');
    const oPhoto = document.querySelector('.photo');
    const oContact = document.querySelector('.contact');
    const domList = Array.from([oMyself, oPhoto, oContact]);
    const titles = document.querySelectorAll('.menu a');
    let aInput = [...document.querySelectorAll('input,textarea')];
    let temp = titles[0];
    aInput.pop();
    aInput.forEach(function(input){
        input.addEventListener('focus',function(){
            this.classList.add('for');
        });
        input.addEventListener('blur',function(){
            this.classList.remove('for');
        });
    })
    //top 0  1
    window.addEventListener('mousewheel',function(e){
        fromTheTop(domList, 'current');
    })
    function fromTheTop(doms, className, gap=80){
        let windowH = window.innerHeight;
        doms.forEach(function(item, index){
            let top = item.getBoundingClientRect().top;
            let bottom = item.getBoundingClientRect().bottom;
            if( top <= 90 && bottom >= windowH ){
                if( !titles[index].classList.contains(className)){
                    console.log('GO');
                    titles[index].classList.add(className);
                    temp.classList.remove(className);
                    temp = titles[index];
                }
                return true
            } else{
                return false;
            }
        })
    }

}

//710 . 1860