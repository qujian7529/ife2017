/*
宇宙
    1: 信息有 0.3会丢包
    2: 有1s延迟
    3: 轨道信息
飞船
    1: 存储飞船的数据
    2: 动力系统 (飞行, 暂停)
    3: 能源系统 (消耗, 吸收太阳能)
    4: 位置( 移动到指定位置 )
    5: 状态 行为会改变状态
    6: 自毁系统
    7: 接受信号 
指挥官
    1: 可以创建飞船
    2: 控制飞船
    3: 操作日志
*/
'use strict';
!function() {
    //轨道信息
    let pathway = [null, null, null, null];
    //信息丢包率
    let packetLoss = 0.3;
    //是否会接受到信息
    function receiveSignal() {
        let n = Number( Math.random().toFixed(1) );
        return n > packetLoss;
    };
    //动力系统  传入飞船对象
    function powerSystem(_consumptionRate = 0.05, _solarEnergy = 0.02, _speed = 20 ){
        _consumptionRate = _consumptionRate; // 燃料消耗率 每秒
        _solarEnergy = _solarEnergy; // 太阳能充能 每秒
        _speed = _speed; //速度 每秒 PX
        let _switch = null; //飞行状态
        let _charged = false; //充能状态
        let _moveDeg = 0;
        return{
            //开始飞行
            startFilght(){
                if(_switch){ return }; //正在飞行就不用再次执行;
                this.state = 'filght';
                let deg = ( _speed / ( 2 * Math.PI * this.radius ) * 360 ) / 60; //1S 60frame
                let consumption = _consumptionRate / 60; //1S 60frame 
                function animate(){
                    _switch = requestAnimationFrame(function(){
                        _moveDeg += deg;
                        this.dom.style.transform = `rotate(${_moveDeg}deg)`;
                        this.fuel -= consumption;
                        if(parseFloat(this.fuel) <=0){
                            this.fuel = 0;
                            return this.stopFilght();
                        } else {
                            animate.call(this);
                        }
                    }.bind(this))
                }
                animate.call(this);
            },
            //暂停
            stopFilght(){
                this.state = 'stop';
                cancelAnimationFrame(_switch);
                _switch = null;
            },
            //太阳能 充能
            solarCharged(){
                if(_charged){ return }; // 正在充能;
                _charged = true;
                let solar = _solarEnergy / 60;
                function charged() {
                    requestAnimationFrame(function () {
                        this.fuel += solar;
                        if( parseFloat(this.fuel) >= 1 ){
                            this.fuel = 1;
                            return _charged = false 
                        };
                        charged.call(this);
                    }.bind(this))
                }
                charged.call(this);
            }
        }
    };


    //飞船构造函数
    function Spacecraft(fuel = 1) {
        let power = new powerSystem();
        //飞船存起来
        Spacecraft.spacecraftData.push(this); 
        //信息
        this.id = Spacecraft.spacecraftData.length; //飞船ID
        this.dom = document.createElement('div'); //dom
        this.state = 'stop';
        this.fuel = fuel; //燃料
        this.dom.innerHTML = fuel*100 + '%';
        //开始飞行
        this.startFilght = power.startFilght;
        //暂停飞行
        this.stopFilght = power.stopFilght;
        //充能
        this.solarCharged = power.solarCharged;
        //set get 
        Object.defineProperty(this,'fuel', {
            get(){
                return fuel;
            },
            set(newVal){
                let val = ~~parseFloat(newVal*100);
                let bgcolor  = 'greenyellow';
                if(val <=40){
                    bgcolor = '#ff6600';
                }
                if(val <=20){
                    bgcolor = 'red';
                }
                this.dom.innerHTML =  val + '%' + `<br>${this.id}号` ;
                this.dom.style.backgroundImage = `linear-gradient(to top, ${bgcolor} 0% ,${bgcolor} ${val}%,#fff ${val}%, #fff 100%)`
                // background-image: linear-gradient(to top, greenyellow 0% ,greenyellow 10%,#fff 10%, #fff 100%);

                if( parseFloat(newVal) < 1 ){
                    this.solarCharged();
                }
                fuel = newVal;
                return newVal;
            }
        })
    };
    //存飞船数据
    Spacecraft.spacecraftData = [];
    //向所有飞船发布命令
    Spacecraft.instruction = function(json) {
        setTimeout( ()=>{
            console.log('发布');
            Spacecraft.spacecraftData.forEach( function(item) {
                if( receiveSignal() ){
                    item.acceptSignal(json);
                }            
            } )
        } ,1000)
        
    };
    //方法
    Spacecraft.prototype = {
        constructor:'Spacecraft',
        //移动到坐标 传入中心点 坐标
        moveToPathway(root, coordinate ,callback){
            if(pathway.every( item => item!==null)) {return false}
            if(!coordinate  ){
                let i = pathway.findIndex( x => x===null );
                coordinate = {
                    orbital:i,
                    x:  80+ i * 50 + root.offsetLeft + root.offsetWidth/2,
                    y:  root.offsetTop + root.offsetHeight/2,
                    dom: this.dom,
                };
                pathway[i] = coordinate;
            }
            this.dom.classList.add('spacecraft');
            this.dom.innerHTML += `<br>${this.id}号`;
            root.parentNode.appendChild(this.dom);

            let left = coordinate.x - this.dom.offsetWidth/2;
            let top = coordinate.y - this.dom.offsetHeight/2;
            this.dom.style.cssText += `left:${left}px;top:${top}px;transform-origin:-${left - (root.offsetLeft + root.offsetWidth/2)}px ${this.dom.offsetHeight/2}px;`;
            //半径
            this.radius = Math.abs( this.dom.offsetLeft + this.dom.offsetWidth/2 - (root.offsetLeft + root.offsetWidth/2) );
            callback && callback(this);

            return coordinate;
        },
        //自爆
        selfDestruction(json){
            this.state = 'destruction';
            this.dom.parentNode.removeChild(this.dom);
            json.console.parentNode.removeChild(json.console);
            pathway[json.id-1] = null;
            //删除飞船
        },
        //接受指令
        acceptSignal(json){
            console.log(`${this.id}飞船：收到指挥官指令--${json.id}号飞船，执行${json.command}命令。`);
            if(this.id !== json.id){ return false };
            this[json.command](json);
        }
    }
    

    //指挥官 构造函数 
    function Commander(control, log, spacecraftNum = 4) {
        this.control = control;// 控制台
        this.log = log; //日志
        this.spacecraftNum = spacecraftNum; // 可以管理的飞船数目.
        sumControl.call(this, control); //事件绑定
    }
    //指挥官操作日志
    Commander.commanderloLog = [];
    //方法
    Commander.prototype = {
        constructor:'Commander',
        //创建飞船
        createSpacecraft(view, control){
            this.saveLog('"创建飞船"');
            if( pathway.some( val => val === null ) ){
                let spacecraft = new Spacecraft();
                spacecraft.moveToPathway(view,null,() => {
                    this.controlSpacecraft(control, spacecraft);            
                });

                return true;
            }
        },
        //开启飞船管理
        controlSpacecraft(control, spacecraft){
            let html = `${spacecraft.id}号飞船:
                    <input type="button" data-spacecraft="true" name="startFilght" value="开始飞行">
                    <input type="button" data-spacecraft="true" name="stopFilght" value="停止飞行">
                    <input type="button" data-spacecraft="true" name="selfDestruction" value="启动自毁程序">`;
            let div = document.createElement('div');
            div.spacecraftId = spacecraft.id;
            div.innerHTML = html;
            control.appendChild(div);
            return div;
        },
        //日志
        saveLog(str){
            let log = {
                dom: document.createElement('p'),
                info: str,
            };
            log.dom.innerHTML = '<span class="commander">指挥官命令：</span>'+log.info;
            this.log.appendChild(log.dom);
            Commander.commanderloLog.push(log);
        }
    }
    //总管理
    function sumControl(control) {
        control.addEventListener('click', function (e) {
            if(!e.target.dataset.spacecraft){
                return ;
            }
            let json = {
                id: e.target.parentNode.spacecraftId,
                command: e.target.name,
                console: e.target.parentNode,
            }
            let str = `${json.id}号飞船，执行"${e.target.value}"`;
            this.saveLog(str);

            Spacecraft.instruction(json);
        }.bind(this));
    }    

    window.St = window.Spacecraft = Spacecraft;
    window.C = window.Commander = Commander;
    window.d = pathway;
}();
let create = document.getElementById('create');
let control = document.getElementsByClassName('control')[0];
let center = document.getElementById('center');
let log = document.getElementsByClassName('log')[0];

let c = new C(control, log);
create.addEventListener('click', function (e) {
    c.createSpacecraft(center, control);
});