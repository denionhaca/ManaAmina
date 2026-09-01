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

    btnIniciar.addEventListener(
        "click",
        iniciarExperiencia
    );

}


async function iniciarExperiencia() {

    if (btnIniciar) {
        btnIniciar.disabled = true;
    }


    /*
        O áudio começa dentro do clique,
        evitando problemas de autoplay.
    */

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

    btnPular.addEventListener(
        "click",
        () => {

            clearInterval(
                intervaloGalaxia
            );

            iniciarRelogioVida();

        }
    );

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

    btnEntrar.addEventListener(
        "click",
        entrarNoSite
    );

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


    /*
        O carrossel é iniciado somente
        quando o site principal aparece.
    */

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
=========================================================

   IMPORTANTE:
   As imagens continuam SOMENTE no HTML.

   O JavaScript apenas troca:
   .slide-album
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

    botaoAnterior.addEventListener(
        "click",
        slideAnterior
    );

}


/* =========================================================
   BOTÃO PRÓXIMO
========================================================= */

if (botaoProximo) {

    botaoProximo.addEventListener(
        "click",
        proximoSlide
    );

}


/* =========================================================
   INDICADORES
========================================================= */

indicadoresAlbum.forEach(
    (indicador, indice) => {

        indicador.addEventListener(
            "click",
            () => {

                mostrarSlide(
                    indice
                );


                reiniciarCarrossel();

            }
        );

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

    envelope.addEventListener(
        "click",
        () => {

            envelope.classList.toggle(
                "aberto"
            );

        }
    );

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

        capsula.addEventListener(
            "click",
            () => {

                if (
                    mensagemCapsula &&
                    modalCapsula
                ) {

                    const mensagem =
                        capsula.dataset.mensagem;


                    mensagemCapsula.textContent =
                        mensagem;


                    modalCapsula.classList.add(
                        "aberto"
                    );

                }

            }
        );

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

    fecharModal.addEventListener(
        "click",
        fecharCapsula
    );

}


if (modalCapsula) {

    modalCapsula.addEventListener(
        "click",
        evento => {

            if (
                evento.target ===
                modalCapsula
            ) {

                fecharCapsula();

            }

        }
    );

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

    btnPortal.addEventListener(
        "click",
        verificarSenha
    );

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

    fecharPortal.addEventListener(
        "click",
        () => {

            if (portalTelaCheia) {

                portalTelaCheia.classList.remove(
                    "aberto"
                );

            }


            document.body.style.overflow =
                "";

        }
    );

}


/* =========================================================
   PLAYER DE MÚSICA
========================================================= */

if (playerMusica) {

    playerMusica.addEventListener(
        "click",
        alternarMusica
    );

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


    petala.style.animationDuration =
        `${duracao}s`;


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
=========================================================

   As imagens dos capítulos continuam
   exclusivamente no HTML.

   O JavaScript apenas alterna
   os elementos .historia-item.
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

    historiaAnterior.addEventListener(
        "click",
        historiaAnteriorFunc
    );

}


/* =========================================================
   BOTÃO HISTÓRIA PRÓXIMO
========================================================= */

if (historiaProximo) {

    historiaProximo.addEventListener(
        "click",
        proximaHistoria
    );

}


/* =========================================================
   INDICADORES DA HISTÓRIA
========================================================= */

pontosHistoria.forEach(
    (ponto, indice) => {

        ponto.addEventListener(
            "click",
            () => {

                mostrarHistoria(
                    indice
                );


                reiniciarHistoria();

            }
        );

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

        if (
            evento.key ===
            "Escape"
        ) {

            fecharCapsula();


            if (portalTelaCheia) {

                portalTelaCheia.classList.remove(
                    "aberto"
                );

            }


            document.body.style.overflow =
                "";

        }

    }
);

/* =========================================================
   CORREÇÃO MOBILE - TOQUE EM TODOS OS BOTÕES
   ========================================================= */

document.addEventListener('DOMContentLoaded', function () {

    console.log('🔧 Aplicando correções mobile...');

    // =========================================================
    // FUNÇÃO QUE ADICIONA SUPORTE A TOQUE
    // =========================================================
    function corrigirCliqueMobile(seletor) {
        const elementos = document.querySelectorAll(seletor);
        if (elementos.length === 0) return;

        elementos.forEach(function (el) {
            // Remove listeners antigos para evitar duplicação
            el.removeEventListener('touchend', el._touchHandler);

            // Cria o handler de toque
            el._touchHandler = function (e) {
                e.preventDefault();

                // Dispara um clique simulado
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                this.dispatchEvent(clickEvent);
            };

            // Adiciona o evento de toque
            el.addEventListener('touchend', el._touchHandler);

            // Feedback visual ao tocar
            el.addEventListener('touchstart', function () {
                this.style.transition = 'transform 0.1s ease';
                this.style.transform = 'scale(0.95)';
                this.style.opacity = '0.8';
            });

            el.addEventListener('touchend', function () {
                this.style.transform = '';
                this.style.opacity = '';
            });

            // Garante que o elemento seja clicável
            el.style.cursor = 'pointer';
            el.style.webkitTapHighlightColor = 'transparent';
            el.style.touchAction = 'manipulation';
        });
    }

    // =========================================================
    // APLICA A TODOS OS ELEMENTOS CLICÁVEIS
    // =========================================================

    // Botões principais
    corrigirCliqueMobile('.btn-principal');
    corrigirCliqueMobile('.btn-entrar');
    corrigirCliqueMobile('.btn-hero');
    corrigirCliqueMobile('.btn-pular');

    // Carrossel
    corrigirCliqueMobile('.seta');
    corrigirCliqueMobile('.indicador');

    // Cápsulas
    corrigirCliqueMobile('.capsula');
    corrigirCliqueMobile('.garrafa');

    // Envelope
    corrigirCliqueMobile('.envelope');

    // Menu
    corrigirCliqueMobile('.menu-links a');

    // História
    corrigirCliqueMobile('.historia-controles button');
    corrigirCliqueMobile('.historia-ponto');

    // Portal
    corrigirCliqueMobile('#btnPortal');
    corrigirCliqueMobile('#fecharPortal');
    corrigirCliqueMobile('.portal-card button');
    corrigirCliqueMobile('.senha-area button');

    // Modal
    corrigirCliqueMobile('#fecharModal');
    corrigirCliqueMobile('.modal-conteudo button');

    // Player
    corrigirCliqueMobile('#playerMusica');

    // Qualquer elemento com onclick
    corrigirCliqueMobile('[onclick]');

    // =========================================================
    // CORREÇÕES ESPECÍFICAS
    // =========================================================

    // 1. ENVELOPE - toggle com toque
    if (envelope) {
        envelope.addEventListener('touchend', function (e) {
            e.preventDefault();
            this.classList.toggle('aberto');
        });
    }

    // 2. SETAS do carrossel - garantem que funcionem
    if (botaoAnterior) {
        botaoAnterior.addEventListener('touchend', function (e) {
            e.preventDefault();
            slideAnterior();
        });
    }

    if (botaoProximo) {
        botaoProximo.addEventListener('touchend', function (e) {
            e.preventDefault();
            proximoSlide();
        });
    }

    // 3. INDICADORES do carrossel
    indicadoresAlbum.forEach(function (indicador, indice) {
        indicador.addEventListener('touchend', function (e) {
            e.preventDefault();
            mostrarSlide(indice);
            reiniciarCarrossel();
        });
    });

    // 4. BOTÃO INICIAR (tela inicial)
    if (btnIniciar) {
        btnIniciar.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof iniciarExperiencia === 'function') {
                iniciarExperiencia();
            }
        });
    }

    // 5. BOTÃO ENTRAR (relógio da vida)
    if (btnEntrar) {
        btnEntrar.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof entrarNoSite === 'function') {
                entrarNoSite();
            }
        });
    }

    // 6. BOTÃO PULAR (galáxia)
    if (btnPular) {
        btnPular.addEventListener('touchend', function (e) {
            e.preventDefault();
            clearInterval(intervaloGalaxia);
            if (typeof iniciarRelogioVida === 'function') {
                iniciarRelogioVida();
            }
        });
    }

    // 7. BOTÃO DO PORTAL
    if (btnPortal) {
        btnPortal.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof verificarSenha === 'function') {
                verificarSenha();
            }
        });
    }

    // 8. FECHAR MODAL
    if (fecharModal) {
        fecharModal.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof fecharCapsula === 'function') {
                fecharCapsula();
            }
        });
    }

    // 9. FECHAR PORTAL
    if (fecharPortal) {
        fecharPortal.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (portalTelaCheia) {
                portalTelaCheia.classList.remove('aberto');
            }
            document.body.style.overflow = '';
        });
    }

    // 10. PLAYER DE MÚSICA
    if (playerMusica) {
        playerMusica.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof alternarMusica === 'function') {
                alternarMusica();
            }
        });
    }

    // 11. HISTÓRIA - botões
    if (historiaAnterior) {
        historiaAnterior.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof historiaAnteriorFunc === 'function') {
                historiaAnteriorFunc();
            }
        });
    }

    if (historiaProximo) {
        historiaProximo.addEventListener('touchend', function (e) {
            e.preventDefault();
            if (typeof proximaHistoria === 'function') {
                proximaHistoria();
            }
        });
    }

    // 12. HISTÓRIA - pontos
    pontosHistoria.forEach(function (ponto, indice) {
        ponto.addEventListener('touchend', function (e) {
            e.preventDefault();
            mostrarHistoria(indice);
            reiniciarHistoria();
        });
    });

    // 13. CÁPSULAS - toque
    capsulas.forEach(function (capsula) {
        capsula.addEventListener('touchend', function (e) {
            e.preventDefault();
            // Dispara o clique original
            const clickEvent = new MouseEvent('click', {
                view: window,
                bubbles: true,
                cancelable: true
            });
            this.dispatchEvent(clickEvent);
        });
    });

    // 14. PREVENÇÃO DE ZOOM ACIDENTAL
    document.addEventListener('dblclick', function (e) {
        e.preventDefault();
    }, { passive: false });

    console.log('✅ Correções mobile aplicadas com sucesso!');
});