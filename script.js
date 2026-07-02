const intro = document.getElementById("intro");
const skipIntro = document.getElementById("skipIntro");
const navLinks = document.querySelectorAll("[data-page]");
const pages = document.querySelectorAll(".page");
const menu = document.querySelector(".main-nav");
const menuToggle = document.querySelector(".menu-toggle");

document.body.classList.add("no-scroll");

function closeIntro() {
  intro.classList.add("hide");
  document.body.classList.remove("no-scroll");
  setTimeout(() => intro.remove(), 700);
}

setTimeout(closeIntro, 3400);
skipIntro.addEventListener("click", closeIntro);

function showPage(pageId) {
  pages.forEach(page => {
    page.classList.toggle("active-page", page.id === pageId);
  });

  document.querySelectorAll(".nav-link").forEach(link => {
    link.classList.toggle("active", link.dataset.page === pageId);
  });

  menu.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
  window.scrollTo({ top: 0, behavior: "smooth" });
  history.replaceState(null, "", `#${pageId}`);
}

navLinks.forEach(link => {
  link.addEventListener("click", event => {
    event.preventDefault();
    showPage(link.dataset.page);
  });
});

menuToggle.addEventListener("click", () => {
  const isOpen = menu.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

const initialPage = location.hash.replace("#", "");
if (initialPage && document.getElementById(initialPage)) {
  showPage(initialPage);
}
