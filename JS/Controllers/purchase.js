var _LocationId = $qc.cookie("locationid");
var _SMSID = 0, _WAID = 0, _SWID = 0;
var _SMSPerUnitcharges = 0.17;
var _validitydays = 365;
var _tabname = 'sms';


$(document).ready(function () {
    if ($qc.Cookie('usercategory') == 'clinic') { $(".clsAdminView").hide(); } else { $(".clsAdminView").show(); }

    FillDropDown_JS(false, 'SubClinicMaster', 'ddlClinicList', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'PaymentMode', 'ddlPayMode', 0, 0, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'PaymentMode', 'ddlWAPayMode', 0, 0, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'PaymentMode', 'ddlSWPayMode', 0, 0, 0, 1, null, null, false, [], 'Params', null);

    fillSMSGrid();

    $("#ddlClinicList").change(function () { _LocationId = $("#ddlClinicList").val(); });

    $("#btnPurchaseOnline").show(); $("#btnPurchaseWAOnline").hide(); $("#btnRenewSoftware").hide();
    $("#liSMS").click(function () { _tabname = 'sms'; $("#btnPurchaseOnline").show(); $("#btnPurchaseWAOnline").hide(); $("#btnRenewSoftware").hide(); fillSMSGrid(); });
    $("#liWA").click(function () { _tabname = 'wa'; $("#btnPurchaseOnline").hide(); $("#btnPurchaseWAOnline").show(); $("#btnRenewSoftware").hide(); fillWAGrid(); });
    $("#liSW").click(function () {
        _tabname = 'sw'; $("#btnPurchaseOnline").hide(); $("#btnPurchaseWAOnline").hide(); $("#btnRenewSoftware").show(); fillSWGrid();
        GetDataFromDatabase(47, "PrintDoctorInfoSW", "DoctorInfo|" + $qc.Cookie("locationid") + '', "DentalParams");

    });

    $("#btnSubmitSMS").click(function () {
        if (rtnCtrlVal('txtSMSQuantity', '0') == 0) { alert('Enter quantity'); return false; }
        if (rtnCtrlVal('ddlPayMode', '0') == 0) { alert('Select Paymode'); return false; }

        var objParam = [
            "InsertUpdate"
            , _SMSID
            , _LocationId
            , rtnCtrlVal('ddlServiceType', '')
            , rtnCtrlVal('ddlServiceName', '')
            , rtnCtrlVal('txtSMSQuantity', '0')
            , rtnCtrlVal('txtValidityDate', '')
            , _GlobalPatHistory.CurrentDateYMD
            , rtnCtrlVal('ddlPayMode', '0')
            , rtnCtrlVal('ddlPayHistory', '')
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , rtnCtrlVal('txtSMSCharges', '0')
            , rtnCtrlVal('txtSMSDiscCharges', '0')
            , rtnCtrlVal('txtSMSFinalCharges', '0')
            , rtnCtrlVal('txtSMSPaidCharges', '0')
            , rtnCtrlVal('ddlApproval', '0')
            , $qc.Cookie('username')

        ];
        UpdateDataToDatabase(70, 'SMSResponse', objParam, 'DentalParams');

    });

    $("#btnSubmitWA").click(function () {
        if (rtnCtrlVal('txtWAQuantity', '0') == 0) { alert('Enter quantity'); return false; }
        if (rtnCtrlVal('ddlWAPayMode', '0') == 0) { alert('Select Paymode'); return false; }

        var objParam = [
            "InsertUpdate"
            , _WAID
            , _LocationId
            , rtnCtrlVal('ddlWAServiceType', '')
            , rtnCtrlVal('ddlWAServiceName', '')
            , rtnCtrlVal('txtWAQuantity', '0')
            , rtnCtrlVal('txtWAValidityDate', '')
            , _GlobalPatHistory.CurrentDateYMD
            , rtnCtrlVal('ddlWAPayMode', '0')
            , rtnCtrlVal('ddlWAPayHistory', '')
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , rtnCtrlVal('txtWACharges', '0')
            , rtnCtrlVal('txtWADiscCharges', '0')
            , rtnCtrlVal('txtWAFinalCharges', '0')
            , rtnCtrlVal('txtWAPaidCharges', '0')
            , rtnCtrlVal('ddlWAApproval', '0')
            , $qc.Cookie('username')

        ];
        UpdateDataToDatabase(70, 'WAResponse', objParam, 'DentalParams');

    });

    $("#btnSubmitSW").click(function () {
        if (rtnCtrlVal('txtSWQuantity', '0') == 0) { alert('Enter quantity'); return false; }
        if (rtnCtrlVal('ddlSWPayMode', '0') == 0) { alert('Select Paymode'); return false; }

        var objParam = [
            "InsertUpdate"
            , _WAID
            , _LocationId
            , rtnCtrlVal('ddlSWServiceType', '')
            , rtnCtrlVal('ddlSWServiceName', '')
            , rtnCtrlVal('txtSWQuantity', '0')
            , rtnCtrlVal('txtSWValidityDate', '')
            , _GlobalPatHistory.CurrentDateYMD
            , rtnCtrlVal('ddlSWPayMode', '0')
            , rtnCtrlVal('ddlSWPayHistory', '')
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , rtnCtrlVal('txtSWCharges', '0')
            , rtnCtrlVal('txtSWDiscCharges', '0')
            , rtnCtrlVal('txtSWFinalCharges', '0')
            , rtnCtrlVal('txtSWPaidCharges', '0')
            , rtnCtrlVal('ddlSWApproval', '0')
            , $qc.Cookie('username')

        ];
        UpdateDataToDatabase(70, 'SWResponse', objParam, 'DentalParams');

    });

    $(".uplUploadSMSReceipt").change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#SMSReceiptImage').attr('src', e.target.result);

                $('#SMSReceiptImage').parent().attr('href', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#SMSReceiptImage').attr('src', 'images/receipt.png');
            $('#SMSReceiptImage').parent().attr('href', '#');
        }

    });

    $(".uplUploadWAReceipt").change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#WAReceiptImage').attr('src', e.target.result);

                $('#WAReceiptImage').parent().attr('href', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#WAReceiptImage').attr('src', 'images/receipt.png');
            $('#WAReceiptImage').parent().attr('href', '#');
        }

    });

    $(".uplUploadSWReceipt").change(function () {
        var input = this;
        var url = $(this).val();
        var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
        if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
            var reader = new FileReader();
            reader.onload = function (e) {
                $('#SWReceiptImage').attr('src', e.target.result);
                $('#SWReceiptImage').parent().attr('href', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
        else {
            $('#SWReceiptImage').attr('src', 'images/receipt.png');
            $('#SWReceiptImage').parent().attr('href', '#');
        }

    });


    $("#btnPurchaseOnline").click(function () {
        GetDataFromDatabase(47, "PrintDoctorInfoSMS", "DoctorInfo|" + $qc.Cookie("locationid") + '', "DentalParams");

       
    });
    $("#btnPurchaseWAOnline").click(function () {
        GetDataFromDatabase(47, "PrintDoctorInfoWA", "DoctorInfo|" + $qc.Cookie("locationid") + '', "DentalParams");

       
    });
    $("#btnRenewSoftware").click(function () {
        GetDataFromDatabase(47, "PrintDoctorInfoSW", "DoctorInfo|" + $qc.Cookie("locationid") + '', "DentalParams");
        $("#mdlOnlineRenewSoftware").modal('show');
        
    });

    $("#ddlWACount").change(function () {
        var x = parseInt(this.value) / 1.60;
        document.getElementById("txtwacount").value = parseInt(x);
    });

});

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function fn_SearchGrid() {
    _LocationId = $("#ddlClinicList").val();
    if (_tabname == 'sms') {
        fillSMSGrid();
    } else if (_tabname == 'wa') {
        fillWAGrid();
    } else if (_tabname == 'sw') {
        fillSWGrid();
    }
}


function calculatesmscharges() {
    var _qty = parseInt(rtnCtrlVal('txtSMSQuantity', '0'));

    $("#txtSMSCharges").val(parseFloat(_SMSPerUnitcharges * _qty).toFixed(2));
    $("#txtSMSDiscCharges").val(0);
    $("#txtSMSFinalCharges").val($("#txtSMSCharges").val());
    $("#txtSMSPaidCharges").val($("#txtSMSCharges").val());
}

function calculatewacharges() {
    var _qty = parseInt(rtnCtrlVal('txtWAQuantity', '0'));

    $("#txtWACharges").val(parseFloat(_SMSPerUnitcharges * _qty).toFixed(2));
    $("#txtWADiscCharges").val(0);
    $("#txtWAFinalCharges").val($("#txtWACharges").val());
    $("#txtWAPaidCharges").val($("#txtWACharges").val());
}

function calculateswcharges() {
    var _qty = parseInt(rtnCtrlVal('txtSWQuantity', '0'));

    $("#txtSWCharges").val(parseFloat(_SMSPerUnitcharges * _qty).toFixed(2));
    $("#txtSWDiscCharges").val(0);
    $("#txtSWFinalCharges").val($("#txtSWCharges").val());
    $("#txtSWPaidCharges").val($("#txtSWCharges").val());
}

function onGetDataSuccess(data, context) {
    if (context == 'FillGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Service Type', 'Service Name', 'Qty', 'Validity', 'Paid Charges', 'Status', 'Action'],//#btnPurchaseSMS
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6, 7],
            IsActionButton: ['View'],
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
    else if (context == 'SMSResponse') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
        
        fn_UploadSMSTransactionHis(data);
        fillSMSGrid();
        fn_ClearSMSModal();
    }
    else if (context == 'getHistory') {
        if (data == '' || data == 0) { return false; }
        $('#ddlServiceType').val(data.split('|')[1]);
        $('#ddlServiceName').val(data.split('|')[2]);
        $('#txtSMSQuantity').val(data.split('|')[3]);
        $('#txtValidityDate').val(data.split('|')[4]);
        $('#ddlPayMode').val(data.split('|')[6]);
        $('#ddlPayHistory').val(data.split('|')[7]);
        $('#txtSMSCharges').val(data.split('|')[8]);
        $('#txtSMSDiscCharges').val(data.split('|')[9]);
        $('#txtSMSFinalCharges').val(data.split('|')[10]);
        $('#txtSMSPaidCharges').val(data.split('|')[11]);

        var url = RootFolderPath("PaymentHistory/" + _LocationId + "/" + data.split('|')[0] + "_SMSID.jpg?" + Math.random())
        if (urlExists(url)) {
            $('#SMSReceiptImage').attr('src', url);

            $('#SMSReceiptImage').parent().attr('href', url);
        }
    }
    else if (context == 'SMSResponseOnline') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
        $qc.setCookie("PaymentRefID", btoa(data + '_sms'));


        var a = parseFloat($("#ddlSMSCount").val());
        if (a == 1) {
            window.open('https://pmny.in/dILekgF4hhVy', '_top');
        } else if (a == 100) {
            window.open('https://pmny.in/6I9aKcKKj1f1', '_top');
        } else if (a == 300) {
            window.open('https://pmny.in/LriFTD3KygxM', '_top');
        } else if (a == 500) {
            window.open('https://pmny.in/GrNFPDmKdUv2', '_top');
        } else if (a == 1000) {
            window.open('https://pmny.in/xIPkbNOq6FlS', '_top');
        } else if (a == 1500) {
            window.open('https://pmny.in/BrTXiW9vlgFi', '_top');
        } else if (a == 2000) {
            window.open('https://pmny.in/WIGcieQwxobA', '_top');
        } else if (a == 3000) {
            window.open('https://pmny.in/or0Lbqo6LLl9', '_top');
        } else if (a == 5000) {
            window.open('https://pmny.in/wIhm9LTDBgwn', '_top');
        } else if (a == 10000) {
            window.open('https://pmny.in/vrELpqR67n6j', '_top');
        }
    }

    if (context == 'WAFillGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'Service Type', 'Service Name', 'Qty', 'Validity', 'Paid Charges', 'Status', 'Action'],//#btnPurchaseWA
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6, 7],
            IsActionButton: ['View'],
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
    else if (context == 'WAResponse') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
       
        fn_UploadWATransactionHis(data);
        fillWAGrid();
        fn_ClearWAModal();
    }
    else if (context == 'getWAHistory') {
        if (data == '' || data == 0) { return false; }
        $('#ddlWAServiceType').val(data.split('|')[1]);
        $('#ddlWAServiceName').val(data.split('|')[2]);
        $('#txtWAQuantity').val(data.split('|')[3]);
        $('#txtWAValidityDate').val(data.split('|')[4]);
        $('#ddlWAPayMode').val(data.split('|')[6]);
        $('#ddlWAPayHistory').val(data.split('|')[7]);
        $('#txtWADiscCharges').val(data.split('|')[9]);
        $('#txtWACharges').val(data.split('|')[8]);
        $('#txtWAFinalCharges').val(data.split('|')[10]);
        $('#txtWAPaidCharges').val(data.split('|')[11]);

        var url = RootFolderPath("PaymentHistory/" + _LocationId + "/" + data.split('|')[0] + "_WAID.jpg?" + Math.random())
        if (urlExists(url)) {
            $('#WAReceiptImage').attr('src', url);

            $('#WAReceiptImage').parent().attr('href', url);
        }
    }
    else if (context == 'WAResponseOnline') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
        $qc.setCookie("PaymentRefID", btoa(data + '_wa'));


        var a = parseFloat($("#ddlWACount").val());
        if (a == 2) {
            window.open('https://pmny.in/dILekgF4hhVy', '_top');
        } else if (a == 100) {
            window.open('https://pmny.in/6I9aKcKKj1f1', '_top');
        } else if (a == 300) {
            window.open('https://pmny.in/LriFTD3KygxM', '_top');
        } else if (a == 500) {
            window.open('https://pmny.in/GrNFPDmKdUv2', '_top');
        } else if (a == 1000) {
            window.open('https://pmny.in/xIPkbNOq6FlS', '_top');
        } else if (a == 1500) {
            window.open('https://pmny.in/BrTXiW9vlgFi', '_top');
        } else if (a == 2000) {
            window.open('https://pmny.in/WIGcieQwxobA', '_top');
        } else if (a == 3000) {
            window.open('https://pmny.in/or0Lbqo6LLl9', '_top');
        } else if (a == 5000) {
            window.open('https://pmny.in/wIhm9LTDBgwn', '_top');
        } else if (a == 10000) {
            window.open('https://pmny.in/vrELpqR67n6j', '_top');
        }
    }


    if (context == 'SWFillGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '2',
            header: ['SNo', 'Service Type', 'Service Name', 'Qty', 'Validity', 'Paid Charges', 'Status', 'Action'],//#btnPurchaseSW
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6, 7],
            IsActionButton: ['View'],
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
    else if (context == 'SWResponse') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
        
        fn_UploadSWTransactionHis(data);
        fillSWGrid();
        fn_ClearSWModal();
    }
    else if (context == 'getSWHistory') {
        if (data == '' || data == 0) { return false; }
        $('#ddlSWServiceType').val(data.split('|')[1]);
        $('#ddlSWServiceName').val(data.split('|')[2]);
        $('#txtSWSMSQuantity').val(data.split('|')[3]);
        $('#txtSWValidityDate').val(data.split('|')[4]);
        $('#ddlSWPayMode').val(data.split('|')[6]);
        $('#ddlSWPayHistory').val(data.split('|')[7]);
        $('#txtSWDiscCharges').val(data.split('|')[9]);
        $('#txtSWCharges').val(data.split('|')[8]);
        $('#txtSWFinalCharges').val(data.split('|')[10]);
        $('#txtSWPaidCharges').val(data.split('|')[11]);

        var url = RootFolderPath("PaymentHistory/" + _LocationId + "/" + data.split('|')[0] + "_SWID.jpg?" + Math.random())
        if (urlExists(url)) {
            $('#SWReceiptImage').attr('src', url);

            $('#SWReceiptImage').parent().attr('href', url);
        }
    }
    else if (context == 'SWResponseOnline') {
        if (data == '' || data == 0) { alert('Try Again'); return false; }
        $qc.setCookie("PaymentRefID", btoa(data + '_sw'));


        var a = parseFloat($("#ddlRenewalSoftware").val());
        if (a == 1) {
            window.open('https://pmny.in/dILekgF4hhVy', '_top');
        } else if (a == 100) {
            window.open('https://pmny.in/6I9aKcKKj1f1', '_top');
        } else if (a == 300) {
            window.open('https://pmny.in/LriFTD3KygxM', '_top');
        } else if (a == 500) {
            window.open('https://pmny.in/GrNFPDmKdUv2', '_top');
        } else if (a == 1000) {
            window.open('https://pmny.in/xIPkbNOq6FlS', '_top');
        } else if (a == 1500) {
            window.open('https://pmny.in/BrTXiW9vlgFi', '_top');
        } else if (a == 2000) {
            window.open('https://pmny.in/WIGcieQwxobA', '_top');
        } else if (a == 3000) {
            window.open('https://pmny.in/or0Lbqo6LLl9', '_top');
        } else if (a == 5000) {
            window.open('https://pmny.in/wIhm9LTDBgwn', '_top');
        } else if (a == 10000) {
            window.open('https://pmny.in/vrELpqR67n6j', '_top');
        }
    }

    else if (context == 'SMSCount') {
        if (data == '') { return false; }
        eval('var objCount=' + data);
        var _smscount = '';
        if (typeof objCount.TotalSMS != 'undefined') {
            _smscount += '<span>Total SMS</span>:' + objCount.TotalSMS;
            _smscount += '<span>Send SMS</span>:' + objCount.SendSMS;
            _smscount += '<span>Balance SMS</span>:<span id="spnsmscount">' + (parseInt(objCount.TotalSMS) - parseInt(objCount.SendSMS)) + '</span>';
        }
        $(".clsSMSCount").html(_smscount);
    }

    else if (context == 'WACount') {
        if (data == '') { return false; }
        if (data == '') { return false; }
        eval('var objCount=' + data);
        var _smscount = '';
        if (typeof objCount.TotalWA != 'undefined') {
            _smscount += '<span>Total WA</span>:' + objCount.TotalWA;
            _smscount += '<span>User/Days</span>:' + objCount.SendWA;
            _smscount += '<span>Balance Days</span>:<span id="spnwacount">' + (parseInt(objCount.TotalWA) - parseInt(objCount.SendWA))+'</span>';
        }
        $(".clsWACount").html(_smscount);
    }
    else if (context == 'PrintDoctorInfoSMS') {
        if (data == '') { return false; }
        eval('var objJSON='+data);
        $("#mdlOnlinePurchase").modal('show');
        $("#tdclinicname").html(objJSON[0].ClinicName);
        $("#spndoctorname").html(objJSON[0].DoctorName);
        $("#spnsmsbalance").html($("#spnsmscount").text());
        $("#spnmobile").html(objJSON[0].ContactNo1);
        $("#spnemail").html(objJSON[0].EmailID);
    }
    else if (context == 'PrintDoctorInfoWA') {
        if (data == '') { return false; }
        eval('var objJSON=' + data);
        $("#mdlOnlineWAPurchase").modal('show');
        $("#tdclinicnamewa").html(objJSON[0].ClinicName);
        $("#spndoctornamewa").html(objJSON[0].DoctorName);
        $("#spnwabalance").html($("#spnwacount").text());
        $("#spnmobilewa").html(objJSON[0].ContactNo1);
        $("#spnemailwa").html(objJSON[0].EmailID);
    }
    else if (context == 'PrintDoctorInfoSW') {
        if (data == '') { return false; }
        eval('var objJSON=' + data);
        
        $("#tdclinicnamesw").html(objJSON[0].ClinicName);
        $("#spndoctornamesw").html(objJSON[0].DoctorName);
        $("#spnswbalance").html(objJSON[0].LeftDays);
        $("#spnmobilesw").html(objJSON[0].ContactNo1);
        $("#spnemailsw").html(objJSON[0].EmailID);

        $("#spnswleftday").text(objJSON[0].LeftDays);
    }
}

function urlExists(url) {
    var http = new XMLHttpRequest();
    http.open('HEAD', url, false);
    http.send();
    return http.status != 404;
    //var isValid = false;
    //if (url != '') {
    //    $.ajax({
    //        url: url,
    //        type: "HEAD",
    //        async: false,
    //        success: function (data) {
    //            isValid = true;
    //        },
    //        error: function () {
    //            isValid = false;
    //        }
    //    });
    //}
    //return isValid;
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'btnPurchaseSMS') {
        fn_ClearSMSModal();

        var _d = new Date();
        _d = _d.addDays(_validitydays);
        $("#txtValidityDate").val(_d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate());
        $("#mdlPurchaseSMS").modal('show');

        
    }
    else if ($(_o).attr('data-ctrl') == 'btnPurchaseWA') {
        fn_ClearWAModal();

        var _d = new Date();
        _d = _d.addDays(_validitydays);
        $("#txtWAValidityDate").val(_d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate());
        $("#mdlPurchaseWA").modal('show');

       
    } else if ($(_o).attr('data-ctrl') == 'btnPurchaseSW') {
        fn_ClearSWModal();

        var _d = new Date();
        _d = _d.addDays(_validitydays);
        $("#txtSWValidityDate").val(_d.getFullYear() + '-' + (_d.getMonth() + 1) + '-' + _d.getDate());
        $("#mdlPurchaseSW").modal('show');

       
    }
}

function fn_ClearSMSModal() {
    _SMSID = 0;
    $("#mdlPurchaseSMS").modal('hide');
    $('#txtSMSQuantity').val(0);
    $('#txtValidityDate').val('');
    $('#ddlPayMode').val(0);
    $('#ddlPayHistory').val('');
    $('#txtSMSCharges').val(0);
    $('#txtSMSDiscCharges').val(0);
    $('#txtSMSFinalCharges').val(0);
    $('#txtSMSPaidCharges').val(0);

}

function fn_ClearWAModal() {
    _WAID = 0;
    $("#mdlPurchaseWA").modal('hide');
    $('#txtWAQuantity').val(0);
    $('#txtWAValidityDate').val('');
    $('#ddlWAPayMode').val(0);
    $('#ddlWAPayHistory').val('');
    $('#txtWACharges').val(0);
    $('#txtWADiscCharges').val(0);
    $('#txtWAFinalCharges').val(0);
    $('#txtWAPaidCharges').val(0);


}

function fn_ClearSWModal() {
    _SWID = 0;
    $("#mdlPurchaseSW").modal('hide');
    $('#txtSWQuantity').val(0);
    $('#txtSWValidityDate').val('');
    $('#ddlSWPayMode').val(0);
    $('#ddlSWPayHistory').val('');
    $('#txtSWCharges').val(0);
    $('#txtSWDiscCharges').val(0);
    $('#txtSWFinalCharges').val(0);
    $('#txtSWPaidCharges').val(0);


}

function btnView_Click(_oBtn) {
    if (_tabname == 'sms') {
        _SMSID = $(_oBtn).attr('data-id');
        $("#mdlPurchaseSMS").modal('show');
        var objParam = [
            "getHistory"
            , _SMSID
            , _LocationId
            , ''
            , ''
            , 0
            , ''
            , _GlobalPatHistory.CurrentDateDMY
            , 0
            , ''
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , 0
            , 0
            , 0
            , 0
            , 0
            , ''
        ];
        GetDataFromDatabase(70, 'getHistory', objParam, 'DentalParams');
    }
    else if (_tabname == 'wa') {
        _WAID = $(_oBtn).attr('data-id');
        $("#mdlPurchaseWA").modal('show');
        var objParam = [
            "getHistory"
            , _WAID
            , _LocationId
            , ''
            , ''
            , 0
            , ''
            , _GlobalPatHistory.CurrentDateDMY
            , 0
            , ''
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , 0
            , 0
            , 0
            , 0
            , 0
            , ''
        ];
        GetDataFromDatabase(70, 'getWAHistory', objParam, 'DentalParams');
    }
    else if (_tabname == 'sw') {
        _SWID = $(_oBtn).attr('data-id');
        $("#mdlPurchaseSW").modal('show');
        var objParam = [
            "getHistory"
            , _SWID
            , _LocationId
            , ''
            , ''
            , 0
            , ''
            , _GlobalPatHistory.CurrentDateDMY
            , 0
            , ''
            , $qc.Cookie('username')
            , $qc.Cookie('usercategory')
            , 0
            , 0
            , 0
            , 0
            , 0
            , ''
        ];
        GetDataFromDatabase(70, 'getSWHistory', objParam, 'DentalParams');
    }
}

function fillSMSGrid() {
    var objParam = [
        "FillGrid"
        , _SMSID
        , _LocationId
        , 'SMS'
        , ''
        , 0
        , ''
        , _GlobalPatHistory.CurrentDateDMY
        , 0
        , ''
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , 0
        , 0
        , 0
        , 0
        , 0
        , ''
    ];
    GetDataFromDatabase(70, 'FillGrid', objParam, 'DentalParams');

    /*get Counts*/
    var objParams = [
        _LocationId
        , 'SMSCount'
        , 0
    ];
    GetDataFromDatabase(71, 'SMSCount', objParams, 'DentalParams');

}

function fillWAGrid() {
    var objParam = [
        "FillGrid"
        , _SMSID
        , _LocationId
        , 'WA'
        , ''
        , 0
        , ''
        , _GlobalPatHistory.CurrentDateDMY
        , 0
        , ''
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , 0
        , 0
        , 0
        , 0
        , 0
        , ''
    ];
    GetDataFromDatabase(70, 'WAFillGrid', objParam, 'DentalParams');

    /*get Counts*/
    var objParams = [
        _LocationId
        , 'WACount'
        , 0
    ];
    GetDataFromDatabase(71, 'WACount', objParams, 'DentalParams');
}

function fillSWGrid() {
    var objParam = [
        "FillGrid"
        , _SMSID
        , _LocationId
        , 'SW'
        , ''
        , 0
        , ''
        , _GlobalPatHistory.CurrentDateDMY
        , 0
        , ''
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , 0
        , 0
        , 0
        , 0
        , 0
        , ''
    ];
    GetDataFromDatabase(70, 'SWFillGrid', objParam, 'DentalParams');


}

function fn_UploadSMSTransactionHis(_SMSID) {
    var input = this;
    var url = $(".uplUploadSMSReceipt").val();
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#SMSReceiptImage').attr('src', e.target.result);

            $('#SMSReceiptImage').parent().attr('href', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        $('#SMSReceiptImage').attr('src', 'images/receipt.png');
    }

    var fileUpload = $(".uplUploadSMSReceipt").get(0);
    var files = fileUpload.files;

    if (files.length > 0) {
        var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
        _SMSID = _SMSID + '_SMSID';
        var fileparams = { FolderName: "PaymentHistory/" + _LocationId, FileName: _SMSID, Extension: 'jpg' };
        UploadImage(files[0], 'SMSReceipt', fileparams);

    }
}

function fn_UploadWATransactionHis(_SMSID) {
    var input = this;
    var url = $(".uplUploadWAReceipt").val();
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#WAReceiptImage').attr('src', e.target.result);

            $('#WAReceiptImage').parent().attr('href', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        $('#WAReceiptImage').attr('src', 'images/receipt.png');
    }

    var fileUpload = $(".uplUploadWAReceipt").get(0);
    var files = fileUpload.files;

    if (files.length > 0) {
        //var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
        _SMSID = _SMSID + '_WAID';
        var fileparams = { FolderName: "PaymentHistory/" + _LocationId, FileName: _SMSID, Extension: 'jpg' };
        UploadImage(files[0], 'WAReceipt', fileparams);

    }
}

function fn_UploadSWTransactionHis(_SMSID) {
    var input = this;
    var url = $(".uplUploadSWReceipt").val();
    var ext = url.substring(url.lastIndexOf('.') + 1).toLowerCase();
    if (input.files && input.files[0] && (ext == "gif" || ext == "png" || ext == "jpeg" || ext == "jpg")) {
        var reader = new FileReader();
        reader.onload = function (e) {
            $('#SWReceiptImage').attr('src', e.target.result);

            $('#SWReceiptImage').parent().attr('href', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
    else {
        $('#SWReceiptImage').attr('src', 'images/receipt.png');
    }

    var fileUpload = $(".uplUploadSWReceipt").get(0);
    var files = fileUpload.files;

    if (files.length > 0) {
        //var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
        _SMSID = _SMSID + '_SWID';
        var fileparams = { FolderName: "PaymentHistory/" + _LocationId, FileName: _SMSID, Extension: 'jpg' };
        UploadImage(files[0], 'SWReceipt', fileparams);

    }
}

function fn_PayNow() {
    var objParam = [
        "InsertUpdate"
        , _SMSID
        , _LocationId
        , 'SMS'
        , 'RouteMobile'
        , rtnCtrlVal('txtsmscount', '0')
        , ''
        , _GlobalPatHistory.CurrentDateYMD
        , 0
        , 'Online'
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , rtnCtrlVal('ddlSMSCount', '0')
        , 0
        , rtnCtrlVal('ddlSMSCount', '0')
        , rtnCtrlVal('ddlSMSCount', '0')
        , 0
        , $qc.Cookie('username')

    ];
    UpdateDataToDatabase(70, 'SMSResponseOnline', objParam, 'DentalParams');


}

function fn_PayNowwa() {
    var objParam = [
        "InsertUpdate"
        , _SMSID
        , _LocationId
        , 'WA'
        , 'Oramo'
        , rtnCtrlVal('txtwacount', '0')
        , ''
        , _GlobalPatHistory.CurrentDateYMD
        , 0
        , 'Online'
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , rtnCtrlVal('ddlWACount', '0')
        , 0
        , rtnCtrlVal('ddlWACount', '0')
        , rtnCtrlVal('ddlWACount', '0')
        , 0
        , $qc.Cookie('username')

    ];
    UpdateDataToDatabase(70, 'WAResponseOnline', objParam, 'DentalParams');
}

function fn_PayNowsw() {
    var objParam = [
        "InsertUpdate"
        , _SMSID
        , _LocationId
        , 'SW'
        , 'Oramo'
        , rtnCtrlVal('txtLeftDays', '0')
        , ''
        , _GlobalPatHistory.CurrentDateYMD
        , 0
        , 'Online'
        , $qc.Cookie('username')
        , $qc.Cookie('usercategory')
        , rtnCtrlVal('ddlRenewalSoftware', '0')
        , 0
        , rtnCtrlVal('ddlRenewalSoftware', '0')
        , rtnCtrlVal('ddlRenewalSoftware', '0')
        , 0
        , $qc.Cookie('username')

    ];
    UpdateDataToDatabase(70, 'SWResponseOnline', objParam, 'DentalParams');
}

function fn_changesmsvalue(_o) {
    /*alert($(_o).val());*/
    var x = Math.round((((parseInt(_o.value) * 100) / 118) * 100) / 25);
    document.getElementById("txtsmscount").value = x;
    //$("#txtsmscount").val(x);
    //var x = document.getElementById("rs").value;
    //document.getElementById("sms").innerHTML = "You selected: " * x;
}
