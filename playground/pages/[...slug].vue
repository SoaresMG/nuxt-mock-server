<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="products">
    <ul
      v-for="{ title, link } in data?.products || []"
      :key="`${title}_${link}`"
    >
      <li>
        <NuxtLink :to="link">
          {{ title }}
        </NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from "#imports";

const {
  params: { slug },
} = useRoute();

const { data } = await useFetch("/api/pages/dynamic", {
  params: {
    slug: slug.toString(),
  },
});
</script>
