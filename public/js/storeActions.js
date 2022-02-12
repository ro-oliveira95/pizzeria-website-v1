const socket = io();

const formStatus = document.querySelector("#form-status");

formStatus.addEventListener("submit", (e) => {
  e.preventDefault();
  socket.emit("updateStatusStore");
});
