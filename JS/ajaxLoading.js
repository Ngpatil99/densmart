var message = "";
var query = document.location.href;
var queryArr = query.split('/');
var len = queryArr.length;
//var path = getUrlPath(pgLoadVariableQaurus.StartPath); // for online 3
//function getUrlPath(start) { var path = ''; if (len == start) { path = ''; } else if (len == start + 1) { path = '../'; } else if (len == start + 2) { path = '../../'; } else if (len == start + 3) { path = '../../../'; } else if (len == start + 4) { path = '../../../../'; } else if (len == start + 5) { path = '../../../../../'; } else if (len == start + 6) { path = '../../../../../../'; } return path; }

$(document).ready(function () {
   // HideAJAXLoader();
    // right click disabled 
    //if (document.layers) { document.captureEvents(Event.MOUSEDOWN); document.onmousedown = clickNS4; } else if (document.all && !document.getElementById) { document.onmousedown = clickIE4; }
    //document.oncontextmenu = new Function("return false");
    //hideStatusBar();
    //adjustframeheight();
});

//function adjustframeheight() {}
//function AlertMessages(MessageId, isAutoClose, isParent, OpenWith, param, param1, param2) { }
//function fanclyload() {}
//function HideAJAXLoader() { $(".lodingParentElement").hide(); }
//function ShowAJAXLoader() { $(".lodingParentElement").show(); }
//function clickIE4() { if (event.button == 2) { alert(message); return false; } }
//function clickNS4(e) { if (document.layers || document.getElementById && !document.all) { if (e.which == 2 || e.which == 3) { alert(message); return false; } } }

//function hideStatusBar() {
//    setTimeout(function () {
//        $("#divStatusBar").hide();
//    }, 2000);
//}

function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens, re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])] = decodeURIComponent(tokens[2]).replace(/%3D/gi, '=');
    }

    return params;
}

function getUrlParameters(parameter, staticURL, decode) {

    var currLocation = (staticURL.length) ? staticURL : window.location.search, parArr = currLocation.split("?")[1].split("&"), returnBool = true;

    for (var i = 0; i < parArr.length; i++) {
        parr = parArr[i].split("=");
        if (parr[0] == parameter) {
            return (decode) ? decodeURIComponent(parr[1]) : parr[1];
            returnBool = true;
        } else {
            returnBool = false;
        }
    }

    if (!returnBool) return false;
}

//function fillFancyBox(url, scrwidth, scrheight, type, isParent, _topwidth) {}
//function closeFancyBox(type) {}
