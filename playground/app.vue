<template>
  <div>
    <NuxtLoadingIndicator />
    <NuxtPage />

    <br>
    <span>Initial Data:</span>
    <br>
    {{ JSON.stringify(data) }}
  </div>
</template>

<script setup lang="ts">
const { data } = useFetch("/api/initial-data");
</script>
