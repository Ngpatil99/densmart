var _PatientPhoto = '';
var _PatientRecordId = 0;
var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid");
var _UserName = $qc.Cookie("username"), _RefDoctorRecordId = 0;

$(document).ready(function () {
    fn_FillGrid();

    // $("#btnAddNewPatients").click(function () { $("#mdlAddPatientModal").modal('show'); });
    FillDropDown_JS(false, 'SubClinicMaster', 'ddlClinicList', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    $("#txtPatSearch").focus();

    $('#txtPatSearch').keypress(function (event) {
        var keycode = (event.keyCode ? event.keyCode : event.which);
        if (keycode == '13') {
            fn_FillGrid();
        }
    });

    $("#ddlClinicList").change(function () { fn_FillGrid(); });

    //$("#ancVisitBook").click(function () {


    //    //$("#divMissingList").show();
    //});

    $("#liPatientList").click(function () {

        $("#divMissingList").hide();
    });

    $("#liVisitBook").click(function () {
        param = ["visitbook", _LocationId, "0"];
        GetDataFromDatabase(27, "PrintVistiBook", param, "DentalParams");
        $("#divMissingList").show();
        // $("#ancVisitBook").click();

    });

    setTimeout(function () { if ($("#ddlClinicList option").length > 1) { $(".clsClinicList").show(); } }, 1000);


    $("#txtPatSearch").autocomplete({
        source: (request, response) => {

            GetAutoCompleteData({
                procid: 647,
                ParamPath: "Params",
                params: 'patientlist|' + $("#txtPatSearch").val() + '|' + $qc.cookie("locationid"),
                success: (data) => {
                    data = data.split("$");
                    response($.map(data, (item) => {
                        var val = '';
                        var lbl = '';
                        if (item == '') {
                            val = '';
                            lbl = '';
                        } else {
                            val = item.split('|')[0];
                            lbl = item.split('|')[1].split('_')[0];
                        }
                        return { label: lbl, val: val, defaultagent: lbl };
                    }));
                }
            });
        }, select: (e, i) => {
            debugger;
            $(e.target).attr('data-attr', i.item.val);
            $("#txtPatSearch").val(i.item.value);
            fn_FillGrid();
            // _globalpathistory.studid = i.item.val;
            //fn_angularrouting('./' + _rtnangroutingpath() + '/studentdetails?id=' + i.item.val);
        }, minlength: 1
    });
});
//$("#btnAddNewClinic").click(function () { $("#AddClinicModal").modal('show'); fn_ClearTextVal(); });

//$("#btnSubmitClinicRecords").click(function () { fn_UpdateClinicReords(); });

function fn_fillPatAppointments(_objApts) {
    var str = '';
    $("#spnAptCount").html(_objApts.length);

    for (var i = 0; i < _objApts.length; i++) {
        str += '<tr>';
        str += '<td class="text-center">' + (i + 1) + '</td>';
        str += '<td class="text-center">' + _objApts[i]["starttime"] + '</td>';
        str += '<td><a href="javascript:fn_opentreatcard(' + _objApts[i]["patid"] + ');">' + _objApts[i]["patname"] + '</a></td>';
        str += '<td>' + _objApts[i]["aptfor"] + '</td>';
        str += '<td>' + _objApts[i]["doctorname"] + '</td>';
        str += '<td>';
        str += '<div style="display:inline-flex">';
        if (_objApts[i]["checkin"] == "0" && _objApts[i]["missing"] == "0") { str += '<a data-aptid="' + _objApts[i]["aptid"] + '" data-patid="' + _objApts[i]["patid"] + '" data-type="Apt" onclick="javascript:addtocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;"  target="_self" title="Add to Check-In"><i class="fa fa-check"></i></a>'; }
        if (_objApts[i]["checkin"] == "0" && _objApts[i]["missing"] == "0") { str += '<a data-aptid="' + _objApts[i]["aptid"] + '" data-patid="' + _objApts[i]["patid"] + '" data-type="Apt" onclick="javascript:addtomissing(this);" class="dropdown-item actionbutton" href="javascript:undefined;"  target="_self" title="Missing"><i class="fa fa-close"></i></a>'; }
        str += '</div>';
        str += '</td>';
        str += '</tr>';
    }

    $("#tblApts").html(str);
}

function fn_fillOPDPatients(_objOPD) {
    var str = '';
    var iCount = 0;

    for (var key1 in _objOPD) {
        for (var i = 0; i < _objOPD[key1].length; i++) {
            if (_objOPD[key1][i]["aptid"] == "0") {
                str += '<tr>';
                str += '<td class="text-center">' + (i + 1) + '</td>';
                str += '<td class="text-center">' + _objOPD[key1][i]["apttime"] + '</td>';
                str += '<td><a href="javascript:fn_opentreatcard(' + _objOPD[key1][i]["patid"] + ');">' + _objOPD[key1][i]["patname"] + '</td>';
                str += '<td class="text-center">';
                str += '<div style="display:inline-flex">';
                if (key1 == 'WL') { str += '<a data-pid="' + _objOPD[key1][i]["pid"] + '" data-type="OPD" onclick="javascript:addtocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Add to Check-In"><i class="fa fa-check"></i></a>'; }
                if (key1 == 'WL') { str += '<a data-pid="' + _objOPD[key1][i]["pid"] + '" data-type="OPD" onclick="javascript:addtomissing(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Missing"><i class="fa fa-close"></i></a>'; }
                if (key1 == 'WL') { str += '<a data-pid="' + _objOPD[key1][i]["pid"] + '" data-type="OPD" onclick="javascript:addtodelete(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Delete"><i class="fa fa-trash-o"></i></a>'; }
                str += '</div>';
                str += '</td>';
                str += '</tr>';
                iCount += 1;
            }
        }
    }
    $("#tblOPD").html(str);
    $("#spnOPDCount").html(iCount);
}

function fn_fillCheckInPatients(_objCI) {
    var str = '';
    $("#spnCICount").html(_objCI.length);
    for (var i = 0; i < _objCI.length; i++) {
        str += '<tr>';
        str += '<td class="text-center">' + (i + 1) + '</td>';
        str += '<td class="text-center">' + _objCI[i]["apttime"] + '</td>';
        str += '<td><a href="javascript:fn_opentreatcard(' + _objCI[i]["patid"] + ');">' + _objCI[i]["patname"] + '</a></td>';
        str += '<td class="text-center">';
        str += '<div style="display:inline-flex">';
        str += '<a data-pid="' + _objCI[i]["pid"] + '" data-type="CI" onclick="javascript:undocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Undo checking"><i class="fa fa-undo"></i></a>';
        str += '</div>';
        str += '</td>';
        str += '</tr>';
    }
    $("#tblCI").html(str);
}

function fn_fillMIPatients(_objMI) {
    var str = '', str1 = '';
    var opd = 0, apt = 0;
    for (var i = 0; i < _objMI.length; i++) {
        if (_objMI[i]["aptid"] == "0") {
            str += '<tr>';
            str += '<td class="text-center">' + (i + 1) + '</td>';
            str += '<td class="text-center">' + _objMI[i]["apttime"] + '</td>';
            str += '<td><a href="javascript:fn_opentreatcard(' + _objMI[i]["patid"] + ');">' + _objMI[i]["patname"] + '</a></td>';
            str += '<td class="text-center">';
            str += '<div style="display:inline-flex">';
            str += '<a data-pid="' + _objMI[i]["pid"] + '" data-type="MI" onclick="javascript:addtocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Add to Check-In"><i class="fa fa-check"></i></a>';
            str += '<a data-pid="' + _objMI[i]["pid"] + '" data-type="MI" onclick="javascript:undocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Undo Missing"><i class="fa fa-undo"></i></a>';
            str += '</div>';
            str += '</td>';
            str += '</tr>';
            opd += 1;
        } else {
            str1 += '<tr>';
            str1 += '<td class="text-center">' + (i + 1) + '</td>';
            str1 += '<td class="text-center">' + _objMI[i]["apttime"] + '</td>';
            str1 += '<td>' + _objMI[i]["patname"] + '</td>';
            str1 += '<td>' + _objMI[i]["aptfor"] + '</td>';
            str1 += '<td>' + _objMI[i]["doctorname"] + '</td>';
            str1 += '<td>';
            str1 += '<div style="display:inline-flex">';
            str1 += '<a data-pid="' + _objMI[i]["pid"] + '" data-type="MI" onclick="javascript:addtocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Add to Check-In"><i class="fa fa-check"></i></a>';
            str1 += '<a data-pid="' + _objMI[i]["pid"] + '" data-type="MI" onclick="javascript:undocheckin(this);" class="dropdown-item actionbutton" href="javascript:undefined;" target="_self" title="Undo Missing"><i class="fa fa-undo"></i></a>';
            str1 += '</div>';
            str1 += '</td>';
            str1 += '</tr>';
            apt += 1;
        }
    }
    $("#tblOPDMissing").html(str);
    $("#tblAptMissing").html(str1);

    $("#spnOPDMICount").html(opd);
    $("#spnAptMissingCount").html(apt);
}

function fn_RefreshGrid() {
    //$(".btmbdr").click(function () {
    //    fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + $(this).attr('data-attr'));
    //   // var objRecords = ["GetPatientDetails", $(this).attr('data-attr'), _LocationId];
    //   // GetDataFromDatabase(22, 'getEditRecords', objRecords, 'DentalParams');
    //});

    //$(".clsGridAction").click(function () { event.stopPropagation(); });

    $("button[data-ctrl='AddNewPatient']").attr('title', ' Add New Patient');
}

function onGetDataSuccess(data, context) {
    if (context == 'FillGrid') {
        $("#spnRecordCount").html(0);
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        $("#spnRecordCount").html(_objGridResult.length);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'PID', 'Reg. date', 'Patient Name', 'Gender', 'Age', 'Address', 'Mobile', 'Email', 'Medical History', 'Action#AddNewPatient'],
            dataArr: [9],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 9, 2, 3, 4, 5, 6, 7, 8, 10],
            IsActionButton: ['View Treatment', 'Add to WL', 'Edit', 'Delete'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '50',
            SortType: [1, 1, 2, 2, 2, 2, 2, 2],
            header_align: ['', '', '', '', '', '', '', '', '', '', ''],
            chkVal: 1,
            advSearch: true,
            IsLinkButton: ["", "", "", "TreatmentCard", "", "", "", "", "", ""],
            LinkButtonColumns: [3],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));


    }
    else if (context == 'getEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlAddPatientModal").modal('show');

        $("#btnUpdatePatInfo").show();
        $("#btnGeneratePatientId").hide();
        $(".clsPatPotoUpload").show();

        $("#txtPatientFName").val(data.split('|')[1]);
        $("#txtPatientMName").val(data.split('|')[2]);
        $("#txtPatientLName").val(data.split('|')[3]);
        $("#ddlPatientGender").val(data.split('|')[4]);
        $("#txtPatientDOB").val(data.split('|')[5]);
        $("#txtPatientAge").val(data.split('|')[6]);
        $("#txtPatientPrimaryAddress").val(data.split('|')[7]);
        $("#txtPatientSecondaryAddress").val(data.split('|')[8]);
        $("#txtPatientMobileNo1").val(data.split('|')[9]);
        $("#txtPatientMobileNo2").val(data.split('|')[10]);
        $("#txtPatientEmail").val(data.split('|')[11]);
        $("#ddlPatientRefferedBy").val(data.split('|')[12]);
        $("#txtSmartCardID").val(data.split('|')[13]);
        $("#txtPatientMedicalHistory").val(data.split('|')[14]);
        $("#txtCustomID").val(data.split('|')[18]);

        $("#btnConsentForm").show();
        $("#btnCapturePhoto").show();

        _PatientRecordId = data.split('|')[0];
        if (data.split('|')[17] != '') { $(".imgPatientPhoto").attr('src', RootFolderPath("PatientPhoto/" + _LocationId + "/" + data.split('|')[17])); }
        else {
            $(".imgPatientPhoto").attr('src', 'images/photo.jpg');
        }
    }
    else if (context == 'DeleteClinicRecords') {
        //ctlDetails.DeleteArray(PatientRecordId, 1);
        fn_FillGrid();
        fn_UpdateLogoURL(_PatientRecordId, '');


        _PatientRecordId = 0;
    }
    else if (context == 'UpdateToWL') {
        $("#liVisitBook a").click();
    }
    else if (context == 'PrintVistiBook') {
        $("#tblApts").html(''); $("#tblOPD").html(''); $("#tblCI").html('');
        $("#tblOPDMissing").html(''); $("#tblAptMissing").html('');
        if (data == '') { return false; }
        eval("var objVB=" + data);
        if (typeof objVB["Appointment"] != 'undefined') {
            fn_fillPatAppointments(objVB["Appointment"]);
        }
        if (typeof objVB["AptTracking"] != 'undefined') {
            if (typeof objVB["AptTracking"] != 'undefined') { fn_fillOPDPatients(objVB["AptTracking"]); }
            for (var key in objVB["AptTracking"]) {

                if (key == 'CI') {
                    if (typeof objVB["AptTracking"]["CI"] != 'undefined') { fn_fillCheckInPatients(objVB["AptTracking"]["CI"]); }
                }
                if (key == 'MI') {
                    if (typeof objVB["AptTracking"]["MI"] != 'undefined') { fn_fillMIPatients(objVB["AptTracking"]["MI"]); }
                }
            }
        }
    }
}

function lnkPatientName_Click(_o) {
    fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + $(_o).parents('tr.btmbdr').attr('data-attr'));
}

function fn_opentreatcard(pid) {
    fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + pid);
}

function addtocheckin(_o) {
    var _objRecords;
    if ($(_o).attr('data-type') == 'Apt') {
        _objRecords = ["UpdateTrack", "0", $(_o).attr('data-aptid'), $(_o).attr('data-patid'), _LocationId, _SubLocationId, "CI", _GlobalPatHistory.CurrentDate, _UserName];
    } else if ($(_o).attr('data-type') == 'OPD') {
        _objRecords = ["UpdateTrack", $(_o).attr('data-pid'), "0", "0", _LocationId, _SubLocationId, "CI", _GlobalPatHistory.CurrentDate, _UserName];
    } else if ($(_o).attr('data-type') == 'MI') {
        _objRecords = ["UpdateTrack", $(_o).attr('data-pid'), "0", "0", _LocationId, _SubLocationId, "CI", _GlobalPatHistory.CurrentDate, _UserName];
    }
    UpdateDataToDatabase(23, 'UpdateToWL', _objRecords, "DentalParams");
}

function addtomissing(_o) {
    var _objRecords;
    if ($(_o).attr('data-type') == 'Apt') {
        _objRecords = ["UpdateTrack", "0", $(_o).attr('data-aptid'), $(_o).attr('data-patid'), _LocationId, _SubLocationId, "MI", _GlobalPatHistory.CurrentDate, _UserName];
    } else if ($(_o).attr('data-type') == 'OPD') {
        _objRecords = ["UpdateTrack", $(_o).attr('data-pid'), "0", "0", _LocationId, _SubLocationId, "MI", _GlobalPatHistory.CurrentDate, _UserName];
    }
    UpdateDataToDatabase(23, 'UpdateToWL', _objRecords, "DentalParams");
}

function addtodelete(_o) {
    var _objRecords;
    if ($(_o).attr('data-type') == 'OPD') {
        _objRecords = ["UpdateTrack", $(_o).attr('data-pid'), "0", "0", _LocationId, _SubLocationId, "DEL", _GlobalPatHistory.CurrentDate, _UserName];
    }
    UpdateDataToDatabase(23, 'UpdateToWL', _objRecords, "DentalParams");
}

function PrintTodaysApt() {

    var _html = '<table style="Width:100%;border-top:1px solid #ccc;border-left:1px solid #ccc;"><tr><td colSpan="5" style="border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;padding:5px;text-align: center;font-weight: 600;padding: 10px;">Todays Appintment (Count: ' + ($("#tbltodaysApt tr").length - 1) + ')</td></tr>';
    $("#tbltodaysApt tr").each(function () {
        _html += '<tr>';
        for (var i = 0; i < $(this).children().length - 1; i++) {
            _html += '<td style="border-bottom: 1px solid #ccc;border-right: 1px solid #ccc;padding:5px;">' + $($(this).children()[i]).html() + '</td>';
        }

        _html += '</tr>';

    });
    _html += '</table>';
    var _print = '';
    // _print += '<link rel="stylesheet" type="text/css" href="https://doctor.oramo.in/CSS/admin.min.css" />';
    // _print += '<style type="text/css">.TreatmentCardPrint .list-group {position: sticky;top: 75px;}.TreatmentCardPrint .list-group-item {padding: 0;}.TreatmentCardPrint .list-group-item .checkbox {padding: 6px 10px;display: block;}@media print {.TreatmentCardPrint {padding: 0;}.TreatmentCardPrint .row {padding: 0;margin: 0;}.TreatmentCardPrint [class*=col] {padding: 0;}.TreatmentCardPrint .right {display: none;}}</style>';
    _print += '<style type="text/css"></style > ';

    var myWindow = window.open('', 'FeeReceipt');
    myWindow.document.write('<html><head><title>Fee Receipt</title>');
    myWindow.document.write(_print);
    myWindow.document.write('<style type="text/css" media="print">@page { size:portrait; }</style>');
    myWindow.document.write('</head><body>');
    myWindow.document.write('<div class="PrintReceipts">' + _html + '</div>');
    myWindow.document.write('</body></html>');
    //myWindow.onload = function () {
    //    myWindow.focus();
    //    myWindow.print();
    //    myWindow.close();
    //};
    myWindow.print();
    // myWindow.close();
}

function undocheckin(_o) {
    var _objRecords;
    // if ($(_o).attr('data-type') == 'CI') {
    _objRecords = ["UndoCheckIn", $(_o).attr('data-pid'), "0", "0", _LocationId, _SubLocationId, "DEL", _GlobalPatHistory.CurrentDate, _UserName];
    // }
    UpdateDataToDatabase(23, 'UpdateToWL', _objRecords, "DentalParams");
}

function btnCustomAction_Click(_oBtn) {
    if ($(_oBtn).text() == 'View Treatment') {
        fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + $(_oBtn).attr('data-id'));
    } else if ($(_oBtn).text() == 'Add to WL') {
        $("#divMissingList").show();
        var _objRecords = ["UpdateTrack", "0", "0", $(_oBtn).attr('data-id'), _LocationId, _SubLocationId, "WL", _GlobalPatHistory.CurrentDate, _UserName];
        UpdateDataToDatabase(23, 'UpdateToWL', _objRecords, "DentalParams");
    }

}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'AddNewPatient') {
        fn_ClearPatientModal();
        $("#mdlAddPatientModal").modal('show');
    }
}

function fn_FillGrid() {
    var lid = ($("#ddlClinicList").val() == null || $("#ddlClinicList").val() == 0 ? _LocationId : $("#ddlClinicList").val());
    var patid = (typeof $("#txtPatSearch").attr('data-attr') == 'undefined' ? '' : $("#txtPatSearch").attr('data-attr'));

    if ($("#txtPatSearch").val() == '') { $("#txtPatSearch").removeAttr('data-attr'); patid = ''; }

    var objRecords = ["ListOfPatients", $("#txtPatSearch").val(), lid];
    GetDataFromDatabase(22, 'FillGrid', objRecords, 'DentalParams');
}

function fn_FillGridByPatientID(PatientId) {
    var lid = ($("#ddlClinicList").val() == null || $("#ddlClinicList").val() == 0 ? _LocationId : $("#ddlClinicList").val());
    var objRecords = ["SearchByPatientId", PatientId, lid];
    GetDataFromDatabase(22, 'FillGrid', objRecords, 'DentalParams');
}

function btnEditAction_Click(_oBtn) {
    //PatientRecordId = $(_oBtn).parents('.btmbdr').attr('data-attr');
    _PatientRecordId = $(_oBtn).attr('data-id');
    var objRecords = ["GetPatientDetails", _PatientRecordId, _LocationId];
    GetDataFromDatabase(22, 'getEditRecords', objRecords, 'DentalParams');
}

function btnDeleteAction_Click(_oBtn) {
    _PatientRecordId = $(_oBtn).attr('data-id');
    var _objRecords = ["DeletePatientRecord", _PatientRecordId, _LocationId, ""];
    UpdateDataToDatabase(1, 'DeleteClinicRecords', _objRecords, 'DentalParams');
}

function onImageUploadSuccess(data, context) {
    if (context == 'PatientPhoto') {
        if (data == 0) {
            alert('Photo upload error.');
            return false;
        }

        //$("#imgPatientPhoto").attr('src', RootFolderPath("PatientPhoto/" + _LocationId + "/" + _PatientPhoto));
        // fn_ClearTextVal();
    }
}

function onFileDeleteSuccess(data, context) {
    if (context == 'DeleteClinicLogo') {

    }
}