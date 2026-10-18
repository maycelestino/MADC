document.addEventListener("DOMContentLoaded", function () {

  const loginForm =
    document.getElementById("loginForm");

  const emailInput =
    document.getElementById("email");

  const passwordInput =
    document.getElementById("password");

  const togglePassword =
    document.getElementById("togglePassword");

  const loginMessage =
    document.getElementById("loginMessage");

  const loginButton =
    loginForm?.querySelector(".login-button");


  function showMessage(message, type = "error") {

    if (!loginMessage) {
      return;
    }

    loginMessage.textContent = message;

    loginMessage.classList.remove(
      "error",
      "success"
    );

    loginMessage.classList.add(type);
  }


  function clearMessage() {

    if (!loginMessage) {
      return;
    }

    loginMessage.textContent = "";

    loginMessage.classList.remove(
      "error",
      "success"
    );
  }


  if (togglePassword && passwordInput) {

    togglePassword.addEventListener(
      "click",
      function () {

        const isPassword =
          passwordInput.type === "password";

        passwordInput.type =
          isPassword
            ? "text"
            : "password";

        togglePassword.textContent =
          isPassword
            ? "Ocultar"
            : "Mostrar";

        togglePassword.setAttribute(
          "aria-label",
          isPassword
            ? "Ocultar senha"
            : "Mostrar senha"
        );

      }
    );

  }


  if (loginForm) {

    loginForm.addEventListener(
      "submit",
      async function (event) {

        event.preventDefault();

        clearMessage();


        const email =
          emailInput.value.trim();

        const password =
          passwordInput.value;


        if (!email || !password) {

          showMessage(
            "Preencha o e-mail e a senha."
          );

          return;
        }


        loginButton.disabled = true;

        loginButton.textContent =
          "Entrando...";


        try {

          const {
            data,
            error
          } =
            await supabaseClient.auth
              .signInWithPassword({
                email,
                password
              });


          if (error) {

            console.error(error);

            showMessage(
              "E-mail ou senha inválidos."
            );

            return;
          }


          if (!data.session) {

            showMessage(
              "Não foi possível iniciar sua sessão."
            );

            return;
          }


          window.location.href =
            "/admin/painel/";


        } catch (error) {

          console.error(error);

          showMessage(
            "Não foi possível conectar ao servidor. Tente novamente."
          );

        } finally {

          loginButton.disabled = false;

          loginButton.textContent =
            "Entrar";

        }

      }
    );

  }

});