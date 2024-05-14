
import { TextScramble ,ShuffleTextEffect} from "./text-animate";
  const SoCi = {
    
    scrambleText: function(el, newText, eventType) {
        const element=document.querySelector(el);
        const fx = new TextScramble(element);
        const eventListener = () => fx.setText(newText);
        element.addEventListener(eventType, eventListener);
        return eventListener;
      },
      shuffleText: function(el, newText, eventType) {
        const elem=document.querySelector(el);
       const fx= new ShuffleTextEffect(elem, newText, eventType);
    },
    
    test:function(){
      console.log("test");
    }
  };
  
  export default SoCi;
  