
/* =========================================================
   BER DIGITALL — MÓDULO DE CONTATO
   Arquivo: assets/js/formulario.js

   Responsabilidades:
   - Renderizar o formulário
   - Aplicar CSS encapsulado
   - Validar os campos
   - Preparar mensagem para WhatsApp
   ========================================================= */

(() => {
    "use strict";

    /* =====================================================
       1. CONFIGURAÇÕES
       ===================================================== */

    const CONFIG = {
        whatsapp: "5511993335167",

        titulo: "Solicite um contato",

        descricao:
            "Preencha os dados abaixo. Sua mensagem será organizada para envio pelo WhatsApp.",

        mensagemSucesso:
            "Seus dados foram preparados. Estamos abrindo o WhatsApp."
    };


    /* =====================================================
       2. LOCAL DE INSTALAÇÃO
       ===================================================== */

    const container = document.getElementById("formulario-contato");

    if (!container) {
        console.warn(
            "Ber Digitall: elemento #formulario-contato não encontrado."
        );
        return;
    }

    if (container.dataset.formularioInicializado === "true") {
        return;
    }

    container.dataset.formularioInicializado = "true";


    /* =====================================================
       3. CSS ENCAPSULADO
       ===================================================== */

    const css = `
        #bd-formulario {
            color: #f4f7ff;
            width: 100%;
        }

        #bd-formulario *,
        #bd-formulario *::before,
        #bd-formulario *::after {
            box-sizing: border-box;
        }

        #bd-formulario .contact {
            background:
                radial-gradient(
                    ellipse at 50% 0%,
                    rgba(13, 99, 232, .16),
                    transparent 60%
                );
            padding: 82px 0;
        }

        #bd-formulario .wrap {
            width: min(1180px, calc(100% - 40px));
            margin: auto;
        }

        #bd-formulario .contact-grid {
            display: grid;
            grid-template-columns: .8fr 1.2fr;
            gap: 40px;
            align-items: start;
        }

        #bd-formulario .contact-copy {
            color: #f4f7ff;
        }

        #bd-formulario .kicker {
            color: #69c9ff;
            text-transform: uppercase;
            font-size: .78rem;
            font-weight: 800;
            letter-spacing: .16em;
        }

        #bd-formulario .contact-copy h2 {
            font-size: clamp(2rem, 4vw, 3.3rem);
            line-height: 1.08;
            letter-spacing: -.04em;
            margin: 12px 0;
        }

        #bd-formulario .contact-copy p {
            color: #aebdd2;
            line-height: 1.6;
        }

        #bd-formulario .contact-points {
            display: grid;
            gap: 12px;
            margin-top: 25px;
            color: #d5e0f0;
        }

        #bd-formulario .contact-points span {
            display: flex;
            gap: 10px;
            align-items: center;
        }

        #bd-formulario .check {
            color: #54d5ff;
            font-weight: 900;
        }

        #bd-formulario .form-card {
            border: 1px solid rgba(106, 166, 255, .25);
            background: rgba(8, 19, 38, .88);
            padding: 28px;
            border-radius: 20px;
            box-shadow: 0 25px 80px rgba(0, 0, 0, .2);
        }

        #bd-formulario .form-card h3 {
            color: #f4f7ff;
            margin: 0 0 5px;
            font-size: 1.4rem;
        }

        #bd-formulario .form-card > p {
            margin: 0 0 22px;
            color: #a9b8cf;
            font-size: .92rem;
            line-height: 1.5;
        }

        #bd-formulario .form-grid {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 14px;
        }

        #bd-formulario .field {
            display: flex;
            flex-direction: column;
            gap: 6px;
            min-width: 0;
        }

        #bd-formulario .field.full {
            grid-column: 1 / -1;
        }

        #bd-formulario .field label {
            font-size: .86rem;
            color: #d4dfef;
            font-weight: 650;
        }

        #bd-formulario .field input,
        #bd-formulario .field select,
        #bd-formulario .field textarea {
            width: 100%;
            min-width: 0;
            border: 1px solid rgba(131, 164, 215, .24);
            border-radius: 10px;
            background: #071225;
            color: #f4f7ff;
            padding: 12px 13px;
            outline: none;
            font: inherit;
            font-size: 16px;
        }

        #bd-formulario .field input::placeholder,
        #bd-formulario .field textarea::placeholder {
            color: #8292aa;
        }

        #bd-formulario .field input:focus,
        #bd-formulario .field select:focus,
        #bd-formulario .field textarea:focus {
            border-color: #268aff;
            box-shadow: 0 0 0 3px rgba(38, 138, 255, .12);
        }

        #bd-formulario .field select option {
            background: #071225;
            color: #f4f7ff;
        }

        #bd-formulario .field textarea {
            resize: vertical;
            min-height: 100px;
        }

        #bd-formulario .field input:invalid:not(:placeholder-shown),
        #bd-formulario .field textarea:invalid:not(:placeholder-shown) {
            border-color: rgba(255, 95, 95, .7);
        }

        #bd-formulario .field input:focus-visible,
        #bd-formulario .field select:focus-visible,
        #bd-formulario .field textarea:focus-visible,
        #bd-formulario button:focus-visible {
            outline: 2px solid #66caff;
            outline-offset: 3px;
        }

        #bd-formulario .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 9px;
            width: 100%;
            margin-top: 18px;
            border: 1px solid rgba(105, 170, 255, .45);
            border-radius: 10px;
            padding: 14px 18px;
            background: linear-gradient(135deg, #1677ff, #0752c9);
            color: #fff;
            font: inherit;
            font-weight: 700;
            cursor: pointer;
            transition: transform .2s, box-shadow .2s;
            box-shadow: 0 8px 28px rgba(0, 95, 255, .18);
        }

        #bd-formulario .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 34px rgba(0, 105, 255, .3);
        }

        #bd-formulario .btn:disabled {
            opacity: .65;
            cursor: wait;
        }

        #bd-formulario .form-note {
            font-size: .78rem;
            color: #8fa2bd;
            margin: 12px 0 0;
            line-height: 1.5;
        }

        #bd-formulario .form-feedback {
            display: none;
            padding: 12px;
            margin-top: 15px;
            border-radius: 9px;
            font-size: .88rem;
            line-height: 1.5;
        }

        #bd-formulario .form-feedback.visible {
            display: block;
        }

        #bd-formulario .form-feedback.error {
            color: #ffc3c3;
            background: rgba(180, 35, 35, .15);
            border: 1px solid rgba(255, 95, 95, .3);
        }

        #bd-formulario .form-feedback.success {
            color: #a9f5c1;
            background: rgba(20, 160, 80, .12);
            border: 1px solid rgba(50, 220, 120, .3);
        }

        @media(max-width: 850px) {
            #bd-formulario .contact-grid {
                grid-template-columns: 1fr;
                gap: 24px;
            }
        }

        @media(max-width: 560px) {
            #bd-formulario .wrap {
                width: min(1180px, calc(100% - 28px));
            }

            #bd-formulario .contact {
                padding: 64px 0;
            }

            #bd-formulario .form-grid {
                grid-template-columns: 1fr;
            }

            #bd-formulario .field.full {
                grid-column: auto;
            }

            #bd-formulario .form-card {
                padding: 20px;
            }
        }

        @media(max-width: 380px) {
            #bd-formulario .wrap {
                width: calc(100% - 24px);
            }

            #bd-formulario .form-card {
                padding: 16px;
            }
        }

        @media(prefers-reduced-motion: reduce) {
            #bd-formulario *,
            #bd-formulario *::before,
            #bd-formulario *::after {
                transition: none !important;
                animation: none !important;
            }
        }
    `;


    /* =====================================================
       4. INSERÇÃO DO CSS
       ===================================================== */

    const style = document.createElement("style");

    style.id = "bd-formulario-styles";
    style.textContent = css;

    document.head.appendChild(style);


    /* =====================================================
       5. HTML DO FORMULÁRIO
       ===================================================== */

    const html = `
        <div id="bd-formulario">

            <section id="contato" class="contact">

                <div class="wrap">

                    <div class="contact-grid">

                        <div class="contact-copy">

                            <span class="kicker">
                                Vamos conversar
                            </span>

                            <h2>
                                O próximo passo do seu negócio pode começar aqui.
                            </h2>

                            <p>
                                Conte um pouco sobre sua empresa e o que você deseja melhorar.
                                Vamos entender sua necessidade e conversar sobre uma solução
                                digital adequada para o seu momento.
                            </p>

                            <div class="contact-points">

                                <span>
                                    <b class="check">✓</b>
                                    Primeiro contato sem complicação
                                </span>

                                <span>
                                    <b class="check">✓</b>
                                    Proposta alinhada ao seu objetivo
                                </span>

                                <span>
                                    <b class="check">✓</b>
                                    Atendimento pelo WhatsApp
                                </span>

                            </div>

                        </div>


                        <form class="form-card"
                            id="bd-lead-form"
                            autocomplete="on">

                            <h3>${CONFIG.titulo}</h3>

                            <p>${CONFIG.descricao}</p>

                            <div class="form-grid">

                                <div class="field">

                                    <label for="bd-nome">
                                        Seu nome *
                                    </label>

                                    <input
                                        id="bd-nome"
                                        name="nome"
                                        type="text"
                                        autocomplete="name"
                                        maxlength="80"
                                        minlength="2"
                                        placeholder="Como podemos chamar você?"
                                        required>

                                </div>


                                <div class="field">

                                    <label for="bd-empresa">
                                        Nome da empresa *
                                    </label>

                                    <input
                                        id="bd-empresa"
                                        name="empresa"
                                        type="text"
                                        autocomplete="organization"
                                        maxlength="100"
                                        minlength="2"
                                        placeholder="Nome do negócio"
                                        required>

                                </div>


                                <div class="field">

                                    <label for="bd-whatsapp">
                                        Seu WhatsApp *
                                    </label>

                                    <input
                                        id="bd-whatsapp"
                                        name="whatsapp"
                                        type="tel"
                                        autocomplete="tel"
                                        inputmode="tel"
                                        maxlength="20"
                                        pattern="[0-9()+.\\s-]{10,20}"
                                        placeholder="(11) 99999-9999"
                                        required>

                                </div>


                                <div class="field">

                                    <label for="bd-nicho">
                                        Ramo de atividade *
                                    </label>

                                    <select id="bd-nicho" name="nicho" required>

                                        <option value="">
                                            Selecione uma opção
                                        </option>

                                        <option>Alimentação e bebidas</option>
                                        <option>Beleza e estética</option>
                                        <option>Saúde e bem-estar</option>
                                        <option>Comércio local</option>
                                        <option>Serviços profissionais</option>
                                        <option>Automotivo</option>
                                        <option>Pet shop e veterinária</option>
                                        <option>Indústria e tecnologia</option>
                                        <option>Outro segmento</option>

                                    </select>

                                </div>


                                <div class="field full">

                                    <label for="bd-solucao">
                                        O que você precisa? *
                                    </label>

                                    <select id="bd-solucao" name="solucao" required>

                                        <option value="">
                                            Selecione a solução desejada
                                        </option>

                                        <option>Site profissional</option>

                                        <option>
                                            Landing page para divulgação ou vendas
                                        </option>

                                        <option>
                                            Solução digital personalizada
                                        </option>

                                        <option>
                                            Melhorar minha presença digital
                                        </option>

                                        <option>
                                            Ainda preciso de orientação
                                        </option>

                                    </select>

                                </div>


                                <div class="field full">

                                    <label for="bd-detalhes">
                                        Conte um pouco sobre seu projeto
                                    </label>

                                    <textarea
                                        id="bd-detalhes"
                                        name="detalhes"
                                        maxlength="700"
                                        placeholder="Qual é seu objetivo ou principal desafio?"></textarea>

                                </div>

                            </div>


                            <button class="btn" type="submit">
                                Enviar solicitação pelo WhatsApp
                                <span aria-hidden="true">↗</span>
                            </button>


                            <div
                                class="form-feedback"
                                id="bd-form-feedback"
                                role="status"
                                aria-live="polite">
                            </div>


                            <p class="form-note">
                                Ao clicar, você será direcionado ao WhatsApp da Ber Digitall
                                com os dados preenchidos neste formulário.
                            </p>

                        </form>

                    </div>

                </div>

            </section>

        </div>
    `;


    /* =====================================================
       6. INSERÇÃO DO HTML
       ===================================================== */

    container.innerHTML = html;


    /* =====================================================
       7. ELEMENTOS DO FORMULÁRIO
       ===================================================== */

    const form = container.querySelector("#bd-lead-form");

    const feedback = container.querySelector("#bd-form-feedback");

    const submitButton = form.querySelector("button[type='submit']");


    /* =====================================================
       8. FUNÇÃO DE FEEDBACK
       ===================================================== */

    function mostrarFeedback(tipo, mensagem) {

        feedback.className = "form-feedback visible " + tipo;

        feedback.textContent = mensagem;

    }


    /* =====================================================
       9. ENVIO PARA WHATSAPP
       ===================================================== */

    form.addEventListener("submit", function (event) {

        event.preventDefault();

        feedback.className = "form-feedback";
        feedback.textContent = "";

        /* Validação nativa */

        if (!form.reportValidity()) {
            return;
        }


        /* Coleta dos dados */

        const dados = new FormData(form);

        const nome = dados.get("nome").trim();

        const empresa = dados.get("empresa").trim();

        const whatsapp = dados.get("whatsapp").trim();

        const nicho = dados.get("nicho");

        const solucao = dados.get("solucao");

        const detalhes = dados.get("detalhes").trim();


        /* Validação adicional do telefone */

        const telefoneLimpo = whatsapp.replace(/\D/g, "");

        if (telefoneLimpo.length < 10 || telefoneLimpo.length > 13) {

            mostrarFeedback(
                "error",
                "Informe um número de WhatsApp válido com DDD."
            );

            form.querySelector("#bd-whatsapp").focus();

            return;
        }


        /* Número de destino */

        const destino = CONFIG.whatsapp.replace(/\D/g, "");

        if (!/^\d{12,13}$/.test(destino)) {

            mostrarFeedback(
                "error",
                "O número de WhatsApp da empresa precisa ser configurado corretamente."
            );

            return;
        }


        /* Montagem da mensagem */

        const mensagem = `
Olá, *Ber Digitall*!

Gostaria de solicitar um contato.

*DADOS DO CLIENTE*

Nome: ${nome}

Empresa: ${empresa}

WhatsApp: ${whatsapp}

Ramo de atividade: ${nicho}

*SOLUÇÃO DESEJADA*

${solucao}

*DETALHES DO PROJETO*

${detalhes || "Não informado."}

Aguardo o contato. Obrigado!
        `.trim();


        /* URL do WhatsApp */

        const url =
            "https://wa.me/" +
            destino +
            "?text=" +
            encodeURIComponent(mensagem);


        /* Abertura do WhatsApp */

        submitButton.disabled = true;

        submitButton.textContent = "Abrindo WhatsApp...";

        const novaJanela = window.open(
            url,
            "_blank",
            "noopener,noreferrer"
        );

        if (novaJanela) {

            mostrarFeedback(
                "success",
                CONFIG.mensagemSucesso
            );

        } else {

            mostrarFeedback(
                "error",
                "Não foi possível abrir uma nova janela. Verifique o bloqueador de pop-ups ou use este link: " + url
            );

        }

        submitButton.disabled = false;

        submitButton.innerHTML =
            'Enviar solicitação pelo WhatsApp <span aria-hidden="true">↗</span>';

    });

})();
