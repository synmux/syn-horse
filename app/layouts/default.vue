<template>
  <div class="site">
    <LayoutFxLayer />
    <LayoutStatusBar />
    <LayoutNavBar />
    <main>
      <slot />
    </main>
    <LayoutCommandPalette />
    <LayoutKonamiOrchestrator />
  </div>
</template>
