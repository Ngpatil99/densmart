var _LocationId = $qc.Cookie('locationid'); var _isOwnerDr = true;
var arrselectedtreatment = [], arrdoctorname = [], arrrefdoctorname = [], arrpaymode = [];
$(document).ready(function () {
    $("#txtFdate").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtTdate").val(_GlobalPatHistory.CurrentDateYMD);

    FillDropDown_JS(true, 'Doctorlist', 'ddlDoctors', 0, _LocationId, 0, 1, 0, '--All--', false, [], 'Params', null);
    FillDropDown_JS(true, 'TreatmentList', 'ddlTreatments', 0, _LocationId, 0, 1, 0, '--All--', false, [], 'Params', null);
    FillDropDown_JS(true, 'PaymentMode', 'ddlModeOfPayment', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null);
    FillDropDown_JS(true, 'RefDoctorList', 'ddlPatientRefferedBy', 0, _LocationId, 0, 1, 0, '--All--', false, [], 'Params', null);

    $("#ddlDoctors").change(function () {
        if (this.value == '0') {
            $("#tblOtherView").hide();
            $("#tblDoctorRecordView").hide();
            $("#tblRecordView").show();
            _isOwnerDr = true;
            fn_RefreshTable();
        } else {
            fn_checkOwner(this.value);
        }
    });

    $("#ddlPatientRefferedBy").change(function () {
        if (this.value != '' && this.value != 0) {
            $("#tblOtherView").hide();
            $("#tblDoctorRecordView").show();
            $("#tblRecordView").hide();
            _isOwnerDr = false;
        } else {
            if ($("#ddlDoctors").val() == '0') {
                $("#tblOtherView").hide();
                $("#tblDoctorRecordView").hide();
                $("#tblRecordView").show();
                _isOwnerDr = true;
                fn_RefreshTable();
            } else {
                fn_checkOwner(this.value);
            }
        }
    });


    $("#ddlPayView").change(function () {
        if (this.value == 'RecordView') {
            $(".clsView").show();
            $("#tblRecordView").show();
            $("#tblOtherView").hide();
            $("#tblDoctorRecordView").hide();
        } else {
            $(".clsView").hide();
            $("#tblRecordView").hide();
            $("#tblOtherView").show();
            $("#tblDoctorRecordView").hide();
        }
    });

    $("#ddlPayType").change(function () {
        $("#tblDoctorRecordView").hide();
        $("#tblOtherView").hide();
        $("#tblRecordView").show();
        _isOwnerDr = true;
        $("#ddlDoctors").val(0);


        if (this.value == 'Credits') {
            $("#lblRecordView").html('Credited Amount');
            $("#lblRecordView1").html('Patient Name');
            $("#lblRecordView2").html('Treatment Name');
        }
        else if (this.value == 'Debits') {
            $("#lblRecordView").html('Debited Amount');
            $("#lblRecordView1").html('Debit type');
            $("#lblRecordView2").html('Customer Name');
        }
        else if (this.value == 'Pendings') {
            $("#lblRecordView").html('Balance Amount');
            $("#lblRecordView1").html('Patient Name');
            $("#lblRecordView2").html('Treatment Name');
        }
    });

    $("#btnExporttoExcel").click(function () {
        if ($("#ddlPayView").val() == 'RecordView') {
            exportTableToExcel('tblRecordView', 'ExportToExcel');
        } else {
            exportTableToExcel('tblOtherView', 'ExportToExcel');
        }
    });

    fn_RefreshTable();

});


function fn_checkOwner(_v) {
    $("#tblDoctorRecordView").hide();
    $("#tblRecordView").show();
    $("#tblOtherView").hide();

    var _objParams = ["IsDoctorOwner", _v, _LocationId, _SubLocationId, ""];
    GetDataFromDatabase(5, 'IsDoctorOwner', _objParams, 'DentalParams');
}

function calTotalAmounts() {
    var tc = parseFloat(($("#txtTotalCredits").val() == '' ? 0 : $("#txtTotalCredits").val()));
    var td = parseFloat(($("#txtTotalDebits").val() == '' ? 0 : $("#txtTotalDebits").val()));
    $("#txtTotalIncome").val(tc - td);
}

function fn_RefreshTable() {
    if ($("#txtFdate").val() == '' || $("#txtFdate").val() == '') { alert('Select From & To Date'); return false; }

    var _objParams = [_LocationId
        , $("#ddlPayView").val()
        , $("#ddlPayType").val()
        , $("#txtFdate").val()
        , $("#txtTdate").val()
        , ($("#ddlDoctors").val() == null ? 0 : $("#ddlDoctors").val())
        , ($("#ddlTreatments").val() == null ? 0 : $("#ddlTreatments").val())
        , $("#ddlPatientRefferedBy").val()
        , $("#ddlModeOfPayment").val()
        , ''//$("#txtSearch").val()
    ];
    GetDataFromDatabase(58, "GetData", _objParams, "DentalParams");
}

function onGetDataSuccess(data, context) {
    if (context == 'GetData') {
        arrselectedtreatment = []; arrdoctorname = []; arrrefdoctorname = []; arrpaymode = [];

        $("#tblValue").html(''); $("#tblDayValue").html(''); $("#tblDcotorValue").html('');
        if (data == '') { return false; }
        var s = '';
        var cramt = 0; var dramt = 0; var balamt = 0; var t = 0;

        var a1 = 0, a2 = 0, a3 = 0;

        if ($("#ddlPayView").val() == 'RecordView') {

            for (var i = 0; i < data.split('$').length; i++) {

                var arr = data.split('$')[i].split('|');
                s += '<tr>';

                arrselectedtreatment.push(arr[1]);
                arrdoctorname.push(arr[8]);
                arrrefdoctorname.push(arr[16]);
                arrpaymode.push(arr[13]);


                if (_isOwnerDr == true) {
                    s += '<td>' + (i + 1) + '</td>';
                    s += '<td>' + arr[2] + '</td>';
                    s += '<td><a class="_lnkBtn" href="./DentalSoft/TreatmentCard?PId=' + arr[12] + '">' + arr[0] + '</a></td>';
                    s += '<td class="clsMobileNumber">' + arr[13] + '</td>';

                    s += '<td>' + arr[8] + '</td>';
                    s += '<td>' + arr[1] + '</td>';
                    s += '<td>' + arr[3] + '</td>';
                    s += '<td>' + arr[4] + '</td>';
                } else {
                    if ($("#ddlPatientRefferedBy").val() != '0' && $("#ddlPatientRefferedBy").val() != '') {
                        s += '<td>' + (i + 1) + '</td>';
                        s += '<td>' + arr[2] + '</td>';
                        s += '<td><a class="_lnkBtn" style="color:blue" href="./DentalSoft/TreatmentCard?PId=' + arr[12] + '">' + arr[0] + '</a></td>';
                        s += '<td>' + arr[1] + '</td>';
                        s += '<td>' + arr[4] + '</td>';
                        s += '<td>' + arr[10] + '</td>';
                        s += '<td>' + arr[14] + ' (' + arr[15] + '%)</td>';
                        s += '<td>' + (parseFloat(arr[10]) - parseFloat(arr[14])) + '</td>';

                    } else {
                        s += '<td>' + (i + 1) + '</td>';
                        s += '<td>' + arr[2] + '</td>';
                        s += '<td><a class="_lnkBtn" style="color:blue" href="./DentalSoft/TreatmentCard?PId=' + arr[12] + '">' + arr[0] + '</a></td>';
                        s += '<td>' + arr[1] + '</td>';
                        s += '<td>' + arr[4] + '</td>';
                        s += '<td>' + arr[10] + '</td>';
                        s += '<td>' + arr[9] + ' (' + arr[11] + ')</td>';
                        s += '<td>' + (parseFloat(arr[10]) - parseFloat(arr[9])) + '</td>';
                    }

                    a1 += parseFloat(arr[10]);
                    a2 += parseFloat(arr[9]);
                    a3 += parseFloat((parseFloat(arr[10]) - parseFloat(arr[9])));

                }
                s += '</tr>';

                t += parseFloat(arr[3]);

                if (i == 0) {
                    cramt = parseFloat((arr[5] == '' ? 0 : arr[5]));
                    dramt = parseFloat((arr[6] == '' ? 0 : arr[6]));
                    balamt = parseFloat((arr[7] == '' ? 0 : arr[7]));
                }
            }

            if (_isOwnerDr == true) {
                s += '<tr>';
                s += '<td></td>';
                s += '<td></td>';
                s += '<td class="clsMobileNumber"></td>';
                s += '<td></td>';
                s += '<td></td>';
                s += '<td><strong>Total</strong></td>';
                s += '<td><strong>' + t + '</strong></td>';
                s += '<td></td>';
                s += '</tr>';
            }
            else {
                if ($("#ddlPatientRefferedBy").val() != '0' && $("#ddlPatientRefferedBy").val() != '') {
                    s += '<tr>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td><strong>Total</strong></td>';
                    s += '<td><strong>' + a1 + '</strong></td>';
                    s += '<td><strong>' + a2 + '</strong></td>';
                    s += '<td><strong>' + a3 + '</strong></td>';
                    s += '</tr>';
                } else {

                    s += '<tr>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td></td>';
                    s += '<td><strong>Total</strong></td>';
                    s += '<td><strong>' + a1 + '</strong></td>';
                    s += '<td><strong>' + a2 + '</strong></td>';
                    s += '<td><strong>' + a3 + '</strong></td>';
                    s += '</tr>';
                }

            }

            if (_isOwnerDr == true) {
                $("#tblValue").html(s);
            } else {
                $("#tblDcotorValue").html(s);
            }

            if ($("#ddlPayType").val() == 'Pendings') {
                $(".clsMobileNumber").show();
            } else {
                $(".clsMobileNumber").hide();
            }

            $("#txtTotalCredits").val(cramt);
            $("#txtTotalDebits").val(dramt);
            $("#txtTotalPendings").val(balamt);
            calTotalAmounts();
        }
        else {
            var cramt = 0; var dramt = 0; var balamt = 0;

            for (var i = 0; i < data.split('$').length; i++) {
                var arr = data.split('$')[i].split('|');
                var b = parseFloat((arr[1] == '' ? 0 : arr[1])) - parseFloat((arr[2] == '' ? 0 : arr[2]));
                s += '<tr>';
                s += '<td>' + (i + 1) + '</td>';
                s += '<td>' + arr[0] + '</td>';
                s += '<td>' + arr[1] + '</td>';
                s += '<td>' + arr[2] + '</td>';
                s += '<td>' + b + '</td>';
                s += '</tr>';

                cramt += parseFloat((arr[0] == '' ? 0 : arr[0]));
                dramt += parseFloat((arr[1] == '' ? 0 : arr[1]));
                balamt += b;
            }
            $("#tblDayValue").html(s);
            //$("#txtTotalCredits").val(cramt);
            //$("#txtTotalDebits").val(dramt);
            //$("#txtTotalPendings").val(dramt);
            calTotalAmounts();
        }

       
        arrselectedtreatment = removeDuplicates(arrselectedtreatment);
        arrdoctorname = removeDuplicates(arrdoctorname);
        arrrefdoctorname = removeDuplicates(arrrefdoctorname);
        arrpaymode = removeDuplicates(arrpaymode);

        $("#ddlDoctors option").each(function () {
            if ($(this).val() != 0) { $(this).hide(); }
            for (var i = 0; i < arrdoctorname.length; i++) {
                if ($(this).text() == arrdoctorname[i]) { $(this).show(); }
            }
        });
        $("#ddlTreatments option").each(function () {
            if ($(this).val() != 0) { $(this).hide(); }
            for (var i = 0; i < arrselectedtreatment.length; i++) {
                if ($(this).text() == arrselectedtreatment[i]) { $(this).show(); }
            }
        });

        $("#ddlPatientRefferedBy option").each(function () {
            if ($(this).val() != 0) { $(this).hide(); }
            for (var i = 0; i < ddlModeOfPayment.length; i++) {
                if ($(this).text() == ddlModeOfPayment[i]) { $(this).show(); }
            }
        });

        $("#ddlTreatments option").each(function () {
            if ($(this).val() != 0) { $(this).hide(); }
            for (var i = 0; i < arrselectedtreatment.length; i++) {
                if ($(this).text() == arrselectedtreatment[i]) { $(this).show(); }
            }
        });
    }
    else if (context == 'IsDoctorOwner') {
        if (data.split('|')[0] == 'Admin' || data.split('|')[0] == 'Payroll') {
        //if (data.split('|')[0] == 'Admin') {
            $("#tblDoctorRecordView").hide();
            $("#tblRecordView").show();
            $("#tblOtherView").hide();
            _isOwnerDr = true;
        } else {
            $("#tblDoctorRecordView").show();
            $("#tblRecordView").hide();
            $("#tblOtherView").hide();
            _isOwnerDr = false;
        }

        fn_RefreshTable();
    }
}

function removeDuplicates(arr) {
    return arr.filter((item,
        index) => arr.indexOf(item) === index);
}

function exportTableToExcel(tableID, filename = '') {
    var downloadLink;
    var dataType = 'application/vnd.ms-excel';
    var tableSelect = document.getElementById(tableID);
    var tableHTML = tableSelect.outerHTML.replace(/ /g, '%20');

    // Specify file name
    filename = filename ? filename + '.xls' : 'excel_data.xls';

    // Create download link element
    downloadLink = document.createElement("a");

    document.body.appendChild(downloadLink);

    if (navigator.msSaveOrOpenBlob) {
        var blob = new Blob(['\ufeff', tableHTML], {
            type: dataType
        });
        navigator.msSaveOrOpenBlob(blob, filename);
    } else {
        // Create a link to the file
        downloadLink.href = 'data:' + dataType + ', ' + tableHTML;

        // Setting the file name
        downloadLink.download = filename;

        //triggering the function
        downloadLink.click();
    }
}