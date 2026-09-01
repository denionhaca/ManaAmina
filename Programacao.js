
/* =========================================================
   CONFIGURAÇÃO PRINCIPAL
========================================================= */

/*
    ALTERE AQUI A DATA DE NASCIMENTO.

    Exemplo:
    01/09/1996 às 02:00

    JavaScript usa:
    ano, mês - 1, dia, hora, minuto
*/

const DATA_NASCIMENTO = new Date(
    2002,
    8,
    6,
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

let slideAtual = 0;

let intervaloSlides = null;


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

btnIniciar.addEventListener(
    "click",
    iniciarExperiencia
);


async function iniciarExperiencia() {

    btnIniciar.disabled = true;

    /*
        O áudio começa dentro da ação do clique,
        respeitando o bloqueio de autoplay dos navegadores.
    */

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

    telaInicio.classList.add("oculta");

    await esperar(1000);

    telaInicio.style.display = "none";

    iniciarCountdown();
}


/* =========================================================
   COUNTDOWN CINEMATOGRÁFICO
========================================================= */

function iniciarCountdown() {

    cinema.classList.add("ativa");

    let numero = 10;

    numeroCountdown.textContent = numero;

    intervaloCountdown =
        setInterval(() => {

            numero--;

            numeroCountdown.textContent =
                numero;

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

    cinema.classList.remove("ativa");

    galaxia.classList.add("ativa");

    let tempo = 18;

    tempoGalaxia.textContent = tempo;

    intervaloGalaxia =
        setInterval(() => {

            tempo--;

            tempoGalaxia.textContent =
                tempo;

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

btnPular.addEventListener(
    "click",
    () => {

        clearInterval(intervaloGalaxia);

        iniciarRelogioVida();

    }
);


/* =========================================================
   RELÓGIO DE TEMPO DE VIDA
========================================================= */

function iniciarRelogioVida() {

    galaxia.classList.remove("ativa");

    vida.classList.add("ativa");

    atualizarIdade();

    clearInterval(intervaloVida);

    intervaloVida =
        setInterval(
            atualizarIdade,
            1000
        );

    setTimeout(() => {

        btnEntrar.classList.add("mostrar");

    }, 3000);
}


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


    /*
        Ajuste simples para manter
        as unidades coerentes.
    */

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


    document.getElementById("anos")
        .textContent =
        formatarNumero(anos);

    document.getElementById("meses")
        .textContent =
        formatarNumero(meses);

    document.getElementById("dias")
        .textContent =
        formatarNumero(dias);

    document.getElementById("horas")
        .textContent =
        formatarNumero(horas);

    document.getElementById("minutos")
        .textContent =
        formatarNumero(minutos);

    document.getElementById("segundos")
        .textContent =
        formatarNumero(segundos);
}


function formatarNumero(numero) {

    return String(numero)
        .padStart(2, "0");
}


/* =========================================================
   ENTRAR NO SITE
========================================================= */

btnEntrar.addEventListener(
    "click",
    entrarNoSite
);


function entrarNoSite() {

    clearInterval(intervaloVida);

    vida.classList.remove("ativa");

    sitePrincipal.classList.add("visivel");

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

    const jaVisitou =
        localStorage.getItem(
            "aniversario_irma_visita"
        );

    const titulo =
        document.getElementById(
            "tituloVisita"
        );

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
   CARROSSEL
========================================================= */

const fotos = [
    "../IMG/YY.jpeg",
    "../IMG/DeRosa.jpeg",
    "../IMG/Aeroporto.jpeg",
    "../IMG/Criancas.jpeg",
    "../IMG/Madolescente.jpeg"

];

const legendas = [
    "Uma memória especial ❤️",
    "Um momento que guardamos com carinho 🌷",
    "Mais uma página da nossa história ✨",


];


const imagemCarrossel =
    document.getElementById(
        "imagemCarrossel"
    );

const fotoLegenda =
    document.getElementById(
        "fotoLegenda"
    );

const indicadores =
    document.querySelectorAll(
        ".indicador"
    );


function mostrarSlide(indice) {

    slideAtual =
        (indice + fotos.length)
        %
        fotos.length;

    const fotoContainer =
        document.querySelector(
            ".foto-carrossel"
        );

    fotoContainer.classList.add(
        "trocando"
    );

    setTimeout(() => {

        imagemCarrossel.src =
            fotos[slideAtual];

        fotoLegenda.textContent =
            legendas[slideAtual];

        indicadores.forEach(
            indicador =>
                indicador.classList.remove(
                    "ativo"
                )
        );

        indicadores[
            slideAtual
        ].classList.add("ativo");

        fotoContainer.classList.remove(
            "trocando"
        );

    }, 250);
}


function iniciarCarrossel() {

    clearInterval(
        intervaloSlides
    );

    intervaloSlides =
        setInterval(() => {

            mostrarSlide(
                slideAtual + 1
            );

        }, 8000);
}


document.getElementById(
    "btnAnterior"
).addEventListener(
    "click",
    () => {

        mostrarSlide(
            slideAtual - 1
        );

        iniciarCarrossel();

    }
);


document.getElementById(
    "btnProximo"
).addEventListener(
    "click",
    () => {

        mostrarSlide(
            slideAtual + 1
        );

        iniciarCarrossel();

    }
);


/* =========================================================
   ENVELOPE
========================================================= */

envelope.addEventListener(
    "click",
    () => {

        envelope.classList.toggle(
            "aberto"
        );

    }
);


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

                const mensagem =
                    capsula.dataset.mensagem;

                mensagemCapsula.textContent =
                    mensagem;

                modalCapsula.classList.add(
                    "aberto"
                );

            }
        );

    }
);


function fecharCapsula() {

    modalCapsula.classList.remove(
        "aberto"
    );
}


fecharModal.addEventListener(
    "click",
    fecharCapsula
);


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


btnPortal.addEventListener(
    "click",
    verificarSenha
);


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


function verificarSenha() {

    const senha =
        senhaPortal.value
            .trim();

    if (senha === "01/09") {

        erroSenha.classList.remove(
            "visivel"
        );

        portalTelaCheia.classList.add(
            "aberto"
        );

        document.body.style.overflow =
            "hidden";

    } else {

        erroSenha.classList.add(
            "visivel"
        );

        senhaPortal.focus();

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


fecharPortal.addEventListener(
    "click",
    () => {

        portalTelaCheia.classList.remove(
            "aberto"
        );

        document.body.style.overflow =
            "";

    }
);


/* =========================================================
   PLAYER DE MÚSICA
========================================================= */

playerMusica.addEventListener(
    "click",
    alternarMusica
);


function alternarMusica() {

    if (musica.paused) {

        musica.play();

        musicaTocando = true;

    } else {

        musica.pause();

        musicaTocando = false;
    }

    atualizarPlayer();
}


function atualizarPlayer() {

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

    const petala =
        document.createElement(
            "span"
        );

    petala.className =
        "petala";

    petala.textContent =
        Math.random() > .5
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


    document
        .getElementById("petalas")
        .appendChild(petala);


    setTimeout(() => {

        petala.remove();

    }, duracao * 1000);
}


function iniciarChuvaPetalas() {

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

        if (
            evento.key ===
            "Escape"
        ) {

            fecharCapsula();

            portalTelaCheia.classList.remove(
                "aberto"
            );

            document.body.style.overflow =
                "";

        }

    }
);

