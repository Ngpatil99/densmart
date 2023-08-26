var _RoleID = 0, _UserID = 0, _LocationId = $qc.Cookie("locationid"), _SubLocationId = $qc.Cookie("sublocationid");
var _tabName = 'UserMaster';

$(document).ready(function () {

    fn_FillUserGrid();
    FillDropDown_JS(true, 'RoleMaster', 'ddlUserRole', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    $("#liUserName").click(function () { _tabName = 'UserMaster'; fn_FillUserGrid(); FillDropDown_JS(true, 'RoleMaster', 'ddlUserRole', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null); });
    $("#liUserRole").click(function () {
        _tabName = 'UserRole'; fn_FillGrid();
        FillDropDown_JS(true, 'RoleMaster', 'ddlRoleMaster', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    });

    $("#ddlRoleMaster").change(function () {

        var objRecords = ["getAssignedRole", _LocationId, this.value, ""];
        GetDataFromDatabase(53, 'FillGrid_AssignedRole', objRecords, 'DentalParams');
    });

    $("#btnSubmitRoleMaster").click(function () {
        if (rtnCtrlVal("txtUserRoleName", "") == '') { alert('Fill all mandatory filds'); return false; }
        var _objRecords = ["InsertUpdate"
            , _RoleID
            , rtnCtrlVal("txtUserRoleName", "")
            , _LocationId

        ];

        UpdateDataToDatabase(52, 'UpdateRoleMaster', _objRecords, 'DentalParams');
    });

    $("#btnSubmitUserMaster").click(function () {
        if (rtnCtrlVal("txtUserName", "") == '' || rtnCtrlVal("txtUserPwd", "") == '' || rtnCtrlVal("txtUserMobileNo", "") == '') { alert('Fill all mandatory filds'); return false; }
        var _objRecords = [_UserID
            , rtnCtrlVal("txtUserName", "")
            , rtnCtrlVal("ddlUserRole", "")
            , rtnCtrlVal("txtUserPwd", "")
            , rtnCtrlVal("txtUserMobileNo", "")
            , rtnCtrlVal("txtUserEmailId", "")
            , _LocationId
            , rtnCtrlVal("ddlBioStatus", "0")
            , rtnCtrlVal("ddlISConsultingDr", "0")
            
        ];

        UpdateDataToDatabase(54, 'UpdateUserMaster', _objRecords, 'DentalParams');
    });

    $("#btnSubmitRoleRights").click(function () {
        if (rtnCtrlVal("ddlRoleMaster", "0") == '0') { alert('Fill all mandatory filds'); return false; }

        var parentids = '', childids = '', fields = '';
        $(".clsRoleRights").each(function () {
            if ($(this).prop('checked') == true) {
                parentids += (parentids == '' ? $(this).attr('data-attr') : ',' + $(this).attr('data-attr'));
            }

        });

        //$(".clsRoleRights").each(function () {
        //    if ($(this).prop('checked') == true) {
        //        if (typeof $(this).attr('data-tab') != 'undefined') {
        //            childids += (childids == '' ? $(this).attr('data-attr') + '-' + $(this).attr('data-tab') : ',' + $(this).attr('data-attr') + '-' + $(this).attr('data-tab'));
        //        }
        //    }
        //});

        //$(".clsRoleRights").each(function () {
        //    if ($(this).prop('checked') == true) {
        //        if (typeof $(this).attr('data-fields') != 'undefined') {
        //            fields += (fields == '' ? $(this).attr('data-attr') + '-' + $(this).attr('data-tab') + '-' + $(this).attr('data-fields') : ',' + $(this).attr('data-attr') + '-' + $(this).attr('data-tab') + '_'+ $(this).attr('data-fields'));
        //        }
        //    }
        //});

        var _objRecords = ["0"
            , _LocationId
            , rtnCtrlVal("ddlRoleMaster", "0")
            , parentids
            , childids
            , fields
        ];

        UpdateDataToDatabase(55, 'AssignRole', _objRecords, 'DentalParams');
    });


});

function fn_FillGrid() {
    var objRecords = ["ListOfUserRoleMaster", _RoleID, _LocationId, _SubLocationId];
    GetDataFromDatabase(51, 'FillGrid_UserRole', objRecords, 'DentalParams');

}

function fn_FillUserGrid() {
    var objRecords = ["UserMasterGrid", _LocationId, _UserID, ""];
    GetDataFromDatabase(53, 'FillGrid_UserMaster', objRecords, 'DentalParams');

}

function fn_GridActionButton(_o) {
    if ($(_o).attr('data-ctrl') == 'ancAddNewRole') {
        $("#txtUserRoleName").val(''); _RoleID = 0;
        $("#mdlUserRoleMaster").modal('show');
    }
    if ($(_o).attr('data-ctrl') == 'ancAddUser') {
        _UserID = 0;
        $("#txtUserName").val('');
        $("#txtUserMobileNo").val('');
        $("#txtUserEmailId").val('');
        $("#txtUserPwd").val('');
        $("#ddlUserRole").val(0);
        $("#mdlUserMaster").modal('show');
    }

}


function btnEditAction_Click(_oBtn) {
    if (_tabName == 'UserMaster') {
        _UserID = $(_oBtn).attr('data-id');
        var objRecords = ["getUserMaster", _LocationId, _UserID, ""];
        GetDataFromDatabase(53, 'getUserMasterDetails', objRecords, 'DentalParams');

    } else {
        _RoleID = $(_oBtn).attr('data-id');
        var objRecords = ["GetUserRoleDetails", _RoleID, _LocationId, _SubLocationId];
        GetDataFromDatabase(51, 'getRoleEditRecords', objRecords, 'DentalParams');
    }

}

function btnDeleteAction_Click(_oBtn) {
    if (_tabName == 'UserMaster') {
        _UserID = $(_oBtn).attr('data-id');

    } else {
        _RoleID = $(_oBtn).attr('data-id');

        var _objRecords = ["DeleteRoleMaster", _RoleID, _LocationId, ""];
        UpdateDataToDatabase(1, 'DeleteRoleMaster', _objRecords, 'DentalParams');
    }
}

function onGetDataSuccess(data, context) {
    /*Doctor Tab*/
    if (context == 'UpdateRoleMaster') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        $("#txtUserRoleName").val('');
        fn_FillGrid();
        /*Upload File End */
        FillDropDown_JS(true, 'RoleMaster', 'ddlRoleMaster', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

        $("#mdlUserRoleMaster").modal('hide');
    }
    else if (context == 'FillGrid_UserRole') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '',
            header: ['SNo', 'Ref.ID', 'Role Name', 'Action#ancAddNewRole'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4],
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
    else if (context == 'getRoleEditRecords') {
        if (data == 0 || data == '') { return false; }
        $("#mdlUserRoleMaster").modal('show');

        $("#txtUserRoleName").val(data.split('|')[1]);

    }
    else if (context == 'DeleteRoleMaster') {
        ctlDetails.DeleteArray(_RoleID, 1);
        FillDropDown_JS(true, 'RoleMaster', 'ddlRoleMaster', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

        _RoleID = 0;
    }

    else if (context == 'getUserMasterDetails') {
        if (data == 0 || data == '') { return false; }
        $("#mdlUserMaster").modal('show');

        $("#txtUserName").val(data.split('|')[1]);
        $("#ddlUserRole").val(data.split('|')[2]);
        $("#txtUserMobileNo").val(data.split('|')[3]);
        $("#txtUserEmailId").val(data.split('|')[4]);
        $("#txtUserPwd").val(data.split('|')[5]);
        $("#ddlBioStatus").val(data.split('|')[6]);
        $("#ddlISConsultingDr").val(data.split('|')[7]);
        

    }
    else if (context == 'FillGrid_UserMaster') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'User.ID', 'User Name', 'Role Name', 'Mobile', 'Email', 'Password', 'BiomatricsEnable', 'Action#ancAddUser'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 20, 20],
            headerval: [1, 1, 1, 2, 3, 4, 5, 6, 7],
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
    else if (context == 'UpdateUserMaster') {
        if (data == '' || data == 0) { alert('500 error fired..'); return false; }
        $("#txtUserName").val('');
        $("#ddlUserRole").val('0'); $("#ddlBioStatus").val('0'); $("#ddlISConsultingDr").val('0');
        $("#txtUserPwd").val('');
        $("#txtUserMobileNo").val('');
        $("#txtUserEmailId").val('');
        fn_FillUserGrid();
        /*Upload File End */

        $("#mdlUserMaster").modal('hide');
    }

    else if (context == 'AssignRole') {
       
    }
    else if (context == 'FillGrid_AssignedRole') {
        $(".clsRoleRights").prop('checked', false);

        if (data == '') { return false; }
        var parentids = data.split('|')[1];
        var childids = data.split('|')[2];

        for (var i = 0; i < parentids.split(',').length; i++) {
            $(".clsRoleRights[data-attr='" + parentids.split(',')[i] + "']").prop('checked', true);
        }

        //for (var i = 0; i < childids.split(',').length; i++) {
        //    var _a = childids.split(',')[i].split('-');
        //    $(".clsRoleRights[data-attr='" + _a[0] + "'][data-tab='" + _a[1] + "']").prop('checked', true);
        //}

    }
}