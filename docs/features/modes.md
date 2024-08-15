---
title: Modes
---

# Modes

The module has two modes of operation: `auto` and/or `selective`.

::: info
The recommended mode is `selective` as it's the less complex mode.
:::

## Auto

In this mode, the module will intercept all requests made to the server and try to match them with the mock files located in the `mockDir` directory.

To match the route it uses `pathMatch` which is a regular expression that will be used to match the route's path.

::: tip
This mode is enabled by default.
See <a href="../configuration#auto">options.auto</a> on how to disable the auto mode.
:::

## Selective

In this mode, the module will only intercept the requests whose routes are explicitly defined with `defineMockInterceptorHandler`.

### Example

```ts
export default defineMockInterceptorHandler((event) => {
    const { cms } = getRuntimeConfig(event);
    const data = getDataFromCms(cms);
    return data;
})
```

This mode doesn't need to be "enabled", it's always available as long as the handler is used.

## Hybrid

It's possible to use both modes at the same time.

Imagine you have the following routes:

- `/api/users`
- `/api/users/:id`
- `/my-other-route`
- `/api/v2/users`
- `/api/v2/users/:id`

And you only want to intercept the routes that start with `/api/v2` and `/my-other-route`.

You can have the following configuration:

```ts
export default defineNuxtConfig({
  modules: ["nuxt-mock-server"],

  mocks: {
    auto: true,
    pathMatch: "^\\/api\\/v2\\/.*$",
  },  
});
```

And use `defineMockInterceptorHandler` instead of `defineEventHandler` for the other route:

```ts
export default defineMockInterceptorHandler((event) => {
    /* Your handler code */
})
```
