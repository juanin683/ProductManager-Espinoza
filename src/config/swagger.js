import __dirname from "../../utils.js";

const options = {
  definition: {
    openapi: "3.0.1",
    info: {
      title: "Ecomerce PETSHOP!",
      description: "API of Ecommerce PETSHOP!",
    },
  },
  apis: [__dirname + "/src/config/docs/*.yaml"],
};

export default options;