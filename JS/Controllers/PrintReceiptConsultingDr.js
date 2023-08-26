var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid"), _UserName = $qc.Cookie("username");
var _rtnQuery = getQueryParams(document.location.search);

$(document).ready(function () {

    if (typeof localStorage.getItem('RefConDrPage') == 'undefined') {
        $("#chkHideShow").prop('checked', true);
        $(".clsHeaderHide").show();
    } else {
        if (localStorage.getItem('RefConDrPage') == '1') {
            $("#chkHideShow").prop('checked', true);
            $(".clsHeaderHide").show();
        } else {
            $("#chkHideShow").prop('checked', false);
            $(".clsHeaderHide").hide();
        }
    }

    $("#chkHideShow").click(function () {
        var flag = 0;
        if ($(this).prop('checked') == true) {
            $(".clsHeaderHide").show(); flag = 1;
        } else {
            $(".clsHeaderHide").hide(); flag = 0;
        }

        localStorage.setItem('RefConDrPage', flag);
    });

    //var htmPath = RootFolderPath('HTMLForms/' + _LocationId + '/' + _rtnQuery.form + '.html');
    //$("#divConsentForm").load(htmPath);
    //var _param = ["LetterHeadDetails", _rtnQuery.pat, _LocationId];
    //GetDataFromDatabase(22, 'GetDetails', _param, 'DentalParams');
    var _objParams = ["PrintConsultingReceiptFormat", _rtnQuery.l, _LocationId, 0, "Receipt"];
    GetDataFromDatabase(46, "GetDetails", _objParams, "DentalParams");


});

function onGetDataSuccess(data, context) {
    if (data == '') { $(".PrintReceipts").hide(); return false; }
    eval('var obj=' + data);
    if (obj) {
        $(".DrName1").html(obj[0]["docname1"]); $(".DrName2").html(obj[0]["docname2"]);
        $("#q1").html(obj[0]["q1"]); $("#q2").html(obj[0]["q2"]);
        $("#r1").html('Reg No.' + obj[0]["regno1"]); $("#r2").html('Reg No.' + obj[0]["regno2"]);
        $("#m1").html('<i class="fa fa-phone"></i> ' + obj[0]["m1"]); $("#m2").html('<i class="fa fa-phone"></i> ' + obj[0]["m2"]);

        $(".docname").html(obj[0]["docname"]);
        /*$("#patgender").html(obj[0]["gender"]); $("#patage").html(obj[0]["age"]);*/
        $("#qno").html(obj[0]["refid"]);
        $("#paymode").html(obj[0]["PayMode"]);

        $(".ClinicName").html(obj[0]["clinicname"]); $(".ClinicAddress").html(obj[0]["clinicadd"]);

        $("#cdate").html(_GlobalPatHistory.CurrentDateDMY);

        $("#doctorsignname").html(obj[0]["docname1"]);
        if (obj[0]["docname1"] != '') {
            $("#imgdoctorsign").attr('src', RootFolderPath(obj[0]["digitalsign"])); $("#imgdoctorsign").show();
        } else {
            $("#imgdoctorsign").hide();
        }

        $("#amount").html(obj[0]["PaidAmount"]);
        $("#amountinword").html(inWords(obj[0]["PaidAmount"]));

    }
}

var a = ['', 'one ', 'two ', 'three ', 'four ', 'five ', 'six ', 'seven ', 'eight ', 'nine ', 'ten ', 'eleven ', 'twelve ', 'thirteen ', 'fourteen ', 'fifteen ', 'sixteen ', 'seventeen ', 'eighteen ', 'nineteen '];
var b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

function inWords(num) {
    if ((num = num.toString()).length > 9) return 'overflow';
    n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
    if (!n) return; var str = '';
    str += (n[1] != 0) ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
    str += (n[2] != 0) ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
    str += (n[3] != 0) ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
    str += (n[4] != 0) ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
    str += (n[5] != 0) ? ((str != '') ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + 'only ' : '';
    return str;
}