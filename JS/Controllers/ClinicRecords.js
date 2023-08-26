var ClinicRecordId = 0, _ClinicLogo = '', _ChildClinicId = 0;

$(document).ready(function () {
    fn_FillGrid();

    if ($qc.Cookie('usercategory') == 'admin') { $(".clsAdminPart").show(); } else { $(".clsAdminPart").hide(); }

    FillDropDown_JS(true, 'ClinicMaster', 'ddlClinicList', 0, 0, 0, 1, null, null, false, [], 'Params', null);

    $("#ddlClinicList").change(function () {
        _ChildClinicId = this.value;
        fn_FillGrid();
    });

    $("#uplFileUpload").change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgClinicPhoto').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#imgClinicPhoto').attr('src', 'images/cliniclogo.jpg');
        }
    });

    $("#btnAddNewClinic").click(function () { $("#AddClinicModal").modal('show'); fn_ClearTextVal(); });

    $("#btnSubmitClinicRecords").click(function () { fn_UpdateClinicReords(); });
});

function fn_UpdateClinicReords() {
    
    var actionid = 'InsertUpdateAdmin';
    if ($qc.Cookie('usercategory') == 'admin') {
        actionid = 'InsertUpdateAdmin';
    } else {
        actionid = 'InsertUpdate';
    }


    var _objRecords = [actionid
        , ClinicRecordId
        , _ChildClinicId
        , rtnCtrlVal("txtClinicName", "")
        , rtnCtrlVal("txtDoctorRegNo", "")
        , rtnCtrlVal("txtFName", "")
        , rtnCtrlVal("txtMName", "")
        , rtnCtrlVal("txtLName", "")
        , rtnCtrlVal("txtQualification", "")
        , rtnCtrlVal("txtAddress", "")
        , rtnCtrlVal("txtContact1", "")
        , rtnCtrlVal("txtContact2", "")
        , rtnCtrlVal("txtWebsite", "")
        , rtnCtrlVal("txtEmail", "")
        , rtnCtrlVal("ddlWeeklyOff", "")
        , ""
        , rtnCtrlVal("txtPassword", "")
        , ""
        , ""
        , ""
        , ""
        , ""
        , ""
        , ""
        , rtnCtrlVal("txtExpiryFromDate", "")
        , rtnCtrlVal("txtExpiryToDate", "")
        , rtnCtrlVal("ddlSoftType", "")

    ];
    UpdateDataToDatabase(6, 'UpdateClinicRecords', _objRecords, 'DentalParams')
}

function onGetDataSuccess(data, context) {
    if (context == 'UpdateClinicRecords') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        //var str = data + '|' + rtnCtrlVal("txtClinicName", "") + '|' + rtnCtrlVal("txtFName", "") + " " + rtnCtrlVal("txtMName", "") + " " + rtnCtrlVal("txtLName", "") + '|' + rtnCtrlVal("txtContact1", "") + "/" + rtnCtrlVal("txtContact2", "") + '|' + rtnCtrlVal("txtPassword", "");
        //if (ClinicRecordId == 0) { ctlDetails.PushToArray(str); } else { ctlDetails.EditArray(str, 1); }
        fn_FillGrid();

        ClinicRecordId = data;
        /*Upload File Start */
        var fileUpload = $("#uplFileUpload").get(0);
        var files = fileUpload.files;
        _ClinicLogo = '';

        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _ClinicLogo = data + '.' + _extension;
            var fileparams = { FolderName: "ClinicLogo", FileName: data, Extension: _extension };

            if (files[0].size <= 2151043) {
                UploadImage(files[0], 'ClinicLogo', fileparams);

            } else {
                if (URL) { this.inputURL = URL.createObjectURL(files[0]); }
                CompressUploadedImage(files[0], fileparams, 'ClinicLogo', 0.8, 200);

            }
        }
        fn_UpdateLogoURL(ClinicRecordId, _ClinicLogo);

        /*Upload File End */

        $("#AddClinicModal").modal('hide');
    }
    else if (context == 'FillGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Ref.ID', 'Clinic Name', 'Doctor Name', 'Contact No.','Left Days', 'PWD', 'Action'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5,6],
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
    else if (context == 'getEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#AddClinicModal").modal('show');
        $("#txtClinicName").val(data.split('|')[2]);
        $("#txtDoctorRegNo").val(data.split('|')[3]);
        $("#txtFName").val(data.split('|')[4]);
        $("#txtMName").val(data.split('|')[5]);
        $("#txtLName").val(data.split('|')[6]);
        $("#txtQualification").val(data.split('|')[7]);
        $("#txtAddress").val(data.split('|')[8]);
        $("#txtContact1").val(data.split('|')[9]);
        $("#txtContact2").val(data.split('|')[10]);
        $("#txtWebsite").val(data.split('|')[11]);
        $("#txtEmail").val(data.split('|')[12]);
        $("#ddlWeeklyOff").val(data.split('|')[13]);
        $("#txtPassword").val(data.split('|')[15]);
        ClinicRecordId = data.split('|')[0];
        if (data.split('|')[14] != '') {
            $("#imgClinicPhoto").attr('src', RootFolderPath("ClinicLogo/" + data.split('|')[14]));
        }
        else {
            $("#imgClinicPhoto").attr('src', 'images/cliniclogo.jpg');
        }

        $("#txtExpiryFromDate").val(data.split('|')[28]);
        $("#txtExpiryToDate").val(data.split('|')[29]);
        $("#ddlSoftType").val(data.split('|')[30]);
    }
    else if (context == 'DeleteClinicRecords') {
        ctlDetails.DeleteArray(ClinicRecordId, 1);
        fn_UpdateLogoURL(ClinicRecordId, '');


        ClinicRecordId = 0;
    }
}


function fn_FillGrid() {
    var objRecords = ["ListOfClinic", 0, _ChildClinicId];
    GetDataFromDatabase(2, 'FillGrid', objRecords, 'DentalParams');
}

function fn_UpdateLogoURL(ClinicID, imgURL) {
    if (ClinicID == '0' && ClinicID == '') { return false; }
    var objRecords = ["UpdateSQL", "Update ClinicInfo set ClinicLogo=`" + imgURL + "` where ClinicID=" + ClinicID];
    UpdateDataToDatabase(13, 'UpdateImgURL', objRecords, 'DentalParams');
}

function fn_ClearTextVal() {
    $("#txtClinicName").val('');
    $("#txtDoctorRegNo").val('');
    $("#txtFName").val('');
    $("#txtMName").val('');
    $("#txtLName").val('');
    $("#txtQualification").val('');
    $("#txtAddress").val('');
    $("#txtContact1").val('');
    $("#txtContact2").val('');
    $("#txtWebsite").val('');
    $("#txtEmail").val('');
    $("#txtPassword").val('');
    $("#ddlWeeklyOff").val(0);

    $("#txtExpiryFromDate").val('');
    $("#txtExpiryToDate").val('');
    $("#ddlSoftType").val('');

    ClinicRecordId = 0;
    $("#imgClinicPhoto").attr('src', 'images/cliniclogo.jpg');
}

function btnEditAction_Click(_oBtn) {
    //ClinicRecordId = $(_oBtn).parents('.btmbdr').attr('data-attr');
    ClinicRecordId = $(_oBtn).attr('data-id');
    var objRecords = ["GetClinicDetails", ClinicRecordId, "1"];
    GetDataFromDatabase(2, 'getEditRecords', objRecords, 'DentalParams');
}

function btnDeleteAction_Click(_oBtn) {
    ClinicRecordId = $(_oBtn).attr('data-id');
    var _objRecords = ["DeleteClinic", ClinicRecordId, 1, ""];
    UpdateDataToDatabase(1, 'DeleteClinicRecords', _objRecords, 'DentalParams');
}

function onImageUploadSuccess(data, context) {
    if (context == 'ClinicLogo') {
        if (data == 0) {
            alert('Logo upload error.');
            return false;
        }

        $("#imgClinicPhoto").attr('src', RootFolderPath("ClinicLogo/" + _ClinicLogo));
        fn_ClearTextVal();
    }
}

function onFileDeleteSuccess(data, context) {
    if (context == 'DeleteClinicLogo') {

    }
}