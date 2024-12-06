$("#btn-exercicios").click(function() {

    $("#div-inicial")
    .animate({ top: '-100px' }, 500)
    .animate({ top: '0px', opacity: '0' }, 500, function() {
        $("#div-inicial").hide();
        $("#div-exercicios").stop(true, true).slideDown("slow");
    });

});