/**
 * Created by kwangheejung on 2017. 9. 18..
 */
/*
 * DEV COMPANY : CM
 * DEV NAME : KWANG HEE JUNG
 * DEV EMAIL : KHJUNG@C-MAKER.CO.KR
 * DEV VER : 1.0
 * DEV MODULE NAME : AJAX MODULE
 * DEV HOMEPAGE : www.c-maker.co.kr
 */
/****** ajax module **********/
var common = {};
common.ajax = {};
common.ajax.type = "post";
common.ajax.dataType = "json";

common.ajax.send = function (url, data) {
    //console.log(data);
    $.ajax({
        type:common.ajax.type,
        url:url,
        data:data,
        success:function(data){
            common.ajax.returnGubun(url, data);
        },
        error:function(e){
            alert(e.responseText);
        }
    });
}

common.ajax.returnGubun = function(url, data) {
    if(typeof eval(common.ajax.return) == "function") {
        common.ajax.return(data);
        //common.ajax.return(eval("("+data+")"));
    } else {
        alert("실행된 함수가 지정되지 않았습니다");
    }
}
/****** ajax module end *********/

common.cookie = {};
common.cookie.set = function(name, value, days) {
    var newCookie = name + "=" + escape(value);
    if (days) {
        var expires = new Date();
        expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);
        newCookie += "; expires=" + expires.toGMTString();
    }
    document.cookie = newCookie;
}

common.cookie.get = function(name) {
    var allCookies = document.cookie;
    var beginIndex = allCookies.indexOf(" " + name + "=");
    if (beginIndex === -1) {
        beginIndex = allCookies.indexOf(name + "=");
    }
    if (beginIndex === -1) {
        return null;
    } else {
        beginIndex = allCookies.indexOf("=", beginIndex) + 1;
        var endIndex = allCookies.indexOf(";", beginIndex);
        if (endIndex === -1) {
            endIndex = allCookies.length;
        }
        return unescape(allCookies.substring(beginIndex, endIndex));
    }
}

common.noti = {};
common.noti.success = function(header, contents) {
    $.jGrowl(contents, {
        position: 'top-center',
        theme: 'bg-teal',
        header: header
    });
}

common.noti.danger = function(header, contents) {

    $.jGrowl(contents, {
        position: 'top-center',
        header: header,
        theme: 'bg-danger'
    });
}

common.cookie.del = function(name) {
    document.cookie = name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}



common.loading = {};
common.loading.start = function(id) {
    $("#"+id).block({
        message: '<i class="icon-spinner2 spinner text-warning" style="font-size:50px"></i>',
        overlayCSS: {
            backgroundColor: '#fff',
            opacity: 0.7,
            cursor: 'wait'
        },
        css: {
            border: 0,
            padding: 0,
            backgroundColor: 'none'
        }
    });
}

common.loading.end = function(id) {
    //$("#"+id).unblock();
    /*
        window.setTimeout(function () {
                $(light_2).unblock();
            }, 2000);
    */
    window.setTimeout(function () {
        $("#"+id).unblock();
    }, 200);
    //$("#"+id).unblock();
};
