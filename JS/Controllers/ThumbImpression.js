var thumbquality = 60; //(1 to 100) (recommanded minimum 55)
var thumbtimeout = 10; // seconds (minimum=10(recommanded), maximum=60, unlimited=0 )
var _Fingertype = '', _FingerId = '';
var SampleNo = 0;
var PatThumb = {};

function captureimage(_o) {
    $("#lblStatus").html('Scanning...');
    var res = CaptureFinger(thumbquality, thumbtimeout);
    if (res.httpStaus) {
        $("#lblStatus").html('');
        $(_o).attr('src', "data:image/bmp;base64," + res.data.BitmapData);
        fn_WriteFile('PatientThumbCaptureConsent/' + $qc.Cookie("locationid"), _rtnQuery.pat, 'txt', res.data.BitmapData, 'SaveConcentThumb');
       
    }
}

function fn_CaptureThumb(no) {
    SampleNo = no;
    var res = CaptureFinger(thumbquality, thumbtimeout);
    if (res.httpStaus) {
        $("#imgCapture" + SampleNo).attr('src', "data:image/bmp;base64," + res.data.BitmapData);
        PatThumb[no] = res.data;
    }
}

function fn_DeleteThumb() {
    var _FileName = 'PatientThumbCapture/' + $qc.Cookie("locationid") + '/' + _PatientRecordId + '_' + _FingerId + '.txt';
    fn_DeleteFile(_FileName, 'FileStatus');

    $("#imgThumbStatus").html('Deleteing..');
}

function fn_onFileDeleteSuccess(data, context) {
    $("#imgThumbStatus").html('');
    $("#imgCapture1").attr('src', "images/blankthumb.jpg");
    $("#imgCapture2").attr('src', "images/blankthumb.jpg");
    $("#imgCapture3").attr('src', "images/blankthumb.jpg");

    fn_UpdateUserThumb('DeleteThumb', _PatientRecordId, _FingerId, 'N');
}

function fn_onFetchSuccess(data, context) {
    if (context == 'FileStatus') {
        if (data != '') {
            $("#btnDeleteThumb").show();
            PatThumb = JSON.parse(data);
            $("#imgCapture1").attr('src', "data:image/bmp;base64," + PatThumb[1].BitmapData);
            $("#imgCapture2").attr('src', "data:image/bmp;base64," + PatThumb[2].BitmapData);
            $("#imgCapture3").attr('src', "data:image/bmp;base64," + PatThumb[3].BitmapData);
        } else {
            $("#btnDeleteThumb").hide();
            $("#imgCapture1").attr('src', "images/blankthumb.jpg");
            $("#imgCapture2").attr('src', "images/blankthumb.jpg");
            $("#imgCapture3").attr('src', "images/blankthumb.jpg");
        }
        $("#imgThumbStatus").html('');
    }
    else if (context == 'getmatchthumb') {
        if (data == '') { alert('Thumb not stored'); return false; }
        var _StoreThumb = JSON.parse(data);
        var f = false;
        $("#divThumbChecking").html('Scanning data....');

        //var res = CaptureFinger(thumbquality, thumbtimeout);
        //if (res.httpStaus) {
        //    //$("#imgCapture" + SampleNo).attr('src', "data:image/bmp;base64," + res.data.BitmapData);
        //    //res.data;
        //    var bitmap = { "BitmapData": res.data.BitmapData, "BitmapData1": "" };
        //    fn_comparetwothumbimages({ URL: bitmap }, 'd');
        //}

        for (var key in _StoreThumb) {
            for (var i = 0; i < _StoreThumb[key].length; i++) {
                var res = MatchFinger(thumbquality, thumbtimeout, _StoreThumb[key][i].IsoTemplate);

                if (res.httpStaus) {

                    if (res.data.ErrorDescription == "Success") {
                        $("#divThumbChecking").html('patient found');
                        $("#ThumbScanningModal").modal('hide');
                        fn_FillGridByPatientID(key);
                        f = true;
                        break;
                    }
                }
            }
        }
        if (f == false) {
            $("#divThumbChecking").html('Patient not found');
        }
        $("#btnMathchingThumb").html('Put your thumb');
    }
    else if (context == 'getmatchconcentthumb') {
        
        if (data == '') { return false; }
        $("#thumbconcent").attr('src', "data:image/bmp;base64," + data);
    }
}

function fn_AddUserThumb() {
    $('#AddThumbImpressionModal').modal('show');
    $('#mdlAddPatientModal').modal('hide');
    fillUserThumbStatus();
}

function fillUserThumbStatus() {
    var objRecords = ["getThumbImpression", _PatientRecordId, "", $qc.Cookie("locationid"), "", $qc.Cookie("username")];
    fn_UpdateDataToDatabase(72, 'getUserThumb', objRecords, 'DentalParams');

}

function fn_FingerType(_o) {
    _Fingertype = $(_o).attr('data-name');
    _FingerId = $(_o).attr('id');
    $("#btnDeleteThumb").hide();

    $("#imgThumbStatus").html('Waiting..');
    var _FileName = 'PatientThumbCapture/' + $qc.Cookie("locationid") + '/' + _PatientRecordId + '_' + _FingerId + '.txt';
    fn_getMime({ FilePath: _FileName }, 'FileStatus');

    $("#spnFingerName").html(_Fingertype);
}

function matchthumb() {
    $("#btnMathchingThumb").html('Scanning....');
    $("#divThumbChecking").html('');

    var _FileName = 'PatientThumbCapture/' + $qc.Cookie("locationid") + '/IsolatedThumb.txt';
    fn_getMime({ FilePath: _FileName }, 'getmatchthumb');
}

function rtn_comparetwothumbimages(data, context) {
    alert(data);
}

function CaptureUserThumb() {
    if (typeof PatThumb[1] == 'undefined' && typeof PatThumb[2] == 'undefined' && typeof PatThumb[3] == 'undefined') {
        alert('Select all thumb');
        return false;
    }
    fn_WriteFile('PatientThumbCapture/' + $qc.Cookie("locationid"), _PatientRecordId + '_' + _FingerId, 'txt', JSON.stringify(PatThumb), 'SaveThumb');
    fn_UpdateUserThumb('UpdateThumb', _PatientRecordId, _FingerId, 'Y');

    var objParams = {
        IsolatedThumb: PatThumb[1].IsoTemplate, "Finger": _FingerId, UserID: _PatientRecordId, filePath: 'PatientThumbCapture/' + $qc.Cookie("locationid") + '/IsolatedThumb.txt'
    };
    fn_UserIsolatedThumb(objParams, 'UpdateIsolatedThumb');

    //var objParams = {
    //    IsolatedThumb: PatThumb[1].BitmapData, "Finger": _FingerId, UserID: _PatientRecordId, filePath: 'PatientThumbCapture/' + $qc.Cookie("locationid") + '/BianryData.txt'
    //};
    //fn_UserIsolatedThumb(objParams, 'UpdateBinaryThumb');

}

function fn_onWriteComplete(data, context) {
    // alert('Save Success');
   fn_UpdateUserThumb('UpdateThumb', _PatientRecordId, _FingerId, 'Y');
}