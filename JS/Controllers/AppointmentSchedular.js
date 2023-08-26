var xMinTime = "09:00";
var xMaxTime = "24:00";
var objJSON = [];
var AppointmentId = 0;
var _LocationId = $qc.cookie("locationid");
var scheduledDate = '', DayType = 'Weekly';
var _treatmentid = 0, _stepid = 0;
var _rtnQuery = getQueryParams(document.location.search);

$(document).ready(function () {
    var objJSON = [];
    InitCalender(objJSON);

    $(window).scroll(function () {
        if ($(this).scrollTop() > 1) {
            $('.fc-border-separate thead').addClass("sticky");
        }
        else {
            $('.fc-border-separate thead').removeClass("sticky");
        }
    });

    $("#btnSchedlePeriod").click(function () {
        if (rtnCtrlVal("txtStartDate", "") == '') { alert('start date is mandatory'); return false; }
        if (rtnCtrlVal("txtStartTime", "") == '') { alert('start time is mandatory'); return false; }
        if (rtnCtrlVal("txtEndDate", "") == '') { alert('end date is mandatory'); return false; }
        if (rtnCtrlVal("txtEndTime", "") == '') { alert('end time is mandatory'); return false; }
        if (rtnCtrlVal("ddlDoctor", "") == '') { alert('doctor is mandatory'); return false; }
        if (rtnCtrlVal("txtPatientName", "") == '') {
            if (typeof $("#txtPatientName").attr('data-attr') == 'undefined' || $("#txtPatientName").attr('data-attr') == 0) {
                alert('patient name is mandatory'); return false;
            }
        }
        //txtAppointmentFor
        fn_InsertUpdateScheduleApt();
    });

    $("#btnRefreshCalender").click(function () { RefreshCalender() });

    $("#txtPatientName").autocomplete({
        source: (request, response) => {

            GetAutoCompleteData({
                procid: 647,
                ParamPath: "params",
                params: 'patientlist|' + $("#txtPatientName").val() + '|' + _LocationId,
                success: (data) => {
                    data = data.split("$");
                    response($.map(data, (item) => {
                        var val = item.split('|')[0];
                        var lbl = item.split('|')[1];
                        return { label: lbl, val: val, defaultagent: lbl };
                    }));
                }
            });
        }, select: (e, i) => {
            $(e.target).attr('data-attr', i.item.val);
            // _globalpathistory.studid = i.item.val;
            //fn_angularrouting('./' + _rtnangroutingpath() + '/studentdetails?id=' + i.item.val);
        }, minlength: 1
    });

    $("#txtAppointmentFor").autocomplete({
        source: (request, response) => {

            GetAutoCompleteData({
                procid: 647,
                ParamPath: "Params",
                params: 'TreatmentAutoPopup|' + $("#txtAppointmentFor").val() + '|' + _LocationId,
                success: (data) => {
                    data = data.split("$");
                    response($.map(data, (item) => {

                        var val = item.split('|')[0];
                        var lbl = item.split('|')[1];
                        return { label: lbl, val: val, defaultagent: lbl };
                    }));
                }
            });
        }, select: (e, i) => {
            $(e.target).attr('data-attr', i.item.val);
            // _GlobalPatHistory.StudID = i.item.val;
            //fn_AngularRouting('./' + _rtnAngRoutingPath() + '/StudentDetails?id=' + i.item.val);
        }, minLength: 1
    });

    $("#btnDeleteClass").click(function () {
        if (window.confirm('Are you sure???')) {
            param = 'DeleteAptDetails|||' + _LocationId + '|0|' + AppointmentId;
            UpdateDataToDatabase(26, 'DeleteAppointment', param, 'DentalParams');
        }
    });

    FillDropDown_JS(true, 'Doctorlist', 'ddlDoctor', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
    FillDropDown_JS(false, 'Doctorlist', 'ddlDoctor1', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);
});

function fn_InsertUpdateScheduleApt() {

    var _param = ["InsertUpdate", AppointmentId
        , $("#txtPatientName").attr('data-attr')
        , $("#ddlDoctor1").val()
        , _LocationId
        , 0
        , $("#txtStartDate").val()
        , $("#txtStartDate").val()
        , $("#txtStartTime").val()
        , $("#txtEndTime").val()
        , $("#txtAppointmentFor").val()
        , $qc.cookie("userid") + ',' + $qc.cookie("usercategory")
        , _treatmentid
        , _stepid
    ];
    UpdateDataToDatabase(25, "UpdateAppointment", _param, "DentalParams");
}

function clearapt() {
    $("#ddlDoctor1").val(0);
    $("#txtStartDate").val('');
    $("#txtEndDate").val('');
    $("#txtStartTime").val('');
    $("#txtEndTime").val('');
    $("#txtAppointmentFor").val('');
    $("#txtAppointmentFor").removeAttr('data-attr');
    $("#txtPatientName").removeAttr('data-attr');
    AppointmentId = 0;
}

function InitCalender(objJSON) {
    var date1 = new Date();
    //var d = date1.getDate();
    //var m = date1.getMonth();
    //var y = date1.getFullYear();
    var dayview = 'agendaWeek'; //'agendaWeek';

    var editableFlag = true;
    if (window.innerWidth <= 786) {
        dayview = 'agendaDay';
    }

    //if ($qc.Cookie("_CategoryId").toLowerCase() == 'student') {
    //    editableFlag = false;
    //}

    $('#calendar').fullCalendar({
        dayClick: function (date, allDay, jsEvent, view) {

            if (editableFlag == true) {
                //if ($("#ddlClassFilter").val() == null || $("#ddlClassFilter").val() == '' || $("#ddlSectionFilter").val() == null || $("#ddlSectionFilter").val() == '') {
                //    $.toastNoti({ sign: 'warning', text: 'Select Class and Section.' });
                //    return false;
                //}
                AppointmentId = 0;

                var dt = '';

                if (typeof date._i[2] != 'undefined') {
                    dt = DateDigitLen(date._i[2]) + '-' + DateDigitLen(date._i[1] + 1) + '-' + date._i[0];
                    var time = DateDigitLen(date._i[3]) + ':' + DateDigitLen(date._i[4]);

                    var _d = new Date(date._i[0], date._i[1], date._i[2], date._i[3], date._i[4], date._i[5]);
                    var _newd = new Date(_d.getTime() + 30 * 60000);
                    var endtime = DateDigitLen(_newd.getHours()) + ':' + DateDigitLen(_newd.getMinutes());

                    $("#txtStartDate").val(date._i[0] + '-' + DateDigitLen(date._i[1] + 1) + '-' + DateDigitLen(date._i[2]));
                    $("#txtEndDate").val(date._i[0] + '-' + DateDigitLen(date._i[1] + 1) + '-' + DateDigitLen(date._i[2]));
                } else {
                    dt = DateDigitLen(date._d.getDate()) + '-' + DateDigitLen(date._d.getMonth() + 1) + '-' + date._d.getFullYear();

                    $("#txtStartDate").val(date._d.getFullYear() + '-' + DateDigitLen(date._d.getMonth() + 1) + '-' + DateDigitLen(date._d.getDate()));
                    $("#txtEndDate").val(date._d.getFullYear() + '-' + DateDigitLen(date._d.getMonth() + 1) + '-' + DateDigitLen(date._d.getDate()));
                }
                //$("#ddlWeekDay").val(_d.getDay());
                //$("#ddlWeekDay").attr('disabled', 'disabled');


                $("#txtStartTime").val(time);
                $("#txtEndTime").val(endtime);

                $("#txtPatientName").val('');
                $("#txtPatientName").attr('data-attr', 0);


                if (typeof _rtnQuery.para != 'undefined') {
                    var a = atob(_rtnQuery.para).split('_');
                    $("#txtPatientName").val(a[1]);
                    $("#txtPatientName").attr('data-attr', a[0]);

                    _treatmentid = a[2];
                    _stepid = a[3];
                }

                $("#txtAppointmentFor").val('');

                //$("#ddlSubject").val(0);
                //$("#txtRemark").val('');
                //$("#txtMeetingId").val('');
                //$("#txtMeetTitle").val('');
                //$("#ddlHostDetails").val(0);
                TaskId = 0; TaskName = '';
                $("#ScheduleClass").modal('show');

                $("#btnDeleteClass").hide();
                $("#btnDeleteSingleMeeting").hide();

                //fn_FillTeacherLectures();
                //}
            }
        },
        eventClick: function (calEvent, jsEvent, view) {
            if (editableFlag == true) {

                AppointmentId = calEvent.eventid;

                //TaskName = calEvent.title;
                //if (calEvent.title.split('_')[3] == 'Daily') {
                //   TaskFlag = false;
                //} else {
                //TaskFlag = true;
                //}

                param = 'AptDetails|||' + _LocationId + '|0|' + AppointmentId;
                GetDataFromDatabase(26, 'FillTaskDetails', param, 'DentalParams');

                $("#btnDeleteClass").show();
                $("#btnDeleteSingleMeeting").show();
                $("#ScheduleClass").modal('show');
            }

        },
        eventRender: function (event, element) {
            event.editable = editableFlag;
            scheduledDate = event.start._i;
        },
        eventResize: function (event, dayDelta, minuteDelta, revertFunc) {
            if (editableFlag == true) {
                if (!confirm("Are You Sure To ReSize Appointment?")) { revertFunc(); }
                else {
                    AppointmentId = event.eventid;
                    ReschedulePeriod(event);
                }
            } else {
                revertFunc();
            }
        },
        eventMouseover: function (calEvent, jsEvent) { },
        eventMouseout: function (calEvent, jsEvent) { },
        eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
            debugger;
            if (editableFlag == true) {
                if (!confirm("Are You Sure To Reshedule Appointment?")) {


                    revertFunc();
                }
                else {

                    if (typeof event.eventid != 'undefined') {

                        AppointmentId = event.eventid;
                        //if (allDay) {
                        //    ReschedulePeriod(event);
                        //}
                        //else {
                        ReschedulePeriod(event);
                        //  }
                    }
                    else {
                        revertFunc();
                    }
                }
            }
            else {
                revertFunc();
            }
        },
        header: { left: 'prev,next today', center: 'title', right: 'agendaDay,agendaWeek,month,listWeek' },
        firstDay: (new Date().getDay()),
        height: 'auto',

        defaultView: dayview,
        editable: editableFlag,
        allDaySlot: false,
        allDay: false,
        allDayDefault: false,
        minTime: xMinTime, //'9:00am',
        maxTime: xMaxTime, //'2:00pm',
        slotDuration: '00:10:00',
        scrollTime: '08:00:00',
        height: 'auto',
        events: objJSON,
        nowIndicator: true,
        now: new Date()

    });
    $('.fc-prev-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-next-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-month-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-month-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-listWeek-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-agendaDay-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-agendaWeek-button').click(function () { objJSON = []; RefreshCalender(); });
    $('.fc-today-button').click(function () { objJSON = []; RefreshCalender(); });
    RefreshCalender();

    setTimeout(function () {
        if (typeof $(".fc-now-indicator-arrow")[0] != 'undefined') {
            $('html, body').animate({
                scrollTop: parseInt($(".fc-now-indicator-arrow").css('top').replace('px', ''))
            }, 2000);
        }
    }, 2000);
}

function ReschedulePeriod(evt) {
    var _a = evt.start._i;
    var _b = evt.end._i;

    var sdate = _a[0] + '-' + DateDigitLen(_a[1] + 1) + '-' + DateDigitLen(_a[2]);
    var edate = _b[0] + '-' + DateDigitLen(_b[1] + 1) + '-' + DateDigitLen(_b[2]);
    var starttime = DateDigitLen(_a[3]) + ':' + DateDigitLen(_a[4]);
    var endtime = DateDigitLen(_b[3]) + ':' + DateDigitLen(_b[4]);


    var _param = ["RescheduleApt"
        , AppointmentId
        , 0
        , 0
        , _LocationId
        , 0
        , sdate
        , edate
        , starttime
        , endtime
        , ''
        , $qc.cookie("userid") + ',' + $qc.cookie("usercategory")
        , 0
        , 0
    ];
    UpdateDataToDatabase(25, "RescheduleAppointment", _param, "DentalParams");
}

function RefreshCalender() {
    var startdate = $('#calendar').fullCalendar('getView').start._d;
    var enddate = $('#calendar').fullCalendar('getView').end._d;

    var _d1 = DateDigitLen(startdate.getMonth() + 1) + '-' + DateDigitLen(startdate.getDate()) + '-' + startdate.getFullYear();
    var _d2 = DateDigitLen(enddate.getMonth() + 1) + '-' + DateDigitLen(enddate.getDate()) + '-' + enddate.getFullYear();

    param = 'RefreshApt|' + _d1 + '|' + _d2 + '|' + _LocationId + '|' + ($("#ddlDoctor").val() == null ? 0 : $("#ddlDoctor").val()) + "|0";
    GetDataFromDatabase(26, 'RefreshCalender', param, 'DentalParams');

}

function onGetDataSuccess(data, context) {
    if (context == 'UpdateAppointment') {
        if (data == 0 || data == '') { return false; }

        /*Start SMS/EMAIL/WA */
        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient Appointment SMS|0|0|0|0|' + data + '|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "SendNotification");
        /*End SMS/EMAIL/WA */

        //alert('Submited Succesfully');
        clearapt();
        RefreshCalender();
        $("#ScheduleClass").modal('hide');
    } else if (context == 'RescheduleAppointment') {

        /*Start SMS/EMAIL/WA */
        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient Reschedule Appointment SMS|0|0|0|0|' + AppointmentId + '|' + $qc.Cookie("userid") + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|',
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "SendNotification");
        /*End SMS/EMAIL/WA */

        //alert('Reschedule Succesfully');
        RefreshCalender();
    } else if (context == 'DeleteAppointment') {
        //alert('Deleted Succesfully');
        clearapt();
        RefreshCalender();
        $("#ScheduleClass").modal('hide');
    }

    else if (context == 'RefreshCalender') {
        objJSON = [];
        var events = [];
        if (data != '') {
            eval("var events=" + data + ";");
        }
        $('#calendar').fullCalendar('removeEvents');
        $('#calendar').fullCalendar('addEventSource', events);
        $('#calendar').fullCalendar('refetchEvents');
        CalenderDateChange();

    } else if (context == 'FillTaskDetails') {
        if (data == '') { return false; }
        $("#ScheduleClass").modal('show');
        $("#ddlDoctor1").val(data.split('|')[2]);
        $("#txtStartDate").val(data.split('|')[5]);
        $("#txtEndDate").val(data.split('|')[6]);
        $("#txtStartTime").val(data.split('|')[7]);
        $("#txtEndTime").val(data.split('|')[8]);
        $("#txtPatientName").val(data.split('|')[10]);
        $("#txtAppointmentFor").val(data.split('|')[9]);
        $("#txtAppointmentFor").attr('data-attr', data.split('|')[12]);
        $("#txtPatientName").attr('data-attr', data.split('|')[1]);
    }
}

function DateDigitLen(e) {
    return e = 1 == (e += "").length ? "0" + e : e
}

function CalenderDateChange() {


    $(".fc-event-container a").each(function () {
        var content = $(this).find('.fc-title').text();
        if ($('#calendar').fullCalendar('getView').type == 'agendaWeek' || $('#calendar').fullCalendar('getView').type == 'month') {

            var strData = '<div class="clsSubject" title="' + content.split('_')[0] + ', ' + content.split('_')[1] + '">' + content.split('_')[0] + ', ' + content.split('_')[1] + '</div>';

            $(this).find('.fc-title').html(strData);
        }
        else if ($('#calendar').fullCalendar('getView').type == 'agendaDay' || $('#calendar').fullCalendar('getView').type == 'listWeek') {

            var strData = '<div class="clsSubject" title="' + content.split('_')[0] + ', ' + content.split('_')[1] + '">' + content.split('_')[0] + ', ' + content.split('_')[1] + '</div>';


            $(this).find('.fc-title').html(strData);
        }
    });

    $(".fc-list-item-title a").each(function () {
        var content = $(this).text();

        var strData = '<div class="clsSubject">' + content.split('_')[0] + ', ' + content.split('_')[1] + '</div>' + '<div class="clsTeacher">' + content.split('_')[1] + '</div>';

        $(this).html(strData);

    });

    $(".fc-content .fc-time").hide();
}