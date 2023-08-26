var _LocationId = $qc.cookie("locationid");
var _tabname = 'sms';
var _searchval = {
    "": "Select"
    , "PatientRegistrationDate": "Patient Registration Date"
    , "PatientName": "Patient Name"
    , "PatientGender": "Patient Gender"
    , "PatientAge": "Patient Age"
    , "PatientAddress": "Patient Address"
    , "PatientMobileNo": "Patient MobileNo"
    , "PatientEmail": "Patient Email"
    , "PatientMedicalHistory": "Patient Medical History"
    , "PatientPID": "Patient PID"
    , "PatientCustomPID": "Patient Custom PID"
    , "TreatmentName": "Treatment Name"
    , "ToothNo": "Tooth Number"
    , "FeesPaid": "Fees Paid"
    , "FeesRemaining": "Fees Remaining"
    , "DoctorName": "Doctor Name"
    , "PatientReferredBy": "Patient Ref. By"
    , "RunningTreatments": "Running Treatments/Incomplete Treatments"
};

$(document).ready(function () {
    FillDropDown_JS(false, 'SubClinicMaster', 'ddlClinicList', 0, _LocationId, 0, 1, null, null, false, [], 'Params', null);

    addfilter();

    $("#ddlClinicList").change(function () { _LocationId = $("#ddlClinicList").val(); });

    $("#liSMS").click(function () { _tabname = 'sms'; });
    $("#liWA").click(function () { _tabname = 'wa'; });

    $("#uplImageUpload").change(function () {
        var fileUpload = $(this).get(0);
        var files = fileUpload.files;
        $("#spnImageLabel").html(files[0].name);
    });

    $("#btnSearchResult").click(function () {
        var strWhere = "";
        $(".clsCategory").each(function () {
            var _len = $(this).attr('id').replace('ddlCategory', '');
            if ($("#ddlCategory" + _len).val() != '') {
                var cell0 = $("#ddlCategory" + _len).val();
                var cell1 = $("#ddlSubCategory" + _len).val();
                var cell2 = $("#txtSelValue" + _len).val();
                var cell3 = $("#ddlSelValue" + _len + " option:selected").text();

                /*Patinet Registration Date*/
                if (cell0 == 'PatientRegistrationDate' && cell1 == 'On') {
                    if (cell2 != '') { strWhere += ' and converT(date, createddate) = convert(date,`' + cell2 + '`)'; } else { alert('Select Registration Date'); return false; }
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'OnorAfter') {
                    if (cell2 != '') { strWhere += ' and converT(date, createddate) >= convert(date,`' + cell2 + '`)'; } else { alert('Select Registration Date'); return false; }
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'OnorBefore') {
                    if (cell2 != '') { strWhere += ' and converT(date, createddate) <= convert(date,`' + cell2 + '`)'; } else { alert('Select Registration Date'); return false; }
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'Yesterday') {
                    strWhere += ' and converT(date, createddate) = convert(date, getdate() - 1)';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'Today') {
                    strWhere += ' and converT(date, createddate) = convert(date, getdate())';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'ThisMonth') {
                    strWhere += ' and month(createddate) = month(getdate()) and year(createddate) = year(getdate())';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'LastMonth') {
                    strWhere += 'and month(createddate) = month(dateadd(month,-1,getdate())) and year(createddate)=year(getdate())';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'ThisYear') {
                    strWhere += ' and year(createddate) = year(getdate())';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'LastYear') {
                    strWhere += ' and year(createddate) = year(getdate())-1';
                } else if (cell0 == 'PatientRegistrationDate' && cell1 == 'LastXDays') {
                    if (cell2 != '') { strWhere += ' and convert(date,createddate) >= convert(date,dateadd(day,-' + cell2 + ',getdate()))'; } else { alert('Select Registration Date'); return false; }
                }

                /*Pateint Name*/
                if (cell0 == 'PatientName' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and PatName = `' + cell2 + '`'; } else { alert('Enter Patient Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and PatName <> `' + cell2 + '`'; } else { alert('Enter Patient Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and PatName like `%' + cell2 + '%`'; } else { alert('Enter Patient Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and PatName not like `%' + cell2 + '%`'; } else { alert('Enter Patient Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'ContainsData') {
                    strWhere += ' and PatName <> ``';
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and PatName = ``';
                }

                /*Patinet referred By*/
                if (cell0 == 'PatientReferredBy' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and RefDoctorName = `' + cell2 + '`'; } else { alert('Enter Patient Referred By Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and RefDoctorName <> `' + cell2 + '`'; } else { alert('Enter Patient Referred By Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and RefDoctorName like `%' + cell2 + '%`'; } else { alert('Enter Patient Referred By Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and RefDoctorName not like `%' + cell2 + '%`'; } else { alert('Enter Patient Referred By Name'); return false; }
                } else if (cell0 == 'PatientName' && cell1 == 'ContainsData') {
                    strWhere += ' and RefDoctorName <> ``';
                } else if (cell0 == 'PatientName' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and RefDoctorName = ``';
                }


                /*Patient Gender*/
                if (cell0 == 'PatientGender' && cell1 == 'Equals') {
                    if (cell3 != '') { strWhere += ' and Gender = `' + cell3 + '`'; }
                }

                /*Patient Age*/
                if (cell0 == 'PatientAge' && cell1 == 'Equals') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age = `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age = `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'IsGreaterThan') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age > `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'IsGreaterThanorEqualTo') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age >= `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'IsLessThan') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age < `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'IsLessThanorEqualTo') {
                    if (cell2 != '' && cell2 != '0') { strWhere += ' and age <= `' + cell2 + '`'; } else { alert('Enter patient age'); return false; }
                } else if (cell0 == 'PatientAge' && cell1 == 'ContainsData') {
                    if (cell2 != '') { strWhere += ' and age <> ``'; }
                } else if (cell0 == 'PatientAge' && cell1 == 'DoesNotContainData') {
                    if (cell2 != '') { strWhere += ' and age = ``'; }
                }
                /*Patient Address*/
                if (cell0 == 'PatientAddress' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and PrimaryAddress = `' + cell2 + '`'; } else { alert('Enter patient address'); return false; }
                } else if (cell0 == 'PatientAddress' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and PrimaryAddress <> `' + cell2 + '`'; } else { alert('Enter patient address'); return false; }
                } else if (cell0 == 'PatientAddress' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and PrimaryAddress like `%' + cell2 + '%`'; } else { alert('Enter patient address'); return false; }
                } else if (cell0 == 'PatientAddress' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and PrimaryAddress not like `%' + cell2 + '%`'; } else { alert('Enter patient address'); return false; }
                } else if (cell0 == 'PatientAddress' && cell1 == 'ContainsData') {
                    strWhere += ' and PrimaryAddress <> ``';
                } else if (cell0 == 'PatientAddress' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and PrimaryAddress = ``';
                }
                /*Patient Mobile No*/
                if (cell0 == 'PatientMobileNo' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and MobileNo = `' + cell2 + '`'; } else { alert('Enter patient mobile number'); return false; }
                } else if (cell0 == 'PatientMobileNo' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and MobileNo <> `' + cell2 + '`'; } else { alert('Enter patient mobile number'); return false; }
                } else if (cell0 == 'PatientMobileNo' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and MobileNo like `%' + cell2 + '%`'; } else { alert('Enter patient mobile number'); return false; }
                } else if (cell0 == 'PatientMobileNo' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and MobileNo not like `%' + cell2 + '%`'; } else { alert('Enter patient mobile number'); return false; }
                } else if (cell0 == 'PatientMobileNo' && cell1 == 'ContainsData') {
                    strWhere += ' and MobileNo <> ``';
                } else if (cell0 == 'PatientMobileNo' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and MobileNo = ``';
                }
                /*Patient Email*/
                if (cell0 == 'PatientEmail' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and EmailId = `' + cell2 + '`'; } else { alert('Enter patient email id'); return false; }
                } else if (cell0 == 'PatientEmail' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and EmailId <> `' + cell2 + '`'; } else { alert('Enter patient email id'); return false; }
                } else if (cell0 == 'PatientEmail' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and EmailId like `%' + cell2 + '%`'; } else { alert('Enter patient email id'); return false; }
                } else if (cell0 == 'PatientEmail' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and EmailId not like `%' + cell2 + '%`'; } else { alert('Enter patient email id'); return false; }
                } else if (cell0 == 'PatientEmail' && cell1 == 'ContainsData') {
                    strWhere += ' and EmailId <> ``';
                } else if (cell0 == 'PatientEmail' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and EmailId = ``';
                }
                /*Patient Medical History*/
                if (cell0 == 'PatientMedicalHistory' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and MedicalHistory = `' + cell2 + '`'; } else { alert('Enter patient medical history'); return false; }
                } else if (cell0 == 'PatientMedicalHistory' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and MedicalHistory <> `' + cell2 + '`'; } else { alert('Enter patient medical history'); return false; }
                } else if (cell0 == 'PatientMedicalHistory' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and MedicalHistory like `%' + cell2 + '%`'; } else { alert('Enter patient medical history'); return false; }
                } else if (cell0 == 'PatientMedicalHistory' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and MedicalHistory not like `%' + cell2 + '%`'; } else { alert('Enter patient medical history'); return false; }
                } else if (cell0 == 'PatientMedicalHistory' && cell1 == 'ContainsData') {
                    strWhere += ' and MedicalHistory <> ``';
                } else if (cell0 == 'PatientMedicalHistory' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and MedicalHistory = ``';
                }
                /*Patient ID*/
                if (cell0 == 'PatientPID' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and PatientId = `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and PatientId = `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'IsGreaterThan') {
                    if (cell2 != '') { strWhere += ' and PatientId > `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'IsGreaterThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and PatientId >= `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'IsLessThan') {
                    if (cell2 != '') { strWhere += ' and PatientId < `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'IsLessThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and PatientId <= `' + cell2 + '`'; } else { alert('Enter patient pid'); return false; }
                } else if (cell0 == 'PatientPID' && cell1 == 'ContainsData') {
                    strWhere += ' and PatientId <> ``';
                } else if (cell0 == 'PatientPID' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and PatientId = ``';
                }
                /*Patient Custom PID*/
                if (cell0 == 'PatientCustomPID' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and CustomId = `' + cell2 + '`'; } else { alert('Enter patient custom pid'); return false; }
                } else if (cell0 == 'PatientCustomPID' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and CustomId <> `' + cell2 + '`'; } else { alert('Enter patient custom pid'); return false; }
                } else if (cell0 == 'PatientCustomPID' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and CustomId like `%' + cell2 + '%`'; } else { alert('Enter patient custom pid'); return false; }
                } else if (cell0 == 'PatientCustomPID' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and CustomId not like `%' + cell2 + '%`'; } else { alert('Enter patient custom pid'); return false; }
                } else if (cell0 == 'PatientCustomPID' && cell1 == 'ContainsData') {
                    strWhere += ' and CustomId <> ``';
                } else if (cell0 == 'PatientCustomPID' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and CustomId = ``';
                }

                /*Treatment Name*/
                if (cell0 == 'TreatmentName' && cell1 == 'Equals') {
                    if (cell3 != '' && cell3 != '0') {
                        strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where tm.TreatmentName = `' + cell3 + '` and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')';

                    } else { alert('Select Treatment Name'); return false; }
                }

                /*RunningTreatments*/
                if (cell0 == 'RunningTreatments' && cell1 == 'Equals') {
                    if (cell3 != '' && cell3 != '0') {
                        //strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where tm.TreatmentName = `' + cell3 + '` and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')';
                        debugger;
                        strWhere += ' and Patientid in (';
                        strWhere += ' select distinct patientid from(';
                        strWhere += ' select PatientId from PatTreatCard p inner join TreatmentMaster tm on tm.TreatId = p.TreatID  where p.TreatStatus = 0 and p.deleted = 0 and p.LocationId = 1 and tm.TreatmentName = `' + cell3 + '`';
                        strWhere += ' union all';
                        strWhere += ' select PatientId from PatTreatCard  p inner join TreatmentMaster tm on tm.TreatId = p.TreatID where pid in (select PatTreatid from PatTreatSteps where StepTreatStatus = 0 and deleted = 0 and LocationId = 1) and p.TreatStatus = 0 and p.deleted = 0 and p.LocationId = 1  and tm.TreatmentName = `' + cell3 + '`';
                        strWhere += ' ) tbl';
                        strWhere += ')';

                    } else { alert('Select Treatment Name'); return false; }
                }



                /*Doctor Name*/
                if (cell0 == 'DoctorName' && cell1 == 'Equals') {
                    if (cell3 != '' && cell3 != '0') { strWhere += ' and Patientid in (select PatientId from AppointmentHistory a  left join doctorinfo d on d.doctorid = a.doctorid  where d.doctorname=`' + cell3 + '` and a.LocationId=' + $qc.Cookie("locationid") + ' and a.deleted=0)'; } else { alert('Select doctor name'); return false; }
                }
                /*ToothNo*/
                if (cell0 == 'ToothNo' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where p.toothno = `' + cell2 + '` and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')'; } else { alert('Enter tooth number'); return false; }
                } else if (cell0 == 'ToothNo' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where p.toothno <> `' + cell2 + '` and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')'; } else { alert('Enter tooth number'); return false; }
                } else if (cell0 == 'ToothNo' && cell1 == 'Contains') {
                    if (cell2 != '') { strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where p.toothno in (select content from dbo.stringsplit(`' + cell2 + '`,`,`) and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')'; } else { alert('Enter tooth number'); return false; }
                } else if (cell0 == 'ToothNo' && cell1 == 'DoesNotContain') {
                    if (cell2 != '') { strWhere += ' and Patientid in (select PatientId from PatTreatCard p inner join treatmentmaster tm on tm.TreatId = p.TreatID and tm.LocationId=' + $qc.Cookie("locationid") + ' and tm.deleted=0 where p.toothno not in (select content from dbo.stringsplit(`' + cell2 + '`,`,`) and p.deleted=0 and p.LocationId = ' + $qc.Cookie("locationid") + ')'; } else { alert('Enter tooth number'); return false; }
                } else if (cell0 == 'ToothNo' && cell1 == 'ContainsData') {
                    strWhere += ' and ToothNo =``';
                } else if (cell0 == 'ToothNo' && cell1 == 'DoesNotContainData') {
                    strWhere += ' and ToothNo<>``';
                }
                //else if (cell0 == 'PatientMedicalHistory' && cell1 == 'ContainsData') {
                //    strWhere += ' and MedicalHistory <> ``';
                //} else if (cell0 == 'PatientMedicalHistory' && cell1 == 'DoesNotContainData') {
                //    strWhere += ' and MedicalHistory = ``';
                //}
                /*FeesRemaining*/
                if (cell0 == 'FeesRemaining' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and BalAmount = ' + cell2; } else { alert('Enter fees'); return false; }
                } else if (cell0 == 'FeesRemaining' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and BalAmount <> ' + cell2; } else { alert('Enter fees'); return false; }
                } else if (cell0 == 'FeesRemaining' && cell1 == 'IsGreaterThan') {
                    if (cell2 != '') { strWhere += ' and BalAmount > ' + cell2; } else { alert('Enter fees'); return false; }
                } else if (cell0 == 'FeesRemaining' && cell1 == 'IsGreaterThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and BalAmount  >= ' + cell2; } else { alert('Enter fees'); return false; }
                } else if (cell0 == 'FeesRemaining' && cell1 == 'IsLessThan') {
                    if (cell2 != '') { strWhere += ' and BalAmount < ' + cell2; } else { alert('Enter fees'); return false; }
                } else if (cell0 == 'FeesRemaining' && cell1 == 'IsLessThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and BalAmount  <= ' + cell2; } else { alert('Enter fees'); return false; }
                }
                //else if (cell0 == 'FeesRemaining' && cell1 == 'ContainsData') {
                //    strWhere += ' and PatientId <> ``';
                //} else if (cell0 == 'FeesRemaining' && cell1 == 'DoesNotContainData') {
                //    strWhere += ' and PatientId = ``';
                //}
                /*FeesPaid*/
                if (cell0 == 'FeesPaid' && cell1 == 'Equals') {
                    if (cell2 != '') { strWhere += ' and PaidFee  = ' + cell2; } else { alert('Enter paid fees'); return false; }
                } else if (cell0 == 'FeesPaid' && cell1 == 'DoesNotEqual') {
                    if (cell2 != '') { strWhere += ' and PaidFee  <> ' + cell2; } else { alert('Enter paid fees'); return false; }
                } else if (cell0 == 'FeesPaid' && cell1 == 'IsGreaterThan') {
                    if (cell2 != '') { strWhere += ' and PaidFee  > ' + cell2; } else { alert('Enter paid fees'); return false; }
                } else if (cell0 == 'FeesPaid' && cell1 == 'IsGreaterThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and PaidFee  >= ' + cell2; } else { alert('Enter paid fees'); return false; }
                } else if (cell0 == 'FeesPaid' && cell1 == 'IsLessThan') {
                    if (cell2 != '') { strWhere += ' and PaidFee  < ' + cell2; } else { alert('Enter paid fees'); return false; }
                } else if (cell0 == 'FeesPaid' && cell1 == 'IsLessThanorEqualTo') {
                    if (cell2 != '') { strWhere += ' and PaidFee  <= ' + cell2; } else { alert('Enter paid fees'); return false; }
                }
                //else if (cell0 == 'FeesPaid' && cell1 == 'ContainsData') {
                //    strWhere += ' and PatientId <> ``';
                //} else if (cell0 == 'FeesPaid' && cell1 == 'DoesNotContainData') {
                //    strWhere += ' and PatientId = ``';
                //}

                /*End*/
            }

        });
        var _objParams = [$qc.Cookie("locationid"), strWhere];
        GetDataFromDatabase(57, "GetPatData", _objParams, "DentalParams");
    });
});

function fillGrid() {
    if (_tabname == 'sms') {
        fillGridSMS();
    } else if (_tabname == 'wa') {
        fillGridWA();
    }
}

function fillGridSMS() {
    var objParams = [
        _LocationId
        , _tabname
        , 0
    ];
    GetDataFromDatabase(71, 'FillGridSMS', objParams, 'DentalParams');
}

function fillGridWA() {
    var objParams = [
        _LocationId
        , _tabname
        , 0
    ];
    GetDataFromDatabase(71, 'FillGridWA', objParams, 'DentalParams');
}

function onGetDataSuccess(data, context) {
    if (context == 'FillGridSMS') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'Template Name', 'Response', 'Type', 'Action'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6],
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
    else if (context == 'FillGridWA') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var objVarable = {
            CtrlId: '1',
            header: ['SNo', 'Template Name', 'Response', 'Type', 'Action'],
            dataArr: [],
            width: [25, 80, 0, 0, 0, 0, 0, 20],
            headerval: [1, 1, 2, 3, 4, 5, 6],
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
    else if (context == 'getSMSDetails') {
        if (data == '') { return false; }
        var html = '';
        eval('var objData=' + data);
        if (objData) {
            for (key in objData) {
                if (key == 'MsgURL') {
                    eval('var objURL = ' + objData[key]);
                    if (objURL) {
                        html += '<div style="padding-left:20px;">';
                        for (key1 in objURL[0]) {
                            if (key1 == 'PostData') {
                                html += '<div><span><strong>Message</strong></span>: ' + objURL[0][key1].substring(objURL[0][key1].indexOf('message=') + 8) + '</div>';
                            }
                        }
                        html += '/<div>';
                    }

                } else {
                    html += '<div><span><strong>' + key + '</strong></span>: ' + objData[key] + '</div>';
                }
            }
        }

        $("#divMessage").html(html);
        $("#mdlResponse").modal('show');
    }
    else if (context == 'getWADetails') {
        if (data == '') { return false; }
        var html = '';
        eval('var objData=' + data);
        if (objData) {
            for (key in objData) {
                if (key == 'MsgURL') {
                    eval('var objURL = ' + objData[key]);
                    if (objURL) {
                        html += '<div style="padding-left:20px;">';
                        for (key1 in objURL[0]) {
                            if (key1 == 'PostData') {
                                eval('var objPostData=' + objURL[0][key1]);
                                if (objPostData) {
                                    for (var key2 in objPostData) {
                                        if (key2 != 'apiKey') {

                                            html += '<div ><span><strong>' + key2 + '</strong></span>: ' + objPostData[key2] + '</div>';
                                        }
                                    }
                                }

                            }
                        }
                        html += '/<div>';
                    }

                } else {
                    html += '<div><span><strong>' + key + '</strong></span>: ' + objData[key] + '</div>';
                }
            }
        }

        $("#divMessage").html(html);
        $("#mdlResponse").modal('show');
    }
    else if (context == 'GetPatData') {
        data = (data == '' ? '[]' : data);
        var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        var strHead = '<tr><th class="chkClass" onclick="checkall(this);"></th><th>SrNo</th><th>Patient Name</th><th>Mobile</th>'; var strBody = '';
        for (var i = 0; i < _objGridResult.length; i++) {
            strBody += '<tr><td class="chkClass" data-attr="' + _objGridResult[i]["PatientId"] + '" onclick="checksingle(this);"></td><td>' + (i + 1) + '</td><td>' + _objGridResult[i]["PatName"] + '</td><td>' + _objGridResult[i]["MobileNo"] + '</td>';
            $(".clsCategory").each(function () {
                var _len = $(this).attr('id').replace('ddlCategory', '');
                var cell3 = $("#ddlSelValue" + _len + " option:selected").text();

                if ($(this).val() == 'PatientRegistrationDate') {
                    if (i == 0) { strHead += '<th>Reg. Date</th>'; }
                    strBody += '<td>' + _objGridResult[i]["RegDate"] + '</td>';
                } else if ($(this).val() == 'PatientGender') {
                    if (i == 0) { strHead += '<th>Gender</th>'; }
                    strBody += '<td>' + _objGridResult[i]["Gender"] + '</td>';
                } else if ($(this).val() == 'PatientAge') {
                    if (i == 0) { strHead += '<th>Age</th>'; }
                    strBody += '<td>' + _objGridResult[i]["Age"] + '</td>';
                } else if ($(this).val() == 'PatientAddress') {
                    if (i == 0) { strHead += '<th>Address</th>'; }
                    strBody += '<td>' + _objGridResult[i]["PrimaryAddress"] + '</td>';
                } else if ($(this).val() == 'PatientMobileNo') {
                    if (i == 0) { strHead += '<th>Mobile no</th>'; }
                    strBody += '<td>' + _objGridResult[i]["MobileNo"] + '</td>';
                } else if ($(this).val() == 'PatientEmail') {
                    if (i == 0) { strHead += '<th>Email Id</th>'; }
                    strBody += '<td>' + _objGridResult[i]["EmailId"] + '</td>';
                } else if ($(this).val() == 'PatientMedicalHistory') {
                    if (i == 0) { strHead += '<th>Medical History</th>'; }
                    strBody += '<td>' + _objGridResult[i]["MedicalHistory"] + '</td>';
                } else if ($(this).val() == 'PatientPID') {
                    if (i == 0) { strHead += '<th>PID</th>'; }
                    strBody += '<td>' + _objGridResult[i]["PatId"] + '</td>';
                } else if ($(this).val() == 'PatientCustomPID') {
                    if (i == 0) { strHead += '<th>Custom Id</th>'; }
                    strBody += '<td>' + _objGridResult[i]["CustomId"] + '</td>';
                } else if ($(this).val() == 'TreatmentName') {
                    if (i == 0) { strHead += '<th>Treatment </th>'; }
                    strBody += '<td>' + cell3 + '</td>';
                } else if ($(this).val() == 'RunningTreatments') {
                    if (i == 0) { strHead += '<th>Treatment </th>'; }
                    strBody += '<td>' + cell3 + '</td>';
                }



                else if ($(this).val() == 'ToothNo') {
                    if (i == 0) { strHead += '<th>Tooth No</th>'; }
                    strBody += '<td>' + _objGridResult[i]["ToothNo"] + '</td>';
                } else if ($(this).val() == 'FeesPaid') {
                    if (i == 0) { strHead += '<th>Fees Paid</th>'; }
                    strBody += '<td>' + _objGridResult[i]["PaidFee"] + '</td>';
                } else if ($(this).val() == 'FeesRemaining') {
                    if (i == 0) { strHead += '<th>Fees Remaining</th>'; }
                    strBody += '<td>' + _objGridResult[i]["BalAmount"] + '</td>';
                } else if ($(this).val() == 'DoctorName') {
                    if (i == 0) { strHead += '<th>Doctor Name</th>'; }
                    strBody += '<td>' + cell3 + '</td>';
                } else if ($(this).val() == 'PatientReferredBy') {
                    if (i == 0) { strHead += '<th>Referred By Dr.</th>'; }
                    strBody += '<td>' + _objGridResult[i]["RefDoctorName"] + '</td>';
                }
            });

            strBody += '</tr>';
        }
        strHead += '</tr>';

        var str = '<table class="table table-bordered tblResult _isSno IsActionButton">';
        str += '<thead>' + strHead;
        str += '</thead>';
        str += '<tbody id="tblResult">' + strBody;
        str += '</tbody>';
        str += '</table>';

        $("#GridResult").html(str);



        //data = (data == '' ? '[]' : data);
        //var JSONDATA = 'var _objGridResult=' + data + ';'; eval(JSONDATA);

        //var objVarable = {
        //    CtrlId: '',
        //    header: ['SNo', 'Patient Name', 'Mobile', 'Email'],
        //    dataArr: [],
        //    width: [25, 80, 0, 0, 0, 0, 0, 20],
        //    headerval: [1, 1, 1, 2, 3, 4, 5],
        //    IsActionButton: null,
        //    isTools: false,
        //    checkbox: true,
        //    IsAddBlankRow: false,
        //    ColumnShow: [],
        //    DefaultRow: '50',
        //    SortType: [1, 1, 2, 2, 2, 2, 2, 2],
        //    header_align: ['', '', '', '', '', ''],
        //    chkVal: 1,
        //    advSearch: true,
        //    IsLinkButton: false,
        //    LinkButtonColumns: [2],
        //    objectJSON: _objGridResult
        //}
        //ctlDetails = new fn_arvGrid(objVarable);
        //ctlDetails.FillGrid(3, 1, 0);

        //$(".clsDefaultSorting").attr('title', 1);
        //$(".clsDefaultSorting").addClass('desending');
        //$(".clsDefaultSorting").removeClass('ascending');
        //ctlDetails.AscendingDescendingArr($(".clsDefaultSorting"));
    }

    else if (context == 'UpdateImageForm') {
        if (data == '' || data == 0) { alert('Online error'); return false; }
        var fileUpload = $("#uplImageUpload").get(0);
        var files = fileUpload.files;

        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _PatientPhoto = data + '.' + _extension;
            var fileparams = { FolderName: "GeneralWhatsApp/" + _LocationId, FileName: data, Extension: _extension };
            UploadImage(files[0], 'RVGCaptures', fileparams);

            /* Whats app images send */

            var strSQL = '';
            var _url = 'https://doctor.oramo.in/uploads/' + pgLoadVariableQaurus.ClientNo + '/uploadedfiles/GeneralWhatsApp/' + _LocationId + '/' + _PatientPhoto;
            strSQL = 'insert into pdfurls(ParentId,PatientId,LocationId,DoctorId,ReceiptURL,PageType,moddate)';
            strSQL += ' values(' + data + ',' + _PatientId + ',' + _LocationId + ',0,`' + _url + '`,`GeneralWhatsApp`,getdate())';
            strSQL += ' select SCOPE_IDENTITY() ';

            var objParams = ["UpdateSQL", strSQL];
            UpdateDataToDatabase(13, 'UpdateReceiptURL', objParams, 'DentalParams');
        }



    }

    else if (context == 'UpdateReceiptURL') {
        if (data == 0 || data == '') { return false; }
        var strPatientIDs = '';
        $(".chkClass1").each(function () {
            strPatientIDs += (strPatientIDs == '' ? '' + $(this).attr('data-attr') : ',' + $(this).attr('data-attr'));
        });

        if (strPatientIDs == '') { return false; }
        var JSONPath = {
            "Proc": 65,
            "Params": 'Patient General SMS|0|0|0|0|0|' + data + '|' + $qc.Cookie("usercategory") + '|0|0|' + $qc.Cookie('locationid') + '|' + strPatientIDs,
            "ParamPath": "DentalParams"
        }
        fn_sendInstantCommunication(JSONPath, "PatientImages");
        //fn_FillGridIamgeForm();
    }
}

function checkall(_o) {
    if ($(_o).hasClass('chkClass')) {
        $(".chkClass").removeClass('chkClass').addClass('chkClass1');
    } else {
        $(".chkClass1").removeClass('chkClass1').addClass('chkClass');
    }
}

function checksingle(_o) {
    if ($(_o).hasClass('chkClass')) {
        $(_o).removeClass('chkClass').addClass('chkClass1');
    } else {
        $(_o).removeClass('chkClass1').addClass('chkClass');
    }
}

function btnView_Click(_oBtn) {
    if (_tabname == 'sms') {
        var _SMSID = $(_oBtn).attr('data-id');


        var objParams = [
            _LocationId
            , 'ResponseSMS'
            , _SMSID
        ];
        GetDataFromDatabase(71, 'getSMSDetails', objParams, 'DentalParams');
    }
    else if (_tabname == 'wa') {
        var _WAID = $(_oBtn).attr('data-id');


        var objParams = [
            _LocationId
            , 'ResponseWA'
            , _WAID
        ];
        GetDataFromDatabase(71, 'getWADetails', objParams, 'DentalParams');
    }

}

function addfilter() {
    var len = $("#divFilters div.row").length;
    var str = '';
    str += '<div class="row">'

    str += '<div class="form-group col-sm-6 col-md-4 col-lg-3">';
    str += '    <select id="ddlCategory' + len + '" class="form-control clsCategory">';
    str += '';
    str += '    </select>';
    str += '</div>';
    str += '<div class="form-group col-sm-6 col-md-4 col-lg-3"  style="display:none;">';
    str += '    <select id="ddlSubCategory' + len + '" class="form-control">';
    str += '    </select>';
    str += '</div>';
    str += '<div class="form-group col-sm-6 col-md-4 col-lg-3"  style="display:none;">';
    str += '    <input id="txtSelValue' + len + '" type="text" class="form-control" />';
    str += '';
    str += '</div>';
    str += '<div class="form-group col-sm-6 col-md-4 col-lg-3"  style="display:none;">';
    str += '    <select id="ddlSelValue' + len + '" class="form-control"></select>';
    str += '';
    str += '</div>';

    str += '</div>';

    $(str).appendTo("#divFilters");

    debugger;
    var $ddlCategory = $("#ddlCategory" + len);
    for (var key in _searchval) {
        $('<option></option').attr('value', key).text(_searchval[key]).appendTo($ddlCategory);
    }

    var $ddlSubCategory = $("#ddlSubCategory" + len);

    $ddlCategory.change(function () {
        if ($("#ddlCategory" + (len + 1)).length == 0) {
            addfilter();
        }

        var $ddlSub = $ddlSubCategory;
        $("#txtSelValue").parent().hide();
        $("#ddlSelValue").parent().hide();
        $ddlSub.html('');
        $ddlSub.parent().show();
        $('<option></option').attr('value', '').text('--').appendTo($ddlSub);
        if ($ddlCategory.val() == 'PatientRegistrationDate' || $ddlCategory.val() == 'TreatmentDate') {
            $('<option></option').attr('value', 'On').text('On').appendTo($ddlSub);
            $('<option></option').attr('value', 'OnorAfter').text('On or After').appendTo($ddlSub);
            $('<option></option').attr('value', 'OnorBefore').text('On or Before').appendTo($ddlSub);
            $('<option></option').attr('value', 'Yesterday').text('Yesterday').appendTo($ddlSub);
            $('<option></option').attr('value', 'Today').text('Today').appendTo($ddlSub);
            $('<option></option').attr('value', 'ThisMonth').text('This Month').appendTo($ddlSub);
            $('<option></option').attr('value', 'LastMonth').text('Last Month').appendTo($ddlSub);
            $('<option></option').attr('value', 'ThisYear').text('This Year').appendTo($ddlSub);
            $('<option></option').attr('value', 'LastYear').text('Last Year').appendTo($ddlSub);
            $('<option></option').attr('value', 'LastXDays').text('Last X Days').appendTo($ddlSub);

        } else if ($ddlCategory.val() == 'PatientReferredBy' || $ddlCategory.val() == 'PatientName' || $ddlCategory.val() == 'PatientAddress' || $ddlCategory.val() == 'PatientMobileNo' || $ddlCategory.val() == 'PatientEmail' || $ddlCategory.val() == 'PatientMedicalHistory' || $ddlCategory.val() == 'PatientCustomPID' || $ddlCategory.val() == 'ToothNo') {
            $('<option></option').attr('value', 'Equals').text('Equals').appendTo($ddlSub);
            $('<option></option').attr('value', 'DoesNotEqual').text('Does Not Equal').appendTo($ddlSub);
            $('<option></option').attr('value', 'Contains').text('Contains').appendTo($ddlSub);
            $('<option></option').attr('value', 'DoesNotContain').text('Does Not Contain').appendTo($ddlSub);
            $('<option></option').attr('value', 'ContainsData').text('Contains Data').appendTo($ddlSub);
            $('<option></option').attr('value', 'DoesNotContainData').text('Does Not Contain Data').appendTo($ddlSub);


        } else if ($ddlCategory.val() == 'PatientAge' || $ddlCategory.val() == 'PatientPID' || $ddlCategory.val() == 'FeesPaid' || $ddlCategory.val() == 'FeesRemaining') {
            $('<option></option').attr('value', 'Equals').text('Equals').appendTo($ddlSub);
            $('<option></option').attr('value', 'DoesNotEqual').text('Does Not Equal').appendTo($ddlSub);
            $('<option></option').attr('value', 'IsGreaterThan').text('Is Greater Than').appendTo($ddlSub);
            $('<option></option').attr('value', 'IsGreaterThanorEqualTo').text('Is Greater Than or EqualTo').appendTo($ddlSub);
            $('<option></option').attr('value', 'IsLessThan').text('Is Less Than').appendTo($ddlSub);
            $('<option></option').attr('value', 'IsLessThanorEqualTo').text('Is Less Than or Equal To').appendTo($ddlSub);
            $('<option></option').attr('value', 'ContainsData').text('ContainsData').appendTo($ddlSub);
            $('<option></option').attr('value', 'DoesNotContainData').text('Does Not Contain Data').appendTo($ddlSub);
        } else if ($ddlCategory.val() == 'PatientGender' || $ddlCategory.val() == 'RunningTreatments' || $ddlCategory.val() == 'TreatmentName' || $ddlCategory.val() == 'DoctorName') {
            $('<option></option').attr('value', 'Equals').text('Equals').appendTo($ddlSub);
        }
    });

    var $txtSelValue = $("#txtSelValue" + len);
    var $ddlSelValue = $("#ddlSelValue" + len);

    $ddlSubCategory.change(function () {
        $txtSelValue.parent().hide();
        $ddlSelValue.parent().hide();
        var $ddlSelvale = $ddlSelValue; $ddlSelvale.html('');

        if (this.value == 'On' || this.value == 'OnorAfter' || this.value == 'OnorBefore') {
            $txtSelValue.val(_GlobalPatHistory.CurrentDate);
            $txtSelValue.attr('type', 'date');
            $txtSelValue.parent().show();
            $ddlSelValue.parent().hide();
        } else if (this.value == 'Yesterday' || this.value == 'Today' || this.value == 'ThisMonth' || this.value == 'LastMonth' || this.value == 'ThisYear' || this.value == 'LastYear' || this.value == 'ContainsData' || this.value == 'DoesNotContainData') {
            $txtSelValue.parent().hide();
            $ddlSelValue.parent().hide();
        } else if (this.value == 'LastXDays') {
            $txtSelValue.val('');
            $txtSelValue.attr('type', 'number');
            $txtSelValue.parent().show();
            $ddlSelValue.parent().hide();
        }

        else if (this.value == 'Equals') {
            if ($ddlCategory.val() == 'PatientGender') {
                $txtSelValue.parent().hide();
                $ddlSelValue.parent().show();

                $('<option></option').attr('value', 'Male').text('Male').appendTo($ddlSelvale);
                $('<option></option').attr('value', 'Female').text('Female').appendTo($ddlSelvale);
            }
            else if ($ddlCategory.val() == 'TreatmentName') {
                $txtSelValue.parent().hide();
                $ddlSelValue.parent().show();

                FillDropDown_JS(true, 'TreatmentList', 'ddlSelValue' + len, 0, $qc.Cookie("locationid"), 0, 1, null, null, false, [], 'Params', null);
            }
            else if ($ddlCategory.val() == 'RunningTreatments') {
                $txtSelValue.parent().hide();
                $ddlSelValue.parent().show();

                FillDropDown_JS(true, 'TreatmentList', 'ddlSelValue' + len, 0, $qc.Cookie("locationid"), 0, 1, null, null, false, [], 'Params', null);
            }

            else if ($ddlCategory.val() == 'DoctorName') {
                $txtSelValue.parent().hide();
                $ddlSelValue.parent().show();

                FillDropDown_JS(true, 'Doctorlist', 'ddlSelValue' + len, 0, $qc.Cookie("locationid"), 0, 1, null, null, false, [], 'Params', null);
            }
            else if ($ddlCategory.val() == 'PatientName') {
                $txtSelValue.val('');
                $txtSelValue.attr('type', 'text');
                $txtSelValue.parent().show();
                $ddlSelValue.parent().hide();
            } else {
                $txtSelValue.val('');
                $txtSelValue.attr('type', 'text');
                $txtSelValue.parent().show();
                $ddlSelValue.parent().hide();
            }

        }
        else {
            $txtSelValue.val('');
            $txtSelValue.attr('type', 'text');
            $txtSelValue.parent().show();
            $ddlSelValue.parent().hide();
        }
    });


}

function fn_UploadImages() {
    var strPatientIDs = '';
    $(".chkClass1").each(function () {
        strPatientIDs += (strPatientIDs == '' ? '' + $(this).attr('data-attr') : ',' + $(this).attr('data-attr'));
    });

    if (strPatientIDs == '') { alert('Select Patient'); return false; }


    if (window.confirm('Are you sure to sent whats app general message ')) {
        var _extension = '';
        var fileUpload = $("#uplImageUpload").get(0);
        var files = fileUpload.files;
        if (files.length <= 0) {
            alert('Choose File'); return false;
        } else {
            _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
        }

        var d = new Date();
        var filename = d.getDate() + '_' + (d.getMonth() + 1) + '_' + d.getFullYear() + '_' + d.getHours() + '_' + d.getMinutes() + '_' + d.getSeconds() + '_' + d.getMilliseconds();

        if (files.length > 0) {
            var _extension = fn_getFileExtension(files[0].name).replace('jpeg', 'jpg');
            _PatientPhoto = filename + '.' + _extension;
            var fileparams = { FolderName: "GenralWAImages/" + _LocationId, FileName: filename, Extension: _extension };
            UploadImage(files[0], 'RVGCaptures', fileparams);

            /* Whats app images send */

            var strSQL = '';
            var _url = 'https://doctor.oramo.in/uploads/' + pgLoadVariableQaurus.ClientNo + '/uploadedfiles/GenralWAImages/' + _LocationId + '/' + _PatientPhoto;
            strSQL = 'insert into pdfurls(ParentId,PatientId,LocationId,DoctorId,ReceiptURL,PageType,moddate)';
            strSQL += ' values(0,0,' + _LocationId + ',0,`' + _url + '`,`GeneralWhatsApp`,getdate())';
            strSQL += ' select SCOPE_IDENTITY() ';

            var objParams = ["UpdateSQL", strSQL];
            UpdateDataToDatabase(13, 'UpdateReceiptURL', objParams, 'DentalParams');
        }

        // if ($("#txtImageUpload").val() == '') { alert('Enter Image Title'); return false; }


        //var _objParams = [_ConsentId, _LocationId, _PatientId, _EssentialFormType
        //    , _GlobalPatHistory.CurrentDate
        //    , "0"
        //    , _extension
        //    , "0"
        //    , $("#txtImageUpload").val()
        //];
        //UpdateDataToDatabase(45, "UpdateImageForm", _objParams, "DentalParams");
    }
}
