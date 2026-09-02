
/* =========================================================
   CONFIGURAÇÃO PRINCIPAL
========================================================= */

const DATA_NASCIMENTO = new Date(
    2002,
    8,
    2,
    0,
    0,
    0
);


/* =========================================================
   ELEMENTOS PRINCIPAIS
========================================================= */

const musica = document.getElementById("musica");
const telaInicio = document.getElementById("telaInicio");
const cinema = document.getElementById("cinema");
const galaxia = document.getElementById("galaxia");
const vida = document.getElementById("vida");
const sitePrincipal = document.getElementById("sitePrincipal");

const btnIniciar = document.getElementById("btnIniciar");
const numeroCountdown = document.getElementById("numeroCountdown");
const tempoGalaxia = document.getElementById("tempoGalaxia");
const btnPular = document.getElementById("btnPular");
const btnEntrar = document.getElementById("btnEntrar");

const envelope = document.getElementById("envelope");

const playerMusica = document.getElementById("playerMusica");
const iconeMusica = document.getElementById("iconeMusica");


/* =========================================================
   ESTADOS
========================================================= */

let musicaTocando = false;

let intervaloCountdown = null;
let intervaloGalaxia = null;
let intervaloVida = null;

let intervaloMemorias = null;
let memoriaAtual = 0;

let intervaloHistoria = null;
let historiaAtual = 0;

let chuvaPetalasIniciada = false;


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

    if (!btnIniciar) {
        return;
    }

    btnIniciar.disabled = true;


    /* ---------------------------------------------------------
       TENTA INICIAR A MÚSICA
    --------------------------------------------------------- */

    if (musica) {

        try {

            await musica.play();

            musicaTocando = true;

            atualizarPlayer();

        } catch (erro) {

            console.log(
                "O áudio não pôde iniciar automaticamente.",
                erro
            );

        }

    }


    /* ---------------------------------------------------------
       ESCONDE A TELA INICIAL
    --------------------------------------------------------- */

    if (telaInicio) {

        telaInicio.classList.add("oculta");

        await esperar(1000);

        telaInicio.style.display = "none";

    }


    /* ---------------------------------------------------------
       COMEÇA O CINEMA
    --------------------------------------------------------- */

    iniciarCountdown();

}


/* =========================================================
   COUNTDOWN
========================================================= */

function iniciarCountdown() {

    if (!cinema || !numeroCountdown) {
        return;
    }


    cinema.classList.add("ativa");

    let numero = 10;

    numeroCountdown.textContent = numero;


    clearInterval(intervaloCountdown);


    intervaloCountdown = setInterval(() => {

        numero--;

        numeroCountdown.textContent = numero;


        if (numero <= 0) {

            clearInterval(intervaloCountdown);

            iniciarGalaxia();

        }

    }, 1000);

}


/* =========================================================
   GALÁXIA
========================================================= */

function iniciarGalaxia() {

    if (!galaxia) {
        return;
    }


    if (cinema) {
        cinema.classList.remove("ativa");
    }


    galaxia.classList.add("ativa");


    let tempo = 18;


    if (tempoGalaxia) {
        tempoGalaxia.textContent = tempo;
    }


    clearInterval(intervaloGalaxia);


    intervaloGalaxia = setInterval(() => {

        tempo--;


        if (tempoGalaxia) {
            tempoGalaxia.textContent = tempo;
        }


        if (tempo <= 0) {

            clearInterval(intervaloGalaxia);

            iniciarRelogioVida();

        }

    }, 1000);

}


/* =========================================================
   PULAR GALÁXIA
========================================================= */

if (btnPular) {

    btnPular.addEventListener(
        "click",
        () => {

            clearInterval(intervaloGalaxia);

            iniciarRelogioVida();

        }
    );

}


/* =========================================================
   RELÓGIO DA VIDA
========================================================= */

function iniciarRelogioVida() {

    if (!vida) {
        return;
    }


    if (galaxia) {
        galaxia.classList.remove("ativa");
    }


    vida.classList.add("ativa");


    atualizarIdade();


    clearInterval(intervaloVida);


    intervaloVida = setInterval(
        atualizarIdade,
        1000
    );


    setTimeout(() => {

        if (btnEntrar) {
            btnEntrar.classList.add("mostrar");
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


        dias += ultimoDiaMesAnterior;

        meses--;

    }


    if (meses < 0) {

        meses += 12;
        anos--;

    }


    const anosElemento =
        document.getElementById("anos");

    const mesesElemento =
        document.getElementById("meses");

    const diasElemento =
        document.getElementById("dias");

    const horasElemento =
        document.getElementById("horas");

    const minutosElemento =
        document.getElementById("minutos");

    const segundosElemento =
        document.getElementById("segundos");


    if (anosElemento)
        anosElemento.textContent =
            formatarNumero(anos);


    if (mesesElemento)
        mesesElemento.textContent =
            formatarNumero(meses);


    if (diasElemento)
        diasElemento.textContent =
            formatarNumero(dias);


    if (horasElemento)
        horasElemento.textContent =
            formatarNumero(horas);


    if (minutosElemento)
        minutosElemento.textContent =
            formatarNumero(minutos);


    if (segundosElemento)
        segundosElemento.textContent =
            formatarNumero(segundos);

}


/* =========================================================
   FORMATAR NÚMERO
========================================================= */

function formatarNumero(numero) {

    return String(numero).padStart(2, "0");

}


/* =========================================================
   ENTRAR NO SITE PRINCIPAL
========================================================= */

if (btnEntrar) {

    btnEntrar.addEventListener(
        "click",
        entrarNoSite
    );

}


function entrarNoSite() {

    clearInterval(intervaloVida);


    if (vida) {
        vida.classList.remove("ativa");
    }


    if (sitePrincipal) {

        sitePrincipal.classList.add("visivel");

    }


    verificarVisita();

    iniciarCarrossel();

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

    const titulo =
        document.getElementById("tituloVisita");


    if (!titulo) {
        return;
    }


    let jaVisitou = false;


    try {

        jaVisitou =
            localStorage.getItem(
                "aniversario_irma_visita"
            );

    } catch (erro) {

        console.log(
            "LocalStorage indisponível.",
            erro
        );

    }


    if (jaVisitou) {

        titulo.textContent =
            "Que bom te ver de volta aqui, nossa querida irmã! ❤️";

    } else {

        titulo.textContent =
            "Seja muito bem-vinda à sua surpresa! 🎉";


        try {

            localStorage.setItem(
                "aniversario_irma_visita",
                "true"
            );

        } catch (erro) {

            console.log(
                "Não foi possível salvar a visita.",
                erro
            );

        }

    }

}


/* =========================================================
   CARROSSEL DO ÁLBUM
========================================================= */

const slidesAlbum =
    document.querySelectorAll(".slide-album");


const indicadoresAlbum =
    document.querySelectorAll(".indicador");


const botaoAnterior =
    document.getElementById("btnAnterior");


const botaoProximo =
    document.getElementById("btnProximo");


function mostrarMemoria(indice) {

    if (!slidesAlbum.length) {
        return;
    }


    memoriaAtual =
        (indice + slidesAlbum.length)
        %
        slidesAlbum.length;


    slidesAlbum.forEach(slide => {

        slide.classList.remove("ativo");

    });


    indicadoresAlbum.forEach(indicador => {

        indicador.classList.remove("ativo");

    });


    slidesAlbum[memoriaAtual]
        .classList.add("ativo");


    if (indicadoresAlbum[memoriaAtual]) {

        indicadoresAlbum[memoriaAtual]
            .classList.add("ativo");

    }

}


/* =========================================================
   PRÓXIMO SLIDE
========================================================= */

function proximoSlide() {

    mostrarMemoria(
        memoriaAtual + 1
    );

    reiniciarCarrossel();

}


/* =========================================================
   SLIDE ANTERIOR
========================================================= */

function slideAnterior() {

    mostrarMemoria(
        memoriaAtual - 1
    );

    reiniciarCarrossel();

}


/* =========================================================
   INICIAR CARROSSEL
========================================================= */

function iniciarCarrossel() {

    clearInterval(intervaloMemorias);


    if (!slidesAlbum.length) {
        return;
    }


    intervaloMemorias =
        setInterval(() => {

            mostrarMemoria(
                memoriaAtual + 1
            );

        }, 5000);

}


/* =========================================================
   REINICIAR CARROSSEL
========================================================= */

function reiniciarCarrossel() {

    iniciarCarrossel();

}


/* =========================================================
   BOTÕES DO CARROSSEL
========================================================= */

if (botaoAnterior) {

    botaoAnterior.addEventListener(
        "click",
        slideAnterior
    );

}


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

                mostrarMemoria(indice);

                reiniciarCarrossel();

            }
        );

    }
);


/* =========================================================
   PRIMEIRO SLIDE
========================================================= */

mostrarMemoria(0);


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
    document.getElementById("modalCapsula");


const mensagemCapsula =
    document.getElementById("mensagemCapsula");


const fecharModal =
    document.getElementById("fecharModal");


const capsulas =
    document.querySelectorAll(".capsula");


capsulas.forEach(capsula => {

    capsula.addEventListener(
        "click",
        () => {

            if (!modalCapsula || !mensagemCapsula) {
                return;
            }


            mensagemCapsula.textContent =
                capsula.dataset.mensagem || "";


            modalCapsula.classList.add(
                "aberto"
            );

        }
    );

});


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
    document.getElementById("senhaPortal");


const btnPortal =
    document.getElementById("btnPortal");


const erroSenha =
    document.getElementById("erroSenha");


const portalTelaCheia =
    document.getElementById("portalTelaCheia");


const fecharPortal =
    document.getElementById("fecharPortal");


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

            if (evento.key === "Enter") {

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


    if (senha === "02/09") {

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


        /*
            IMPORTANTE:

            A HISTÓRIA SÓ É INICIADA AQUI.

            Ela não é executada quando o site
            carrega e não interfere na tela inicial.
        */

        iniciarHistoria();

    } else {

        if (erroSenha) {

            erroSenha.classList.add(
                "visivel"
            );

        }


        senhaPortal.focus();


        if (senhaPortal.animate) {

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
        fecharPortalFunc
    );

}


function fecharPortalFunc() {

    if (portalTelaCheia) {

        portalTelaCheia.classList.remove(
            "aberto"
        );

    }


    clearInterval(intervaloHistoria);


    document.body.style.overflow = "";

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
                    "Não foi possível tocar a música.",
                    erro
                );

            });

    } else {

        musica.pause();

        musicaTocando = false;

        atualizarPlayer();

    }

}


function atualizarPlayer() {

    if (!playerMusica || !iconeMusica) {
        return;
    }


    if (musicaTocando) {

        iconeMusica.textContent = "♫";

        playerMusica.classList.remove(
            "pausado"
        );

    } else {

        iconeMusica.textContent = "▶";

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
        document.getElementById("petalas");


    if (!recipiente) {
        return;
    }


    const petala =
        document.createElement("span");


    petala.className = "petala";


    petala.textContent =
        Math.random() > 0.5
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


    recipiente.appendChild(petala);


    setTimeout(() => {

        petala.remove();

    }, duracao * 1000);

}


/* =========================================================
   INICIAR CHUVA DE PÉTALAS
========================================================= */

function iniciarChuvaPetalas() {

    /*
        Evita criar vários setInterval
        se a pessoa entrar novamente.
    */

    if (chuvaPetalasIniciada) {
        return;
    }


    chuvaPetalasIniciada = true;


    setInterval(
        criarPetala,
        650
    );

}


/* =========================================================
   TECLADO
========================================================= */

document.addEventListener(
    "keydown",
    evento => {

        if (evento.key === "Escape") {

            fecharCapsula();


            if (portalTelaCheia) {

                portalTelaCheia.classList.remove(
                    "aberto"
                );

            }


            clearInterval(
                intervaloHistoria
            );


            document.body.style.overflow = "";

        }

    }
);


/* =========================================================
   A TUA HISTÓRIA
========================================================= */

/*
    ATENÇÃO:

    Estes elementos são procurados normalmente,
    mas nenhuma função da história é executada
    automaticamente aqui.

    Isso é importante para não interferir
    com a tela inicial no celular.
*/

let historias = [];
let pontosHistoria = [];
let botaoHistoriaAnterior = null;
let botaoHistoriaProximo = null;


/* =========================================================
   PREPARAR A HISTÓRIA
========================================================= */

function prepararHistoria() {

    historias =
        document.querySelectorAll(
            ".historia-item"
        );


    pontosHistoria =
        document.querySelectorAll(
            ".historia-ponto"
        );


    botaoHistoriaAnterior =
        document.getElementById(
            "historiaAnterior"
        );


    botaoHistoriaProximo =
        document.getElementById(
            "historiaProximo"
        );

}


/* =========================================================
   MOSTRAR CAPÍTULO
========================================================= */

function mostrarHistoria(indice) {

    /*
        Se a história ainda não foi preparada,
        prepara somente agora.
    */

    if (!historias.length) {

        prepararHistoria();

    }


    if (!historias.length) {
        return;
    }


    historiaAtual =
        (indice + historias.length)
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


    if (pontosHistoria[historiaAtual]) {

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
   INICIAR HISTÓRIA
========================================================= */

function iniciarHistoria() {

    /*
        AQUI está a proteção principal.

        A história só começa depois de a senha
        correta ser colocada no Portal.
    */


    prepararHistoria();


    if (!historias.length) {
        return;
    }


    historiaAtual = 0;


    mostrarHistoria(0);


    if (
        botaoHistoriaAnterior &&
        !botaoHistoriaAnterior.dataset.ativo
    ) {

        botaoHistoriaAnterior.addEventListener(
            "click",
            historiaAnteriorFunc
        );


        botaoHistoriaAnterior.dataset.ativo =
            "true";

    }


    if (
        botaoHistoriaProximo &&
        !botaoHistoriaProximo.dataset.ativo
    ) {

        botaoHistoriaProximo.addEventListener(
            "click",
            proximaHistoria
        );


        botaoHistoriaProximo.dataset.ativo =
            "true";

    }


    pontosHistoria.forEach(
        (ponto, indice) => {

            if (ponto.dataset.ativo) {
                return;
            }


            ponto.addEventListener(
                "click",
                () => {

                    mostrarHistoria(indice);

                    reiniciarHistoria();

                }
            );


            ponto.dataset.ativo =
                "true";

        }
    );


    clearInterval(
        intervaloHistoria
    );


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

