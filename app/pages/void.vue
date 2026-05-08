<script setup lang="ts">
definePageMeta({ layout: false })

const router = useRouter()

function goBack() {
  router.back()
}
</script>

<template>
  <div class="void-page">
    <NuxtImg src="/images/eyes.webp" alt="eyes in the dark" class="void-image" />
    <button type="button" class="void-back" @click="goBack">← back</button>
  </div>
</template>

<style scoped>
.void-page {
  position: fixed;
  inset: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 24px;
  background-color: #000;
}

.void-image {
  width: 80%;
  max-width: 480px;
  display: block;
}

.void-back {
  font-family: var(--font-mono);
  font-size: 12px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--color-paper-3);
  background: transparent;
  border: 0;
  padding: 6px 12px;
  cursor: pointer;
  transition: color 200ms ease;
}
.void-back:hover,
.void-back:focus-visible {
  color: var(--color-hot);
}
</style>
