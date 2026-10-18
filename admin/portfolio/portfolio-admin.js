document.addEventListener("DOMContentLoaded", async function () {

  const portfolioList =
    document.getElementById("portfolioList");

  const userEmail =
    document.getElementById("userEmail");

  const logoutButton =
    document.getElementById("logoutButton");

  const newProjectButton =
    document.getElementById("newProjectButton");

  const projectModal =
    document.getElementById("projectModal");

  const closeModal =
    document.getElementById("closeModal");

  const modalBackdrop =
    projectModal?.querySelector(".modal-backdrop");

  const modalTitle =
    document.getElementById("modalTitle");

  const projectForm =
    document.getElementById("projectForm");

  const projectId =
    document.getElementById("projectId");

  const tituloInput =
    document.getElementById("titulo");

  const categoriaInput =
    document.getElementById("categoria");

  const descricaoInput =
    document.getElementById("descricao");

  const imagemInput =
    document.getElementById("imagem");

  const ordemInput =
    document.getElementById("ordem");

  const ativoInput =
    document.getElementById("ativo");

  const saveProjectButton =
    document.getElementById("saveProjectButton");

  const formMessage =
    document.getElementById("formMessage");


  let projects = [];


  const {
    data: { session },
    error: sessionError
  } =
    await supabaseClient.auth.getSession();


  if (sessionError || !session) {

    window.location.href = "/admin/";

    return;
  }


  userEmail.textContent =
    session.user.email;


  function showFormError(message) {

    formMessage.textContent = message;

    formMessage.classList.add("error");

  }


  function clearFormMessage() {

    formMessage.textContent = "";

    formMessage.classList.remove("error");

  }


  function openModal(project = null) {

    clearFormMessage();

    projectForm.reset();

    ativoInput.checked = true;

    ordemInput.value = 0;


    if (project) {

      modalTitle.textContent =
        "Editar projeto";

      projectId.value =
        project.id;

      tituloInput.value =
        project.titulo || "";

      categoriaInput.value =
        project.categoria || "";

      descricaoInput.value =
        project.descricao || "";

      ordemInput.value =
        project.ordem ?? 0;

      ativoInput.checked =
        project.ativo;

    } else {

      modalTitle.textContent =
        "Novo projeto";

      projectId.value = "";

    }


    projectModal.classList.add("open");

    projectModal.setAttribute(
      "aria-hidden",
      "false"
    );

  }


  function hideModal() {

    projectModal.classList.remove("open");

    projectModal.setAttribute(
      "aria-hidden",
      "true"
    );

  }


  async function loadProjects() {

    portfolioList.innerHTML =
      '<p class="loading">Carregando projetos...</p>';


    const {
      data,
      error
    } =
      await supabaseClient
        .from("portfolio")
        .select("*")
        .order("ordem", {
          ascending: true
        })
        .order("created_at", {
          ascending: false
        });


    if (error) {

      console.error(error);

      portfolioList.innerHTML =
        '<p class="empty-state">Não foi possível carregar o portfólio.</p>';

      return;
    }


    projects = data || [];


    renderProjects();

  }


  function renderProjects() {

    if (!projects.length) {

      portfolioList.innerHTML =
        '<p class="empty-state">Nenhum projeto cadastrado ainda.</p>';

      return;
    }


    portfolioList.innerHTML =
      projects
        .map(function (project) {

          const {
            data
          } =
            supabaseClient.storage
              .from("portfolio")
              .getPublicUrl(
                project.imagem_path
              );


          const imageUrl =
            data.publicUrl;


          return `
            <article class="portfolio-item">

              <img
                src="${imageUrl}"
                alt="${escapeHtml(project.titulo)}"
              >

              <div class="portfolio-info">

                <h3>
                  ${escapeHtml(project.titulo)}
                </h3>

                <p>
                  ${escapeHtml(project.categoria || "Sem categoria")}
                </p>

                <p>
                  ${
                    project.ativo
                      ? "Ativo"
                      : "Oculto"
                  }
                </p>

              </div>

              <div class="portfolio-actions">

                <button
                  type="button"
                  class="action-button edit-project"
                  data-id="${project.id}"
                >
                  Editar
                </button>

                <button
                  type="button"
                  class="action-button delete delete-project"
                  data-id="${project.id}"
                >
                  Excluir
                </button>

              </div>

            </article>
          `;

        })
        .join("");

  }


  function escapeHtml(value) {

    return String(value)
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");

  }


  function validateImage(file) {

    const allowedTypes = [
      "image/jpeg",
      "image/png",
      "image/webp"
    ];


    if (!allowedTypes.includes(file.type)) {

      throw new Error(
        "Selecione uma imagem JPG, PNG ou WEBP."
      );

    }


    const maxSize =
      5 * 1024 * 1024;


    if (file.size > maxSize) {

      throw new Error(
        "A imagem deve ter no máximo 5 MB."
      );

    }

  }


  async function uploadImage(file) {

    validateImage(file);


    const extension =
      file.name
        .split(".")
        .pop()
        .toLowerCase();


    const fileName =
      `${crypto.randomUUID()}.${extension}`;


    const {
      error
    } =
      await supabaseClient.storage
        .from("portfolio")
        .upload(
          fileName,
          file,
          {
            cacheControl: "3600",
            upsert: false
          }
        );


    if (error) {
      throw error;
    }


    return fileName;

  }


  async function deleteImage(path) {

    if (!path) {
      return;
    }


    const {
      error
    } =
      await supabaseClient.storage
        .from("portfolio")
        .remove([path]);


    if (error) {
      console.error(error);
    }

  }


  projectForm.addEventListener(
    "submit",
    async function (event) {

      event.preventDefault();

      clearFormMessage();


      const id =
        projectId.value;

      const currentProject =
        projects.find(
          project => project.id === id
        );


      const imageFile =
        imagemInput.files[0];


      if (!id && !imageFile) {

        showFormError(
          "Selecione uma imagem para o projeto."
        );

        return;
      }


      saveProjectButton.disabled = true;

      saveProjectButton.textContent =
        "Salvando...";


      let newImagePath = null;


      try {

        if (imageFile) {

          newImagePath =
            await uploadImage(
              imageFile
            );

        }


        const projectData = {

          titulo:
            tituloInput.value.trim(),

          categoria:
            categoriaInput.value.trim() || null,

          descricao:
            descricaoInput.value.trim() || null,

          ordem:
            Number(ordemInput.value) || 0,

          ativo:
            ativoInput.checked

        };


        if (newImagePath) {

          projectData.imagem_path =
            newImagePath;

        }


        if (id) {

          const {
            error
          } =
            await supabaseClient
              .from("portfolio")
              .update(projectData)
              .eq("id", id);


          if (error) {
            throw error;
          }


          if (
            newImagePath &&
            currentProject?.imagem_path
          ) {

            await deleteImage(
              currentProject.imagem_path
            );

          }

        } else {

          const {
            error
          } =
            await supabaseClient
              .from("portfolio")
              .insert({
                ...projectData,
                imagem_path:
                  newImagePath
              });


          if (error) {
            throw error;
          }

        }


        hideModal();

        await loadProjects();


      } catch (error) {

        console.error(error);


        if (newImagePath) {

          await deleteImage(
            newImagePath
          );

        }


        showFormError(
          error.message ||
          "Não foi possível salvar o projeto."
        );


      } finally {

        saveProjectButton.disabled = false;

        saveProjectButton.textContent =
          "Salvar projeto";

      }

    }
  );


  portfolioList.addEventListener(
    "click",
    async function (event) {

      const editButton =
        event.target.closest(
          ".edit-project"
        );

      const deleteButton =
        event.target.closest(
          ".delete-project"
        );


      if (editButton) {

        const project =
          projects.find(
            item =>
              item.id ===
              editButton.dataset.id
          );


        if (project) {
          openModal(project);
        }

      }


      if (deleteButton) {

        const project =
          projects.find(
            item =>
              item.id ===
              deleteButton.dataset.id
          );


        if (!project) {
          return;
        }


        const confirmed =
          window.confirm(
            `Excluir "${project.titulo}"?`
          );


        if (!confirmed) {
          return;
        }


        deleteButton.disabled = true;


        const {
          error
        } =
          await supabaseClient
            .from("portfolio")
            .delete()
            .eq(
              "id",
              project.id
            );


        if (error) {

          console.error(error);

          alert(
            "Não foi possível excluir o projeto."
          );

          deleteButton.disabled = false;

          return;
        }


        await deleteImage(
          project.imagem_path
        );


        await loadProjects();

      }

    }
  );


  newProjectButton.addEventListener(
    "click",
    function () {

      openModal();

    }
  );


  closeModal.addEventListener(
    "click",
    hideModal
  );


  modalBackdrop.addEventListener(
    "click",
    hideModal
  );


  logoutButton.addEventListener(
    "click",
    async function () {

      await supabaseClient.auth.signOut();

      window.location.href =
        "/admin/";

    }
  );


  await loadProjects();

});