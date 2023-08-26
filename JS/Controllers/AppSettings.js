var _TabName = 'AdvanceSetting';
var _SMSID = 0, _WAID = 0;
var _LocationId = $qc.Cookie("locationid");

$(document).ready(function () {
    //_TabName = 'AdvanceSetting';
    // GetDataFromDatabase(13, "GetAdvanceTab", ["UpdateSQL", "select LocationId [0],BiomatricsServices [1],WebcamServices [2],CustomePID [3],SmartCard [4],SmartCardDiscount [5] from AdvanceSettings where LocationId=" + $qc.Cookie("locationid")], "DentalParams");


    _TabName = 'SMSTab';
    fn_FillSMSGrid();

    FillDropDown_JS(true, 'SMSTemplate', 'ddlSMSTemplate', 0, _LocationId, 0, 1, 0, "--Select Template--", false, [], 'Params', null);
    FillDropDown_JS(true, 'WATemplate', 'ddlWATemplate', 0, _LocationId, 0, 1, 0, "--Select Template--", false, [], 'Params', null);

    $("#ddlSMSSendingType").change(function () { if (this.value == 'Instant') { $(".clsMsgTime").hide(); } else { $(".clsMsgTime").show(); } });
    $("#ddlWASendingType").change(function () { if (this.value == 'Instant') { $(".clsWATime").hide(); } else { $(".clsWATime").show(); } });

    $("#ddlWATemplate").change(function () {
        GetDataFromDatabase(13, "GetWATempalte", ["UpdateSQL", "select MessageTemplate [0] from WhatsAppTemplate where WID=" + this.value], "DentalParams");

    });

    $("#ddlSMSTemplate").change(function () {
        GetDataFromDatabase(13, "GetMessageTempalte", ["UpdateSQL", "select MessageTemplate [0] from messageTemplate where SMSID=" + this.value], "DentalParams");

    });

    //$("#liAdvanceTab").click(function () {
    //    _TabName = 'AdvanceSetting';
    //    GetDataFromDatabase(13, "GetAdvanceTab", ["UpdateSQL", "select LocationId [0],BiomatricsServices [1],WebcamServices [2],CustomePID [3],SmartCard [4],SmartCardDiscount [5] from AdvanceSettings where LocationId=" + $qc.Cookie("locationid")], "DentalParams");
    //});
    //$("#liPrintTab").click(function () {
    //    _TabName = 'PrintTab';
    //    GetDataFromDatabase(13, "GetPrintTab", ["UpdateSQL", "select LocationId [0],ShowHeader [1],ShowHeaderSpace [2],OnlyPrescription [3],MedicalHistory [4],TreatmentName [5],ToothNumber [6],WorkDone [7],Prescription [8],Payment [9] from PrintSettings where LocationId=" + $qc.Cookie("locationid")], "DentalParams");
    //});
    $("#liSMSTab").click(function () {
        _TabName = 'SMSTab';
        fn_FillSMSGrid();
    });

    $("#liWATab").click(function () {
        _TabName = 'WATab';
        fn_FillWAGrid();
    });

    $("#cksBiomatricsServices").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from AdvanceSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update AdvanceSettings set BiomatricsServices = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into AdvanceSettings(LocationId, BiomatricsServices, WebcamServices, CustomePID, SmartCard, SmartCardDiscount)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`' + _ischeckd + '`,`N`,`N`,`N`,``)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkWebcamServices").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from AdvanceSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update AdvanceSettings set WebcamServices = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into AdvanceSettings(LocationId, BiomatricsServices, WebcamServices, CustomePID, SmartCard, SmartCardDiscount)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`' + _ischeckd + '`,`N`,`N`,``)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkCustomPId").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from AdvanceSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update AdvanceSettings set CustomePID = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into AdvanceSettings(LocationId, BiomatricsServices, WebcamServices, CustomePID, SmartCard, SmartCardDiscount)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`' + _ischeckd + '`,`N`,``)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkSmartCard").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from AdvanceSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update AdvanceSettings set SmartCard = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into AdvanceSettings(LocationId, BiomatricsServices, WebcamServices, CustomePID, SmartCard, SmartCardDiscount)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`' + _ischeckd + '`,``)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#txtSmartCardDiscount").change(function () {
        var _ischeckd = $(this).val();

        var strSQL = '';
        strSQL += ' if exists(select 1 from AdvanceSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update AdvanceSettings set SmartCardDiscount = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into AdvanceSettings(LocationId, BiomatricsServices, WebcamServices, CustomePID, SmartCard, SmartCardDiscount)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`' + _ischeckd + '`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    /*Print Tab*/
    $("#chkShowHeader").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set ShowHeader = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`' + _ischeckd + '`,`N`,`N`,`N`,`N`,`N`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkShowHeaderSpan").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set ShowHeaderSpace = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`' + _ischeckd + '`,`N`,`N`,`N`,`N`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkOnlyPrescription").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set OnlyPrescription = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`' + _ischeckd + '`,`N`,`N`,`N`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkMedicalHistory").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set MedicalHistory = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`' + _ischeckd + '`,`N`,`N`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkTreatmentName").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set TreatmentName = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`' + _ischeckd + '`,`N`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkTooNumber").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set ToothNumber = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`N`,`' + _ischeckd + '`,`N`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkWorkDone").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set WorkDone = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`N`,`N`,`' + _ischeckd + '`,`N`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkPrescription").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set Prescription = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`N`,`N`,`N`,`' + _ischeckd + '`,`N`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

    $("#chkPayment").click(function () {
        var _ischeckd = ($(this).prop("checked") == true ? 'Y' : 'N');

        var strSQL = '';
        strSQL += ' if exists(select 1 from PrintSettings where LocationId = ' + $qc.Cookie("locationid") + ')';
        strSQL += ' begin';
        strSQL += '     update PrintSettings set Payment = `' + _ischeckd + '` where LocationId = ' + $qc.Cookie("locationid");
        strSQL += ' end';
        strSQL += ' else';
        strSQL += ' begin';
        strSQL += '     insert into PrintSettings(LocationId,ShowHeader,ShowHeaderSpace,OnlyPrescription,MedicalHistory,TreatmentName,ToothNumber,WorkDone,Prescription,Payment)';
        strSQL += '     values(' + $qc.Cookie("locationid") + ',`N`,`N`,`N`,`N`,`N`,`N`,`N`,`N`,`' + _ischeckd + '`)';
        strSQL += ' end';

        UpdateDataToDatabase(13, "UpdateBiomatrics", ["UpdateSQL", strSQL], "DentalParams");

    });

});

function onGetDataSuccess(data, context) {
    if (context == 'GetAdvanceTab') {
        if (data == '') { return false; }
        $("#cksBiomatricsServices").prop('checked', (data.split('|')[1].trim() == 'Y' ? true : false));
        $("#chkWebcamServices").prop('checked', (data.split('|')[2].trim() == 'Y' ? true : false));
        $("#chkCustomPId").prop('checked', (data.split('|')[3].trim() == 'Y' ? true : false));
        $("#chkSmartCard").prop('checked', (data.split('|')[4].trim() == 'Y' ? true : false));
        $("#txtSmartCardDiscount").val(data.split('|')[5]);
    }
    else if (context == 'GetPrintTab') {
        if (data == '') { return false; }
        $("#chkShowHeader").prop('checked', (data.split('|')[1].trim() == 'Y' ? true : false));
        $("#chkShowHeaderSpan").prop('checked', (data.split('|')[2].trim() == 'Y' ? true : false));
        $("#chkOnlyPrescription").prop('checked', (data.split('|')[3].trim() == 'Y' ? true : false));
        $("#chkMedicalHistory").prop('checked', (data.split('|')[4].trim() == 'Y' ? true : false));
        $("#chkTreatmentName").prop('checked', (data.split('|')[5].trim() == 'Y' ? true : false));
        $("#chkTooNumber").prop('checked', (data.split('|')[6].trim() == 'Y' ? true : false));
        $("#chkWorkDone").prop('checked', (data.split('|')[7].trim() == 'Y' ? true : false));
        $("#chkPrescription").prop('checked', (data.split('|')[8].trim() == 'Y' ? true : false));
        $("#chkPayment").prop('checked', (data.split('|')[9].trim() == 'Y' ? true : false));
    }
    else if (context == 'FillSMSGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Ref.ID', 'Template Name', 'Triger', 'Language', 'Mode', 'Status', 'Action#AddNewSMSRecord'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5, 6],
            IsActionButton: ['Edit', 'Delete'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '50',
            SortType: [1, 1, 2, 2, 2, 2, 2, 2],
            header_align: ['', '', '', '', '', ''],
            chkVal: 1,
            advSearch: true,
            IsLinkButton: null,
            LinkButtonColumns: [0],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'UpdateSMSGrid') {
        if ($("#ddlSMSSendingType").val() != 'Instant') { fn_UpdateReminderTimeing(); }
         fn_ClearSMSRecords(); fn_FillSMSGrid();
    }
    else if (context == 'DelSMSTemplate') {
        fn_ClearSMSRecords(); fn_FillSMSGrid();
    }
    else if (context == 'getSMSTemplate') {
        if (data == '') { return false; }
        $("#ddlSMSTemplate").val(data.split('|')[1]);
        $("#ddlSMSSendingType").val(data.split('|')[2]);
        $("#ddlLanguage").val(data.split('|')[3]);
        $("#ddlSMSMode").val(data.split('|')[4]);
        $("#ddlSMSStatus").val(data.split('|')[5]);
        $("#messagetime").val(data.split('|')[7]);
        if (data.split('|')[1] != '') {
            GetDataFromDatabase(13, "GetMessageTempalte", ["UpdateSQL", "select MessageTemplate [0] from messageTemplate where SMSID=" + data.split('|')[1]], "DentalParams");
        }

        if ($("#ddlSMSSendingType").val() == 'Instant') { $(".clsMsgTime").hide(); } else { $(".clsMsgTime").show(); }

        $("#SMSServicesModal").modal('show');
    }
    else if (context == 'GetMessageTempalte') {
        if (data == '') { return false; }
        $("#txtSMSText").val(data);
    }

    if (context == 'GetWATempalte') {
        if (data == '') { return false; }
        $("#txtWAText").val(data);
    }
    else if (context == 'DelWATemplate') {
        fn_ClearWARecords(); fn_FillWAGrid();
    }
    else if (context == 'UpdateWAGrid') {
        if ($("#ddlWASendingType").val() != 'Instant') { fn_UpdateReminderTimeing(); }
        fn_ClearWARecords(); fn_FillWAGrid();
    }
    else if (context == 'getWATemplate') {
        if (data == '') { return false; }
        $("#ddlWATemplate").val(data.split('|')[1]);
        $("#ddlWASendingType").val(data.split('|')[2]);
        /*$("#ddlLanguage").val(data.split('|')[3]);*/
        // $("#ddlWAMode").val(data.split('|')[4]);
        $("#ddlWAStatus").val(data.split('|')[5]);
        //$("#txtSMSText").val(data.split('|')[6]);
        $("#watime").val(data.split('|')[7]);
        if ($("#ddlWASendingType").val() == 'Instant') { $(".clsWATime").hide(); } else { $(".clsWATime").show(); }


        if (data.split('|')[1] != '') {
            GetDataFromDatabase(13, "GetWATempalte", ["UpdateSQL", "select MessageTemplate [0] from WhatsAppTemplate where WID=" + data.split('|')[1]], "DentalParams");
        }

        $("#WAServicesModal").modal('show');
    }
    else if (context == 'FillWAGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'Ref.ID', 'Template Name', 'Triger', 'Status', 'Action#AddNewWARecord'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5, 6],
            IsActionButton: ['Edit', 'Delete'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '50',
            SortType: [1, 1, 2, 2, 2, 2, 2, 2],
            header_align: ['', '', '', '', '', ''],
            chkVal: 1,
            advSearch: true,
            IsLinkButton: null,
            LinkButtonColumns: [0],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }

    else if (context == 'UpdateReminderTime') {
        WriteFile("Remindertime", "time", "txt", data, "UpdateRemTime");
    }
}

function btnEditAction_Click(_oBtn) {
    if (_TabName == 'SMSTab') {
        _SMSID = $(_oBtn).attr('data-id');
        var _objParams = ["getSMSTemplate", _LocationId, _SMSID];
        GetDataFromDatabase(50, 'getSMSTemplate', _objParams, 'DentalParams');

    }
    else if (_TabName == 'WATab') {
        _WAID = $(_oBtn).attr('data-id');
        var _objParams = ["getWATemplate", _LocationId, _WAID];
        GetDataFromDatabase(50, 'getWATemplate', _objParams, 'DentalParams');

    }

}

function btnDeleteAction_Click(_oBtn) {
    if (_TabName == 'SMSTab') {
        _SMSID = $(_oBtn).attr('data-id');
        var _objRecords = ["DeleteSMSTemplates", _SMSID, _LocationId, ""];
        UpdateDataToDatabase(1, 'DelSMSTemplate', _objRecords, 'DentalParams');
    }

    else if (_TabName == 'WATab') {
        _WAID = $(_oBtn).attr('data-id');
        var _objRecords = ["DeleteWATemplates", _WAID, _LocationId, ""];
        UpdateDataToDatabase(1, 'DelWATemplate', _objRecords, 'DentalParams');
    }

}

function fn_InsertSMSTemplate() {
    var _objParams = [_SMSID
        , $("#ddlSMSTemplate").val()
        , $("#ddlSMSSendingType").val()
        , $("#ddlLanguage").val()
        , $("#ddlSMSMode").val()
        , $("#ddlSMSStatus").val()
        //, $("#txtSMSText").val()
        , $qc.Cookie("locationid")
        , $("#messagetime").val()
    ];
    UpdateDataToDatabase(49, "UpdateSMSGrid", _objParams, "DentalParams");
}

function fn_UpdateReminderTimeing() {
    var _objParams = ["UpdateRemTime"
        , ""
        ,0
        , ""
        , ""
        , ""
    ];
    GetDataFromDatabase(1, "UpdateReminderTime", _objParams, "CommunicationParams");
}

function fn_InsertWATemplate() {
    var _objParams = [_WAID
        , $("#ddlWATemplate").val()
        , $("#ddlWASendingType").val()
        , ''
        , $("#ddlWAMode").val()
        , $("#ddlWAStatus").val()
        //, $("#txtWAText").val()

        , $qc.Cookie("locationid")
        , $("#watime").val()
    ];
    UpdateDataToDatabase(68, "UpdateWAGrid", _objParams, "DentalParams");
}

function fn_FillSMSGrid() {
    var _objParams = ["FillGridSMSTemplate", $qc.Cookie("locationid"), _SMSID];
    GetDataFromDatabase(50, "FillSMSGrid", _objParams, "DentalParams");
}

function fn_FillWAGrid() {
    var _objParams = ["FillGridWATemplate", $qc.Cookie("locationid"), _SMSID];
    GetDataFromDatabase(50, "FillWAGrid", _objParams, "DentalParams");
}

function fn_ClearSMSRecords() {
    $("#ddlSMSTemplate").val('');
    $("#ddlSMSSendingType").val('Instant');
    $("#ddlLanguage").val('EN');
    $("#ddlSMSMode").val('Auto');
    $("#ddlSMSStatus").val(1);
    //$("#txtSMSText").val('');
    _SMSID = 0;
    $("#SMSServicesModal").modal('hide');
    $(".clsMsgTime").hide();
}

function fn_ClearWARecords() {
    $("#ddlWATemplate").val('');
    $("#ddlWASendingType").val('Instant');
    // $("#ddlLanguage").val('EN');
    // $("#ddlSMSMode").val('Auto');
    $("#ddlWAStatus").val(1);
    $("#txtWAText").val('');
    _WAID = 0;
    $("#WAServicesModal").modal('hide');
    $(".clsWATime").hide();
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'AddNewSMSRecord') {
        fn_ClearSMSRecords();
        $("#SMSServicesModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewWARecord') {
        fn_ClearWARecords();
        $("#WAServicesModal").modal('show');
    }

}