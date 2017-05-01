let  rovince = '';
position();
//搜索城市
let oBtn = document.querySelector('input[type="button"]');
let oVal = document.querySelector('input[type="text"]');
oBtn.addEventListener('click', function(){
    if(oVal.value.length >0){
        nextStep({city:oVal.value});
    }
})
oVal.addEventListener('keydown',function(e){
    if(e.keyCode == 13 && oVal.value.length >0){
        nextStep({city:oVal.value});
    }
})
//百度地图API 定位
function position(){
    let geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            //获取城市名
            let address = r.address;
            nextStep(address); //{city, province}
        }
        else {
            alert('failed'+this.getStatus());
        }        
    })
}
// 获取 市的上级城市
function getProvince(lat, lon){
    let ndScript = document.createElement('script');
    ndScript.src = `http://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=${lat},${lon}&output=json&pois=1&ak=kCfDctmRp9PsWBBRAb0RAUi3MubuIQK6&callback=get`
    document.body.insertBefore(ndScript, document.body.firstChild);
    document.body.removeChild(ndScript);
}
function get(data){
    let province = data.result.addressComponent.province;
    let city = data.result.addressComponent.city;
    showAddress(city, province);//地址路径
}
//获取城市后
function nextStep({city,province = false}){
    getCityWeather(city, function(json){
        let {now:oNow,
             days:aDays,
             basic,
            } = parseWeatherObj(json);
        
        showNowWeater(oNow);//现在天气
        shwoDaysWeather(aDays);//3天气
        if(!province){
            getProvince(basic.lat, basic.lon);//省
            return;
        }
        showAddress(city, province);//地址路径
    });
}
//获取天气 和风天气API
function getCityWeather(city ,fun){
    let ajax = new XMLHttpRequest();
    let data = null;
    ajax.onreadystatechange = function(){
        if(ajax.readyState == 4 && ajax.status == 200){
            nowJson = JSON.parse(ajax.responseText);

            fun && fun(nowJson);
        } 
    }
    ajax.open('GET',`https://free-api.heweather.com/v5/weather?city=${city}&key=de3f25819a7b4427a4ca71d7cb1e9491`);
    ajax.onerror = function(){
        console.log('发生错误,再次执行');
        position();
    }
    ajax.send();
}
//解析天气JSON
function parseWeatherObj(json){
    json = json.HeWeather5[0];
    //今天的 天气情况
    console.log(json)
    if(json.status !== 'ok'){
        alert('城市不存在！');
        return;
    }
    let oNow = {
        cond:json.now.cond, //现在天气代码 状况
        tmp:json.now.tmp, //现在温度,
        wind:json.now.wind, //风
        hum:json.now.hum, //现在湿度,
        updata:json.basic.update, //数据更新时间
        comf:json.suggestion.comf.txt,//今日提示
    }
    // 3天的 简单天气情况
    let daysJson = json.daily_forecast;
    let str = ['今天','明天','后天']
    let days = [null, null, null];
    days.map(function(item, index){
        let data = daysJson[index];
        let obj = {
            txt:str[index],
            cond:data.cond.txt_n,
            tmp:data.tmp.max+'° / '+data.tmp.min+'°',
            wind:data.wind,
            hum:data.hum,
            pop:data.pop, 
        }
        days[index] = obj;
        return obj;
    })
    return {
        now:oNow,
        days:days,
        basic:json.basic,
    }
}
//天气状况代码
/*
cond    png
100 晴    1-0白天晴 1-1夜晚晴
1** 有云  2 多云
300 有雨  3 雨
400 雪   4雪
*/
//显示现在的天气
function showNowWeater(now){
    let oTmp = document.querySelector('.now b');//当前温度
    let oCond = document.querySelector('.now .cond');//晴
    let oTime = document.querySelector('.now .time');//更新时间
    let oHum = document.querySelector('.about .hum');//湿度
    let oWind = document.querySelector('.about .wind');//湿度
    let oComf = document.querySelector('.prompt .comf');//今日提示
    let oImg = document.querySelector('.now img');//图片
    oTmp.innerText = now.tmp;
    oCond.innerText = now.cond.txt;
    oTime.innerText = `今天${now.updata.loc.split(' ')[1]}更新`;
    oHum.innerText = `湿度 ${now.hum}%`;
    oWind.innerText = `${now.wind.dir} ${now.wind.sc}`;
    oComf.innerText = now.comf;

    //图片
    let time = new Date();
    let h = time.getHours();
    let str = now.cond.code;
    let src = '';
    switch(true){
        case str==='100':
            src = h > 18 ? '1-0.png' : '1-1.png';
        break;
        case str[0] === '1':
            src = '2.png';
        break;
        case str[0] === '3':
            src = '3.png';
        break;
        case str[0] === '4':
            src = '4.png';
        break;
    }
    oImg.src = 'img/'+src;
}
function shwoDaysWeather(days){
    let str = '';
    days.forEach(function(item,index){
        str += `<ul>
					<li>${item.txt}</li>
					<li>${item.cond}</li>
					<li>${item.tmp}</li>
					<li>${item.wind.dir}</li>
					<li>${item.wind.sc}级</li>
					<li>${item.hum}%</li>
					<li>${item.pop}%</li>
				</ul>`
    })
    let ndDays = document.querySelector('div.days');
    ndDays.innerHTML = str;
}
//修改地址
function showAddress(city, province){
    let oProvince = document.querySelector('.path .province');
    let oCity = document.querySelector('.path .city');
    oProvince.innerHTML = province;
    oCity.innerHTML = city;
}

//显示时间
let oHour = document.querySelector('.time .hour');
let oMin = document.querySelector('.time .min');
let oS = document.querySelector('.time .s');
showTime();
function showTime(get){
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    h = h >=10 ? h : '0' + h ;
    m = m >=10 ? m : '0' + m ;
    s = s >=10 ? s : '0' + s ;
    if(h != oHour.innerText){
        oHour.innerText = h;
    }
    
    if(m != oMin.innerText){
        oMin.innerText = m;
    }
    if(s != oS.innerText){
        oS.innerText = s;
    }
    setTimeout(showTime, 1000);
}









