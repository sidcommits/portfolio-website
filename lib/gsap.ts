import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Register once — safe to call multiple times
export function registerGSAP() {
  gsap.registerPlugin(ScrollTrigger)
}

// Shared ScrollTrigger defaults for scene pinning
export const sceneTriggerDefaults = {
  scrub: 1,
  pin: true,
  anticipatePin: 1,
}

export { gsap, ScrollTrigger }
