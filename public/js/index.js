const socket = io();

let username;

Swal.fire({
  title: "Identificate",
  input: "text",
  text: "Ingrese su nombre de usuario",
  inputValidator: (value) => {
    return !value && "Este campo es obligatorio";
  },
  allowOutsideClick: false,
}).then((result) => {
  console.log(result);
  username = result.value;
});

const chatInput = document.getElementById("chat-input");
chatInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    const input = chatInput.value;
    if (input.trim().length > 0) {
      socket.emit("chat-message", { username, message: input });
      chatInput.value = "";
    }
  }
});

const messagesPanel = document.getElementById("messages-panel");
socket.on("messages", (data) => {
  console.log(data);
  let messages = "";

  data.forEach((m) => {
    messages += `<b>${m.username}:</b> ${m.message}</br>`;
  });

  messagesPanel.innerHTML = messages;
});

socket.on("new-user", (username) => {
    Swal.fire({
        title: `${username} se ha conectado`,
        toast: true,
        position: "top-end",
      });
});

// socket.on("user-connected", (username) => {
//   Swal.fire({
//     title: `${username} se ha conectado`,
//     toast: true,
//     position: "top-end",
//   });
// });
