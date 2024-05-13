// myLib.js

const MyLib = {
  scrollTrigger: function(element, animation, options) {
      window.addEventListener('scroll', () => {
          const elementRect = element.getBoundingClientRect();
          const viewportHeight = window.innerHeight;
          
          if (elementRect.top < viewportHeight) {
              element.classList.add(animation);
          } else {
              element.classList.remove(animation);
          }
      });
  },
  
  stagger: function(elements, animation, delay, options) {
      elements.forEach((element, index) => {
          setTimeout(() => {
              element.classList.add(animation);
          }, index * delay);
      });
  },
  
  on: function(event, element, animation, options) {
      element.addEventListener(event, () => {
          element.classList.add(animation);
      });
  },
  
  before: function(animation, action) {
      action();
      setTimeout(() => {
          action.classList.add(animation);
      }, 0);
  },
  
  after: function() {
      // Logic to execute after animation
  },
  
  animate: function(element, animation, customCSS) {
      element.style.animation = `${animation} ${customCSS.duration} ${customCSS.timingFunction} ${customCSS.delay} ${customCSS.iterationCount} ${customCSS.direction} ${customCSS.fillMode} ${customCSS.playState}`;
  },

  customAnimation: function(element, keyframes, options) {
      const animation = element.animate(keyframes, options);
      return animation;
  },
  test:function(){
    console.log("test")
  }
};

module.exports = MyLib;
