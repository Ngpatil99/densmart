var _DoctorRecordId = 0, _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid"), _ActiveTabName = 'DoctorTab';
var _RefDoctorRecordId = 0, _TreatmentRecordId = 0, _MedicineRecordId = 0, _PayModeRecordId = 0, _InstructionRecordId = 0, _RelationRecordId = 0, _TemplateRecordId = 0;
var _LabRecordId = 0, _DealerRecordId = 0;

$(document).ready(function () {
    fn_FillGrid();

    if ($qc.Cookie('usercategory') == 'clinic') {
        $(".clsAdminView").show();
    } else {
        $(".clsAdminView").hide();
    }

    $("#TabDoctorMaster").click(function () { _ActiveTabName = 'DoctorTab'; fn_FillGrid(); });
    $("#TabRefDoctorMaster").click(function () { _ActiveTabName = 'RefDoctorTab'; fn_FillGrid(); });
    $("#TabDoctorIncentive").click(function () { _ActiveTabName = 'IncentiveTab'; FillDropDown_JS(true, 'Doctorlist', 'ddlDoctorList_Inc', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null); fn_FillGrid(); });
    $("#TabTreatments").click(function () { _ActiveTabName = 'TreatmentTab'; fn_FillGrid(); });
    $("#TabMedicines").click(function () { _ActiveTabName = 'MedicineTab'; fn_FillGrid(); });
    $("#TabPayMode").click(function () { _ActiveTabName = 'PayMode'; fn_FillGrid(); });
    $("#TabInstructions").click(function () { _ActiveTabName = 'InstructionTab'; fn_FillGrid(); });
    $("#TabLabs").click(function () { _ActiveTabName = 'LabsTab'; fn_FillGrid(); });
    $("#TabDealers").click(function () { _ActiveTabName = 'DealersTab'; fn_FillGrid(); });
    $("#TabRelations").click(function () { _ActiveTabName = 'RelationsTab'; fn_FillGrid(); });
    $("#TabTemplates").click(function () { _ActiveTabName = 'TemplatesTab'; fn_FillGrid(); });
    $("#TabDefaults").click(function () { _ActiveTabName = 'DefaultsTab'; });

    $('#divTemplateForm').summernote({
        height: 250,
        toolbar: [
            ['style', ['style']],
            ['font', ['bold', 'underline', 'clear', 'strikethrough', 'superscript', 'subscript']],
            ['fontsize', ['fontsize']],
            ['color', ['color']],
            ['para', ['ul', 'ol', 'paragraph']],
            ['table', ['table']],
            ['insert', ['link', 'picture']], , //'video'
            ['view', ['codeview', 'fullscreen', 'help']] //'fullscreen',
        ]
    });
   
    $("#btnSubmitRefferedBy").click(function () {
        if (rtnCtrlVal("txtReferredBy_DoctorName", "") == '' || rtnCtrlVal("txtReferredBy_MobileNo", "") == '') { alert('Fill all mandatory filds'); return false; }
        fn_InsertUpdateRefDoctorRecord();
    });
   
    $("#btnSubmitRelationType").click(function () {
        if (rtnCtrlVal("txtRelationType", "") == '') { alert('Fill all mandatory filds'); return false; }
        fn_InsertUpdateRelationRecord();
    });

    $("#ancAddNewDoctor").click(function () {
        fn_ClearDoctorModal();
        $("#mdlDoctorsModal").modal('show');
    });
    $("#ancAddNewRefDoctor").click(function () {
        fn_ClearRefDoctorModal();
        $("#mdlRefDoctorsModal").modal('show');
    });

    $("#btnSubmitConsentForm").click(function () {

        WriteFile("HTMLForms/" + _LocationId, _TemplateRecordId, "html", $("#divTemplateForm").summernote("code"), "Success");
    });
    
    $("input[type='radio'][name='FilterDorctor']").click(function () { fn_FillGrid(); });
    $("input[type='radio'][name='rdoLabname']").click(function () { fn_FillGrid(); });
    $("input[type='radio'][name='rdoDealerName']").click(function () { fn_FillGrid(); });
    $("#ddlDoctorList_Inc").change(function () { fn_FillGrid(); });

    $("#ddlTemplateType").change(function () {
        var objRecords = ["ListOfTemplate", 0, _LocationId, _SubLocationId,this.value];
        GetDataFromDatabase(59, 'FillGrid_TemplatesTab', objRecords, 'DentalParams'); });
    
});

function fn_FillGrid() {
    if (_ActiveTabName == 'DoctorTab') {
        var userstatus = ($("#rdoActiveDoctors").prop('checked') == true ? 'Active' : '');
        var objRecords = ["ListOfDoctors", 0, _LocationId, _SubLocationId, userstatus];
        GetDataFromDatabase(5, 'FillGrid_DoctorTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'LabsTab') {
        var userstatus = ($("#rdoLabActive").prop('checked') == true ? 'Active' : '');
        var objRecords = ["ListOfLabs", 0, _LocationId, _SubLocationId, userstatus];
        GetDataFromDatabase(21, 'FillGrid_LabTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'DealersTab') {
        var userstatus = ($("#rdoLabActive").prop('checked') == true ? 'Active' : '');
        var objRecords = ["ListOfDealers", 0, _LocationId, _SubLocationId, userstatus];
        GetDataFromDatabase(4, 'FillGrid_DealerTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'RefDoctorTab') {
        var objRecords = ["ListOfRefDoctors", 0, _LocationId, _SubLocationId, ''];
        GetDataFromDatabase(5, 'FillGrid_RefDoctorTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'TreatmentTab') {
        var objRecords = ["ListOfTreatment", 0, _LocationId];
        GetDataFromDatabase(17, 'FillGrid_TreatmentTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'IncentiveTab') {
        var _docotrid = ($("#ddlDoctorList_Inc").val() == null || $("#ddlDoctorList_Inc").val() == 0 ? 0 : $("#ddlDoctorList_Inc").val());
        if (_docotrid == 0) { $("#tblTreatmentChart").html(''); return false; }
        var objRecords = ["GetTreatmentDetails", 0, _docotrid, _LocationId, _SubLocationId, 0, 0];
        GetDataFromDatabase(18, 'FillGrid_IncentiveTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'MedicineTab') {
        var objRecords = ["ListOfMedicine", 0, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'FillGrid_MedicineTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'PayMode') {
        var objRecords = ["ListOfPayMode", 0, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'FillGrid_PayModeTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'InstructionTab') {
        var objRecords = ["ListOfInstruction", 0, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'FillGrid_InstructionTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'RelationsTab') {
        var objRecords = ["ListOfRelationType", 0, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'FillGrid_RelationsTab', objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'TemplatesTab') {
        var objRecords = ["ListOfTemplate", 0, _LocationId, _SubLocationId,"Consent Form"];
        GetDataFromDatabase(59, 'FillGrid_TemplatesTab', objRecords, 'DentalParams');
    }
}

function fn_InsertUpdateDoctorRecord() {
    if (rtnCtrlVal("txtDoctorName", "") == '' || rtnCtrlVal("txtDoctorMobileNo", "") == '') { alert('Fill all mandatory filds'); return false; }

    
    var _objRecords = ["InsertUpdate"
        , _DoctorRecordId
        , rtnCtrlVal("txtDoctorName", "")
        , rtnCtrlVal("txtDoctorMobileNo", "")
        , ""
        , rtnCtrlVal("ddlDoctorStatus", "")
        , rtnCtrlVal("ddlDoctorIsDefault", "")
        , _LocationId
        , _SubLocationId
        , ""
        , ""
        , rtnCtrlVal("ddlDoctorColor", "")
        , rtnCtrlVal("ddlDoctorIsOwner", "")
        , rtnCtrlVal("txtDoctorComm", "0")
        

    ];

    UpdateDataToDatabase(9, 'UpdateDoctorRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateLabRecord() {
    if (rtnCtrlVal("txtLabName", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdate"
        , _LabRecordId
        , rtnCtrlVal("txtLabName", "")
        , rtnCtrlVal("txtLabMobile", "")
        , ""
        , rtnCtrlVal("ddlLabStatus", "")
        , rtnCtrlVal("ddlLabIsDefault", "")
        , _LocationId
        , _SubLocationId
        , ""
        , ""
    ];

    UpdateDataToDatabase(10, 'UpdateLabRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateDealerRecord() {
    if (rtnCtrlVal("txtDealerName", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdate"
        , _DealerRecordId
        , rtnCtrlVal("txtDealerName", "")
        , rtnCtrlVal("txtDealerMobileNo", "")
        , ""
        , rtnCtrlVal("ddlDealerStatus", "")
        , rtnCtrlVal("ddlDealerIsDefault", "")
        , _LocationId
        , _SubLocationId

    ];

    UpdateDataToDatabase(8, 'UpdateDealerRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateRefDoctorRecord() {
    if (rtnCtrlVal("txtReferredBy_DoctorName", "") == '' || rtnCtrlVal("txtReferredBy_MobileNo", "") == '') { alert('Fill all mandatory filds'); return false; }

    var _objRecords = ["InsertUpdate"
        , _RefDoctorRecordId
        , rtnCtrlVal("txtReferredBy_DoctorName", "")
        , rtnCtrlVal("txtReferredBy_MobileNo", "")
        , ""
        , rtnCtrlVal("txtReferredBy_Incentive", "")
        , _LocationId
        , _SubLocationId
        , ""

    ];

    UpdateDataToDatabase(15, 'UpdateRefDoctorRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateTreatmentRecord() {
    if (rtnCtrlVal("txtTreatmentName", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdate"
        , _TreatmentRecordId
        , rtnCtrlVal("txtTreatmentName", "")
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(16, 'UpdateTreatmentRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateMedicineRecord() {
    if (rtnCtrlVal("txtMedicineName", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdateMedicine"
        , _MedicineRecordId
        , rtnCtrlVal("txtMedicineName", "")
        , ""
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(19, 'UpdateMedicineRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdatePayMode() {
    if (rtnCtrlVal("txtPayMode", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdatePayMode"
        , _PayModeRecordId
        , rtnCtrlVal("txtPayMode", "")
        , ""
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(19, 'UpdatePayModeRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateInstructionRecord() {
    if (rtnCtrlVal("txtInstructionName", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdateInstruction"
        , _InstructionRecordId
        , rtnCtrlVal("txtInstructionName", "")
        , ""
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(19, 'UpdateInstructionRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateRelationRecord() {
    var _objRecords = ["InsertUpdateRelationType"
        , _InstructionRecordId
        , rtnCtrlVal("txtRelationType", "")
        , ""
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(19, 'UpdateRelationRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdateTemplateRecord() {
    if (rtnCtrlVal("txtTemplateName", "") == '' || rtnCtrlVal("ddlTemplateType", "") == '') { alert('Fill all mandatory filds'); return false; }
    var _objRecords = ["InsertUpdateTemplate"
        , _TemplateRecordId
        , rtnCtrlVal("txtTemplateName", "")
        , rtnCtrlVal("ddlTemplateType", "")
        , _LocationId
        , _SubLocationId
    ];

    UpdateDataToDatabase(19, 'UpdateTemplateRecords', _objRecords, 'DentalParams');
}

function fn_UpdateTreatIncentive(_o) {
    var _docotrid = ($("#ddlDoctorList_Inc").val() == null || $("#ddlDoctorList_Inc").val() == 0 ? 0 : $("#ddlDoctorList_Inc").val());
    if (_docotrid == 0) { return false; }
    var objRecords = ["UpdateTreatmentIncentive", $(_o).attr('data-id'), _docotrid, _LocationId, _SubLocationId, $(_o).val(), 0];
    UpdateDataToDatabase(18, 'UpdateIncentiveTab', objRecords, 'DentalParams');
}

function fn_ClearDoctorModal() {
    $("#txtDoctorName").val("");
    $("#txtDoctorMobileNo").val("");
    $("#ddlDoctorStatus").val("");
    $("#ddlDoctorIsDefault").val("No");
    $("#ddlDoctorIsOwner").val("No");
    
    $("#ddlDoctorColor").val("");
    _DoctorRecordId = 0;
}

function fn_ClearLabModal() {
    $("#txtLabName").val("");
    $("#txtLabMobile").val("");
    $("#ddlLabStatus").val("");
    $("#ddlLabIsDefault").val("");
    _LabRecordId = 0;
}

function fn_ClearDealerModal() {
    $("#txtDealerName").val("");
    $("#txtDealerMobileNo").val("");
    $("#ddlDealerStatus").val("");
    $("#ddlDealerIsDefault").val("");
    _DealerRecordId = 0;
}

function fn_ClearRefDoctorModal() {
    $("#txtReferredBy_DoctorName").val("");
    $("#txtReferredBy_MobileNo").val("");
    $("#txtReferredBy_Incentive").val("");
    _RefDoctorRecordId = 0;
}

function fn_ClearTreatmentModal() {
    $("#txtTreatmentName").val("");
    _TreatmentRecordId = 0;
}

function fn_ClearTemplateModal() {
    $("#txtTemplateName").val("");
    _TemplateRecordId = 0;
}

function fn_ClearMedicineModal() {
    $("#txtMedicineName").val("");
    _MedicineRecordId = 0;
}

function fn_ClearPayModeModal() {
    $("#txtPayMode").val("");
    _PayModeRecordId = 0;
}

function fn_ClearInstructionModal() {
    $("#txtInstructionName").val("");
    _InstructionRecordId = 0;
}

function fn_ClearRelationModal() {
    $("#txtRelationType").val("");
    _RelationRecordId = 0;
}

function onGetDataSuccess(data, context) {
    /*Doctor Tab*/
    if (context == 'UpdateDoctorRecords') {
        if (data == '-1') { alert('Duplicate record found'); return false; }
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtDoctorName", "") + '|' + rtnCtrlVal("txtDoctorMobileNo", "") + '|' + rtnCtrlVal("ddlDoctorStatus", "") + '|' + rtnCtrlVal("ddlDoctorIsDefault", "") + '|' + rtnCtrlVal("ddlDoctorColor", "") + '|' + rtnCtrlVal("ddlDoctorIsOwner", "No");
        if (_DoctorRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }


        _DoctorRecordId = data;

        /*Upload File End */

        $("#mdlDoctorsModal").modal('hide');
    }
    else if (context == 'FillGrid_DoctorTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo',  'Doctor Name', 'Mobile', 'Status', 'IsDefault', 'Color', 'Action#ancAddNewDoctor'],
            dataArr: [],
            width: [25, 0, 0, 0, 0, 20, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6, 7, 8, 9],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getDoctorEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlDoctorsModal").modal('show');

        $("#txtDoctorName").val(data.split('|')[1]);
        $("#txtDoctorMobileNo").val(data.split('|')[2]);
        $("#ddlDoctorStatus").val(data.split('|')[4]);
        $("#ddlDoctorIsDefault").val(data.split('|')[5]);
        $("#ddlDoctorColor").val(data.split('|')[10]);
        $("#ddlDoctorIsOwner").val(data.split('|')[11]);
        $("#txtDoctorComm").val(data.split('|')[12]);
        
        _DoctorRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteDcotorRecords') {
        ctlDetails.DeleteArray(_DoctorRecordId, 1);
        _DoctorRecordId = 0;
    }

    /*Lab info Tab*/
    if (context == 'UpdateLabRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtLabName", "") + '|' + rtnCtrlVal("txtLabMobile", "") + '|' + rtnCtrlVal("ddlLabStatus", "") + '|' + rtnCtrlVal("ddlLabIsDefault", "") ;
        if (_LabRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }

        _LabRecordId = data;
        $("#mdlLabsModal").modal('hide');
    }
    else if (context == 'FillGrid_LabTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '7',
            header: ['SNo', 'Lab Name', 'Mobile', 'Status', 'IsDefault', 'Action#ancAddNewLab'],
            dataArr: [],
            width: [25, 0, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 4, 5],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getLabEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlLabsModal").modal('show');

        $("#txtLabName").val(data.split('|')[1]);
        $("#txtLabMobile").val(data.split('|')[2]);
        $("#ddlLabStatus").val(data.split('|')[4]);
        $("#ddlLabIsDefault").val(data.split('|')[5]);
        _LabRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteLabRecords') {
        ctlDetails.DeleteArray(_LabRecordId, 1);
        _LabRecordId = 0;
    }

    /*Dealer info Tab*/
    if (context == 'UpdateDealerRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtDealerName", "") + '|' + rtnCtrlVal("txtDealerMobileNo", "") + '|' + rtnCtrlVal("ddlDealerStatus", "") + '|' + rtnCtrlVal("ddlDealerIsDefault", "");
        if (_DealerRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }

        _DealerRecordId = data;

        $("#mdlDealersModal").modal('hide');
    }
    else if (context == 'FillGrid_DealerTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '8',
            header: ['SNo',  'Dealer Name', 'Mobile', 'Status', 'IsDefault', 'Action#ancAddNewDealer'],
            dataArr: [],
            width: [25, 0, 0, 0, 0, 20, 20],
            headerval: [1, 1, 2, 3, 4, 5],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getDealerEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlDealersModal").modal('show');
        _DealerRecordId = data.split('|')[0];

        $("#txtDealerName").val(data.split('|')[1]);
        $("#txtDealerMobileNo").val(data.split('|')[2]);
        $("#ddlDealerStatus").val(data.split('|')[4]);
        $("#ddlDealerIsDefault").val(data.split('|')[5]);

       
    }
    else if (context == 'DeleteDealerRecords') {
        ctlDetails.DeleteArray(_DealerRecordId, 1);
        _DealerRecordId = 0;
    }


    /*Ref Doctor Tab*/
    if (context == 'UpdateRefDoctorRecords') {
        if (data == '-1') { alert('Duplicate record found'); return false; }
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtReferredBy_DoctorName", "") + '|' + rtnCtrlVal("txtReferredBy_MobileNo", "") + '|' + rtnCtrlVal("txtReferredBy_Incentive", "") + '|';
        if (_RefDoctorRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }


        _RefDoctorRecordId = data;

        /*Upload File End */

        $("#mdlRefDoctorsModal").modal('hide');
    }
    else if (context == 'FillGrid_RefDoctorTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo',  'Doctor Name', 'Mobile', 'Incentive', 'Action#ancAddNewRefDoctor'],
            dataArr: [],
            width: [25, 0, 0, 0, 0, 20, 20],
            headerval: [1, 1,2, 3, 4, 5],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getRefDoctorEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlRefDoctorsModal").modal('show');

        $("#txtReferredBy_DoctorName").val(data.split('|')[1]);
        $("#txtReferredBy_MobileNo").val(data.split('|')[2]);
        $("#txtReferredBy_Incentive").val(data.split('|')[4]);

        _RefDoctorRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteRefDcotorRecords') {
        ctlDetails.DeleteArray(_RefDoctorRecordId, 1);
        _RefDoctorRecordId = 0;
    }

    /*Treatment Tab*/
    if (context == 'UpdateTreatmentRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtTreatmentName", "");
        if (_TreatmentRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _TreatmentRecordId = data;

        $("#mdlTreatmentsModal").modal('hide');
    }
    else if (context == 'FillGrid_TreatmentTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '2',
            header: ['SNo',  'Treatment Name', 'Action#ancAddNewTreatment'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1, 1,  2],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getTreatmentEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlTreatmentsModal").modal('show');

        $("#txtTreatmentName").val(data.split('|')[1]);

        _TreatmentRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteTreatmentRecords') {
        ctlDetails.DeleteArray(_TreatmentRecordId, 1);
        _TreatmentRecordId = 0;
    }

    /*Incentive Tab*/
    if (context == 'FillGrid_IncentiveTab') {
        $("#tblTreatmentChart").html('');
        if (data == '') { return false; }
        eval('var objIncentive = ' + data);
        if (objIncentive) {
            var $tbl = $("#tblTreatmentChart");
            var strDetails = '';
            for (var i = 0; i < objIncentive.length; i++) {
                strDetails += '<tr>';
                strDetails += '<td>' + (i + 1) + '</td>';
                strDetails += '<td>' + objIncentive[i][1] + '</td>';
                strDetails += '<td><input type="text" value="' + objIncentive[i][2] + '" onchange="fn_UpdateTreatIncentive(this);" data-id="' + objIncentive[i][0] + '" class="form-control" /></td>';
                strDetails += '</tr>';
            }
            $tbl.html(strDetails);
        }


    }
    else if (context == 'UpdateIncentiveTab') { }

    /*Medicine Tab*/
    if (context == 'UpdateMedicineRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtMedicineName", "") + "|";
        if (_MedicineRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _MedicineRecordId = data;

        $("#mdlMedicineModal").modal('hide');
    }
    else if (context == 'FillGrid_MedicineTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '3',
            header: ['SNo', 'Medicine Name', 'Action#ancAddNewMedicine'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1, 1, 2],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getGetMedicineEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlMedicineModal").modal('show');
        $("#txtMedicineName").val(data.split('|')[1]);
        _MedicineRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteMedicineRecords') {
        ctlDetails.DeleteArray(_MedicineRecordId, 1);
        _MedicineRecordId = 0;
    }

    /*Medicine Tab*/
    if (context == 'UpdatePayModeRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtPayMode", "") + "|";
        if (_PayModeRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _PayModeRecordId = data;

        $("#mdlPayMode").modal('hide');
    }
    else if (context == 'FillGrid_PayModeTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '9',
            header: ['SNo', 'Pay Mode', 'Action#ancAddNewPayMode'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1, 1,  2],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getGetPayModeEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlPayMode").modal('show');
        $("#txtPayMode").val(data.split('|')[1]);
        _PayModeRecordId = data.split('|')[0];

    }
    else if (context == 'DeletePayModeRecords') {
        ctlDetails.DeleteArray(_PayModeRecordId, 1);
        _PayModeRecordId = 0;
    }

    /*Instruction Tab*/
    if (context == 'UpdateInstructionRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtInstructionName", "") + "|";
        if (_InstructionRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _InstructionRecordId = data;

        $("#mdlInstructionModal").modal('hide');
    }
    else if (context == 'FillGrid_InstructionTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '4',
            header: ['SNo',  'Instruction Name', 'Action#ancAddNewInstruction'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1, 1,  2],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getInstructionEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlInstructionModal").modal('show');

        $("#txtInstructionName").val(data.split('|')[1]);

        _InstructionRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteInstructionRecords') {
        ctlDetails.DeleteArray(_InstructionRecordId, 1);
        _InstructionRecordId = 0;
    }

    /*Relations Tab*/
    if (context == 'UpdateRelationRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtRelationType", "") + "|";
        if (_RelationRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _RelationRecordId = data;

        $("#mdlRelationModal").modal('hide');
    }
    else if (context == 'FillGrid_RelationsTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '5',
            header: ['SNo',  'Relation Type', 'Action#ancAddNewRelations'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1,  1, 2],
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
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getRelationsEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlRelationModal").modal('show');

        $("#txtRelationType").val(data.split('|')[1]);

        _RelationRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteRelationRecords') {
        ctlDetails.DeleteArray(_RelationRecordId, 1);
        _RelationRecordId = 0;
    }

    /*Templates Tab*/
    if (context == 'UpdateTemplateRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        var str = data + '|' + rtnCtrlVal("txtTemplateName", "") + "|" + $("#ddlTemplateType").val();
        if (_TemplateRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        _TemplateRecordId = data;

        $("#mdlTemplateModal").modal('hide');
    }
    else if (context == 'FillGrid_TemplatesTab') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '6',
            header: ['SNo',  'Template Type', 'Template Name', 'Action#ancAddNewTemplates'],
            dataArr: [],
            width: [25, 0, 0, 20],
            headerval: [1, 1,  3, 2],
            IsActionButton: ['Create Template','Edit', 'Delete'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '50',
            SortType: [1, 1, 2, 2, 2, 2, 2, 2],
            header_align: ['', '', '', '', '', ''],
            chkVal: 1,
            advSearch: true,
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails = new fn_arvGrid(objVarable);
        ctlDetails.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'getTemplateEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlTemplateModal").modal('show');

        $("#txtTemplateName").val(data.split('|')[1]);

        _TemplateRecordId = data.split('|')[0];

    }
    else if (context == 'DeleteTemplateRecords') {
        ctlDetails.DeleteArray(_TemplateRecordId, 1);
        _TemplateRecordId = 0;
    }

}

function onWriteComplete(data, context) {
  
    $("#TemplateFormModal").modal('hide');
}

function btnEditAction_Click(_oBtn) {
    //ClinicRecordId = $(_oBtn).parents('.btmbdr').attr('data-attr');

    if (_ActiveTabName == 'DoctorTab') {
        _DoctorRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetDoctorDetails", _DoctorRecordId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(5, 'getDoctorEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'LabsTab') {
        _LabRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetLabDetails", _LabRecordId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(21, 'getLabEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'DealersTab') {
        _DealerRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetDelearDetails", _DealerRecordId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(4, 'getDealerEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'RefDoctorTab') {
        _RefDoctorRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetRefDoctorDetails", _RefDoctorRecordId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(5, 'getRefDoctorEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'TreatmentTab') {
        _TreatmentRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetTreatmentDetails", _TreatmentRecordId, _LocationId];
        GetDataFromDatabase(17, 'getTreatmentEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'MedicineTab') {
        _MedicineRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetMedicineDetails", _MedicineRecordId, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'getGetMedicineEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'PayMode') {
        _PayModeRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetPayModeDetails", _PayModeRecordId, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'getGetPayModeEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'InstructionTab') {
        _InstructionRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetInstructionDetails", _InstructionRecordId, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'getInstructionEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'RelationsTab') {
        _RelationRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetRelationTypeDetails", _RelationRecordId, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'getRelationsEditRecords', objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'TemplatesTab') {
        _TemplateRecordId = $(_oBtn).attr('data-id');
        var objRecords = ["GetTemplateDetails", _TemplateRecordId, _LocationId, _SubLocationId];
        GetDataFromDatabase(20, 'getTemplateEditRecords', objRecords, 'DentalParams');
    }

}

function btnDeleteAction_Click(_oBtn) {
    if (_ActiveTabName == 'DoctorTab') {
        _DoctorRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteDoctor", _DoctorRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteDcotorRecords', _objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'LabsTab') {
        _LabRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteLab", _LabRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteLabRecords', _objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'DealersTab') {
        _DealerRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteDelear", _DealerRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteDealerRecords', _objRecords, 'DentalParams');
    } else if (_ActiveTabName == 'RefDoctorTab') {
        _RefDoctorRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteRefDoctor", _RefDoctorRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteRefDcotorRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'TreatmentTab') {
        _TreatmentRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteTreatment", _TreatmentRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteTreatmentRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'MedicineTab') {
        _MedicineRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteMedicine", _MedicineRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteMedicineRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'PayMode') {
        _MedicineRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeletePayMode", _MedicineRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeletePayModeRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'InstructionTab') {
        _InstructionRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteInstuction", _InstructionRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteInstructionRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'RelationsTab') {
        _RelationRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteRelationType", _RelationRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteRelationRecords', _objRecords, 'DentalParams');
    }
    else if (_ActiveTabName == 'TemplatesTab') {
        _TemplateRecordId = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteTemplate", _TemplateRecordId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteTemplateRecords', _objRecords, 'DentalParams');
    }
}

function btnCustomAction_Click(_oBtn) {
    if ($(_oBtn).text() == 'Create Template') {
        _TemplateRecordId = $(_oBtn).attr('data-id');
        $('#divTemplateForm').summernote('code', '');
        var htmPath = RootFolderPath('HTMLForms/' + _LocationId + '/' + _TemplateRecordId + '.html');
        $.get(htmPath, function (data) {
            $('#divTemplateForm').summernote('code', data);
        });

        $("#TemplateFormModal").modal('show');
    }
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'ancAddNewDoctor') {
        fn_ClearDoctorModal();
        $("#mdlDoctorsModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewLab') {
        fn_ClearLabModal();
        $("#mdlLabsModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewDealer') {
        fn_ClearDealerModal();
        $("#mdlDealersModal").modal('show');
    }else if ($(_o).attr('data-ctrl') == 'ancAddNewRefDoctor') {
        fn_ClearRefDoctorModal();
        $("#mdlRefDoctorsModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewTreatment') {
        fn_ClearTreatmentModal();
        $("#mdlTreatmentsModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewMedicine') {
        fn_ClearMedicineModal();
        $("#mdlMedicineModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewPayMode') {
        fn_ClearPayModeModal();
        $("#mdlPayMode").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewInstruction') {
        fn_ClearInstructionModal();
        $("#mdlInstructionModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewRelations') {
        fn_ClearRelationModal();
        $("#mdlRelationModal").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'ancAddNewTemplates') {
        fn_ClearTemplateModal();
        $("#mdlTemplateModal").modal('show');
    }
}