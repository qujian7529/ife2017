window.onload=()=>{
    const oOpen = document.querySelector('header');
    const oBox = document.querySelector('section');
    let game = {
        user:'',
        ai:'',
        deg:0,
        x:0,
        y:300,
    }
    let checkerboard = [
        [0,0,0],
        [0,0,0],
        [0,0,0]
    ]
    let timer = null;
    document.addEventListener('mousedown',(e)=>{
        let aSign = '';
        switch(true){
            case e.target.tagName === 'INPUT':
                game.user  = e.target.value;
                game.ai = game.user == 'X' ? 'O' : 'X';
                oOpen.style.display = 'none';
                if(game.user === 'X'){
                    setTimeout(ai,0);
                }
            break; 
            case !! (aSign = e.target.getAttribute('data-sign')):
                console.log(aSign,aSign.innerHTML)
                if(e.target.innerHTML.length === 0){
                    e.target.innerHTML = game.user;
                    aSign = aSign.split('-');
                    checkerboard[aSign[0]][aSign[1]] = game.user;
                    setTimeout(ai,0);
                }
            break;
        }
    })

    function ai(){
        let sResult = referee();
        if(sResult){
            let str = `section:after{
                    transform:rotate(${game.deg}deg) translate(${game.x}px,${game.y}px);
                    display:block;
                }`;
            let style = document.createElement('style');
            document.body.appendChild(style);
            style.innerHTML = str;
            setTimeout(()=>{
                if(sResult[0] == game.user){
                    alert('恭喜你，你胜利！');
                } else {
                    alert('你失败了！，电脑胜利！');
                }
                document.body.removeChild(style);
                reset()
            },300);
            return;
        };
        randomLocation();
    }

    //重置
    function reset(){
        checkerboard = [
            [0,0,0],
            [0,0,0],
            [0,0,0]
        ];
        game.deg = 0;
        game.x = 0;
        game.y = 300;
        let arr = document.querySelectorAll('div[data-sign]');
        Array.from(arr,(item)=>{
            item.innerHTML = '';
            return arr;
        })
    }

    //       裁判 
    function referee(){
        let str = '';
        // \
        str = [checkerboard[0][0],checkerboard[1][1],checkerboard[2][2]].join('');
        if(str==='OOO' || str==='XXX'){
            game.y = 0;
            game.deg = 45;
            return str[0];
        }
        // /
        str = [checkerboard[0][2],checkerboard[1][1],checkerboard[2][0]].join('');
        if(str==='OOO' || str==='XXX'){
            game.y = 0;
            game.deg = 135;
            return str[0];
        }
        for(var i = 0; i<3; i++){
            //横三行
            str = checkerboard[i].join('');
            if(str==='OOO' || str==='XXX'){
                game.y = -150;
                game.y += i * 150;
                game.deg = 0;
                return str[0];
            }
            //竖三行
            str = [checkerboard[0][i],checkerboard[1][i],checkerboard[2][i]].join('');
            if(str==='OOO' || str==='XXX'){
                game.y -= (i+1) * 150;
                game.deg = 90;
                return str[0];
            }
        }
        return false;
    }
    
    function randomLocation(){
        let n1 = randomNum(0,2);
        let n2 = randomNum(0,2);
        let grid = document.querySelector(`[data-sign="${n1}-${n2}"]`);
        if(grid.innerHTML){
            randomLocation();
        } else {
            grid.innerHTML = game.ai;
            checkerboard[n1][n2] = game.ai;
            return;
        }
    }
    function randomNum(start, end, fun){
        if(typeof start != 'number' || typeof end != 'number' ) return ;
        fun && fun();
        return Math.round(Math.random() * (end - start) + start);
    }
    //数组扁平
    function arrFlat(arr){
        return arr.reduce((a, b)=>{
            return a.concat(Array.isArray(b) ? arrFlat(b) : b);
        },[])
    };
}