<template>
  <div>
    {{ JSON.stringify(data) }}
  </div>
</template>

<script setup lang="ts">
const {
  params: { slug },
} = useRoute();

const { data } = await useFetch("/api/pages/product", {
  params: {
    slug: slug.toString(),
  },
});
</script>
