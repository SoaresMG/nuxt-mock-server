import { faker } from "@faker-js/faker";
import { wait } from "../../utils/wait";
import { defineEventHandler, getQuery } from "#imports";

export default defineEventHandler(async (event) => {
  const query = getQuery(event);

  await wait(2000);

  const slug = query.slug?.toString();

  if (slug?.includes("devtools") || slug === "test-error-slug") {
    throw new Error(`The page with slug "${slug}" does not exist`);
  }

  return {
    slug,
    id: faker.string.uuid(),
    title: faker.company.name(),
    sections: faker.helpers.multiple(() => ({
      title: faker.company.catchPhrase(),
      description: faker.company.buzzPhrase(),
      imageUrl: faker.image.url(),
    }), { count: 100 }),
    products: faker.helpers.multiple(() => {
      const name = faker.commerce.product();

      return {
        title: name,
        imageUrl: faker.image.url(),
        link: `/product/${name}`,
      };
    }, { count: 100 }),
    metadata: {
      title: faker.company.name(),
      description: faker.company.catchPhrase(),
      imageUrl: faker.image.url(),
    },
  };
});
