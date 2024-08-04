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
const { data } = await useFetch("/api/pages/homepage");
</script>
