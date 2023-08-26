var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid");
var _LabID = 0, _LabPayID = 0, _MaterialID = 0, _MaterialPayId = 0, _MainWorkID = 0, _SalaryId = 0, _ConsumeId = 0;
var TabName = 'LabRecord'; var _ConsultingDr = 0;

$(document).ready(function () {
    $("#liLabRecord").click(function () { TabName = 'LabRecord'; fn_FillLabRecords(); });
    $("#liMaterialRecord").click(function () { TabName = 'MaterialRecord'; fn_FillMaterialRecords(); });
    $("#liMaintenanceRecord").click(function () { TabName = 'MaintenanceRecord'; fn_FillMainWorkRecords(); });
    $("#liSalaryRecord").click(function () { TabName = 'SalaryRecord'; fn_FillSalaryRecords(); });
    $("#liConsumeMaterial").click(function () { TabName = 'ConsumeMaterial'; fn_FillConsumeMaterials(); $("#txtCM_Date").val(_GlobalPatHistory.CurrentDateYMD); });
    $("#liStockHistory").click(function () { TabName = 'StockHistory'; fn_FillStockMaterials(); });
    $("#liConsultingFee").click(function () { TabName = 'ConsultingFee'; fn_FillConsultingDrInfo(); FillDropDown_JS(false, 'PaymentMode', 'ddlConsultingDrPayMode', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null); FillDropDown_JS(true, 'ConsultingDoctorlist', 'ddlConsultingDr', 0, _LocationId, 0, 1, 0, '--All--', false, [], 'Params', null); });
    FillDropDown_JS(false, 'PaymentMode', 'txtMaterialPayMode', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null);
    FillDropDown_JS(false, 'PaymentMode', 'txtLabPayPayMode', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null);

    var _CurrentDate = new Date();
    $("#txtFromDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtToDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    $("#txtMaterialFDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtMaterialTDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    $("#txtMR_FromDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtMR_ToDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    $("#txtSalary_FDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtSalary_TDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    $("#txtCM_FDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtCM_TDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    $("#txtConsultingDrFDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(1));
    $("#txtConsultingDrTDate").val(_CurrentDate.getFullYear() + '-' + DateDigitLen(_CurrentDate.getMonth() + 1) + '-' + DateDigitLen(lastdayofmonth(_CurrentDate.getFullYear(), _CurrentDate.getMonth())));

    
    if (typeof $qc.cookie("UserRoleID") != 'undefined' && $qc.cookie("UserRoleID") != '' && $qc.cookie("UserRoleID") != '0') {
        var _parentids = $qc.cookie("ParentIds");
        var _childids = $qc.cookie("ChildIds");
        $(".clsSubClinicRights").hide();

        //for (var i = 0; i < _parentids.split(',').length; i++) {
        //    $(".clsSubClinicRights[data-id='" + _parentids.split(',')[i] + "']").show();
        //}

        for (var i = 0; i < _childids.split(',').length; i++) {
            var _a = _childids.split(',')[i].split('-');
            $(".clsSubClinicRights[data-id='" + _a[0] + "'][data-tab='" + _a[1] + "']").show();
        }
    }

    /*Lab Records */


    $("#txtLabPayDate").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtExp_FDate").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtExp_TDate").val(_GlobalPatHistory.CurrentDateYMD);

    fn_FillLabRecords();

    $("#ddlLabs").change(function () { fn_FillLabRecords(); });
    $("#rdoLabRecord").click(function () { fn_FillLabRecords(); });
    $("#rdoLabPayments").click(function () { fn_FillLabRecords(); });

    FillDropDown_JS(true, 'LabMaster', 'ddlLabs', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'LabMaster', 'ddlLabs1', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    $("#btnSubmitLabRecord").click(function () {
        if ($("#txtLabPatName").val() == '' || $("#txtLabPatName").val() == '0') { alert('Select Mandatory'); return false; }
        var _objRecords = ["InsertUpdate", _LabID
            , $("#txtLabPatName").val()
            , $("#txtLAbMobileNo").val()
            , $("#txtLabWork").val()
            , $("#ddlLabs1").val()
            , $("#txtLabImpDate").val()
            , $("#txtLabSendDate").val()
            , $("#txtLabReceiveDate").val()
            , $("#txtLabInsertionDate").val()
            , $("#txtLabCharges").val()
            , _LocationId
            , _SubLocationId

        ];
        UpdateDataToDatabase(11, "UpdateLabRecords", _objRecords, "DentalParams");
    });

    $("#txtLabPatName").autocomplete({
        source: (request, response) => {

            GetAutoCompleteData({
                procid: 647,
                ParamPath: "params",
                params: 'patientlist|' + $("#txtLabPatName").val() + '|' + _LocationId,
                success: (data) => {
                    data = data.split("$");
                    response($.map(data, (item) => {
                        var val = item.split('|')[0];
                        var lbl = item.split('|')[1].split('_')[0];
                        var mobile = item.split('|')[1].split('_')[1];
                        return { label: lbl, val: val, defaultagent: lbl, mobile: mobile };
                    }));
                }
            });
        }, select: (e, i) => {
            $(e.target).attr('data-attr', i.item.val);
            $("#txtLAbMobileNo").val(i.item.mobile);
        }, minlength: 1
    });

    $("#txtMaterialName").autocomplete({
        source: (request, response) => {

            GetAutoCompleteData({
                procid: 647,
                ParamPath: "params",
                params: 'MaterialRecordsList|' + $("#txtMaterialName").val() + '|' + _LocationId,
                success: (data) => {
                    data = data.split("$");
                    response($.map(data, (item) => {
                        var val = item;
                        var lbl = item;

                        return { label: lbl, val: val, defaultagent: lbl };
                    }));
                }
            });
        }, select: (e, i) => {
            $(e.target).attr('data-attr', i.item.val);

        }, minlength: 1
    });

    $("#btnSubmitLabPayment").click(function () {
        if ($("#txtLabPayPaidAmt").val() == '' || $("#txtLabPayPaidAmt").val() == '0') { alert('Paid Payment is not Zero or empty!'); return false; }

        var _objRecords = ["UpdateLabPayment", _LabPayID, _LabID
            , $("#txtLabPayTotalAmt").val()
            , $("#txtLabPayPaidAmt").val()
            , $("#txtLabPayRemainingAmt").val()
            , $("#txtLabPayPayMode").val()
            , $("#txtLabPayTranHistory").val()
            , $("#txtLabPayDate").val()
            , _LocationId

        ];
        UpdateDataToDatabase(29, "UpdateLabPayments", _objRecords, "DentalParams");
    });

    /*Material Records*/

    FillDropDown_JS(true, 'DealerMaster', 'ddlDealers', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'DealerMaster', 'ddlDealers1', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    $("#ddlDealers").change(function () { fn_FillMaterialRecords(); });
    $("#rdoMaterialRecord").click(function () { fn_FillMaterialRecords(); });
    $("#rdoMaterialPayment").click(function () { fn_FillMaterialRecords(); });

    $("#btnSubmitMaterialRecords").click(function () {
        if ($("#ddlDealers1").val() == '0' || $("#txtMaterialName").val() == '') { alert('Select Mandatory'); return false; }

        var _objRecords = ["InsertUpdate", _MaterialID
            , $("#ddlDealers1").val()
            , $("#txtMaterialName").val()
            , $("#txtMaterialLabName").val()
            , $("#txtMaterialQty").val()
            , $("#txtMaterialCharges").val()
            , $("#txtMaterialDate").val()
            , $("#txtMaterialExpDate").val()
            , _LocationId
            , _SubLocationId

        ];
        UpdateDataToDatabase(32, "UpdateMaterialRecords", _objRecords, "DentalParams");
    });

    $("#btnSubmitMaterialPayment").click(function () {
        if ($("#txtMaterialPaidAmt").val() == '' || $("#txtMaterialPaidAmt").val() == '0') { alert('Paid Payment is not Zero or empty!'); return false; }

        var _objRecords = ["UpdatePayment", _MaterialPayId, _MaterialID
            , $("#txtMaterialTotalAmt").val()
            , $("#txtMaterialPaidAmt").val()
            , $("#txtMaterialRemainingAmt").val()
            , $("#txtMaterialPayMode").val()
            , $("#txtMaterialTranHistory").val()
            , $("#txtMaterialPayDate").val()
            , _LocationId

        ];
        UpdateDataToDatabase(31, "UpdateMaterialPayments", _objRecords, "DentalParams");
    });
    /*Maintanance Work Records*/

    $("#btnSubmitMaintainceWork").click(function () {
        if ($("#txtMR_Work").val() == '' || $("#txtMR_Charges").val() == '') { alert('fill all mandatory fields!'); return false; }

        var _objRecords = ["InsertUpdate", _MainWorkID
            , $("#txtMR_Work").val()
            , $("#txtMR_Charges").val()
            , $("#txtMR_Date").val()
            , _LocationId

        ];
        UpdateDataToDatabase(12, "UpdateMainWork", _objRecords, "DentalParams");
    });

    /*Salary Record Records*/
    $("#btnSubmitSalaryPaid").click(function () {
        if ($("#txtSalary_EmpName").val() == '' || $("#txtSalary_Charges").val() == '') { alert('fill all mandatory fields!'); return false; }

        var _objRecords = ["InsertUpdate", _SalaryId
            , $("#txtSalary_EmpName").val()
            , $("#txtSalary_Charges").val()
            , $("#txtSalary_Date").val()
            , _LocationId

        ];
        UpdateDataToDatabase(33, "UpdateSalaryRecord", _objRecords, "DentalParams");
    });

    /*Consume Materials Records*/
    FillDropDown_JS(true, 'MaterialRecordsWithExp', 'ddlMaterialName', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    $("#ddlMaterialName").change(function () {
        if (this.value == '' || this.value == 0 || this.value == null) { return false; }
        var objRecords = ["getMaterialQty", this.value, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(37, 'GetMaterialBalanceQty', objRecords, 'DentalParams');
    });

    $("#btnSubmitConsumeMaterial").click(function () {
        if ($("#ddlMaterialName").val() == null || $("#ddlMaterialName").val() == '0') { alert('fill all mandatory fields!'); return false; }
        if ($("#txtCM_ConsumeQty").val() == '' || $("#txtCM_ConsumeQty").val() == '0') { alert('Enter consume material!'); return false; }

        var _objRecords = ["InsertUpdate", _ConsumeId
            , $("#ddlMaterialName").val()
            , $("#txtCM_ConsumeQty").val()
            , $("#txtCM_Date").val()
            , _LocationId
            , $qc.Cookie("username")
        ];
        UpdateDataToDatabase(36, "UpdateConsumeMaterials", _objRecords, "DentalParams");
    });

    /*Consulting Dr*/
    $("#txtConsultingDrPayDate").val(_GlobalPatHistory.CurrentDateYMD);

    $("#rdoConsultingDrRecord").click(function () { fn_FillConsultingDrInfo(); });
    $("#rdoConsultingDrPayment").click(function () { fn_FillConsultingDrInfo(); });

    $("#btnSubmitConsultingDrPayment").click(function () {
        if ($("#txtConsultingDrPaidAmt").val() == '' || $("#txtConsultingDrPaidAmt").val() == '0') {
            alert('Paid Payment is not Zero or empty!'); return false;
        }
        if (parseInt($("#txtConsultingDrPaidAmt").val()) > parseInt($("#txtConsultingDrTotalAmt").val())) {
            alert('Paid Payment is not greator than total amount!'); return false;
        }

        var _objRecords = ["UpdatePayment", 0, _ConsultingDr
            , $("#txtConsultingDrTotalAmt").val()
            , $("#txtConsultingDrPaidAmt").val()
            , $("#txtConsultingDrRemainingAmt").val()
            , $("#ddlConsultingDrPayMode").val()
            , $("#txtConsultingDrTranHistory").val()
            , $("#txtConsultingDrPayDate").val()
            , _LocationId

        ];
        UpdateDataToDatabase(64, "UpdateConsultingDrPayments", _objRecords, "DentalParams");
    });

});

function lastdayofmonth(y, m) {
    return new Date(y, m + 1, 0).getDate();
}

function calculatetotalmaterialcharges() {
    var charges = parseFloat($("#txtMaterialCharges").val());
    var qty = parseFloat($("#txtMaterialQty").val());
    $("#txtTotalMaterialCharges").val(parseFloat(charges * qty).toFixed(2));
}

function onGetDataSuccess(data, context) {
    /*Lab Records*/
    if (context == 'UpdateLabRecords') {
        alert('Record Submit Successfully');
        fn_FillLabRecords();
        fn_ClearLabRecords();

    }
    else if (context == 'FillLabGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Patient Name', 'Mobile', 'Lab Work', 'Lab Name', 'ImpressionDate', 'SendDate', 'ReceivedDate', 'InsertionDate', 'Lab Charges', 'Action#AddNewLabRecords'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4, 5, 6, 7, 8, 9, 10],
            IsActionButton: ['Edit', 'Delete', 'Print'],
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
    else if (context == 'FillLabPaymentGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Lab Name', 'Total amt to be paid', 'Paid Amount', 'Balance Amount', 'Action'],
            dataArr: [],
            width: [25, 250, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5],
            IsActionButton: ['PayNow'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '10',
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
    else if (context == 'FillLabPaymentHistory') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'Lab Name', 'Payment Date', 'Paid Amount', 'PayMode', 'Tran. History', 'Action'],
            dataArr: [],
            width: [25, 25, 250, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4, 5, 6],
            IsActionButton: ['Edit', 'Delete', 'Print'],
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
        ctlDetails1 = new fn_arvGrid(objVarable);
        ctlDetails1.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails1.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'GetLabDetails') {
        if (data == '') { return false; }
        $("#txtLabPatName").val(data.split('|')[1]);
        $("#txtLAbMobileNo").val(data.split('|')[2]);
        $("#txtLabWork").val(data.split('|')[3]);
        $("#ddlLabs1").val(data.split('|')[4]);
        $("#txtLabImpDate").val(data.split('|')[5]);
        $("#txtLabSendDate").val(data.split('|')[6]);
        $("#txtLabReceiveDate").val(data.split('|')[7]);
        $("#txtLabInsertionDate").val(data.split('|')[8]);
        $("#txtLabCharges").val(data.split('|')[9]);
        $("#mdlLabRecordsModal").modal('show');
    }
    else if (context == 'DeleteLabRecords') {

        fn_FillLabRecords();
        fn_ClearLabRecords();
    }
    else if (context == 'UpdateLabPayments') {
        $("#mdlLabPaymentMode").modal('hide');
        $("#txtLabPayTotalAmt").val(0);
        $("#txtLabPayPaidAmt").val(0);
        $("#txtLabPayRemainingAmt").val(0);
        $("#txtLabPayPayMode").val(0);
        $("#txtLabPayTranHistory").val(0);
        $("#txtLabPayDate").val(_GlobalPatHistory.CurrentDate);
        _LabPayID = 0;
        fn_FillLabRecords();
    }
    else if (context == 'GetPayDetails') {
        if (data == '') { return false; }
        $("#mdlLabPaymentMode").modal('show');
        $("#txtLabPayTotalAmt").val(data.split('|')[3]);
        $("#txtLabPayPaidAmt").val(data.split('|')[3]);
        $("#txtLabPayRemainingAmt").val(0);
        $("#txtLabPayPayMode").val(data.split('|')[4]);
        $("#txtLabPayTranHistory").val(data.split('|')[5]);
        $("#txtLabPayDate").val(data.split('|')[2]);

    }
    else if (context == 'DeleteLabPayments') {

        fn_FillLabRecords(); _LabPayID = 0; _LabID = 0;
    }

    /*Material Records*/
    if (context == 'UpdateMaterialRecords') {

        fn_FillMaterialRecords();
        fn_ClearMaterialRecords();

    }
    else if (context == 'FillMaterialGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '2',
            header: ['SNo',  'Date', 'Material Name', 'Dealer Name', 'Qty', 'Charges Per Qty', 'Total Charges', 'ExpiryDate', 'Action#AddNewMaterialRecords'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4, 6, 5, 7, 8],
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
    else if (context == 'FillMaterialPaymentGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '2',
            header: ['SNo', 'Dealer Name', 'Total amt to be paid', 'Paid Amount', 'Balance Amount', 'Action'],
            dataArr: [],
            width: [25, 250, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5],
            IsActionButton: ['PayNow'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '10',
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
    else if (context == 'FillMaterialPaymentHistory') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '3',
            header: ['SNo',  'Dealer Name', 'Payment Date', 'Paid Amount', 'PayMode', 'Tran. History', 'Action'],
            dataArr: [],
            width: [25, 25, 250, 0, 0, 0, 20],
            headerval: [1, 1,2, 3, 4, 5, 6],
            IsActionButton: ['Edit', 'Delete', 'Print'],
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
        ctlDetails1 = new fn_arvGrid(objVarable);
        ctlDetails1.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails1.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'GetMaterialDetails') {
        if (data == '') { return false; }
        $("#txtMaterialDate").val(data.split('|')[6]);
        $("#txtMaterialExpDate").val(data.split('|')[7]);
        $("#ddlDealers1").val(data.split('|')[1]);
        $("#txtMaterialName").val(data.split('|')[2]);
        $("#txtMaterialLabName").val(data.split('|')[3]);
        $("#txtMaterialQty").val(data.split('|')[4]);
        $("#txtMaterialCharges").val(data.split('|')[5]);
        var charges = parseFloat(data.split('|')[5] == '' ? 0 : data.split('|')[5]);
        var qty = parseFloat(data.split('|')[4] == '' ? 0 : data.split('|')[4]);
        $("#txtTotalMaterialCharges").val(charges * qty);

        $("#mdlMaterialRecordsModal").modal('show');
    }
    else if (context == 'DeleteMaterialRecords') {

        fn_FillMaterialRecords();
        fn_ClearMaterialRecords();
    }
    else if (context == 'UpdateMaterialPayments') {
        $("#mdlMaterialPaymentMode").modal('hide');
        $("#txtMaterialTotalAmt").val(0);
        $("#txtMaterialPaidAmt").val(0);
        $("#txtMaterialRemainingAmt").val(0);
        $("#txtMaterialPayMode").val(0);
        $("#txtMaterialTranHistory").val(0);
        $("#txtMaterialPayDate").val(_GlobalPatHistory.CurrentDateYMD);
        _MaterialID = 0;
        fn_FillMaterialRecords();
    }
    else if (context == 'GetMaterialPayDetails') {
        if (data == '') { return false; }
        $("#mdlMaterialPaymentMode").modal('show');
        $("#txtMaterialTotalAmt").val(data.split('|')[3]);
        $("#txtMaterialPaidAmt").val(data.split('|')[3]);
        $("#txtMaterialRemainingAmt").val(0);
        $("#txtMaterialPayMode").val(data.split('|')[4]);
        $("#txtMaterialTranHistory").val(data.split('|')[5]);
        $("#txtMaterialPayDate").val(data.split('|')[2]);

    }
    else if (context == 'DeleteMaterialPayments') {

        fn_FillMaterialRecords(); _MaterialPayId = 0; _MaterialID = 0;
    }

    /*Maintaince Records*/
    if (context == 'UpdateMainWork') {

        fn_FillMainWorkRecords();
        fn_ClearMainWorkRecords();

    }
    else if (context == 'FillMainWork') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '4',
            header: ['SNo',  'Date', 'Maintaince Work', 'Charges', 'Action#AddNewMainRecords'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
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
    else if (context == 'GetMainWorkDetails') {
        if (data == '') { return false; }
        $("#txtMR_Date").val(data.split('|')[1]);
        $("#txtMR_Work").val(data.split('|')[2]);
        $("#txtMR_Charges").val(data.split('|')[3]);


        $("#mdlMaintenanceRecordsModal").modal('show');
    }
    else if (context == 'DeleteMainWorkRecords') {

        fn_FillMainWorkRecords();
        fn_ClearMainWorkRecords();
    }

    /*Salary Records*/
    if (context == 'UpdateSalaryRecord') {

        fn_FillSalaryRecords();
        fn_ClearSalaryRecords();

    }
    else if (context == 'FillSalaryRecord') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '5',
            header: ['SNo', 'Date', 'Employee Name', 'Paid Charges', 'Action#AddNewSalaryRecords'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4],
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
    else if (context == 'GetSalaryRecordDetails') {
        if (data == '') { return false; }
        $("#txtSalary_Date").val(data.split('|')[1]);
        $("#txtSalary_EmpName").val(data.split('|')[2]);
        $("#txtSalary_Charges").val(data.split('|')[3]);


        $("#mdlSalaryRecordsModal").modal('show');
    }
    else if (context == 'DeleteSalaryRecords') {

        fn_FillSalaryRecords();
        fn_ClearSalaryRecords();
    }

    /*Consume Materials*/
    if (context == 'GetMaterialBalanceQty') {
        if (data == '') { return false; }

        $("#txtCM_ExpiryDate").val(data.split('|')[1]);
        $("#txtCM_ExpiryLeftDays").val(data.split('|')[2]);
        $("#txtCM_TotalQty").val(data.split('|')[3]);
        $("#txtCM_UsedQty").val(data.split('|')[4]);
        $("#txtCM_BalanceQty").val(parseInt((data.split('|')[3] == '' ? 0 : data.split('|')[3])) - parseInt((data.split('|')[4] == '' ? 0 : data.split('|')[4])));

    }
    else if (context == 'UpdateConsumeMaterials') {

        fn_FillConsumeMaterials();
        fn_ClearConsumeMaterials();
    }
    else if (context == 'FillConsumeMaterial') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '6',
            header: ['SNo',  'Date', 'Materials Name', 'Qty', 'User Name', 'Action#AddNewCM'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4, 5, 6],
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
    else if (context == 'FillStockMaterial') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '7',
            header: ['SNo', 'Materials Name', 'Total Stock', 'Used Stock', 'Bal Stock', 'Expiry Date', 'Left Days'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5, 6],
            IsActionButton: null,
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

    else if (context == 'getConsumeMaterial') {
        if (data == '') { return false; }
        $("#txtCM_Date").val(data.split('|')[1]);
        $("#ddlMaterialName").val(data.split('|')[2]);
        $("#txtCM_BalanceQty").val(data.split('|')[3]);
        $("#txtCM_ConsumeQty").val(data.split('|')[4]);
        $("#mdlConsumeMaterialModal").modal('show');
    }
    else if (context == 'DeleteConsumeMaterials') {

        fn_FillConsumeMaterials();
        fn_ClearConsumeMaterials();
    }

    /*Consulting Dr*/
    if (context == 'GridConsultingDr') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '9',
            header: ['SNo', 'Doctor Name', 'Total Charges', 'Paid Charges', 'Balance Charges', 'Action'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1,  2, 3, 4, 5],
            IsActionButton: ['PayNow'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '5',
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
    else if (context == 'UpdateConsultingDrPayments') {
        if (data == '' || data == '0') { alert('Try Again'); return false; }

        var JSONPath = {
            "Proc": 65,
            "Params": 'Doctor Payment SMS|0|0|' + data + '|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "PatientRegistrationMsg");


        fn_ClearConsultingDrRecords();
        fn_FillConsultingDrInfo();
    }
    else if (context == 'FillConsultingDrPaymentHistory') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '10',
            header: ['SNo', 'Dcotor Name', 'Payment Date', 'Paid Amount', 'PayMode', 'Tran. History', 'Action'],
            dataArr: [],
            width: [25, 25, 250, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6],
            IsActionButton: ['Delete', 'Print'],
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '10',
            SortType: [1, 1, 2, 2, 2, 2, 2, 2],
            header_align: ['', '', '', '', '', ''],
            chkVal: 1,
            advSearch: true,
            IsLinkButton: false,
            LinkButtonColumns: [2],
            objectJSON: _objGridResult
        }
        ctlDetails1 = new fn_arvGrid(objVarable);
        ctlDetails1.FillGrid(3, 1, 0);

        $(".clsDefaultSorting").attr('title', 1);
        $(".clsDefaultSorting").addClass('desending');
        $(".clsDefaultSorting").removeClass('ascending');
        ctlDetails1.AscendingDescendingArr($(".clsDefaultSorting"));
    }
    else if (context == 'DeleteConsultingDr') {
        fn_FillConsultingDrInfo();
    }
    else if (context == 'FillConsultingDrGrid') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '9',
            header: ['SNo', 'Date', 'Patient Name', 'Treatement Name', 'Doctor Name', 'Mode of Payment', 'Credited Amount', 'Consultatnt Amount', 'Admin Amount'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 9, 5, 6, 7, 8],
            IsActionButton: null,
            isTools: false,
            checkbox: false,
            IsAddBlankRow: false,
            ColumnShow: [],
            DefaultRow: '10',
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

}

function changeLabPayDetails() {
    var total = parseFloat($("#txtLabPayTotalAmt").val());
    var paid = parseFloat($("#txtLabPayPaidAmt").val());
    $("#txtLabPayRemainingAmt").val(total - paid);

}

function changeMaterialDetails() {
    var total = parseFloat($("#txtMaterialTotalAmt").val());
    var paid = parseFloat($("#txtMaterialPaidAmt").val());
    $("#txtMaterialRemainingAmt").val(total - paid);
}

function changeConsultingDrDetails() {
    var total = parseFloat($("#txtConsultingDrTotalAmt").val());
    var paid = parseFloat($("#txtConsultingDrPaidAmt").val());
    $("#txtConsultingDrRemainingAmt").val(total - paid);
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'AddNewLabRecords') {
        fn_ClearLabRecords();

        $("#ddlLabs1").val(rtnCtrlVal('ddlLabs', '0'));
        $("#mdlLabRecordsModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewLabPayment') {
        $("#mdlLabPaymentModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewMaterialRecords') {
        fn_ClearMaterialRecords();
        $("#ddlDealers1").val(rtnCtrlVal('ddlDealers', '0'));
        $("#mdlMaterialRecordsModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewMainRecords') {
        $("#mdlMaintenanceRecordsModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewSalaryRecords') {
        $("#mdlSalaryRecordsModal").modal('show');
    }
    else if ($(_o).attr('data-ctrl') == 'AddNewCM') {
        $("#mdlConsumeMaterialModal").modal('show');
    }
}

function btnPayNowAction_Click(_oBtn) {
    if (TabName == 'LabRecord') {
        _LabPayID = 0;
        _LabID = $(_oBtn).attr('data-id');
        var balamt = $($($(_oBtn).parents('tr.btmbdr')[0]).children()[4]).text();
        $("#txtLabPayTotalAmt").val(balamt);
        $("#txtLabPayPaidAmt").val(balamt);
        $("#txtLabPayRemainingAmt").val(0);
        $("#mdlLabPaymentMode").modal('show');
    }
    else if (TabName == 'MaterialRecord') {
        _MaterialPayId = 0;
        _MaterialID = $(_oBtn).attr('data-id');
        var balamt = $($($(_oBtn).parents('tr.btmbdr')[0]).children()[4]).text();
        $("#txtMaterialTotalAmt").val(balamt);
        $("#txtMaterialPaidAmt").val(balamt);
        $("#txtMaterialRemainingAmt").val(0);
        $("#mdlMaterialPaymentMode").modal('show');
    }
    else if (TabName == 'ConsultingFee') {

        _ConsultingDr = $(_oBtn).attr('data-id');
        var balamt = $($($(_oBtn).parents('tr.btmbdr')[0]).children()[4]).text();
        $("#txtConsultingDrTotalAmt").val(balamt);
        $("#txtConsultingDrPaidAmt").val(balamt);
        $("#txtConsultingDrRemainingAmt").val(0);
        $("#mdlConsultingDrPaymentMode").modal('show');
    }
}

function btnEditAction_Click(_oBtn) {
    if (TabName == 'LabRecord') {

        if ($("#rdoLabPayments").prop("checked") == true) {
            _LabPayID = $(_oBtn).attr('data-id');
            var objRecords = ["getPayHistory", _LabPayID, _LocationId, _SubLocationId, ""];
            GetDataFromDatabase(28, 'GetPayDetails', objRecords, 'DentalParams');
        } else {
            _LabID = $(_oBtn).attr('data-id');
            var objRecords = ["GetLabRecords", _LabID, _LocationId, _SubLocationId, ""];
            GetDataFromDatabase(28, 'GetLabDetails', objRecords, 'DentalParams');
        }
    }
    else if (TabName == 'MaterialRecord') {
        if ($("#rdoMaterialPayment").prop("checked") == true) {
            _MaterialPayId = $(_oBtn).attr('data-id');
            var objRecords = ["getPayHistory", _MaterialPayId, _LocationId, _SubLocationId, ""];
            GetDataFromDatabase(30, 'GetMaterialPayDetails', objRecords, 'DentalParams');
        } else {
            _MaterialID = $(_oBtn).attr('data-id');
            var objRecords = ["GetMaterialRecords", _MaterialID, _LocationId, _SubLocationId, ""];
            GetDataFromDatabase(30, 'GetMaterialDetails', objRecords, 'DentalParams');
        }
    } else if (TabName == 'MaintenanceRecord') {
        _MainWorkID = $(_oBtn).attr('data-id');
        var objRecords = ["getMainWork", _MainWorkID, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(34, 'GetMainWorkDetails', objRecords, 'DentalParams');
    } else if (TabName == 'SalaryRecord') {
        _SalaryId = $(_oBtn).attr('data-id');
        var objRecords = ["getSalaryRecords", _SalaryId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(35, 'GetSalaryRecordDetails', objRecords, 'DentalParams');
    }
    else if (TabName == 'ConsumeMaterial') {
        _ConsumeId = $(_oBtn).attr('data-id');
        var objRecords = ["getConsumeMaterial", _ConsumeId, _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(37, 'getConsumeMaterial', objRecords, 'DentalParams');
    }

}

function btnDeleteAction_Click(_oBtn) {
    if (TabName == 'LabRecord') {
        if ($("#rdoLabPayments").prop("checked") == true) {
            var _objRecords = ["DeleteLabPayment", $(_oBtn).attr('data-id'), _LocationId, ""];
            UpdateDataToDatabase(1, 'DeleteLabPayments', _objRecords, 'DentalParams');
        } else {
            _LabID = $(_oBtn).attr('data-id');
            var _objRecords = ["DeleteLabRecord", _LabID, _LocationId, ""];
            UpdateDataToDatabase(1, 'DeleteLabRecords', _objRecords, 'DentalParams');
        }
    }
    else if (TabName == 'MaterialRecord') {
        if ($("#rdoMaterialPayment").prop("checked") == true) {
            var _objRecords = ["DeleteMaterialPayment", $(_oBtn).attr('data-id'), _LocationId, ""];
            UpdateDataToDatabase(1, 'DeleteMaterialPayments', _objRecords, 'DentalParams');
        } else {
            _LabID = $(_oBtn).attr('data-id');
            var _objRecords = ["DeleteMaterialRecord", _LabID, _LocationId, ""];
            UpdateDataToDatabase(1, 'DeleteMaterialRecords', _objRecords, 'DentalParams');
        }
    }
    else if (TabName == 'MaintenanceRecord') {
        _MainWorkID = $(_oBtn).attr('data-id');
        var _objRecords = ["DeleteMainRecord", _MainWorkID, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteMainWorkRecords', _objRecords, 'DentalParams');
    }
    else if (TabName == 'SalaryRecord') {
        _SalaryId = $(_oBtn).attr('data-id');
        var _objRecords = ["DeleteSalaryRecord", _SalaryId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteSalaryRecords', _objRecords, 'DentalParams');
    }
    else if (TabName == 'ConsumeMaterial') {
        _ConsumeId = $(_oBtn).attr('data-id');
        var _objRecords = ["DelConsumeMaterial", _ConsumeId, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteConsumeMaterials', _objRecords, 'DentalParams');
    }
    else if (TabName == 'ConsultingFee') {
        _ConsultingDr = $(_oBtn).attr('data-id');
        var _objRecords = ["DelConsultingDr", _ConsultingDr, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteConsultingDr', _objRecords, 'DentalParams');
    }

}

function btnPrintAction_Click(_oBtn) {
    if (TabName == 'LabRecord') {
        _LabID = $(_oBtn).attr('data-id');
        fn_AngularRouting('./DentalSoft/PrintLabRecord?l=' + _LabID);
    }
    else if (TabName == 'ConsultingFee') {
        _ConsultingDr = $(_oBtn).attr('data-id');
        fn_AngularRouting('./DentalSoft/PrintReceiptConsultingDr?l=' + _ConsultingDr);
    }

}

function fn_FillLabRecords() {
    var Where = (typeof $("#ddlLabs").val() == 'undefined' || $("#ddlLabs").val() == null ? 0 : $("#ddlLabs").val());
    Where += '@' + $("#LabRecord_Datetype").val();
    Where += '@' + $("#txtFromDate").val();
    Where += '@' + $("#txtToDate").val();
    Where += '@' + $("#txtSearchLabRecord").val();


    if ($("#rdoLabRecord").prop("checked") == true) {
        $("#divLabPaymentHis").hide();
        var _objRecords = ["ListOfLabReords", "0", _LocationId, _SubLocationId, Where];
        GetDataFromDatabase(28, "FillLabGrid", _objRecords, "DentalParams");
    } else {
        $("#divLabPaymentHis").show();
        var _objRecords = ["GetLabPayments", "0", _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(28, "FillLabPaymentGrid", _objRecords, "DentalParams");

        var _objRecords = ["LapPayHistory", "0", _LocationId, _SubLocationId, Where];
        GetDataFromDatabase(28, "FillLabPaymentHistory", _objRecords, "DentalParams");
    }
}

function fn_ClearLabRecords() {
    _LabID = 0;
    $("#txtLabPatName").val('');
    $("#txtLAbMobileNo").val('');
    $("#txtLabWork").val('');
    $("#ddlLabs1").val(0);
    $("#txtLabImpDate").val('');
    $("#txtLabSendDate").val('');
    $("#txtLabReceiveDate").val('');
    $("#txtLabInsertionDate").val('');
    $("#txtLabCharges").val('');
    $("#mdlLabRecordsModal").modal('hide');
}

function fn_FillMaterialRecords() {
    var Where = (typeof $("#ddlDealers").val() == 'undefined' || $("#ddlDealers").val() == null ? 0 : $("#ddlDealers").val());
    Where += '@Expiry Date';
    Where += '@' + $("#txtMaterialFDate").val();
    Where += '@' + $("#txtMaterialTDate").val();
    Where += '@' + $("#txtSearchMaterialRecord").val();

    if ($("#rdoMaterialRecord").prop("checked") == true) {
        $("#divMaterialPaymentHis").hide();
        var _objRecords = ["ListOfMaterialReords", "0", _LocationId, _SubLocationId, Where];
        GetDataFromDatabase(30, "FillMaterialGrid", _objRecords, "DentalParams");
    } else {
        $("#divMaterialPaymentHis").show();
        var _objRecords = ["GetMaterialPayments", "0", _LocationId, _SubLocationId, ""];
        GetDataFromDatabase(30, "FillMaterialPaymentGrid", _objRecords, "DentalParams");

        var _objRecords = ["MaterialPayHistory", "0", _LocationId, _SubLocationId, Where];
        GetDataFromDatabase(30, "FillMaterialPaymentHistory", _objRecords, "DentalParams");
    }
}


function fn_FillConsultingDrInfo() {
    var Where = (typeof $("#ddlConsultingDr").val() == 'undefined' || $("#ddlConsultingDr").val() == null ? 0 : $("#ddlConsultingDr").val());
    Where += '@Expiry Date';
    Where += '@' + $("#txtConsultingDrFDate").val();
    Where += '@' + $("#txtConsultingDrTDate").val();
    Where += '@' + $("#txtSearchConsultingDrRecord").val();

    if ($("#rdoConsultingDrRecord").prop("checked") == true) {
        $("#divConsultingPaymentHis").hide();
        var _objRecords = ["ListOfConsultingDrReords", "0", _LocationId, _SubLocationId, Where];
        GetDataFromDatabase(30, "FillConsultingDrGrid", _objRecords, "DentalParams");
    } else {
        $("#divConsultingPaymentHis").show();
        var _objRecords = [_LocationId];
        GetDataFromDatabase(63, "GridConsultingDr", _objRecords, "DentalParams");

        var _objRecords = ["ConsultingDrPayHistory", "0", _LocationId, _SubLocationId, ''];
        GetDataFromDatabase(30, "FillConsultingDrPaymentHistory", _objRecords, "DentalParams");
    }
}

function fn_ClearMaterialRecords() {
    _MaterialID = 0;
    $("#txtMaterialDate").val(_GlobalPatHistory.CurrentDateYMD);
    //$("#txtMaterialExpDate").val(_GlobalPatHistory.CurrentDateYMD);
    $("#ddlDealers1").val(0);
    $("#txtMaterialName").val('');
    $("#txtMaterialLabName").val('');
    $("#txtMaterialQty").val(1);
    $("#txtMaterialCharges").val(0);
    $("#txtTotalMaterialCharges").val(0);

    $("#mdlMaterialRecordsModal").modal('hide');
}

function fn_ClearConsultingDrRecords() {
    _ConsultingDr = 0;
    $("#txtConsultingDrPayDate").val(_GlobalPatHistory.CurrentDateYMD);

    $("#txtConsultingDrTotalAmt").val(0);
    $("#txtConsultingDrPaidAmt").val(0);
    $("#txtConsultingDrRemainingAmt").val(0);
    $("#txtConsultingDrTranHistory").val('');

    $("#mdlConsultingDrPaymentMode").modal('hide');
}

function fn_FillMainWorkRecords() {
    var Where = $("#txtMR_FromDate").val();
    Where += '@' + $("#txtMR_ToDate").val();
    Where += '@' + $("#txtMRSearch").val();

    var _objRecords = ["ListOfMainWork", "0", _LocationId, _SubLocationId, Where];
    GetDataFromDatabase(34, "FillMainWork", _objRecords, "DentalParams");

}

function fn_ClearMainWorkRecords() {
    _MainWorkID = 0;
    $("#txtMR_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtMR_Work").val('');
    $("#txtMR_Charges").val('0');
    $("#mdlMaintenanceRecordsModal").modal('hide');
}

function fn_ClearSalaryRecords() {
    _SalaryId = 0;
    $("#txtSalary_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtSalary_EmpName").val('');
    $("#txtSalary_Charges").val('0');
    $("#mdlSalaryRecordsModal").modal('hide');
}

function fn_FillSalaryRecords() {
    var Where = $("#txtSalary_FDate").val();
    Where += '@' + $("#txtSalary_TDate").val();
    Where += '@' + $("#txtSalary_Search").val();

    var _objRecords = ["ListOfSalaryRecords", "0", _LocationId, _SubLocationId, Where];
    GetDataFromDatabase(35, "FillSalaryRecord", _objRecords, "DentalParams");

}

function fn_FillConsumeMaterials() {
    var Where = $("#txtCM_FDate").val();
    Where += '@' + $("#txtCM_TDate").val();
    Where += '@' + $("#txtCM_Search").val();

    var _objRecords = ["ListOfConsumeMaterial", "0", _LocationId, _SubLocationId, Where];
    GetDataFromDatabase(37, "FillConsumeMaterial", _objRecords, "DentalParams");

}

function fn_ClearConsumeMaterials() {
    _ConsumeId = 0;
    $("#txtCM_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtCM_BalanceQty").val('');
    $("#ddlMaterialName").val('0');
    $("#txtCM_ConsumeQty").val('0');

    $("#mdlConsumeMaterialModal").modal('hide');
}

function changeOfConsumeMaterial() {
    var bal = parseInt($("#txtCM_BalanceQty").val());
    var consume = parseInt($("#txtCM_ConsumeQty").val());
    if (consume > bal) {
        $("#txtCM_ConsumeQty").val(0);
        alert('Consume qty is not greator thane balance qty.');
    }

}


function fn_FillStockMaterials() {

    var Where = $("#txtExp_FDate").val();
    Where += '@' + $("#txtExp_TDate").val();
    Where += '@' + $("#txtExp_Search").val();

    var _objRecords = ["getStockHistory", "0", _LocationId, _SubLocationId, Where];
    GetDataFromDatabase(37, "FillStockMaterial", _objRecords, "DentalParams");
}
