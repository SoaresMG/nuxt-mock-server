---
title: definePresetHandler
---

# `definePresetHandler`

This handler is to be used in place of `defineEventHandler` if you need to manually tap into `event.context.preset` to get the current preset.

This utility adds that piece of context to be read by other mock-server utilities.

The correct way to get the information of the current preset is through <a href="./use-mock-server">`useMockServer`</a>.