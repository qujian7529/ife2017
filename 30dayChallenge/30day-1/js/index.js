window.onload=function(){
    let aAudio = document.getElementsByTagName('audio');
    window.addEventListener("keydown",(e)=>{
        const oPlay = document.querySelector(`audio[data-key="${e.keyCode}"]`);
        const oDiv = document.querySelector(`div[data-key="${e.keyCode}"]`);
        if(!oPlay) return;
        
        clearTimeout(oDiv.timer);
        oPlay.currentTime = 0;
        oPlay.play();
        oDiv.classList.add('play');
        oDiv.timer = setTimeout(function(){
            oDiv.classList.remove('play')
        },100)
    });
}