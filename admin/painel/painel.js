document.addEventListener("DOMContentLoaded", async function () {

  const userEmail =
    document.getElementById("userEmail");

  const logoutButton =
    document.getElementById("logoutButton");


  const {
    data: { session },
    error
  } =
    await supabaseClient.auth.getSession();


  if (error || !session) {

    window.location.href = "/admin/";

    return;
  }


  userEmail.textContent =
    session.user.email;


  logoutButton.addEventListener(
    "click",
    async function () {

      logoutButton.disabled = true;

      logoutButton.textContent =
        "Saindo...";


      await supabaseClient.auth.signOut();


      window.location.href =
        "/admin/";

    }
  );

});