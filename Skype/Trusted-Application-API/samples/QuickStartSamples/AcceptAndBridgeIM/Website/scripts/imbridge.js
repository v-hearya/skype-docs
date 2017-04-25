//$(function () {
//    'use strict';
    $("body").delegate(".code", "click", function () {

        var element = $(this).next("div"), value = $(this).text().split(" ")[0];

        if (element.is(":hidden")) {
            $(this).text(value + " - Click to Collapse");
        } else {
            $(this).text(value + " - Click to Expand");
        }

        $(this).next("div").toggle();
        $(this).next("div").find("div").toggle();

     });
     ajaxrequest('get', 'imbridge_template.html', '', 'text').done(function (result) {
         $(".GetAnonTokenSamples").html(result);
     });
     ajaxrequest('get', 'imbridge_template_discover.html', '', 'text').done(function (result) {
         $(".GetAnonTokenDiscoverSamples").html(result);
     });
     ajaxrequest('get', 'imbridge_template_signin.html', '', 'text').done(function (result) {
         $(".GetAnonTokenSigninSamples").html(result);
     });
     ajaxrequest('get', 'imbridge_template_startchat.html', '', 'text').done(function (result) {
         $(".GetAnonTokenChatSamples").html(result);
     });
    //$("#imbridge_details").click(function () {

    //    //var element = $(this).find(".details_page");

    //    if ($(".details_page").is(":hidden"))
    //    {
    //        ajaxrequest('get', 'imbridge_template.html', '', 'text').done(function (result) {
    //            $(".details_page").html(result);
    //        });
    //    }
    //    else
    //    {
    //        $(".details_page").html("");
    //    }
    //    $(".details_page").toggle();
    // });
//})




















function ajaxrequest(verb, url, data, datatype) {
    return $.ajax({
        url: url,
        type: verb,
        dataType: datatype,
        data: data
    });
}