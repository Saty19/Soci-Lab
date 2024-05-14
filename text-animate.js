// TextScramble Start

export class TextScramble {
    constructor(el) {
      this.el = el
      this.chars = 'AaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwXxYyZz'
      this.update = this.update.bind(this)
    }
    setText(newText) {
      const oldText = this.el.innerText
      const length = Math.max(oldText.length, newText.length)
      const promise = new Promise((resolve) => this.resolve = resolve)
      this.queue = []
      for (let i = 0; i < length; i++) {
        const from = oldText[i] || ''
        const to = newText[i] || ''
        const start = Math.floor(Math.random() * 20)
        const end = start + Math.floor(Math.random() * 20)
        this.queue.push({ from, to, start, end })
      }
      cancelAnimationFrame(this.frameRequest)
      this.frame = 0
      this.update()
      return promise
    }
    update() {
      let output = ''
      let complete = 0
      for (let i = 0, n = this.queue.length; i < n; i++) {
        let { from, to, start, end, char } = this.queue[i]
        if (this.frame >= end) {
          complete++
          output += to
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
          }
          output += `<span class="dud">${char}</span>`
        } else {
          output += from
        }
      }
      this.el.innerHTML = output
      if (complete === this.queue.length) {
        this.resolve()
      } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
      }
    }
    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)]
    }
  }
  // TextScramble End
  export class ShuffleTextEffect {
    constructor(elem, newText, eventType) {
        this.element = typeof elem === 'string' ? document.querySelector(elem) : elem;
        this.newText = newText;
        this.eventType = eventType;
        this.handleEvent();
    }

    shuffle(text) {
        let shuffledText = '';
        const textArray = text.split('');
        while (textArray.length > 0) {
            const randomIndex = Math.floor(Math.random() * textArray.length);
            shuffledText += textArray[randomIndex];
            textArray.splice(randomIndex, 1);
        }
        return shuffledText;
    }

    handleEvent() {
        const self = this;
        if (!this.element) {
            console.error('Element not found');
            return;
        }
        if (this.eventType === 'click') {
            this.element.addEventListener('click', function() {
                self.element.textContent = self.shuffle(self.newText);
            });
        } else if (this.eventType === 'hover') {
            this.element.addEventListener('mouseover', function() {
                self.element.textContent = self.shuffle(self.newText);
            });
        } else {
            console.error('Unsupported event type');
        }
    }
}
