<script setup lang="ts">
  import { computed } from "vue";
  import { useRoute } from "vue-router";
  import { useClock } from "~/composables/useClock";
  import { useTime } from "~/composables/useTime";
  import { SITE } from "~/data/site";

  const route = useRoute();
  const { now } = useTime();

  const runtimeConfig = useRuntimeConfig();
  const buildTimeRaw = runtimeConfig.public.buildTime as string;
  const commitHash = runtimeConfig.public.commitHash as string;
  const commitUrl = `${SITE.github}/commit/${commitHash}`;
  const buildTimeMs = (() => {
    const parsed = new Date(buildTimeRaw).getTime();
    return Number.isNaN(parsed) ? null : parsed;
  })();

  const utc = useClock(now, "UTC");
  const jfk = useClock(now, "America/New_York");
  const lhr = useClock(now, "Europe/London");

  const buildAge = computed(() => {
    if (!now.value || buildTimeMs === null) {
      return "";
    }
    const diffMs = now.value.getTime() - buildTimeMs;
    const minutes = Math.max(Math.floor(diffMs / 60_000), 0);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    if (days >= 1) {
      return `${days}d ago`;
    }
    if (hours >= 1) {
      return `${hours}h ago`;
    }
    return `${minutes}m ago`;
  });

  const slug = computed(() => {
    const p = route.path;
    if (p === "/") {
      return "home";
    }
    return p.replace(/^\//, "").replace(/\/.*$/, "") || "home";
  });
</script>

<template>
  <div
    class="statusbar sticky top-0 z-[100] flex h-8 items-center justify-between gap-3 overflow-hidden border-b border-void-4 bg-void/85 px-4.5 py-1.5 font-mono text-[11px] tracking-[0.08em] uppercase text-paper-3 backdrop-blur-md md:grid md:grid-cols-[auto_1fr_auto_auto_auto_auto_auto] md:justify-normal md:gap-4"
  >
    <span>
      light status:
      <span
        class="mr-1.5 inline-block h-1.75 w-1.75 rounded-full bg-ok align-middle shadow-pulse-ok animate-pulse-glow"
      />flashing
    </span>
    <span class="flex gap-4 overflow-hidden whitespace-nowrap text-paper-3">
      <span class="inline-flex items-center gap-1.5"
        >◆ <span class="text-hot">/{{ slug }}</span></span
      >
    </span>
    <span class="hidden md:block">
      build
      <ClientOnly>
        <span class="text-cool tabular-nums">{{ buildAge }}</span>
        <template #fallback>
          <span class="text-cool tabular-nums">—</span>
        </template>
      </ClientOnly>
    </span>
    <span class="hidden md:block">
      jfk
      <ClientOnly>
        <span class="text-paper-2 tabular-nums">{{ jfk }}</span>
        <template #fallback>
          <span class="text-paper-2 tabular-nums">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span class="hidden md:block">
      utc
      <ClientOnly>
        <span class="text-paper-2 tabular-nums">{{ utc }}</span>
        <template #fallback>
          <span class="text-paper-2 tabular-nums">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span class="hidden md:block">
      lhr
      <ClientOnly>
        <span class="text-paper-2 tabular-nums">{{ lhr }}</span>
        <template #fallback>
          <span class="text-paper-2 tabular-nums">--:--:--</span>
        </template>
      </ClientOnly>
    </span>
    <span class="hidden md:block">
      <a
        :href="commitUrl"
        target="_blank"
        rel="noopener"
        class="text-paper-2 tabular-nums hover:text-cool"
        >{{ commitHash }}</a
      >
    </span>
  </div>
</template>
