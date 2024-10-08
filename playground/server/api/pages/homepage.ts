import { faker } from "@faker-js/faker";
import { wait } from "../../utils/wait";
import { defineMockInterceptorHandler } from "#imports";

export default defineMockInterceptorHandler(async () => {
  await wait(2000);

  return {
    id: faker.string.uuid(),
    title: faker.company.name(),
    logo: faker.image.url(),
    products: faker.helpers.multiple(() => {
      const name = faker.commerce.product();

      return {
        title: name,
        imageUrl: faker.image.url(),
        link: `/product/${name}`,
      };
    }, { count: 100 }),
  };
});
