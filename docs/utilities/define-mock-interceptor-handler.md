---
title: defineMockInterceptorHandler
---

# `defineMockInterceptorHandler`

This handler is to be used in place of `defineEventHandler` when explicitly defining a route that will be intercepted by the module.

This is used in what we call <a href="./modes#selective">"Selective Mode"</a>.

```ts
export default defineMockInterceptorHandler((event) => {
    const { cms } = getRuntimeConfig(event);
    const data = getDataFromCms(cms);
    return data;
})
```

::: tip
This mode doesn't need to be "enabled", it's always available as long as the handler is used.
:::

If the mockServer is not enabled, this handler will simply call the `next` handler in the chain without any side effects.