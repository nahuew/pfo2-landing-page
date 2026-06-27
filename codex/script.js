const body = document.body;
const navToggle = document.querySelector(".nav-toggle");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu a");
const contactForm = document.querySelector(".contact-form");
const formStatus = document.querySelector(".form-status");

const closeMenu = () => {
  body.classList.remove("nav-open");
  navToggle.setAttribute("aria-expanded", "false");
  navToggle.setAttribute("aria-label", "Abrir menu de navegacion");
};

navToggle.addEventListener("click", () => {
  const isOpen = body.classList.toggle("nav-open");

  navToggle.setAttribute("aria-expanded", String(isOpen));
  navToggle.setAttribute(
    "aria-label",
    isOpen ? "Cerrar menu de navegacion" : "Abrir menu de navegacion"
  );
});

navLinks.forEach((link) => {
  link.addEventListener("click", closeMenu);
});

document.addEventListener("keyup", (event) => {
  if (event.key === "Escape") {
    closeMenu();
  }
});

contactForm.addEventListener("submit", (event) => {
  event.preventDefault();

  formStatus.textContent =
    "Mensaje preparado para envio. Esta demo no requiere backend funcional.";
  contactForm.reset();
});
