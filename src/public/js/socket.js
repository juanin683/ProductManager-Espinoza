// * FRONT

const socket = io();
console.log("hola front")

socket.on("sendAllProducts",(product)=>{
    upProducts(product)
})

function upProducts(product){
    const container = document.getElementById("list-products")
    let prods = "";
   
    product.forEach(e => {
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
        </form> `
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

socket.on("upProds", (product) => {
    upProducts(product);
});



