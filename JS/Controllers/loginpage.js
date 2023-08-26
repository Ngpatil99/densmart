$(document).ready(function () {
    setInterval(function () {
        if (typeof $qc.Cookie("locationid") != 'undefined' && $qc.Cookie("locationid") != '' && $qc.Cookie("locationid") != null && $qc.Cookie("locationid") != 0) {
            window.open('AdminPanel.html', '_top');
        }
    }, 1000);

    $('#ForgotPassword').hide();
    $('.LoginSwitch').click(function () {
        $('#LoginBox').animate({ height: "toggle", opacity: "toggle" }, "slow");
        $('#ForgotPassword').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    $("#btnSubmitLogin").click(function () {
        fillclinic();
    });
});

//function enterkeypress(_o) {
//    if (event.keyCode == '13') {
//        if ($("#txtLoginId").val() == '' || $("#ddlLocation").val() == '' || $("#txtPassword").val() == '') { alert('Fill all mandatory fields'); return false; }
//        var _objRecords = ["0", $("#txtLoginId").val(), $("#ddlLocation").val(), $("#txtPassword").val()];
//        GetDataFromDatabase(24, 'LoginStatus', _objRecords, 'DentalParams');


//    }
//}

function onGetDataSuccess(data, context) {
    if (context == 'LoginStatus') {
        if (data == '') { $("#spnLogStatus").html('Wrong UserId Or Password.');  return false; }
        eval('var objData=' + data);
        if (parseInt(objData[0]["ExpiryDays"]) < 0) {
            //alert('Your Software License is expired contact your software admin');
            $("#spnLogStatus").html('Your Software License is expired contact your software admin.');
            return false;
        }
        $("#spnLogStatus").html('Login success wait for authentication...');
        for (var key in objData[0]) {
            $qc.setCookie(key, objData[0][key]);
        }

        window.open('AdminPanel.html', '_self');
    }
    else if (context == 'FillDropdown') {
       
        if (data == '') { $("#spnLogStatus").html('Wrong UserId Or Password.'); $("#ddlLocation").html(''); return false; }

       
        var $ddl = $("#ddlLocation");
        for (var i = 0; i < data.split('$').length; i++) {
            var arr = data.split('$')[i].split('|');
            $('<option data-attr="' + arr[2] + '"></option').attr('value', arr[0]).text(arr[1]).appendTo($ddl);
        }
        if (data.split('$').length >= 1) {
            $ddl.parent().hide();
            submitlogin();
            $("#spnLogStatus").html('Login success wait for authentication...');
        } else {
            $(".clsClinicDetails").show();
            $("#spnLogStatus").html('Login success Select Location and Press continue...');
        }

    }

}

function submitlogin() {
    if ($("#ddlLocation option:selected").attr('data-attr') == '' || typeof $("#ddlLocation option:selected").attr('data-attr') == 'undefined') {
        $("#spnLogStatus").html('Select User Location.');

        return false;
    }

    if ($("#txtLoginId").val() == '' || $("#ddlLocation option:selected").attr('data-attr') == '' || $("#txtPassword").val() == '') { alert('Fill all mandatory fields'); return false; }
    var _objRecords = ["0", $("#txtLoginId").val(), $("#ddlLocation option:selected").attr('data-attr'), $("#txtPassword").val(), $("#ddlLocation").val()];
    GetDataFromDatabase(24, 'LoginStatus', _objRecords, 'DentalParams');
}

function fillclinic() {
    var loginid = $("#txtLoginId").val();
    var pws = $("#txtPassword").val();
    if (loginid != '' && pws != '') {
        //$(".clsClinicDetails").show();
        var locationid = ($("#ddlLocation").val() == null ? 0 : $("#ddlLocation").val());
        var _objRecords = ["1", $("#txtLoginId").val(), locationid, $("#txtPassword").val(), "0"];
        GetDataFromDatabase(24, 'FillDropdown', _objRecords, 'DentalParams');
    } else {
        $(".clsClinicDetails").hide(); $("#ddlLocation").html('');
        $("#spnLogStatus").html('Wrong UserId Or Password.');
    }
}

function keypresschecklogin(_o) {
    if (event.keyCode == 13) {
        fillclinic();
    }
}