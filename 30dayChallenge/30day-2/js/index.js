const oH = document.querySelector('.hour');
const oM = document.querySelector('.min');
const oS = document.querySelector('.second');
let time , nH , nM , nS , deg , dH, dM, dS;
//-90deg  -> 270deg
// h:30deg     m:6deg     s:6deg
function nowTime(){
    time = new Date();
    nH = time.getHours();
    nM = time.getMinutes();
    nS = time.getSeconds();
    dH = 30 * nH - 90;//0-23
    dM = 6 * nM - 90; // 0-59
    dS = 6 * nS - 90;// 0-59
    oH.style.transform = `rotate(${dH}deg)`;
    oM.style.transform = `rotate(${dM}deg)`;
    oS.style.transform = `rotate(${dS}deg)`;
}
nowTime();
setTimeout(()=>{
    oH.style.transition = 'none';
    oM.style.transition = 'none';
    oS.style.transition = 'none';
},1000)

setInterval(()=>{
    nowTime();
},1000)