document.addEventListener("DOMContentLoaded", async function () {

  const portfolioGrid =
    document.getElementById("publicPortfolio");

  const lightbox =
    document.getElementById("portfolioLightbox");

  const lightboxImage =
    document.getElementById("lightboxImage");

  const lightboxClose =
    lightbox?.querySelector(".lightbox-close");


  if (!portfolioGrid) {
    return;
  }


  function escapeHtml(value) {

    return String(value ?? "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function getImageUrl(path) {

    const { data } =
      supabaseClient.storage
        .from("portfolio")
        .getPublicUrl(path);

    return data.publicUrl;

  }


  function openLightbox(imageUrl, title) {

    if (!lightbox || !lightboxImage) {
      return;
    }

    lightboxImage.src = imageUrl;

    lightboxImage.alt =
      title || "Projeto MADC";

    lightbox.classList.add("open");

    lightbox.setAttribute(
      "aria-hidden",
      "false"
    );

    document.body.style.overflow =
      "hidden";

  }


  function closeLightbox() {

    if (!lightbox || !lightboxImage) {
      return;
    }

    lightbox.classList.remove("open");

    lightbox.setAttribute(
      "aria-hidden",
      "true"
    );

    lightboxImage.src = "";

    document.body.style.overflow = "";

  }


  async function loadPortfolio() {

    const {
      data,
      error
    } =
      await supabaseClient
        .from("portfolio")
        .select(`
          id,
          titulo,
          categoria,
          descricao,
          imagem_path,
          ordem
        `)
        .eq("ativo", true)
        .order("ordem", {
          ascending: true
        })
        .order("created_at", {
          ascending: false
        });


    if (error) {

      console.error(
        "Erro ao carregar portfólio:",
        error
      );

      portfolioGrid.innerHTML = `
        <p class="portfolio-loading">
          Não foi possível carregar os projetos.
        </p>
      `;

      return;

    }


    if (!data || data.length === 0) {

      portfolioGrid.innerHTML = `
        <p class="portfolio-loading">
          Nenhum projeto disponível no momento.
        </p>
      `;

      return;

    }


    portfolioGrid.innerHTML =
      data
        .map(function (project) {

          const imageUrl =
            getImageUrl(
              project.imagem_path
            );


          const title =
            escapeHtml(
              project.titulo
            );

          const category =
            escapeHtml(
              project.categoria
            );


          return `
            <article
              class="project"
              data-image="${escapeHtml(imageUrl)}"
              data-title="${title}"
            >

              <img
                src="${escapeHtml(imageUrl)}"
                alt="${title}"
                loading="lazy"
              >

              <div class="overlay">
                <div>

                  ${
                    project.categoria
                      ? `
                        <span>
                          ${category}
                        </span>
                      `
                      : ""
                  }

                  <h3>
                    ${title}
                  </h3>

                </div>
              </div>

            </article>
          `;

        })
        .join("");

  }


  portfolioGrid.addEventListener(
    "click",
    function (event) {

      const project =
        event.target.closest(".project");

      if (!project) {
        return;
      }

      openLightbox(
        project.dataset.image,
        project.dataset.title
      );

    }
  );


  lightboxClose?.addEventListener(
    "click",
    closeLightbox
  );


  lightbox?.addEventListener(
    "click",
    function (event) {

      if (event.target === lightbox) {
        closeLightbox();
      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (
        event.key === "Escape" &&
        lightbox?.classList.contains("open")
      ) {
        closeLightbox();
      }

    }
  );


  await loadPortfolio();

});