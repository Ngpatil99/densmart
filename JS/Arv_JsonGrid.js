/*
    for Default Column Sorting Use This
    $(".clsDefaultSorting").attr('title', 1);
    ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
 */
var _0data = '<div class="_0data"><div class="_00data"><div class="_1data"><i class="fa fa-recycle"></i></div><div class="_2data"><span class="_3data">No Record Found</span><span class="_4data"></span></div></div></div>';

function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#'; for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    } return color;
}
var _randomColor = getRandomColor();

function fn_arvGrid(_objVariables) {


    this.DivID = 'GridResult' + _objVariables.CtrlId;
    this.tableid = 'tblResult' + _objVariables.CtrlId;
    this.header = _objVariables.header;
    this.headerval = _objVariables.headerval;
    this.DefaultRow = _objVariables.DefaultRow;
    this.SortType = _objVariables.SortType;
    this.dataAttr = _objVariables.dataArr;
    this.width = _objVariables.width;
    this.CoumnType = _objVariables.ColumnType;
    this.ColumnShow = _objVariables.ColumnShow;
    this.GridType = 'Grid';
    this.isTools = true;
    this.IsAddBlankRow = _objVariables.IsAddBlankRow;
    this.advSearch = _objVariables.advSearch;
    this.checkbox = _objVariables.checkbox;
    this.IsActionButton = _objVariables.IsActionButton;
    this.header_align = _objVariables.header_align;
    this.chkvalue = _objVariables.chkVal;
    this.objectJSON = _objVariables.objectJSON;
    this.SelectOnEnter = _objVariables.SelectRowOnEnter;
    this.ColumnsToCalculate = _objVariables.ColumnToCalculate;
    this.PageTitle = ((typeof _objVariables.PageTitle == 'undefined' || _objVariables.PageTitle == 'null') ? "" : _objVariables.PageTitle);
    this.IsLinkButton = ((typeof _objVariables.IsLinkButton == 'undefined' || _objVariables.IsLinkButton == 'null' || _objVariables.IsLinkButton == false) ? false : true);
    this.LinkButtonColumns = ((typeof _objVariables.LinkButtonColumns == 'undefined' || _objVariables.LinkButtonColumns == [] || _objVariables.LinkButtonColumns == '') ? [] : _objVariables.LinkButtonColumns);
    this.ObjColumnTotalJSON = [];
    this.display_align = ['center']; this.header_css = 'headercss'; this.display_css = 'displaycss'; this.tablecss = 'tablecss'; this.jsevent = []; this.tooltip = []; this.js = []; this.hdnVal = ''; this.sort = 1; this.objRow = null;
    this.objSelectedData = []; var sort = 1; var objFunctions = this;
    this.selectRow = function () { return $("#" + this.DivID + " .yellow").attr('data-attr'); };
    this.SumOfColumn = function (index) {
        var intSummationVal = 0;
        for (var iCount = 0; iCount < this.objSelectedData.length; iCount++) {
            intSummationVal = intSummationVal + parseFloat(this.objSelectedData[iCount][index]);
        }
        return intSummationVal;
    }
    this.getSelectedValues = function () {
        var selectedcheckbox = $("#" + this.DivID + ' #selectedValue').html();
        if (typeof selectedcheckbox != 'undefined') {
            $("#" + this.DivID + " .chkClass1").each(function () {
                if (typeof $(this).attr('data-attr') != 'undefined') {
                    selectedcheckbox = (selectedcheckbox == '') ? $(this).attr('data-attr') : selectedcheckbox + ',' + $(this).attr('data-attr');
                }
            });
            var _t = selectedcheckbox.split(','); _t = UniqueArray(_t);

            return _t.join();
        } else {
            return '';

        }

    };
    this.setSelectedValues = function (str) { $("#" + this.DivID + " .chkClass").each(function () { if (str.indexOf($(this).attr('data-attr')) >= 0) { $(this).attr('class', 'chkClass1'); } }); };
    this.setSelectedRows = function (val) {

        $("#" + this.DivID + " .btmbdr").each(function () {
            if (val == $(this).attr('data-attr')) {
                $(this).addClass('yellow');
            }
        });
    };
    this.intCell = function () { if (this.IsActionButton == null) { return this.header.length; } else { return this.header.length; } };
    this.PushToArray = function (oReturnValue) { if (oReturnValue != '') { var returnArr = oReturnValue.split('|'); var y = ''; for (var i = 0; i < returnArr.length; i++) { y = (y == '') ? "'" + (i + 1) + "':'" + returnArr[i] + "'" : y + ",'" + (i + 1) + "':'" + returnArr[i] + "'"; } y = 'var x={' + y + '};'; eval(y); if (this.objectJSON != null) { this.objectJSON.push(x); } this.FillGrid(this.sort, 1, 0); } };
    this.EditArray = function (oReturnValue, matchid) { if (matchid == 0) { matchid = this.chkvalue; } if (oReturnValue != '') { var returnArr = oReturnValue.split('|'); for (var j = 0; j < this.objectJSON.length; j++) { if (this.objectJSON[j][matchid] == returnArr[0]) { for (var key in this.objectJSON[j]) { this.objectJSON[j][key] = returnArr[parseInt(key) - 1]; } break; } } this.FillGrid(this.sort, 1, 0); } };
    this.ChangeActiveSatus = function (RecordId, ActiveStatus, matchid, StatusKey) { if (matchid == 0) { matchid = this.chkvalue; } for (var j = 0; j < this.objectJSON.length; j++) { if (this.objectJSON[j][matchid] == RecordId) { this.objectJSON[j][StatusKey] = ActiveStatus; break; } } this.FillGrid(this.sort, 1, 0); };
    this.DeleteArray = function (selectedRow, matchid) { if (matchid == 0) { matchid = this.chkvalue; } if (typeof this.objectJSON != "undefined") { var result = []; for (var i = 0; i < this.objectJSON.length; i++) { var item = this.objectJSON[i]; if (this.objectJSON[i][matchid] != selectedRow) { result.push(item); } } this.objectJSON = result; this.FillGrid(this.sort, 1, 0); } };
    this.nextButton = function () {
        if (parseInt($("#hdnPg" + this.tableid).html()) < parseInt($("#hdnCount" + this.tableid).html())) {
            $('#hdnPg_h' + this.tableid).html(parseInt($('#hdnPg_h' + this.tableid).html()) + 1);
            $('#hdnPg' + this.tableid).html(parseInt($('#hdnPg_h' + this.tableid).html()));
            var j = parseInt($('#hdnPg_h' + this.tableid).html());
            var total = parseInt($('#hdnCount_h' + this.tableid).html());
            try {
                if (j >= total) { enadis('', '', 'none', 'none', this.DivID); } else { enadis('', '', '', '', this.DivID); }
                this.FillGrid(this.sort, 1, 1);
            } catch (e) { }
        }
        else {
            return false;
        }

    };
    this.prevButton = function () {
        if (parseInt($("#hdnPg" + this.tableid).html()) < 2) {
            return false;
        } else {

            $('#hdnPg_h' + this.tableid).html(parseInt($('#hdnPg_h' + this.tableid).html()) - 1);
            $('#hdnPg' + this.tableid).html(parseInt($('#hdnPg_h' + this.tableid).html()));
            var j = parseInt($('#hdnPg_h' + this.tableid).html());
            try {
                this.FillGrid(this.sort, 1, 1);
                if (j == 1) {
                    enadis('none', 'none', '', '', this.DivID);
                } else {
                    enadis('', '', '', '', this.DivID);
                }
            } catch (e) { console.log(e.message); }
        }
    };
    this.lastButton = function () { $('#hdnPg_h' + this.tableid).html(parseInt($('#hdnCount_h' + this.tableid).html())); $("#" + this.DivID + ' #hdnPg').html(parseInt($('#hdnCount_h' + this.tableid).html())); var j = parseInt($("#" + this.DivID + ' #hdnPg_h').html()); try { this.FillGrid(this.sort, 1, 1); enadis('', '', 'none', 'none', this.DivID); } catch (e) { alert(e); } };
    this.firstButton = function () { $('#hdnPg_h' + this.tableid).html(1); $('#hdnPg' + this.tableid).html(1); var j = parseInt($("#" + this.DivID + ' #hdnPg_h').html()); try { this.FillGrid(this.sort, 1, 1); enadis('none', 'none', '', '', this.DivID); } catch (e) { alert(e); } };
    this.GrdActiveDeactive = function (_oGridActDct) {

        $("#" + this.DivID + " ._btnGrdList").removeClass('active');
        $("#" + this.DivID + " ._btnGrdGrid").removeClass('active');
        $(_oGridActDct).addClass('active');
        $qc.setCookie("GrdActiveDeactive", $(_oGridActDct).attr('data-attr'));
        $('#hdnPg_h' + this.tableid).html(1); $('#hdnPg' + this.tableid).html(1);
        var j = parseInt($('#hdnPg_h' + this.tableid).html()); try { this.FillGrid(this.sort, 1, 1); enadis('none', 'none', '', '', this.DivID); } catch (e) { alert(e); }
    };
    this.CreateTable = function () {
        var strTools = "";
        if (document.getElementById(this.DivID) == null) { return false; }
        if (this.isTools == true) { strTools = "<div class='tolds'> <button style='height:28px;' class='btn green btn-outline dropdown-toggle' data-toggle='dropdown' aria-expanded='false'>Tools<i class='mdi mdi-chevron-down'></i></button> <ul class='dropdown-menu pull-right'><li><a id='ancPrintGrid' href='javascript:;' > Print </a></li><li><a href='javascript:;'  id='ancExportToEXL'  >Export to Excel</a></li></ul></div>"; }
        document.getElementById(this.DivID).innerHTML = "<div class='Header_top'><div id='contain_left' class='contain_left'></div>" + strTools + "<div class='contain'><div class='newest' id='btnFirst_h" + this.tableid + "' ></div><div class='newer' id='btnPre_h" + this.tableid + "' ></div><div class='page_total'><div class='pg'></div><div id='hdnPg_h" + this.tableid + "' class='txt1'>1</div><div class='of'>of</div><div id='hdnCount_h" + this.tableid + "' class='txt1'>1</div></div><div class='older' id='btnNext_h" + this.tableid + "'  ></div><div class='oldest' id='btnLast_h" + this.tableid + "' ></div><div class='row'><input  title='Change The No. And Press Enter Key. (Only Numbers Allowed)'  class='txtb txtRowCount_h' id='txtRowCount_h" + this.tableid + "' type='text' value='" + this.DefaultRow + "' /></div></div><div class='clear'></div></div><div class='wrapper'><div id='divscroll' align='center' class='mdl_bdr'><table border='0' cellpadding='0' cellspacing='0' class='table table-bordered tblResult'><thead  id='" + this.tableid + "_Head'></thead><tbody  id='" + this.tableid + "'></tbody></table></div><div class='Header_bottom'><div class='contain_left_bt'><div id='totalCount" + this.tableid + "'>Total :-0</div></div><div class='content_center'><button class='_btnExcel' onclick='javascript:fn_ExportToExcel(this);' title='Export to excel' data-attr='_btnExcel' ><i class='fa fa-file-excel-o '></i></button><button class='_btnGrdGrid active' data-attr='_btnGrdGrid' ><i class='fa fa-th'></i></button><button data-attr='_btnGrdList' class='_btnGrdList' ><i class='fa fa-list'></i></button></div><div class='contain'><div class='newest' id='btnFirst" + this.tableid + "' ></div><div class='newer' id='btnPre" + this.tableid + "' ></div><div class='page_total'><div class='pg'></div><div id='hdnPg" + this.tableid + "' class='txt1'>1</div><div class='of'>of</div><div id='hdnCount" + this.tableid + "' class='txt1'>1</div></div><div class='older' id='btnNext" + this.tableid + "' ></div><div class='oldest' id='btnLast" + this.tableid + "' ></div><div class='row'><input title='Change The No. And Press Enter Key. (Only Numbers Allowed)' class='txtb txtRowCount' id='txtRowCount" + this.tableid + "' type='text' value='" + this.DefaultRow + "' /></div></div><div class='clear'></div></div><div class='clear'></div><div id='selectRow' style='display:none;'></div><div id='selectedValue' style='display:none;'></div></div><div title='1' class='ascending clsDefaultSorting' style='display: none;'>Default Sorting</div>";
        if (typeof appendLinks != 'undefined') { appendLinks(this.DivID); }
        if (this.isTools == true) {
            $("#" + this.DivID + " #ancPrintGrid").click(function () {
                objFunctions.PrintGrid('print');
            }); $("#" + this.DivID + " #ancExportToPDF").click(function () {
                objFunctions.ExportToFormat('pdf');
            }); $("#" + this.DivID + " #ancExportToCSV").click(function () { objFunctions.ExportToFormat('doc'); });
            $("#" + this.DivID + " #ancExportToEXL").click(function () {
                objFunctions.ExportToFormat('excel');
            });
        }
        $("#btnFirst_h" + this.tableid).click(function () { objFunctions.firstButton(); }); $("#btnNext_h" + this.tableid).click(function () { objFunctions.nextButton(); }); $("#btnLast_h" + this.tableid).click(function () { objFunctions.lastButton(); }); $("#btnPre_h" + this.tableid).click(function () { objFunctions.prevButton() }); $("#btnFirst" + this.tableid).click(function () { objFunctions.firstButton(); }); $("#btnNext" + this.tableid).click(function () { objFunctions.nextButton(); }); $("#btnLast" + this.tableid).click(function () { objFunctions.lastButton(); }); $("#btnPre" + this.tableid).click(function () { objFunctions.prevButton(); }); $("#txtRowCount_h" + this.tableid).blur(function () { objFunctions.ChangeRowSize(this); }); $("#txtRowCount" + this.tableid).blur(function () { objFunctions.ChangeRowSize(this); });
        $("#" + this.DivID + " ._btnGrdList").click(function () { objFunctions.GrdActiveDeactive(this); });
        $("#" + this.DivID + " ._btnGrdGrid").click(function () { objFunctions.GrdActiveDeactive(this); });
    };
    this.ChangeRowSize = function (obj1, evt) {
        $('#hdnPg_h' + this.tableid).html(1); $('#txtRowCount' + this.tableid).val(obj1.value);
        this.CalculateTotalNumbers();
        this.FillGrid(this.sort, 3, 1);
    };
    this.CalculateTotalNumbers = function () {
        var txt = this.objSelectedData.length; var x = $("#txtRowCount" + this.tableid).val(); $('#hdnCount_h' + this.tableid).html(Math.ceil(parseInt(txt) / parseInt(x)));
        $('#hdnCount' + this.tableid).html($('#hdnCount_h' + this.tableid).html()); $('#hdnPg_h' + this.tableid).html(1);
        var Tcount = $('#totalCount' + this.tableid).html();
        Tcount = parseInt(Tcount.replace('<i class="mdi mdi-check" aria-hidden="true"></i>Total Record Count :- ', ''));
        if (Tcount <= parseInt(x)) { $("#" + this.DivID + ' .contain').hide(); } else { $("#" + this.DivID + ' .contain').show(); }
        if (parseInt(txt) <= parseInt(x)) { enadis('none', 'none', 'none', 'none', this.DivID); } else { enadis('none', 'none', '', '', this.DivID); }
    };
    this.AllCheckBoxSelection = function (obj) { var _t = []; if ($(obj).attr('class') == 'chkClass1') { $(obj).attr('class', 'chkClass'); } else { $(obj).attr('class', 'chkClass1'); } if ($(obj).attr('class') == 'chkClass1') { $("#" + this.DivID + ' .chkClass').attr('class', 'chkClass1'); } else { $("#" + this.DivID + ' .chkClass1').attr('class', 'chkClass'); } $("#" + this.DivID + ' .chkClass1').each(function () { _t.push($(this).attr('data-attr')); }); $("#" + this.DivID + ' #selectedValue').html(_t.join()); };
    this.SelectRowForEdit = function (_objRow) {
        $("#" + this.DivID + ' #selectRow').html(_objRow.title);
        this.objRow = _objRow;
        if ($(_objRow).hasClass('yellow')) {
            $("#" + this.DivID + " .btmbdr").removeClass('yellow'); if (typeof this.IsAddBlankRow != 'undefined') {
                if (this.IsAddBlankRow == true) { $("#" + this.DivID + " .rowHide").hide(); $(_objRow).next().hide(); }
            }
        }
        else {
            $("#" + this.DivID + " .btmbdr").removeClass('yellow'); $(_objRow).addClass('yellow'); if (typeof this.IsAddBlankRow != 'undefined') {
                if (this.IsAddBlankRow == true) {
                    $("#" + this.DivID + " .blankrow").html(''); $("#" + this.DivID + " .rowShow").attr('class', 'rowHide'); $("#" + this.DivID + " .rowShow").css('background', '#fff'); $(_objRow).next().show(); $($(_objRow).next()).attr('class', 'rowShow');
                    cell = $(_objRow).next().children(0)[0]; if (typeof fillSubTable != 'undefined') { fillSubTable(cell, this.DivID); }
                }
            }
        }
    };
    this.SelectRowOnEnterPress = function (_objRow) {
        $("#" + this.DivID + ' #selectRow').html(_objRow.title);
        this.objRow = _objRow;
        if ($(_objRow).hasClass('yellow')) {
            if (typeof fn_SelectRowOnEnterPress != 'undefined') {
                fn_SelectRowOnEnterPress(this.DivID, _objRow);
            }
        }
    };
    this.CheckboxSelection = function (obj) {
        var _t = $("#" + this.DivID + ' #selectedValue').html().split(',');
        var _tt = _t.filter(function (v) {
            return v !== ''
        });
        if (obj.className == 'chkClass') {
            obj.setAttribute('className', 'chkClass1'); obj.setAttribute('class', 'chkClass1'); _tt.push($(obj).attr('data-attr'));
        } else {
            obj.setAttribute('className', 'chkClass');
            obj.setAttribute('class', 'chkClass');
            _tt = jQuery.grep(_tt, function (value) { return value != $(obj).attr('data-attr'); });
        }
        _tt = UniqueArray(_tt);
        $("#" + this.DivID + ' #selectedValue').html(_tt.join());
        event.stopPropagation();
    };
    this.AscendingDescendingArr = function (obj) {

        if ($(obj).hasClass('ascending') == true) {

            $(obj).removeClass('ascending');
            $(obj).addClass('desending');
            this.header_css = 'desending';
        } else {
            $(obj).removeClass('desending');
            $(obj).addClass('ascending');
            this.header_css = 'ascending';
        }
        this.objSelectedData = sortJSON(this.objSelectedData, this.SortType[parseInt($(obj).attr('title'))], $(obj).attr('title'), this.header_css); this.FillGrid(1, $(obj).attr('title'), 1);
    };
    this.FillGrid = function (_i, j, start) {


        var tbl = document.getElementById(this.tableid);

        if (start == 0) {
            this.objSelectedData = this.objectJSON;
            this.CreateTable(); tbl = document.getElementById(this.tableid);
            $("#" + this.DivID + ' #selectedValue').html('');
            $("#" + this.DivID + ' #selectRow').html('');
        }
        if (tbl == null) { return false; }

        if (tbl.rows.length > 0) { deleteRowforGrid(this.tableid); }
        $('#totalCount' + this.tableid).html('<i class="mdi mdi-check" aria-hidden="true"></i>Total Record Count :- ' + this.objSelectedData.length);
        this.sort = j; sort = j;

        if (start == 0) { this.CalculateTotalNumbers(); }

        var intcheckbox = 0, rowCount = tbl.rows.length;
        var tblHead = document.getElementById(this.tableid + '_Head');
        if (tblHead.rows.length > 0) { deleteRowforGrid(this.tableid + '_Head'); }

        var row0 = tblHead.insertRow(tblHead.rows.length)

        if (this.advSearch == true) { var row_serach = tbl.insertRow(tbl.rows.length); }
        if (this.checkbox == true) {
            //var cellChkBoxAll = row0.insertCell(0);
            var cellChkBoxAll = document.createElement('th'); $(row0).append(cellChkBoxAll);
            cellChkBoxAll.style.width = '20px';
            cellChkBoxAll.style.height = '22px';
            cellChkBoxAll.setAttribute('class', 'chkClass');
            cellChkBoxAll.setAttribute('className', 'chkClass');

            cellChkBoxAll.onclick = function () { objFunctions.AllCheckBoxSelection(this); };
            cellChkBoxAll.style.cursor = 'pointer'; intcheckbox = 1;
            var cell_search0 = row_serach.insertCell(0); cell_search0.innerHTML = '';
        }
        for (var intCellHeader = 0; intCellHeader < parseInt(this.intCell()); intCellHeader++) {
            var cell0 = document.createElement('th'); $(row0).append(cell0);
            $(cell0).attr('data-lang', 'th');
            cell0.innerHTML = (intCellHeader == 0) ? 'S.No' : this.header[intCellHeader];
            if (cell0.innerHTML == 'S.No') { $(cell0).addClass('_sno'); $("#" + this.DivID + " .tblResult").addClass('_isSno') }
            if (typeof this.header_align[intCellHeader] != 'undefined' && this.header_align[intCellHeader] != '') { $(cell0).css('text-align', this.header_align[intCellHeader]); }

            if (intCellHeader != 0) {
                if (j == this.headerval[intCellHeader + 1]) { $(cell0).attr('class', this.header_css); }
                cell0.onclick = function () { objFunctions.AscendingDescendingArr(this); };
            }
            cell0.title = this.headerval[intCellHeader + 1];
            cell0.style.cursor = 'pointer';
            cell0.style.height = '22px';


            if (intCellHeader == 0) {
                cell0.style.width = '50px';
            }
            else {
                if (this.width[intCellHeader] != 0) {
                    cell0.style.width = this.width[intCellHeader] + 'px';
                }

                var _headername = this.header[intCellHeader];
                if (typeof _headername.split('#')[1] != '' && _headername.split('#')[1] != '') {
                    if (_headername.split('#')[0] == 'Action') {
                        if (typeof _headername.split('#')[1] != 'undefined') { cell0.innerHTML = '<button class="btn btn-first" onclick="fn_GridActionButton(this);" data-ctrl="' + _headername.split('#')[1] + '">Add New</button>'; }
                        cell0.style.width = '10px';
                        $(cell0).css('background-image', 'none');
                        $(cell0).addClass('_isActionButton');
                        $(cell0).css('text-align', 'center');
                    }
                } else {
                    if (this.header[intCellHeader] == 'Action') {
                        cell0.style.width = '10px';
                        $(cell0).css('background-image', 'none');

                        $(cell0).addClass('_isActionButton');
                    }
                }

            }

            if (this.advSearch == true) {
                var txtBox = document.createElement('input');
                txtBox.setAttribute('type', 'text');
                $(txtBox).attr('placeholder', 'Search....');
                if (intCellHeader == 0) {
                    txtBox.setAttribute('id', 'txtSearch_' + this.tableid + '_0');
                    txtBox.setAttribute('name', 'txtSearch_' + this.tableid + '_0');
                    //$(txtBox).addClass('txtSearch_0');
                    txtBox.setAttribute('style', 'display:none');
                } else {
                    txtBox.setAttribute('id', 'txtSearch_' + this.tableid + '_' + parseInt(this.headerval[intCellHeader + 1]));
                    // $(txtBox).addClass('txtSearch_' + parseInt(this.headerval[intCellHeader + 1]));
                }
                txtBox.style.width = '100%';
                txtBox.style.border = 'solid 1px; #c3c3c3';
                txtBox.title = parseInt(this.headerval[intCellHeader + 1]);
                txtBox.setAttribute('class', 'textbox');
                txtBox.setAttribute('disabled', 'disabled');
                txtBox.setAttribute('className', 'textbox');
                txtBox.setAttribute('autocomplete', 'nope');
                txtBox.onkeyup = function () {
                    objFunctions.TextBoxSearches(this, objFunctions.intCell());
                };
                var cell_search = row_serach.insertCell(intCellHeader + intcheckbox); cell_search.style.textAlign = 'center';
                if (intCellHeader == 0) {
                    txtBox.setAttribute('disabled', 'disabled');
                }
                cell_search.appendChild(txtBox);
                if (typeof this.header_align[intCellHeader] != 'undefined') {
                    cell_search.setAttribute('align', this.header_align[intCellHeader]);
                }
                $(cell_search).addClass('advSearch');
                var xArrC = this.hdnVal.split('*'), xArr = xArrC[0].split('_');
                if (xArr.length > 1) {
                    var a = parseInt(this.headerval[intCellHeader + 1]); if (typeof xSearch[a] != 'undefined') txtBox.value = xSearch[a];
                    if (xArrC[1] == parseInt(this.headerval[intCellHeader + 1])) { $(txtBox).focus(); $(txtBox).caret().end; moveCursorToEnd(txtBox); }
                }

            }
        }

        if (this.objectJSON.length > 0) {
            var x = parseInt($('#txtRowCount' + this.tableid).val());
            var y = parseInt($('#hdnPg_h' + this.tableid).html());

            var from = parseInt((y - 1) * x), to = from + x, counter = 1;


            for (var i = from; i < to; i++) {
                if (typeof this.objSelectedData[i] != 'undefined' && this.objSelectedData[i] != '') {
                    var rowCount = tbl.rows.length, row = tbl.insertRow(tbl.rows.length);
                    $(row).click(function () { objFunctions.SelectRowForEdit(this); });

                    if (this.SelectOnEnter == true) {
                        $(row).keydown(function (e) {

                            if (e.keyCode === 13 || e.which === 13) {
                                objFunctions.SelectRowOnEnterPress(this, event);
                            }
                        });
                    }
                    if (this.chkvalue != '') {
                        var id = parseInt(this.chkvalue);
                        $(row).attr('data-attr', this.objSelectedData[i][id]);
                        //row.title = this.objSelectedData[i][id];
                        row.id = "btnRow_" + this.objSelectedData[i][id];
                        row.setAttribute('class', 'btmbdr');
                        row.setAttribute('className', 'btmbdr');
                    }
                    if (this.checkbox === true) {
                        var cellChkBox = row.insertCell(0); cellChkBox.style.width = '20px !important'; cellChkBox.style.height = '20px';
                        /*cellChkBox.setAttribute('class', 'chkClass'); cellChkBox.setAttribute('className', 'chkClass');*/
                        $(cellChkBox).attr('class', 'chkClass');

                        if (this.chkvalue !== '') {
                            //     
                            var _id = parseInt(this.chkvalue);
                            $(cellChkBox).attr('data-attr', this.objSelectedData[i][_id]);
                            cellChkBox.style.cursor = 'pointer';
                            cellChkBox.onclick = function () { objFunctions.CheckboxSelection(this); };
                            var chkSelectedIds = $("#" + this.DivID + ' #selectedValue').html();
                            if (chkSelectedIds.indexOf(this.objSelectedData[i][_id]) >= 0) {
                                $(cellChkBox).attr('class', 'chkClass1');
                            }
                        }
                    }
                    try {
                        for (var intCell = 1; intCell < parseInt(this.intCell() + 1); intCell++) {
                            var cell = row.insertCell((intCell - 1) + intcheckbox);
                            if (intCell == 1) {
                                cell.innerHTML = ((from * x) / x) + counter; counter = counter + 1;
                            }
                            else if (intCell == this.intCell() && typeof this.IsActionButton != 'undefined' && this.IsActionButton != null) {
                                if ($('#txtSearch_' + this.tableid + '_' + parseInt(this.headerval[intCell])).length != 0) {
                                    $('#txtSearch_' + this.tableid + '_' + parseInt(this.headerval[intCell])).hide();
                                }

                                cell.innerHTML = '';
                                $(cell).css('white-space', 'nowrap');
                                $(cell).parent('tr').parent('tbody').parent('table').addClass('IsActionButton');


                                var _buttons = '', _checkbutton = '';
                                for (var actBtn = 0; actBtn < this.IsActionButton.length; actBtn++) {

                                    if (this.IsActionButton[actBtn] != '') {
                                        if (this.IsActionButton[actBtn] == 'Edit') {
                                            _buttons += '<a href="javascript:;" data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnEditAction_Click(this); class="btn-edit btnRights dropdown-item" data-rname="Edit ' + this.PageTitle + '"><i class="fa fa-pencil"></i><span>Edit</span></a>';
                                        }
                                        else if (this.IsActionButton[actBtn] == 'Delete') {
                                            _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnDeleteAction_Click_Confirmation(this); class="btnDel btnRights dropdown-item margin-right-10" data-rname="Delete ' + this.PageTitle + '"><i class="fa fa-trash-o" aria-hidden="true"></i><span>Delete</span></a>';
                                        }
                                        else if (this.IsActionButton[actBtn] == 'PayNow') {
                                            _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnPayNowAction_Click(this); class="btn-deactivate btnDel dropdown-item btnRights margin-right-10" data-rname="PayNow ' + this.PageTitle + '"><i class="fa fa-plus" aria-hidden="true"></i><span>Pay Now</span></a>';
                                        }
                                        else if (this.IsActionButton[actBtn] == 'Assign') {
                                            _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnAssignAction_Click(this); class="btnDel btnAssign dropdown-item btnRights margin-right-10" data-rname="Assign ' + this.PageTitle + '"><i class="fa fa-plus" aria-hidden="true"></i><span>Assign</span></a>';
                                        }

                                        else if (this.IsActionButton[actBtn] == 'Active') {

                                            if (this.objSelectedData[i][this.headerval[intCell]] == 0) {
                                                _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnActiveAction_Click(this); class="btn-active dropdown-item btnRights" data-rname="Active Deactive ' + this.PageTitle + '"><i class="mdi mdi-toggle-switch"></i><span>Active</span></a>';
                                            } else {
                                                _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnActiveAction_Click(this); class="btn-deactivate dropdown-item btnRights" data-rname="Active Deactive ' + this.PageTitle + '"><i class="mdi mdi-toggle-switch-off"></i><span>Deactive</span></a>';
                                            }
                                        }


                                        else if (this.IsActionButton[actBtn] == 'Complete') {
                                            if (this.objSelectedData[i][this.headerval[intCell]] == 0) {
                                                _checkbutton += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnActiveAction_Click(this); class="btn-complete dropdown-item ancRights"><i class="fa fa-check-square-o"></i></a>';
                                            } else {
                                                _checkbutton += '<i class="fa fa-square-o"></i>';
                                            }
                                        }


                                        else if (this.IsActionButton[actBtn] == 'Print') {
                                            _buttons += '<a href="javascript:;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnPrintAction_Click(this); class="btn-edit dropdown-item"><i class="fa fa-print" aria-hidden="true"></i>Print</a>';
                                        }

                                        else if (this.IsActionButton[actBtn] == 'Desc') {
                                            _buttons += ' <a  class="btnProductDesc dropdown-item btn-select"  data-id="' + this.objSelectedData[i][id] + '" data-toggle="modal"  onclick=javascript:btnProductDescAction_Click(this);  target="_self"  href="#Description"><i class="mdi mdi-message-text-outline" aria-hidden="true"></i></a>';
                                        }

                                        else if (this.IsActionButton[actBtn] == 'View') {
                                            _buttons += ' <a  class="btnProductDesc dropdown-item btn-select"  data-id="' + this.objSelectedData[i][id] + '" data-toggle="modal"  onclick=javascript:btnView_Click(this); target="_self"  href="javascript:undefined;" ><i class="fa fa-eye"  aria-hidden="true" ></i>View</a>';
                                        }
                                        else if (this.IsActionButton[actBtn] == 'Export') {
                                            _buttons += '<a href="javascript:undefined;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnExportAction_Click(this); class="btn-export dropdown-item ancRights"><i class="mdi mdi-export"></i><span>Export</span></a>';
                                        }
                                        else if (this.IsActionButton[actBtn] == 'Email') {
                                            _buttons += '<a href="javascript:undefined;"  data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnEmailAction_Click(this); class="btn-select dropdown-item ancRights"><i class="fa fa-email"></i><span>Export</span></a>';
                                        } else {
                                            _buttons += '<a href="javascript:;" data-id="' + this.objSelectedData[i][id] + '" onclick=javascript:btnCustomAction_Click(this); class="btn-edit btnRights dropdown-item" ><i class="fa fa-hand-o-right"></i><span>' + this.IsActionButton[actBtn] + '</span></a>';
                                        }

                                        $(cell).find('a').addClass('_isAB');
                                    }
                                }
                                var strButtons = _checkbutton;
                                strButtons += '<div class="dropdown d-inline-block"><button type="button" class="btn icon-round-btn dropdown-toggle no-arrow waves-effect clsGridAction" data-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right">';
                                strButtons += _buttons;

                                strButtons += '</div></div>';
                                cell.innerHTML = strButtons;
                                $(cell).css('text-align', 'center');

                            }
                            else if (this.IsLinkButton == true && this.LinkButtonColumns.length > 0) {

                                if ($.inArray(this.headerval[intCell], this.LinkButtonColumns) !== -1) {
                                    var pt2 = (typeof this.objSelectedData[i][this.headerval[intCell]] == 'undefined' ? '' : this.objSelectedData[i][this.headerval[intCell]]) + '';

                                    pt2 = pt2.replace(/#!#/gi, '<br>');
                                    var functionName = this.header[intCell - 1].replace(/[ ~!@#$%^&*()_+{}\[\]|\<>,.\/-]/gi, '');
                                    cell.innerHTML = '<a href="javascript:undefined;" onclick="lnk' + functionName + '_Click(this);" class="_lnkBtn">' + pt2 + '</a>';
                                }
                                else {
                                    var pt1 = (typeof this.objSelectedData[i][this.headerval[intCell]] == 'undefined' ? '' : this.objSelectedData[i][this.headerval[intCell]]) + '';
                                    pt1 = pt1.replace(/#!#/gi, '<br>');
                                    cell.innerHTML = pt1;
                                }
                            }
                            else {
                                var pt = (typeof this.objSelectedData[i][this.headerval[intCell]] == 'undefined' ? '' : this.objSelectedData[i][this.headerval[intCell]]) + '';

                                if ($qc.Cookie('CalendarFormat') == 'NepalDDMMYYYY') {
                                    if (this.header[intCell - 1].indexOf('Date') >= 0) {
                                        cell.innerHTML = $('<span>' + ConvertNepaliDateToDDMMYY(pt) + '</span>').html();
                                    }
                                    else {
                                        pt = pt.replace(/amp;/gi, '');
                                        pt = pt.replace(/&gt;/gi, '>');
                                        pt = pt.replace(/&lt;/gi, '<');
                                        if (pt != '') {
                                            if (pt.indexOf('[BR]') >= 0) {

                                                var a = pt.split('[BR]');
                                                var _txt = '';
                                                for (var c = 0; c < a.length; c++) {
                                                    _txt += '<div class="clsDiv' + c + '">' + a[c] + '</div>';
                                                }
                                                pt = _txt.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
                                            }
                                        }
                                        cell.innerHTML = $('<span>' + pt + '</span>').html();
                                    }
                                } else {
                                    pt = pt.replace(/amp;/gi, '');
                                    pt = pt.replace(/&gt;/gi, '>');
                                    pt = pt.replace(/&lt;/gi, '<');

                                    if (pt != '') {
                                        if (pt.indexOf('[BR]') >= 0) {

                                            var a = pt.split('[BR]');
                                            var _txt = '';
                                            for (var c = 0; c < a.length; c++) {
                                                _txt += '<div class="clsDiv' + c + '">' + a[c] + '</div>';
                                            }
                                            pt = _txt.replace(/&lt;/gi, '<').replace(/&gt;/gi, '>');
                                        }
                                    }
                                    cell.innerHTML = $('<span>' + pt + '</span>').html();
                                }

                            }
                            if (typeof this.display_align[intCell - 1] != 'undefined') { cell.setAttribute('align', this.display_align[intCell - 1]); }
                            if (typeof this.dataAttr != 'undefined') {
                                if (this.dataAttr[intCell - 1] != 0) {
                                    $(cell).attr('data-attr', this.objSelectedData[i][this.dataAttr[intCell - 1]]);
                                }
                            }
                            if (typeof this.ColumnType != 'undefined') {
                                if (this.ColumnType[intCell - 1] == 'text') {
                                    $(cell).html('<input type="text" value="' + $(cell).html() + '" />');

                                }
                            }
                        }
                    }
                    catch (e) { alert(e); }
                    if (typeof this.IsAddBlankRow != 'undefined') { var rowBlank = tbl.insertRow(tbl.rows.length), tdBlank = rowBlank.insertCell(0); $(tdBlank).attr('class', 'blankrow'); if (this.checkbox == false) { tdBlank.colSpan = intCell - 1; } else { tdBlank.colSpan = intCell; } rowBlank.setAttribute('class', 'rowHide'); rowBlank.setAttribute('className', 'rowHide'); }

                }


            }

            $(".clsLoading").removeClass(); $(".btnExport").show();


            if (typeof adjustframeheight != 'undefined') adjustframeheight();
            if (typeof this.ColumnShow != 'undefined') {
                for (var arv = 0; arv < this.ColumnShow.length; arv++) {
                    if (this.ColumnShow[arv] == 'N') {
                        $('#' + this.tableid + ' td:nth-child(' + arv + ')').hide();
                        $('#' + this.tableid + '_Head th:nth-child(' + arv + ')').hide();
                    }
                }
            }
            if (typeof fn_RefreshGrid == 'function') { fn_RefreshGrid(); }
            if (typeof cheangeTranslateLang == 'function') { cheangeTranslateLang(); }


            if (typeof $qc.Cookie("GrdActiveDeactive") == 'undefined' || $qc.Cookie("GrdActiveDeactive") == '' || $qc.Cookie("GrdActiveDeactive") == null) {
                $("#" + this.DivID + " ._btnGrdGrid").removeClass('active');
                $("#" + this.DivID + " ._btnGrdList").removeClass('active');
                //if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
                //    $("#" + this.DivID + " ._btnGrdList").addClass('active');
                //    if ($('a._isAB span').length > 0) { $('a._isAB span').show(); }
                //} else {
                $("#" + this.DivID + " ._btnGrdGrid").addClass('active');
                if ($('a._isAB span').length > 0) { $('a._isAB span').hide(); }
                //}
            } else {
                $("#" + this.DivID + " ._btnGrdGrid").removeClass('active');
                $("#" + this.DivID + " ._btnGrdList").removeClass('active');
                $("#" + this.DivID + " ." + $qc.Cookie("GrdActiveDeactive")).addClass('active');
            }


            if ($("#" + this.DivID + ' ._btnGrdList').hasClass('active')) {
                $("#" + this.DivID + ' .tblResult').hide();
                $("#" + this.DivID + ' .clsTr').remove();
                $("#" + this.DivID + " #divscroll").addClass('_isGrdList');
                fn_MobileGridView(tbl, this.header, this.DivID);
                this.GridType = 'List';
                if ($('a._isAB span').length > 0) { $('a._isAB span').show(); $('a._isAB i').hide(); }
            } else {
                $("#" + this.DivID + ' .tblResult').show();
                $("#" + this.DivID + ' .clsTr').remove();
                $("#" + this.DivID + " #divscroll").removeClass('_isGrdList');
                this.GridType = 'Grid';
                if ($('a._isAB span').length > 0) { $('a._isAB span').hide(); $('a._isAB i').show(); }
            }
            // if (typeof fn_getRolesOfPage != 'undefined') { fn_NepalLabelChange(); }
            if (typeof fn_getRolesOfPage != 'undefined') { fn_getRolesOfPage(); }
        } else {
            //$("#" + this.DivID).html(_0data);
            /*getRolesOfPage();*/

            var tblRow = tbl.insertRow(tbl.rows.length);
            var tblCell = tblRow.insertCell(tblRow.cells.length);
            tblCell.innerHTML = _0data;
            tblCell.colSpan = $($(tbl).find('tr')[0]).find('td').length;
        }
    };
    this.TextBoxSearches = function (objText1, iCount) {

        var blnFlag = false; var results = []; this.hdnVal = '';
        for (var iCounter = 1; iCounter <= iCount; iCounter++) {
            if (typeof this.headerval[iCounter] != 'undefined') {
                var $txtObj = $('#txtSearch_' + this.tableid + '_' + this.headerval[iCounter]);


                if (typeof $txtObj != 'undefined') {
                    this.hdnVal = this.hdnVal + '_' + $txtObj.val();
                    xSearch[this.headerval[iCounter]] = $txtObj.val();
                } else {
                    this.hdnVal = this.hdnVal + '_';
                }
            }
        }
        this.hdnVal = this.hdnVal + '*' + objText1.title;

        for (var ih = 0; ih < this.objectJSON.length; ih++) {
            var item = this.objectJSON[ih];
            for (var iCounter1 = 1; iCounter1 <= iCount; iCounter1++) {

                if (typeof this.headerval[iCounter1] != 'undefined') {
                    var $txtObj1 = $('#txtSearch_' + this.tableid + '_' + this.headerval[iCounter1]);
                    if ($txtObj1.length != 0) {
                        var txt1 = $txtObj1.val();
                        if (txt1.length != 0) {
                            var a = item[$txtObj1.attr('title')] + '';
                            //if (a.substring(0, txt1.length).toLowerCase() == txt1.toLowerCase()) { blnFlag = true; } else { blnFlag = false; break; }
                            if (a.toLowerCase().includes(txt1.toLowerCase())) { blnFlag = true; } else { blnFlag = false; break; }
                        }
                        else {
                            blnFlag = true;
                        }
                    }
                }
            }
            if (blnFlag == true) {
                results.push(item);
            }
        }

        this.objSelectedData = results; results = [];
        $('#totalCount' + this.tableid).html('<i class="mdi mdi-check" aria-hidden="true"></i>Total Record Count :- ' + this.objSelectedData.length);
        this.CalculateTotalNumbers();
        this.FillGrid(this.sort, 3, 1);
    };

    this.PrintGrid = function (type) {
        var x1 = 0;
        if ($("#" + this.DivID + " #tblPrintArea").length > 0) {
            $("#" + this.DivID + " #tblPrintArea").remove();
        }
        var s = '<div id="tblPrintArea" style="width:100%" >';
        s = s + '<table id="tbl_PrintArea">';
        var iCount = 0;
        var header = $($("#" + this.DivID + " table thead tr")[0]);
        if (typeof header != 'undefined' && header != null) {
            s = s + '<thead><tr>';
            for (var j = 0; j < $($("#" + this.DivID + " table thead tr")[0]).children().length; j++) {
                if ($($($("#" + this.DivID + " table thead tr")[0]).children()[j]).text() != 'Action') {
                    s = s + '<th>' + $($($("#" + this.DivID + " table thead tr")[0]).children()[j]).text() + '</th>';
                    iCount += 1;
                }
            }
            s = s + '</tr></thead>';
        }

        s = s + '<tbody>';
        $("#" + this.DivID + " table tbody tr").each(function () {
            if ($(this).hasClass('rowHide') == false) {
                s = s + '<tr>';
                for (var k = 0; k < iCount; k++) {
                    s = s + '<td>' + $(this.cells[k]).text() + '</td>';
                }
                s = s + '</tr>';
            }
        });
        s = s + '</tbody>';

        s = s + '</table>';
        s = s + '</div>';
        if (type === 'print') {
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>DIV Contents</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write(s);
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();
        } else {
            $('#' + this.DivID).append(s);
        }
    };

    this.ExportToFormat = function (type1) {
        var link = '';
        this.PrintGrid(type1); $("#" + this.DivID + " #tblPrintArea").hide();
        //$("#" + this.DivID + " #tbl_PrintArea").tableExport({ type: type1, escape: 'false' });
        if (type1 == 'excel') {
            var uri = 'data:application/vnd.ms-excel;base64,',
                template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
                base64 = function (s) {
                    return window.btoa(unescape(encodeURIComponent(s)))
                },
                format = function (s, c) {
                    return s.replace(/{(\w+)}/g, function (m, p) {
                        return c[p];
                    })
                }
            var toExcel = $("#" + this.DivID + " #tblPrintArea").html();
            var ctx = {
                worksheet: name || '',
                table: toExcel
            };
            link = document.createElement("a");
            link.download = (this.PageTitle == '' ? 'Result' : this.PageTitle) + ".xls";
            link.href = uri + base64(format(template, ctx))
            link.click();
        } if (type1 == 'pdf') {



            //link = document.createElement("a");
            //link.download = (this.PageTitle == '' ? 'Result' : this.PageTitle) + ".xls";
            //link.href = uri + base64(format(template, ctx))
            //link.click();
        }
        $("#" + this.DivID + " #tblPrintArea").hide();
    };

}



var ctlDetails, ctlDetails1, ctlDetails2, ctlDetails3, ctlDetails4, ctlDetails5, ctlDetails6, ctlDetails7, ctlDetails8, ctlDetails9, ctlDetails10;
var xSearch = { '1': '', '2': '', '3': '', '4': '', '5': '', '6': '', '7': '', '8': '', '9': '', '10': '', '11': '', '12': '', '13': '', '14': '', '15': '', '16': '', '17': '', '18': '', '19': '', '20': '' };
function moveCursorToEnd(el) { window.setTimeout(function () { if (typeof el.selectionStart == "number") { el.selectionStart = el.selectionEnd = el.value.length; } else if (typeof el.createTextRange != "undefined") { var range = el.createTextRange(); range.collapse(false); range.select(); } }, 1); }
/* 1 = numeric , 2 = varchar , 3 = date*/
function sortJSON(arr, _SortType, _sort, txt) {
    arr.sort(function callback(a, b) {
        var A; var B; var i = 2;
        var str = '';
        if (_SortType == 1) {
            A = parseFloat(a['' + _sort + '']); B = parseFloat(b['' + _sort + '']);
        }
        else if (_SortType == 3) {
            A = new Date(a['' + _sort + '']); B = new Date(b['' + _sort + '']);
        }
        else {
            if (typeof a['' + _sort + ''] != 'undefined') {
                if (isNaN(a['' + _sort + '']) == true) { A = a['' + _sort + ''].toLowerCase(); B = b['' + _sort + ''].toLowerCase(); }
                else { A = parseFloat(a['' + _sort + '']); B = parseFloat(b['' + _sort + '']); }
            }
        }

        if (A == B) {
            if (A == B) { return 0; }
            if (txt == 'ascending') {
                return (A > B) ? -1 : 1;
            } else {
                return (A < B) ? -1 : 1;
            }
        }
        if (txt == 'ascending') {
            return (A > B) ? -1 : 1;
        } else { return (A < B) ? -1 : 1; }
    });
    return arr;
}
function IsNumeric(obj1) { if (isNaN(obj1.value)) { alert("Enter only Numeric value"); obj1.value = '20'; obj1.focus(); return true; } }
function enadis(first, pre, next, last, DivID) { var cSs = 'opacity: 0.7;pointer-events: none;'; if (first == 'none') { $('#btnFirst_h' + this.tableid).attr('style', cSs); $('#btnFirst' + this.tableid).attr('style', cSs); } else { $('#btnFirst_h' + this.tableid).attr('style', ''); $('#btnFirst' + this.tableid).attr('style', ''); } if (pre == 'none') { $('#btnPre_h' + this.tableid).attr('style', cSs); $('#btnPre' + this.tableid).attr('style', cSs); } else { $('#btnPre_h' + this.tableid).attr('style', ''); $('#btnPre' + this.tableid).attr('style', ''); } if (next == 'none') { $('#btnNext_h' + this.tableid).attr('style', cSs); $('#btnNext' + this.tableid).attr('style', cSs); } else { $('#btnNext_h' + this.tableid).attr('style', ''); $('#btnNext' + this.tableid).attr('style', ''); } if (last == 'none') { $('#btnLast_h' + this.tableid).attr('style', cSs); $('#btnLast' + this.tableid).attr('style', cSs); } else { $('#btnLast_h' + this.tableid).attr('style', ''); $('#btnLast' + this.tableid).attr('style', ''); } }
$.fn.caret = function (begin, end) { if (this.length === 0) return; if (typeof begin === 'number') { end = (typeof end == 'number') ? end : begin; return this.each(function () { if (this.setSelectionRange) { this.setSelectionRange(begin, end); } else if (this.createTextRange) { var range = this.createTextRange(); range.collapse(true); range.moveEnd('character', end); range.moveStart('character', begin); try { range.select(); } catch (ex) { } } }); } else { if (this[0].setSelectionRange) { begin = this[0].selectionStart; end = this[0].selectionEnd; } else if (document.selection && document.selection.createRange) { var range = document.selection.createRange(); begin = 0 - range.duplicate().moveStart('character', -100000); end = begin + range.text.length; } return { begin: begin, end: end }; } }
function onDataClick(obj, txt) { }
function UniqueArray(array) { return array.filter(function (el, index, arr) { return index === arr.indexOf(el); }); }
function deleteRowforGrid(tableID) { try { var table = document.getElementById(tableID); if (table != null) { var rowCount = table.rows.length; for (var i = 0; i < rowCount; i++) { var row = table.rows[i]; table.deleteRow(i); rowCount--; i--; } } } catch (e) { alert(e); } }
function btnDeleteAction_Click_Confirmation(_btn) {
    if (confirm("Are you sure, you want to delete a record?") == true) {
        btnDeleteAction_Click(_btn);
    }
}
function fn_MobileGridView(tblResult, _ctlDetails, DivID) {
    var strDiv = '<div class="row clsTr">';
    for (var i = 1; i < tblResult.rows.length; i++) {
        if (tblResult.rows[i].cells.length > 1) {
            strDiv += '<div class="col-12 col-md-4"><div class="row clsInnerRow" >';
            for (var j = 1; j < _ctlDetails.length; j++) {
                var RowId = $(tblResult.rows[i]).attr('data-attr');
                strDiv += '<div class="clsTd col-12" data-attr="' + RowId + '">';
                if ($(tblResult.rows[i].cells[j]).attr('data-attr') == '' || typeof $(tblResult.rows[i].cells[j]).attr('data-attr') == 'undefined' || $(tblResult.rows[i].cells[j]).attr('data-attr') == 'null' || $(tblResult.rows[i].cells[j]).attr('data-attr') == null) {
                    strDiv += '<label>' + _ctlDetails[j] + '</label><b>:</b><span >' + tblResult.rows[i].cells[j].innerHTML + '</span>';
                } else {
                    strDiv += '<label>' + _ctlDetails[j] + '</label><b>:</b><span data-attr=' + $(tblResult.rows[i].cells[j]).attr('data-attr') + '>' + tblResult.rows[i].cells[j].innerHTML + '</span>';
                }

                strDiv += '</div>';
            }
            strDiv += '</div></div>';
        }

    }
    strDiv += '</div>';
    $('.clsTr').remove();
    $("#" + DivID + " #divscroll").append(strDiv);
}

function fn_ExportToExcel(_o) {
    $('#ancExportToEXL').click();
}

function fn_ExportToPDF(_o) {
    $('#ancExportToPDF').click();
}


