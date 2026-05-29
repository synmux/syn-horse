<script setup lang="ts">
  import { ref } from "vue";
  import { useKonamiCode } from "~/composables/useKonamiCode";
  import { useKonamiState } from "~/composables/useKonamiState";
  import { useKonamiToast } from "~/composables/useKonamiToast";
  import KonamiBoot from "./KonamiBoot.vue";

  const state = useKonamiState();
  const toast = useKonamiToast();
  const bootActive = ref(false);

  useKonamiCode(() => {
    if (!state.bootHasRun.value) {
      bootActive.value = true;
      return;
    }
    state.commandsEnabled.value = !state.commandsEnabled.value;
    toast.show(
      state.commandsEnabled.value ? "commands enabled" : "commands locked"
    );
  });

  function onBootDismissed() {
    bootActive.value = false;
    state.bootHasRun.value = true;
    state.commandsEnabled.value = true;
    toast.show("commands unlocked", "press / to summon");
  }
</script>

<template>
  <KonamiBoot v-if="bootActive" @done="onBootDismissed" />
  <LayoutKonamiToast />
</template>
