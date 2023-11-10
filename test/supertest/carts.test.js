import supertest from "supertest";
import env from "../../src/env.js"

const requester = supertest(`http://localhost:${PORT}/api`);

describe("Testeando gestion de carritos", () => {
  let pid = null;
  let cid = null;
  let cookie = null;
  it("Testeando que se agrega un carrito", async () => {
    let dataCart = {
    _id,
      products,
    };
    let response = await requester.post("/carts").send(dataCart);
    let { _body, statusCode } = response;
    cid = _body.payload;
    expect(statusCode).to.be.equals(201);
  });

  it("Testeando que el carrito esta en cookie", async () => {
    let dataCart;
    let response = await requester.post("/carts").send(dataCart);
    let { headers } = response;
    
    cookie = {
      name: headers["set-cookie"][0].split("=")[0],
      value: headers["set-cookie"][0].split("=")[1],
    };

    expect(cookie.name).to.be.equals("token");
    expect(cookie.value).to.be.ok;
  });

  


  it("Testeando que el carrito se actualiza ", async () => {
    let dataCart;
    const response = await requester
      .put("/carts/" + cid)
      .send(dataCart)
      .set("cookie", [cookie.name + "=" + cookie.value]);
   const result2 = await requester.put(response+ pid);

    const { statusCode } = response;
    const { _body } = result2;
    expect(_body.message).to.be.equals("cart updated");
    expect(statusCode).to.be.equals(200);
  });

  it("Testeando que el prod de un carrito se borra", async () => {
    let response = await requester
      .delete("/carts/" + cid)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let result = await requester.delete(response + pid);
    let { statusCode } = result;
    let { _body } = result;
    expect(_body.message).to.be.equals("cart deleted");
    expect(statusCode).to.be.equals(200);
  });

});
