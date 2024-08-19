---
title: useMockServer
---

# `useMockServer`

This composable is the main entry point for the `nuxt-mock-server` module. It allows you to interact with the mock server in a more programmatic way.

It currently exports five utilities which can be called to manage everything <a href="./presets">preset</a> wise.

This composable only works in a nitro's request context, meaning that it receives an `H3Event`.

::: tip
There is no need to import this composable, it's already available through auto-imports.
:::

## `getPresets`

This function returns all the presets that are currently available in the mock server.

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    return mockServer.getPresets();
});
```

## `getPreset`

Similar to `getPresets` except that it returns only one preset.

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    const query = getQuery(event);
    return mockServer.getPreset(query.toString());
});
```

## `existsPreset`

This function checks if a preset exists.

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    const query = getQuery(event);
    return mockServer.existsPreset(query.toString());
});
```

## `setPreset`

This function sets the given preset as the current one.

::: tip
If the given preset does not exist, it will be created.
:::

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    const query = getQuery(event);
    return mockServer.setPreset(query.toString());
});
```

## `deletePreset`

This function deletes the given preset.

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    const query = getQuery(event);
    return mockServer.deletePreset(query.toString());
});
```

::: warning
The mock-server always needs a current preset, this means that if the current one is deleted, the first in the list (alphabetic) will be set.

There is no clear strategy to handle this yet but it's something that will be tackled soon.
An alternative is to set a default preset by yourself after deleting it.
:::

## `generatePreset`

This function generates mocks for a preset based on the provided routes.
If no routes are provided at all, from any of the sources it won't generate anything.

Check the examples about configuring routes <a href="../configuration#defining-options">here</a>.

```ts
export default defineEventHandler((event) => {
    const mockServer = useMockServer(event);
    const query = getQuery(event);
    return mockServer.generatePreset(query.toString());
});
```