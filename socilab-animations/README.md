# Socilab Animations

A stunning, zero-dependency, pure TypeScript generic animation library crafted specifically for Socilab. It includes both specialized **Text Animations** and full-scale **Page Transitions**.

## Features
- **No Dependencies**: Relies entirely on native Web Animations API (WAAPI) and CSS.
- **Pure Generic TypeScript**: Build natively using Vite library mode, completely framework agnostic.
- **24+ Text Effects**: Covering 12 unique categories (Basic, Cinematic, 3D, Particle, Glitch, etc).
- **11+ Page Transitions**: Covering 10 premium categories (Parallax, 3D Camera, Smooth Reveal, Layered, Minimal, etc).
- **Automated Z-Indexing**: Synchronized enter/leave sequences orchestrated by a powerful Promise-based `TransitionEngine`.

## Quick Start

```bash
# Add as a local dependency in your actual Socilab app
npm install ../socilab-animations
```

```ts
// 1. TEXT EFFECTS Example
import { TextSplitter, Fade, Scramble, NeonGlow } from 'socilab-animations';

new Scramble('.decrypt-me', { stagger: 3 });

// 2. PAGE TRANSITIONS Example
import { HorizontalParallaxSlide, CameraFlyThrough } from 'socilab-animations';

// A simple page router transition
async function swapPages(currentPageEl, nextPageEl) {
  await new HorizontalParallaxSlide(currentPageEl, nextPageEl, { duration: 1000 });
  // Done!
}
```

## Component Integration (React & Vue)

Because `socilab-animations` accepts Raw DOM Elements in addition to string selectors, it integrates seamlessly into modern component frameworks without needing wrappers!

### React / Next.js Example
```tsx
import { useEffect, useRef } from 'react';
import { Fade, Jelly } from 'socilab-animations';

export function AnimatedButton() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (buttonRef.current) {
      new Jelly(buttonRef.current, { trigger: 'hover', reverseOnLeave: true });
      new Fade(buttonRef.current, { trigger: 'scroll' });
    }
  }, []);

  return <button ref={buttonRef}>Hover & Scroll Me</button>;
}
```

### Vue 3 / Nuxt Example
```vue
<script setup>
import { onMounted, ref } from 'vue';
import { Fade } from 'socilab-animations';

const textEl = ref(null);

onMounted(() => {
  new Fade(textEl.value, { trigger: 'scroll', duration: 1500 });
});
</script>

<template>
  <h1 ref="textEl">I animate on scroll!</h1>
</template>
```

## Running the Playground Demo

There is a fully working `playground` application directly inside this repository.

1. Clone or download `socilab-animations`.
2. Inside the root directory, install and build the library: `npm install && npm run build`
3. Enter the playground: `cd playground`
4. Install and run it: `npm install && npm run dev`
5. Open the localhost URL to experience a fullscreen Page Transition router that loops through ~11 different parallax page transitions natively!
