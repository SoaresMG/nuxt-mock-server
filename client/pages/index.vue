<template>
  <div>
    <dialog
      :open="isCreatingPreset"
      class="absolute top-[100px] z-10 w-[250px] bg-white dark:bg-black dark:bg-dark-700 bg-light-200 border n-border-base p4 rounded transition-all"
    >
      <form method="dialog">
        <input
          id="first_name"
          type="text"
          class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
          placeholder="My new preset's name..."
        >
        <div class="w-full mt-4 flex flex-justify-end">
          <button class="n-icon-button n-button">
            <NIcon
              icon="carbon:save"
              class="group-hover:text-green-500"
            />
          </button>
        </div>
      </form>
    </dialog>
    <header class="sticky top-0 z-2 px-4 pt-4">
      <div
        class="flex justify-between items-start"
        mb2
      >
        <div class="flex space-x-5">
          <h1
            text-xl
            flex
            items-center
            gap-2
          >
            <NIcon
              icon="carbon:load-balancer-application"
              class="text-blue-300"
            />
            Mock Server <NBadge class="text-sm">
              {{ moduleMeta?.package?.version }}
            </NBadge>
          </h1>
        </div>
        <div class="flex items-center space-x-3 text-xl">
          <fieldset
            class="n-select-tabs flex flex-inline flex-wrap items-center border n-border-base rounded-lg n-bg-base"
          >
            <label
              v-for="(value, idx) of tabs"
              :key="idx"
              class="relative n-border-base hover:n-bg-active cursor-pointer"
              :class="[
                idx ? 'border-l n-border-base ml--1px' : '',
                value === currentTab ? 'n-bg-active' : '',
              ]"
            >
              <div
                v-if="value === 'mocks'"
                :class="[value === currentTab ? '' : 'op35']"
              >
                <VTooltip>
                  <div class="px-5 py-2">
                    <h2
                      text-lg
                      flex
                      items-center
                    >
                      <NIcon icon="carbon:load-balancer-application opacity-50" />
                    </h2>
                  </div>
                  <template #popper>
                    Mocks
                  </template>
                </VTooltip>
              </div>
              <div
                v-else-if="value === 'docs'"
                :class="[value === currentTab ? '' : 'op35']"
              >
                <VTooltip>
                  <div class="px-5 py-2">
                    <h2
                      text-lg
                      flex
                      items-center
                    >
                      <NIcon icon="carbon:book opacity-50" />
                    </h2>
                  </div>
                  <template #popper>
                    Documentation
                  </template>
                </VTooltip>
              </div>
              <input
                v-model="currentTab"
                type="radio"
                :value="value"
                :title="value"
                class="absolute cursor-pointer pointer-events-none inset-0 op-0.1"
              >
            </label>
          </fieldset>
          <VTooltip>
            <button
              text-lg=""
              type="button"
              class="n-icon-button n-button n-transition n-disabled:n-disabled"
              @click="loadPresets"
            >
              <NIcon
                icon="carbon:reset"
                class="group-hover:text-green-500"
              />
            </button>
            <template #popper>
              Refresh
            </template>
          </VTooltip>
          <VTooltip>
            <button
              text-lg=""
              type="button"
              class="n-icon-button n-button n-transition n-disabled:n-disabled"
              @click="isCreatingPreset = true"
            >
              <NIcon
                icon="carbon:intent-request-create"
                class="group-hover:text-green-500"
              />
            </button>
            <template #popper>
              Create Preset
            </template>
          </VTooltip>
        </div>
        <div class="items-center space-x-3 hidden lg:flex">
          <div class="opacity-80 text-sm">
            <NLink
              href="https://github.com/SoaresMG/nuxt-mock-server/issues/new"
              target="_blank"
            >
              <NIcon
                icon="logos:github-icon"
                class="mr-[2px]"
              />
              Submit an issue
            </NLink>
          </div>
        </div>
      </div>
    </header>
    <div
      class="flex-row flex p4 h-full"
      style="min-height: calc(100vh - 64px);"
    >
      <main class="mx-auto flex flex-col w-full bg-white dark:bg-black dark:bg-dark-700 bg-light-200 ">
        <NLoading v-if="isLoading" />
        <div
          v-if="currentTab === 'mocks'"
          class="space-y-5"
        >
          <div>
            <h2 class="text-lg mb-1">
              Presets
            </h2>
            <p
              text-xs
              op60
            >
              Mocks generated by nuxt-mock-server.
            </p>
          </div>
          <SectionBlock
            v-for="preset in presets"
            :key="preset.name"
          >
            <template #text>
              <h3 class="opacity-80 text-base mb-1">
                {{ capitalize(preset.name) }}
              </h3>
            </template>
            <div class="px-3 py-2 space-y-5">
              <div class="flex space-x-5 ">
                <div class="w-40 flex flex-col">
                  <div>
                    <div class="font-bold text-sm mb-1">
                      Mocked paths
                    </div>
                    <div class="opacity-40 text-xs max-w-60">
                      [{{ preset.entries.length }}] mocked endpoints included in the {{ preset.name }} preset.
                    </div>
                  </div>
                  <div class="font-bold text-sm mb-1 flex mt-4">
                    Set as current preset
                    <VTooltip>
                      <button
                        text-lg=""
                        type="button"
                        class="n-icon-button n-button n-transition n-disabled:n-disabled"
                        @click="() => setPreset(preset.name)"
                      >
                        <NIcon
                          icon="carbon:checkmark-filled"
                          class="group-hover:text-green-500"
                        />
                      </button>
                      <template #popper>
                        Set preset as {{ preset.name }}
                      </template>
                    </VTooltip>
                  </div>
                </div>
                <div class="flex-grow w--0">
                  <MockEntry
                    v-for="entry in preset.entries"
                    v-bind="entry"
                    :key="entry.meta.path"
                  />
                </div>
              </div>
            </div>
          </SectionBlock>
        </div>

        <div
          v-if="currentTab === 'docs'"
          class="space-y-5"
        >
          <div>
            <h2 class="text-lg mb-1">
              Docs
            </h2>
            <p
              text-xs
              op60
            >
              Documentation for nuxt-mock-server
            </p>
          </div>
          TBD
        </div>
      </main>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
import { usePresets } from "../composables/use-presets";
import { useModuleMeta } from "../composables/use-module-meta";
import { loadShiki } from "../composables/shiki";
import { useRpc } from "../composables/use-rpc";
import { useHead } from "#imports";

await loadShiki();

const { colorMode } = useRpc();

const tabs = ["mocks", "docs"] as const;

const currentTab = useLocalStorage<typeof tabs[number]>("nuxt-mock-server:tab", "mocks");

const { presets, loadPresets, setPreset, isLoading } = usePresets();
const { moduleMeta } = useModuleMeta();

const isCreatingPreset = ref(false);

onMounted(async () => {
  await loadPresets();
});

useHead({
  htmlAttrs: {
    class: () => colorMode.value || "",
  },
});

const capitalize = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);
</script>

<style>
header {
  -webkit-backdrop-filter: blur(2px);
  backdrop-filter: blur(2px);
  background-color: #fffc;
}

.dark header {
  background-color: #111c;
}

html {
  --at-apply: font-sans;
  overflow-y: scroll;
  overscroll-behavior: none;
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}

body {
  /* trap scroll inside iframe */
  height: calc(100vh + 1px);
}

html.dark {
  background: #111;
  color-scheme: dark;
}

/* Markdown */
.dark .shiki {
  background: var(--shiki-dark-bg, inherit) !important;
}

.dark .shiki span {
  color: var(--shiki-dark, inherit) !important;
}

/* JSON Editor */
textarea {
  background: #8881
}

/* Scrollbar */
::-webkit-scrollbar {
  width: 6px;
}

::-webkit-scrollbar:horizontal {
  height: 6px;
}

::-webkit-scrollbar-corner {
  background: transparent;
}

::-webkit-scrollbar-track {
  background: var(--c-border);
  border-radius: 1px;
}

::-webkit-scrollbar-thumb {
  background: #8881;
  transition: background 0.2s ease;
  border-radius: 1px;
}

::-webkit-scrollbar-thumb:hover {
  background: #8885;
}
</style>
