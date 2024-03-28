//FRONT


  let form = document.getElementById("loginForm")
form.addEventListener("submit", async (event) => {
  event.preventDefault();
  let correo = document.getElementById("email").value;
  let password = document.getElementById("password").value;

  // const data = new FormData(form);
   const obj = {correo,password};

  // data.forEach((value, key) => (obj[key] = value));
  try {
    const response2 = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("secretToken")}`
    },
    body: JSON.stringify({correo,password}),
  });

  const responseData = await response2.json();

  if (response2.ok) {
    
    localStorage.setItem("secretToken", responseData.secretToken);
    window.location.href = "/products";
  } else {
    alert("No se pudo iniciar sesion" + responseData.token);
  }


  } catch (error) {
    console.error("Error en la solicitud:", error);
    alert("datos incorrectos")
  }

  
});








