const aItem = document.querySelectorAll('.item');
aItem.forEach( (item) => {
    item.addEventListener('click',function(){
        this.classList.toggle('open');
    })
})