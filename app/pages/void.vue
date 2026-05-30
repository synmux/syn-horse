<script setup lang="ts">
  definePageMeta({ layout: false });

  const router = useRouter();

  function goBack() {
    router.back();
  }
</script>

<template>
  <div class="void-page">
    <NuxtImg
      src="/images/void.webp"
      alt="eyes. in the dark."
      class="void-image"
    />
    <button type="button" class="void-back" @click="goBack">← back</button>
  </div>
</template>

<style scoped>
  .void-page {
    position: fixed;
    inset: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
    align-items: center;
    justify-content: center;
    background-color: #000;
  }

  .void-image {
    display: block;
    width: 80%;
    max-width: 480px;
  }

  .void-back {
    padding: 6px 12px;
    font-family: var(--font-mono);
    font-size: 12px;
    color: var(--color-paper-3);
    text-transform: uppercase;
    letter-spacing: 0.14em;
    cursor: pointer;
    background: transparent;
    border: 0;
    transition: color 200ms ease;
  }
  .void-back:hover,
  .void-back:focus-visible {
    color: var(--color-hot);
  }
</style>
