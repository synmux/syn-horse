<script setup lang="ts">
type TagVariant = "hot" | "cool" | "lilac" | "warn" | "solid"

defineProps<{
  variant?: TagVariant
  on?: boolean
}>()
</script>

<template>
  <span :class="['tg', variant, on && 'on']">
    <slot />
  </span>
</template>
