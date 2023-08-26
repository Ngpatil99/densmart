var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid"), _UserName = $qc.Cookie("username");
var _rtnQuery = getQueryParams(document.location.search);

$(document).ready(function () {

    if (typeof localStorage.getItem('RefPage') == 'undefined') {
        $("#chkHideShow").prop('checked', true);
        $(".clsHeaderHide").show();
    } else {
        if (localStorage.getItem('RefPage') == '1') {
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

        localStorage.setItem('RefPage', flag);
    });

    var _param = ['ReferralForm', _rtnQuery.pat, _rtnQuery.q, 0, _LocationId];
    GetDataFromDatabase(62, 'ReplaceFields', _param, 'DentalParams');



    var _param = ["LetterHeadDetails", _rtnQuery.pat, _LocationId];
    GetDataFromDatabase(22, 'GetDetails', _param, 'DentalParams');


    var logo = RootFolderPath('ClinicLogo/' + _LocationId + '.jpg');
    if (urlExists(logo)) {
        $(".ClinicLogo").html('<img src="' + logo + '" style="height: 40px;" />');
    }

});

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;

}

function onGetDataSuccess(data, context) {
    if (context == 'GetDetails') {
        if (data == '') { $(".PrintReceipts").hide(); return false; }
        eval('var obj=' + data);
        if (obj) {
            $(".DrName1").html(obj[0]["docname1"]);

            $("#doctorsignname").html(obj[0]["docname1"]);
            if (obj[0]["docname1"] != '') {
                $("#imgdoctorsign").attr('src', RootFolderPath(obj[0]["digitalsign"])); $("#imgdoctorsign").show();
            } else {
                $("#imgdoctorsign").hide();
            }

            if (obj[0]["docname2"] == '') {
                $(".DrName2").parent().html('');
            }
            $(".DrName2").html(obj[0]["docname2"]);


            $("#q1").html(obj[0]["q1"]); $("#q2").html(obj[0]["q2"]);
            $("#r1").html('Reg No.' + obj[0]["regno1"]); $("#r2").html('Reg No.' + obj[0]["regno2"]);
            $("#m1").html('<i class="fa fa-phone"></i> ' + obj[0]["m1"]); $("#m2").html('<i class="fa fa-phone"></i> ' + obj[0]["m2"]);

            $("#patname").html(obj[0]["patname"]); $("#patgender").html(obj[0]["gender"]); $("#patage").html(obj[0]["age"]);

            $(".ClinicName").html(obj[0]["clinicname"]); $(".ClinicAddress").html(obj[0]["clinicadd"]);

            $("#cdate").html(_GlobalPatHistory.CurrentDateDMY);
        }



    }
    else if (context == 'ReplaceFields') {
        if (data == '') { return false; }
        eval('var objFields=' + data);
        var htmPath = RootFolderPath('HTMLForms/' + _LocationId + '/' + objFields.PrintType + '.html');

        $("#divConsentForm").load(htmPath, function () {
            var strHTML = $("#divConsentForm").html();
            for (var key in objFields) {

                strHTML = strHTML.replace('{' + key.toUpperCase() + '}', objFields[key]).replace('{' + key.toUpperCase() + '}', objFields[key]).replace('{' + key.toUpperCase() + '}', objFields[key]).replace('{' + key.toUpperCase() + '}', objFields[key]);
            }
            $("#divConsentForm").html(strHTML);
        });



    }
    else if (context == 'UpdateReceiptURL') {
        if (data == 0 || data == '') { return false; }
        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient Essentials|' + data + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "PatientReferralForm");

    }

}




function whatsup() {
    var _filename = 'PatientReferralForm_' + _rtnQuery.pat + '_' + _rtnQuery.q;
    fn_GenerateExamPaperPDF(_filename);
}

function fn_GenerateExamPaperPDF(FileName) {

    var _print = '<html class="Downloadpdf">';
    _print += '<head>';
    _print += '<title>Patient Referral Form</title>';
    _print += '<meta charset="utf-8" />';
    _print += '<link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.css" />';
    _print += '<link rel="stylesheet" type="text/css" href="https://doctor.oramo.in/CSS/bootstrap.min.css" />';
    _print += '<link rel="stylesheet" type="text/css" href="https://doctor.oramo.in/CSS/admin.min.css" />';
    _print += '<style type="text/css">.TreatmentCardPrint .list-group {position: sticky;top: 75px;}.TreatmentCardPrint .list-group-item {padding: 0;}.TreatmentCardPrint .list-group-item .checkbox {padding: 6px 10px;display: block;}@media print {.TreatmentCardPrint {padding: 0;}.TreatmentCardPrint .row {padding: 0;margin: 0;}.TreatmentCardPrint [class*=col] {padding: 0;}.TreatmentCardPrint .right {display: none;}}</style>';
    _print += '<style type="text/css">*, ::after, ::before {box-sizing: border-box;}html, body{background:#fff;}.header{padding:15px 0 0; margin:0;width:100%!important;}.headerinside{display: block;}.headerinside:after{content:""; display:table; clear:both;}.headerleft{float: left; width: 25%; text-align:left;}.headercenter{display:block;float: left;width: 50%;}.headerright{float: left; width: 25%; text-align:left;}.twopart{}.twopart:after{content:""; display:table; clear:both;}.twopart .left{width: 50%;float: left;text-align: left;}.twopart .right{width: 50%;float: left;text-align: right;}.tdpatch{padding:0 15px!important;}.tdpatch .table{width:202mm!important;}.tdpatch > div{margin-bottom:20px!important;}.footer{padding:0 15px 15px;}';

    //_print += '@media screen{';
    //_print += '.mainpage{';
    //_print += 'padding:20px; border:1px solid #000;';
    //_print += '}';
    //_print += '.mainpage + .mainpage{margin - top:30px!important;}';
    //_print += '}';
    //_print += '@page{';
    //_print += 'size:A4 portrait; margin:10px;';
    //_print += '}';
    //_print += '@media print {';
    //_print += '.mainpage{page-break-after:always;}';
    //_print += '}';
    _print += '</style>';
    _print += '</head>';
    _print += '<body><div class="PrintReceipts" >' + $(".PrintReceipts").html() + '</div>';

    _print += '</body>';
    _print += '</html>';




    var options = {
        format: 'A4',
        orientation: "portrait", // portrait or landscape
        //border: "0"             // default is 0, units: mm, cm, in, px

        //border: {
        //    "top": "0.1in",            // default is 0, units: mm, cm, in, px
        //    "right": "0.2in",
        //    "bottom": "0.1in",
        //    "left": "0.2in"
        //}

        //,watermark: document.location.origin

    };
    GeneratePDF("GeneratePDF/" + _LocationId, FileName, 'pdf', options, _print, 'DownloadExamQuesPaper');
}

function onGeneratePDF(data, context) {
    if (context == 'DownloadExamQuesPaper') {
        if (data == '') { return false; }
        var strSQL = '';

        var _url = 'https://doctor.oramo.in/uploads/' + pgLoadVariableQaurus.ClientNo + '/uploadedfiles/' + data;

        strSQL = 'insert into pdfurls(ParentId,PatientId,LocationId,DoctorId,ReceiptURL,PageType,moddate)';
        strSQL += ' values(' + _rtnQuery.q + ',' + _rtnQuery.pat + ',' + _LocationId + ',0,`' + _url + '`,`PatientReferralForm`,getdate())';
        strSQL += ' select SCOPE_IDENTITY() ';

        var objParams = ["UpdateSQL", strSQL];
        UpdateDataToDatabase(13, 'UpdateReceiptURL', objParams, 'DentalParams');



        //console.log(data);
        //var _url = RootFolderPath(data);
        //var link = document.createElement('a');
        //link.href = _url;
        //link.download = _ExamName + '.pdf';
        //link.target = "_blank";
        //link.dispatchEvent(new MouseEvent('click'));
    }
}