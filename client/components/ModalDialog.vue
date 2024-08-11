<template>
  <dialog
    :open="isOpen"
    class="fixed top-[100px] z-10 w-[250px] bg-white dark:bg-black dark:bg-dark-700 bg-light-200 border n-border-base p4 rounded transition-all"
  >
    <form method="dialog">
      <span
        v-if="$slots.title"
        class="text-md"
      ><slot name="title" /></span>

      <slot />

      <div class="w-full mt-2 flex flex-justify-end">
        <button
          class="flex n-button hover:n-bg-active p-2 text-sm items-center"
          @click="emit('close')"
        >
          Close
        </button>
        <button
          v-if="variant === 'confirmation'"
          class="flex n-button hover:n-bg-active p-2 text-sm items-center"
          @click="emit('confirm')"
        >
          Confirm
          <NIcon
            icon="carbon:checkmark-filled"
            class="group-hover:text-green-500 ml-2"
          />
        </button>
      </div>
    </form>
  </dialog>
</template>

<script setup lang="ts">
defineProps<{
  isOpen: boolean;
  variant: "alert" | "confirmation";
}>();

const emit = defineEmits(["confirm", "close"]);
</script>
