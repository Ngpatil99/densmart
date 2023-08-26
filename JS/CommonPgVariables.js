var pgLoadVariableQaurus = {
    'Ver': '1.0',
    'RestrictIUD': false,
    'StartPath': 3,
    'MaxTime': '8:00pm',
    'MinTime': '9:00am',
    'LocationID': 1,
    'CountryId': 1,
    'StateId': 14,
    'CityId': 0,
    'PageCategory': 0,
    'Calender': 'India',
    'CountryCode': '+91',
    'CurrencyCode': 'Rs',
    'CMSPortalURL': '',
    'ProjectSession': _rtnPS().PS,
    'webpath': document.location.origin + '/PreviewWebsite',
    "ProjectType": "Association", /*Association, Payroll, Inventory, Library*/
    "ClientNo": _rtnPS().ClientNo,
    "WSurl": _rtnPS().WSurl,
    "WSPort": _rtnPS().Port,
    "IOPort": _rtnPS().Port,
    "ImageURL": _rtnPS()._http + "://" + _rtnPS().WSurl + ":" + _rtnPS().Port + "/",
    "Pay_ProjectName": "ERP",
    "_wss": _rtnPS()._wss
};

function _rtnPS() {
    var _a = {
        "_http": "https", "_wss": "wss", "PS": "localhost", "ClientNo": 420
        , "WSurl": "demo.eloginweb.com", "Port": "9013"
    };
    
    return _a;
}


var _CurrentDate = new Date();
var myCalendar;

var _GlobalPatHistory = {
    'CurrentDate': DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(_CurrentDate.getDate()) + '-' + _CurrentDate.getFullYear(),
    'CurrentDateYMD': _CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(_CurrentDate.getDate()),
    'CurrentDateDMY': DateDigitLen(_CurrentDate.getDate()) + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + _CurrentDate.getFullYear(),
    'CurrentTime': DateDigitLen(_CurrentDate.getHours()) + ':' + DateDigitLen(_CurrentDate.getMinutes()) + ':' + DateDigitLen(_CurrentDate.getSeconds()) + ':' + DateDigitLen(_CurrentDate.getMilliseconds()),
};


//$(document).ready(function () {
//    generateColorBox();
//    switchTheme($qc.Cookie('ThemeColor'));
//});

function fn_PrintDateCalender() {
    if (typeof FormatDate != 'undefined') {
        if (FormatDate.length >= 9) {
            chkDateFormat(FormatDate[0], FormatDate[1], FormatDate[2], FormatDate[3], FormatDate[4], FormatDate[5], FormatDate[6], FormatDate[7], FormatDate[8], FormatDate[9]);
        }
    }
}
function returnInteger(text) { var str = '0'; if (text == '' || text == 'null' || text == 'undefined' || text == null) { str = 0; } else { str = text; } return parseInt(str); }
function DateDigitLen(val) { val = val + ''; val = (val.length == 1) ? '0' + val : val; return val; }


function chkDateFormat(objText1, objText2, objText3, objText4, objText5, objText6, objText7, objText8, objText9, objText10) {
    if (objText1 != '') { fn_ShowCalender(objText1); }
    if (objText2 != '') { fn_ShowCalender(objText2); }
    if (objText3 != '') { fn_ShowCalender(objText3); }
    if (objText4 != '') { fn_ShowCalender(objText4); }
    if (objText5 != '') { fn_ShowCalender(objText5); }
    if (objText6 != '') { fn_ShowCalender(objText6); }
    if (objText7 != '') { fn_ShowCalender(objText7); }
    if (objText8 != '') { fn_ShowCalender(objText8); }
    if (objText9 != '') { fn_ShowCalender(objText9); }
    if (objText10 != '') { fn_ShowCalender(objText10); }
}
function fn_ShowCalender(txtObj) {

    var lang = pgLoadVariableQaurus.Calender;
    myCalendar = new dhtmlXCalendarObject([txtObj]);
    myCalendar.setSkin('omega');
    // myCalendar.setDateFormat("%m-%d-%Y");
    // Calendar.setSensitiveRange("07-08-2017", null);\
    if ($qc.Cookie('CalendarFormat') === 'MMDDYYYY') {
        myCalendar.setDateFormat("%m-%d-%Y");
    } else {
        myCalendar.setDateFormat("%d-%m-%Y");
    }
    //myCalendar.setDateFormat("%d-%m-%Y");
    myCalendar.hideTime();
    myCalendar.attachEvent("onClick", function (date) { if (typeof fn_CalenderClick != 'undefined') { fn_CalenderClick(date, this, txtObj); } });
}
function abd(pa) {
    if (pa == "") { return pa.replace(/[\|]/gi, ',\'\',').replace(/,,/gi, ','); }
    else { return param.replace(/[\|]/gi, ',\'\',').replace(/,,/gi, ','); }
}
function getUrlVars() {
    var vars = [], hash, hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    if (window.location.href.indexOf('?') > -1 && hashes[0] != window.location.href) {
        for (var i = 0; i < hashes.length; i++) {
            hash = hashes[i].split('=');
            vars.push(hash[0]); vars[hash[0]] = decodeURIComponent(hash[1]);
        }
    }
    return vars;
}

function fn_AngularRouting(url) {
    var ver = '';
    if (typeof $qc.Cookie('BrowserVer') != 'undefined') {
        ver = $qc.Cookie('BrowserVer');
    }

    if (url.indexOf('?') >= 0) {
        url = url + '&' + ver;
    } else {
        url = url + '?' + ver;
    }

    if ($("#ancRouting").length <= 0) {
        $("body").append('<a id="ancRouting" href="' + url + '" style="display:none;">Routing</a>');
    } else {
        $("#ancRouting").attr('href', url);
    }
    $("#ancRouting").click();
}

function encryptURL(ty, url) { if (ty == "enc") { return btoa(unescape(encodeURIComponent(url))); } else if (ty == "dec") { return decodeURIComponent(escape(atob(url))); } }

function SignOut() {
    fn_UserLoginHistory('Out');

    $qc.ClearSession();
    localStorage.clear();
    sessionStorage.clear();
    caches.keys().then(function (names) {
        for (let name of names) {
            caches.delete(name);
        }
    });

    if (typeof pgLoadVariableQaurus.ProjectType == 'undefined' || pgLoadVariableQaurus.ProjectType == null || pgLoadVariableQaurus.ProjectType == '') {
        window.open('login.html', '_top');
    } else {
        if (pgLoadVariableQaurus.ProjectType == 'Payroll') {
            window.open('Login.html', '_top');
        } else {
            window.open('login.html', '_top');
        }
    }
}
var _rtnAngRoutingPath = function () {
    var routing = 'DentalSoft';
    //if (document.location.href.toLowerCase().indexOf('mypayroll') >= 0) {
    //    routing = "MyPayroll";
    //} else if (document.location.href.toLowerCase().indexOf('association') >= 0) {
    //    routing = "Association";
    //} else if (document.location.href.toLowerCase().indexOf('myoffice') >= 0) {
    //    routing = "MyOffice";
    //} else if (document.location.href.toLowerCase().indexOf('studentapp') >= 0) {
    //    routing = "StudentApp";
    //} else if (document.location.href.toLowerCase().indexOf('employeeportal') >= 0) {
    //    routing = "EmployeePortal";
    //} else if (document.location.href.toLowerCase().indexOf('searchportal') >= 0) {
    //    routing = "SearchPortal";
    //}
    return routing;
}