//FRONT

let form = document.getElementById("loginForm");

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const obj = {};

  data.forEach((value, key) => (obj[key] = value));

  
  const response2 = await fetch("http://localhost:8080/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(obj),
  });

  const responseData = await response2.json();
  
  if (responseData.error) {
    return alert("No se ha podido iniciar sesion");
  }
  localStorage.setItem("accessToken", responseData.accessToken);
});

//registro

let registerForm = document.getElementById("registerForm");

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

  const response2 = await fetch("http://localhost:8080/api/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      
    },
    body: JSON.stringify(dataNewUser),
  });

  const registerData = await response2.json();
  
  if (registerData.error) {
    return alert("No se ha podido registrar el usuario");
  }
  localStorage.setItem("accessToken", registerData.accessToken);
})
