'use strict';
!function() {
    //飞船 构造函数
    function Spacecraft(speed, energyConsumption, solarEnergy){
        //速率 单位 px/s
        this.speed = speed;
        //能耗 百分比
        this.energyConsumption = energyConsumption;
        //太阳能 百分比
        this.solarEnergy = solarEnergy;
        //状态 stop flight
        this.state = 'stop';
        //燃料
        this.fuel = 100;
        //飞船id
        this.id = Spacecraft.spacecraftData.length;
        //dom
        this.dom = document.createElement('div');
        //存储飞船
        Spacecraft.spacecraftData.push(this);
    };
    //所有飞船
    Spacecraft.spacecraftData = [];
    //给所有飞船发布命令                           丢包率        速度
    Spacecraft.sendCommandsToAll = function({packetLoss=0.1, propagationRate=0.3} = {}, command){
        Spacecraft.spacecraftData.forEach( function(spacecraft){
            //是否丢包
            if( randomInt(0,100) <= packetLoss*100){ return };
            //传播速率
            setTimeout(()=>{
                spacecraft.receiveCommand( command );
            }, propagationRate * 1000)
        } )
    };
    //飞船功能
    Spacecraft.prototype = {
        construcotr : 'Spacecraft',
        //移到位置
        movePosition(circleCenter, {x = 80,y = 80} = {}){
            let center = {
                x: circleCenter.offsetLeft + circleCenter.offsetWidth/2,
                y: circleCenter.offsetTop + circleCenter.offsetHeight/2,
            }
            this.dom.style.cssText += `left:${center.x + x}px;top:${center.y + y}px;transform:translate(-50%,-50%);`;
            this.dom.classList.add('spacecraft');
            circleCenter.insertAdjacentElement('afterend',this.dom);
            return this;
        },
        //动力系统
        setPowerSystem : function(circleCenter){
            this.powerSystem = new powerSystem(circleCenter, this);
            return this;
        },
        //能源系统 
        setEnergySystem : function(){
            new energySystem(this);
            return this;
        },
        //自毁系统
        selfDestructive(){
            console.log(this.state);
            console.log(this);
            if(this.state === 'selfDestructive'){ return };
            console.log(this);
            let i = this.commander.orbital.findIndex( (item) => {
                if(item===null){ return false; };
                return item.id === this.id;
            });
            this.commander.orbital[i] = null;
            this.dom.parentNode.removeChild(this.dom);
            let control = this.commander.control.men[`id${this.id}`];
            control.parentNode.removeChild(control);
            this.state = 'selfDestructive';
            console.log(this.commander);
        },
        //命令接受
        receiveCommand(binary){
            let i = binary.length,
                id = parseInt(binary.substr(0,i-2), 2),
                command = parseInt(binary.substr(i-2,2), 2);
            if(id !== this.id){ 
                return false
            }
            let info = {
                '0': this.selfDestructive,
                '1': this.powerSystem.flight,
                '2': this.powerSystem.stop,
            }
            info[command].call(this);
        },
        //设置指挥官
        setCommander(commander){
            this.commander = commander;
            return this;
        }
    }


    //指挥官
    function Commander(control, spacecraftQuantity, signal, orbital,log) {
        //控制台
        this.control = {
            total:control,
            men:{
            }
        };
        //日志
        this.log = log;
        //可控制飞船数
        this.spacecraftQuantity = spacecraftQuantity; 
        //信号信息
        this.signal = signal;
        //轨道数据  [null,null,null,null];
        this.orbital = orbital;
        //事件绑定
        control.addEventListener('click',(e)=>{
            if(!e.target.dataset.spacecraft){ return }
            let command = {
                id:e.target.parentNode.spacecraftID,
                command:e.target.name,
            };
            this.sendCommand(command);
        })
    }
    //命令日志
    Commander.logs = [];
    //功能
    Commander.prototype = {
        construcotr : 'Commander',
        //创建飞船
        createSpacecraft(circleCenter, ...arg){
            if( this.orbital.every( (item) => item !== null)  ){
                return ;
            }
            this.log.insertAdjacentHTML('beforeend',`<p>创建飞船.</p>`);
            
            let spacecraft = new Spacecraft(...arg),
                div = document.createElement('div'),
                num = this.orbital.findIndex( (item) => item===null );

            div.spacecraftID = spacecraft.id;
            div.innerHTML = `${spacecraft.id}号飞船:
                <input type="button" data-spacecraft="true" name="flight" value="开始飞行">
                <input type="button" data-spacecraft="true" name="stop" value="停止飞行">
                <input type="button" data-spacecraft="true" name="selfDestructive" value="启动自毁程序">`;
            
            spacecraft.setCommander(this);
            spacecraft.movePosition(circleCenter,{x:80+num*50 ,y:0});
            spacecraft.setPowerSystem(circleCenter);
            spacecraft.setEnergySystem();

            this.orbital[num] = spacecraft;
            this.control.men[`id${spacecraft.id}`] = div;
            this.control.total.insertAdjacentElement('beforeend', div);
            return this;
        },
        //发送命令  id,command
        sendCommand(commandJSON){
            Commander.logs.push(commandJSON);
            this.log.insertAdjacentHTML('beforeend',`<p>${commandJSON.id}号飞船: 执行"${commandJSON.command}"命令.</p>`);
            Spacecraft.sendCommandsToAll(this.signal, this.parseBinary(commandJSON) );
        },
        //转换
        parseBinary(commandJSON){
            let parse = {
                //自毁
                'selfDestructive': '00', 
                //飞行
                'flight':'01',
                //暂停
                'stop':'10',
            }
            let id = commandJSON.id.toString(2);
            // id = id.length<2 ? '0'+id : id; 

            let command = parse[commandJSON.command];
            return id+command;
        }
    }

    //能源系统
    function energySystem(spacecraft) {

        //初始化
        let val = spacecraft.fuel,
            timer = null,
            bgcolor,
            consumption,
            charged,
            showFuel;
        
        spacecraft.dom.innerHTML = `${spacecraft.id}号<br>${val}%`;
        spacecraft.dom.style.backgroundImage = `linear-gradient(to top, ${bgcolor} 0% ,${bgcolor} ${val}%,#fff ${val}%, #fff 100%)`

        //消耗
        consumption = function (){
            // 能耗 每秒60帧
            let energyConsumption = spacecraft.energyConsumption / 60;
            let animate = () => {
                if(spacecraft.state === 'stop'){ return false }; 
                
                requestAnimationFrame( ()=>{
                    if(spacecraft.fuel <= 0){
                        spacecraft.fuel = 0;
                        spacecraft.dom.innerHTML = `${spacecraft.id}号<br>0%`;
                        return spacecraft.state = 'stop';
                    }
                    spacecraft.fuel -= energyConsumption;
                    showFuel();
                    animate();
                } )
            }   
            animate();
        }.bind(spacecraft);
        //充能
        charged = function (){
            let solarEnergy = spacecraft.solarEnergy / 60;
            let animate = () => {
                if(spacecraft.fuel >=100){ return }; 
                timer = requestAnimationFrame( ()=>{
                    if(spacecraft.fuel >= 100){
                        timer = null;
                        return spacecraft.fuel = 100;
                    }
                    spacecraft.fuel += solarEnergy;
                    showFuel();
                    animate();
                } )
            }
            animate();
        }.bind(spacecraft);
        //显示能源
        showFuel = function () {
            switch (true) {
                case spacecraft.fuel >= 60:
                    bgcolor = 'greenyellow';
                    break;
                case spacecraft.fuel >= 30:
                    bgcolor = '#ff8014';
                    break;
                case spacecraft.fuel >= 0:
                    bgcolor = '#f90202';
                    break;
            }
            spacecraft.dom.innerHTML = `${spacecraft.id}号<br>${parseInt(spacecraft.fuel)}%`;
            spacecraft.dom.style.backgroundImage = `linear-gradient(to top, ${bgcolor} 0% ,${bgcolor} ${spacecraft.fuel}%,#fff ${spacecraft.fuel}%, #fff 100%)`;
        }.bind(spacecraft);

        //设置 state fuel
        setAndGet(spacecraft,'fuel',function(newVal){
            if(newVal<100 && timer === null ){
                console.log('go');
                charged();
            }
        });
        setAndGet(spacecraft,'state',function(newVal){
            if(newVal === 'flight'){
                consumption();
            }
        });
    }
    //动力系统
    function powerSystem(circleCenter,spacecraft) {
        let _center = {
            x: circleCenter.offsetLeft + circleCenter.offsetWidth/2,
            y: circleCenter.offsetTop + circleCenter.offsetHeight/2,
        };
        let _spacecraft = {
            x: spacecraft.dom.offsetLeft + spacecraft.dom.offsetWidth/2,
            y: spacecraft.dom.offsetTop + spacecraft.dom.offsetHeight/2,
        };
        //两圆心的间距  
        let _radius = Math.sqrt( Math.pow( Math.abs( _center.x - _spacecraft.x ),2) + Math.pow( Math.abs( _center.y - _spacecraft.y ),2) );
        //设置旋转中心
        spacecraft.dom.style.transformOrigin = `-${spacecraft.dom.offsetLeft - circleCenter.offsetLeft - circleCenter.offsetWidth/2 - spacecraft.dom.offsetWidth/2}px ${spacecraft.dom.offsetHeight/2}px`;
        //飞行开关
        let _switch = false;
        //已经转了的角度
        let _moveDeg = 0;
        //飞行
        function flight() {
            console.log('飞行');
            if( spacecraft.state === 'flight' ) { return };
            spacecraft.state = 'flight';
            // 角度 60帧
            let deg = ( spacecraft.speed / ( 2 * Math.PI * _radius ) * 360 ) / 60; 
            function animate(){
                _switch = requestAnimationFrame( () => {
                    _moveDeg += deg;
                    spacecraft.dom.style.transform = `translate(-50%,-50%) rotate(${_moveDeg}deg)`;
                    if(parseFloat(spacecraft.fuel) <=0){
                        spacecraft.fuel = 0;
                        return stop.bind(spacecraft);
                    } else {
                        animate.call(spacecraft);
                    }
                })
            }
            animate.call(spacecraft);
        }
        //暂停
        function stop() {
            if( spacecraft.state === 'stop' ) { return };
            spacecraft.state = 'stop';
            cancelAnimationFrame( _switch );
        }

        return {
            flight,
            stop,
        }
    }
    //随机数
    function randomInt(start, end) {
        return Math.round( Math.random() * (end - start) + start );
    }
    //set get
    function setAndGet(obj, attr, sF, gF ) {
        let value = obj[attr];
        Object.defineProperty(obj, attr,{
            get(){
                gF && gF();
                return value;
            },
            set(newVal){
                value = newVal;
                sF && sF(newVal);
                return value;
            }
        })
    }

    window.C = window.Commander = Commander;
}();

let go = document.getElementById('go');
let createBtn = go.querySelector('[name="create"]');;
let center = document.getElementById('center');
let control = document.getElementsByClassName('control')[0];
let log = document.getElementsByClassName('log')[0];
let c = new C(control ,4 ,{
    packetLoss:0.1,
    propagationRate:0.3,
},[null,null,null,null],log);

createBtn.addEventListener('click',function(e) {
    let domArr = [...go.querySelectorAll('input:checked')];
    if(domArr.length !== 2){
        return alert('请选择完全型号.')
    } 
    let val = domArr.sort( function(a,b) {
        if(a.name === 'power'){
            return -1
        } else {
            return 1;
        }
    } ).reduce(function(a,b) {
        return `${a.value}-${b.value}`;
    });
    let cs = c.createSpacecraft.apply(c,[center,...val.split('-')]);
})

