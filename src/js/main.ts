/*import {TimelineLite,TweenLite, TweenMax} from "gsap";*/

/*document.addEventListener('DOMContentLoaded', (event) => {
  let bubbleOne:any = document.getElementById("bubble-one");
  let bubbleTwo = document.getElementById("bubble-two");

  let tl = new TimelineLite();

    TweenMax.fromTo(bubbleOne, 1, {scale:1}, {scale:2, repeat: -1});
    TweenMax.fromTo(bubbleOne, 1, {scale:2}, {scale:1, delay:1});

})*/

import { sayHello } from "./greet";

function showHello(divName: string, name: string) {
    const elt = document.getElementById(divName);
    elt.innerText = sayHello(name);
}

showHello("greeting", "reza");