function getQueryParams(qs) {
    qs = qs.split("+").join(" ");

    var params = {}, tokens,
        re = /[?&]?([^=]+)=([^&]*)/g;

    while (tokens = re.exec(qs)) {
        params[decodeURIComponent(tokens[1])]
            = decodeURIComponent(tokens[2]);
    }

    return params;
}

//var query = getQueryParams(document.location.search);
//alert(query.foo);

///////////////////////////////////////////////////////////////////////////////////////

function getUrlParameters(parameter, staticURL, decode) {
    /*
    Function: getUrlParameters
    Description: Get the value of URL parameters either from 
    current URL or static URL
    Author: Tirumal
    URL: www.code-tricks.com
    */
    var currLocation = (staticURL.length) ? staticURL : window.location.search,
       parArr = currLocation.split("?")[1].split("&"),
       returnBool = true;

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

//var idParameter = getUrlParameters("id", "", true);


function getAngularQueryParams() {
    var hash = location.pathname.substring(location.pathname.lastIndexOf('/')).split('&');
    var Query = [];
    for (el in hash) {
        var q = hash[el].split('=');
        Query[q[0]] = q[1];
    }
    return Query;
}