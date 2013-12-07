function catalog() {
    if ($("#catalog").is(":visible")) {
        $("#maps").show();
        $("#catalog").hide();   
    }
    else{
        $("#maps").hide();
        $("#catalog").show();   
    }
    
}

function openCloseFamilyCatalog(){
    if ($(this).hasClass("close")) {
        $(this).removeClass("close").addClass("open");
    }
    else{
        $(this).removeClass("open").addClass("close");
    }
}