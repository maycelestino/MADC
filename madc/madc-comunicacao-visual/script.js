document.addEventListener("DOMContentLoaded", function () {
  const menuToggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelectorAll(".nav a");

  if (menuToggle && nav) {
    menuToggle.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (nav && menuToggle) {
        nav.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  const currentPage = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href") || "";
    const linkPage = href.split("#")[0] || "index.html";
    const isActive = linkPage === currentPage;

    link.classList.toggle("active", isActive);

    if (isActive) {
      link.setAttribute("aria-current", "page");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  const phoneInput = document.getElementById("telefone");

  if (phoneInput) {
    phoneInput.addEventListener("input", function () {
      let value = phoneInput.value.replace(/\D/g, "");

      value = value.slice(0, 11);

      if (value.length === 0) {
        phoneInput.value = "";
        return;
      }

      if (value.length <= 2) {
        phoneInput.value = `(${value}`;
        return;
      }

      if (value.length <= 6) {
        phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
        return;
      }

      if (value.length <= 10) {
        phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 6)}-${value.slice(6)}`;
        return;
      }

      phoneInput.value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    });

    phoneInput.addEventListener("blur", function () {
      if (phoneInput.value === "(") {
        phoneInput.value = "";
      }
    });
  }
  const customSelect = document.getElementById("customSelect");
  const customSelectButton = document.querySelector(".custom-select-button");
  const customSelectButtonText = document.querySelector(".custom-select-button span");
  const customSelectOptions = document.querySelectorAll(".custom-select-options li");
  const servicoInput = document.getElementById("servico");

  if (customSelect && customSelectButton && servicoInput) {
    customSelectButton.addEventListener("click", function () {
      customSelect.classList.toggle("open");
    });

    customSelectOptions.forEach(function (option) {
      option.addEventListener("click", function () {
        const value = option.getAttribute("data-value");

        servicoInput.value = value;
        customSelectButtonText.textContent = value;
        customSelectButton.classList.add("selected");

        customSelectOptions.forEach(function (item) {
          item.classList.remove("selected");
        });

        option.classList.add("selected");
        customSelect.classList.remove("open");
      });
    });

    document.addEventListener("click", function (event) {
      if (!customSelect.contains(event.target)) {
        customSelect.classList.remove("open");
      }
    });
  }
});

const contactForm = document.querySelector(".contact-form");

if (contactForm && servicoInput) {
  contactForm.addEventListener("submit", function (event) {
    if (!servicoInput.value) {
      event.preventDefault();
      customSelect.classList.add("open");
      customSelectButton.focus();
    }
  });
}