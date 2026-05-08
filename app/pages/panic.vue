<script setup lang="ts">
import { SITE } from "~/data/site"

useSeoMeta({
  title: `panic · ${SITE.name}`,
  description: "page syn. red for emergencies, green for everything else.",
})

type Channel = "red" | "green"
type Status = "idle" | "pending" | "ok" | "error"

const issue = ref("")
const contact = ref("")
const token = ref("")
const status = ref<Status>("idle")
const errorMessage = ref("")
const submittedId = ref("")
const redArmed = ref(false)
const turnstileRef = ref<{ reset: () => void } | null>(null)

let armTimer: ReturnType<typeof setTimeout> | null = null

const canSubmit = computed(
  () =>
    issue.value.trim().length >= 10 &&
    contact.value.trim().length >= 3 &&
    token.value.length > 0 &&
    status.value !== "pending"
)

function disarmRed() {
  redArmed.value = false
  if (armTimer) {
    clearTimeout(armTimer)
    armTimer = null
  }
}

function armRed() {
  redArmed.value = true
  if (armTimer) clearTimeout(armTimer)
  armTimer = setTimeout(disarmRed, 4000)
}

async function send(channel: Channel) {
  status.value = "pending"
  errorMessage.value = ""
  try {
    const result = await $fetch<{ ok: boolean; id: string }>("/api/panic", {
      method: "POST",
      body: {
        channel,
        issue: issue.value.trim(),
        contact: contact.value.trim(),
        turnstileToken: token.value,
      },
    })
    submittedId.value = result.id
    status.value = "ok"
  } catch (err) {
    const fetchErr = err as { statusMessage?: string; data?: { issues?: Array<{ message: string }> } }
    const issues = fetchErr.data?.issues
    errorMessage.value =
      (issues && issues.length > 0 ? issues[0]?.message : null) ??
      fetchErr.statusMessage ??
      "something went wrong. try again."
    status.value = "error"
    turnstileRef.value?.reset()
    token.value = ""
  }
}

function clickRed() {
  if (!canSubmit.value) return
  if (!redArmed.value) {
    armRed()
    return
  }
  disarmRed()
  void send("red")
}

function clickGreen() {
  if (!canSubmit.value) return
  void send("green")
}

function reset() {
  status.value = "idle"
  errorMessage.value = ""
  submittedId.value = ""
  issue.value = ""
  contact.value = ""
  token.value = ""
  disarmRed()
  turnstileRef.value?.reset()
}
</script>

<template>
  <div class="page-shell">
    <div class="eyebrow">▶ /panic · use sparingly · or do not, idgaf</div>
    <h1 class="page-h1">panic<span class="dot">.</span></h1>
    <p class="lede">
      if it's broken and you need a human, fill in the box. red wakes me up. green waits until i'm awake. choose
      accordingly.
    </p>

    <template v-if="status !== 'ok'">
      <div class="mt-9">
        <label class="label" for="panic-issue">what's broken</label>
        <textarea
          id="panic-issue"
          v-model="issue"
          class="field"
          rows="6"
          placeholder="describe the fire. logs / urls / repro steps welcome."
          maxlength="2000"
        />
      </div>

      <div class="mt-5">
        <label class="label" for="panic-contact">how to reach you</label>
        <input
          id="panic-contact"
          v-model="contact"
          class="field"
          type="text"
          placeholder="name, email, slack handle, raven, whatever works"
          maxlength="200"
        />
      </div>

      <div class="mt-5">
        <span class="label">prove you're not a bot</span>
        <ClientOnly>
          <NuxtTurnstile ref="turnstileRef" v-model="token" />
          <template #fallback>
            <div class="font-mono text-xs text-paper-3">loading captcha…</div>
          </template>
        </ClientOnly>
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
          {{ redArmed ? "← are you sure? click again to wake them up" : "← BIG RED BUTTON" }}
        </button>
        <button type="button" class="panic-btn green" :disabled="!canSubmit" @click="clickGreen">
          small green button →
        </button>
      </div>

      <p class="mt-4 font-mono text-xs text-paper-3">red wakes me up at 3am. green doesn't.</p>
    </template>

    <template v-else>
      <div class="console mt-12">
        <div><span class="ok">paged.</span> probably.</div>
        <div class="mt-2"><span class="mu">id:</span> {{ submittedId }}</div>
      </div>
      <div class="mt-6 flex flex-wrap gap-2">
        <button type="button" class="btn-syn" @click="reset">send another</button>
        <NuxtLink to="/" class="btn-syn fx-glitch">go home</NuxtLink>
      </div>
    </template>

    <div class="footer-note">
      <span>◆ syn · paged on demand</span>
      <span>no analytics · just a row in d1</span>
    </div>
  </div>
</template>
