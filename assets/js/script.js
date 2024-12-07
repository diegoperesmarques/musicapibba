function recarregar() {
    localStorage.clear();

    document.cookie.split(';').forEach(function(c) {
        document.cookie = c.replace(/^ +/, '').replace(/(.+?)=(.+)$/, '$1=;expires=' + new Date(0).toUTCString() + ';path=/');
    });

    location.reload(true);
}

$(document).on("click", "#btn-atualizar", recarregar);

$("#btn-exercicios").click(function() {
    $("#div-inicial").css({ display: "block", top: "0px", opacity: '1'})
    .animate({ top: "100px", opacity: '0', display: "none"}, 500, function() {
        $("#div-inicial").hide();
        $("#div-exercicios").css({display: "block", top: "-100px", opacity: '0'})
        .animate({ top: "0px", opacity: '1'}, 200, function() {
            containerPerguntaRespostas();
        });
    });
});



$(document).on("click", ".btn-inicio", function() {
    $("#div-exercicios").css({ display: "block", top: "0px", opacity: '1'})
    .animate({ top: "100px", opacity: '0', display: "none"}, 500, function() {
        recarregar();
    });
});


$(document).on("click", ".btn-proximo", function() {
    containerPerguntaRespostas();
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



function containerPerguntaRespostas() {
    $("#div-exercicios").empty();

    let posicao_pergunta = 0;

    if(localStorage.getItem('posicao_pergunta')) {
        posicao_pergunta = JSON.parse(localStorage.getItem('posicao_pergunta'));
        posicao_pergunta++;
    }

    let respostas_recebidas = '';
    let texto_respostas = '';
    let texto_pergunta = '';
    let container = `<button class="btn btn-secondary col-5 btn-inicio">Início</button>`;

    if(posicao_pergunta == 0) {

        localStorage.setItem('posicao_pergunta', JSON.stringify(posicao_pergunta));

        respostas_recebidas = perguntas[0];
    } else {
        localStorage.setItem('posicao_pergunta', JSON.stringify(posicao_pergunta));
        respostas_recebidas = perguntas[posicao_pergunta];
    }

    if(respostas_recebidas) {
        texto_pergunta = respostas_recebidas.pergunta;

        for (const [chave, valor] of Object.entries(respostas_recebidas.opcoes)) {
            texto_respostas += `<button class="btn btn-outline-primary pt-2 pb-2 opcao" 
            data-resultado="${valor.resposta ? 'C' : 'E'}">${valor.texto}</button>`;
    
          }
    
        container = `<div class="quiz-container p-4 border rounded shadow-sm">
                    <h2 class="text-center mb-4">
                        ${texto_pergunta}
                    </h2>
    
                    <h3 id="txt-resultado" style="text-align: center;">&nbsp;</h3>
                    <div class="d-grid gap-3">
                        ${texto_respostas}
                    </div>
    
                    <div class="d-flex justify-content-between mt-3">
                        <button class="btn btn-secondary ms-auto d-block col-5 btn-inicio">Início</button>
                        <span class="col-2">&nbsp;</span>
                        <button class="btn btn-primary ms-auto d-block col-5 btn-proximo">Próximo</button>
                    </div>
    
            </div>`;
    }



    $("#div-exercicios").append(container);
    
}

