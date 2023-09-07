//FRONT

document.addEventListener("DOMContentLoaded", ()=>{
const form = document.getElementById("loginForm");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));
  console.log(obj);

  
  const response = await fetch("/api/login", {
    method: "POST",
    body: JSON.stringify(obj),
    headers: {
      "Content-Type": "application/json",

    },
  });

  const responseData = await response.json();
  
  if (responseData.error) {
    return alert("No se ha podido iniciar sesion");
  }
  localStorage.setItem("accessToken", responseData.accessToken);
});

//registro


const registerForm = document.getElementById("registerForm");

registerForm.addEventListener("submit", async (event) => {
  event.preventDefault();
      const firstName = document.getElementById("name").value;
      const lastName = document.getElementById("lastname").value;
      const age = document.getElementById("age").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

  
      const dataNewUser = {
        name: firstName,
        lastname: lastName,
        email: email,
        age: age,
        password: password,
      };

  const response = await fetch("/api/register", {
    method: "POST",
    body: JSON.stringify(dataNewUser),
    headers: {
      "Content-Type": "application/json",

    },
  });

  const registerData = await response.json();
  
  if (registerData.error) {
    return alert("No se ha podido registrar el usuario");
  }
  localStorage.setItem("accessToken", registerData.accessToken);
})


})