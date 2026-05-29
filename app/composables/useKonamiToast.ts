import { ref } from "vue";

export interface KonamiToastMessage {
  sub?: string;
  title: string;
}

const message = ref<KonamiToastMessage | null>(null);
let timer: ReturnType<typeof setTimeout> | null = null;

export function useKonamiToast() {
  return {
    message,
    show(title: string, sub?: string) {
      message.value = { title, sub };
      if (timer) {
        clearTimeout(timer);
      }
      timer = setTimeout(() => {
        message.value = null;
        timer = null;
      }, 3200);
    },
  };
}
