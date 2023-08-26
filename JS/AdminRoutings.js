var app = angular.module("myDentist", ["ngRoute"]);
app.controller('uiCtrl', function ($scope, $rootScope) {
   /* changeBtnStyle(); _requireUIfeild(); fn_NepalLabelChange();*/
    //if (typeof $qc.Cookie("PageTitle") != 'undefined' && $qc.Cookie("PageTitle") != '') {
    //    $(".page-title").html($qc.Cookie("PageTitle"));
    //}
    //if ($("#GridResult .tblResult").length > 0 || $("#GridResult1 .tblResult").length > 0) {
    //    $(".btnExport").show();
    //} else {
    //    $(".btnExport").hide();
    //}

    // $qc.setCookie('KCID', 0);
    fn_CheckUserRoles();
});
var Ver = 5;
app.config(function ($routeProvider, $locationProvider) {
    $routeProvider
        //.when("", { templateUrl: "AdminPanel.html?v=" + Ver, controller: "uiCtrl" })        
        .when("/DentalSoft", { templateUrl: "Dashboard.html?v=" + Ver, controller: "uiCtrl" })

        //.when("/DentalSoft/Home", { templateUrl: "Home.html?v=" + Ver, controller: "uiCtrl" })

        .when("/DentalSoft/ClinicRecords", { templateUrl: "Admin/ClinicRecords.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PatientList", { templateUrl: "Admin/PatientList.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/Appointments", { templateUrl: "Admin/Appointments.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/ClinicalRecords", { templateUrl: "Admin/ClinicalRecords.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/Finance", { templateUrl: "Admin/Finance.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/Communication", { templateUrl: "Admin/Communication.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/Registration", { templateUrl: "Admin/Registration.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/ClinicalSettings", { templateUrl: "Admin/ClinicalSettings.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/AppSettings", { templateUrl: "Admin/AppSettings.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/TreatmentCard", { templateUrl: "Admin/Treatments.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/UserSettings", { templateUrl: "Admin/UserSettings.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintForms", { templateUrl: "Admin/PrintConsentForm.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintQuotation", { templateUrl: "Admin/PrintQuotation.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintReceipt", { templateUrl: "Admin/PrintReceipt.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintReceiptConsultingDr", { templateUrl: "Admin/PrintReceiptConsultingDr.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintReferralForm", { templateUrl: "Admin/PrintReferralForm.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintTreatCard", { templateUrl: "Admin/PrintTreatCard.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PrintLabRecord", { templateUrl: "Admin/PrintLabRecord.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/MessageTemplates", { templateUrl: "Admin/SMSSettngs.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/WhatsAppTemplates", { templateUrl: "Admin/WhatsAppTemplates.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/CommunicationReports", { templateUrl: "Admin/CommunicationReports.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/Purchase", { templateUrl: "Admin/Purchase.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PaymentSuccess", { templateUrl: "Admin/PaymentSuccess.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PaymentCancel", { templateUrl: "Admin/PaymentCancel.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/PaymentFailure", { templateUrl: "Admin/PaymentFailure.html?v=" + Ver, controller: "uiCtrl" })
        .when("/DentalSoft/UploadPatients", { templateUrl: "Admin/UploadPatients.html?v=" + Ver, controller: "uiCtrl" })

    
    
        //.when("/DentalSoft/AppSettings", { templateUrl: "Admin/AppSettings.html?v=" + Ver, controller: "uiCtrl" })
        //.when("/DentalSoft/AppSettings", { templateUrl: "Admin/AppSettings.html?v=" + Ver, controller: "uiCtrl" })
        //.when("/DentalSoft/AppSettings", { templateUrl: "Admin/AppSettings.html?v=" + Ver, controller: "uiCtrl" })
        //.when("/DentalSoft/AppSettings", { templateUrl: "Admin/AppSettings.html?v=" + Ver, controller: "uiCtrl" })
        
        .otherwise({ redirectTo: "DentalSoft" });
    $locationProvider.html5Mode(true);
});