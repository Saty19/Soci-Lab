import './style.css';
import hljs from 'highlight.js';

// Setup highlight.js
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('pre code').forEach((block) => {
    hljs.highlightElement(block as HTMLElement);
  });
});

import { 
    CinematicReveal, 
    Fade, 
    Jelly,
    Scramble,
    CameraFlyThrough,
    HorizontalParallaxSlide,
    CardStackTransition,
    MaskParallaxReveal
} from 'socilab-animations';

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initial Page Load Animations (Auto plays)
    new CinematicReveal('.hero-text', { duration: 1200, stagger: 50, types: ['words'] });
    new Fade('.hero-subtext', { duration: 1000, delay: 600, stagger: 20 });
    new Fade('.hero-btn', { duration: 800, delay: 1000 });

    // 2. Hover API Demo
    new Jelly('#hover-demo-btn', { 
        trigger: 'hover', 
        reverseOnLeave: true, 
        stagger: 30,
        duration: 800
    });

    // 3. Scroll Reveal API Demo
    // Triggers perfectly seamlessly dynamically upon viewport intersection
    new CinematicReveal('.scroll-demo-text', { 
        trigger: 'scroll', 
        reverseOnLeave: true, 
        duration: 1000, 
        stagger: 50 
    });
    new Fade('.scroll-demo-desc', { 
        trigger: 'scroll', 
        reverseOnLeave: true, 
        duration: 800, 
        stagger: 15,
        delay: 200
    });


    // 4. Page Transitions Demos
    const mainContent = document.getElementById('main-content');
    const pageLayer = document.getElementById('page-layer');
    
    // Close Page Logic (Fade Back)
    document.getElementById('close-page')?.addEventListener('click', async () => {
        // Simple manual reverse just fade it out
        const a = pageLayer!.animate([{opacity: 1}, {opacity: 0}], {duration: 500, fill: 'forwards'});
        a.onfinish = () => {
            pageLayer!.style.display = 'none';
            // reset main
            mainContent!.style.opacity = '1';
            mainContent!.style.transform = 'none';
            mainContent!.style.filter = 'none';
        }
    });

    const setupTransition = (btnId: string, TransitionClass: any) => {
        document.getElementById(btnId)?.addEventListener('click', async () => {
            // Prep Incoming Layout
            pageLayer!.style.display = 'flex';
            pageLayer!.style.opacity = '1'; 
            pageLayer!.style.transform = 'none';
            
            // Execute transition cleanly waiting for Promise
            await new TransitionClass(mainContent, pageLayer, { duration: 1200 });
        });
    }

    setupTransition('transition-demo-btn-camera', CameraFlyThrough);
    setupTransition('transition-demo-btn-slide', HorizontalParallaxSlide);
    setupTransition('transition-demo-btn-zoom', CardStackTransition); 
});
