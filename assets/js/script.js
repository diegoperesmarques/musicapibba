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
        location.reload();

    });
});


$(document).on("click", ".opcao", function() {

    let resultado = $(this).data("resultado");
    let mensagem = $("#txt-resultado");

    if(resultado == "E") {
        $(this).removeClass("btn-outline-primary").addClass("btn-danger");

        mensagem.removeClass().addClass("alert alert-danger").text("ERROU!!!!");
    } else {
        $(this).removeClass("btn-outline-primary").addClass("btn-success");

        mensagem.removeClass().addClass("alert alert-success").text("ACERTOU!!!!");

        $(".opcao").each(function() {
            if ($(this).data("resultado") === "E") {
                $(this).removeClass("btn-outline-primary").addClass("btn-danger");
            }
        });
    }

    let piscar = setInterval(function() {
        mensagem.fadeOut(300).fadeIn(300);
    }, 600);


    setTimeout(function() {
        clearInterval(piscar);
        mensagem.stop(true, true).fadeIn(300); 
    }, 3000);



});