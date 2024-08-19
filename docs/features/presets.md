---
title: Presets
---

# Presets

## What's a Preset?

A preset is a group of mocks that are to be used together.

A real-world example would be to have a "normal" preset and a "black friday" preset where it would have specific content for that event.

To be honest there are multiple ways to use this, it could also be used as a "country" if your application is multi-tenant and each tenant has its very distinct data.

## How to use it?

You can manage presets through the <a href="./devtools">devtools tab</a>.

You can also use the <a href="../utilities/use-mock-server.md">`useMockServer`</a> composable to manage presets programmatically.

See <a href="./devtools">devtools</a> for more examples on how to use it.


## Why do I need a `default` preset?

The default preset is the preset that will be used if no other preset is set.

Meaning that if the cookie used by the Mock Server is not present, it will use the `default` preset. 

See <a href="../configuration#defaultpreset">`defaultPreset`</a>.