# nuxt-mock-server

## 1.7.0

### Minor Changes

- [#111](https://github.com/SoaresMG/nuxt-mock-server/pull/111) [`556e669`](https://github.com/SoaresMG/nuxt-mock-server/commit/556e6699b7ed32af166f8d930567bfe943d5eaed) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Added pause/resume mechanism for the whole mock-server

### Patch Changes

- [#109](https://github.com/SoaresMG/nuxt-mock-server/pull/109) [`5b314a3`](https://github.com/SoaresMG/nuxt-mock-server/commit/5b314a3ac893388c1d45bd05a27d8355604152dd) Thanks [@SoaresMG](https://github.com/SoaresMG)! - generatePreset utility must have cleanUnused as optional

## 1.6.0

### Minor Changes

- [#104](https://github.com/SoaresMG/nuxt-mock-server/pull/104) [`7ad48f7`](https://github.com/SoaresMG/nuxt-mock-server/commit/7ad48f731e459fd79cadae823812718a1e8d8133) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add possibility of cleaning unused mocks when generating

- [#104](https://github.com/SoaresMG/nuxt-mock-server/pull/104) [`7ad48f7`](https://github.com/SoaresMG/nuxt-mock-server/commit/7ad48f731e459fd79cadae823812718a1e8d8133) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Separate mock and meta by using a manifest.json

### Patch Changes

- [#98](https://github.com/SoaresMG/nuxt-mock-server/pull/98) [`2ba7c7a`](https://github.com/SoaresMG/nuxt-mock-server/commit/2ba7c7a443fc7f4bac5305a25f92034dad461535) Thanks [@renovate](https://github.com/apps/renovate)! - Update all non-major dependencies

- [#100](https://github.com/SoaresMG/nuxt-mock-server/pull/100) [`217eb0e`](https://github.com/SoaresMG/nuxt-mock-server/commit/217eb0e0f92b3c15f0b03ec9842e91df8e9a461f) Thanks [@renovate](https://github.com/apps/renovate)! - Update to sirv@3

- [#106](https://github.com/SoaresMG/nuxt-mock-server/pull/106) [`f79a9da`](https://github.com/SoaresMG/nuxt-mock-server/commit/f79a9da897465159ad65efbfb9346231dd644239) Thanks [@SoaresMG](https://github.com/SoaresMG)! - getPresets was failing since manifest.json was not excluded from possible entries

## 1.5.3

### Patch Changes

- [#102](https://github.com/SoaresMG/nuxt-mock-server/pull/102) [`e587b17`](https://github.com/SoaresMG/nuxt-mock-server/commit/e587b1723c55259fb6dac95073179668bdf1fe54) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Remove pathMatch from the enabled log if auto is not enabled

- [#102](https://github.com/SoaresMG/nuxt-mock-server/pull/102) [`e587b17`](https://github.com/SoaresMG/nuxt-mock-server/commit/e587b1723c55259fb6dac95073179668bdf1fe54) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add progress indication during route mock generation

## 1.5.2

### Patch Changes

- [#92](https://github.com/SoaresMG/nuxt-mock-server/pull/92) [`d556083`](https://github.com/SoaresMG/nuxt-mock-server/commit/d556083b971b473218502db49dbb9991ca74b4a5) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Expose definePresetHandler

## 1.5.1

### Patch Changes

- [#90](https://github.com/SoaresMG/nuxt-mock-server/pull/90) [`bdefbd2`](https://github.com/SoaresMG/nuxt-mock-server/commit/bdefbd22b7aa02da06c7e293ccdf65adbfb11e24) Thanks [@SoaresMG](https://github.com/SoaresMG)! - When mocks.enabled was undefined it was not considering nuxt.isDev

## 1.5.0

### Minor Changes

- [#49](https://github.com/SoaresMG/nuxt-mock-server/pull/49) [`4228195`](https://github.com/SoaresMG/nuxt-mock-server/commit/42281951156098e23e7fb32cd74bf628553ec762) Thanks [@rubensilva3](https://github.com/rubensilva3)! - Add initial docs page

### Patch Changes

- [#81](https://github.com/SoaresMG/nuxt-mock-server/pull/81) [`3ff885f`](https://github.com/SoaresMG/nuxt-mock-server/commit/3ff885fd4af52290b839be0a2c6a82cfb489a207) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Forward headers when requesting during mock generation

## 1.4.5

### Patch Changes

- [#79](https://github.com/SoaresMG/nuxt-mock-server/pull/79) [`b1ba6bd`](https://github.com/SoaresMG/nuxt-mock-server/commit/b1ba6bdc28c02ac336f1551a219e0d02a9009266) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Generation not working since due to missing option `generate`

## 1.4.4

### Patch Changes

- [#77](https://github.com/SoaresMG/nuxt-mock-server/pull/77) [`2e0d91d`](https://github.com/SoaresMG/nuxt-mock-server/commit/2e0d91dc8269bd97e7d6adde6346f0234bfe8ef1) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Routes not generating when the only provided ones come from `mock-server:extendRoutes`

## 1.4.3

### Patch Changes

- [#75](https://github.com/SoaresMG/nuxt-mock-server/pull/75) [`d6a4c25`](https://github.com/SoaresMG/nuxt-mock-server/commit/d6a4c25cad175dbb72a33c1de72f0144a78cd2cf) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add generatePreset on useMockServer composable

- [#75](https://github.com/SoaresMG/nuxt-mock-server/pull/75) [`d6a4c25`](https://github.com/SoaresMG/nuxt-mock-server/commit/d6a4c25cad175dbb72a33c1de72f0144a78cd2cf) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Rearrange routes to match /presets/[id]/<action>

## 1.4.2

### Patch Changes

- [#71](https://github.com/SoaresMG/nuxt-mock-server/pull/71) [`f9583fa`](https://github.com/SoaresMG/nuxt-mock-server/commit/f9583fa45f88e6a7041d572cc8bd76331d73e841) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Forward all headers on the original request

## 1.4.1

### Patch Changes

- [#67](https://github.com/SoaresMG/nuxt-mock-server/pull/67) [`5b4d7e3`](https://github.com/SoaresMG/nuxt-mock-server/commit/5b4d7e3428bd6c8c01168a880d5dda99894d2062) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Replace `suppressAllLogs` with `debug` option

- [#69](https://github.com/SoaresMG/nuxt-mock-server/pull/69) [`1f31664`](https://github.com/SoaresMG/nuxt-mock-server/commit/1f3166483bee18c285f9a9bc0cf6399947274a1c) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Replace `options.preset` by `options.defaultPreset`

- [#69](https://github.com/SoaresMG/nuxt-mock-server/pull/69) [`1f31664`](https://github.com/SoaresMG/nuxt-mock-server/commit/1f3166483bee18c285f9a9bc0cf6399947274a1c) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add option to disable devtools partially (create, delete, generate presets)

## 1.4.0

### Minor Changes

- [#59](https://github.com/SoaresMG/nuxt-mock-server/pull/59) [`ce3924c`](https://github.com/SoaresMG/nuxt-mock-server/commit/ce3924c7761b419f0571feb76d386722098461c8) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Ability to switch between selective/auto mode

- [#54](https://github.com/SoaresMG/nuxt-mock-server/pull/54) [`07cd200`](https://github.com/SoaresMG/nuxt-mock-server/commit/07cd20032d3970d82ab599f750156efddd2e989c) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add ability to not swap the preset on deleting it

- [#65](https://github.com/SoaresMG/nuxt-mock-server/pull/65) [`e9a5cb0`](https://github.com/SoaresMG/nuxt-mock-server/commit/e9a5cb017c05385607498e9d41e5d1c186ff571f) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add ability to generate mocks based on a route list

- [#65](https://github.com/SoaresMG/nuxt-mock-server/pull/65) [`e9a5cb0`](https://github.com/SoaresMG/nuxt-mock-server/commit/e9a5cb017c05385607498e9d41e5d1c186ff571f) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add `mock-server:extendOptions` build hook and `mock-server:extendRoutes` runtime hook

### Patch Changes

- [#62](https://github.com/SoaresMG/nuxt-mock-server/pull/62) [`1ccfce3`](https://github.com/SoaresMG/nuxt-mock-server/commit/1ccfce3161577b724511570c929ca015a2e5a774) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Removed warning during build due to `sirv` being a devDep instead of a normal dependency

- [#63](https://github.com/SoaresMG/nuxt-mock-server/pull/63) [`b0a74a8`](https://github.com/SoaresMG/nuxt-mock-server/commit/b0a74a8c5d7723e477a6b82e5ee53e29c82b00c9) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Replace yarn for pnpm to comply with standard nuxt-modules

- [#60](https://github.com/SoaresMG/nuxt-mock-server/pull/60) [`300a737`](https://github.com/SoaresMG/nuxt-mock-server/commit/300a737d6342ab314152b8f5054bb4cb2810b9d6) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add `isCurrent` into Preset and disable `set as current` on the current one

- [#61](https://github.com/SoaresMG/nuxt-mock-server/pull/61) [`06a2ca4`](https://github.com/SoaresMG/nuxt-mock-server/commit/06a2ca4fd3964c2cc5b486cba67e372225d2ef48) Thanks [@SoaresMG](https://github.com/SoaresMG)! - setPreset and deletePreset not working as expected

- [#56](https://github.com/SoaresMG/nuxt-mock-server/pull/56) [`d066fb3`](https://github.com/SoaresMG/nuxt-mock-server/commit/d066fb3c38a21a9c9d4e58850bb4e7a758f0e2c4) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Override module options with runtimeConfig.mockServer

## 1.3.0

### Minor Changes

- [#47](https://github.com/SoaresMG/nuxt-mock-server/pull/47) [`9c2f7c5`](https://github.com/SoaresMG/nuxt-mock-server/commit/9c2f7c5e622a04469555ab94fde38fbb81f5808e) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Rework module utils

- [#50](https://github.com/SoaresMG/nuxt-mock-server/pull/50) [`f06c4aa`](https://github.com/SoaresMG/nuxt-mock-server/commit/f06c4aade95036b918f6b36fa8f37d504ff1d672) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add nitro util useMockServer

## 1.2.0

### Minor Changes

- [#35](https://github.com/SoaresMG/nuxt-mock-server/pull/35) [`99fcfe8`](https://github.com/SoaresMG/nuxt-mock-server/commit/99fcfe875783262565811ce9e2d4dadcc88a54d5) Thanks [@SoaresMG](https://github.com/SoaresMG)! - Add presets and preset management tools

## 1.1.1

### Patch Changes

- [#32](https://github.com/SoaresMG/nuxt-mock-server/pull/32) [`445fe2f`](https://github.com/SoaresMG/nuxt-mock-server/commit/445fe2f64ec591aab2f85b68b59e1b82bc5468da) Thanks [@SoaresMG](https://github.com/SoaresMG)! - fix: remove compress unused option

## 1.1.0

### Minor Changes

- [#24](https://github.com/SoaresMG/nuxt-mock-server/pull/24) [`cfcffab`](https://github.com/SoaresMG/nuxt-mock-server/commit/cfcffabfbc7c12f98d0f03a4972e898662098f00) Thanks [@SoaresMG](https://github.com/SoaresMG)! - ci: replace semantic-release with changesets

### Patch Changes

- [#26](https://github.com/SoaresMG/nuxt-mock-server/pull/26) [`2b240a0`](https://github.com/SoaresMG/nuxt-mock-server/commit/2b240a089875387f3ef5b528114a374dd8289049) Thanks [@SoaresMG](https://github.com/SoaresMG)! - ci: add project name on changesets changelog

- [#27](https://github.com/SoaresMG/nuxt-mock-server/pull/27) [`df95783`](https://github.com/SoaresMG/nuxt-mock-server/commit/df9578311878f5544f854a879404d31811265d4f) Thanks [@SoaresMG](https://github.com/SoaresMG)! - ci: fix repo name
