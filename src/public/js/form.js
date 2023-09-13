//FRONT

let form = document.querySelector("#loginForm");

form?.addEventListener("submit", async (event) => {
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

let registerForm = document.querySelector("#registerForm");

registerForm?.addEventListener("submit", async (event) => {
  event.preventDefault();
      let firstName = document.getElementById("name").value;
      let lastName = document.getElementById("lastname").value;
      let age = document.getElementById("age").value;
      let email = document.getElementById("email").value;
      let password = document.getElementById("password").value;

  
      let dataNewUser = {
        name: firstName,
        lastname: lastName,
        age: age,
        email: email,
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
