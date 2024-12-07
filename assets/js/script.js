$("#btn-exercicios").click(function() {
    $("#div-inicial").css({ display: "block", top: "0px", opacity: '1'})
    .animate({ top: "100px", opacity: '0', display: "none"}, 500, function() {
        $("#div-inicial").hide();
        $("#div-exercicios").css({display: "block", top: "-100px", opacity: '0'})
        .animate({ top: "0px", opacity: '1'});
    });
});


$(".btn-inicio").click(function() {
    $("#div-exercicios").css({ display: "block", top: "0px", opacity: '1'})
    .animate({ top: "100px", opacity: '0', display: "none"}, 500, function() {
        $("#div-exercicios").hide();
        $("#div-inicial").css({display: "block", top: "-100px", opacity: '0'})
        .animate({ top: "0px", opacity: '1'});
    });
});