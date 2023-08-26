

var _ExamName = 'Receipt';
function fn_GenerateExamPaperPDF(FileName, objExam) {
    _ExamName = FileName + objExam[0]["BranchCode"] + '_' + objExam[0]["CourseCode"] + '_' + objExam[0]["ExamName"];
    var _print = '<html>';
    _print += '<head>';
    _print += '<title>Admit Card</title>';
    _print += '<meta charset="utf-8" />';


    _print += '<link rel="stylesheet" type="text/css" href="https://gradely.in/css/print.css" />';
    _print += '<style type="text/css">.content{width:200mm;margin:15mm auto 0;border:1px solid #000;page-break-after:always}.Admitcard{padding:5px 15px;margin:0 5px 10px;background:#ccc;color:#000;font-weight:700;font-size:120%;text-align:center}.contentTable{margin:0 auto}.contentTable td,.contentTable th{padding:5px 8px;border:1px solid #000}.contentTable tbody tr td:first-child,.contentTable thead tr th:first-child{border-left:0!important}.contentTable tbody tr td:nth-last-child(1),.contentTable thead tr th:nth-last-child(1){border-right:0!important}.contentTable tbody tr:nth-last-child(1) td{border-bottom:0!important}table{width:100%}@page {size: A4 portrait; margin: 0 20px 20px;}</style>';
    //_print += '<style type="text/css">';

    //_print += '@media screen{';
    //_print += '.mainpage{';
    //_print += 'padding:20px; border:1px solid #000;';
    //_print += '}';
    //_print += '.mainpage + .mainpage{margin - top:30px!important;}';
    //_print += '}';
    //_print += '@page{';
    //_print += 'size:A4 portrait; margin:10px;';
    //_print += '}';
    //_print += '@media print {';
    //_print += '.mainpage{page-break-after:always;}';
    //_print += '}';
    //_print += '</style>';
    _print += '</head>';
    _print += '<body>' + fn_DownloadReceipt(objExam);

    _print += '</body>';
    _print += '</html>';



    var options = {
        format: 'A4',
        orientation: "portrait", // portrait or landscape
        //border: "0"             // default is 0, units: mm, cm, in, px

        //border: {
        //    "top": "0.1in",            // default is 0, units: mm, cm, in, px
        //    "right": "0.2in",
        //    "bottom": "0.1in",
        //    "left": "0.2in"
        //}

        //,watermark: document.location.origin

    };
    GeneratePDF("GeneratePDF/" + LocationID, FileName, 'pdf', options, _print, 'DownloadExamQuesPaper');
}

function onGeneratePDF(data, context) {
    if (context == 'DownloadExamQuesPaper') {
        if (data == '') { return false; }
        //console.log(data);
        var _url = RootFolderPath(data);
        var link = document.createElement('a');
        link.href = _url;
        link.download = _ExamName + '.pdf';
        link.target = "_blank";
        link.dispatchEvent(new MouseEvent('click'));
    }
}

function onImgerror(_o, t) {
    if (t == 1) {
        $(_o).attr('src', 'images/schoollogo.jpg');
    } else {
        $(_o).attr('src', 'images/user-default.png');
    }
}