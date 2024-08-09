<template>
  <dialog
    :open="isOpen"
    class="absolute top-[100px] z-10 w-[250px] bg-white dark:bg-black dark:bg-dark-700 bg-light-200 border n-border-base p4 rounded transition-all"
  >
    <form method="dialog">
      <slot />
    </form>
  </dialog>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
}>();
</script>
