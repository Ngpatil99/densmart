var _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid"), _UserName = $qc.Cookie("username");
var _rtnQuery = getQueryParams(document.location.search);
var _TabName = 'TreatCard';
var _PreRecordID = 0, _TreatmentCardId = 0, _StepId = 0, _PatTreatId = 0, _BalanceAmt = 0;
var _PatientId = _rtnQuery.PId;
var _objPrescTemplate = {};
var _PrescTab = 'ReadyPresc';

$(document).ready(function () {
    $("#txtPR_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtTreat_Date").val(_GlobalPatHistory.CurrentDateYMD);

    fn_RefreshTreatCard(); fn_FillTreatCard();
    FillDropDown_JS(true, 'Doctorlist', 'ddlDoctor', _PatientId, _LocationId, 0, 1, 0, "--Doctor--", false, [], 'Params', null);
    FillDropDown_JS(true, 'TreatmentList', 'ddlTreatments', _PatientId, _LocationId, 0, 1, 0, "--Treatment--", false, [], 'Params', null);
    FillDropDown_JS(false, 'Doctorlist', 'ddlDoctors1', 0, _LocationId, 0, 1, 0, "--Doctor--", false, [], 'Params', null);
    FillDropDown_JS(true, 'TreatmentList', 'ddlTreatments1', 0, _LocationId, 0, 1, 0, "--Treatment--", false, [], 'Params', null);
    FillDropDown_JS(false, 'PaymentMode', 'txtTreat_PayMode', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null);
    FillDropDown_JS(false, 'PaymentMode', 'txtTreatProcPayMode', 0, _LocationId, 0, 1, 0, "--PayMode--", false, [], 'Params', null);


    $("#liPrescRecords").click(function () { _PrescTab = 'ReadyPresc'; });
    $("#liCustPresc").click(function () { _PrescTab = 'CustomPresc'; });

    $("#liPreRecords").click(function () { _TabName = 'PreRecord'; fn_FillPreRecords(); });
    $("#liTreatCards").click(function () { _TabName = 'TreatCard'; fn_FillTreatCard(); });


    $("#uplImageUpload").change(function () {
        var fileUpload = $(this).get(0);
        var files = fileUpload.files;
        $("#spnImageLabel").html(files[0].name);
    });

    $("#uplFileUpload").change(function () {
        var fileUpload = $(this).get(0);
        var files = fileUpload.files;
        $("#spnFileLabel").html(files[0].name);
    });



    $("#btnwaitingpatient").click(function () {
        fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + $("#ddlwaitingpatient").val());
    });

    $("#btncheckinpatine").click(function () {
        fn_AngularRouting('./DentalSoft/TreatmentCard?PId=' + $("#ddlcheckinpatinet").val());
    });

    /* Pre Treatment Records */
    $("#btnSubmit_PR").click(function () {
        var _objParams = ["InsertPreRecords", _PreRecordID, _LocationId, _SubLocationId, _PatientId
            , $("#txtPR_Date").val()
            , $("#txtPR_CO").val()
            , $("#txtPR_HOPI").val()
            , $("#txtPR_OE").val()
            , $("#txtPR_ToothNo").val()
            , $("#txtPR_Investigation").val()
            , $("#txtPR_TreatAdvice").val()
            , $("#txtPR_Charges").val()

        ];
        UpdateDataToDatabase(39, "UpdateSubmitPR", _objParams, "DentalParams");
    });

    /* Treatment Cards */

    $("#btnSubmitTreamentCard").click(function () {
        if ($("#ddlDoctors1").val() == 0 || $("#ddlDoctors1").val() == null || $("#ddlDoctors1").val() == '') { alert('Selected doctor'); return false; }
        if ($("#ddlTreatments1").val() == 0 || $("#ddlTreatments1").val() == null || $("#ddlTreatments1").val() == '') { alert('Selected Treatment'); return false; }

        var _objParams = [_TreatmentCardId, _PatientId, _LocationId
            , $("#ddlTreatments1").val()
            , $("#ddlDoctors1").val()
            , $("#txtTreat_ToothNo").val()
            , $("#txtTreat_Date").val()
            , $("#txtTreat_Piece").val()
            , $("#txtTreat_WorkDone").val()
            , $("#txtTreat_TreatFees").val()
            , $("#txtTreat_Disc").val()
            , $("#txtTreat_TotalFee").val()
            , $("#txtTreat_ConFees").val()
            , $("#txtTreat_PaidFees").val()
            , $("#txtTreat_BalFees").val()
            , $("#txtTreat_PayMode").val()
            , $("#ddlPieceValue1").val()
            , $("#txtTreat_AdvFees").val()
            , $("#txtTreat_AdvAdjFees").val()
        ];
        UpdateDataToDatabase(40, "UpdateSubmitTreatmentCard", _objParams, "DentalParams");
    });

    $("#btnSubmitTreatProcedure").click(function () {
        if ($("#ddlDoctors2").val() == '') { alert('Select Doctor'); return false; }
        if (_PatientId == 0) { alert('Select Patient'); return false; }

        var _objParams = [_StepId, _PatTreatId, _PatientId, _LocationId
            , $("#txtTreatProcDate").val()
            , $("#ddlDoctors2").val()
            , $("#txtTreatProcPiece").val()
            , $("#txtTreatProcWorkdone").val()
            , $("#txtTreatProcConFee").val()
            , $("#txtTreatProcDiscount").val()
            , $("#txtTreatProcTotalFee").val()
            , $("#txtTreatProcPrevFee").val()
            , $("#txtTreatProcPaidFee").val()
            , $("#txtTreatProcBalFee").val()
            , $("#txtTreatProcPayMode").val()
            , $("#ddlPieceValue").val()
            , $("#txtTreatProcAdvFee").val()
            , $("#txtTreatProcAdvAdjFee").val()
        ];
        UpdateDataToDatabase(41, "UpdateSubmitTreatProcedure", _objParams, "DentalParams");
    });

    $("#ddlDoctors2").change(function () {
        fn_checkOwner(this.value);
    });
    $("#ddlDoctors1").change(function () {
        fn_checkOwner(this.value);
    });

    $("#btnGenerateReceiptView").click(function () {
        if (_ReceiptFormId != 0) {
            fn_AngularRouting('./DentalSoft/PrintReceipt?pat=' + _PatientId + '&q=' + _ReceiptFormId);
            $("#mdlReceiptForm").modal('hide');
            $("#mdlCustomeReceiptForm").modal('hide');
        }
    });

    //$("#ddlColumnList").multipleSelect();
    //$("#ddlColumnList").multipleSelect('checkAll');

    //$("#btnHideShowCol").click(function () {
    //    var a = $("#ddlColumnList").multipleSelect('getSelects');
    //    for (var i = 2; i < 13; i++) {

    //        $('td:nth-child(' + i + '),th:nth-child(' + i +')').hide();
    //    }
    //    for (var i = 0; i < a.length; i++) {

    //        $('td:nth-child(' + i +'),th:nth-child(' + i +')').show();
    //    }

    //});

});

function fn_checkOwner(_v) {
    var _objParams = ["IsDoctorOwner", _v, _LocationId, _SubLocationId, ""]; GetDataFromDatabase(5, 'IsDoctorOwner', _objParams, 'DentalParams');
}

function onGetDataSuccess(data, context) {
    if (context == 'GetPatDetails') {
        if (data == '') { alert('Check Internet Connection'); return false; }
        eval("var objPatHistory=" + data);
        if (objPatHistory) {
            $("#spnPatientName").html(objPatHistory[0]["patname"]);
            $("#txtPatientName").val(objPatHistory[0]["patname"]);
            $("#txtPatientName").attr('data-attr', _PatientId);
            $("#txtPatientName").attr('disabled', 'disabled');

            $("#spnMH").html(objPatHistory[0]["mh"]);
            $("#spnPatientAge").html(objPatHistory[0]["age"]);
            $("#spnPatContacts").html(objPatHistory[0]["mobile1"] + ',' + objPatHistory[0]["mobile2"]);
            $("#txtSeriousIssue").val(objPatHistory[0]["seriousissue"]);

            if (objPatHistory[0]["patphoto"] != '') {
                $(".imgPatientPhoto").attr('src', RootFolderPath("PatientPhoto/" + _LocationId + "/" + objPatHistory[0]["patphoto"]));
                $("a.Photo").attr('href', RootFolderPath("PatientPhoto/" + _LocationId + "/" + objPatHistory[0]["patphoto"]));
            }
            else {
                $(".imgPatientPhoto").attr('src', '/images/photo.jpg');
            }

            if (typeof objPatHistory[0]["watinglist"] != 'undefined') {
                var $ddlWating = $("#ddlwaitingpatient");
                var $ddlCheckin = $("#ddlcheckinpatinet");
                var _wl = 0, _ci = 0;
                for (var i = 0; i < objPatHistory[0]["watinglist"].length; i++) {
                    if (objPatHistory[0]["watinglist"][i]["pattype"] == 'WL') {
                        _wl += 1;
                        $('<option></option').attr('value', objPatHistory[0]["watinglist"][i]["PatientId"]).text(objPatHistory[0]["watinglist"][i]["patname"]).appendTo($ddlWating);
                    } else {
                        _ci += 1;
                        $('<option></option').attr('value', objPatHistory[0]["watinglist"][i]["PatientId"]).text(objPatHistory[0]["watinglist"][i]["patname"]).appendTo($ddlCheckin);
                    }
                }

                $("#spnWaitingcount").html(_wl);
                $("#spncheckincount").html(_ci);
            }
            if (typeof objPatHistory[0]["toothno"] != 'undefined') {
                var $ddlToothNo = $("#ddlToothNo");
                $('<option></option').attr('value', '').text('--Tooth Number--').appendTo($ddlToothNo);
                for (var j = 0; j < objPatHistory[0]["toothno"].split(',').length; j++) {
                    $('<option></option').attr('value', objPatHistory[0]["toothno"].split(',')[j]).text(objPatHistory[0]["toothno"].split(',')[j]).appendTo($ddlToothNo);
                }

            }



        }
    }
    else if (context == 'UpdateSubmitPR') {
        fn_ClearPreRecords(); fn_FillPreRecords();
    }
    else if (context == 'FillGridPreRecords') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo',  'Date', 'CO', 'HOPI', 'OE', 'Tooth No', 'Investigation', 'Treat. Advice', 'Charges', 'Action#AddNewPreRecord'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 4, 5, 6, 7, 8, 9],
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
    else if (context == 'getPreTreatRecord') {
        if (data == '') { return false; }
        $("#txtPR_Date").val(data.split('|')[1]);
        $("#txtPR_CO").val(data.split('|')[2]);
        $("#txtPR_HOPI").val(data.split('|')[3]);
        $("#txtPR_OE").val(data.split('|')[4]);
        $("#txtPR_ToothNo").val(data.split('|')[5]);
        $("#txtPR_Investigation").val(data.split('|')[6]);
        $("#txtPR_TreatAdvice").val(data.split('|')[7]);
        $("#txtPR_Charges").val(data.split('|')[8]);
        $("#mdlPreTreatRecords").modal('show');
    }
    else if (context == 'DelPreTretRecord') {
         fn_ClearPreRecords(); fn_FillPreRecords();
    }
    else if (context == 'UpdateSubmitTreatmentCard') {

        /*Start SMS/EMAIL/WA */
        if (_TreatmentCardId == 0) {
            if ($("#txtTreat_PaidFees").val() != 0 && $("#txtTreat_PaidFees").val() != '') {
                var JSONPath = {
                    "Proc": 65,
                    "Params": 'Patient Payment SMS|0|0|' + data + '|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
                    "ParamPath": "DentalParams"
                }
                fn_sendInstantCommunication(JSONPath, "SendNotification");
            }
        }
        /*End SMS/EMAIL/WA */


        
        fn_ClearTreatmentCard();
        //$("#btnAddTreatmentPrese").attr('data-pid',data);
        //$("#btnAddTreatmentPrese").show();
        fn_FillTreatCard();
    }
    else if (context == 'PrintTreatmentCard') {
        $("#tblTreatmentCard").html('');
        if (data == '') { return false; }
        eval("var objTreatCard=" + data);

        var balanceamt = 0;
        if (objTreatCard) {
            var strTbl = '';
            for (var i = 0; i < objTreatCard.length; i++) {
                var rowspan = 1;
                if (typeof objTreatCard[i]["steps"] != 'undefined') {
                    rowspan = objTreatCard[i]["steps"].length + 1;
                }

                strTbl += '<tr>';
                strTbl += '<td rowSpan="' + rowspan + '" class="text-center nowrap"><button data-treatid="' + objTreatCard[i]["treatid"] + '" data-pid="' + objTreatCard[i]["pid"] + '" data-balamt="' + objTreatCard[i]["treatwisebal"] + '" onclick="javascript:addnewprocedure(this);" class="btn btn-success btn-xs mr-1"  data-toggle="tooltip" title="Add"><i class="fa fa-plus"></i></button> <button data-pid="' + objTreatCard[i]["pid"] + '" onclick="javascript:deletetreatment(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
                strTbl += '<td rowSpan="' + rowspan + '" class="text-center">' + objTreatCard[i]["treatname"] + '</td>';
                strTbl += '<td rowSpan="' + rowspan + '" class="text-center clsToothNumber">' + objTreatCard[i]["toothno"] + '</td>';

                strTbl += '<td class="text-center">' + objTreatCard[i]["treatdate"] + '</td>';
                strTbl += '<td class="text-center">' + objTreatCard[i]["doctorname"] + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + (objTreatCard[i]["piece"] == 0 ? '' : objTreatCard[i]["piece"]) + '</td>';

                var wd = objTreatCard[i]["workdone"] + '';
                wd = wd.replace(/\n/g, "<br />");;


                strTbl += '<td class="text-center">' + wd + '</td>';

                var _p1 = '';
                if (objTreatCard[i]["PrescCount"] == '0') {
                    _p1 = '<button data-pid="' + objTreatCard[i]["pid"] + '" class="btn btn-success btn-xs" onclick="javascript:addprescription(this);" data-toggle="tooltip" title="">Add</button>';
                } else {
                    _p1 = '<button data-pid="' + objTreatCard[i]["pid"] + '" class="btn btn-success btn-xs" onclick="javascript:showprescription(this);" data-toggle="tooltip" title="">Show</button>';
                    _p1 += '<button data-pid="' + objTreatCard[i]["pid"] + '" class="btn btn-success btn-xs" onclick="javascript:addprescription(this);" data-toggle="tooltip" title="">Update</button>';
                }

                strTbl += '<td class="text-center">' + _p1 + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["treatfees"] + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["disc"] + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["totalfee"] + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["paidfee"] + '</td>';
                strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["balfee"] + '</td>';
                strTbl += '<td class="text-left" style="white-space: nowrap;">';
                var _cls = (objTreatCard[i]["treatstatus"] == "1" ? 'fa-check-square-o' : 'fa-square-o');

                strTbl += '<a data-pid="' + objTreatCard[i]["pid"] + '" class="text-success mr-2"  style="font-size: 25px;border: 0;background: none;padding: 0px;" onclick="javascript:confrimtreatment(this);"><i class="fa ' + _cls + '"></i></a>';

                strTbl += '<div class="dropdown d-inline-block"><button type="button" class="btn icon-round-btn dropdown-toggle no-arrow waves-effect" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></button>';
                strTbl += '<div class="dropdown-menu dropdown-menu-right">';
                strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="0" onclick="javascript:addnextapt(this);"><i class="fa fa-plus"></i><span>Add Next Appointment</span></a>';
                //strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="0" onclick="javascript:whatsuptreatment(this);"><i class="fa fa-whatsapp"></i><span>Whatsapp</span></a>';
                strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '" onclick="javascript:edittreatment(this);"><i class="fa fa-pencil"></i><span>Edit</span></a>';
                strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '"  onclick="javascript:printtreatment(this);"><i class="fa fa-print"></i><span>Print</span></a>';
                //strTbl += '<a class="dropdown-item" href="#"><i class="fa fa-info-circle"></i><span>Details</span></a>';
                //strTbl += '<a class="dropdown-item" href="#"><i class="fa fa-trash-o"></i><span>Delete</span></a>'


                strTbl += '</div>';
                strTbl += '</div>';


                strTbl += '</td>';
                strTbl += '</tr>';

                balanceamt = parseInt(objTreatCard[i]["totalbalanceamt"]);

                if (typeof objTreatCard[i]["steps"] != 'undefined') {
                    for (var j = 0; j < objTreatCard[i]["steps"].length; j++) {

                        strTbl += '<tr>';

                        strTbl += '<td class="text-center">' + objTreatCard[i]["steps"][j]["stepdate"] + '</td>';
                        strTbl += '<td class="text-center">' + objTreatCard[i]["steps"][j]["dname"] + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + (objTreatCard[i]["steps"][j]["piece"] == 0 ? '' : objTreatCard[i]["steps"][j]["piece"]) + '</td>';

                        var _a = (objTreatCard[i]["steps"][j]["workdone"] == '' ? '' : objTreatCard[i]["steps"][j]["workdone"].replace(/(\r\n|\r|\n)/g, '<br>'));

                        strTbl += '<td class="text-center">' + _a + '</td>';

                        var _p = '';
                        if (objTreatCard[i]["steps"][j]["PrescCount"] == '0') {
                            _p = '<button data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  class="btn btn-success btn-xs" onclick="javascript:addprescription(this);"  title="">Add</button>';
                        } else {
                            _p = '<button data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  class="btn btn-success btn-xs" onclick="javascript:showprescription(this);"  title="">Show</button>';
                            _p += '<button data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  class="btn btn-success btn-xs" onclick="javascript:addprescription(this);"  title="">Update</button>';
                        }

                        strTbl += '<td class="text-center">' + _p + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["steps"][j]["treatfees"] + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["steps"][j]["disc"] + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["steps"][j]["totalfees"] + '</td>';
                        //strTbl += '<td class="text-center">' + objTreatCard[i]["steps"][j]["cfee"] + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["steps"][j]["pfee"] + '</td>';
                        strTbl += '<td class="text-center isOwnerDr">' + objTreatCard[i]["steps"][j]["bfee"] + '</td>';
                        strTbl += '<td class="text-left" style="white-space: nowrap;">';
                        var _cls = (objTreatCard[i]["steps"][j]["treatstatus"] == "1" ? 'fa-check-square-o' : 'fa-square-o');

                        strTbl += '<a class="text-success mr-2" style="padding: 0px;background: none;border: 0;font-size: 25px;" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  class="btn btn-success btn-xs mr-1" onclick="javascript:confrimtreatmentSteps(this);"><i class="fa ' + _cls + '"></i></a>';

                        strTbl += '<div class="dropdown d-inline-block"><button type="button" class="btn icon-round-btn dropdown-toggle no-arrow waves-effect" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></button>';
                        strTbl += '<div class="dropdown-menu dropdown-menu-right">';
                        strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '" onclick="javascript:addnextapt(this);"><i class="fa fa-plus"></i><span>Add Next Appointment</span></a>';
                        //strTbl += '<a class="dropdown-item" data-pid="' + objTreatCard[i]["pid"] + '" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '" onclick="javascript:whatsuptreatment(this,1);"><i class="fa fa-whatsapp"></i><span>Whatsapp</span></a>';
                        strTbl += '<a class="dropdown-item" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '" onclick="javascript:editsteps(this);"><i class="fa fa-pencil"></i><span>Edit</span></a>';
                        strTbl += '<a class="dropdown-item" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  onclick="javascript:printtreatmentsteps(this);"><i class="fa fa-print"></i><span>Print</span></a>';
                        //strTbl += '<a class="dropdown-item" href="#"><i class="fa fa-info-circle"></i><span>Details</span></a>';
                        strTbl += '<a class="dropdown-item" data-stepid="' + objTreatCard[i]["steps"][j]["stepid"] + '"  onclick="javascript:deletetreatmentsteps(this);"><i class="fa fa-trash-o"></i><span>Delete</span></a>';
                        strTbl += '</div>';
                        strTbl += '</div>';
                        strTbl += '</td>';
                        strTbl += '</tr>';

                    }

                }



            }
            $("#tblTreatmentCard").html(strTbl);

            $("#spnPayStatus").html(''); $("#spnAdvPayStatus").html('');
            $("#spnAdvPayStatus").attr('data-amt', 0);
            $("#spnPayStatus").attr('data-amt', 0);

            if ($qc.Cookie("ConsultingDr") == '1') {
                $(".isOwnerDr").hide();
                // $('td:nth-child(10)').hide(); $('th:nth-child(10)').hide();
                // $('td:nth-child(11)').hide(); $('th:nth-child(11)').hide();
                // $('td:nth-child(12)').hide(); $('th:nth-child(12)').hide();
                //$('td:nth-child(13)').hide(); $('th:nth-child(13)').hide();
                //$('td:nth-child(14)').hide(); $('th:nth-child(14)').hide();
            } else {
                $(".isOwnerDr").show();
            }

            if (typeof balanceamt != 'undefined') {
                if (balanceamt == 0) {
                    $("#spnPayStatus").html(''); $("#spnAdvPayStatus").html('');;
                } else {
                    var amt = balanceamt;
                    if (amt < 0) {
                        $("#spnAdvPayStatus").html('Advance Amount : ' + (-amt));
                        $("#spnAdvPayStatus").attr('data-amt', -amt);
                    } else {
                        $("#spnPayStatus").html('Balance Amount : ' + amt);
                        $("#spnPayStatus").attr('data-amt', amt);
                    }
                }
            }

        }

        fn_CheckUserRoles();
    }
    else if (context == 'UpdateSubmitTreatProcedure') {
        debugger;
        /*Start SMS/EMAIL/WA */
        if (_StepId == 0) {
            if ($("#txtTreatProcPaidFee").val() != 0 && $("#txtTreatProcPaidFee").val() != '') {
                var JSONPath = {
                    "Proc": 65,
                    "Params": 'Patient Payment SMS|0|0|' + _PatTreatId + '|' + data + '|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
                    "ParamPath": "DentalParams"
                }
                fn_sendInstantCommunication(JSONPath, "SendNotification");
            }
        }
        /*End SMS/EMAIL/WA */

        

        fn_ClearTreatProcedure();

        //$("#btnAddTreatmentStepPrese").attr('data-pid', _PatTreatId);
        //$("#btnAddTreatmentStepPrese").attr('data-stepid', data);
        //$("#btnAddTreatmentStepPrese").show();
        fn_FillTreatCard();
    }
    else if (context == 'editTreatmentCard') {
        if (data == '') { return false; }
        $("#ddlTreatments1").val(data.split('|')[3]);
        $("#ddlDoctors1").val(data.split('|')[4]);
        $("#txtTreat_ToothNo").val(data.split('|')[5]);
        $("#txtTreat_Date").val(data.split('|')[6]);
        $("#txtTreat_Piece").val(data.split('|')[7]);
        $("#txtTreat_WorkDone").val(data.split('|')[8]);
        $("#txtTreat_TreatFees").val(data.split('|')[9]);
        $("#txtTreat_Disc").val(data.split('|')[10]);
        $("#txtTreat_TotalFee").val(data.split('|')[11]);
        $("#txtTreat_ConFees").val(data.split('|')[12]);
        $("#txtTreat_PaidFees").val(data.split('|')[13]);
        $("#txtTreat_BalFees").val(data.split('|')[14]);
        $("#txtTreat_PayMode").val(data.split('|')[15]);
        $("#ddlPieceValue1").val(data.split('|')[16]);
        $("#txtTreat_AdvFees").val(data.split('|')[17]);
        $("#txtTreat_AdvAdjFees").val(data.split('|')[18]);


        if (data.split('|')[19] == 'Admin' || data.split('|')[19] == 'Payrolls') {

            $("#txtTreatProcPiece").attr('disabled', 'disabled');
            $("#ddlPieceValue").attr('disabled', 'disabled');
            $("#txtTreat_Piece").attr('disabled', 'disabled');
            $("#ddlPieceValue1").attr('disabled', 'disabled');
        } else {

            $("#txtTreatProcPiece").removeAttr('disabled');
            $("#ddlPieceValue").removeAttr('disabled');


            $("#txtTreat_Piece").removeAttr('disabled');
            $("#ddlPieceValue1").removeAttr('disabled');
        }

        // $("#btnAddTreatmentPrese").show();
    }
    else if (context == 'editStepDetails') {
        if (data == '') { return false; }


        $("#txtTreatProcDate").val(data.split('|')[4]);
        $("#ddlDoctors2").val(data.split('|')[5]);
        $("#txtTreatProcPiece").val(data.split('|')[6]);
        $("#txtTreatProcWorkdone").val(data.split('|')[7]);

        $("#txtTreatProcPrevFee").val(data.split('|')[8]);
        $("#txtTreatProcDiscount").val(data.split('|')[9]);


        $("#txtTreatProcTotalFee").val(data.split('|')[10]);

        $("#txtTreatProcConFee").val(data.split('|')[11]);
        $("#txtTreatProcPaidFee").val(data.split('|')[12]);
        $("#txtTreatProcBalFee").val(data.split('|')[13]);
        $("#txtTreatProcTotalFee").val(data.split('|')[14]);

        $("#txtTreatProcPayMode").val(data.split('|')[15])
        FillDropDown_JS(false, 'Doctorlist', 'ddlDoctors2', 0, _LocationId, data.split('|')[5], 1, null, null, false, [], 'Params', null);
        $("#ddlPieceValue").val(data.split('|')[16]);
        $("#txtTreatProcAdvFee").val(data.split('|')[17]);

        $("#txtTreatProcAdvAdjFee").val(data.split('|')[18]);
        fn_TreatProcBalFeeCalculation();
        // $("#btnAddTreatmentStepPrese").show();
    }
    else if (context == 'DelTretCard') {
        fn_FillTreatCard();
    }
    else if (context == 'DelTretSteps') {
         fn_FillTreatCard();
    }
    else if (context == 'getEditPatientRecords') {
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

        _PatientRecordId = data.split('|')[0];
        if (data.split('|')[17] != '') { $("#imgPatientPhoto").attr('src', RootFolderPath("PatientPhoto/" + _LocationId + "/" + data.split('|')[17])); }
        else {
            $("#imgPatientPhoto").attr('src', 'images/photo.jpg');
        }
    }
    else if (context == 'UpdatePrescription') {
      
        $("#mdlPrescription").modal('hide');
        fn_FillTreatCard();
        //var _istemplate = ($("#chkSaveAsTemplate").prop('checked') == true ? 1 : 0);
        //if (_istemplate == 1) {
        //    var objRecords = ["FillTemplateList", "", _PatientId, _LocationId, _PatTreatId, _StepId];
        //    GetDataFromDatabase(44, 'FillPrescTemplate', objRecords, 'DentalParams');
        //}
    }
    else if (context == 'FillPatPrescriptionTemplate') {
        if (data == '') { return false; }
        var strHTML = '', istemplate = false;
        for (var i = 0; i < data.split('$').length; i++) {
            var arr = data.split('$')[i].split('|');
            var qty = arr[7] + '';
            var x = arr[5] + '#' + qty.trim() + '#' + arr[6] + '#' + arr[8];
            strHTML += '<tr data-attr="' + x + '">';
            strHTML += '<td>' + (i + 1) + '</td>';
            strHTML += '<td>' + arr[1] + '</td>';
            strHTML += '<td>' + arr[2] + '</td>';
            strHTML += '<td>' + arr[3] + '</td>';
            strHTML += '<td>' + arr[8] + '</td>';
            strHTML += '<td class="text-center"><button onclick="javascript:deletedSelectedrow(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
            strHTML += '</tr>';
            if (arr[9] == 0 || arr[9] == '') {
                istemplate = false;
            } else {
                istemplate = true;
            }
        }

        $(".tblSelectedPresc").html(''); $(".tblCustomePresc").html('');
        if (istemplate == true) {
            $("#liPrescRecords a").click();
            $(".tblSelectedPresc").html(strHTML);
        } else {
            $("#liCustPresc a").click();
            $(".tblCustomePresc").html(strHTML);
        }

    }
    else if (context == 'FillPrescTemplate') {
        $("#tblPresTemplate").html('');
        if (data == '') { return false; }
        var strHTML = '';

        eval("var objPrescTemplate={" + data + "}");
        _objPrescTemplate = objPrescTemplate; objPrescTemplate = {};
        var strHTML = '';
        var i = 0;
        for (var key in _objPrescTemplate) {
            strHTML += '<tr data-attr="' + x + '">';
            strHTML += '<td class="text-center">' + (i + 1) + '</td>';
            strHTML += '<td>' + key + '</td>';

            strHTML += '<td class="text-center"><button data-name="' + key + '" onclick="javascript:addPrescTemplate(this);" class="btn btn-success btn-xs" data-toggle="tooltip" title="Add"><i class="fa fa-plus-circle"></i></button> <button  data-name="' + key + '" onclick="javascript:deletedPrescTemplate(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
            strHTML += '</tr>';
            i++;
        }

        $("#tblPresTemplate").html(strHTML);
    }

    else if (context == 'ShowPrescTemplate') {
        $("#tblSelectedPresc_1").html('');
        if (data == '') { return false; }
        var strHTML = '';

        for (var i = 0; i < data.split('$').length; i++) {
            var arr = data.split('$')[i].split('|');
            var qty = arr[7] + '';
            var x = arr[5] + '#' + qty.trim() + '#' + arr[6];
            strHTML += '<tr data-attr="' + x + '">';
            strHTML += '<td>' + (i + 1) + '</td>';
            strHTML += '<td>' + arr[1] + '</td>';
            strHTML += '<td>' + arr[2] + '</td>';
            strHTML += '<td>' + arr[3] + '</td>';
            strHTML += '<td>' + arr[8] + '</td>';
            // strHTML += '<td class="text-center"><button onclick="javascript:deletedSelectedrow(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
            strHTML += '</tr>';
        }

        $("#tblSelectedPresc_1").html(strHTML);
    }


    else if (context == 'DeletePrescTemplate') {
       
        var objRecords = ["FillTemplateList", "", _PatientId, _LocationId, _PatTreatId, _StepId];
        GetDataFromDatabase(44, 'FillPrescTemplate', objRecords, 'DentalParams');
    }
    else if (context == 'UpdateAppointment') {
       
        $("#mdlScheduleClass").modal('hide');
    }

    if (context == 'IsDoctorOwner') {
        debugger;
        if (data.split('|')[0] == 'Admin' || data.split('|')[0] == 'Payrolls' || data.split('|')[0] == 'Payroll') {
            $("#txtTreatProcPiece").val(0);
            $("#txtTreatProcPiece").attr('disabled', 'disabled');
            $("#ddlPieceValue").attr('disabled', 'disabled');

            $("#txtTreat_Piece").val(0);
            $("#ddlPieceValue1").val('');
            $("#txtTreat_Piece").attr('disabled', 'disabled');
            $("#ddlPieceValue1").attr('disabled', 'disabled');
        } else {
            $("#txtTreatProcPiece").val(0);
            $("#txtTreatProcPiece").removeAttr('disabled');
            $("#ddlPieceValue").removeAttr('disabled');

            $("#txtTreat_Piece").val(0);
            $("#ddlPieceValue1").val('');
            $("#txtTreat_Piece").removeAttr('disabled');
            $("#ddlPieceValue1").removeAttr('disabled');
        }
        if (data.split('|')[1] != '' && data.split('|')[1] != '0') {
            $("#txtTreat_Piece").val(data.split('|')[1]);
            $("#ddlPieceValue1").val('%');
        }

    }

    /*Essentials*/
    if (context == 'UpdateConsentForm') {
         fn_clearConsentForm(); fn_FillGridConsentForm();
    }
    else if (context == 'UpdateReferralForm') {
         fn_clearReferralForm(); fn_FillGridReferralForm();
    }
    else if (context == 'UpdateQuotationForm') {
        if (data == 0 || data == '') { alert('Try Again'); return false; }
        fn_clearQuotationForm(); fn_FillGridQuotationForm();
        _EditQuotationID = data;
        var _objParams = ["getQuotationEnquiries", data, _LocationId, _PatientId, ""];
        GetDataFromDatabase(46, "FillGridQuotationEnq", _objParams, "DentalParams");

        $("#mdlQuotationTreatment").modal('show');
    }
    else if (context == 'UpdateReceiptsForm') {

        var rptytpe = $("#ddlReceiptForm_Treatment").val();
        if (rptytpe == 0) {
            $("#mdlReceiptForm").modal('hide');
            $("#mdlCustomeReceiptForm").modal('show');
            _ReceiptFormId = data;
            fn_FillGridCustomeReceiptForm();
            fn_FillGridReceiptForm();
        } else {
        
            fn_clearReceiptForm(); fn_FillGridReceiptForm();
        }



    }
    else if (context == 'getCustomeReceiptsForm') {
        if (data == '') { return false; }

        var _tbl = '';
        for (var i = 0; i < data.split('$').length; i++) {
            _tbl += '<tr>';
            _tbl += '<td style="padding:5px;">' + data.split('$')[i].split('|')[1] + '</td>';
            _tbl += '<td style="padding:5px;">' + data.split('$')[i].split('|')[2] + '</td>';
            _tbl += '<td style="padding:5px;">' + data.split('$')[i].split('|')[3] + '</td>';
            _tbl += '<td style="padding:5px;">' + data.split('$')[i].split('|')[4] + '</td>';
            _tbl += '<td><a href="javascript:undefined;" data-id="' + data.split('$')[i].split('|')[0] + '" onclick="editcustomereceipt(this)" >Edit</a><a  data-id="' + data.split('$')[i].split('|')[0] + '" href="javascript:undefined;"  onclick="deletecustomereceipt(this)"> Delete</a></td>';
            _tbl += '</tr>';
        }

        _tbl += '<tr>';
        _tbl += '<td style="padding:5px;"><input type="text" class="form-control clsAddNew" data-sno="0"  /></td>';
        _tbl += '<td style="padding:5px;"><input type="text" class="form-control clsAddNew" data-sno="1"  /></td>';
        _tbl += '<td style="padding:5px;"><input type="text" class="form-control clsAddNew" data-sno="2"  /></td>';
        _tbl += '<td style="padding:5px;"><input type="text" class="form-control clsAddNew"  data-sno="3" /></td>';
        _tbl += '<td><a href="javascript:undefined;" data-id="0" onclick="addcustomereceipt(this)" >Add New</a></td>';
        _tbl += '</tr>';
        $("#tblPatReceipt").html(_tbl);
    }
    else if (context == 'AddNewCustomTemplate') {
        fn_FillGridCustomeReceiptForm();
    }
    else if (context == 'DeleteCustomTemplate') {
        fn_FillGridCustomeReceiptForm();
    }
    else if (context == 'UpdateImageForm') {
        if (data == '' || data == 0) { alert('Online error'); return false; }
        var fileUpload = $("#uplImageUpload").get(0);
        var files = fileUpload.files;

        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _PatientPhoto = data + '.' + _extension;
            var fileparams = { FolderName: "RVGCaptures/" + _LocationId, FileName: data, Extension: _extension };
            UploadImage(files[0], 'RVGCaptures', fileparams);

            /* Whats app images send */

            var strSQL = '';
            var _url = 'https://doctor.oramo.in/uploads/' + pgLoadVariableQaurus.ClientNo + '/uploadedfiles/RVGCaptures/' + _LocationId + '/' + _PatientPhoto;
            strSQL = 'insert into pdfurls(ParentId,PatientId,LocationId,DoctorId,ReceiptURL,PageType,moddate)';
            strSQL += ' values(' + data + ',' + _PatientId + ',' + _LocationId + ',0,`' + _url + '`,`PatientImages`,getdate())';
            strSQL += ' select SCOPE_IDENTITY() ';

            var objParams = ["UpdateSQL", strSQL];
            UpdateDataToDatabase(13, 'UpdateReceiptURL', objParams, 'DentalParams');
        }



    }

    else if (context == 'UpdateReceiptURL') {
        if (data == 0 || data == '') { return false; }
        //var JSONPath = {
        //    "Proc": 65,
        //    "Params": 'Patient Images|' + data + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
        //    "ParamPath": "DentalParams"
        //}
        //fn_sendInstantCommunication(JSONPath, "PatientImages");
        fn_FillGridIamgeForm();
    }

    else if (context == 'UpdateFileReceiptURL') {
        if (data == 0 || data == '') { return false; }
        //var JSONPath = {
        //    "Proc": 65,
        //    "Params": 'Patient Images|' + data + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
        //    "ParamPath": "DentalParams"
        //}
        //fn_sendInstantCommunication(JSONPath, "PatientImages");
        fn_FillGridFileForm();
    }

    else if (context == 'UpdateFileForm') {
        if (data == '' || data == 0) { alert('Online error'); return false; }
        var fileUpload = $("#uplFileUpload").get(0);
        var files = fileUpload.files;

        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _PatientPhoto = data + '.' + _extension;
            var fileparams = { FolderName: "RVGCaptures/" + _LocationId, FileName: data, Extension: _extension };
            UploadImage(files[0], 'RVGCaptures', fileparams);
        }

        /* Whats app images send */

        var strSQL = '';
        var _url = 'https://doctor.oramo.in/uploads/' + pgLoadVariableQaurus.ClientNo + '/uploadedfiles/RVGCaptures/' + _LocationId + '/' + _PatientPhoto;
        strSQL = 'insert into pdfurls(ParentId,PatientId,LocationId,DoctorId,ReceiptURL,PageType,moddate)';
        strSQL += ' values(' + data + ',' + _PatientId + ',' + _LocationId + ',0,`' + _url + '`,`PatientFiles`,getdate())';
        strSQL += ' select SCOPE_IDENTITY() ';

        var objParams = ["UpdateSQL", strSQL];
        UpdateDataToDatabase(13, 'UpdateFileReceiptURL', objParams, 'DentalParams');

        
    }

    else if (context == 'FillGridConsentForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '2',
            header: ['SNo',  'Date', 'Treatment Name', 'Tooth No', 'Form type', 'Action#AddNewConsentForm'],
            dataArr: [6],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 4, 5],
            IsActionButton: ['View', 'Edit', 'Delete'],
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
    else if (context == 'FillGridReferralForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '3',
            header: ['SNo',  'Date', 'Treatment Name', 'Form type', 'Action#AddNewReferralForm'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 4, 5],
            IsActionButton: ['View', 'Edit', 'Delete'],
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
    else if (context == 'FillGridQuotationForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '4',
            header: ['SNo',  'Date', 'Form type', 'Action#AddNewQuotationForm'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 4, 5],
            IsActionButton: ['View', 'Edit', 'Delete'],
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
    else if (context == 'FillGridReceiptForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '5',
            header: ['SNo',  'Date', 'Treatment Name', 'Action#AddNewReceiptForm'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1,  2, 3, 5],
            IsActionButton: ['View', 'Edit', 'Delete'],
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
    else if (context == 'FillGridImagesForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '6',
            header: ['SNo', 'Date', 'Image Title', 'Action'],
            dataArr: [3, 4, 5],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 2, 4, 5],
            IsActionButton: ['View', 'Delete', 'Whats App'],
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
    else if (context == 'FillGridFileForms') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '7',
            header: ['SNo', 'Date', 'File Title', 'Action'],
            dataArr: [3, 4, 5],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 2, 4, 5],
            IsActionButton: ['View', 'Delete', "Whats App"],
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

    else if (context == 'getConsentFormDetails') {
        if (data == '') { return false; }
        $("#txtConsentForm_Date").val(data.split('|')[2]);
        $("#ddlConsentForm_Treatment").val(data.split('|')[3]);
        $("#txtConsentForm_ToothNo").val(data.split('|')[4]);
        $("#ddlConsentForm_FormType").val(data.split('|')[5]);
        $("#mdlConsentForms").modal('show');
    }
    else if (context == 'getReferralFormDetails') {
        if (data == '') { return false; }
        $("#txtRefForm_date").val(data.split('|')[2]);
        $("#ddlRefForm_Treatment").val(data.split('|')[3]);
        $("#ddlRefForm_FormType").val(data.split('|')[5]);
        $("#mdlReferralForms").modal('show');
    }
    else if (context == 'getQuotationFormDetails') {
        if (data == '') { return false; }
        $("#txtQuatation_Date").val(data.split('|')[2]);
        $("#ddlQuatation_FormType").val(data.split('|')[5]);
        $("#mdlQuatationForm").modal('show');
    }
    else if (context == 'getReceiptFormDetails') {
        if (data == '') { return false; }
        $("#txtReceiptForm_date").val(data.split('|')[2]);
        $("#ddlReceiptForm_Treatment").val(data.split('|')[3]);
        $("#ddlReceiptForm_FromType").val(data.split('|')[5]);
        $("#mdlReceiptForm").modal('show');
    }

    else if (context == 'DeleteConsentFormDetails') {
         fn_clearConsentForm(); fn_FillGridConsentForm();
    }
    else if (context == 'DeleteReferralFormDetails') {
        fn_clearReferralForm(); fn_FillGridReferralForm();
    }
    else if (context == 'DeleteQuotationFormDetails') {
        fn_clearQuotationForm(); fn_FillGridQuotationForm();
    }
    else if (context == 'DeleteReceiptFormDetails') {
         fn_clearReceiptForm(); fn_FillGridReceiptForm();
    }
    else if (context == 'DeleteImageDetails') {
        fn_FillGridIamgeForm();
    }
    else if (context == 'DeleteFileDetails') {
         fn_FillGridFileForm();
    }

    else if (context == 'getEssentialsCount') {
        if (data == '') { return false; }
        eval("var objCounts=" + data);
        if (objCounts) {
            for (var i = 0; i < objCounts.length; i++) {
                if (objCounts[i]["formtype"] == 'Consent Form') {
                    $("#spnConsentForm").html(objCounts[i]["totalcount"]);
                }
                if (objCounts[i]["formtype"] == 'Referral Form') {
                    $("#spnReferralForm").html(objCounts[i]["totalcount"]);
                }
                if (objCounts[i]["formtype"] == 'Quotation') {
                    $("#spnQuotationForm").html(objCounts[i]["totalcount"]);
                }
                if (objCounts[i]["formtype"] == 'Receipt') {
                    $("#spnReceiptsForm").html(objCounts[i]["totalcount"]);
                }
                if (objCounts[i]["formtype"] == 'ImagesForm') {
                    $("#spnImagesForm").html(objCounts[i]["totalcount"]);
                }
                if (objCounts[i]["formtype"] == 'FilesForm') {
                    $("#spnFilesForm").html(objCounts[i]["totalcount"]);
                }
            }

        }
    }
    else if (context == 'UpdateQuotationEnq') {
        if (data == 0 || data == '') { return false; }
        //var s = '';
        //s += '<tr class="clsActRow">';
        //s += '<td>' + ($("#tblQuotationTreatment tr.clsActRow").length + 1) + '</td>';
        //s += '<td>' + rtnCtrlVal("txtTreatmentDesc", "") + '</td>';
        //s += '<td>' + rtnCtrlVal("txtToothNoDesc", "") + '</td>';
        //s += '<td>' + rtnCtrlVal("txtNoOfnits", "0") + '</td>';
        //s += '';
        //s += '<td>' + rtnCtrlVal("txtPerUnitCharges", "0") + '</td>';
        //s += '<td>' + rtnCtrlVal("txtSubtotal", "0") + '</td>';
        //s += '<td class="text-center"><button onclick="deleteQuotationenq();" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
        //s += '</tr>';
        //$("#tblQuotationTreatment").append(s);

        var _objParams = ["getQuotationEnquiries", _EditQuotationID, _LocationId, _PatientId, ""];
        GetDataFromDatabase(46, "FillGridQuotationEnq", _objParams, "DentalParams");



        $("#txtTreatmentDesc").val('');
        $("#txtToothNoDesc").val('');
        $("#txtNoOfnits").val('0');
        $("#txtPerUnitCharges").val('0');
        $("#txtSubtotal").val('0');
    }
    else if (context == 'FillGridQuotationEnq') {
        if (data == '') { return false; }
        $("#tblQuotationTreatment tr.clsActRow").remove();
        var s = '', s1 = '';
        _GroupId = 1; var flag = true;


        for (var i = 0; i < data.split('$').length; i++) {

            var arr = data.split('$')[i].split('|');

            if (_GroupId != parseInt(arr[6])) {
                s1 = '<tr class="clsActRow"><td  colSpan="7" style="text-align:center;">OR</td></tr>';
                _GroupId = parseInt(arr[6]);
            } else {
                s1 = '';
            }
            s = s1 + '<tr class="clsActRow">';
            s += '<td>' + (i + 1) + '</td>';
            s += '<td>' + arr[1] + '</td>';
            s += '<td>' + arr[2] + '</td>';
            s += '<td>' + arr[3] + '</td>';
            s += '<td>' + arr[4] + '</td>';
            s += '<td>' + arr[5] + '</td>';
            s += '<td class="text-center"><button data-id="' + arr[0] + '" onclick="deleteQuotationenq(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
            s += '</tr>';




            $("#tblQuotationTreatment").append(s);
        }
    }
    else if (context == 'UpdateMedicineRecords') {
        $("#mdlMedicine").modal('hide');
        $("#ddlPresMedicine").append('<option value="' + data + '">' + $("#txtMedicineName").val() + '</option>');
        $("#ddlPresMedicine").val(data);
        $("#txtMedicineName").val('');
    }
    else if (context == 'UpdateTreatConfrim') {
        fn_FillTreatCard();
    }
}

var _CustomerptId = 0;
function editcustomereceipt(_o) {
    _CustomerptId = $(_o).attr('data-id');
    if ($(_o).text() == 'Edit') {
        $(_o).html('Save');
        $(_o).parent().prev().html('<input style="width: 100%;border: 1px solid #cccc;" type="text" value="' + $(_o).parent().prev().text() + '">');
        $(_o).parent().prev().prev().html('<input style="width: 100%;border: 1px solid #cccc;" type="text" value="' + $(_o).parent().prev().prev().text() + '">');
        $(_o).parent().prev().prev().prev().html('<input style="width: 100%;border: 1px solid #cccc;" type="text" value="' + $(_o).parent().prev().prev().prev().text() + '">');
        $(_o).parent().prev().prev().prev().prev().html('<input style="width: 100%;border: 1px solid #cccc;" type="text" value="' + $(_o).parent().prev().prev().prev().prev().text() + '">');

    } else {
        var strSQL = 'Update CustomeTreatment set';

        strSQL += ' TreatmentDate = `' + $(_o).parent().prev().prev().prev().prev().find('input').val() + '`';
        strSQL += ' ,TreatmentName = `' + $(_o).parent().prev().prev().prev().find('input').val() + '`';
        strSQL += ' ,ToothNo = `' + $(_o).parent().prev().prev().find('input').val() + '`';
        strSQL += ' ,TreatCharges = `' + $(_o).parent().prev().find('input').val() + '`';
        strSQL += ' where CID = ' + _CustomerptId;


        var objParams = ["UpdateSQL", strSQL];
        UpdateDataToDatabase(13, 'UpdateCustomTemplate', objParams, 'DentalParams');


        $(_o).html('Edit');
        $(_o).parent().prev().html($(_o).parent().prev().find('input').val());
        $(_o).parent().prev().prev().html($(_o).parent().prev().prev().find('input').val());
        $(_o).parent().prev().prev().prev().html($(_o).parent().prev().prev().prev().find('input').val());
        $(_o).parent().prev().prev().prev().prev().html($(_o).parent().prev().prev().prev().prev().find('input').val());

    }
}

function deletecustomereceipt(_o) {
    var objParams = ["DeleteCustomeReceipt", $(_o).attr('data-id'), _LocationId, ""];
    UpdateDataToDatabase(1, 'DeleteCustomTemplate', objParams, 'DentalParams');
}

function addcustomereceipt(_o) {

    var strSQL = 'insert into CustomeTreatment(FormId,PatientId,Locationid,TreatmentDate,TreatmentName,ToothNo,TreatCharges,deleted,moddate)';

    strSQL += ' values(' + _ReceiptFormId + ',' + _PatientId + ',' + _LocationId + ',`' + $(_o).parent().prev().prev().prev().prev().find('input').val() + '`';
    strSQL += ' ,`' + $(_o).parent().prev().prev().prev().find('input').val() + '`';
    strSQL += ' ,`' + $(_o).parent().prev().prev().find('input').val() + '`';
    strSQL += ' ,`' + $(_o).parent().prev().find('input').val() + '`';
    strSQL += ',0,getdate()) ';


    var objParams = ["UpdateSQL", strSQL];
    UpdateDataToDatabase(13, 'AddNewCustomTemplate', objParams, 'DentalParams');
}

function deleteQuotationenq(_o) {
    $(_o).parent().parent().remove();
    var _objRecords = ["DeleteQuotationMaster", $(_o).attr('data-id'), _LocationId, ""];
    UpdateDataToDatabase(1, 'DeleteQuotationMaster', _objRecords, 'DentalParams');
}

function fn_DDLReturn(DDLId) {
    if (DDLId == 'ddlDoctors1') {
        fn_checkOwner($("#ddlDoctors1").val());


    } else if (DDLId == 'ddlDoctors2') {
        fn_checkOwner($("#ddlDoctors2").val());
    }
}

function fn_RefreshTreatCard() {
    var _objParams = ["getPatientDetails", _PatientId, "0", "0", "", _LocationId, _SubLocationId];
    GetDataFromDatabase(38, "GetPatDetails", _objParams, "DentalParams");
}

function fn_FillTreatCard() {
    var _objParams = ["GridTreatmentCard", _PatientId
        , (typeof $("#ddlTreatments").val() == 'undefined' || $("#ddlTreatments").val() == null || $("#ddlTreatments").val() == "" ? 0 : $("#ddlTreatments").val())
        , (typeof $("#ddlDoctor").val() == 'undefined' || $("#ddlDoctor").val() == null || $("#ddlDoctor").val() == "" ? 0 : $("#ddlDoctor").val())
        , (typeof $("#ddlToothNo").val() == 'undefined' || $("#ddlToothNo").val() == null || $("#ddlToothNo").val() == "" ? "" : $("#ddlToothNo").val())
        , _LocationId, _SubLocationId];
    GetDataFromDatabase(38, "PrintTreatmentCard", _objParams, "DentalParams");
}

function addnewprocedure(_o) {
    // var treatid = $(_o).attr('data-treatid');
    _PatTreatId = $(_o).attr('data-pid');
    FillDropDown_JS(false, 'Doctorlist', 'ddlDoctors2', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    _BalanceAmt = parseInt(($(_o).attr('data-balamt') == '' ? 0 : $(_o).attr('data-balamt')));

    $("#txtTreatProcAdvFee").val(0); $("#txtTreatProcPrevFee").val(0);
    if (_BalanceAmt < 0) {
        $("#txtTreatProcAdvFee").val(-_BalanceAmt);
    } else {
        $("#txtTreatProcPrevFee").val(_BalanceAmt);
    }


    $("#txtTreatProcTotalFee").val(_BalanceAmt);
    // $("#txtTreatProcPaidFee").val(_BalanceAmt);

    $("#mdlTreatmentProcedure").modal('show');
    $("#txtTreatProcDate").val(_GlobalPatHistory.CurrentDateYMD);
    fn_TreatProcBalFeeCalculation();
}

function addnextapt(_o) {


    fn_AngularRouting('./DentalSoft/Appointments?para=' + btoa(_PatientId + '_' + $("#spnPatientName").text() + '_' + $(_o).attr('data-pid') + '_' + $(_o).attr('data-stepid')));
    //var treatid = $(_o).attr('data-pid');
    //var stepid = $(_o).attr('data-stepid');
    //FillDropDown_JS(false, 'Doctorlist', 'ddlDoctor1', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    //$("#txtPatientName").autocomplete({
    //    source: (request, response) => {

    //        GetAutoCompleteData({
    //            procid: 647,
    //            ParamPath: "params",
    //            params: 'patientlist|' + $("#txtPatientName").val() + '|' + _LocationId,
    //            success: (data) => {
    //                data = data.split("$");
    //                response($.map(data, (item) => {


    //                    var val = item.split('|')[0];
    //                    var lbl = item.split('|')[1];
    //                    return { label: lbl, val: val, defaultagent: lbl };
    //                }));
    //            }
    //        });
    //    }, select: (e, i) => {
    //        $(e.target).attr('data-attr', i.item.val);
    //        // _globalpathistory.studid = i.item.val;
    //        //fn_angularrouting('./' + _rtnangroutingpath() + '/studentdetails?id=' + i.item.val);
    //    }, minlength: 1
    //});

    //$("#txtAppointmentFor").autocomplete({
    //    source: (request, response) => {

    //        GetAutoCompleteData({
    //            procid: 647,
    //            ParamPath: "Params",
    //            params: 'TreatmentAutoPopup|' + $("#txtAppointmentFor").val() + '|' + _LocationId,
    //            success: (data) => {
    //                data = data.split("$");
    //                response($.map(data, (item) => {

    //                    var val = item.split('|')[0];
    //                    var lbl = item.split('|')[1];
    //                    return { label: lbl, val: val, defaultagent: lbl };
    //                }));
    //            }
    //        });
    //    }, select: (e, i) => {
    //        $(e.target).attr('data-attr', i.item.val);
    //        // _GlobalPatHistory.StudID = i.item.val;
    //        //fn_AngularRouting('./' + _rtnAngRoutingPath() + '/StudentDetails?id=' + i.item.val);
    //    }, minLength: 1
    //});

    //$("#txtStartDate").val(_GlobalPatHistory.CurrentDateYMD);
    //$("#txtEndDate").val(_GlobalPatHistory.CurrentDateYMD);
    //$("#txtStartTime").val('09:00');
    //$("#txtEndTime").val('09:10');
    //$("#mdlScheduleClass").modal('show');

    //$("#btnSchedlePeriod").click(function () {
    //    if (rtnCtrlVal("txtStartDate", "") == '') { alert('start date is mandatory'); return false; }
    //    if (rtnCtrlVal("txtStartTime", "") == '') { alert('start time is mandatory'); return false; }
    //    if (rtnCtrlVal("txtEndDate", "") == '') { alert('end date is mandatory'); return false; }
    //    if (rtnCtrlVal("txtEndTime", "") == '') { alert('end time is mandatory'); return false; }
    //    if (rtnCtrlVal("ddlDoctor", "") == '') { alert('doctor is mandatory'); return false; }
    //    if (rtnCtrlVal("txtPatientName", "") == '') {
    //        if (typeof $("#txtPatientName").attr('data-attr') == 'undefined' || $("#txtPatientName").attr('data-attr') == 0) {
    //            alert('patient name is mandatory'); return false;
    //        }
    //    }
    //    //txtAppointmentFor

    //    fn_InsertUpdateScheduleApt(treatid, stepid);

    //});
}

function fn_InsertUpdateScheduleApt(treatid, stepid) {
    var _param = ["InsertUpdate", 0
        , $("#txtPatientName").attr('data-attr')
        , $("#ddlDoctor1").val()
        , _LocationId
        , 0
        , $("#txtStartDate").val()
        , $("#txtEndDate").val()
        , $("#txtStartTime").val()
        , $("#txtEndTime").val()
        , $("#txtAppointmentFor").val()
        , $qc.cookie("userid") + ',' + $qc.cookie("usercategory")
        , treatid
        , stepid
    ];
    UpdateDataToDatabase(25, "UpdateAppointment", _param, "DentalParams");
}

function edittreatment(_o) {
    _TreatmentCardId = $(_o).attr('data-pid');
    var _objParams = ["getTreatmentCardDetails", _PatientId, _TreatmentCardId, "0", "", _LocationId, _SubLocationId];
    GetDataFromDatabase(38, "editTreatmentCard", _objParams, "DentalParams");
    $("#mdlAddNewTreatment").modal('show');
    //  $("#btnAddTreatmentPrese").attr('data-pid', _TreatmentCardId);
}

function confrimtreatment(_o) {
    var treatstatus = 0;
    if ($(_o).find("i.fa").hasClass("fa-square-o") == true) {
        treatstatus = 1;
        $(_o).find("i.fa").removeClass("fa-square-o").addClass("fa-check-square-o");
    } else {
        treatstatus = 0;
        $(_o).find("i.fa").removeClass("fa-check-square-o").addClass("fa-square-o");
    }

    _TreatmentCardId = $(_o).attr('data-pid');
    var _objParams = ["UpdateTreatStatus", _TreatmentCardId, treatstatus, ""];
    UpdateDataToDatabase(1, "UpdateTreatConfrim", _objParams, "DentalParams");
}

function confrimtreatmentSteps(_o) {
    var treatstatus = 0;
    if ($(_o).find("i.fa").hasClass("fa-square-o") == true) {
        treatstatus = 1;
        $(_o).find("i.fa").removeClass("fa-square-o").addClass("fa-check-square-o");
    } else {
        treatstatus = 0;
        $(_o).find("i.fa").removeClass("fa-check-square-o").addClass("fa-square-o");
    }

    _StepId = $(_o).attr('data-stepid');
    var _objParams = ["UpdateTreatStepStatus", _StepId, treatstatus, ""];
    UpdateDataToDatabase(1, "UpdateTreatConfrim", _objParams, "DentalParams");
}

function editsteps(_o) {
    _StepId = $(_o).attr('data-stepid');
    var _objParams = ["getStepDetails", _PatientId, _StepId, "0", "", _LocationId, _SubLocationId];
    GetDataFromDatabase(38, "editStepDetails", _objParams, "DentalParams");

    // $("#btnAddTreatmentStepPrese").attr('data-stepid', _StepId);
    $("#mdlTreatmentProcedure").modal('show');
}

function changeseriousissue(_o) {
    var _objParams = ["UpdateSQL", "Update PatientInfo set SeriousIssue=`" + $(_o).val() + "` where PatientId = " + _PatientId];
    UpdateDataToDatabase(13, "UpdateSeriousIssue", _objParams, "DentalParams");
}

function fn_FillPreRecords() {
    var _objParams = ["GridPreTreatRecord", _PatientId, "0", "0", "", _LocationId, _SubLocationId];
    GetDataFromDatabase(38, "FillGridPreRecords", _objParams, "DentalParams");
}

function fn_ClearPreRecords() {
    $("#txtPR_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtPR_CO").val('');
    $("#txtPR_HOPI").val('');
    $("#txtPR_OE").val('');
    $("#txtPR_ToothNo").val('');
    $("#txtPR_Investigation").val('');
    $("#txtPR_TreatAdvice").val('');
    $("#txtPR_Charges").val(0);
    _PreRecordID = 0;
    $("#mdlPreTreatRecords").modal('hide');
}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'AddNewPreRecord') {
        fn_ClearPreRecords();
        $("#mdlPreTreatRecords").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'AddNewConsentForm') {
        $("#mdlConsentForms").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'AddNewReferralForm') {
        $("#mdlReferralForms").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'AddNewQuotationForm') {
        $("#mdlQuatationForm").modal('show');
    } else if ($(_o).attr('data-ctrl') == 'AddNewReceiptForm') {
        $("#mdlReceiptForm").modal('show');
    }

}

function btnEditAction_Click(_oBtn) {
    if (_TabName == 'PreRecord') {
        _PreRecordID = $(_oBtn).attr('data-id');
        var _objParams = ["getPreTreatRecord", _PatientId, _PreRecordID, "0", "", _LocationId, _SubLocationId];
        GetDataFromDatabase(38, 'getPreTreatRecord', _objParams, 'DentalParams');

    }
    else if (_TabName == 'Essentials') {
        if (_EssentialFormType == 'Consent Form') {
            _ConsentId = $(_oBtn).attr('data-id');
            var _objParams = ["getPatEssentials", _ConsentId, _LocationId, _PatientId, "Consent Form"];
            GetDataFromDatabase(46, 'getConsentFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Referral Form') {
            _ReferralId = $(_oBtn).attr('data-id');
            var _objParams = ["getPatEssentials", _ReferralId, _LocationId, _PatientId, "Referral Form"];
            GetDataFromDatabase(46, 'getReferralFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Quotation') {
            _QuotationId = $(_oBtn).attr('data-id');
            var _objParams = ["getPatEssentials", _QuotationId, _LocationId, _PatientId, "Quotation"];
            GetDataFromDatabase(46, 'getQuotationFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Receipt') {
            _ReceiptFormId = $(_oBtn).attr('data-id');
            var _objParams = ["getPatEssentials", _ReceiptFormId, _LocationId, _PatientId, "Receipt"];
            GetDataFromDatabase(46, 'getReceiptFormDetails', _objParams, 'DentalParams');
        }


    }
}

function btnDeleteAction_Click(_oBtn) {
    if (_TabName == 'PreRecord') {
        _PreRecordID = $(_oBtn).attr('data-id');
        var _objRecords = ["DelPreTretRecord", _PreRecordID, _LocationId, ""];
        UpdateDataToDatabase(1, 'DelPreTretRecord', _objRecords, 'DentalParams');
    }
    else if (_TabName == 'Essentials') {
        if (_EssentialFormType == 'Consent Form') {
            _ConsentId = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _ConsentId, _LocationId, "Consent Form"];
            UpdateDataToDatabase(1, 'DeleteConsentFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Referral Form') {
            _ReferralId = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _ReferralId, _LocationId, "Referral Form"];
            UpdateDataToDatabase(1, 'DeleteReferralFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Quotation') {
            _QuotationId = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _QuotationId, _LocationId, "Quotation"];
            UpdateDataToDatabase(1, 'DeleteQuotationFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'Receipt') {
            _ReceiptFormId = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _ReceiptFormId, _LocationId, "Receipt"];
            UpdateDataToDatabase(1, 'DeleteReceiptFormDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'ImagesForm') {
            _ImageID = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _ImageID, _LocationId, "ImagesForm"];
            UpdateDataToDatabase(1, 'DeleteImageDetails', _objParams, 'DentalParams');
        } else if (_EssentialFormType == 'FilesForm') {
            _FileId = $(_oBtn).attr('data-id');
            var _objParams = ["DeleteEssentials", _FileId, _LocationId, "FilesForm"];
            UpdateDataToDatabase(1, 'DeleteFileDetails', _objParams, 'DentalParams');
        }


    }
}

function btnPayNowAction_Click(_oBtn) {
    _EditQuotationID = $(_oBtn).attr('data-id');
    var _objParams = ["getQuotationEnquiries", _EditQuotationID, _LocationId, _PatientId, ""];
    GetDataFromDatabase(46, "FillGridQuotationEnq", _objParams, "DentalParams");

    $("#mdlQuotationTreatment").modal('show');
}

function btnCustomAction_Click(_oBtn) {
    if (_EssentialFormType == 'ImagesForm') {
        var _URLID = $(_oBtn).parents('td').prev().attr('data-attr');

        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient Images|' + _URLID + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "PatientImages");
    } else {
        var _URLID = $(_oBtn).parents('td').prev().attr('data-attr');

        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient Essentials|' + _URLID + '|0|0|0|0|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "PatientFiles");
    }
}

function btnView_Click(_oBtn) {
    if (_TabName == 'Essentials') {
        var _url = "";
        if (_EssentialFormType == 'ImagesForm') {
            _ImageID = $(_oBtn).attr('data-id');
            _url = RootFolderPath("RVGCaptures/" + _LocationId + "/" + $($(_oBtn).parents('tr.btmbdr').children()[0]).attr('data-attr'));
            window.open(_url, "_blank");
        } else if (_EssentialFormType == 'FilesForm') {
            _FileId = $(_oBtn).attr('data-id');
            _url = RootFolderPath("RVGCaptures/" + _LocationId + "/" + $($(_oBtn).parents('tr.btmbdr').children()[2]).text());
            window.open(_url, "_blank");
        } else if (_EssentialFormType == 'Consent Form') {
            var recordid = $(_oBtn).attr('data-id');
            _ConsentId = $($(_oBtn).parents('tr.btmbdr').children()[0]).attr('data-attr');
            fn_AngularRouting("./DentalSoft/PrintForms?pat=" + _PatientId + '&form=' + _ConsentId + '&rid=' + recordid);

        } else if (_EssentialFormType == 'Quotation') {
            _QuotationId = $(_oBtn).parents('tr.btmbdr').attr('data-attr');
            fn_AngularRouting("./DentalSoft/PrintQuotation?pat=" + _PatientId + '&q=' + _QuotationId);

        } else if (_EssentialFormType == 'Receipt') {
            _ReceiptFormId = $(_oBtn).parents('tr.btmbdr').attr('data-attr');
            fn_AngularRouting("./DentalSoft/PrintReceipt?pat=" + _PatientId + '&q=' + _ReceiptFormId);

        } else if (_EssentialFormType == 'Referral Form') {
            _ReferralId = $(_oBtn).parents('tr.btmbdr').attr('data-attr');
            fn_AngularRouting("./DentalSoft/PrintReferralForm?pat=" + _PatientId + '&q=' + _ReferralId);

        }

    }
}

function deletetreatmentsteps(_o) {
    if (confirm('Are your sure, you want to delete.')) {
        var _objRecords = ["DelPatTreatSteps", $(_o).attr('data-stepid'), _LocationId, ""];
        UpdateDataToDatabase(1, 'DelTretCard', _objRecords, 'DentalParams');
    }
}

function deletetreatment(_o) {
    if (confirm('Are your sure, you want to delete.')) {
        var _objRecords = ["DelPatTreatCard", $(_o).attr('data-pid'), _LocationId, ""];
        UpdateDataToDatabase(1, 'DelTretSteps', _objRecords, 'DentalParams');
    }
}

function AddNewTreatCard() {
    fn_ClearTreatmentCard();
    $("#txtTreat_AdvFees").val((typeof $("#spnAdvPayStatus").attr('data-amt') == 'undefined' || $("#spnAdvPayStatus").attr('data-amt') == '' ? 0 : $("#spnAdvPayStatus").attr('data-amt')));
    $("#mdlAddNewTreatment").modal('show');

}

function fn_ClearTreatmentCard() {
    $("#ddlTreatments1").val(0);
    fn_checkOwner($("#ddlDoctors1 option:first").val());
    // FillDropDown_JS(false, 'Doctorlist', 'ddlDoctors1', 0, _LocationId, 0, 1, 0, "--Doctor--", false, [], 'Params', null);

    $("#ddlDoctors1").val($("#ddlDoctors1 option:first").val());
    $("#txtTreat_ToothNo").val('');
    $("#txtTreat_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#txtTreat_Piece").val('');
    $("#txtTreat_WorkDone").val('');
    $("#txtTreat_TreatFees").val(0);
    $("#txtTreat_Disc").val(0);
    $("#txtTreat_TotalFee").val(0);
    $("#txtTreat_ConFees").val(0);
    $("#txtTreat_PaidFees").val(0);
    $("#txtTreat_BalFees").val(0);
    // $("#txtTreat_PayMode").val('');

    _TreatmentCardId = 0;
    $("#mdlAddNewTreatment").modal('hide');
}


function fn_TreatProcBalFeeCalculation() {
    var PrevAmt = parseFloat(($("#txtTreatProcPrevFee").val() == '' ? 0 : $("#txtTreatProcPrevFee").val()));
    var DisAmt = parseFloat(($("#txtTreatProcDiscount").val() == '' ? 0 : $("#txtTreatProcDiscount").val()));
    var advfee = parseFloat(($("#txtTreatProcAdvFee").val() == '' ? 0 : $("#txtTreatProcAdvFee").val()));
    var aptFee = parseFloat(($("#txtTreatProcConFee").val() == '' ? 0 : $("#txtTreatProcConFee").val()));

    var treatfee = (PrevAmt + aptFee) - DisAmt;

    $("#txtTreatProcTotalFee").val(treatfee);
    $("#txtTreatProcTotalFee").val(treatfee);
    var Paybleamt = parseFloat(($("#txtTreatProcPaidFee").val() == '' ? 0 : $("#txtTreatProcPaidFee").val())) + advfee;

    var balfee = treatfee - Paybleamt;
    if (balfee >= 0) { $("#txtTreatProcBalFee").val(balfee); $("#txtTreatProcAdvAdjFee").val(0); }
    else { $("#txtTreatProcAdvAdjFee").val(-balfee); $("#txtTreatProcBalFee").val(0); }

}

function fn_CalcTotalFeesProc() {




}

function fn_ClearTreatProcedure() {
    $("#txtTreatProcDate").val(_GlobalPatHistory.CurrentDateYMD);
    //$("#ddlDoctors2").val(0);
    $("#txtTreatProcPiece").val('');
    $("#txtTreatProcWorkdone").val('');
    $("#txtTreatProcTotalFee").val(0);
    $("#txtTreatProcDiscount").val(0);

    $("#txtTreatProcConFee").val(0);
    $("#txtTreatProcPaidFee").val(0);
    $("#txtTreatProcBalFee").val(0);
    $("#txtTreatProcAdvAdjFee").val(0);
    //$("#txtTreatProcPayMode").val('');
    _StepId = 0; _PatTreatId = 0;
    $("#mdlTreatmentProcedure").modal('hide');
}

function fn_TreatFeeCalculation() {
    var treatfee = parseFloat(($("#txtTreat_TreatFees").val() == '' ? 0 : $("#txtTreat_TreatFees").val()));
    var advfee = parseFloat(($("#txtTreat_AdvFees").val() == '' ? 0 : $("#txtTreat_AdvFees").val()));
    //treatfee = treatfee + advfee;

    var disc = parseFloat(($("#txtTreat_Disc").val() == '' ? 0 : $("#txtTreat_Disc").val()));
    //$("#txtTreat_TotalFee").val(treatfee - ((treatfee * disc) / 100));
    $("#txtTreat_TotalFee").val(treatfee - disc);
    var totalfee = parseFloat($("#txtTreat_TotalFee").val());
    //var confee = parseFloat($("#txtTreat_ConFees").val());
    //$("#txtTreat_PaidFees").val(totalfee);
    var paidfee = parseFloat(($("#txtTreat_PaidFees").val() == '' ? 0 : $("#txtTreat_PaidFees").val())) + advfee;
    var balfee = totalfee - paidfee;

    if (balfee < 0) { $("#txtTreat_AdvAdjFees").val(-balfee); $("#txtTreat_BalFees").val(0); }
    else { $("#txtTreat_BalFees").val(balfee); $("#txtTreat_AdvAdjFees").val(0); }
}

function fn_TreatBalFeeCalculation() {
    //var totalfee = parseFloat($("#txtTreat_TotalFee").val());
    //var paidfee = parseFloat($("#txtTreat_PaidFees").val());
    //var balfee = totalfee - paidfee;
    //$("#txtTreat_BalFees").val(balfee)
    fn_TreatFeeCalculation();
}


function editpatient() {
    _PatientRecordId = _PatientId;
    var objRecords = ["GetPatientDetails", _PatientRecordId, _LocationId];
    GetDataFromDatabase(22, 'getEditPatientRecords', objRecords, 'DentalParams');
}

/*Prescription */
function addprescription(_o) {
    _PatTreatId = (typeof $(_o).attr('data-pid') == 'undefined' ? 0 : $(_o).attr('data-pid'));
    _StepId = (typeof $(_o).attr('data-stepid') == 'undefined' ? 0 : $(_o).attr('data-stepid'));


    FillDropDown_JS(true, 'PrescMedicineMaster', 'ddlPresMedicine', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(true, 'PrescInstruction', 'ddlPresInstruction', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    var objRecords = ["getPatientPrescription", "", _PatientId, _LocationId, _PatTreatId, _StepId];
    GetDataFromDatabase(44, 'FillPatPrescriptionTemplate', objRecords, 'DentalParams');

    var objRecords = ["FillTemplateList", "", _PatientId, _LocationId, _PatTreatId, _StepId];
    GetDataFromDatabase(44, 'FillPrescTemplate', objRecords, 'DentalParams');

    $("#mdlPrescription").modal('show');

    $("#ddlPresMedicine").change(function () {
        if (this.value == -1) {
            $("#mdlMedicine").modal('show');
        }
    });
}

function showprescription(_o) {
    _PatTreatId = (typeof $(_o).attr('data-pid') == 'undefined' ? 0 : $(_o).attr('data-pid'));
    _StepId = (typeof $(_o).attr('data-stepid') == 'undefined' ? 0 : $(_o).attr('data-stepid'));

    var objRecords = ["getPatientPrescription", "", _PatientId, _LocationId, _PatTreatId, _StepId];
    GetDataFromDatabase(44, 'ShowPrescTemplate', objRecords, 'DentalParams');


    $("#mdlShowPrescription").modal('show');
}

function SubmitMedcine() {
    if ($("#txtMedicineName").val() == '' || $("#txtMedicineName").val() == 0) {
        
        $("#txtMedicineName").focus(); return false;
    }

    var _objRecords = ["InsertUpdateMedicine"
        , 0
        , $("#txtMedicineName").val()
        , ""
        , _LocationId
        , 0
    ];

    UpdateDataToDatabase(19, 'UpdateMedicineRecords', _objRecords, 'DentalParams');
}

function addprescriptiondetails() {
    if ($("#txtPresQty").val() == '' || $("#txtPresQty").val() == 0) { alert('select qty'); return false; }
    if ($("#ddlPresMedicine").val() == 0 || $("#ddlPresMedicine").val() == -1 || $("#ddlPresMedicine").val() == '' || $("#ddlPresMedicine").val() == 0) { alert('select prescription'); return false; }

    var strHTML = $(".tblCustomePresc").html();
    var qty = $("#txtPresQty").val() + '';
    var x = $("#ddlPresMedicine").val() + '#' + qty.trim() + '#' + $("#ddlPresInstruction").val() + '#' + $("#txtPrescDays").val();
    strHTML += '<tr data-attr="' + x + '">';
    strHTML += '<td class="text-center">' + ($(".tblCustomePresc tr").length + 1) + '</td>';
    strHTML += '<td>' + $("#ddlPresMedicine option:selected").text() + '</td>';
    strHTML += '<td class="text-center">' + $("#txtPresQty").val() + '</td>';
    strHTML += '<td>' + $("#ddlPresInstruction option:selected").text() + '</td>';
    strHTML += '<td class="text-center">' + $("#txtPrescDays").val() + '</td>';
    strHTML += '<td class="text-center"><button onclick="javascript:deletedSelectedrow(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
    strHTML += '</tr>';
    $(".tblCustomePresc").html(strHTML);

    $("#ddlPresMedicine").val(0); $("#txtPresQty").val('0'); $("#ddlPresInstruction").val(0); $("#txtPrescDays").val('');
}

function deletedSelectedrow(_o) {
    $(_o).parent().parent().remove();
}

function SubmitPrescription() {
    var _TemplateDetails = '';
    var _istemplate = 0;
    var _templatename = '';

    if (_PrescTab == 'ReadyPresc') {
        _TemplateDetails = '';
        $(".tblSelectedPresc tr").each(function () {
            _TemplateDetails += '@' + $(this).attr('data-attr');
        });

        _templatename = (typeof $(".tblSelectedPresc").attr('data-name') == 'undefined' ? '' : $(".tblSelectedPresc").attr('data-name'));
        if (_templatename == '') { alert('Select Template'); return false; }
    } else {
        _TemplateDetails = '';
        $(".tblCustomePresc tr").each(function () {
            _TemplateDetails += '@' + $(this).attr('data-attr');
        });

        _istemplate = ($("#chkSaveAsTemplate").prop('checked') == true ? 1 : 0);
        _templatename = $("#txtPresTemplateName").val();

        if (_TemplateDetails == '') { alert('Enter Presecription'); return false; }
    }

    var objRecords = ["", "0", _LocationId, _PatTreatId, _StepId, _PatientId, _TemplateDetails, _istemplate, _templatename];
    UpdateDataToDatabase(42, 'UpdatePrescription', objRecords, 'DentalParams');
}

function ClosePrescription() {
    fn_FillTreatCard();

}

function addPrescTemplate(_o) {

    if (_PrescTab == 'ReadyPresc') {

        $(".tblSelectedPresc").attr('data-name', $(_o).attr('data-name'));

        $(".tblSelectedPresc").html('');
        if (typeof _objPrescTemplate[$(_o).attr('data-name')] != 'undefined') {
            var _obj = _objPrescTemplate[$(_o).attr('data-name')];
            var strHTML = $(".tblSelectedPresc").html(); var iCount = 0;
            iCount = $(".tblSelectedPresc tr").length;
            for (var i = 0; i < _obj.length; i++) {

                var qty = _obj[i]["qty"] + '';
                var x = _obj[i]["mid"] + '#' + qty.trim() + '#' + _obj[i]["iid"] + '#' + _obj[i]["days"];
                strHTML += '<tr data-attr="' + x + '">';
                strHTML += '<td class="text-center">' + (iCount + 1) + '</td>';
                strHTML += '<td>' + _obj[i]["mn"] + '</td>';
                strHTML += '<td class="text-center">' + _obj[i]["qty"] + '</td>';
                strHTML += '<td>' + _obj[i]["in"] + '</td>';
                strHTML += '<td>' + _obj[i]["days"] + '</td>';
                strHTML += '<td class="text-center"><button onclick="javascript:deletedSelectedrow(this);" class="btn btn-danger btn-xs" data-toggle="tooltip" title="Delete"><i class="fa fa-trash-o"></i></button></td>';
                strHTML += '</tr>';
                iCount++;
            }
            $(".tblSelectedPresc").html(strHTML);
        }
    }



}

function deletedPrescTemplate(_o) {
    var objRecords = ["DeletePrescriptionTemplate", $(_o).attr('data-name'), _PatientId, _LocationId, _PatTreatId, _StepId];
    UpdateDataToDatabase(44, 'DeletePrescTemplate', objRecords, 'DentalParams');
}

function printtreatment(_o) {
    fn_AngularRouting("./DentalSoft/PrintTreatCard?type=t&pat=" + _PatientId + "&T=" + $(_o).attr("data-pid"));
}

function printtreatmentsteps(_o) {
    fn_AngularRouting("./DentalSoft/PrintTreatCard?type=s&pat=" + _PatientId + "&T=" + $(_o).attr("data-stepid"));
}


/* Essentials */
var _EssentialFormType = '';
var _ConsentId = 0, _ReferralId = 0, _ReceiptFormId = 0, _QuotationId = 0, _ImageID = 0, _FileId = 0;
var _EnqId = 0, _EditQuotationID = 0, _GroupId = 1;

$(document).ready(function () {
    $("#liEssentials").click(function () {
        _TabName = 'Essentials';
        _EssentialFormType = 'Consent Form';
        FillDropDown_JS(true, 'TreatmentList', 'ddlConsentForm_Treatment', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
        FillDropDown_JS(true, 'TemplateList', 'ddlConsentForm_FormType', "Consent Form", _LocationId, 0, 1, null, null, false, [], 'Params', null);
        $("#txtConsentForm_Date").val(_GlobalPatHistory.CurrentDateYMD);
        fn_FillGridConsentForm();

        var _objParams = ["getEssentialsCount", "0", _LocationId, _PatientId, ""];
        GetDataFromDatabase(46, "getEssentialsCount", _objParams, "DentalParams");
    });
    $("#liConsentForm").click(function () {
        _EssentialFormType = 'Consent Form';
        $("#txtConsentForm_Date").val(_GlobalPatHistory.CurrentDateYMD);
        FillDropDown_JS(true, 'TreatmentList', 'ddlConsentForm_Treatment', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
        FillDropDown_JS(true, 'TemplateList', 'ddlConsentForm_FormType', "Consent Form", _LocationId, 0, 1, null, null, false, [], 'Params', null);
        fn_FillGridConsentForm();
    });
    $("#liReferralForm").click(function () {
        _EssentialFormType = 'Referral Form';
        $("#txtRefForm_date").val(_GlobalPatHistory.CurrentDateYMD);
        FillDropDown_JS(true, 'TreatmentList', 'ddlRefForm_Treatment', _PatientId, _LocationId, 0, 1, null, null, false, [], 'Params', null);
        FillDropDown_JS(true, 'TemplateList', 'ddlRefForm_FormType', "Referral Form", _LocationId, 0, 1, null, null, false, [], 'Params', null);
        fn_FillGridReferralForm();
    });
    $("#liQuotationForm").click(function () {
        _EssentialFormType = 'Quotation';
        $("#txtQuatation_Date").val(_GlobalPatHistory.CurrentDateYMD);
        FillDropDown_JS(true, 'TemplateList', 'ddlQuatation_FormType', "Quotation", _LocationId, 0, 1, null, null, false, [], 'Params', null);
        fn_FillGridQuotationForm();
    });
    $("#liReceiptForm").click(function () {
        _EssentialFormType = 'Receipt';
        $("#txtReceiptForm_date").val(_GlobalPatHistory.CurrentDateYMD);
        FillDropDown_JS(true, 'TreatmentList', 'ddlReceiptForm_Treatment', _PatientId, _LocationId, 0, 1, 0, 'All', false, [], 'Params', null);
        FillDropDown_JS(true, 'TemplateList', 'ddlReceiptForm_FromType', "Receipt", _LocationId, 0, 1, null, null, false, [], 'Params', null);
        fn_FillGridReceiptForm();
    });
    $("#liImagesForm").click(function () { _EssentialFormType = 'ImagesForm'; fn_FillGridIamgeForm(); });
    $("#liFilesForm").click(function () { _EssentialFormType = 'FilesForm'; fn_FillGridFileForm(); });

    $("#btnAddTretmentdesc").click(function () {

        var _objParams = [_EnqId, _PatientId, _LocationId
            , rtnCtrlVal("txtTreatmentDesc", "")
            , rtnCtrlVal("txtToothNoDesc", "")
            , rtnCtrlVal("txtNoOfnits", "0")
            , rtnCtrlVal("txtPerUnitCharges", "0")
            , rtnCtrlVal("txtSubtotal", "0")
            , _EditQuotationID
            , $("#ddlQGroup").val()
        ];


        UpdateDataToDatabase(56, "UpdateQuotationEnq", _objParams, "DentalParams");
    });

    $("#rdoORQuo").click(function () {
        _GroupId += 1;
    });

});

function calSubTotal() {
    var qty = rtnCtrlVal("txtNoOfnits", "0");
    var charges = rtnCtrlVal("txtPerUnitCharges", "0");
    $("#txtSubtotal").val(charges * qty);
}

function fn_FillGridConsentForm() {
    var _objParams = ["GridFillConsentForm", _ConsentId, _LocationId, _PatientId, "Consent Form"];
    GetDataFromDatabase(46, "FillGridConsentForms", _objParams, "DentalParams");
}

function fn_InsertConsectForm() {
    var _objParams = [_ConsentId, _LocationId, _PatientId, _EssentialFormType
        , $("#txtConsentForm_Date").val()
        , ($("#ddlConsentForm_Treatment").val() == null ? 0 : $("#ddlConsentForm_Treatment").val())
        , ($("#txtConsentForm_ToothNo").val() == null ? 0 : $("#txtConsentForm_ToothNo").val())
        , ($("#ddlConsentForm_FormType").val() == null ? 0 : $("#ddlConsentForm_FormType").val())
        , ""
    ];
    UpdateDataToDatabase(45, "UpdateConsentForm", _objParams, "DentalParams");
}

function fn_clearConsentForm() {
    _ConsentId = 0
    $("#txtConsentForm_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#ddlConsentForm_Treatment").val(0);
    $("#txtConsentForm_ToothNo").val('');
    $("#ddlConsentForm_FormType").val(0);
    $("#mdlConsentForms").modal('hide');
}

function fn_FillGridReferralForm() {
    var _objParams = ["GridFillReferralType", _ReferralId, _LocationId, _PatientId, "Referral Form"];
    GetDataFromDatabase(46, "FillGridReferralForms", _objParams, "DentalParams");
}

function fn_InsertRefferalForm() {
    var _objParams = [_ConsentId, _LocationId, _PatientId, _EssentialFormType
        , $("#txtRefForm_date").val()
        , $("#ddlRefForm_Treatment").val()
        , ""
        , $("#ddlRefForm_FormType").val()
        , ""
    ];
    UpdateDataToDatabase(45, "UpdateReferralForm", _objParams, "DentalParams");
}

function fn_clearReferralForm() {
    _ReferralId = 0
    $("#txtRefForm_date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#ddlRefForm_Treatment").val(0);
    $("#ddlRefForm_FormType").val(0);
    $("#mdlReferralForms").modal('hide');
}

function fn_FillGridQuotationForm() {
    var _objParams = ["GridFillQuatation", _EditQuotationID, _LocationId, _PatientId, "Quotation"];
    GetDataFromDatabase(46, "FillGridQuotationForms", _objParams, "DentalParams");
}

function fn_InsertQuatation() {
    var _objParams = [_QuotationId, _LocationId, _PatientId, _EssentialFormType
        , $("#txtQuatation_Date").val()
        , "0"
        , ""
        , $("#ddlQuatation_FormType").val()
        , ""
    ];
    UpdateDataToDatabase(45, "UpdateQuotationForm", _objParams, "DentalParams");
}


function fn_clearQuotationForm() {
    _QuotationId = 0
    $("#txtQuatation_Date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#ddlQuatation_FormType").val(0);
    $("#mdlQuatationForm").modal('hide');
}

function fn_FillGridReceiptForm() {
    var _objParams = ["GridFillReceipt", _ReceiptFormId, _LocationId, _PatientId, "Receipt"];
    GetDataFromDatabase(46, "FillGridReceiptForms", _objParams, "DentalParams");
}

function fn_FillGridCustomeReceiptForm() {
    var _objParams = ["CustomeTreaments", _ReceiptFormId, _LocationId, _PatientId, "Receipt"];
    GetDataFromDatabase(46, "getCustomeReceiptsForm", _objParams, "DentalParams");
}

function fn_InsertReceiptsForm() {
    var _objParams = [_ReceiptFormId, _LocationId, _PatientId, _EssentialFormType
        , $("#txtReceiptForm_date").val()
        , $("#ddlReceiptForm_Treatment").val()
        , ""
        , $("#ddlReceiptForm_FromType").val()
        , ""
    ];
    UpdateDataToDatabase(45, "UpdateReceiptsForm", _objParams, "DentalParams");
}

function fn_clearReceiptForm() {
    _ReceiptFormId = 0
    $("#txtReceiptForm_date").val(_GlobalPatHistory.CurrentDateYMD);
    $("#ddlReceiptForm_Treatment").val(0);
    $("#ddlReceiptForm_FromType").val(0);
    $("#mdlReceiptForm").modal('hide');
}


function fn_UploadImages() {
    var _extension = '';
    var fileUpload = $("#uplImageUpload").get(0);
    var files = fileUpload.files;
    if (files.length <= 0) { alert('Choose File'); return false; } else {
        _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
    }
    if ($("#txtImageUpload").val() == '') { alert('Enter Image Title'); return false; }


    var _objParams = [_ConsentId, _LocationId, _PatientId, _EssentialFormType
        , _GlobalPatHistory.CurrentDate
        , "0"
        , _extension
        , "0"
        , $("#txtImageUpload").val()
    ];
    UpdateDataToDatabase(45, "UpdateImageForm", _objParams, "DentalParams");

}

function fn_FillGridIamgeForm() {
    var _objParams = ["GridFillImages", _ReceiptFormId, _LocationId, _PatientId, _EssentialFormType];
    GetDataFromDatabase(46, "FillGridImagesForms", _objParams, "DentalParams");
}


function fn_UploadFiles() {
    var _extension = '';
    var fileUpload = $("#uplFileUpload").get(0);
    var files = fileUpload.files;
    if (files.length <= 0) { alert('Choose File'); return false; } else {
        _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
    }
    if ($("#txtFileUpload").val() == '') { alert('Enter File Title'); return false; }

    if (_extension != 'pdf') { alert('Accepts only pdf file'); return false; }

    var _objParams = [_ConsentId, _LocationId, _PatientId, _EssentialFormType
        , _GlobalPatHistory.CurrentDate
        , "0"
        , _extension
        , "0"
        , ($("#txtFileUpload").val() == null ? 0 : $("#txtFileUpload").val())
    ];
    UpdateDataToDatabase(45, "UpdateFileForm", _objParams, "DentalParams");

}

function fn_FillGridFileForm() {
    var _objParams = ["GridFillImages", _ReceiptFormId, _LocationId, _PatientId, _EssentialFormType];
    GetDataFromDatabase(46, "FillGridFileForms", _objParams, "DentalParams");
}


