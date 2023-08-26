$(document).ready(function () {
    //$(".number").bind("keypress", function (e) {
    //    var specialKeys1 = ',46,8,9,35,36,37,39,';
    //    var keyCode = e.which ? e.which : e.keyCode;
   
    //    var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys1.indexOf(',' + keyCode + ',') != -1);
    //    return ret;
    //});
    //$(".number").bind("blur", function (e) { if ($(this).val() == '') { $(this).val(''); return false; } });
    //$(".number").bind("paste", function (e) { return false; });
    //$(".number").bind("drop", function (e) { return false; });
    //$('input').bind('keypress', function (e) { var specialKeys = ',46,8,9,35,36,37,39,'; var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode; var ret = ((keyCode == 32) || (keyCode >= 40 && keyCode <= 47) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 60 && keyCode <= 95) || (keyCode >= 97 && keyCode <= 125) || (specialKeys.indexOf(e.keyCode) != -1 && e.charCode != e.keyCode)); return ret; });
    //$('.email').blur(function () { emailValidation(); });

    $('.UpperCase').blur(function () { UpperCase_FirstLetter(this); });
});

function UpperCase_FirstLetter(obj) {
    if (obj != null) { if (obj.value != '') { var pattern = /(\w)(\w*)/; var a = obj.value.split(/\s+/g); for (i = 0; i < a.length; i++) { var parts = a[i].match(pattern); if (parts != null) { if (typeof parts[1] != 'undefined') { var firstLetter = parts[1].toUpperCase(); var restOfWord = parts[2].toLowerCase(); a[i] = firstLetter + restOfWord; } } } obj.value = a.join(' '); } }
}


function specialchar() {
    $('input').bind('keypress', function (e) {
        var specialKeys = ',46,8,9,35,36,37,39,';
        var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode;
        var ret = ((keyCode >= 40 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 60 && keyCode <= 95) || (keyCode >= 97 && keyCode <= 125) || (specialKeys.indexOf(',' + keyCode + ',') != -1 && e.charCode != e.keyCode));
        return ret;
    });
}

function number() {
    var specialKeys = ',46,8,9,35,36,37,39';
    $(".number").bind("keypress", function (e) {
        var specialKeys1 = ',46,8,9,35,36,37,39,';
        var keyCode = e.which ? e.which : e.keyCode;
        
        var ret = ((keyCode >= 48 && keyCode <= 57) || specialKeys1.indexOf(',' + keyCode + ',') != -1);
        return ret;
    });
    $(".number").bind("paste", function (e) { return false; });
    $(".number").bind("blur", function (e) { if ($(this).val() == '') { $(this).val('0'); return false; } });
    $(".number").bind("drop", function (e) { return false; });
    $('.email').blur(function () { emailValidation(); });
}

function _emailValidation() { $(".email").bind("blur", function (e) { emailValidation(); }); }
function emailValidation() { var sEmail = $('.email').val(); var Email = $('.email'); Email.css('border', '1px solid #cccccc'); if (validateEmail(sEmail) == false) { Email.css('border', '1px solid red'); Email.focus(); } else { Email.css('border', '1px solid #cccccc'); } }
function validateEmail(sEmail) { var filter = /^[\w\-\.\+]+\@[a-zA-Z0-9\.\-]+\.[a-zA-z0-9]{2,4}$/; if (filter.test(sEmail)) { return true; } else { return false; } }
function IsAlphaNumeric(e) { var specialKeys1 = ',46,8,9,35,36,37,39,32,'; var keyCode = e.keyCode == 0 ? e.charCode : e.keyCode; var ret = ((keyCode >= 40 && keyCode <= 46) || (keyCode >= 48 && keyCode <= 57) || (keyCode >= 60 && keyCode <= 95) || (keyCode >= 97 && keyCode <= 125) || (specialKeys1.indexOf(',' + e.keyCode + ',') != -1 && e.charCode != e.keyCode)); return ret; }
function dateLen(d) { var d1 = d + ''; d1 = (d1.length == 1) ? '0' + d : d; return d1; }

function emailValidationobj(obj) {  var sEmail = $(obj).val(); var Email = $(obj); Email.css('border', '1px solid #cccccc'); if (validateEmail(sEmail) == false) { Email.css('border', '1px solid red'); Email.focus(); } else { Email.css('border', '1px solid #cccccc'); } }
