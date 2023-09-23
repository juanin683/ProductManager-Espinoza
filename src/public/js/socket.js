// * FRONT

 const socket = io("http://localhost:8080/chat");


socket.on("sendMessage", (message) => {
  chatFunction(message);
});

 function chatFunction(message) {
  const container = document.getElementById("chat");
  let msg = "";

  message.forEach((e) => {
    msg += `
    <h2>Chat</h2>
    <h3>${e.user}</h3>
    
    <textarea  id = " msg" name="textarea" rows="10" cols="50">${e.message}</textarea>
    <button class="navbar-toggler" type="submit" id="send-message"     name="">
        <span class="navbar-toggler-icon"></span>
      </button>
      <button class="navbar-toggler" type="submit"  id="delete-messages"  name="">
        <span class="navbar-toggler-icon"></span>
      </button>
    
    </form> `;
  });

  container.innerHTML = msg;
}

let form = document.getElementById("send-message");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const user = document.getElementById("user").value;
  const text = document.getElementById("msg").value;

  socket.emit("createMessage", {
    user,
    message 
  });
});

document.getElementById("delete-messages").addEventListener("submit", (event) => {
  event.preventDefault();

  const dltedinput = document.getElementById("msg");
  const deleteid = dltedinput.value;
  socket.emit("deleteAllMessages", deleteid);
  dltedinput.value = "";
});

socket.on("sendMessages", (messages) => {
  chatFunction(messages);
});
