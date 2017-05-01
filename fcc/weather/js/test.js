'use strict';

var rovince = '';
var oSite = {
    city: null,
    province: null
};
if (!localStorage.getItem('oSite')) {
    position();
} else {
    nextStep({ city: localStorage.getItem('city'),
        province: localStorage.getItem('province')
    });
}
//搜索城市
var oBtn = document.querySelector('input[type="button"]');
var oVal = document.querySelector('input[type="text"]');
oBtn.addEventListener('click', function () {
    if (oVal.value.length > 0) {
        nextStep({ city: oVal.value });
    }
});
oVal.addEventListener('keydown', function (e) {
    if (e.keyCode == 13 && oVal.value.length > 0) {
        nextStep({ city: oVal.value });
    }
});
//百度地图API 定位
function position() {
    var geolocation = new BMap.Geolocation();
    geolocation.getCurrentPosition(function (r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
            //获取城市名
            var address = r.address;
            nextStep(address); //{city, province}

            oSite.city = address.city;
            oSite.province = address.province;
            saveData();
        } else {
            alert('failed' + this.getStatus());
        }
    });
}
// 获取 市的上级城市
function getProvince(lat, lon) {
    var ndScript = document.createElement('script');
    ndScript.src = 'https://api.map.baidu.com/geocoder/v2/?callback=renderReverse&location=' + lat + ',' + lon + '&output=json&pois=1&ak=kCfDctmRp9PsWBBRAb0RAUi3MubuIQK6&callback=get';
    document.body.insertBefore(ndScript, document.body.firstChild);
    document.body.removeChild(ndScript);
}
//获取城市 然后 显示到页面
function get(data) {
    var province = data.result.addressComponent.province;
    var city = data.result.addressComponent.city;
    showAddress(city, province); //地址路径

    oSite.city = city;
    oSite.province = province;
}
//缓存数据
function saveData() {
    var storage = localStorage;
    if (!storage.getItem('oSite')) {
        console.log(oSite);
        localStorage.setItem('city', oSite.city);
        localStorage.setItem('province', oSite.province);
    }
}
//获取城市后
function nextStep(_ref) {
    var city = _ref.city,
        _ref$province = _ref.province,
        province = _ref$province === undefined ? false : _ref$province;

    getCityWeather(city, function (json) {
        var _parseWeatherObj = parseWeatherObj(json),
            oNow = _parseWeatherObj.now,
            aDays = _parseWeatherObj.days,
            basic = _parseWeatherObj.basic;

        showNowWeater(oNow); //现在天气
        shwoDaysWeather(aDays); //3天气
        if (!province) {
            getProvince(basic.lat, basic.lon); //省
            return;
        }
        showAddress(city, province); //地址路径
    });
}
//获取天气 和风天气API
function getCityWeather(city, fun) {
    var ajax = new XMLHttpRequest();
    var data = null;
    ajax.onreadystatechange = function () {
        if (ajax.readyState == 4 && ajax.status == 200) {
            var nowJson = JSON.parse(ajax.responseText);

            fun && fun(nowJson);
        }
    };
    ajax.open('GET', 'https://free-api.heweather.com/v5/weather?city=' + city + '&key=de3f25819a7b4427a4ca71d7cb1e9491');
    ajax.onerror = function () {
        console.log('发生错误,再次执行');
        position();
    };
    ajax.send();
}
//解析天气JSON
function parseWeatherObj(json) {
    json = json.HeWeather5[0];
    //今天的 天气情况
    console.log(json);
    if (json.status !== 'ok') {
        alert('城市不存在！');
        return;
    }
    var oNow = {
        cond: json.now.cond, //现在天气代码 状况
        tmp: json.now.tmp, //现在温度,
        wind: json.now.wind, //风
        hum: json.now.hum, //现在湿度,
        updata: json.basic.update, //数据更新时间
        comf: json.suggestion.comf.txt };
    // 3天的 简单天气情况
    var daysJson = json.daily_forecast;
    var str = ['今天', '明天', '后天'];
    var days = [null, null, null];
    days.map(function (item, index) {
        var data = daysJson[index];
        var obj = {
            txt: str[index],
            cond: data.cond.txt_n,
            tmp: data.tmp.max + '° / ' + data.tmp.min + '°',
            wind: data.wind,
            hum: data.hum,
            pop: data.pop
        };
        days[index] = obj;
        return obj;
    });
    return {
        now: oNow,
        days: days,
        basic: json.basic
    };
}
//显示现在的天气
function showNowWeater(now) {
    var oTmp = document.querySelector('.now b'); //当前温度
    var oCond = document.querySelector('.now .cond'); //晴
    var oTime = document.querySelector('.now .time'); //更新时间
    var oHum = document.querySelector('.about .hum'); //湿度
    var oWind = document.querySelector('.about .wind'); //湿度
    var oComf = document.querySelector('.prompt .comf'); //今日提示
    var oImg = document.querySelector('.now img'); //图片
    oTmp.innerText = now.tmp;
    oCond.innerText = now.cond.txt;
    oTime.innerText = '\u4ECA\u5929' + now.updata.loc.split(' ')[1] + '\u66F4\u65B0';
    oHum.innerText = '\u6E7F\u5EA6 ' + now.hum + '%';
    oWind.innerText = now.wind.dir + ' ' + now.wind.sc;
    oComf.innerText = now.comf;

    //图片
    var time = new Date();
    var h = time.getHours();
    var str = now.cond.code;
    var src = '';
    switch (true) {
        case str === '100':
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
    oImg.src = 'img/' + src;
}
//显示3天的天气
function shwoDaysWeather(days) {
    var str = '';
    days.forEach(function (item, index) {
        str += '<ul>\n\t\t\t\t\t<li>' + item.txt + '</li>\n\t\t\t\t\t<li>' + item.cond + '</li>\n\t\t\t\t\t<li>' + item.tmp + '</li>\n\t\t\t\t\t<li>' + item.wind.dir + '</li>\n\t\t\t\t\t<li>' + item.wind.sc + '\u7EA7</li>\n\t\t\t\t\t<li>' + item.hum + '%</li>\n\t\t\t\t\t<li>' + item.pop + '%</li>\n\t\t\t\t</ul>';
    });
    var ndDays = document.querySelector('div.days');
    ndDays.innerHTML = str;
}
//修改地址
function showAddress(city, province) {
    var oProvince = document.querySelector('.path .province');
    var oCity = document.querySelector('.path .city');
    oProvince.innerHTML = province;
    oCity.innerHTML = city;
}

//显示时间
var oHour = document.querySelector('.time .hour');
var oMin = document.querySelector('.time .min');
var oS = document.querySelector('.time .s');
showTime();
function showTime(get) {
    var time = new Date();
    var h = time.getHours();
    var m = time.getMinutes();
    var s = time.getSeconds();
    h = h >= 10 ? h : '0' + h;
    m = m >= 10 ? m : '0' + m;
    s = s >= 10 ? s : '0' + s;
    if (h != oHour.innerText) {
        oHour.innerText = h;
    }

    if (m != oMin.innerText) {
        oMin.innerText = m;
    }
    if (s != oS.innerText) {
        oS.innerText = s;
    }
    setTimeout(showTime, 1000);
}

//天气状况代码
/*
cond    png
100 晴    1-0白天晴 1-1夜晚晴
1** 有云  2 多云
300 有雨  3 雨
400 雪   4雪
*/
