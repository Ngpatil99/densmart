var pgLoadVariableQaurus = {
    'Ver': '1.0',
    'RestrictIUD': false,
    'StartPath': 3,
    'MaxTime': '8:00pm',
    'MinTime': '9:00am',
    'LocationID': 1,
    'CountryId': localStorage.getItem("CountryId"),
    'StateId': 14,
    'CityId': 0,
    'PageCategory': 0,
    'Calender': localStorage.getItem("CountryName"),
    'CountryCode': '+91',
    'CurrencyCode': 'RS',
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

var myCalendar,_CurrentDate=new Date,_GlobalPatHistory={CurrentDate:DateDigitLen(_CurrentDate.getMonth()+1)+"-"+DateDigitLen(_CurrentDate.getDate())+"-"+_CurrentDate.getFullYear(),CurrentDateDMY:DateDigitLen(_CurrentDate.getDate())+"-"+DateDigitLen(_CurrentDate.getMonth()+1)+"-"+_CurrentDate.getFullYear(),CurrentTime:DateDigitLen(_CurrentDate.getHours())+":"+DateDigitLen(_CurrentDate.getMinutes())+":"+DateDigitLen(_CurrentDate.getSeconds())+":"+DateDigitLen(_CurrentDate.getMilliseconds()),CurrentDateYMD:_CurrentDate.getFullYear()+"-"+DateDigitLen(_CurrentDate.getMonth()+1)+"-"+DateDigitLen(_CurrentDate.getDate())};function fn_PrintDateCalender(){"undefined"!=typeof FormatDate&&FormatDate.length>=9&&chkDateFormat(FormatDate[0],FormatDate[1],FormatDate[2],FormatDate[3],FormatDate[4],FormatDate[5],FormatDate[6],FormatDate[7],FormatDate[8],FormatDate[9])}function returnInteger(a){return parseInt(""==a||"null"==a||"undefined"==a||null==a?0:a)}function DateDigitLen(a){return a+="",a=1==a.length?"0"+a:a}function chkDateFormat(a,b,c,d,e,f,g,h,i,j){""!=a&&fn_ShowCalender(a),""!=b&&fn_ShowCalender(b),""!=c&&fn_ShowCalender(c),""!=d&&fn_ShowCalender(d),""!=e&&fn_ShowCalender(e),""!=f&&fn_ShowCalender(f),""!=g&&fn_ShowCalender(g),""!=h&&fn_ShowCalender(h),""!=i&&fn_ShowCalender(i),""!=j&&fn_ShowCalender(j)}function fn_ShowCalender(a){pgLoadVariableQaurus.Calender,(myCalendar=new dhtmlXCalendarObject([a])).setSkin("omega"),"MMDDYYYY"===$qc.Cookie("CalendarFormat")?myCalendar.setDateFormat("%m-%d-%Y"):myCalendar.setDateFormat("%d-%m-%Y"),myCalendar.hideTime(),myCalendar.attachEvent("onClick",function(b){"undefined"!=typeof fn_CalenderClick&&fn_CalenderClick(b,this,a)})}function abd(a){return""==a?a.replace(/[\|]/gi,",'',").replace(/,,/gi,","):param.replace(/[\|]/gi,",'',").replace(/,,/gi,",")}function getUrlVars(){var a,b=[],c=window.location.href.slice(window.location.href.indexOf("?")+1).split("&");if(window.location.href.indexOf("?")> -1&&c[0]!=window.location.href)for(var d=0;d<c.length;d++)a=c[d].split("="),b.push(a[0]),b[a[0]]=decodeURIComponent(a[1]);return b}function fn_AngularRouting(a){var b="";void 0!==$qc.Cookie("BrowserVer")&&(b=$qc.Cookie("BrowserVer")),a=a.indexOf("?")>=0?a+"&"+b:a+"?"+b,$("#ancRouting").length<=0?$("body").append('<a id="ancRouting" href="'+a+'" style="display:none;">Routing</a>'):$("#ancRouting").attr("href",a),$("#ancRouting").click()}function encryptURL(a,b){return"enc"==a?btoa(unescape(encodeURIComponent(b))):"dec"==a?decodeURIComponent(escape(atob(b))):void 0}function SignOut(){fn_UserLoginHistory("Out"),$qc.ClearSession(),localStorage.clear(),sessionStorage.clear(),caches.keys().then(function(a){for(let b of a)caches.delete(b)}),void 0===pgLoadVariableQaurus.ProjectType||null==pgLoadVariableQaurus.ProjectType||""==pgLoadVariableQaurus.ProjectType?window.open("login.html","_top"):"Payroll"==pgLoadVariableQaurus.ProjectType?window.open("Login.html","_top"):window.open("login.html","_top")}var _rtnAngRoutingPath=function(){return"DentalSoft"}