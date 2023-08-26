var _SMSID = 0;
var _LocationId = $qc.Cookie("locationid");

$(document).ready(function () {
    fn_FillSMSGrid();
});

function onGetDataSuccess(data, context) {
    if (context == 'FillSMSGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Ref.ID', 'Template Name', 'Compaign Name',  'Service Name',  'Action#AddNewSMSRecord'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5],
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
         fn_ClearSMSRecords(); fn_FillSMSGrid();
    }
    else if (context == 'DelSMSTemplate') {
         fn_ClearSMSRecords(); fn_FillSMSGrid();
    }
    else if (context == 'getSMSTemplate') {
        if (data == '') { return false; }
        $("#txtSMSTemplate").val(data.split('|')[1]);
        $("#txtCompaignName").val(data.split('|')[2]);
        $("#ddlTemplateType").val(data.split('|')[3]);
        $("#ddlSMSCategory").val(data.split('|')[4]);
       
        $("#txtMessageText").val(data.split('|')[5]);

        $("#SMSServicesModal").modal('show');
    }
}


function btnEditAction_Click(_oBtn) {
    _SMSID = $(_oBtn).attr('data-id');
    var _objParams = ["getSMSTemplate", _LocationId, _SMSID];
    GetDataFromDatabase(67, 'getSMSTemplate', _objParams, 'DentalParams');
}

function btnDeleteAction_Click(_oBtn) {
    _SMSID = $(_oBtn).attr('data-id');
    var _objRecords = ["DeleteWhatsAppTemplate", _SMSID, _LocationId, ""];
    UpdateDataToDatabase(1, 'DelSMSTemplate', _objRecords, 'DentalParams');
}

function fn_InsertSMSTemplate() {
    var _objParams = [_SMSID
        , $("#txtSMSTemplate").val()
        , $("#txtCompaignName").val()
        , ''
        , $("#ddlSMSCategory").val()
        , $("#txtMessageText").val()

    ];
    UpdateDataToDatabase(66, "UpdateSMSGrid", _objParams, "DentalParams");
}

function fn_FillSMSGrid() {
    var _objParams = ["FillGridSMSTemplate", 0, _SMSID];
    GetDataFromDatabase(67, "FillSMSGrid", _objParams, "DentalParams");
}

function fn_ClearSMSRecords() {
    //$("#txtSMSTemplate").val('');
    $("#txtSMSTemplate").val('');
    $("#txtCompaignName").val('');
    //$("#ddlTemplateType").val('');
    // $("#ddlSMSCategory").val('');
  
    _SMSID = 0;
    $("#SMSServicesModal").modal('hide');
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'AddNewSMSRecord') {
        fn_ClearSMSRecords();
        $("#SMSServicesModal").modal('show');
    }
}