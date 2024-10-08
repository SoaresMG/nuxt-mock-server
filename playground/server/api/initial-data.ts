import { faker } from "@faker-js/faker";
import { wait } from "../utils/wait";
import { defineMockInterceptorHandler } from "#imports";

export default defineMockInterceptorHandler(async () => {
  await wait(2000);

  return {
    isLoggedIn: true,
    navbar: {
      logo: faker.image.url(),
      links: faker.helpers.multiple(() => ({
        title: faker.company.name(),
        url: faker.internet.url(),
      }), { count: 5 }),
    },
    footer: {
      logo: faker.image.url(),
      links: faker.helpers.multiple(() => ({
        title: faker.company.name(),
        url: faker.internet.url(),
      }), { count: 5 }),
    },
    user: {
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      job: faker.person.jobType(),
      email: faker.internet.email(),
      roles: faker.helpers.arrayElements([
        "Admin",
        "User",
        "Manager",
        "Guest",
      ], { min: 1, max: 3 }),
    },
  };
});
