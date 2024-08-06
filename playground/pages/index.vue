<template>
  <div>
    <div class="grid grid-cols-3 gap-5 max-w-[900px] mx-auto">
      <NuxtLink
        v-for="{ title, link } in data?.products || []"
        :key="`${title}_${link}`"
        :to="link"
      >
        {{ title }}
      </NuxtLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useFetch } from "#imports";

const { data } = await useFetch("/api/pages/homepage");
</script>

<style scoped>
a {
  display: block;
  margin: 0 0 10px 0;
  text-decoration: underline;
}
</style>
