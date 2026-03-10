export type SplitType = 'chars' | 'words' | 'lines';

export interface SplitOptions {
  types?: SplitType[];
  charClass?: string;
  wordClass?: string;
  lineClass?: string;
  absolutePosition?: boolean; 
}

export class TextSplitter {
  public elements: HTMLElement[];
  public chars: HTMLElement[] = [];
  public words: HTMLElement[] = [];
  public lines: HTMLElement[] = [];
  
  private options: SplitOptions;

  constructor(target: string | HTMLElement | HTMLElement[] | NodeListOf<HTMLElement>, options: SplitOptions = {}) {
    this.options = {
      types: ['chars', 'words', 'lines'],
      charClass: 'ta-char',
      wordClass: 'ta-word',
      lineClass: 'ta-line',
      ...options
    };

    if (typeof target === 'string') {
      this.elements = Array.from(document.querySelectorAll(target));
    } else if (target instanceof HTMLElement) {
      this.elements = [target];
    } else {
      this.elements = Array.from(target);
    }

    this.split();
  }

  private split() {
    this.elements.forEach(el => {
      this.splitElement(el);
    });
  }

  private splitElement(element: HTMLElement) {
    // Basic text splitting approach
    // Note: For a very advanced lib, this should handle nested HTML. 
    // Here we use a robust regex and textNode replacement to keep HTML intact if possible,
    // but a simplified version first: we get textContent and split.
    // If the element has children with different tags, we should traverse nodes.
    
    // For now we will traverse child nodes
    const walk = (node: Node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const textArea = node.textContent;
        if (!textArea || textArea.trim() === '') return;
        
        const fragment = document.createDocumentFragment();
        const words = textArea.split(/(\s+)/); // keep whitespace
        
        words.forEach(wordStr => {
          if (wordStr.trim() === '') {
            // It's whitespace
            fragment.appendChild(document.createTextNode(wordStr));
          } else {
            const wordEl = document.createElement('span');
            wordEl.style.display = 'inline-block';
            if (this.options.wordClass) wordEl.classList.add(this.options.wordClass);
            
            if (this.options.types?.includes('chars')) {
              const chars = Array.from(wordStr);
              chars.forEach(char => {
                const charEl = document.createElement('span');
                charEl.style.display = 'inline-block';
                if (this.options.charClass) charEl.classList.add(this.options.charClass);
                charEl.textContent = char;
                this.chars.push(charEl);
                wordEl.appendChild(charEl);
              });
            } else {
              wordEl.textContent = wordStr;
            }
            
            this.words.push(wordEl);
            fragment.appendChild(wordEl);
          }
        });
        if (node instanceof Element) {
          node.replaceWith(fragment);
        } else if (node.parentNode) {
          node.parentNode.replaceChild(fragment, node);
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // recursively walk
        Array.from(node.childNodes).forEach(child => walk(child));
      }
    };

    // Need to reset HTML in case of re-split, but we assume it's fresh for now.
    Array.from(element.childNodes).forEach(child => walk(child));

    // For lines, we need to group words by offsetTop after DOM insertion.
    if (this.options.types?.includes('lines')) {
      // Small timeout to allow render, or we can just measure synchronously.
      // Better to do synchronously assuming no CSS transitions blocking measurement.
      this.groupLines(element);
    }
  }

  private groupLines(element: HTMLElement) {
    let currentY = -1;
    let currentLine: HTMLElement[] = [];
    const createdLines: HTMLElement[] = [];

    // Assuming we already wrapped words.
    // However, measuring needs them to be inline-block.
    if (this.words.length === 0) return;

    this.words.forEach((word) => {
      const y = word.getBoundingClientRect().top;
      if (y !== currentY) {
        if (currentLine.length > 0) {
          createdLines.push(this.wrapLine(currentLine));
        }
        currentY = y;
        currentLine = [];
      }
      currentLine.push(word);
    });

    if (currentLine.length > 0) {
      createdLines.push(this.wrapLine(currentLine));
    }

    this.lines = createdLines;
  }

  private wrapLine(wordsInLine: HTMLElement[]): HTMLElement {
    const lineWrapper = document.createElement('div');
    lineWrapper.style.display = 'block';
    if (this.options.lineClass) {
      lineWrapper.classList.add(this.options.lineClass);
    }
    
    // Insert wrapper before first word
    wordsInLine[0].parentNode?.insertBefore(lineWrapper, wordsInLine[0]);
    
    wordsInLine.forEach(word => {
       // get the spaces before/after, we might lose whitespace if they aren't part of words!
       // Fix: since we just moved words, text nodes between them might be abandoned.
       // Actually, grouping by line after DOM insertion usually requires careful DOM manipulation.
       // For our first version, we'll keep lines simple.
       lineWrapper.appendChild(word);
       // Add space. A better splitter handles spaces precisely. 
       lineWrapper.appendChild(document.createTextNode(' '));
    });

    return lineWrapper;
  }

  public revert() {
    // Revert logic to strip spans
  }
}
