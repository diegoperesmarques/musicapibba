$(function() {
    limpandoDadosLocais();

    localStorage.setItem("qtd_total_perguntas", JSON.stringify(perguntas.length))

    initEvent()
});

function initEvent() {
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
    
    $(document).on("click", ".btn-proximo", containerPerguntaRespostas);
    
    $(document).on("click", ".opcao", clickValidacaoResposta);
}


function clickValidacaoResposta() {
    let resultado = $(this).data("resultado");
    let mensagem = $("#txt-resultado");
    let posicao = $(this).data("posicao");
    let respostas_jogador = null;
    let resposta_escolhida = [];

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


    if(localStorage.getItem("respostas_jogador")) {
        let is_respondido = false;
        respostas_jogador = JSON.parse(localStorage.getItem("respostas_jogador"));

        respostas_jogador.forEach((valor) => {
            if(posicao == valor.resposta) {
                is_respondido = true;
            }
        });

        if(!is_respondido) {
            respostas_jogador.push({
                resposta: posicao, 
                resultado: resultado == "E" ? false : true
            });
        }

    } else {
        respostas_jogador = [{
            resposta: posicao, 
            resultado: resultado == "E" ? false : true
        }];
    }


    localStorage.removeItem("respostas_jogador");

    localStorage.setItem("respostas_jogador", JSON.stringify(respostas_jogador));

    let piscar = setInterval(function() {
        mensagem.fadeOut(300).fadeIn(300);
    }, 600);


    setTimeout(function() {
        clearInterval(piscar);
        mensagem.stop(true, true).fadeIn(300); 
    }, 3000);


}


function limpandoDadosLocais() {
    localStorage.clear();

    document.cookie.split(';').forEach(function(c) {
        document.cookie = c.replace(/^ +/, '').replace(/(.+?)=(.+)$/, '$1=;expires=' + new Date(0).toUTCString() + ';path=/');
    });
}


function recarregar() {
    limpandoDadosLocais();

    location.reload(true);
}


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
    let quantidade_perguntas = perguntas.length;


    if(posicao_pergunta == quantidade_perguntas) {
        exibeResultado();
        return;
    }

    localStorage.setItem('posicao_pergunta', JSON.stringify(posicao_pergunta));
    respostas_recebidas = perguntas[posicao_pergunta];


    if(respostas_recebidas) {
        texto_pergunta = respostas_recebidas.pergunta;

        for (const [chave, valor] of Object.entries(respostas_recebidas.opcoes)) {
            texto_respostas += `<button class="btn btn-outline-primary pt-2 pb-2 opcao" 
            data-resultado="${valor.resposta ? 'C' : 'E'}" data-posicao="${posicao_pergunta}">
            ${valor.texto}</button>`;
    
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

function exibeResultado() {
    let respostas_jogador = JSON.parse(localStorage.getItem("respostas_jogador"));
    let quantidade_acertos = 0;
    let quantidade_erros = 0;
    let qtd_total_perguntas = perguntas.length;


    console.log('porcentagem de acertos')

    respostas_jogador.forEach((valor) => {
        if(valor.resultado) {
            quantidade_acertos++;
        } else {
            quantidade_erros++;
        }
    });

    let porcentagem_acertos = ((quantidade_acertos / qtd_total_perguntas) * 100).toFixed(1);


    $("#div-exercicios").append(`
        <div class="container py-5">
            <div class="row justify-content-center">
                <div class="col-md-8">
                    <div class="text-center mb-5 animate__animated animate__fadeIn">
                        <h1 class="display-4 mb-3">Parabéns! 🎉</h1>
                        <p class="lead text-muted">Você completou o quiz!</p>
                    </div>
                    
                    <div class="result-card bg-white p-4 mb-4 animate__animated animate__fadeInUp">
                        <div class="score-circle mb-4">
                            ${porcentagem_acertos}%
                        </div>
                        
                        <div class="row text-center mb-4">
                            <div class="col-6">
                                <h3 class="text-success">${quantidade_acertos}</h3>
                                <p class="text-muted">Acertos</p>
                            </div>
                            <div class="col-6">
                                <h3 class="text-danger">${quantidade_erros}</h3>
                                <p class="text-muted">Erros</p>
                            </div>
                        </div>

                        <div class="progress mb-4" style="height: 25px;">
                            <div class="progress-bar bg-success" role="progressbar" style="width: ${porcentagem_acertos}%" 
                                aria-valuenow="${porcentagem_acertos}" aria-valuemin="0" aria-valuemax="100">
                                ${porcentagem_acertos}%
                            </div>
                        </div>

                        <!-- 
                        <div class="list-group">
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>1. Qual é a capital do Brasil?</span>
                                <span class="badge bg-success rounded-pill">✓</span>
                            </div>
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>2. Quem pintou a Mona Lisa?</span>
                                <span class="badge bg-success rounded-pill">✓</span>
                            </div>
                            <div class="list-group-item list-group-item-action d-flex justify-content-between align-items-center">
                                <span>3. Qual é o maior planeta do sistema solar?</span>
                                <span class="badge bg-danger rounded-pill">✗</span>
                            </div> 
                        </div>
                    -->
                    </div>

                    <div class="text-center animate__animated animate__fadeInUp animate__delay-1s">
                        <button class="btn btn-primary btn-lg me-2 btn-inicio">Início</button>
                    </div>
                </div>
            </div>
        </div>`);



}

