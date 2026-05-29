<script setup lang="ts">
  import { SITE } from "~/data/site";
  import type { Channel } from "~~/server/db/schema";

  useSeoMeta({
    title: `panic · ${SITE.name}`,
    description: "page syn. red for emergencies, green for everything else.",
  });

  type Status = "idle" | "pending" | "ok" | "error";

  // In dev we bypass Turnstile entirely (widget not rendered, server skips verify).
  // The dev .env file is a 1Password-piped FIFO that only yields the secret once,
  // so any nuxt.config.ts change that forces a restart leaves runtimeConfig.turnstile.secretKey
  // empty and verify fails with `missing-input-secret`. Bypass sidesteps that.
  const isDev = import.meta.dev;

  const message = ref("");
  const contact = ref("");
  const token = ref("");
  const status = ref<Status>("idle");
  const errorMessage = ref("");
  const submittedId = ref("");
  const redArmed = ref(false);
  const turnstileRef = ref<{ reset: () => void } | null>(null);

  let armTimer: ReturnType<typeof setTimeout> | null = null;

  const messageOk = computed(() => message.value.trim().length >= 10);
  const contactOk = computed(() => contact.value.trim().length >= 3);

  const canSubmit = computed(
    () =>
      messageOk.value &&
      contactOk.value &&
      (isDev || token.value.length > 0) &&
      status.value !== "pending"
  );

  function disarmRed() {
    redArmed.value = false;
    if (armTimer) {
      clearTimeout(armTimer);
      armTimer = null;
    }
  }

  function armRed() {
    redArmed.value = true;
    if (armTimer) {
      clearTimeout(armTimer);
    }
    armTimer = setTimeout(disarmRed, 4000);
  }

  async function send(channel: Channel) {
    status.value = "pending";
    errorMessage.value = "";
    try {
      const result = await $fetch<{ ok: boolean; id: string }>("/api/panic", {
        method: "POST",
        body: {
          channel,
          message: message.value.trim(),
          contact: contact.value.trim(),
          turnstileToken: token.value,
        },
      });
      submittedId.value = result.id;
      status.value = "ok";
    } catch (err) {
      const fetchErr = err as {
        statusMessage?: string;
        data?: { issues?: Array<{ message: string }> };
      };
      const issues = fetchErr.data?.issues;
      errorMessage.value =
        (issues && issues.length > 0 ? issues[0]?.message : null) ??
        fetchErr.statusMessage ??
        "something went wrong. try again.";
      status.value = "error";
      turnstileRef.value?.reset();
      token.value = "";
    }
  }

  function clickRed() {
    if (!canSubmit.value) {
      return;
    }
    if (!redArmed.value) {
      armRed();
      return;
    }
    disarmRed();
    void send("red");
  }

  function clickGreen() {
    if (!canSubmit.value) {
      return;
    }
    void send("green");
  }

  function reset() {
    status.value = "idle";
    errorMessage.value = "";
    submittedId.value = "";
    message.value = "";
    contact.value = "";
    token.value = "";
    disarmRed();
    turnstileRef.value?.reset();
  }
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /panic · use sparingly · or do not, idgaf</div>
    <h1 class="page-h1">panic<span class="dot">.</span></h1>
    <p class="lede">
      if it's broken and you need a human, fill in the box. red wakes me up.
      green waits until i'm awake. choose accordingly.
    </p>

    <template v-if="status !== 'ok'">
      <div class="mt-9">
        <label class="label" for="panic-issue">what's broken</label>
        <div class="field-shell field-shell--textarea">
          <textarea
            id="panic-issue"
            v-model="message"
            class="field"
            rows="6"
            placeholder="describe the fire. logs / urls / repro steps welcome."
            maxlength="2000"
            aria-describedby="panic-issue-counter"
          />
          <span
            id="panic-issue-counter"
            class="field-counter"
            :class="{ ok: messageOk }"
            aria-live="polite"
          >
            {{ messageOk ? "👍" : "TYPE MORE" }}
          </span>
        </div>
      </div>

      <div class="mt-5">
        <label class="label" for="panic-contact">how to reach you</label>
        <div class="field-shell field-shell--input">
          <input
            id="panic-contact"
            v-model="contact"
            class="field"
            type="text"
            placeholder="name, email, slack handle, raven, whatever works"
            maxlength="200"
            aria-describedby="panic-contact-counter"
          >
          <span
            id="panic-contact-counter"
            class="field-counter"
            :class="{ ok: contactOk }"
            aria-live="polite"
          >
            {{ contactOk ? "👍" : "TYPE MORE" }}
          </span>
        </div>
      </div>

      <div v-if="!isDev" class="mt-5">
        <span class="label">prove you're not a bot</span>
        <ClientOnly>
          <NuxtTurnstile ref="turnstileRef" v-model="token" />
          <template #fallback>
            <div class="font-mono text-xs text-paper-3">loading captcha…</div>
          </template>
        </ClientOnly>
      </div>
      <div v-else class="mt-5 font-mono text-xs text-paper-3">
        ◇ dev mode · turnstile bypassed
      </div>

      <div v-if="status === 'error'" class="console mt-5">
        <span class="danger">{{ errorMessage }}</span>
      </div>

      <div class="panic-actions">
        <button
          type="button"
          class="panic-btn"
          :class="{ armed: redArmed }"
          :disabled="!canSubmit"
          @click="clickRed"
        >
          {{ redArmed ? "← click again to wake me up" : "← BIG RED BUTTON" }}
        </button>
        <button
          type="button"
          class="panic-btn green"
          :disabled="!canSubmit"
          @click="clickGreen"
        >
          small green button →
        </button>
      </div>

      <p class="mt-4 font-mono text-xs text-paper-3">
        red wakes me up at 3am. green doesn't.
      </p>
    </template>

    <template v-else>
      <div class="console mt-12">
        <div><span class="ok">paged.</span> probably.</div>
        <div class="mt-2"><span class="mu">id:</span> {{ submittedId }}</div>
      </div>
      <div class="mt-6 flex flex-wrap gap-2">
        <button type="button" class="btn-syn" @click="reset">
          send another
        </button>
        <NuxtLink to="/" class="btn-syn fx-glitch">go home</NuxtLink>
      </div>
    </template>

    <div class="footer-note">
      <span>◆ syn · paged on demand</span>
      <span>no analytics · just a row in d1</span>
    </div>
  </div>
</template>
