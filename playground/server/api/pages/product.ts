import { faker } from "@faker-js/faker";
import { wait } from "../../utils/wait";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await wait(2000);

  const slug = query.slug?.toString();

  return {
    id: faker.string.uuid(),
    slug,
    productName: faker.commerce.product(),
    price: faker.commerce.price(),
    description: faker.commerce.productDescription(),
    imageUrl: faker.image.url(),
  };
});
