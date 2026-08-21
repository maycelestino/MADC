const currentPath = window.location.pathname;

const header = document.getElementById("site-header");
const footer = document.getElementById("site-footer");

    if (header) {
    header.innerHTML = `
        <header class="header" id="topo">
        <div class="container nav-wrap">
            <a href="/" class="logo" aria-label="Ir para a página inicial">
              <img src="/img/madc_2.png" alt="Logo MADC Comunicação Visual" class="logo-img" />
            </a>

            <button class="menu-toggle" aria-label="Abrir menu" aria-expanded="false" aria-controls="menu-list">
            <span></span>
            <span></span>
            <span></span>
            </button>

            <nav class="nav" id="menu-list">
              <a href="/" class="${currentPath === "/" ? "active" : ""}">Início</a>

              <a href="/servicos/" class="${currentPath.startsWith("/servicos/") ? "active" : ""}">
                Serviços
              </a>

              <a href="/portfolio/" class="${currentPath.startsWith("/portfolio/") ? "active" : ""}">
                Portfólio
              </a>

              <a href="/sobre/" class="${currentPath.startsWith("/sobre/") ? "active" : ""}">
                Sobre
              </a>

              <a href="/contato/" class="${currentPath.startsWith("/contato/") ? "active" : ""}">
                Contato
              </a>
            </nav>
            <div class="nav-socials">
              <a href="https://www.instagram.com/madc.digital" target="_blank" rel="noopener noreferrer" aria-label="Instagram da MADC">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.5-2.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>
                </svg>
              </a>

              <a href="https://www.facebook.com/madc.digital" target="_blank" rel="noopener noreferrer" aria-label="Facebook da MADC">
                <svg viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/>
                </svg>
              </a>

              <a href="https://wa.me/5511970694893" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da MADC">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 3C8.8 3 3 8.6 3 15.5c0 2.4.7 4.7 2 6.6L3.8 29l7.1-1.8c1.6.8 3.3 1.2 5.1 1.2 7.2 0 13-5.6 13-12.5S23.2 3 16 3Zm0 23.2c-1.6 0-3.1-.4-4.5-1.2l-.4-.2-4.2 1.1.8-4.1-.3-.4c-1-1.7-1.6-3.7-1.6-5.8C5.8 9.8 10.4 5.2 16 5.2s10.2 4.6 10.2 10.2S21.6 26.2 16 26.2Z"/>
                  <path d="M21.7 18.6c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2c-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.8.7.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z"/>
                </svg>
              </a>
            </div>
            </nav>
        </div>
        </header>
    `;
    }

    if (footer) {
    footer.innerHTML = `
        <footer class="footer">
        <div class="footer-socials">
          <a href="https://www.instagram.com/madc.digital" target="_blank" rel="noopener noreferrer" aria-label="Instagram da MADC">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3V7a3 3 0 0 0-3-3H7Zm5 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8Zm0 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm5.5-2.7a1.2 1.2 0 1 1 0 2.4 1.2 1.2 0 0 1 0-2.4Z"/>
            </svg>
          </a>

          <a href="https://www.facebook.com/madc.digital" target="_blank" rel="noopener noreferrer" aria-label="Facebook da MADC">
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z"/>
            </svg>
          </a>

          <a href="https://wa.me/5511970694893" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da MADC">
            <svg viewBox="0 0 32 32" aria-hidden="true">
              <path d="M16 3C8.8 3 3 8.6 3 15.5c0 2.4.7 4.7 2 6.6L3.8 29l7.1-1.8c1.6.8 3.3 1.2 5.1 1.2 7.2 0 13-5.6 13-12.5S23.2 3 16 3Zm0 23.2c-1.6 0-3.1-.4-4.5-1.2l-.4-.2-4.2 1.1.8-4.1-.3-.4c-1-1.7-1.6-3.7-1.6-5.8C5.8 9.8 10.4 5.2 16 5.2s10.2 4.6 10.2 10.2S21.6 26.2 16 26.2Z"/>
              <path d="M21.7 18.6c-.3-.1-1.8-.9-2.1-1s-.5-.1-.7.2c-.2.3-.8 1-.9 1.1-.2.2-.3.2-.6.1-.3-.1-1.2-.4-2.3-1.4-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.4.1-.6.1-.1.3-.3.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5s-.7-1.7-1-2.3c-.3-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.7s1.2 3.1 1.3 3.3c.2.2 2.3 3.5 5.5 4.9.8.3 1.4.5 1.8.7.8.2 1.5.2 2.1.1.6-.1 1.8-.7 2.1-1.5.3-.7.3-1.3.2-1.5-.1-.1-.3-.2-.6-.3Z"/>
            </svg>
          </a>
        </div>
        <div class="container footer-wrap">
            <p>MADC Digital Comunicação Visual | CNPJ: 29.586.504/0001-17</p>
            <p>Rua Antônio Gomes, 93 - Vila Diva - São Paulo - SP</p>
            <p>&copy; 2026 - Todos os direitos reservados.</p>
        </div>
        </footer>
    `;
    }

    // Galeria/lightbox do portfólio
document.addEventListener('DOMContentLoaded', function () {
  const lightbox = document.getElementById('portfolioLightbox');
  const lightboxImage = document.getElementById('lightboxImage');
  const closeButton = document.querySelector('.lightbox-close');
  const projects = document.querySelectorAll('.portfolio-page .project');

  if (!lightbox || !lightboxImage || !closeButton || projects.length === 0) {
    return;
  }

  projects.forEach(function (project) {
    project.addEventListener('click', function () {
      const image = project.querySelector('img');

      if (!image) {
        return;
      }

      lightboxImage.src = image.src;
      lightboxImage.alt = image.alt;
      lightbox.classList.add('open');
      lightbox.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });
  });

  function closeLightbox() {
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImage.src = '';
    document.body.style.overflow = '';
  }

  closeButton.addEventListener('click', closeLightbox);

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) {
      closeLightbox();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape' && lightbox.classList.contains('open')) {
      closeLightbox();
    }
  });
});

