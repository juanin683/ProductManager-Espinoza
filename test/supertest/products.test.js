import supertest from "supertest";

const requester = supertest(`http://localhost:${process.env.PORT}/api`);

describe("Testeando gestion de usuarios y productos", () => {
  let uid = null;
  let pid = null;
  let cookie = null;
  it("Testeando que se registra un usuario", async () => {
    let dataOwner = {
      first_name,
      last_name,
      email,
      password,
    };
    let response = await requester.post("/register").send(dataOwner);
    let { _body, statusCode } = response;
    uid = _body.payload;
    expect(statusCode).to.be.equals(201);
  });

  it("Testeando que el usuario inicia sesión", async () => {
    let dataOwner = { email, password};
    let response = await requester.post("/login").send(dataOwner);
    let { headers } = response;
    
    cookie = {
      name: headers["set-cookie"][0].split("=")[0],
      value: headers["set-cookie"][0].split("=")[1],
    };

    expect(cookie.name).to.be.equals("token");
    expect(cookie.value).to.be.ok;
  });

  it("Testeando que el usuario puede cargar una producto al sistema", async () => {
    let dataOwner = { name, price };
    let response = await requester
      .post("/products")
      .send(dataOwner)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let { _body, statusCode } = response;
    pid = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });

  it("Testeando que la lectura devuelve un array de productos", async () => {
    const response = await requester.get("/products");
    const { _body } = response;
    expect(Array.isArray(_body.payload)).to.be.equals(true);
  });

  it("Testeando que la lectura devuelve un array de objetos", async () => {
    const response = await requester.get("/products");
    const { _body } = response;
    expect(_body.payload[0]).to.be.a("object");
  });

  it("Testeando que la producto se actualiza y devuelve status=200", async () => {
    const dataOwner = { name };
    const response = await requester
      .put("/products/" + pid)
      .send(dataOwner)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });

  it("Testeando que se borran los datos de prueba", async () => {
    let response = await requester
      .delete("/products/" + pid)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let result = await requester.delete("/users/" + uid);
    let { statusCode } = response;
    let { _body } = result;
    expect(_body.message).to.be.equals("User deleted");
    expect(statusCode).to.be.equals(200);
  });

});
