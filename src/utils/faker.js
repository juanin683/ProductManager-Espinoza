import { faker } from "@faker-js/faker";

export const generateProductFaker = () => {
    return {
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        _id: faker.database.mongodbObjectId(),
        price: faker.commerce.price(),
        stock: parseInt(faker.number.int({ min: 5, max: 100 })),
        category: faker.commerce.department(),
        thumbnail: [faker.image.url()],
    };
};