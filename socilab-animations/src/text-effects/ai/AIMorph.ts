import { TextSplitter, SplitOptions } from '../../core/TextSplitter';

export interface AIMorphOptions extends SplitOptions {
  speed?: number;
  duration?: number;
}

export class AIMorph {
  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: AIMorphOptions = {}) {
    const { 
      duration = 2000,
      ...rest 
    } = options;
    
    // Morph works by changing characters rapidly under a heavy blur
    const splitter = new TextSplitter(target, { types: ['chars'], ...rest });
    const chars = '01#$@%&!?<>{}[]~*';

    splitter.chars.forEach((el, index) => {
      const originalText = el.textContent || '';
      if (originalText.trim() === '') return;
      
      const startTime = performance.now();
      const endTime = startTime + duration + (index * 50); // Add stagger to duration

      // Apply initial blur
      el.style.filter = 'blur(10px)';
      el.style.opacity = '0';

      // Entry animation
      el.animate([
         { opacity: 0, filter: 'blur(10px)', transform: 'scale(1.5)' },
         { opacity: 1, filter: 'blur(4px)', transform: 'scale(1)' }
      ], { duration: duration * 0.5, fill: 'both', easing: 'ease-in-out', delay: index * 20 });

      const animate = (time: number) => {
        if (time < endTime) {
          // cycle chars
          if (Math.random() > 0.5) {
             el.textContent = chars[Math.floor(Math.random() * chars.length)];
          }
          requestAnimationFrame(animate);
        } else {
          el.textContent = originalText;
          // Final clear
          el.animate([
             { filter: 'blur(4px)' },
             { filter: 'blur(0px)' }
          ], { duration: 500, fill: 'both', easing: 'ease-out' });
        }
      };
      
      requestAnimationFrame(animate);
    });
  }
}
