import { TextSplitter, SplitOptions } from '../../core/TextSplitter';

export interface ScrambleOptions extends SplitOptions {
  characters?: string;
  speed?: number;
  stagger?: number;
}

export class Scramble {
  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: ScrambleOptions = {}) {
    const { 
      characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*()_+0123456789',
      stagger = 2,
      ...rest 
    } = options;
    
    const splitter = new TextSplitter(target, { types: ['chars'], ...rest });

    splitter.chars.forEach((el, index) => {
      const originalText = el.textContent || '';
      if (originalText.trim() === '') return; // Skip spaces

      let frame = 0;
      const maxFrames = 15 + index * stagger;

      const animate = () => {
        if (frame < maxFrames) {
          el.textContent = characters[Math.floor(Math.random() * characters.length)];
          frame++;
          // Control speed with requestAnimationFrame
          requestAnimationFrame(animate);
        } else {
          el.textContent = originalText;
        }
      };
      
      requestAnimationFrame(animate);
    });
  }
}
