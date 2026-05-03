<script setup lang="ts">
import { useHomeVariant } from "~/composables/useHomeVariant"
import HomeCalm from "~/components/home/HomeCalm.vue"
import HomeFeral from "~/components/home/HomeFeral.vue"
import HomeUnhinged from "~/components/home/HomeUnhinged.vue"

const variant = useHomeVariant()

const variantMap = {
  calm: HomeCalm,
  feral: HomeFeral,
  unhinged: HomeUnhinged,
} as const
</script>

<template>
  <component :is="variantMap[variant]" />
</template>
