var _PatientPhoto = '';
var _PatientRecordId = 0;
var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid");
var _UserName = $qc.Cookie("username"), _RefDoctorRecordId = 0;

$(document).ready(function () {
    FillDropDown_JS(true, 'RefDoctorList', 'ddlPatientRefferedBy', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    fn_GetDataFromDatabase(47, "GetNotifications", "Notifications|" + $qc.Cookie("locationid") + '', "DentalParams");


    $("#btnGeneratePatientId").click(function () {
        $(this).hide();
        if (rtnCtrlVal("txtPatientFName", "") == '') { alert('Fill all mandatory fields'); return false; }
        var mob1 = $("#txtPatientMobileNo1").val() + '';
        if (mob1 != '') {
            if (mob1.length != 10) {
                alert('Mobile No 1 is not 10 Digit number, check and correct number'); $("#txtPatientMobileNo1").focus(); return false;
            }
        }
        var mob2 = $("#txtPatientMobileNo2").val() + '';
        if (mob2 != '') {
            if (mob2.length != 10) {
                alert('Mobile No 2 is not 10 Digit number, check and correct number'); $("#txtPatientMobileNo2").focus(); return false;
            }
        }
        fn_InsertUpdatePatientRecord();
    });

    $("#btnUpdatePatInfo").click(function () {
        if (rtnCtrlVal("txtPatientFName", "") == '') { alert('Fill all mandatory fields'); return false; }
        var mob1 = $("#txtPatientMobileNo1").val() + '';
        if (mob1 != '') {
            if (mob1.length != 10) {
                alert('Mobile No 1 is not 10 Digit number, check and correct number'); $("#txtPatientMobileNo1").focus(); return false;
            }
        }
        var mob2 = $("#txtPatientMobileNo2").val() + '';
        if (mob2 != '') {
            if (mob2.length != 10) {
                alert('Mobile No 2 is not 10 Digit number, check and correct number'); $("#txtPatientMobileNo2").focus(); return false;
            }
        }
        fn_InsertUpdatePatientRecord();
    });

    $("#txtPatientDOB").change(function () {
        $("#txtPatientAge").val(Calculateage($("#txtPatientDOB").val()));
    });

    $("#btnPatientRefferedBy").click(function () {
        $("#mdlRefDoctorsModal").modal('show');
    });

    $("#btnSubmitRefferedBy").click(function () {
        if (rtnCtrlVal("txtReferredBy_DoctorName", "") == '') { alert('Fill all mandatory filds'); return false; }
        fn_InsertUpdateRefDoctorRecord();
    });

    $("#btnResetPatientForm").click(function () { });

    $("#btnClosePatientForm").click(function () {
        if (document.URL.toLowerCase().indexOf('/treatmentcard') >= 0) {
            document.location.reload();
        } else {
            fn_AngularRouting('./DentalSoft/PatientList');
        }
    });

    $("#btnUserUpdatePwd").click(function () {
        if ($("#txtUserNewPwd").val() != $("#txtUserConfirmPwd").val()) {
            alert('New password and confrim is not matched');
            return false;
        }
        if ($("#txtUserNewPwd").val() == "" || $("#txtUserConfirmPwd").val() == "" || $("#txtUserOldPwd").val() == "") {
            alert('All fields are mandatory');
            return false;
        }
        var _objParams = [$qc.Cookie("usercategory"), $qc.Cookie("userid"), $qc.Cookie("locationid"), $("#txtUserOldPwd").val(), $("#txtUserNewPwd").val()];
        fn_UpdateDataToDatabase(48, "UpdatePassword", _objParams, "DentalParams");

    });

    $(".btnCapturePhoto").click(function () {
        $("#mdlWebCamCpture").modal('show');
    });

    $(".uplUploadPatientPhoto").change(function () {
        /*Upload File Start */
        if (_PatientRecordId == 0) { return false }

        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#imgPatientPhoto').attr('src', e.target.result);
                $('.imgPatientPhoto').attr('src', e.target.result);
                $('.imgPatientPhoto').parent().attr('href', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#imgPatientPhoto').attr('src', 'images/photo.jpg');
        }

        var fileUpload = $(this).get(0);
        var files = fileUpload.files;
        var _PatientPhoto = '';

        //imgPatientPhoto


        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _PatientPhoto = _PatientRecordId + '.' + _extension;
            var fileparams = { FolderName: "PatientPhoto/" + _LocationId, FileName: _PatientRecordId, Extension: _extension };

            // if (files[0].size <= 2151043) {
            UploadImage(files[0], 'PatientPhoto', fileparams);
            //} else {
            //    if (URL) { this.inputURL = URL.createObjectURL(files[0]); }
            //    CompressUploadedImage(files[0], fileparams, 'PatientPhoto', 0.8, 200);
            //}
            fn_UpdateLogoURL(_PatientRecordId, _PatientPhoto, 'UpdateLogo');

        }
        //else {
        //    if (document.URL.toLowerCase().indexOf('/treatmentcard') >= 0) {
        //        document.location.reload();
        //    } 
        //}


        /*Upload File End */
    });

    $("#btnUploadPatientPhoto").click(function () {
        var _src = $("#photo").attr('src').split('base64,');
        var fileparams = { FolderName: "PatientPhoto/" + _LocationId, FileName: _PatientRecordId, Extension: "jpg" };
        var array = _base64ToArrayBuffer(_src[1]);
        UploadImageByReader(array, 'FileUpload', fileparams);
    });

});

function opencosnsetform(_o) {
    if (_PatientRecordId == 0) { return false; }
    $("#mdlAddPatientModal").modal('hide');
    fn_AngularRouting('./DentalSoft/PrintForms?pat=' + _PatientRecordId + '&form=10&rid=0');
}

function Calculateyearagainstage(_o) {
    var age = parseInt(($(_o).val() == '' ? 0 : $(_o).val()));

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year - age, month, day);
    $("#txtPatientDOB").val(c.getFullYear() + '-' + DateDigitLen(c.getMonth() + 1) + '-' + DateDigitLen(c.getDate()));
}

function Calculateage(birthdate) {
    var dob = new Date(birthdate); //"06/24/2008"
    //calculate month difference from current date in time  
    var month_diff = Date.now() - dob.getTime();

    //convert the calculated difference in date format  
    var age_dt = new Date(month_diff);

    //extract year from date      
    var year = age_dt.getUTCFullYear();

    //now calculate the age of the user  
    var age = Math.abs(year - 1970);
    return age;
}

function fn_InsertUpdateRefDoctorRecord() {
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

    fn_UpdateDataToDatabase(15, 'UpdateRefDoctorRecords', _objRecords, 'DentalParams');
}

function fn_InsertUpdatePatientRecord() {
    var _objRecords = ["InsertUpdate"
        , _PatientRecordId
        , rtnCtrlVal("txtPatientFName", "")
        , rtnCtrlVal("txtPatientMName", "")
        , rtnCtrlVal("txtPatientLName", "")
        , rtnCtrlVal("ddlPatientGender", "")
        , rtnCtrlVal("txtPatientDOB", "")
        , rtnCtrlVal("txtPatientAge", "")
        , rtnCtrlVal("txtPatientPrimaryAddress", "")
        , rtnCtrlVal("txtPatientSecondaryAddress", "")
        , rtnCtrlVal("txtPatientMobileNo1", "")
        , rtnCtrlVal("txtPatientMobileNo2", "")
        , rtnCtrlVal("txtPatientEmail", "")
        , rtnCtrlVal("ddlPatientRefferedBy", "0")
        , rtnCtrlVal("txtSmartCardID", "")
        , rtnCtrlVal("txtPatientMedicalHistory", "")
        , _LocationId
        , _SubLocationId
        , ""
        , ""
        , rtnCtrlVal("txtCustomID", "")
    ];

    fn_UpdateDataToDatabase(14, 'UpdatePatientRecords', _objRecords, 'DentalParams');
}

function fn_ClearPatientModal() {
    $("#txtPatientFName").val("");
    $("#txtPatientMName").val("");
    $("#txtPatientLName").val("");
    $("#ddlPatientGender").val("");
    $("#txtPatientDOB").val("");
    $("#txtPatientAge").val("");
    $("#txtPatientPrimaryAddress").val("");
    $("#txtPatientSecondaryAddress").val("");
    $("#txtPatientMobileNo1").val("");
    $("#txtPatientMobileNo2").val("");
    $("#txtPatientEmail").val("");
    $("#ddlPatientRefferedBy").val("0");
    $("#txtSmartCardID").val("");
    $("#txtPatientMedicalHistory").val("");
    $("#txtCustomID").val("");
    _PatientRecordId = 0;
    $("#btnUpdatePatInfo").hide();
    $("#btnGeneratePatientId").show();
    $(".clsPatPotoUpload").hide();


}


function fn_onGetDataSuccess(data, context) {
    if (context == 'UpdatePatientRecords') {

        if (data == '' || data == 0) { alert('500 error fired..'); return false; }

        if (_PatientRecordId == 0) {
            _PatientRecordId = data.split('_')[1];

            $("#RegistrationSuccessfulModal").modal('show');
            $("#mdlAddPatientModal").modal('hide');

            var strPatName = '';
            if ($("#txtPatientFName").val() != '') { strPatName += (strPatName == '' ? $("#txtPatientFName").val() : ' ' + $("#txtPatientFName").val()); }
            if ($("#txtPatientMName").val() != '') { strPatName += (strPatName == '' ? $("#txtPatientMName").val() : ' ' + $("#txtPatientMName").val()); }
            if ($("#txtPatientLName").val() != '') { strPatName += (strPatName == '' ? $("#txtPatientLName").val() : ' ' + $("#txtPatientLName").val()); }

            $("#PatName").html(strPatName);
            $("#PatId").html(data.split('_')[0]);

            if (typeof fn_FillGrid != 'undefined') { fn_FillGrid(); }

            var JSONPath = {
                "Proc": 65,
                "Params": 'Patient Registration SMS|' + data.split('_')[0] + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
                "ParamPath": "DentalParams"
            }
            fn_sendInstantCommunication(JSONPath, "SendNotification");

        }
        else {
            $("#RegStatus").html('Registration Successfull');
            $("#mdlAddPatientModal").modal('hide');

            //var JSONPath = {
            //    "Proc": 65,
            //    "Params": 'Patient Registration SMS|' + _PatientRecordId + '|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            //    "ParamPath": "DentalParams"
            //}
            //fn_sendInstantCommunication(JSONPath, "SendNotification");

            if (typeof fn_FillGrid != 'undefined') { fn_FillGrid(); }
            if (typeof fn_ClearPatientModal != 'undefined') { fn_ClearPatientModal(); }
            if (typeof fn_RefreshTreatCard != 'undefined') { fn_RefreshTreatCard(); }
        }
    }
    else if (context == 'UpdateRefDoctorRecords') {
        $("#mdlRefDoctorsModal").modal('hide');
        FillDropDown_JS(true, 'RefDoctorList', 'ddlPatientRefferedBy', 0, _LocationId, data, 1, null, null, false, [], 'Params', null);
    }
    else if (context == 'UpdatePassword') {
        if (data == "-1") { alert('Old password not matched'); return false; }
        alert("Password Updated Successfully");
        $("#mdlchangepassword").modal('hide');
    }
    else if (context == 'GetNotifications') {

        $("#ulNotifications").html(''); $("#ulCliniclocations").html('');
        if (data == '') { return false; }
        eval('var objNotify=' + data);
        if (objNotify) {
            var strLocation = '';
            for (var i = 0; i < objNotify[0]["ClinicLocation"].length; i++) {

                strLocation += '<li>';
                strLocation += '<a href="javascript:undefined;">';
                strLocation += '<strong>' + objNotify[0]["ClinicLocation"][i]["username"] + '</strong>';
                strLocation += '<span>' + objNotify[0]["ClinicLocation"][i]["ClinicAddress"] + '</span>';
                strLocation += '</a>';
                strLocation += '</li>';
            }
            $("#ulCliniclocations").html(strLocation);

            var strNotify = '';
            strNotify += ' <li class="notification-header">';

            strNotify += '<strong>Todays Expiry - <span class="badge badge-danger float-right">' + objNotify[0]["Notifications"].length + '</span></strong>';

            strNotify += '</li>';
            for (var i = 0; i < objNotify[0]["Notifications"].length; i++) {
                strNotify += ' <li class="notification-header">';
                strNotify += '<a href="javascript:undefined;">';
                strNotify += '<strong>' + objNotify[0]["Notifications"][i]["Category"] + '</strong>';
                strNotify += '<span>Material Name: ' + objNotify[0]["Notifications"][i]["MaterialName"] + '</span>';
                strNotify += '<span>Total Stock: ' + objNotify[0]["Notifications"][i]["Quantity"] + '</span>';
                strNotify += '<span>Used Stock: ' + objNotify[0]["Notifications"][i]["UsedQty"] + '</span>';
                strNotify += '<span>BalanceStock: ' + objNotify[0]["Notifications"][i]["BalanceQty"] + '</span>';
                strNotify += '</a>';
                strNotify += '</li>';
            }
            $("#ulNotifications").html(strNotify);
        }
    }
    //else if (context == 'UpdateImgURL') {
    //    if (document.URL.toLowerCase().indexOf('/treatmentcard') >= 0) {
    //        document.location.reload();
    //    } else {
    //        fn_AngularRouting('./DentalSoft/PatientList');
    //    }
    //}
    else if (context == 'UpdateUserThumb') {
        alert('Thumb Updated');
        fillUserThumbStatus();
    }
    else if (context == 'getUserThumb') {
        if (data == '') { return false;}
        eval('var _objthumb=' + data);
        if (_objthumb) {
            $(this).removeClass('captured');
            $(".clsThumbBall").each(function () {
                if (typeof _objthumb[0][$(this).attr('id')] != 'undefined' && _objthumb[0][$(this).attr('id')] == 'Y') {
                    $(this).addClass('captured');
                } 
            });
        }
    }
}

function fn_UpdateUserThumb(ActionId,UserId, fingername, status) {

    var objRecords = [ActionId, UserId, fingername, $qc.Cookie("locaitonid"), status, $qc.Cookie("username")];
    fn_UpdateDataToDatabase(72, 'UpdateUserThumb', objRecords, 'DentalParams');

}

function fn_UpdateLogoURL(PatientId, imgURL, type) {
    if (PatientId == '0' && PatientId == '') { return false; }
    if (type == 'UpdateLogo') {
        var objRecords = ["UpdateSQL", "Update PatientInfo set PatientPhoto=`" + imgURL + "` where PatientId=" + PatientId];
        fn_UpdateDataToDatabase(13, 'UpdateImgURL', objRecords, 'DentalParams');
    }
}

function rtnCtrlVal(ctrlName, DefaultVal) {
    var _val = DefaultVal + '';
    var $val = $("#" + ctrlName);
    if ($val.length > 0) {
        _val = ($val.val() == null ? _val : $val.val()) + '';
        _val = _val.trim();
    }

    return _val;
}

function fn_CheckUserRoles() {
    if (typeof $qc.cookie("UserRoleID") != 'undefined' && $qc.cookie("UserRoleID") != '' && $qc.cookie("UserRoleID") != '0') {
        var _parentids = $qc.cookie("ParentIds");
        var _childids = $qc.cookie("ChildIds");
        $(".clsClinicRights").hide();

        for (var i = 0; i < _parentids.split(',').length; i++) {
            $(".clsClinicRights[data-id='" + _parentids.split(',')[i] + "']").show();
        }

        for (var i = 0; i < _childids.split(',').length; i++) {
            var _a = _childids.split(',')[i].split('-');
            $(".clsClinicRights[data-id='" + _a[0] + "'][data-tab='" + _a[1] + "']").show();
        }
    }
}