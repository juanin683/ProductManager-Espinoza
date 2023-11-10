import "dotenv/config.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest(`http://localhost:${PORT}/api`);

describe("Testeando gestion de usuarios", () => {
  let uid = null;
  let pid = null;
  let cookie = null;
  it("Testeando que se registra un usuario", async () => {
    let data = {
      first_name,
      last_name,
      email,
      password,
    };
    let response = await requester.post("/register").send(data);
    let { _body, statusCode } = response;
    uid = _body.payload;
    expect(statusCode).to.be.equals(201);
  });
  it("Testeando que el usuario inicia sesión", async () => {
    let data = { email, password };
    let response = await requester.post("/login").send(data);
    let { headers } = response;
    cookie = {
      name: headers["set-cookie"][0].split("=")[0],
      value: headers["set-cookie"][0].split("=")[1],
    };
    expect(cookie.name).to.be.equals("token");
    expect(cookie.value).to.be.ok;
  });
  it("Testeando que el usuario puede cargar un prod al sistema", async () => {
    let data = { name, specie };
    let response = await requester
      .post("/products")
      .send(data)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let { _body, statusCode } = response;
    pid = _body.payload._id;
    expect(statusCode).to.be.equals(201);
  });
  

  it("Testeando que el usuario se actualiza ", async () => {
    const data = { name: "juan" };
    const response = await requester
      .put("/user/" + uid)
      .send(data)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    const { statusCode } = response;
    expect(statusCode).to.be.equals(200);
  });
  it("Testeando que se borran los datos de prueba", async () => {
    let response = await requester
      .delete("/user/" + uid)
      .set("cookie", [cookie.name + "=" + cookie.value]);
    let result = await requester.delete("/users/" + uid);
    let { statusCode } = response;
    let { _body } = result;
    expect(_body.message).to.be.equals("User deleted");
    expect(statusCode).to.be.equals(200);
  });
});