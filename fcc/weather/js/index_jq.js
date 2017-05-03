$(document).ready(function(){
    //文档准备就绪后开始的事情
    if(!storageState().state){
        position(function(){
            $('#loading').fadeOut();
        });
    } else {
        let city = storageState().city;
        let province = storageState().province;
        showAddress(city, province);
        getCityWeather(city, function(){
            $('#loading').fadeOut();
        });
    }
    showTime();
    let searchBox = $('#city');
    let searchBtn = $('input[type="button"]');
    let oUl = $('.search ul');
    let oLabel = $('.search');
    
    searchBox.focus(function(){
        oLabel.addClass('focus');
        oUl.slideDown(300);
    });
    searchBox.blur(function(){
        oUl.slideUp(300);
        oLabel.removeClass('focus');
    });
    oUl.mousedown(function(e){
        if(e.target.tagName == "LI"){
            oUl.slideUp(300);
            oLabel.removeClass('focus');
            let text = e.target.innerText;

            getCityWeather(e.target.dataset.cityid);
            showAddress(text.split(',')[2],text.split(',')[1]);
            searchBox.blur();
            searchBox.val('');
            oUl.html('');         
            e.preventDefault();
        }
    })
    searchBox.keydown(function(e){
        setTimeout(() => {
            let text = searchBox.val();
            //用户搜索城市 
            if(text.length == 0 ) {
                oUl.html('');         
                return
            };
            userSearchCity(text);
            if(e.which == 13){
                let oLi  = $('ul li').first();
                let text = oLi.text();
                getCityWeather(oLi.attr('data-cityid'));
               showAddress(text.split(',')[2],text.split(',')[1]);

                oUl.slideUp(300);
                oLabel.removeClass('focus');
                searchBox.blur();
            }
        },0)
    });
})
//定位 百度地图API
function position(callback){
    let getLocation = new BMap.Geolocation();   
    getLocation.getCurrentPosition(function(r){
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
            let address = r.address;
            
            storageState().save(address);
            //显示地址路径
            showAddress(address.city, address.province);
            //获取城市天气信息
            getCityWeather(address.city,callback);
            callback && callback();
        } else {
            console.log('获取错误，再次获取！')
            //失败 再次定位
            position();
        }
    })
}
//获取城市的天气信息  和风天气API
function getCityWeather(city, callback){
    console.log(city)
    $.ajax({
        type:'GET',
        url:`https://free-api.heweather.com/v5/weather?city=${city}&key=de3f25819a7b4427a4ca71d7cb1e9491`,
        success:function(data){
            if(data.HeWeather5[0].status!= 'ok'){
                return alert('城市不存在，或城市尚未架设服务器！');
            }
            let weatherData = parseCityWeather(data);
            let oNow = weatherData.oNowWeather;
            let aDays = weatherData.aDaysWeather;
            //显示当天天气
            showNowWeather(oNow);  
            //显示3天天气
            showDaysWeather(aDays); 
            callback && callback();
        },
        errot:position,
    })
}
//解析城市 天气JSON
function parseCityWeather(json){
    json = json.HeWeather5[0];
    if(json.status !== 'ok'){
        return alert('城市不存在，或城市尚未架设服务器！');
    };
    //当天的情况
    let oNowWeather = {
        cond:json.now.cond, //现在天气状况ID 及信息
        tmp:json.now.tmp, //现在温度,
        wind:json.now.wind, //风
        hum:json.now.hum, //现在湿度,
        updata:json.basic.update, //数据更新时间
        comf:json.suggestion.comf.txt,//今日提示
    };
    //3天的情况
    let daysJson = json.daily_forecast;
    let str = ['今天','明天','后天'];
    let aDaysWeather = [];
    for(let i = 0 ;  i<3; i++){
        let data = daysJson[i];
        let obj = {
            txt:str[i],
            cond:data.cond.txt_d,
            tmp:data.tmp.max+'°/'+data.tmp.min+'°',
            wind:data.wind,
            hum:data.hum,
            pop:data.pop, 
        };
        aDaysWeather[i] = obj;
    };
    return {
        oNowWeather:oNowWeather,
        aDaysWeather:aDaysWeather,
        basic:json.basic,//地址信息 lat lon
    };
}
// 显示 天气
function showNowWeather(oData){
    $('.now b').text(oData.tmp);
    $('.now .cond').text(oData.cond.txt);
    $('.now .time').text(`今天${oData.updata.loc.split(' ')[1]}更新`);
    $('.about .hum').text(`湿度${oData.hum}%`);
    $('.about .wind').text(`${oData.wind.dir} ${oData.wind.sc}`);
    $('.prompt .comf').text(oData.comf);

    //天气图片 判断下
    let h = getTime().h;
    let code = oData.cond.code;
    let src = '';
    switch(true){
        case code ==='100':
            src = h > 18 ? '1-0.png' : '1-1.png';
        break;
        case code[0] === '1':
            src = '2.png';
        break;
        case code[0] === '3':
            src = '3.png';
        break;
        case code[0] === '4':
            src = '4.png';
        break;
    }
    $('.now img').src = `img/${src}`;
}
//显示 3天 天气
function showDaysWeather(aData){
    let sHtml = '';
    aData.forEach(function(item,index){
        sHtml += `<ul>
					<li>${item.txt}</li>
					<li>${item.cond}</li>
					<li>${item.tmp}</li>
					<li>${item.wind.dir}</li>
					<li>${item.wind.sc}级</li>
					<li>${item.hum}%</li>
					<li>${item.pop}%</li>
				</ul>`
    });
    $('div.days').html(sHtml);
}
//显示 定位路径
function showAddress(city, province){
    $('.path .province').text(province);
    $('.path .city').text(city);
}
//用户搜索
function userSearchCity(str){
    $.getJSON("js/city.json", function(data){
        let aCity = [];
        data.forEach(function(item, index){
            if(aCity.length>5){
                return;
            }
            switch(true){
                case item.cityZh.indexOf(str) !== -1:
                    aCity.push(item);
                break;
                case item.cityEn.indexOf(str) !== -1:
                    aCity.push(item);
                break;
                case item.leaderZh.indexOf(str) !== -1:
                    aCity.push(item);
                break;
                case item.provinceZh.indexOf(str) !== -1:
                    aCity.push(item);
                break;
            }
        });
        showUserSearch(aCity);
    });
}
//显示用户搜索
function showUserSearch(arr){
    let sHtml = '';
    arr.forEach(function(item){
        sHtml += `<li data-cityid=${item.id} >${item.provinceZh},${item.leaderZh},${item.cityZh}</li>`;
    })
    $('#city ~ ul').html(sHtml);
}
//获取缓存
function storageState(){
    let storageTime = localStorage.getItem('date');
    let nowTime = Date.now();
    let obj = {
        save:save,
        city:null,
        province:null,
        state:false,
    };
    if(!storageTime || nowTime - storageTime >= 864000){
        obj.state=false;
    } else {
        console.log('有缓存');
        obj.city = localStorage.getItem('city');
        obj.province = localStorage.getItem('province');
        obj.state = true;
    }
    function save({city,province}){
        localStorage.setItem('date',Date.now());
        localStorage.setItem('city',city);
        localStorage.setItem('province',province);
        obj.city = city;
        obj.province = province;
    }
    return obj
}
//显示时间
function showTime(){
    let oHour = $('.time .hour');
    let oMin = $('.time .min');
    let oS = $('.time .s');
    show();
    function show(){
        let time = getTime();
        oHour.text(time.h);
        oMin.text(time.m);
        oS.text(time.s);
        setTimeout(show,1000)
    }
}
//获取现在 时 分 秒 返回 {}
function getTime(){
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();
    h = h >=10 ? h : '0' + h ;
    m = m >=10 ? m : '0' + m ;
    s = s >=10 ? s : '0' + s ;
    return {
        h:h,
        m:m,
        s:s,
    }
}
