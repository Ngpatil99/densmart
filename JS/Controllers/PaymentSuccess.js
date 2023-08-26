$(document).ready(function () {
    debugger;
    var payid = atob($qc.Cookie("PaymentRefID"));
    if (payid.split('_')[1] == 'sms') {
        var objParams = ["Update CommunicationPurchase set IsAprooved=1 ,AproovedBy=`Doctor` where PID = " + payid.split('_')[0]];
        UpdateDataToDatabase(73, 'UpdateSMSApproval', objParams, "DentalParams");
    } else if (payid.split('_')[1] == 'wa') {
        var objParams = ["Update CommunicationPurchase set IsAprooved=1 ,AproovedBy=`Doctor` where PID = " + payid.split('_')[0]];
        UpdateDataToDatabase(73, 'UpdateWAApproval', objParams, "DentalParams");
    } else if (payid.split('_')[1] == 'sw') {
        var objParams = ["Update CommunicationPurchase set IsAprooved=1 ,AproovedBy=`Doctor` where PID = " + payid.split('_')[0] + " " + " update ClinicInfo set ExpiryToDate = DATEADD(day,365,ExpiryToDate) where ClinicID = " + $qc.Cookie("locationid") ];
        UpdateDataToDatabase(73, 'UpdateSWApproval', objParams, "DentalParams");


    }
});