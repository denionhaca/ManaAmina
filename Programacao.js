/* =========================================================
   CONFIGURAÇÃO PRINCIPAL
========================================================= */

const DATA_NASCIMENTO = new Date(
    2002,
    8,
    1,
    0,
    0,
    0
);


/* =========================================================
   FUNÇÃO UNIVERSAL PARA CLIQUE/TOQUE (CORREÇÃO MOBILE)
========================================================= */

function adicionarEventoUniversal(elemento, funcao) {
    if (!elemento) return;

    // Remove eventos antigos para evitar duplicação
    elemento.removeEventListener('click', funcao);
    elemento.removeEventListener('touchend', funcao);

    // Adiciona suporte a clique (desktop)
    elemento.addEventListener('click', funcao);

    // Adiciona suporte a toque (mobile) com prevenção de duplo clique
    elemento.addEventListener('touchend', function (e) {
        e.preventDefault();
        funcao(e);
    });
}


/* =========================================================
   ELEMENTOS
========================================================= */

const musica =
    document.getElementById("musica");

const telaInicio =
    document.getElementById("telaInicio");

const cinema =
    document.getElementById("cinema");

const galaxia =
    document.getElementById("galaxia");

const vida =
    document.getElementById("vida");

const sitePrincipal =
    document.getElementById("sitePrincipal");

const btnIniciar =
    document.getElementById("btnIniciar");

const numeroCountdown =
    document.getElementById("numeroCountdown");

const tempoGalaxia =
    document.getElementById("tempoGalaxia");

const btnPular =
    document.getElementById("btnPular");

const btnEntrar =
    document.getElementById("btnEntrar");

const envelope =
    document.getElementById("envelope");

const playerMusica =
    document.getElementById("playerMusica");

const iconeMusica =
    document.getElementById("iconeMusica");


/* =========================================================
   ESTADO
========================================================= */

let musicaTocando = false;

let intervaloCountdown = null;

let intervaloGalaxia = null;

let intervaloVida = null;

let intervaloSlides = null;

let slideAtual = 0;

let intervaloHistoria = null;

let historiaAtual = 0;

let intervaloPetalas = null;


/* =========================================================
   FUNÇÃO AUXILIAR
========================================================= */

function esperar(ms) {

    return new Promise(
        resolve => setTimeout(resolve, ms)
    );

}


/* =========================================================
   TELA INICIAL
========================================================= */

if (btnIniciar) {
    adicionarEventoUniversal(btnIniciar, iniciarExperiencia);
}


async function iniciarExperiencia() {

    if (btnIniciar) {
        btnIniciar.disabled = true;
    }

    if (musica) {

        try {

            await musica.play();

            musicaTocando = true;

            atualizarPlayer();

        } catch (erro) {

            console.log(
                "Não foi possível iniciar o áudio:",
                erro
            );

        }

    }

    if (telaInicio) {

        telaInicio.classList.add("oculta");

    }

    await esperar(1000);

    if (telaInicio) {

        telaInicio.style.display = "none";

    }

    iniciarCountdown();

}


/* =========================================================
   COUNTDOWN CINEMATOGRÁFICO
========================================================= */

function iniciarCountdown() {

    if (!cinema) {
        return;
    }

    cinema.classList.add("ativa");

    let numero = 10;

    if (numeroCountdown) {

        numeroCountdown.textContent = numero;

    }

    clearInterval(
        intervaloCountdown
    );

    intervaloCountdown =
        setInterval(() => {

            numero--;

            if (numeroCountdown) {

                numeroCountdown.textContent =
                    numero;

            }

            if (numero <= 0) {

                clearInterval(
                    intervaloCountdown
                );

                iniciarGalaxia();

            }

        }, 1000);

}


/* =========================================================
   GALÁXIA
========================================================= */

function iniciarGalaxia() {

    if (cinema) {

        cinema.classList.remove("ativa");

    }

    if (galaxia) {

        galaxia.classList.add("ativa");

    }

    let tempo = 18;

    if (tempoGalaxia) {

        tempoGalaxia.textContent =
            tempo;

    }

    clearInterval(
        intervaloGalaxia
    );

    intervaloGalaxia =
        setInterval(() => {

            tempo--;

            if (tempoGalaxia) {

                tempoGalaxia.textContent =
                    tempo;

            }

            if (tempo <= 0) {

                clearInterval(
                    intervaloGalaxia
                );

                iniciarRelogioVida();

            }

        }, 1000);

}


/* =========================================================
   PULAR INTRODUÇÃO
========================================================= */

if (btnPular) {
    adicionarEventoUniversal(btnPular, function () {
        clearInterval(intervaloGalaxia);
        iniciarRelogioVida();
    });
}


/* =========================================================
   RELÓGIO DA VIDA
========================================================= */

function iniciarRelogioVida() {

    if (galaxia) {

        galaxia.classList.remove("ativa");

    }

    if (vida) {

        vida.classList.add("ativa");

    }

    atualizarIdade();

    clearInterval(
        intervaloVida
    );

    intervaloVida =
        setInterval(
            atualizarIdade,
            1000
        );

    setTimeout(() => {

        if (btnEntrar) {

            btnEntrar.classList.add(
                "mostrar"
            );

        }

    }, 3000);

}


/* =========================================================
   ATUALIZAR IDADE
========================================================= */

function atualizarIdade() {

    const agora = new Date();

    let anos =
        agora.getFullYear()
        -
        DATA_NASCIMENTO.getFullYear();

    let meses =
        agora.getMonth()
        -
        DATA_NASCIMENTO.getMonth();

    let dias =
        agora.getDate()
        -
        DATA_NASCIMENTO.getDate();

    let horas =
        agora.getHours()
        -
        DATA_NASCIMENTO.getHours();

    let minutos =
        agora.getMinutes()
        -
        DATA_NASCIMENTO.getMinutes();

    let segundos =
        agora.getSeconds()
        -
        DATA_NASCIMENTO.getSeconds();

    if (segundos < 0) {

        segundos += 60;

        minutos--;

    }

    if (minutos < 0) {

        minutos += 60;

        horas--;

    }

    if (horas < 0) {

        horas += 24;

        dias--;

    }

    if (dias < 0) {

        const ultimoDiaMesAnterior =
            new Date(
                agora.getFullYear(),
                agora.getMonth(),
                0
            ).getDate();

        dias +=
            ultimoDiaMesAnterior;

        meses--;

    }

    if (meses < 0) {

        meses += 12;

        anos--;

    }

    const elementoAnos =
        document.getElementById("anos");

    const elementoMeses =
        document.getElementById("meses");

    const elementoDias =
        document.getElementById("dias");

    const elementoHoras =
        document.getElementById("horas");

    const elementoMinutos =
        document.getElementById("minutos");

    const elementoSegundos =
        document.getElementById("segundos");

    if (elementoAnos) {

        elementoAnos.textContent =
            formatarNumero(anos);

    }

    if (elementoMeses) {

        elementoMeses.textContent =
            formatarNumero(meses);

    }

    if (elementoDias) {

        elementoDias.textContent =
            formatarNumero(dias);

    }

    if (elementoHoras) {

        elementoHoras.textContent =
            formatarNumero(horas);

    }

    if (elementoMinutos) {

        elementoMinutos.textContent =
            formatarNumero(minutos);

    }

    if (elementoSegundos) {

        elementoSegundos.textContent =
            formatarNumero(segundos);

    }

}


/* =========================================================
   FORMATAR NÚMERO
========================================================= */

function formatarNumero(numero) {

    return String(numero)
        .padStart(2, "0");

}


/* =========================================================
   ENTRAR NO SITE
========================================================= */

if (btnEntrar) {
    adicionarEventoUniversal(btnEntrar, entrarNoSite);
}


function entrarNoSite() {

    clearInterval(
        intervaloVida
    );

    if (vida) {

        vida.classList.remove("ativa");

    }

    if (sitePrincipal) {

        sitePrincipal.classList.add(
            "visivel"
        );

    }

    verificarVisita();

    iniciarCarrossel();

    iniciarHistoria();

    iniciarChuvaPetalas();

    window.scrollTo({
        top: 0,
        behavior: "instant"
    });

}


/* =========================================================
   CONTROLE DE VISITAS
========================================================= */

function verificarVisita() {

    const jaVisitou =
        localStorage.getItem(
            "aniversario_irma_visita"
        );

    const titulo =
        document.getElementById(
            "tituloVisita"
        );

    if (!titulo) {
        return;
    }

    if (jaVisitou) {

        titulo.textContent =
            "Que bom te ver de volta aqui, nossa querida irmã! ❤️";

    } else {

        titulo.textContent =
            "Seja muito bem-vinda à sua surpresa! 🎉";

        localStorage.setItem(
            "aniversario_irma_visita",
            "true"
        );

    }

}


/* =========================================================
   CARROSSEL DO ÁLBUM
========================================================= */

const slidesAlbum =
    document.querySelectorAll(
        ".slide-album"
    );

const indicadoresAlbum =
    document.querySelectorAll(
        ".indicador"
    );

const botaoAnterior =
    document.getElementById(
        "btnAnterior"
    );

const botaoProximo =
    document.getElementById(
        "btnProximo"
    );


/* =========================================================
   MOSTRAR SLIDE
========================================================= */

function mostrarSlide(indice) {

    if (slidesAlbum.length === 0) {
        return;
    }

    slideAtual =
        (
            indice +
            slidesAlbum.length
        )
        %
        slidesAlbum.length;

    slidesAlbum.forEach(
        slide => {

            slide.classList.remove(
                "ativo"
            );

        }
    );

    indicadoresAlbum.forEach(
        indicador => {

            indicador.classList.remove(
                "ativo"
            );

        }
    );

    slidesAlbum[
        slideAtual
    ].classList.add(
        "ativo"
    );

    if (
        indicadoresAlbum[
        slideAtual
        ]
    ) {

        indicadoresAlbum[
            slideAtual
        ].classList.add(
            "ativo"
        );

    }

}


/* =========================================================
   PRÓXIMO SLIDE
========================================================= */

function proximoSlide() {

    mostrarSlide(
        slideAtual + 1
    );

    reiniciarCarrossel();

}


/* =========================================================
   SLIDE ANTERIOR
========================================================= */

function slideAnterior() {

    mostrarSlide(
        slideAtual - 1
    );

    reiniciarCarrossel();

}


/* =========================================================
   CARROSSEL AUTOMÁTICO
========================================================= */

function iniciarCarrossel() {

    clearInterval(
        intervaloSlides
    );

    if (slidesAlbum.length <= 1) {
        return;
    }

    intervaloSlides =
        setInterval(
            () => {

                mostrarSlide(
                    slideAtual + 1
                );

            },
            5000
        );

}


/* =========================================================
   REINICIAR CARROSSEL
========================================================= */

function reiniciarCarrossel() {

    iniciarCarrossel();

}


/* =========================================================
   BOTÃO ANTERIOR
========================================================= */

if (botaoAnterior) {
    adicionarEventoUniversal(botaoAnterior, slideAnterior);
}


/* =========================================================
   BOTÃO PRÓXIMO
========================================================= */

if (botaoProximo) {
    adicionarEventoUniversal(botaoProximo, proximoSlide);
}


/* =========================================================
   INDICADORES
========================================================= */

indicadoresAlbum.forEach(
    (indicador, indice) => {
        adicionarEventoUniversal(indicador, function () {
            mostrarSlide(indice);
            reiniciarCarrossel();
        });
    }
);


/* =========================================================
   PRIMEIRO SLIDE
========================================================= */

mostrarSlide(0);


/* =========================================================
   ENVELOPE
========================================================= */

if (envelope) {
    adicionarEventoUniversal(envelope, function () {
        envelope.classList.toggle("aberto");
    });
}


/* =========================================================
   CÁPSULAS DE AMOR
========================================================= */

const modalCapsula =
    document.getElementById(
        "modalCapsula"
    );

const mensagemCapsula =
    document.getElementById(
        "mensagemCapsula"
    );

const fecharModal =
    document.getElementById(
        "fecharModal"
    );

const capsulas =
    document.querySelectorAll(
        ".capsula"
    );

capsulas.forEach(
    capsula => {
        adicionarEventoUniversal(capsula, function () {
            if (
                mensagemCapsula &&
                modalCapsula
            ) {
                const mensagem =
                    this.dataset.mensagem;

                mensagemCapsula.textContent =
                    mensagem;

                modalCapsula.classList.add(
                    "aberto"
                );
            }
        });
    }
);


/* =========================================================
   FECHAR CÁPSULA
========================================================= */

function fecharCapsula() {

    if (modalCapsula) {

        modalCapsula.classList.remove(
            "aberto"
        );

    }

}

if (fecharModal) {
    adicionarEventoUniversal(fecharModal, fecharCapsula);
}

if (modalCapsula) {
    adicionarEventoUniversal(modalCapsula, function (evento) {
        if (evento.target === modalCapsula) {
            fecharCapsula();
        }
    });
}


/* =========================================================
   PORTAL SECRETO
========================================================= */

const senhaPortal =
    document.getElementById(
        "senhaPortal"
    );

const btnPortal =
    document.getElementById(
        "btnPortal"
    );

const erroSenha =
    document.getElementById(
        "erroSenha"
    );

const portalTelaCheia =
    document.getElementById(
        "portalTelaCheia"
    );

const fecharPortal =
    document.getElementById(
        "fecharPortal"
    );

if (btnPortal) {
    adicionarEventoUniversal(btnPortal, verificarSenha);
}

if (senhaPortal) {
    senhaPortal.addEventListener(
        "keydown",
        evento => {
            if (
                evento.key ===
                "Enter"
            ) {
                verificarSenha();
            }
        }
    );
}

function verificarSenha() {

    if (!senhaPortal) {
        return;
    }

    const senha =
        senhaPortal.value.trim();

    if (senha === "01/09") {

        if (erroSenha) {

            erroSenha.classList.remove(
                "visivel"
            );

        }

        if (portalTelaCheia) {

            portalTelaCheia.classList.add(
                "aberto"
            );

        }

        document.body.style.overflow =
            "hidden";

    } else {

        if (erroSenha) {

            erroSenha.classList.add(
                "visivel"
            );

        }

        senhaPortal.focus();

        if (
            senhaPortal.animate
        ) {

            senhaPortal.animate(
                [
                    {
                        transform:
                            "translateX(0)"
                    },
                    {
                        transform:
                            "translateX(-8px)"
                    },
                    {
                        transform:
                            "translateX(8px)"
                    },
                    {
                        transform:
                            "translateX(0)"
                    }
                ],
                {
                    duration: 350
                }
            );

        }

    }

}


/* =========================================================
   FECHAR PORTAL
========================================================= */

if (fecharPortal) {
    adicionarEventoUniversal(fecharPortal, function () {
        if (portalTelaCheia) {
            portalTelaCheia.classList.remove("aberto");
        }
        document.body.style.overflow = "";
    });
}


/* =========================================================
   PLAYER DE MÚSICA
========================================================= */

if (playerMusica) {
    adicionarEventoUniversal(playerMusica, alternarMusica);
}

function alternarMusica() {

    if (!musica) {
        return;
    }

    if (musica.paused) {

        musica.play()
            .then(() => {

                musicaTocando = true;

                atualizarPlayer();

            })
            .catch(erro => {

                console.log(
                    "Não foi possível tocar a música:",
                    erro
                );

            });

    } else {

        musica.pause();

        musicaTocando = false;

        atualizarPlayer();

    }

}


/* =========================================================
   ATUALIZAR PLAYER
========================================================= */

function atualizarPlayer() {

    if (
        !iconeMusica ||
        !playerMusica
    ) {
        return;
    }

    if (musicaTocando) {

        iconeMusica.textContent =
            "♫";

        playerMusica.classList.remove(
            "pausado"
        );

    } else {

        iconeMusica.textContent =
            "▶";

        playerMusica.classList.add(
            "pausado"
        );

    }

}


/* =========================================================
   CHUVA DE PÉTALAS
========================================================= */

function criarPetala() {

    const recipiente =
        document.getElementById(
            "petalas"
        );

    if (!recipiente) {
        return;
    }

    const petala =
        document.createElement(
            "span"
        );

    petala.className =
        "petala";

    petala.textContent = Math.random() > 0.5
        ? "♡"
        : "✦";

    const tamanho =
        Math.random() * 12 + 8;

    const esquerda =
        Math.random() * 100;

    const duracao =
        Math.random() * 8 + 7;

    const vento =
        Math.random() * 200 - 100;

    petala.style.left =
        `${esquerda}%`;

    petala.style.fontSize =
        `${tamanho}px`;

    petala.style.animationDuration = `${duracao}s`;

    petala.style.setProperty(
        "--vento",
        `${vento}px`
    );

    recipiente.appendChild(
        petala
    );

    setTimeout(() => {
        petala.remove();
    }, duracao * 1000);

}


/* =========================================================
   INICIAR CHUVA DE PÉTALAS
========================================================= */

function iniciarChuvaPetalas() {

    if (intervaloPetalas) {
        return;
    }

    criarPetala();

    intervaloPetalas =
        setInterval(
            criarPetala,
            650
        );

}


/* =========================================================
   A TUA HISTÓRIA
========================================================= */

const historias =
    document.querySelectorAll(
        ".historia-item"
    );

const pontosHistoria =
    document.querySelectorAll(
        ".historia-ponto"
    );

const historiaAnterior =
    document.getElementById(
        "historiaAnterior"
    );

const historiaProximo =
    document.getElementById(
        "historiaProximo"
    );


/* =========================================================
   MOSTRAR CAPÍTULO
========================================================= */

function mostrarHistoria(indice) {

    if (historias.length === 0) {
        return;
    }

    historiaAtual =
        (
            indice +
            historias.length
        )
        %
        historias.length;

    historias.forEach(
        historia => {
            historia.classList.remove(
                "ativo"
            );
        }
    );

    pontosHistoria.forEach(
        ponto => {
            ponto.classList.remove(
                "ativo"
            );
        }
    );

    historias[
        historiaAtual
    ].classList.add(
        "ativo"
    );

    if (
        pontosHistoria[
        historiaAtual
        ]
    ) {
        pontosHistoria[
            historiaAtual
        ].classList.add(
            "ativo"
        );
    }

}


/* =========================================================
   PRÓXIMO CAPÍTULO
========================================================= */

function proximaHistoria() {

    mostrarHistoria(
        historiaAtual + 1
    );

    reiniciarHistoria();

}


/* =========================================================
   CAPÍTULO ANTERIOR
========================================================= */

function historiaAnteriorFunc() {

    mostrarHistoria(
        historiaAtual - 1
    );

    reiniciarHistoria();

}


/* =========================================================
   CARROSSEL AUTOMÁTICO DA HISTÓRIA
========================================================= */

function iniciarHistoria() {

    clearInterval(
        intervaloHistoria
    );

    if (historias.length <= 1) {
        return;
    }

    intervaloHistoria =
        setInterval(
            () => {
                mostrarHistoria(
                    historiaAtual + 1
                );
            },
            6000
        );

}


/* =========================================================
   REINICIAR HISTÓRIA
========================================================= */

function reiniciarHistoria() {

    iniciarHistoria();

}


/* =========================================================
   BOTÃO HISTÓRIA ANTERIOR
========================================================= */

if (historiaAnterior) {
    adicionarEventoUniversal(historiaAnterior, historiaAnteriorFunc);
}


/* =========================================================
   BOTÃO HISTÓRIA PRÓXIMO
========================================================= */

if (historiaProximo) {
    adicionarEventoUniversal(historiaProximo, proximaHistoria);
}


/* =========================================================
   INDICADORES DA HISTÓRIA
========================================================= */

pontosHistoria.forEach(
    (ponto, indice) => {
        adicionarEventoUniversal(ponto, function () {
            mostrarHistoria(indice);
            reiniciarHistoria();
        });
    }
);


/* =========================================================
   PRIMEIRO CAPÍTULO
========================================================= */

mostrarHistoria(0);


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    evento => {
        if (evento.key === "Escape") {
            fecharCapsula();
            if (portalTelaCheia) {
                portalTelaCheia.classList.remove("aberto");
            }
            document.body.style.overflow = "";
        }
    }
);


/* =========================================================
   CORREÇÃO ADICIONAL: GARANTE QUE TODOS OS BOTÕES
   COM ONCLICK NO HTML TAMBÉM FUNCIONEM
========================================================= */

document.addEventListener('DOMContentLoaded', function () {
    // Para qualquer elemento com onclick no HTML
    document.querySelectorAll('[onclick]').forEach(function (el) {
        // Se não tiver a correção ainda, adiciona
        if (!el._corrigido) {
            el._corrigido = true;
            const funcaoOriginal = el.getAttribute('onclick');
            adicionarEventoUniversal(el, function (e) {
                if (funcaoOriginal) {
                    // Tenta executar a função original
                    try {
                        new Function('event', funcaoOriginal)(e);
                    } catch (erro) {
                        console.log('Erro ao executar onclick:', erro);
                    }
                }
            });
        }
    });

    console.log('✅ Correções mobile aplicadas com sucesso!');
});