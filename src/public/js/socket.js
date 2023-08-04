// * FRONT

const socket = io();


socket.on("sendAllProducts", (product) => {
  upProducts(product);
});

function upProducts(product) {
  const container = document.getElementById("list-products");
  let prods = "";

  product.forEach((e) => {
    prods += `
            <form action="" method="">
                <article id="list-products">
                <div class="row">
                    <div class="col s12 m7">
                    <div class="card">
                        <div class="card-image">
                            <img src="${e.thumbnail}">
                            <span class="card-title">${e.title}</span>
                        </div>
                        <div class="card-content">
                            <p> ${e.description}</p>
                            <p> Categoria: ${e.categoria}</p>
                            <p> Precio: $${e.price}</p>
                            <p> Stock: ${e.stock} unidad/es</p>
                        </div>
                        
                    </div>
                    </div>
                </div>
                </article>
            </form> `;
  });

  container.innerHTML = prods;
}

let form = document.getElementById("add-products");
form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const stock = document.getElementById("stock").value;
  const code = document.getElementById("code").value;
  const price = document.getElementById("price").value;
  const categoria = document.getElementById("category").value;
  const thumbnail = document.getElementById("thumbnail").value;

  socket.emit("addProducts", {
    title,
    description,
    stock,
    thumbnail,
    categoria,
    price,
    code,
  });
});

document.getElementById("delete-products").addEventListener("submit", (event) => {
  event.preventDefault();

  const dltedinput = document.getElementById("id-prod-input");
  const deleteid = parseInt(dltedinput.value);
  socket.emit("deleteProduct", deleteid);
  dltedinput.value = "";
});

socket.on("upProds", (product) => {
  upProducts(product);
});
