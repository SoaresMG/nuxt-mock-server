<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    {{ JSON.stringify(data) }}
  </div>
</template>

<script setup lang="ts">
import { useFetch, useRoute } from "#imports";

const {
  params: { slug },
} = useRoute();

const { data } = await useFetch("/api/pages/product", {
  params: {
    slug: slug.toString(),
  },
});
</script>
