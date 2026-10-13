/* BER DIGITALL — MODAL DE ATUALIZAÇÃO DO SITE */
(() => {
  "use strict";

  if (window.__berAvisoIniciado) return;
  window.__berAvisoIniciado = true;

  const CHAVE = "berdigitall_aviso_v1";

  const css = `
    #bd-aviso-overlay {
      position: fixed;
      inset: 0;
      z-index: 999999;
      display: grid;
      place-items: center;
      padding: 18px;
      background: rgba(2, 8, 22, .78);
      backdrop-filter: blur(7px);
      -webkit-backdrop-filter: blur(7px);
      opacity: 0;
      visibility: hidden;
      transition: opacity .3s ease, visibility .3s ease;
      font-family: Arial, Helvetica, sans-serif;
    }

    #bd-aviso-overlay *,
    #bd-aviso-overlay *::before,
    #bd-aviso-overlay *::after {
      box-sizing: border-box;
    }

    #bd-aviso-overlay.bd-visivel {
      opacity: 1;
      visibility: visible;
    }

    #bd-aviso-modal {
      position: relative;
      width: 100%;
      max-width: 450px;
      overflow: hidden;
      color: #f5f8ff;
      background: linear-gradient(145deg, #0b1932, #07101f);
      border: 1px solid rgba(36, 151, 255, .42);
      border-radius: 20px;
      box-shadow: 0 24px 80px rgba(0, 0, 0, .5);
      transform: translateY(15px) scale(.98);
      transition: transform .3s ease;
    }

    #bd-aviso-overlay.bd-visivel #bd-aviso-modal {
      transform: translateY(0) scale(1);
    }

    #bd-aviso-modal::before {
      content: "";
      display: block;
      height: 4px;
      background: linear-gradient(90deg, #087cff, #00d4ff);
    }

    #bd-aviso-fechar {
      position: absolute;
      top: 14px;
      right: 14px;
      width: 36px;
      height: 36px;
      border: 1px solid rgba(255,255,255,.12);
      border-radius: 50%;
      background: rgba(255,255,255,.06);
      color: #d4e2f5;
      font-size: 24px;
      cursor: pointer;
    }

    #bd-aviso-fechar:hover {
      background: rgba(255,255,255,.15);
      color: #fff;
    }

    #bd-aviso-conteudo {
      padding: 30px;
    }

    #bd-aviso-icone {
      display: grid;
      place-items: center;
      width: 56px;
      height: 56px;
      margin-bottom: 22px;
      color: #35caff;
      background: rgba(0, 124, 255, .12);
      border: 1px solid rgba(0, 180, 255, .35);
      border-radius: 15px;
    }

    #bd-aviso-icone svg {
      width: 29px;
      height: 29px;
    }

    #bd-aviso-etiqueta {
      margin: 0 0 10px;
      color: #46caff;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 2px;
      text-transform: uppercase;
    }

    #bd-aviso-titulo {
      margin: 0 0 14px;
      color: #fff;
      font-size: clamp(26px, 6vw, 32px);
      line-height: 1.15;
      letter-spacing: -1px;
    }

    #bd-aviso-titulo span {
      color: #19bfff;
    }

    #bd-aviso-texto {
      margin: 0;
      color: #c3cfe0;
      font-size: 15px;
      line-height: 1.7;
    }

    #bd-aviso-lista {
      display: grid;
      gap: 13px;
      margin: 22px 0 25px;
      padding: 0;
      list-style: none;
    }

    #bd-aviso-lista li {
      display: flex;
      align-items: flex-start;
      gap: 10px;
      color: #e5edf9;
      font-size: 13px;
      line-height: 1.5;
    }

    #bd-aviso-lista svg {
      flex: 0 0 17px;
      width: 17px;
      height: 17px;
      margin-top: 1px;
      color: #19c6ff;
    }

    #bd-aviso-acao {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      width: 100%;
      min-height: 49px;
      padding: 13px 18px;
      border: 0;
      border-radius: 11px;
      background: linear-gradient(100deg, #087cff, #05a9d7);
      box-shadow: 0 8px 24px rgba(0, 119, 255, .2);
      color: #fff;
      font-family: inherit;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      transition: filter .2s ease, transform .2s ease;
    }

    #bd-aviso-acao:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }

    #bd-aviso-rodape {
      margin: 14px 0 0;
      color: #8294ae;
      font-size: 11px;
      line-height: 1.5;
      text-align: center;
    }

    #bd-aviso-fechar:focus-visible,
    #bd-aviso-acao:focus-visible {
      outline: 2px solid #7ce7ff;
      outline-offset: 3px;
    }

    @media (max-width: 480px) {
      #bd-aviso-conteudo {
        padding: 26px 22px 22px;
      }

      #bd-aviso-texto {
        font-size: 14px;
      }

      #bd-aviso-lista {
        margin: 18px 0 22px;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      #bd-aviso-overlay,
      #bd-aviso-modal,
      #bd-aviso-acao {
        transition: none;
      }
    }
  `;

  const check = `
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m5 12 4 4L19 6"
        stroke="currentColor" stroke-width="2"
        stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;

  function iniciar() {
    if (document.getElementById("bd-aviso-overlay")) return;

    let jaViu = false;

    try {
      jaViu = sessionStorage.getItem(CHAVE) === "1";
    } catch (erro) {}

    if (jaViu) return;

    const style = document.createElement("style");
    style.id = "bd-aviso-estilos";
    style.textContent = css;
    document.head.appendChild(style);

    const overlay = document.createElement("div");
    overlay.id = "bd-aviso-overlay";
    overlay.setAttribute("aria-hidden", "true");

    overlay.innerHTML = `
      <section
        id="bd-aviso-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="bd-aviso-titulo"
        aria-describedby="bd-aviso-texto"
      >
        <button
          id="bd-aviso-fechar"
          type="button"
          aria-label="Fechar aviso"
        >&times;</button>

        <div id="bd-aviso-conteudo">

          <div id="bd-aviso-icone">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M4 12.5 9.2 17 20 6"
                stroke="currentColor" stroke-width="2.2"
                stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M12 2.8a9.2 9.2 0 1 0 9.2 9.2"
                stroke="currentColor" stroke-width="1.6"
                stroke-linecap="round"/>
            </svg>
          </div>

          <p id="bd-aviso-etiqueta">
            Novidade na Ber Digitall
          </p>

          <h2 id="bd-aviso-titulo">
            Nosso site está de cara nova<span>.</span>
          </h2>

          <p id="bd-aviso-texto">
            Recriamos nosso site para oferecer uma experiência
            mais simples, rápida e agradável. Agora ficou mais
            fácil conhecer nossas soluções digitais e encontrar
            o que seu negócio precisa.
          </p>

          <ul id="bd-aviso-lista">
            <li>
              ${check}
              <span>Navegação mais simples e intuitiva</span>
            </li>
            <li>
              ${check}
              <span>Experiência otimizada para celulares e computadores</span>
            </li>
            <li>
              ${check}
              <span>Acesso fácil às nossas soluções digitais</span>
            </li>
          </ul>

          <button id="bd-aviso-acao" type="button">
            Conhecer o novo site <span aria-hidden="true">→</span>
          </button>

          <p id="bd-aviso-rodape">
            Ber Digitall · Soluções digitais para negócios locais
          </p>

        </div>
      </section>
    `;

    document.body.appendChild(overlay);

    function fechar() {
      if (!document.getElementById("bd-aviso-overlay")) return;

      overlay.classList.remove("bd-visivel");
      overlay.setAttribute("aria-hidden", "true");
      document.body.style.removeProperty("overflow");

      try {
        sessionStorage.setItem(CHAVE, "1");
      } catch (erro) {}

      document.removeEventListener("keydown", teclaEsc);

      window.setTimeout(() => {
        overlay.remove();
      }, 320);
    }

    function teclaEsc(evento) {
      if (evento.key === "Escape") fechar();
    }

    overlay.querySelector("#bd-aviso-fechar")
      .addEventListener("click", fechar);

    overlay.querySelector("#bd-aviso-acao")
      .addEventListener("click", fechar);

    overlay.addEventListener("click", evento => {
      if (evento.target === overlay) fechar();
    });

    document.addEventListener("keydown", teclaEsc);

    // Bloqueia a rolagem enquanto o aviso estiver aberto.
    document.body.style.overflow = "hidden";

    // Mostra o modal somente após cinco segundos.
    window.setTimeout(() => {
      if (!document.getElementById("bd-aviso-overlay")) return;

      overlay.setAttribute("aria-hidden", "false");
      overlay.classList.add("bd-visivel");

      overlay.querySelector("#bd-aviso-fechar").focus();
    }, 5000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar, { once: true });
  } else {
    iniciar();
  }
})();