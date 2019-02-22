/*import { sayHello } from "./greet";
import { sayMaster } from "./greetTwo";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

function whoMaster(id: string, name: string) {
  // body...
  const elm = document.getElementById(id);
  elm.innerText = sayMaster(name);
}

showHello("greeting", "reza");
whoMaster("master", " the Master");*/

import {TimelineLite, TweenLite, TweenMax, Ease, Bounce, Elastic, Back, Power1, Power2, Power3, Power4 } from "gsap";

document.addEventListener('DOMContentLoaded', (event) => {
  let bubbleOne: HTMLElement = document.getElementById("bubble-one");
  let bubbleTwo: HTMLElement = document.getElementById("bubble-two");

  let onComplete = () => {
    TweenLite.to(bubbleOne, .3, {y: -30, x: 30, scale:1.3, ease: Power1.easeInOut, onComplete: onComplete1})
    TweenLite.to(bubbleTwo, .3, {y: -30, scale:1.3, ease: Power1.easeInOut, onComplete: onComplete1})
  };
  
  let onComplete1 = () => {
    TweenLite.to(bubbleOne, .3, {y: 30, x: 0, scale:.6, ease: Power1.easeInOut, onComplete: onComplete})
    TweenLite.to(bubbleTwo, .3, {y: 30, scale:.6, ease: Power1.easeInOut, onComplete: onComplete})
  };

  TweenLite.to(bubbleOne, .3, {y: 30, x: 30, scale:1.3, ease: Power1.easeInOut, onComplete: onComplete})
  TweenLite.to(bubbleTwo, .3, {y: 30, scale:1.3, ease: Power1.easeInOut, onComplete: onComplete})

});