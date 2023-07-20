// * FRONT

const socket = io();
console.log("hola front")


socket.on("sendAllProducts",(p)=>{
    upProducts(p)
})

function upProducts(p){
    const container = document.getElementById("list-products")
    const prods = "";

    p.forEach((e) => {
        prods += `
        <form action="" method="post">
    <article id="list-products">
    <div>
        <img src="${e.thumbnail}" alt="">
    <ul>

        <li>
            Titulo: ${e.title}
        </li>
        <li>
            Descripción: ${e.description}
        </li>
        <li>
            Precio: ${e.price}
        </li>
        <li>
            Stock: ${e.stock}
        </li>
    </ul>
    </div>
    </article>

    
</form>`
    });

container.innerHTML = prods;
}

let form = document.getElementById("form-real-time-prods")
form.addEventListener("add-btn",(event)=>{
    event.preventDefault()
   
    socket.emit("addProducts",{
        title,
        description,
        stock,
        thumbnail,
        categoria,
        price,
        code,

    })
})

document.getElementById("delete-btn").addEventListener("click", function () {
    const dltedinput = document.getElementById("id-prod-input");
    const deleteid = parseInt(dltedinput.value);
    socket.emit("deleteProduct", deleteid);
    dltedinput.value = "";
  });
socket.on("upProds", (p) => {
  upProducts(p);
});


