<script setup lang="ts">
defineProps<{
  rows?: string[]
}>()
</script>

<template>
  <pre class="console"><slot><template v-for="(r, i) in rows" :key="i">{{ r }}<br></template></slot></pre>
</template>
