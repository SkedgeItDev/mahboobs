/** Captures the browser install prompt as soon as it fires (often before React mounts). */

export type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{outcome: 'accepted' | 'dismissed'}>;
};

let deferred: InstallPromptEvent | null = null;
let listening = false;
let armed = true;
const listeners = new Set<(event: InstallPromptEvent | null) => void>();

function notify(event: InstallPromptEvent | null) {
  listeners.forEach((fn) => fn(event));
}

export function captureInstallPrompt() {
  if (typeof window === 'undefined' || listening) return;
  listening = true;
  window.addEventListener('beforeinstallprompt', (event) => {
    event.preventDefault();
    if (!armed) return;
    deferred = event as InstallPromptEvent;
    notify(deferred);
  });
  window.addEventListener('appinstalled', () => {
    armed = false;
    deferred = null;
    notify(null);
  });
}

/** After the native prompt is used (accepted or cancelled), do not re-arm it this visit. */
export function releaseInstallPrompt() {
  armed = false;
  deferred = null;
  notify(null);
}

export function subscribeInstallPrompt(fn: (event: InstallPromptEvent | null) => void) {
  listeners.add(fn);
  fn(deferred);
  return () => {listeners.delete(fn)};
}

export function isStandaloneDisplay() {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & {standalone?: boolean};
  return nav.standalone === true
    || window.matchMedia('(display-mode: standalone)').matches
    || window.matchMedia('(display-mode: fullscreen)').matches;
}

export function isIosDevice() {
  if (typeof navigator === 'undefined') return false;
  if (/iPad|iPhone|iPod/.test(navigator.userAgent)) return true;
  return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}
