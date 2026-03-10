import './style.css';
import { CinematicReveal, Scramble, Fade, Bounce, Jelly } from 'socilab-animations';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Auto play Hero
    new CinematicReveal('.hero-title', { duration: 1500, stagger: 100 });
    new Fade('.hero-desc', { duration: 1000, delay: 500, stagger: 20 });

    // 2. Focus interaction
    new Bounce('.btn-focus', { trigger: 'focus', reverseOnLeave: true, stagger: 30 });

    // 3. Hover interaction
    new Jelly('.btn-hover', { trigger: 'hover', reverseOnLeave: true, stagger: 30 });

    // 4. Scroll Reveal
    new CinematicReveal('.scroll-reveal-text', { trigger: 'scroll', reverseOnLeave: true, duration: 1000, stagger: 50 });

    // 5. Click Toggle
    new Scramble('.click-text', { trigger: 'click', reverseOnLeave: true, duration: 800, stagger: 40 });
});
