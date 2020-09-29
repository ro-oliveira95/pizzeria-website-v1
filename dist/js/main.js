const expandMenuBtn = document.querySelector(".btn-hamburguer");
const navBar = document.querySelector(".expanded-nav");

expandMenuBtn.addEventListener("click", (e) => {
  e.preventDefault();
  navBar.classList.toggle("menu-show");
});
